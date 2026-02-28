"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ImageHasher from '@/components/ImageHasher';
import { generateCertificate } from '@/utils/certificate';

export default function ProtectPage() {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [hashedItems, setHashedItems] = useState([]);
    const [caseData, setCaseData] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [saheliName, setSaheliName] = useState('');

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleHashingComplete = (items) => {
        setHashedItems(items);
        nextStep();
    };

    const handleFinalSubmit = async () => {
        setSubmitting(true);
        setSubmitError(null);
        try {
            const hashStrings = hashedItems.map(item => item.hash);
            const res = await fetch('/api/cases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hashes: hashStrings, saheli_name: saheliName || undefined }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to register case');
            setCaseData({ id: data.case_id, pin: data.pin, created_at: data.created_at, saheli_token: data.saheli_token });
            nextStep();
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen pb-24 bg-slate-50">
            <div className="w-full h-2 bg-saffron" />

            <div className="container mx-auto px-6 py-12 max-w-4xl">
                {/* Progress Bar */}
                <div className="flex justify-between mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
                    {[1, 2, 3, 4, 5].map((s) => (
                        <div
                            key={s}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-navy-blue text-white scale-110' : 'bg-white text-slate-300 border-2 border-slate-200'}`}
                        >
                            {s}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-[48px] p-8 md:p-16 shadow-xl border border-slate-100">
                    {/* Step 1: Privacy Consent & Eligibility */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Anonymous Mode Notice */}
                            <div className="bg-india-green/5 border border-india-green/20 rounded-2xl px-4 py-3 mb-6 flex items-center gap-3">
                                <span className="text-india-green text-xl">🔒</span>
                                <p className="text-sm text-india-green font-bold">
                                    No account needed. No login required. Completely anonymous.
                                </p>
                            </div>
                            <h1 className="text-4xl font-black text-navy-blue mb-2">{t('protect.step1_title')}</h1>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg font-mono text-sm">Case Progress: 1/4</span>
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="w-1/4 h-full bg-saffron" />
                                </div>
                            </div>

                            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8 text-left rounded-r-2xl">
                                <p className="text-amber-800 font-medium">
                                    <strong>Raksha Hash</strong> only accepts Non-Consensual Intimate Images (NCII) and Videos. Ineligible media will not be protected or removed.
                                </p>
                            </div>

                            <div className="space-y-8 text-left mb-12">
                                <section>
                                    <h3 className="text-xl font-bold text-navy-blue mb-4 flex items-center gap-2">
                                        <span>📋</span> {t('protect.eligibility_title')}
                                    </h3>
                                    <p className="text-slate-500 mb-4 font-medium">{t('protect.eligibility_intro')}</p>
                                    <ul className="space-y-3">
                                        {[1, 2, 3].map(i => (
                                            <li key={i} className="flex gap-3 text-slate-600 font-medium">
                                                <span className="text-india-green">✓</span> {t(`protect.req${i}`)}
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <section className="bg-india-green/5 p-6 rounded-3xl border border-india-green/10">
                                        <h3 className="font-bold text-india-green mb-4 flex items-center gap-2">
                                            <span>✅</span> {t('protect.accept_title')}
                                        </h3>
                                        <ul className="space-y-3 text-sm text-slate-600 font-medium">
                                            {[1, 2].map(i => (
                                                <li key={i}>• {t(`protect.accept${i}`)}</li>
                                            ))}
                                        </ul>
                                    </section>

                                    <section className="bg-red-50 p-6 rounded-3xl border border-red-100">
                                        <h3 className="font-bold text-red-600 mb-4 flex items-center gap-2">
                                            <span>❌</span> {t('protect.decline_title')}
                                        </h3>
                                        <ul className="space-y-3 text-sm text-slate-600 font-medium">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <li key={i}>• {t(`protect.decline${i}`)}</li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>
                            </div>

                            <button
                                onClick={nextStep}
                                className="btn-saffron w-full py-5 text-xl"
                            >
                                {t('protect.btn_agree')}
                            </button>
                        </div>
                    )}

                    {/* Step 2: Media Selection & Hashing */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-3xl font-black text-navy-blue mb-4">2. Select Images & Videos</h2>
                            <p className="text-slate-500 mb-8 font-medium">Your files stay on your device — only a digital fingerprint is generated.</p>
                            <ImageHasher onComplete={handleHashingComplete} />
                            <button onClick={prevStep} className="mt-8 text-slate-400 font-bold hover:text-navy-blue transition-colors">
                                ← {t('common.back') || "Back"}
                            </button>
                        </div>
                    )}

                    {/* Step 3: Saheli Mode — Add Trusted Contact */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-4xl">🤝</span>
                                <div>
                                    <h2 className="text-3xl font-black text-navy-blue">Saheli Mode</h2>
                                    <p className="text-slate-400 font-medium text-sm">Add a trusted contact — optional</p>
                                </div>
                            </div>

                            <div className="bg-india-green/5 border border-india-green/20 rounded-2xl p-6 mb-8">
                                <p className="text-india-green font-bold text-sm mb-2">👩‍👧 What is Saheli Mode?</p>
                                <p className="text-slate-600 font-medium text-sm">
                                    Add a trusted friend or family member who can check the status of your protection case using a private read-only link. They will never see your images, hashes, or PIN.
                                </p>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-3">Saheli's Name (optional)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Priya, Didi, Maa..."
                                    value={saheliName}
                                    onChange={(e) => setSaheliName(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-medium text-navy-blue focus:outline-none focus:border-saffron transition-colors"
                                />
                                <p className="text-xs text-slate-400 font-medium mt-2">Leave blank to skip Saheli Mode</p>
                            </div>

                            <div className="flex gap-4">
                                <button onClick={prevStep} className="btn-outline px-6 py-3 border-2">
                                    ← {t('common.back') || 'Back'}
                                </button>
                                <button onClick={nextStep} className="btn-saffron flex-1 py-3">
                                    {saheliName ? `Continue with ${saheliName} →` : 'Skip & Continue →'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review & Finalize */}
                    {step === 4 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-3xl font-black text-navy-blue mb-4">{t('protect.step3_title') || "Final Review"}</h2>
                            <p className="text-slate-500 mb-8 font-medium">
                                {t('protect.step3_desc') || "You are about to protect the following image fingerprints."}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                                {hashedItems.map((item, idx) => (
                                    <div key={idx} className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                                        <img src={item.preview} className="w-full h-full object-cover grayscale" />
                                    </div>
                                ))}
                            </div>

                            {submitError && (
                                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl font-medium text-sm">
                                    ❌ {submitError}
                                </div>
                            )}

                            <button
                                onClick={handleFinalSubmit}
                                disabled={submitting}
                                className="btn-saffron w-full py-5 text-xl disabled:opacity-60 flex items-center justify-center gap-3"
                            >
                                {submitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Registering with server...
                                    </>
                                ) : (
                                    t('protect.btn_submit') || 'Generate Protection Shield'
                                )}
                            </button>
                            <button onClick={prevStep} className="mt-8 text-slate-400 font-bold hover:text-navy-blue transition-colors">
                                ← {t('common.back') || "Back"}
                            </button>
                        </div>
                    )}

                    {/* Step 5: Success & Case ID */}
                    {step === 5 && caseData && (
                        <div className="text-center animate-in zoom-in-95 duration-500">
                            <div className="w-24 h-24 bg-india-green text-white rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-xl">
                                ✓
                            </div>
                            <h2 className="text-4xl font-black text-navy-blue mb-4">{t('protect.success_title') || "Protection Active!"}</h2>
                            <p className="text-xl text-slate-500 mb-12 font-medium">
                                {t('protect.success_desc') || "Your images are now registered for protection across partner platforms."}
                            </p>

                            <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-200 mb-12 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/5 rounded-full -mr-16 -mt-16" />
                                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                                    <div className="text-left md:border-r border-slate-200 pr-8">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Case ID</span>
                                        <span className="text-3xl font-black text-navy-blue font-mono">{caseData.id}</span>
                                    </div>
                                    <div className="text-left md:pl-8">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Private PIN</span>
                                        <span className="text-3xl font-black text-saffron font-mono">{caseData.pin}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-red-50 text-red-600 p-6 rounded-3xl font-bold mb-12 flex items-start gap-4 text-left">
                                <span className="text-2xl">⚠️</span>
                                <p>{t('protect.warning_pin') || "Please save your Case ID and PIN. You will need them to manage your case or remove protection in the future."}</p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={() => generateCertificate(caseData, hashedItems)}
                                    className="btn-saffron w-full py-4 text-lg flex items-center justify-center gap-2"
                                >
                                    📄 Download Protection Certificate (PDF)
                                </button>
                                {caseData.saheli_token && (
                                    <div className="bg-india-green/5 border border-india-green/20 rounded-2xl p-5 text-left">
                                        <p className="text-xs font-black text-india-green uppercase tracking-widest mb-2">🤝 Saheli Link ({saheliName})</p>
                                        <p className="text-xs text-slate-500 font-medium mb-3">Share this private link with {saheliName} so they can monitor your case status</p>
                                        <div className="flex gap-2 items-center">
                                            <code className="flex-1 text-xs bg-white border border-india-green/20 rounded-xl px-3 py-2 font-mono text-navy-blue break-all">
                                                {typeof window !== 'undefined' ? `${window.location.origin}/saheli?token=${caseData.saheli_token}` : `/saheli?token=${caseData.saheli_token}`}
                                            </code>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(`${window.location.origin}/saheli?token=${caseData.saheli_token}`)}
                                                className="flex-shrink-0 bg-india-green text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-green-700 transition-colors"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <Link href="/" className="btn-outline w-full py-4 text-lg border-2 text-center">
                                    {t('navbar.home')}
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0" />
        </main>
    );
}
