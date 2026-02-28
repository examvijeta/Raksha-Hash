"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen pb-24 bg-slate-50">
            <div className="w-full h-2 bg-saffron" />
            <section className="container mx-auto px-6 py-24 max-w-3xl">
                <div className="inline-block bg-navy-blue/5 text-navy-blue px-4 py-1.5 rounded-full text-sm font-bold mb-8">
                    {t('terms.tag')}
                </div>
                <h1 className="text-5xl font-black text-navy-blue mb-4 tracking-tighter">{t('terms.title')}</h1>
                <p className="text-slate-400 text-sm font-medium mb-16">{t('terms.effective')}</p>

                <div className="space-y-12 text-slate-600 font-medium leading-relaxed">
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm mb-12">
                        <h2 className="text-2xl font-black text-navy-blue mb-6">{t('terms.summary_title')}</h2>
                        <div className="space-y-6">
                            {[
                                { key: 'sum1' },
                                { key: 'sum2' },
                                { key: 'sum3' },
                            ].map(item => (
                                <div key={item.key} className="flex gap-4">
                                    <span className="text-india-green font-black">✓</span>
                                    <div>
                                        <p className="font-bold text-navy-blue mb-1">{t(`terms.${item.key}_t`)}</p>
                                        <p className="text-sm">{t(`terms.${item.key}_d`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <section>
                        <h2 className="text-2xl font-black text-navy-blue mb-4">1. Eligibility</h2>
                        <p>You must be 18 years of age or older to use Raksha Hash. By submitting image hashes, you confirm that you appear in the images and that you are submitting them without anyone else's coercion.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-black text-navy-blue mb-4">2. Acceptable Use</h2>
                        <p>Raksha Hash is provided exclusively for survivors and potential victims of NCII abuse. Misuse — including registering images of others without consent, or registering commercial content — will result in permanent account termination and may be reported to law enforcement.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-black text-navy-blue mb-4">3. No Warranty</h2>
                        <p>While we work hard to ensure comprehensive protection, we cannot guarantee that every platform will check against our database. Protection is contingent on platform adoption.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-black text-navy-blue mb-4">4. Limitation of Liability</h2>
                        <p>Raksha Hash shall not be liable for any damages arising from use of this service, including but not limited to failure to detect or block NCII on platforms not integrated with our service.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-black text-navy-blue mb-4">5. Governing Law</h2>
                        <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in New Delhi.</p>
                    </section>
                </div>

                <div className="mt-16 flex gap-4">
                    <Link href="/privacy" className="btn-saffron px-12 py-4 text-lg">{t('terms.btn_privacy')}</Link>
                    <Link href="/" className="btn-outline px-12 py-4 text-lg border-2">{t('common.back')}</Link>
                </div>

                <p className="mt-12 text-slate-400 text-xs font-medium italic">
                    {t('terms.last_reviewed')}
                </p>
            </section>
            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0" />
        </main>
    );
}
