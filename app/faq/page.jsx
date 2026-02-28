"use client";
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQPage() {
    const { t } = useLanguage();

    // Generate FAQ array keys dynamically or just fetch from t()
    // For simplicity and better translation control, we can define the keys in JSON
    // but here we will map them if they exist as an array in JSON or just hardcode the count if static.
    const faqCount = 11; // 0 to 10
    const faqs = Array.from({ length: faqCount }, (_, i) => ({
        q: t(`faq.q${i}`),
        a: t(`faq.a${i}`)
    }));

    return (
        <main className="min-h-screen pb-24 bg-slate-50">
            <div className="w-full h-2 bg-saffron" />
            <section className="container mx-auto px-6 py-24 max-w-3xl">
                <div className="inline-block bg-navy-blue/5 text-navy-blue px-4 py-1.5 rounded-full text-sm font-bold mb-8">
                    {t('faq.tag')}
                </div>
                <h1 className="text-5xl font-black text-navy-blue mb-4 tracking-tighter">
                    {t('faq.title')}
                </h1>
                <p className="text-xl text-slate-500 mb-16 font-medium">{t('faq.desc')}</p>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <details key={i} className="group bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
                            <summary className="flex justify-between items-center p-8 cursor-pointer font-bold text-navy-blue text-lg list-none">
                                {faq.q}
                                <span className="text-saffron text-2xl font-light transition-transform group-open:rotate-45 ml-4 flex-shrink-0">+</span>
                            </summary>
                            <div className="px-8 pb-8 text-slate-600 font-medium leading-relaxed text-base border-t border-slate-50 pt-4">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium mb-4">{t('faq.still_questions')}</p>
                    <Link href="/support" className="btn-saffron px-12 py-4 text-lg">{t('faq.btn_contact')}</Link>
                </div>
            </section>
            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0" />
        </main>
    );
}
