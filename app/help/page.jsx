"use client";
import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HelpPage() {
    const { t } = useLanguage();

    const resources = [
        {
            title: t('common.sos_ncw') || "National Commission for Women (NCW)",
            desc: t('help.res_ncw_desc'),
            phone: "7827170170",
            icon: "📞"
        },
        {
            title: t('common.sos_cyber') || "Cyber Crime Helpline",
            desc: t('help.res_cyber_desc'),
            phone: "1930",
            icon: "💻"
        },
        {
            title: t('common.sos_icall') || "iCall - Psychosocial Helpline",
            desc: t('help.res_icall_desc'),
            phone: "9152987821",
            icon: "🧠"
        }
    ];

    return (
        <main className="min-h-screen pb-24 bg-white">
            <div className="w-full h-2 bg-saffron" />

            <section className="container mx-auto px-6 py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block bg-red-100 text-red-600 px-6 py-2 rounded-full text-sm font-bold mb-8 animate-pulse">
                        🆘 {t('common.cta_help')}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-navy-blue mb-8 tracking-tighter">
                        {t('help.title_part1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">{t('help.title_part2')}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 mb-16 font-medium leading-relaxed">
                        {t('help.desc')}
                    </p>

                    <div className="grid gap-8 text-left mb-16">
                        {resources.map((res, idx) => (
                            <div key={idx} className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 hover:border-navy-blue/20 transition-all group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                    <div className="flex gap-6 items-start">
                                        <span className="text-4xl bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">{res.icon}</span>
                                        <div>
                                            <h3 className="text-2xl font-black text-navy-blue mb-2">{res.title}</h3>
                                            <p className="text-slate-500 font-medium">{res.desc}</p>
                                        </div>
                                    </div>
                                    <a
                                        href={`tel:${res.phone}`}
                                        className="bg-navy-blue text-white px-10 py-5 rounded-2xl font-black text-center hover:bg-slate-900 transition-all shadow-xl active:scale-95"
                                    >
                                        {t('help.call_btn')} {res.phone}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-navy-blue p-12 rounded-[56px] text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-black mb-6">{t('help.next_steps_title')}</h2>
                            <div className="grid md:grid-cols-3 gap-8 text-left">
                                <div className="bg-white/10 p-6 rounded-3xl">
                                    <span className="block text-2xl mb-4 text-saffron font-black">01</span>
                                    <p className="font-medium text-slate-200">{t('help.next_step1')}</p>
                                </div>
                                <div className="bg-white/10 p-6 rounded-3xl">
                                    <span className="block text-2xl mb-4 text-saffron font-black">02</span>
                                    <p className="font-medium text-slate-200">{t('help.next_step2')}</p>
                                </div>
                                <div className="bg-white/10 p-6 rounded-3xl">
                                    <span className="block text-2xl mb-4 text-saffron font-black">03</span>
                                    <p className="font-medium text-slate-200">{t('help.next_step3')}</p>
                                </div>
                            </div>
                            <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
                                <Link href="/protect" className="bg-white text-navy-blue px-12 py-5 rounded-2xl font-black hover:bg-slate-100 transition-all shadow-xl">
                                    {t('help.btn_protect')}
                                </Link>
                                <Link href="/" className="bg-navy-blue border-2 border-white/20 text-white px-12 py-5 rounded-2xl font-black hover:bg-white/10 transition-all">
                                    {t('help.btn_home')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0" />
        </main>
    );
}
