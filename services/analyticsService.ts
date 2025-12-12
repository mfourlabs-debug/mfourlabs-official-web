import { getAnalytics, logEvent, setUserProperties } from 'firebase/analytics';

// Analytics Service for tracking user behavior and conversions
class AnalyticsService {
    private analytics: any;
    private isInitialized: boolean = false;

    constructor() {
        if (typeof window !== 'undefined') {
            try {
                this.analytics = getAnalytics();
                this.isInitialized = true;
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.warn('Analytics not initialized:', error);
                }
            }
        }
    }

    // Track page views
    trackPageView(pageName: string, pageUrl?: string) {
        if (!this.isInitialized) return;

        logEvent(this.analytics, 'page_view', {
            page_name: pageName,
            page_url: pageUrl || window.location.href,
            timestamp: new Date().toISOString(),
        });
    }

    // Track registration funnel steps
    trackRegistrationFunnel(step: string, data?: Record<string, any>) {
        if (!this.isInitialized) return;

        const funnelSteps = {
            'landing_page_view': 'User viewed landing page',
            'lab_access_clicked': 'User clicked Lab Access button',
            'registration_modal_opened': 'Registration modal opened',
            'form_started': 'User started filling form',
            'form_field_completed': 'User completed a form field',
            'form_validation_error': 'Form validation error occurred',
            'form_submitted': 'User submitted registration form',
            'registration_completed': 'Registration successfully completed',
            'registration_failed': 'Registration failed',
        };

        logEvent(this.analytics, 'registration_funnel', {
            funnel_step: step,
            funnel_description: funnelSteps[step as keyof typeof funnelSteps] || step,
            ...data,
            timestamp: new Date().toISOString(),
        });
    }

    // Track form interactions
    trackFormInteraction(action: string, fieldName?: string, value?: any) {
        if (!this.isInitialized) return;

        logEvent(this.analytics, 'form_interaction', {
            action,
            field_name: fieldName,
            field_value: typeof value === 'string' ? value.substring(0, 50) : value, // Truncate for privacy
            timestamp: new Date().toISOString(),
        });
    }

    // Track time to complete registration
    trackRegistrationTime(startTime: number, endTime: number) {
        if (!this.isInitialized) return;

        const duration = endTime - startTime;
        const durationSeconds = Math.round(duration / 1000);

        logEvent(this.analytics, 'registration_duration', {
            duration_ms: duration,
            duration_seconds: durationSeconds,
            duration_minutes: Math.round(durationSeconds / 60),
            timestamp: new Date().toISOString(),
        });
    }

    // Track user demographics (roles, organizations)
    trackUserDemographics(data: {
        role?: string;
        organization?: string;
        studentLevel?: string;
        experienceLevel?: string;
        interestAreas?: string[];

    }) {
        if (!this.isInitialized) return;

        logEvent(this.analytics, 'user_demographics', {
            ...data,
            interest_areas_count: data.interestAreas?.length || 0,
            timestamp: new Date().toISOString(),
        });

        // Set user properties for segmentation
        if (data.role) {
            setUserProperties(this.analytics, { user_role: data.role });
        }
        if (data.experienceLevel) {
            setUserProperties(this.analytics, { experience_level: data.experienceLevel });
        }
    }

    // Track conversion from landing to registration
    trackConversion(source: string, data?: Record<string, any>) {
        if (!this.isInitialized) return;

        logEvent(this.analytics, 'conversion', {
            conversion_type: 'registration',
            conversion_source: source,
            ...data,
            timestamp: new Date().toISOString(),
        });
    }

    // Track social proof interactions
    trackSocialProofView(data: {
        spotsRemaining: number;
        timeRemaining: string;
        urgencyLevel: 'normal' | 'urgent' | 'critical';
    }) {
        if (!this.isInitialized) return;

        logEvent(this.analytics, 'social_proof_viewed', {
            spots_remaining: data.spotsRemaining,
            time_remaining: data.timeRemaining,
            urgency_level: data.urgencyLevel,
            timestamp: new Date().toISOString(),
        });
    }

    // Track errors
    trackError(errorType: string, errorMessage: string, context?: Record<string, any>) {
        if (!this.isInitialized) return;

        logEvent(this.analytics, 'error_occurred', {
            error_type: errorType,
            error_message: errorMessage.substring(0, 100), // Truncate for privacy
            ...context,
            timestamp: new Date().toISOString(),
        });
    }

    // Track button clicks
    trackButtonClick(buttonName: string, location: string, data?: Record<string, any>) {
        if (!this.isInitialized) return;

        logEvent(this.analytics, 'button_click', {
            button_name: buttonName,
            button_location: location,
            ...data,
            timestamp: new Date().toISOString(),
        });
    }



    // Track waitlist position
    trackWaitlistPosition(position: number) {
        if (!this.isInitialized) return;

        logEvent(this.analytics, 'waitlist_joined', {
            waitlist_position: position,
            timestamp: new Date().toISOString(),
        });
    }

    // Custom event tracking
    trackCustomEvent(eventName: string, data?: Record<string, any>) {
        if (!this.isInitialized) return;

        logEvent(this.analytics, eventName, {
            ...data,
            timestamp: new Date().toISOString(),
        });
    }
}

// Export singleton instance
export const analytics = new AnalyticsService();

// Helper function to track registration session
export class RegistrationSession {
    private startTime: number;
    private fieldCompletions: Record<string, boolean> = {};

    constructor() {
        this.startTime = Date.now();
        analytics.trackRegistrationFunnel('registration_modal_opened');
    }

    trackFieldCompletion(fieldName: string) {
        if (!this.fieldCompletions[fieldName]) {
            this.fieldCompletions[fieldName] = true;
            analytics.trackFormInteraction('field_completed', fieldName);
            analytics.trackRegistrationFunnel('form_field_completed', { field_name: fieldName });
        }
    }

    trackFieldError(fieldName: string, errorMessage: string) {
        analytics.trackFormInteraction('field_error', fieldName, errorMessage);
        analytics.trackRegistrationFunnel('form_validation_error', {
            field_name: fieldName,
            error_message: errorMessage,
        });
    }

    trackSubmit() {
        analytics.trackRegistrationFunnel('form_submitted');
    }

    trackCompletion(userData: any) {
        const endTime = Date.now();
        analytics.trackRegistrationTime(this.startTime, endTime);
        analytics.trackRegistrationFunnel('registration_completed', {
            fields_completed: Object.keys(this.fieldCompletions).length,
        });
        analytics.trackUserDemographics(userData);
        analytics.trackConversion('registration_form', userData);
    }

    trackFailure(error: string) {
        analytics.trackRegistrationFunnel('registration_failed', { error });
        analytics.trackError('registration_error', error);
    }
}
