import { Timestamp } from 'firebase/firestore';

/**
 * Early Access User Registration Schema
 * Collection: lab_early_access_users
 */
export interface EarlyAccessUser {
    // Basic User Information
    name: string;
    email: string;
    dob: string; // ISO date string
    role: 'Student' | 'Independent Researcher' | 'Software Engineer' | 'Systems Architect' | 'Data Scientist' | 'Founder' | 'Other';
    organization: string;

    // Student-specific fields (conditional)
    studentLevel?: 'Undergraduate' | 'Masters / Graduate' | 'PhD / Doctorate' | 'Post-Doc';
    degree?: string;

    // Enhanced Data Collection
    interestAreas: string[]; // Multi-select: System Design, AI/ML Engineering, etc.
    experienceLevel: 'Beginner (0-2 years)' | 'Intermediate (2-5 years)' | 'Advanced (5-10 years)' | 'Expert (10+ years)';
    referralSource: 'Twitter/X' | 'YouTube' | 'Friend/Colleague' | 'Search Engine' | 'LinkedIn' | 'Reddit' | 'Other';
    motivation: string; // Optional text field

    // User Preferences
    privacy: boolean;
    newsletter: boolean;

    // Identity & Access
    accessId: string; // Unique 8-character ID
    referralCode: string; // Format: MFOUR-XXXXX
    referredBy: string | null; // Referral code of the person who referred them

    // Waitlist & Status Management
    waitlistPosition: number; // Position in the queue (1-indexed)
    status: 'pending' | 'approved' | 'active' | 'waitlist';
    approvedAt: Timestamp | null; // When admin approved access
    lastActiveAt: Timestamp; // Last interaction timestamp

    // Timestamps
    createdAt: Timestamp; // Registration date
    updatedAt: Timestamp; // Last update

    // Metadata (Security & Analytics)
    ipAddress: string; // For fraud detection
    userAgent: string; // Browser/device info
}

/**
 * Firestore Query Helpers
 */
export interface WaitlistStats {
    totalUsers: number;
    pendingCount: number;
    approvedCount: number;
    activeCount: number;
    averageWaitTime: number; // in days
}

/**
 * Priority Scoring System
 * Used to calculate user priority for early access
 */
export interface PriorityScore {
    userId: string;
    baseScore: number; // Based on registration date (earlier = higher)
    referralBonus: number; // +2 positions per referral
    engagementBonus: number; // Newsletter, social follows, etc.
    totalScore: number;
    calculatedPosition: number;
}

/**
 * Referral Tracking
 */
export interface ReferralStats {
    referralCode: string;
    userId: string;
    totalReferrals: number;
    successfulReferrals: number; // Referrals that completed registration
    positionImprovement: number; // How many positions they moved up
}
