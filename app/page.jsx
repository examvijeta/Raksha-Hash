"use client";
import Image from "next/image";
import Link from "next/link";
import TrustBadges from "@/components/TrustBadges";
import LiveCounter from "@/components/LiveCounter";
import dynamic from "next/dynamic";
import { useLanguage } from "../context/LanguageContext";

const ImageHasher = dynamic(() => import("@/components/ImageHasher"), {
    ssr: false,
    loading: () => <div className="w-full max-w-2xl mx-auto p-12 bg-white rounded-[32px] animate-pulse border border-slate-100 h-64 flex items-center justify-center text-slate-300 italic">Loading Protection Shield...</div>
});

export default function Home() {
    const { t, locale } = useLanguage();

    // Helper to render title with 3-color sequence (Orange, Blue, Green)
    const renderTitle = () => {
        const fullText = t('common.hero_title');
        const parts = fullText.split(/<\/?\d>/);

        if (parts.length >= 6) {
            return (
                <span className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 flex-wrap">
                    <span className="text-saffron uppercase">{parts[1]}</span>
                    <span className="text-navy-blue uppercase">{parts[3]}</span>
                    <span className="text-india-green uppercase">{parts[5]}</span>
                </span>
            );
        }
        return fullText;
    };

    return (
        <main className="min-h-screen pb-24">
            {/* 1. Indian Flag 3-Stripe Header Mockup via Top Banner */}
            <div className="w-full h-2 bg-saffron" />

            {/* 2. Top Privacy Banner */}
            <div className="trust-banner">
                <span>{t('common.privacy_banner')}</span>
            </div>

            {/* 3. Hero Section */}
            <section className="container mx-auto px-6 py-24 text-center">
                <div className="inline-block bg-saffron/10 text-saffron px-6 py-2 rounded-full text-sm font-bold mb-8 animate-bounce">
                    {t('common.hero_tag')}
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-navy-blue leading-tight mb-8 tracking-tighter mx-auto max-w-5xl">
                    {renderTitle()}
                </h1>

                <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                    {t('common.hero_desc')}
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-20">
                    <Link href="/protect" className="btn-saffron w-full md:w-auto px-16 py-5 text-xl">
                        {t('common.cta_protect')}
                    </Link>
                    <Link href="/help" className="btn-outline w-full md:w-auto px-12 py-5 text-xl border-2">
                        {t('common.cta_help')}
                    </Link>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-t from-saffron/10 to-transparent rounded-full blur-3xl -z-10 opacity-30"></div>
                    <img
                        src="/assets/hero-girl.png"
                        alt="Digital Shield Hero"
                        className="w-full h-auto drop-shadow-2xl animate-float"
                    />
                </div>
            </section>

            {/* 4. Social Proof / Stats */}
            <section className="container mx-auto px-6 mb-20 whitespace-nowrap overflow-hidden">
                <LiveCounter />
            </section>

            {/* 5. Trust Badges / Partners */}
            <section className="container mx-auto px-6 mb-20">
                <h2 className="text-4xl font-black text-center mb-10 text-navy-blue">
                    {t('common.partners_title')}
                </h2>
                <TrustBadges />
            </section>

            {/* 6. How it Works (Short) */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-black text-navy-blue text-center mb-16 tracking-tight">
                        {t('common.how_it_works_title')}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {/* Step 1 */}
                        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="w-full aspect-square mb-8 overflow-hidden rounded-3xl bg-slate-50">
                                <img
                                    src="/assets/step1.png"
                                    alt="Select Images"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-4xl font-black text-saffron/20 leading-none">01</span>
                                <div>
                                    <h3 className="text-2xl font-bold text-navy-blue mb-2">{t('common.step1_title')}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">{t('common.step1_desc')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="w-full aspect-square mb-8 overflow-hidden rounded-3xl bg-slate-50">
                                <img
                                    src="/assets/step2.png"
                                    alt="Register Hash"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-4xl font-black text-navy-blue/10 leading-none">02</span>
                                <div>
                                    <h3 className="text-2xl font-bold text-navy-blue mb-2">{t('common.step2_title')}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">{t('common.step2_desc')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="w-full aspect-square mb-8 overflow-hidden rounded-3xl bg-slate-50">
                                <img
                                    src="/assets/step3.png"
                                    alt="Stay Protected"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-4xl font-black text-india-green/20 leading-none">03</span>
                                <div>
                                    <h3 className="text-2xl font-bold text-navy-blue mb-2">{t('common.step3_title')}</h3>
                                    <p className="text-slate-500 leading-relaxed font-medium">{t('common.step3_desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Bottom SOS Bar (Sticky) */}
            <div className="sos-bar">
                <div className="flex items-center gap-2">
                    <span className="text-xl animate-pulse">🆘</span>
                    <span className="hidden sm:inline">{t('common.sos_help')}</span>
                </div>
                <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar">
                    <a href="tel:7827170170" className="whitespace-nowrap">{t('common.sos_ncw')}</a>
                    <a href="tel:1930" className="whitespace-nowrap">{t('common.sos_cyber')}</a>
                    <a href="tel:9152987821" className="whitespace-nowrap">{t('common.sos_icall')}</a>
                </div>
            </div>

            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0 z-[60]" />
        </main>
    );
}
