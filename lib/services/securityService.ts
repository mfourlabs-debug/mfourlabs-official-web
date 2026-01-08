import { db } from './firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Security Service for registration protection
class SecurityService {
    private readonly RATE_LIMIT_COLLECTION = 'rate_limits';
    private readonly DUPLICATE_CHECK_COLLECTION = 'lab_early_access_users';

    /**
     * Rate Limiting - Prevent spam registrations
     * Limits: 3 attempts per IP per hour, 5 attempts per email per day
     */
    async checkRateLimit(email: string, ipAddress: string): Promise<{ allowed: boolean; reason?: string; retryAfter?: number }> {
        try {
            const now = new Date();
            const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
            const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

            // Check IP-based rate limit (3 per hour)
            if (!db) return { allowed: true }; // Fail open if DB not active

            const ipQuery = query(
                collection(db, this.RATE_LIMIT_COLLECTION),
                where('ipAddress', '==', ipAddress),
                where('timestamp', '>=', Timestamp.fromDate(oneHourAgo))
            );
            const ipSnapshot = await getDocs(ipQuery);

            if (ipSnapshot.size >= 3) {
                const oldestAttempt = ipSnapshot.docs[0].data().timestamp.toDate();
                const retryAfter = Math.ceil((oldestAttempt.getTime() + 60 * 60 * 1000 - now.getTime()) / 1000);
                return {
                    allowed: false,
                    reason: 'Too many registration attempts from this IP address. Please try again later.',
                    retryAfter,
                };
            }

            // Check email-based rate limit (5 per day)
            const emailQuery = query(
                collection(db, this.RATE_LIMIT_COLLECTION),
                where('email', '==', email.toLowerCase()),
                where('timestamp', '>=', Timestamp.fromDate(oneDayAgo))
            );
            const emailSnapshot = await getDocs(emailQuery);

            if (emailSnapshot.size >= 5) {
                const oldestAttempt = emailSnapshot.docs[0].data().timestamp.toDate();
                const retryAfter = Math.ceil((oldestAttempt.getTime() + 24 * 60 * 60 * 1000 - now.getTime()) / 1000);
                return {
                    allowed: false,
                    reason: 'Too many registration attempts with this email. Please try again tomorrow.',
                    retryAfter,
                };
            }

            return { allowed: true };
        } catch (error: any) {
            // Silently fail open on permission errors (likely unauthenticated user)
            if (process.env.NODE_ENV !== 'production' && error?.code !== 'permission-denied') {
                console.error('Rate limit check failed:', error);
            }
            // Fail open - allow registration if rate limit check fails
            return { allowed: true };
        }
    }

    /**
     * Log rate limit attempt
     */
    async logRateLimitAttempt(email: string, ipAddress: string, userAgent: string): Promise<void> {
        try {
            if (!db) return;
            await addDoc(collection(db, this.RATE_LIMIT_COLLECTION), {
                email: email.toLowerCase(),
                ipAddress,
                userAgent,
                timestamp: serverTimestamp(),
            });
        } catch (error: any) {
            if (process.env.NODE_ENV !== 'production' && error?.code !== 'permission-denied') {
                console.error('Failed to log rate limit attempt:', error);
            }
        }
    }

    /**
     * Duplicate Detection - Check for existing email
     */
    async checkDuplicateEmail(email: string): Promise<{ isDuplicate: boolean; existingUser?: any }> {
        try {
            if (!db) return { isDuplicate: false };

            const normalizedEmail = email.toLowerCase().trim();

            const q = query(
                collection(db, this.DUPLICATE_CHECK_COLLECTION),
                where('email', '==', normalizedEmail)
            );

            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const existingUser = snapshot.docs[0].data();
                return {
                    isDuplicate: true,
                    existingUser: {
                        name: existingUser.name,
                        registeredAt: existingUser.createdAt?.toDate?.()?.toISOString() || 'Unknown',
                        status: existingUser.status,
                        waitlistPosition: existingUser.waitlistPosition,
                    },
                };
            }

            return { isDuplicate: false };
        } catch (error: any) {
            if (process.env.NODE_ENV !== 'production' && error?.code !== 'permission-denied') {
                console.error('Duplicate check failed:', error);
            }
            // Fail open - allow registration if duplicate check fails
            return { isDuplicate: false };
        }
    }

    /**
     * Honeypot Validation - Detect bots
     * Honeypot field should be hidden and empty for legitimate users
     */
    validateHoneypot(honeypotValue: string): { isBot: boolean; reason?: string } {
        // If honeypot field has any value, it's likely a bot
        if (honeypotValue && honeypotValue.trim().length > 0) {
            return {
                isBot: true,
                reason: 'Honeypot field filled - likely automated submission',
            };
        }

        return { isBot: false };
    }

    /**
     * Email Format Validation (enhanced)
     */
    validateEmailFormat(email: string): { isValid: boolean; reason?: string } {
        // Basic format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { isValid: false, reason: 'Invalid email format' };
        }

        // Check for common disposable email domains
        const disposableDomains = [
            'tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com',
            'mailinator.com', 'trashmail.com', 'temp-mail.org', 'fakeinbox.com'
        ];

        const domain = email.split('@')[1]?.toLowerCase();
        if (disposableDomains.includes(domain)) {
            return { isValid: false, reason: 'Disposable email addresses are not allowed' };
        }

        // Check for suspicious patterns
        if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
            return { isValid: false, reason: 'Invalid email format' };
        }

        return { isValid: true };
    }

    /**
     * Comprehensive security check
     */
    async performSecurityChecks(data: {
        email: string;
        ipAddress: string;
        userAgent: string;
        honeypot: string;
    }): Promise<{ passed: boolean; errors: string[]; warnings: string[] }> {
        const errors: string[] = [];
        const warnings: string[] = [];

        // 1. Honeypot check
        const honeypotResult = this.validateHoneypot(data.honeypot);
        if (honeypotResult.isBot) {
            errors.push('Automated submission detected. Please try again.');
            return { passed: false, errors, warnings };
        }

        // 2. Email format validation
        const emailValidation = this.validateEmailFormat(data.email);
        if (!emailValidation.isValid) {
            errors.push(emailValidation.reason || 'Invalid email address');
        }

        // 3. Duplicate check
        const duplicateCheck = await this.checkDuplicateEmail(data.email);
        if (duplicateCheck.isDuplicate) {
            errors.push(
                `This email is already registered. You joined on ${duplicateCheck.existingUser?.registeredAt}. ` +
                `Your waitlist position is #${duplicateCheck.existingUser?.waitlistPosition}.`
            );
        }

        // 4. Rate limiting
        const rateLimitCheck = await this.checkRateLimit(data.email, data.ipAddress);
        if (!rateLimitCheck.allowed) {
            errors.push(rateLimitCheck.reason || 'Rate limit exceeded');
            if (rateLimitCheck.retryAfter) {
                const minutes = Math.ceil(rateLimitCheck.retryAfter / 60);
                warnings.push(`Please try again in ${minutes} minute${minutes > 1 ? 's' : ''}`);
            }
        }

        // 5. Suspicious user agent check
        if (!data.userAgent || data.userAgent.length < 10) {
            warnings.push('Unusual browser detected');
        }

        const passed = errors.length === 0;
        return { passed, errors, warnings };
    }

    /**
     * Generate email verification token
     */
    generateVerificationToken(): string {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Create verification record
     */
    async createVerificationRecord(email: string, token: string): Promise<void> {
        try {
            if (!db) throw new Error('Firebase is not initialized');

            await addDoc(collection(db, 'email_verifications'), {
                email: email.toLowerCase(),
                token,
                verified: false,
                createdAt: serverTimestamp(),
                expiresAt: Timestamp.fromDate(new Date(Date.now() + 24 * 60 * 60 * 1000)), // 24 hours
            });
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Failed to create verification record:', error);
            }
            throw error;
        }
    }

    /**
     * Verify email token
     */
    async verifyEmailToken(token: string): Promise<{ valid: boolean; email?: string; error?: string }> {
        try {
            if (!db) throw new Error('Firebase is not initialized');

            const q = query(
                collection(db, 'email_verifications'),
                where('token', '==', token),
                where('verified', '==', false)
            );

            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                return { valid: false, error: 'Invalid or expired verification link' };
            }

            const verificationDoc = snapshot.docs[0];
            const data = verificationDoc.data();

            // Check if expired
            const expiresAt = data.expiresAt.toDate();
            if (expiresAt < new Date()) {
                return { valid: false, error: 'Verification link has expired' };
            }

            // Mark as verified
            const { updateDoc, doc } = await import('firebase/firestore');
            await updateDoc(doc(db, 'email_verifications', verificationDoc.id), {
                verified: true,
                verifiedAt: serverTimestamp(),
            });

            return { valid: true, email: data.email };
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Email verification failed:', error);
            }
            return { valid: false, error: 'Verification failed. Please try again.' };
        }
    }

    /**
     * Check if email is verified
     */
    async isEmailVerified(email: string): Promise<boolean> {
        try {
            if (!db) return false;

            const q = query(
                collection(db, 'email_verifications'),
                where('email', '==', email.toLowerCase()),
                where('verified', '==', true)
            );

            const snapshot = await getDocs(q);
            return !snapshot.empty;
        } catch (error: any) {
            if (process.env.NODE_ENV !== 'production' && error?.code !== 'permission-denied') {
                console.error('Email verification check failed:', error);
            }
            return false;
        }
    }
}

// Export singleton instance
export const securityService = new SecurityService();
