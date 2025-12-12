import { db } from './firebase';
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    getCountFromServer,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { EarlyAccessUser, WaitlistStats, PriorityScore } from '../types/earlyAccess';

const COLLECTION_NAME = 'mvf_cli_beta_access_users';

/**
 * Waitlist Management Service
 * Handles all operations related to the early access waitlist
 */
export class WaitlistService {

    /**
     * Get total number of users in waitlist
     */
    static async getTotalUsers(): Promise<number> {
        const usersRef = collection(db, COLLECTION_NAME);
        const snapshot = await getCountFromServer(usersRef);
        return snapshot.data().count;
    }

    /**
     * Get waitlist statistics
     */
    static async getWaitlistStats(): Promise<WaitlistStats> {
        const usersRef = collection(db, COLLECTION_NAME);

        const [total, pending, approved, active] = await Promise.all([
            getCountFromServer(usersRef),
            getCountFromServer(query(usersRef, where('status', '==', 'pending'))),
            getCountFromServer(query(usersRef, where('status', '==', 'approved'))),
            getCountFromServer(query(usersRef, where('status', '==', 'active'))),
        ]);

        // Calculate average wait time based on approvedAt timestamps
        let averageWaitTime = 0;
        try {
            const approvedUsersQuery = query(
                usersRef,
                where('status', '==', 'approved'),
                where('approvedAt', '!=', null),
                orderBy('approvedAt', 'desc')
            );
            const approvedSnapshot = await getDocs(approvedUsersQuery);

            if (!approvedSnapshot.empty) {
                let totalWaitMs = 0;
                let countWithWaitTime = 0;

                approvedSnapshot.forEach(doc => {
                    const data = doc.data();
                    const createdAt = data.createdAt?.toDate?.();
                    const approvedAt = data.approvedAt?.toDate?.();

                    if (createdAt && approvedAt) {
                        totalWaitMs += approvedAt.getTime() - createdAt.getTime();
                        countWithWaitTime++;
                    }
                });

                if (countWithWaitTime > 0) {
                    // Convert milliseconds to hours
                    averageWaitTime = Math.round(totalWaitMs / countWithWaitTime / (1000 * 60 * 60));
                }
            }
        } catch (error) {
            if (import.meta.env.DEV) {
                console.warn('Failed to calculate average wait time:', error);
            }
        }

        return {
            totalUsers: total.data().count,
            pendingCount: pending.data().count,
            approvedCount: approved.data().count,
            activeCount: active.data().count,
            averageWaitTime,
        };
    }

    /**
     * Get user by email
     */
    static async getUserByEmail(email: string): Promise<EarlyAccessUser | null> {
        const usersRef = collection(db, COLLECTION_NAME);
        const q = query(usersRef, where('email', '==', email));
        const snapshot = await getDocs(q);

        if (snapshot.empty) return null;

        return snapshot.docs[0].data() as EarlyAccessUser;
    }

    /**
     * Get user by referral code
     */
    static async getUserByReferralCode(referralCode: string): Promise<EarlyAccessUser | null> {
        const usersRef = collection(db, COLLECTION_NAME);
        const q = query(usersRef, where('referralCode', '==', referralCode));
        const snapshot = await getDocs(q);

        if (snapshot.empty) return null;

        return snapshot.docs[0].data() as EarlyAccessUser;
    }

    /**
     * Count referrals for a specific referral code
     */
    static async countReferrals(referralCode: string): Promise<number> {
        const usersRef = collection(db, COLLECTION_NAME);
        const q = query(usersRef, where('referredBy', '==', referralCode));
        const snapshot = await getCountFromServer(q);
        return snapshot.data().count;
    }

    /**
     * Calculate priority score for a user
     * Higher score = higher priority
     */
    static async calculatePriorityScore(userId: string, user: EarlyAccessUser): Promise<PriorityScore> {
        // Base score: Earlier registrations get higher scores
        const now = Date.now();
        const registrationTime = user.createdAt instanceof Timestamp
            ? user.createdAt.toMillis()
            : Date.now();
        const daysSinceRegistration = (now - registrationTime) / (1000 * 60 * 60 * 24);
        const baseScore = Math.floor(daysSinceRegistration * 10); // 10 points per day

        // Referral bonus: +20 points per successful referral
        const referralCount = await this.countReferrals(user.referralCode);
        const referralBonus = referralCount * 20;

        // Engagement bonus
        let engagementBonus = 0;
        if (user.newsletter) engagementBonus += 5;
        if (user.motivation && user.motivation.length > 50) engagementBonus += 10;
        if (user.interestAreas.length >= 3) engagementBonus += 5;

        const totalScore = baseScore + referralBonus + engagementBonus;

        // Calculate improved position based on referrals
        const positionImprovement = referralCount * 2; // Each referral moves up 2 positions
        const calculatedPosition = Math.max(1, user.waitlistPosition - positionImprovement);

        return {
            userId,
            baseScore,
            referralBonus,
            engagementBonus,
            totalScore,
            calculatedPosition,
        };
    }

    /**
     * Update user status (admin function)
     */
    static async updateUserStatus(
        email: string,
        newStatus: 'pending' | 'approved' | 'active' | 'waitlist'
    ): Promise<void> {
        const usersRef = collection(db, COLLECTION_NAME);
        const q = query(usersRef, where('email', '==', email));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            throw new Error('User not found');
        }

        const userDoc = snapshot.docs[0];
        const updateData: any = {
            status: newStatus,
            updatedAt: Timestamp.now(),
        };

        if (newStatus === 'approved' || newStatus === 'active') {
            updateData.approvedAt = Timestamp.now();
        }

        await updateDoc(doc(db, COLLECTION_NAME, userDoc.id), updateData);
    }

    /**
     * Get top referrers (leaderboard)
     */
    static async getTopReferrers(limit: number = 10): Promise<Array<{ user: EarlyAccessUser, referralCount: number }>> {
        const usersRef = collection(db, COLLECTION_NAME);
        const snapshot = await getDocs(usersRef);

        const referrerData = await Promise.all(
            snapshot.docs.map(async (doc) => {
                const user = doc.data() as EarlyAccessUser;
                const referralCount = await this.countReferrals(user.referralCode);
                return { user, referralCount };
            })
        );

        return referrerData
            .filter(item => item.referralCount > 0)
            .sort((a, b) => b.referralCount - a.referralCount)
            .slice(0, limit);
    }

    /**
     * Check for duplicate email
     */
    static async isDuplicateEmail(email: string): Promise<boolean> {
        const user = await this.getUserByEmail(email);
        return user !== null;
    }

    /**
     * Get users by status
     */
    static async getUsersByStatus(status: 'pending' | 'approved' | 'active' | 'waitlist'): Promise<EarlyAccessUser[]> {
        const usersRef = collection(db, COLLECTION_NAME);
        const q = query(usersRef, where('status', '==', status), orderBy('createdAt', 'asc'));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => doc.data() as EarlyAccessUser);
    }

    /**
     * Bulk approve users (admin function)
     * Approve the next N users in the waitlist
     */
    static async bulkApproveUsers(count: number): Promise<number> {
        const pendingUsers = await this.getUsersByStatus('pending');
        const usersToApprove = pendingUsers.slice(0, count);

        await Promise.all(
            usersToApprove.map(user => this.updateUserStatus(user.email, 'approved'))
        );

        return usersToApprove.length;
    }
}
