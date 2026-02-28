import React from 'react';

const TrustBadges = () => {
    const badges = [
        { name: 'NCW Reporting', icon: '🏛️', sub: 'National Commission for Women' },
        { name: 'Cyber Crime', icon: '🛡️', sub: 'Government of India Portal' },
        { name: 'Open Source', icon: '📁', sub: 'GitHub Verified Code' },
        { name: 'iCall TISS', icon: '📞', sub: 'Helpline Partner' }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            {badges.map((badge) => (
                <div key={badge.name} className="flex flex-col items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-3xl mb-2">{badge.icon}</span>
                    <span className="font-bold text-navy-blue text-center text-sm">{badge.name}</span>
                    <span className="text-xs text-slate-500 text-center">{badge.sub}</span>
                </div>
            ))}
        </div>
    );
};

export default TrustBadges;
