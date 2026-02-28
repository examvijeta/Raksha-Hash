"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function VerifyPage() {
    const { t } = useLanguage();
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            num: '01',
            title: t('verify.step1_t'),
            icon: '🔧',
            desc: t('verify.step1_d'),
            tips: [
                { browser: 'Chrome / Edge', key: 'F12  or  Ctrl + Shift + I' },
                { browser: 'Firefox', key: 'F12  or  Ctrl + Shift + I' },
                { browser: 'Safari (Mac)', key: 'Cmd + Option + I' },
            ],
            proof: null,
        },
        {
            num: '02',
            title: t('verify.step2_t'),
            icon: '📡',
            desc: t('verify.step2_d'),
            tips: [
                { browser: t('verify.tip'), key: t('verify.step2_tip') },
                { browser: t('verify.filter'), key: t('verify.step2_filter') },
            ],
            proof: null,
        },
        {
            num: '03',
            title: t('verify.step3_t'),
            icon: '🖼️',
            desc: t('verify.step3_d'),
            tips: [
                { browser: t('verify.watch'), key: t('verify.step3_watch') },
                { browser: t('verify.notice'), key: t('verify.step3_notice') },
            ],
            proof: null,
        },
        {
            num: '04',
            title: t('verify.step4_t'),
            icon: '🔍',
            desc: t('verify.step4_d'),
            tips: [
                { browser: t('verify.you_see'), key: '{"hashes": ["a3f4c2d1..."]}' },
                { browser: t('verify.img_size'), key: t('verify.step4_size') },
            ],
            proof: t('verify.step4_proof'),
        },
        {
            num: '05',
            title: t('verify.step5_t'),
            icon: '✅',
            desc: t('verify.step5_d'),
            tips: [
                { browser: t('verify.example'), key: t('verify.step5_ex') },
                { browser: t('verify.conclusion'), key: t('verify.step5_conc') },
            ],
            proof: t('verify.step5_proof'),
        },
    ];

    return (
        <main className="min-h-screen pb-24">
            <div className="w-full h-2 bg-saffron" />

            {/* Hero */}
            <section className="bg-navy-blue text-white py-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="inline-block bg-india-green/20 text-india-green border border-india-green/30 px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
                        {t('verify.tag')}
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
                        {t('verify.title_p1')} <span className="text-saffron">{t('verify.title_p2')}</span>
                    </h1>
                    <p className="text-xl text-slate-300 font-medium mb-6 max-w-2xl mx-auto">
                        {t('verify.desc')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-400">
                        <span>✓ {t('verify.feat1')}</span>
                        <span>·</span>
                        <span>✓ {t('verify.feat2')}</span>
                        <span>·</span>
                        <span>✓ {t('verify.feat3')}</span>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="container mx-auto px-6 py-12 max-w-4xl">
                <div className="bg-saffron/5 border border-saffron/20 rounded-[40px] p-8 md:p-12 mb-16">
                    <h2 className="text-2xl font-black text-navy-blue mb-6">🧠 {t('verify.how_works_title')}</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-sm font-medium text-slate-600">
                        {[
                            { icon: '🖼️', key: 'how1' },
                            { icon: '⚙️', key: 'how2' },
                            { icon: '📤', key: 'how3' },
                        ].map(item => (
                            <div key={item.key} className="flex gap-4">
                                <span className="text-3xl">{item.icon}</span>
                                <div>
                                    <p className="font-bold text-navy-blue mb-1">{t(`verify.${item.key}_t`)}</p>
                                    <p>{t(`verify.${item.key}_d`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step-by-step guide */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar nav */}
                    <aside className="md:w-56 flex-shrink-0">
                        <div className="md:sticky md:top-24 space-y-2">
                            {steps.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveStep(i)}
                                    className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-3 ${activeStep === i
                                        ? 'bg-navy-blue text-white shadow-lg'
                                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                >
                                    <span className={`text-xs font-black ${activeStep === i ? 'text-saffron' : 'text-slate-300'}`}>
                                        {s.num}
                                    </span>
                                    {s.title}
                                </button>
                            ))}

                            <Link
                                href="/protect"
                                className="btn-saffron w-full text-center py-3 text-sm mt-4 block"
                            >
                                {t('verify.btn_try')}
                            </Link>
                        </div>
                    </aside>

                    {/* Step content */}
                    <div className="flex-1">
                        {steps.map((s, i) => (
                            <div
                                key={i}
                                className={`transition-all duration-300 ${activeStep === i ? 'block' : 'hidden'}`}
                            >
                                <div className="bg-white border-2 border-slate-100 rounded-[40px] p-8 md:p-12">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-5xl">{s.icon}</span>
                                        <div>
                                            <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{t('verify.step')} {s.num}</span>
                                            <h2 className="text-2xl font-black text-navy-blue">{s.title}</h2>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 font-medium text-lg mb-8 leading-relaxed">{s.desc}</p>

                                    <div className="space-y-3 mb-8">
                                        {s.tips.map((tip, j) => (
                                            <div key={j} className="flex gap-4 bg-slate-50 rounded-2xl p-4 items-start">
                                                <span className="text-xs font-black text-slate-400 uppercase tracking-wider flex-shrink-0 mt-0.5 w-20">{tip.browser}</span>
                                                <code className="text-navy-blue font-bold text-sm flex-1">{tip.key}</code>
                                            </div>
                                        ))}
                                    </div>

                                    {s.proof && (
                                        <div className="bg-india-green/5 border border-india-green/20 rounded-2xl p-6">
                                            <p className="text-india-green font-bold text-sm">✓ {s.proof}</p>
                                        </div>
                                    )}

                                    <div className="flex gap-4 mt-8">
                                        {i > 0 && (
                                            <button
                                                onClick={() => setActiveStep(i - 1)}
                                                className="btn-outline px-6 py-3 border-2 text-sm"
                                            >
                                                ← {t('common.back')}
                                            </button>
                                        )}
                                        {i < steps.length - 1 ? (
                                            <button
                                                onClick={() => setActiveStep(i + 1)}
                                                className="btn-saffron px-8 py-3 text-sm ml-auto"
                                            >
                                                {t('verify.btn_next')}
                                            </button>
                                        ) : (
                                            <Link href="/protect" className="btn-saffron px-8 py-3 text-sm ml-auto">
                                                {t('verify.btn_protect_final')}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 bg-navy-blue rounded-[48px] p-12 text-white text-center">
                    <h2 className="text-3xl font-black mb-4">{t('verify.footer_t')}</h2>
                    <p className="text-slate-300 font-medium mb-8 max-w-xl mx-auto">
                        {t('verify.footer_d')}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/security" className="btn-outline border-white/30 text-white px-8 py-3 border-2 hover:bg-white/10">
                            {t('verify.btn_sec')}
                        </Link>
                        <Link href="/protect" className="btn-saffron px-8 py-3">
                            {t('verify.btn_protect_final')}
                        </Link>
                    </div>
                </div>
            </section>

            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0" />
        </main>
    );
}
