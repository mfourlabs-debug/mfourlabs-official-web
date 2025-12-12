import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface SocialProofBannerProps {
    earlyAccessEndDate: Date;
}

export const SocialProofBanner: React.FC<SocialProofBannerProps> = ({
    earlyAccessEndDate,
}) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [progress, setProgress] = useState(100);

    // Total duration: 90 days in milliseconds
    const TOTAL_DURATION = 6 * 24 * 60 * 60 * 1000;

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const endTime = earlyAccessEndDate.getTime();
            const difference = endTime - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });

                // Calculate progress percentage (time remaining out of 90 days)
                const progressPercentage = (difference / TOTAL_DURATION) * 100;
                setProgress(Math.min(100, Math.max(0, progressPercentage)));
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setProgress(0);
            }
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, [earlyAccessEndDate]);

    // Determine urgency level based on time remaining
    const getUrgencyLevel = () => {
        if (timeLeft.days <= 7) return 'critical';
        if (timeLeft.days <= 30) return 'urgent';
        return 'normal';
    };

    const urgencyLevel = getUrgencyLevel();

    // Color schemes based on urgency
    const colorSchemes = {
        normal: {
            gradient: 'from-brand-yellow/20 to-purple-500/20',
            border: 'border-brand-yellow/30',
            text: 'text-brand-yellow',
            progressBg: 'bg-brand-yellow/20',
            progressFill: 'bg-brand-yellow',
        },
        urgent: {
            gradient: 'from-orange-500/20 to-yellow-500/20',
            border: 'border-orange-500/30',
            text: 'text-orange-400',
            progressBg: 'bg-orange-500/20',
            progressFill: 'bg-orange-500',
        },
        critical: {
            gradient: 'from-red-500/20 to-orange-500/20',
            border: 'border-red-500/30',
            text: 'text-red-400',
            progressBg: 'bg-red-500/20',
            progressFill: 'bg-red-500',
        },
    };

    const colors = colorSchemes[urgencyLevel];

    return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.gradient} border ${colors.border} ${urgencyLevel === 'critical' ? 'animate-pulse-border' : ''}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            {/* Content */}
            <div className="relative p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Clock className={`w-5 h-5 ${colors.text}`} />
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wide">
                            Early Access Closes In
                        </h3>
                    </div>
                    {urgencyLevel === 'critical' && (
                        <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs font-bold text-red-400 animate-pulse">
                            Last Week!
                        </span>
                    )}
                    {urgencyLevel === 'urgent' && (
                        <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-xs font-bold text-orange-400">
                            Closing Soon
                        </span>
                    )}
                </div>

                {/* Countdown Timer */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <div className={`text-3xl font-bold tabular-nums ${colors.text}`}>
                            {timeLeft.days.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Days</div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <div className={`text-3xl font-bold tabular-nums ${colors.text}`}>
                            {timeLeft.hours.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Hours</div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <div className={`text-3xl font-bold tabular-nums ${colors.text}`}>
                            {timeLeft.minutes.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Mins</div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                        <div className={`text-3xl font-bold tabular-nums ${colors.text} ${urgencyLevel === 'critical' ? 'animate-pulse' : ''}`}>
                            {timeLeft.seconds.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Secs</div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Time Remaining</span>
                        <span className={`font-semibold ${colors.text}`}>{Math.round(progress)}%</span>
                    </div>
                    <div className={`h-2 ${colors.progressBg} rounded-full overflow-hidden`}>
                        <div
                            className={`h-full ${colors.progressFill} transition-all duration-1000 ease-linear relative overflow-hidden`}
                            style={{ width: `${progress}%` }}
                        >
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes pulse-border {
          0%, 100% { 
            border-color: rgba(239, 68, 68, 0.3);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
          }
          50% { 
            border-color: rgba(239, 68, 68, 0.6);
            box-shadow: 0 0 20px 0 rgba(239, 68, 68, 0.2);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};
