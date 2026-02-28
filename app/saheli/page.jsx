"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useLanguage } from '@/context/LanguageContext';

function SaheliContent() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setError(t('saheli.error_no_token'));
            setLoading(false);
            return;
        }

        fetch(`/api/saheli?token=${encodeURIComponent(token)}`)
            .then(r => r.json())
            .then(d => {
                if (d.success) setData(d);
                else setError(d.error);
            })
            .catch(() => setError(t('saheli.error_failed')))
            .finally(() => setLoading(false));
    }, [token, t]);

    return (
        <main className="min-h-screen pb-24 bg-slate-50">
            <div className="w-full h-2 bg-saffron" />

            <section className="container mx-auto px-6 py-24 max-w-xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block bg-india-green/10 text-india-green border border-india-green/20 px-5 py-2 rounded-full text-sm font-bold mb-6">
                        {t('saheli.tag')}
                    </div>
                    <h1 className="text-4xl font-black text-navy-blue mb-3 tracking-tighter">{t('saheli.title')}</h1>
                    <p className="text-slate-500 font-medium">
                        {t('saheli.desc')}
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="bg-white rounded-[40px] p-12 text-center shadow-xl border border-slate-100">
                        <div className="w-8 h-8 border-2 border-saffron border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-400 font-medium">{t('saheli.loading')}</p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="bg-red-50 border border-red-200 rounded-[40px] p-12 text-center">
                        <div className="text-5xl mb-4">❌</div>
                        <h2 className="text-xl font-black text-red-700 mb-2">{t('saheli.error_invalid_title')}</h2>
                        <p className="text-red-600 font-medium text-sm">{error}</p>
                        <Link href="/" className="btn-outline mt-8 inline-block px-8 py-3 border-2">{t('saheli.btn_home')}</Link>
                    </div>
                )}

                {/* Case found */}
                {!loading && data && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-100">
                            {/* Status badge */}
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-8 ${data.status === 'active'
                                ? 'bg-india-green/10 text-india-green'
                                : 'bg-red-100 text-red-600'
                                }`}>
                                <span className={`w-2 h-2 rounded-full ${data.status === 'active' ? 'bg-india-green animate-pulse' : 'bg-red-500'}`} />
                                {data.status === 'active' ? t('saheli.status_active') : t('saheli.status_deleted')}
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: t('saheli.label_id'), value: data.case_id, mono: true },
                                    { label: t('saheli.label_count'), value: `${data.media_count} ${t('saheli.files_suffix')}` },
                                    { label: t('saheli.label_date'), value: new Date(data.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
                                    { label: t('saheli.label_status'), value: data.status === 'active' ? t('saheli.value_active') : t('saheli.value_revoked') },
                                ].map(item => (
                                    <div key={item.label} className="flex justify-between items-center py-3 border-b border-slate-50">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                        <span className={`font-black text-navy-blue ${item.mono ? 'font-mono text-sm' : ''}`}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What to do if something goes wrong */}
                        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6">
                            <h3 className="font-black text-amber-800 mb-2">{t('saheli.what_to_do_title')}</h3>
                            <ul className="text-amber-700 text-sm font-medium space-y-2">
                                <li>{t('saheli.what_to_do_1')}</li>
                                <li>{t('saheli.what_to_do_2')}</li>
                                <li>{t('saheli.what_to_do_3')}</li>
                                <li>{t('saheli.what_to_do_4')}</li>
                            </ul>
                        </div>

                        <div className="text-center">
                            <Link href="/support" className="text-navy-blue font-bold hover:underline text-sm">
                                {t('saheli.emergency_link')}
                            </Link>
                        </div>
                    </div>
                )}
            </section>

            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0" />
        </main>
    );
}

export default function SaheliPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>}>
            <SaheliContent />
        </Suspense>
    );
}
