"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function SecurityPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen pb-24 bg-slate-50">
            <div className="w-full h-2 bg-saffron" />
            <section className="container mx-auto px-6 py-24 max-w-4xl">
                <div className="inline-block bg-navy-blue/5 text-navy-blue px-4 py-1.5 rounded-full text-sm font-bold mb-8">
                    {t('security.tag')}
                </div>
                <h1 className="text-5xl font-black text-navy-blue mb-4 tracking-tighter">
                    {t('security.title')}
                </h1>
                <p className="text-xl text-slate-500 mb-16 font-medium leading-relaxed">
                    {t('security.desc')}
                </p>

                {/* Key Facts */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {[
                        { icon: '🖥️', key: 'fact1' },
                        { icon: '🔢', key: 'fact2' },
                        { icon: '🔐', key: 'fact3' },
                    ].map(item => (
                        <div key={item.key} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="font-black text-navy-blue text-xl mb-2">{t(`security.${item.key}_title`)}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed text-sm">{t(`security.${item.key}_desc`)}</p>
                        </div>
                    ))}
                </div>

                {/* Tech Detail */}
                <div className="bg-navy-blue text-white rounded-[48px] p-10 md:p-16 mb-12">
                    <h2 className="text-3xl font-black mb-8">{t('security.pdq_title')}</h2>
                    <div className="space-y-6 text-slate-300 font-medium leading-relaxed">
                        <p dangerouslySetInnerHTML={{ __html: (t('security.pdq_p1') || '').replace('<0>', '<strong class="text-white">').replace('</0>', '</strong>') }} />
                        <p>
                            {t('security.pdq_p2')}
                        </p>
                        <p>
                            {t('security.pdq_p3')}
                        </p>
                        <div className="bg-white/10 rounded-2xl p-6 font-mono text-sm text-slate-200">
                            <p className="text-slate-400 text-xs font-sans mb-2">{t('security.pdq_example_label')}</p>
                            <p>hash: "f8c47b3a9d56e201..."</p>
                            <p>case_id: "RH-XK7LM9P"</p>
                            <p>timestamp: "2025-02-28T..."</p>
                            <p className="text-red-400 mt-2">{t('security.pdq_no_image')}</p>
                        </div>
                    </div>
                </div>

                {/* Open Source */}
                <div className="bg-india-green/5 border border-india-green/20 rounded-[40px] p-10 mb-12">
                    <h2 className="text-2xl font-black text-navy-blue mb-4">{t('security.oss_title')}</h2>
                    <p className="text-slate-600 font-medium leading-relaxed mb-4">
                        {t('security.oss_desc')}
                    </p>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-navy-blue font-bold hover:text-saffron transition-colors">
                        {t('security.oss_link')}
                    </a>
                </div>

                <div className="flex gap-4">
                    <Link href="/privacy" className="btn-saffron px-12 py-4 text-lg">{t('security.btn_privacy')}</Link>
                    <Link href="/faq" className="btn-outline px-12 py-4 text-lg border-2">{t('security.btn_faq')}</Link>
                </div>
            </section>
            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0" />
        </main>
    );
}
