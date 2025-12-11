import { db } from './firebase';
import { collection, doc, getDoc, getDocs, query, where, deleteDoc, updateDoc, serverTimestamp, addDoc, setDoc } from 'firebase/firestore';

// GDPR Compliance Service
class GDPRService {
    private readonly COLLECTION_NAME = 'lab_early_access_users';
    private readonly DELETION_REQUESTS_COLLECTION = 'gdpr_deletion_requests';
    private readonly DATA_EXPORT_REQUESTS_COLLECTION = 'gdpr_export_requests';

    /**
     * Right to be Forgotten - Request account deletion
     */
    async requestAccountDeletion(email: string, reason?: string): Promise<{ success: boolean; requestId?: string; error?: string }> {
        try {
            // Find user by email
            const usersRef = collection(db, this.COLLECTION_NAME);
            const q = query(usersRef, where('email', '==', email));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                return {
                    success: false,
                    error: 'No account found with this email address',
                };
            }

            const userData = snapshot.docs[0];
            const userId = userData.id;

            // Create deletion request
            const deletionRequest = {
                userId,
                email,
                reason: reason || 'User requested account deletion',
                requestedAt: serverTimestamp(),
                status: 'pending',
                processedAt: null,
                userData: userData.data(), // Store for audit trail
            };

            // Add deletion request document
            const deletionRequestRef = await addDoc(
                collection(db, this.DELETION_REQUESTS_COLLECTION),
                deletionRequest
            );

            // Mark user as pending deletion
            await updateDoc(doc(db, this.COLLECTION_NAME, userId), {
                gdprStatus: 'deletion_requested',
                deletionRequestedAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            return {
                success: true,
                requestId: deletionRequestRef.id,
            };
        } catch (error: any) {
            if (import.meta.env.DEV) {
                console.error('Account deletion request failed:', error);
            }
            return {
                success: false,
                error: error.message || 'Failed to process deletion request',
            };
        }
    }

    /**
     * Process account deletion (Admin function)
     */
    async processAccountDeletion(requestId: string): Promise<{ success: boolean; error?: string }> {
        try {
            const requestDoc = await getDoc(doc(db, this.DELETION_REQUESTS_COLLECTION, requestId));

            if (!requestDoc.exists()) {
                return { success: false, error: 'Deletion request not found' };
            }

            const requestData = requestDoc.data();
            const userId = requestData.userId;

            // Delete user data
            await deleteDoc(doc(db, this.COLLECTION_NAME, userId));

            // Update deletion request status
            await updateDoc(doc(db, this.DELETION_REQUESTS_COLLECTION, requestId), {
                status: 'completed',
                processedAt: serverTimestamp(),
            });

            // Clear local storage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('ment4ai_lab_access_id');
                localStorage.removeItem('ment4ai_lab_user_name');
                localStorage.removeItem('ment4ai_lab_referral_code');
                localStorage.removeItem('ment4ai_lab_waitlist_position');
            }

            return { success: true };
        } catch (error: any) {
            console.error('Account deletion processing failed:', error);
            return {
                success: false,
                error: error.message || 'Failed to process deletion',
            };
        }
    }

    /**
     * Right to Data Portability - Export user data
     */
    async requestDataExport(email: string): Promise<{ success: boolean; data?: any; requestId?: string; error?: string }> {
        try {
            // Find user by email
            const usersRef = collection(db, this.COLLECTION_NAME);
            const q = query(usersRef, where('email', '==', email));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                return {
                    success: false,
                    error: 'No account found with this email address',
                };
            }

            const userData = snapshot.docs[0].data();
            const userId = snapshot.docs[0].id;

            // Create export request log
            const exportRequest = {
                userId,
                email,
                requestedAt: serverTimestamp(),
                status: 'completed',
            };

            const requestRef = collection(db, this.DATA_EXPORT_REQUESTS_COLLECTION);
            const docRef = doc(requestRef);
            await setDoc(docRef, exportRequest);

            // Prepare data export (remove sensitive internal fields)
            const exportData = {
                personalInformation: {
                    name: userData.name,
                    email: userData.email,
                    dateOfBirth: userData.dob,
                    organization: userData.organization,
                    role: userData.role,
                },
                professionalInformation: {
                    studentLevel: userData.studentLevel,
                    degree: userData.degree,
                    experienceLevel: userData.experienceLevel,
                    interestAreas: userData.interestAreas,
                },
                accountInformation: {
                    accessId: userData.accessId,
                    referralCode: userData.referralCode,
                    referredBy: userData.referredBy,
                    waitlistPosition: userData.waitlistPosition,
                    status: userData.status,
                    createdAt: userData.createdAt?.toDate?.()?.toISOString() || userData.createdAt,
                    lastActiveAt: userData.lastActiveAt?.toDate?.()?.toISOString() || userData.lastActiveAt,
                },
                preferences: {
                    newsletter: userData.newsletter,
                },
                metadata: {
                    exportDate: new Date().toISOString(),
                    exportRequestId: docRef.id,
                    dataRetentionPolicy: 'Data is retained for the duration of your account. You may request deletion at any time.',
                },
            };

            return {
                success: true,
                data: exportData,
                requestId: docRef.id,
            };
        } catch (error: any) {
            console.error('Data export request failed:', error);
            return {
                success: false,
                error: error.message || 'Failed to export data',
            };
        }
    }

    /**
     * Download data as JSON file
     */
    downloadDataAsJSON(data: any, filename: string = 'mfourlabs-data-export.json') {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    /**
     * Update user consent preferences
     */
    async updateConsent(email: string, consents: {
        privacy?: boolean;
        newsletter?: boolean;
        analytics?: boolean;
    }): Promise<{ success: boolean; error?: string }> {
        try {
            const usersRef = collection(db, this.COLLECTION_NAME);
            const q = query(usersRef, where('email', '==', email));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                return { success: false, error: 'User not found' };
            }

            const userId = snapshot.docs[0].id;

            await updateDoc(doc(db, this.COLLECTION_NAME, userId), {
                ...consents,
                consentUpdatedAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            return { success: true };
        } catch (error: any) {
            console.error('Consent update failed:', error);
            return {
                success: false,
                error: error.message || 'Failed to update consent',
            };
        }
    }

    /**
     * Get data retention policy
     */
    getDataRetentionPolicy(): string {
        return `
# Data Retention Policy - MFOURLABS

## Personal Data Storage
- **Account Data**: Retained for the duration of your active account
- **Registration Data**: Stored securely in Firebase Firestore
- **Analytics Data**: Aggregated and anonymized after 26 months (Google Analytics standard)

## Data Usage
- **Primary Purpose**: Lab access management and communication
- **Secondary Purpose**: Service improvement and analytics (anonymized)
- **Marketing**: Only with explicit consent (newsletter opt-in)

## Your Rights
- **Right to Access**: Request a copy of your data at any time
- **Right to Rectification**: Update your information through your account
- **Right to Erasure**: Request complete deletion of your account and data
- **Right to Data Portability**: Export your data in JSON format
- **Right to Withdraw Consent**: Opt-out of communications at any time

## Data Security
- **Encryption**: All data encrypted in transit (HTTPS) and at rest
- **Access Control**: Strict role-based access controls
- **Audit Logs**: All data access and modifications are logged
- **Backup**: Regular encrypted backups with 30-day retention

## Data Deletion
- **Automatic**: Inactive accounts may be deleted after 24 months of inactivity
- **On Request**: Immediate processing of deletion requests (within 30 days)
- **Backup Retention**: Deleted data removed from backups within 90 days

## Third-Party Services
- **Firebase/Google**: Hosting and analytics (GDPR compliant)
- **Resend**: Email delivery (GDPR compliant)
- **No Data Selling**: We never sell or share your data with third parties for marketing

## Contact
For data privacy inquiries: privacy@mfourlabs.com

Last Updated: December 8, 2025
    `.trim();
    }
}

// Export singleton instance
export const gdprService = new GDPRService();
