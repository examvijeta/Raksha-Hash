"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HowToUsePage() {
    const { t } = useLanguage();

    const steps = [
        { step: '01', icon: '🏠', title: t('how_to_use.s1_title'), desc: t('how_to_use.s1_desc') },
        { step: '02', icon: '📋', title: t('how_to_use.s2_title'), desc: t('how_to_use.s2_desc') },
        { step: '03', icon: '🖼️', title: t('how_to_use.s3_title'), desc: t('how_to_use.s3_desc') },
        { step: '04', icon: '🤝', title: t('how_to_use.s4_title'), desc: t('how_to_use.s4_desc') },
        { step: '05', icon: '🛡️', title: t('how_to_use.s5_title'), desc: t('how_to_use.s5_desc') },
        { step: '06', icon: '🔑', title: t('how_to_use.s6_title'), desc: t('how_to_use.s6_desc') },
    ];

    return (
        <main className="min-h-screen pb-24">
            <div className="w-full h-2 bg-saffron" />
            <section className="container mx-auto px-6 py-24 max-w-4xl">
                <div className="inline-block bg-navy-blue/5 text-navy-blue px-4 py-1.5 rounded-full text-sm font-bold mb-8">
                    User Guide
                </div>
                <h1 className="text-5xl font-black text-navy-blue mb-4 tracking-tighter">
                    How to Use Raksha Hash
                </h1>
                <p className="text-xl text-slate-500 mb-16 font-medium leading-relaxed">
                    Protect your private images in under 60 seconds. Follow these steps:
                </p>

                <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100 hidden md:block" />
                    <div className="space-y-8">
                        {steps.map((s, i) => (
                            <div key={i} className="flex gap-8 group">
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-navy-blue text-white flex items-center justify-center font-black text-sm shadow-lg z-10 relative">
                                        {s.step}
                                    </div>
                                </div>
                                <div className="bg-white border border-slate-100 rounded-[32px] p-8 flex-1 shadow-sm hover:shadow-lg transition-all">
                                    <div className="text-3xl mb-3">{s.icon}</div>
                                    <h3 className="text-xl font-black text-navy-blue mb-3">{s.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-16 bg-saffron/5 border border-saffron/20 rounded-[40px] p-10">
                    <h3 className="text-2xl font-black text-navy-blue mb-6">💡 {t('how_to_use.tips_title')}</h3>
                    <ul className="space-y-4 text-slate-600 font-medium">
                        {['tip1', 'tip2', 'tip3', 'tip4'].map(tip => (
                            <li key={tip} className="flex gap-3">
                                <span className="text-saffron">→</span> {t(`how_to_use.${tip}`)}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-12 flex gap-4">
                    <Link href="/protect" className="btn-saffron px-12 py-4 text-lg">Start Protecting Now</Link>
                    <Link href="/faq" className="btn-outline px-12 py-4 text-lg border-2">Read FAQ</Link>
                </div>
            </section>
            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0" />
        </main>
    );
}
