"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Dashboard() {
    const { t } = useLanguage();
    const [caseId, setCaseId] = useState('');
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [caseData, setCaseData] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const handleLookup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setCaseData(null);

        try {
            const res = await fetch(`/api/cases?id=${encodeURIComponent(caseId)}&pin=${encodeURIComponent(pin)}`);
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Lookup failed');
            setCaseData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm(t('dashboard.confirm_delete'))) return;

        setDeleting(true);
        try {
            const res = await fetch('/api/cases/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ case_id: caseId, pin }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Delete failed');
            setDeleted(true);
            setCaseData(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <main className="min-h-screen pb-24 bg-slate-50">
            <div className="w-full h-2 bg-saffron" />

            <section className="container mx-auto px-6 py-24 max-w-2xl">
                <h1 className="text-5xl font-black text-navy-blue mb-4 tracking-tighter text-center">
                    {t('navbar.dashboard')}
                </h1>
                <p className="text-xl text-slate-500 mb-12 font-medium text-center">
                    {t('dashboard.desc')}
                </p>

                {/* Deleted state */}
                {deleted && (
                    <div className="bg-red-50 border border-red-200 rounded-[40px] p-12 text-center">
                        <div className="text-5xl mb-4">🗑️</div>
                        <h2 className="text-2xl font-black text-red-700 mb-2">{t('dashboard.case_deleted')}</h2>
                        <p className="text-red-600 font-medium">{t('dashboard.case_deleted_desc')}</p>
                        <Link href="/" className="btn-outline mt-8 inline-block px-8 py-3 border-2">{t('dashboard.btn_home')}</Link>
                    </div>
                )}

                {/* Lookup form */}
                {!deleted && !caseData && (
                    <form onSubmit={handleLookup} className="bg-white rounded-[48px] p-8 md:p-12 shadow-xl border border-slate-100">
                        <div className="space-y-6 mb-8">
                            <div>
                                <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-2">{t('dashboard.label_case')}</label>
                                <input
                                    type="text"
                                    placeholder="RH-XXXXXXXXX"
                                    value={caseId}
                                    required
                                    onChange={(e) => setCaseId(e.target.value.toUpperCase())}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-mono font-bold text-navy-blue focus:outline-none focus:border-saffron transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-2">{t('dashboard.label_pin')}</label>
                                <input
                                    type="password"
                                    placeholder="****"
                                    maxLength={4}
                                    required
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-mono font-bold text-navy-blue focus:outline-none focus:border-saffron transition-colors"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl font-medium text-sm">
                                ❌ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-saffron w-full py-5 text-xl disabled:opacity-60 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> {t('dashboard.btn_checking')}</>
                            ) : t('dashboard.btn_check')}
                        </button>
                    </form>
                )}

                {/* Case found */}
                {!deleted && caseData && (
                    <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-xl border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-3 h-3 rounded-full bg-india-green animate-pulse" />
                            <span className="text-india-green font-black uppercase tracking-widest text-sm">{t('dashboard.status_active')}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {[
                                { label: t('dashboard.label_case'), value: caseData.case_id, mono: true },
                                { label: t('dashboard.label_media'), value: `${caseData.media_count} ${t('saheli.files_suffix')}`, mono: false },
                                { label: t('dashboard.label_registered'), value: new Date(caseData.created_at).toLocaleDateString(t('common.date_locale') || 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), mono: false },
                                { label: t('dashboard.label_status'), value: '🛡️ Active', mono: false },
                            ].map(item => (
                                <div key={item.label} className="bg-slate-50 p-5 rounded-2xl">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                                    <p className={`font-black text-navy-blue text-lg ${item.mono ? 'font-mono' : ''}`}>{item.value}</p>
                                </div>
                            ))}
                        </div>

                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl font-medium text-sm">❌ {error}</div>
                        )}

                        <div className="flex flex-col gap-4">
                            <button onClick={() => { setCaseData(null); setError(null); }} className="btn-outline w-full py-3 border-2">
                                ← {t('dashboard.btn_another')}
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="w-full py-3 bg-red-50 border-2 border-red-200 text-red-700 font-black rounded-2xl hover:bg-red-100 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                {deleting ? <><div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /> {t('dashboard.btn_deleting')}</> : `🗑️ ${t('dashboard.btn_delete')}`}
                            </button>
                        </div>
                    </div>
                )}

                {!deleted && !caseData && (
                    <div className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 text-sm text-amber-800 font-medium text-center">
                        ⚠️ {t('dashboard.warning_lost')}
                    </div>
                )}
            </section>

            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0" />
        </main>
    );
}
