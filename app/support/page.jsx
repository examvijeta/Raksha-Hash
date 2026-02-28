"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function SupportPage() {
    const { t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', caseId: '', issue: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/support', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (data.success) {
                setSubmitted(true);
            } else {
                alert(t('support.form_error') || "Something went wrong. Please try again.");
            }
        } catch (err) {
            alert(t('support.form_error') || "Failed to send message.");
        } finally {
            setLoading(false);
        }
    };

    const contacts = [
        { icon: '📧', label: t('support.email_label'), value: 'support@amanblaze.in', href: 'mailto:support@amanblaze.in' },
        { icon: '💬', label: t('support.whatsapp_label'), value: '+91-XXXX-XXXXXX', href: '#' },
        { icon: '💻', label: t('support.github_label'), value: 'examvijeta/Raksha-Hash', href: 'https://github.com/examvijeta/Raksha-Hash' },
    ];

    return (
        <main className="min-h-screen pb-24 bg-slate-50">
            <div className="w-full h-2 bg-saffron" />

            <section className="container mx-auto px-6 py-24 max-w-5xl">
                <div className="inline-block bg-navy-blue/5 text-navy-blue px-4 py-1.5 rounded-full text-sm font-bold mb-8">
                    {t('support.tag')}
                </div>
                <h1 className="text-5xl font-black text-navy-blue mb-4 tracking-tighter">
                    {t('support.title_part1')} <span className="text-saffron">{t('support.title_part2')}</span>
                </h1>
                <p className="text-xl text-slate-500 mb-16 font-medium">{t('support.desc')}</p>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {contacts.map(c => (
                        <a
                            key={c.label}
                            href={c.href}
                            className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group block"
                        >
                            <div className="text-4xl mb-4">{c.icon}</div>
                            <h3 className="font-black text-navy-blue text-lg mb-1 group-hover:text-saffron transition-colors">{c.label}</h3>
                            <p className="text-slate-500 font-medium text-sm">{c.value}</p>
                        </a>
                    ))}
                </div>

                {/* Emergency CTA */}
                <div className="bg-red-600 text-white rounded-[40px] p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-black mb-1">{t('support.emergency_title')}</h3>
                        <p className="text-red-200 font-medium">{t('support.emergency_desc')}</p>
                    </div>
                    <div className="flex flex-col gap-3 flex-shrink-0">
                        <a href="tel:1930" className="bg-white text-red-600 font-black px-8 py-3 rounded-xl text-center hover:bg-red-50 transition-colors whitespace-nowrap">
                            📞 {t('common.sos_cyber')}
                        </a>
                        <a href="tel:7827170170" className="bg-white/10 border border-white/30 text-white font-bold px-8 py-3 rounded-xl text-center hover:bg-white/20 transition-colors whitespace-nowrap">
                            📞 {t('common.sos_ncw')}
                        </a>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-[48px] p-10 md:p-16 shadow-xl border border-slate-100">
                    <h2 className="text-3xl font-black text-navy-blue mb-8">{t('support.form_title')}</h2>

                    {submitted ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-india-green text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
                            <h3 className="text-2xl font-black text-navy-blue mb-3">{t('support.form_success_title')}</h3>
                            <p className="text-slate-500 font-medium text-lg">{t('support.form_success_desc')}</p>
                            <button
                                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', caseId: '', issue: '', message: '' }); }}
                                className="mt-8 btn-outline px-10 py-3 border-2 mx-auto"
                            >
                                {t('support.form_send_another')}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t('support.form_name')}</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Priya Sharma"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-medium text-navy-blue focus:outline-none focus:border-saffron transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t('support.form_email')}</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="e.g. priya@example.com"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-medium text-navy-blue focus:outline-none focus:border-saffron transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t('support.form_case')}</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. RH-XK7LM9P"
                                        value={form.caseId}
                                        onChange={e => setForm({ ...form, caseId: e.target.value })}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-mono font-bold text-navy-blue focus:outline-none focus:border-saffron transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t('support.form_issue')}</label>
                                <select
                                    required
                                    value={form.issue}
                                    onChange={e => setForm({ ...form, issue: e.target.value })}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-medium text-navy-blue focus:outline-none focus:border-saffron transition-colors"
                                >
                                    <option value="">{t('support.issue_placeholder')}</option>
                                    <option value="image_not_blocked">{t('support.issue_not_blocked')}</option>
                                    <option value="remove_case">{t('support.issue_remove')}</option>
                                    <option value="technical">{t('support.issue_tech')}</option>
                                    <option value="abuse_report">{t('support.issue_abuse')}</option>
                                    <option value="other">{t('support.issue_other')}</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t('support.form_message')}</label>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Describe your issue in detail..."
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-medium text-navy-blue focus:outline-none focus:border-saffron transition-colors resize-none"
                                />
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-4 text-sm text-slate-400 font-medium">
                                {t('support.form_privacy_note')}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`btn-saffron w-full py-5 text-xl ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        {t('support.form_submitting') || "Sending..."}
                                    </span>
                                ) : t('support.form_submit')}
                            </button>
                        </form>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-400 font-medium">
                        Looking for answers? <Link href="/faq" className="text-navy-blue font-bold hover:underline">Check our FAQ →</Link>
                    </p>
                </div>
            </section>

            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0" />
        </main>
    );
}
