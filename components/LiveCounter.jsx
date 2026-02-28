import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LiveCounter = () => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 py-10 bg-slate-50 rounded-3xl border border-slate-100 px-6">
            <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-saffron mb-2 group-hover:scale-110 transition-transform">50+</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t('common.stats_protected')}</div>
            </div>
            <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-navy-blue mb-2 group-hover:scale-110 transition-transform">50+</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t('common.stats_blocked')}</div>
            </div>
            <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-india-green mb-2 group-hover:scale-110 transition-transform">0</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t('common.stats_platforms')}</div>
            </div>
        </div>
    );
};

export default LiveCounter;
