import React from 'react';

interface AdBannerProps {
    type: 'banner' | 'tower';
}

/**
 * A responsive placeholder component for advertisements.
 * It is hidden on smaller screens (below lg) to avoid disrupting the user experience.
 * - 'banner' type is for wide, horizontal ad spaces.
 * - 'tower' type is for tall, vertical ad spaces.
 */
export const AdBanner: React.FC<AdBannerProps> = ({ type }) => {
    const isBanner = type === 'banner';

    const containerClasses = [
        'hidden lg:flex', // Only show on large screens to not disturb mobile users
        'w-full',
        'items-center',
        'justify-center',
        'rounded-xl',
        'bg-slate-800/30',
        'border',
        'border-dashed',
        'border-slate-700',
        'text-slate-500',
        'text-xs',
        'font-sans',
        'tracking-widest',
        'uppercase',
        'select-none',
        isBanner ? 'min-h-[90px]' : 'min-h-[250px]'
    ].join(' ');

    return (
        <div className={containerClasses} aria-label="Advertisement Space">
            <span>Advertisement</span>
        </div>
    );
};
