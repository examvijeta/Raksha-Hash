"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen pb-24">
            <div className="w-full h-2 bg-saffron" />
            <section className="container mx-auto px-6 py-24 max-w-4xl">
                <div className="inline-block bg-navy-blue/5 text-navy-blue px-4 py-1.5 rounded-full text-sm font-bold mb-8">
                    {t('about.tag')}
                </div>
                <h1 className="text-5xl font-black text-navy-blue mb-8 tracking-tighter leading-tight">
                    {t('about.title_part1')} <span className="text-saffron">{t('about.title_part2')}</span>
                </h1>

                <div className="prose max-w-none space-y-8 text-xl text-slate-600 leading-relaxed font-medium">
                    <p>
                        <strong className="text-navy-blue">Raksha Hash</strong> {t('about.desc_p1')}
                    </p>
                    <p>
                        {t('about.desc_p2')}
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 not-prose">
                        {[
                            { icon: '🛡️', title: t('about.privacy_title'), desc: t('about.privacy_desc') },
                            { icon: '⚡', title: t('about.instant_title'), desc: t('about.instant_desc') },
                            { icon: '🆓', title: t('about.free_title'), desc: t('about.free_desc') },
                        ].map(card => (
                            <div key={card.title} className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 hover:shadow-lg transition-all">
                                <div className="text-4xl mb-4">{card.icon}</div>
                                <h3 className="font-black text-navy-blue text-xl mb-2">{card.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-3xl font-black text-navy-blue mt-16">{t('about.how_it_works')}</h2>
                    <p>
                        {t('about.tech_desc')}
                    </p>
                    <ol className="space-y-4 not-prose pl-4">
                        {[
                            t('about.step1'),
                            t('about.step2'),
                            t('about.step3'),
                            t('about.step4'),
                        ].map((step, i) => (
                            <li key={i} className="flex gap-4 text-slate-600 font-medium text-lg">
                                <span className="bg-saffron text-white rounded-full w-8 h-8 flex items-center justify-center font-black flex-shrink-0 text-sm">{i + 1}</span>
                                {step}
                            </li>
                        ))}
                    </ol>

                    <div className="bg-navy-blue text-white p-10 rounded-[40px] not-prose mt-12">
                        <h3 className="text-2xl font-black mb-3">{t('about.builder_title')}</h3>
                        <p className="text-slate-300 leading-relaxed font-medium">
                            {t('about.builder_desc')}
                        </p>
                    </div>
                </div>

                <div className="mt-16 flex gap-4">
                    <Link href="/protect" className="btn-saffron px-12 py-4 text-lg">{t('about.btn_protect')}</Link>
                    <Link href="/faq" className="btn-outline px-12 py-4 text-lg border-2">{t('about.btn_faq')}</Link>
                </div>
            </section>
            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0" />
        </main>
    );
}
