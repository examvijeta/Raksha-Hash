"use client";
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
    const { t } = useLanguage();
    const [activeSection, setActiveSection] = useState('what-we-collect');

    const sections = [
        {
            id: 'what-we-collect',
            title: '1. Information We Collect',
            content: (
                <>
                    <p className="mb-4">Raksha Hash collects only the minimum data necessary to provide our NCII protection service:</p>
                    <ul className="space-y-3">
                        {[
                            { term: 'Image Hash (PDQ Fingerprint)', def: 'A 256-bit mathematical fingerprint of your image, computed entirely in your browser. This is a one-way transformation — we cannot recreate your image from it.' },
                            { term: 'Case ID & PIN', def: 'A randomly generated alphanumeric ID and 4-digit PIN assigned to your case. These are your credentials to manage your case.' },
                            { term: 'Anonymised Analytics', def: 'Aggregate page view counts and error logs with no personal identifiers attached.' },
                        ].map(item => (
                            <li key={item.term} className="bg-slate-50 p-5 rounded-2xl">
                                <span className="font-bold text-navy-blue block mb-1">{item.term}</span>
                                <span className="text-slate-500 text-sm">{item.def}</span>
                            </li>
                        ))}
                    </ul>
                </>
            ),
        },
        {
            id: 'what-we-never-collect',
            title: '2. What We Never Collect',
            content: (
                <div className="bg-red-50 border border-red-100 rounded-3xl p-8">
                    <p className="font-bold text-red-700 mb-4">We explicitly do NOT collect:</p>
                    <ul className="space-y-2 text-red-600 font-medium">
                        {[
                            'Your actual images or video files',
                            'Your name, email address, or contact information (unless you contact support)',
                            'Your location, IP address, or device fingerprint',
                            'Browser history or cross-site tracking data',
                            'Payment or financial information',
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3"><span className="font-black">✗</span>{item}</li>
                        ))}
                    </ul>
                </div>
            ),
        },
        {
            id: 'how-we-use',
            title: '3. How We Use Your Information',
            content: (
                <>
                    <p className="mb-4">Image hashes registered with Raksha Hash are used exclusively for:</p>
                    <ul className="space-y-3">
                        {[
                            'Comparing against images submitted to partner platforms for NCII detection.',
                            'Blocking confirmed hash matches from being distributed or uploaded.',
                            'Improving the accuracy and coverage of detection algorithms (only using hashes, never images).',
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-slate-600 font-medium">
                                <span className="text-navy-blue font-black flex-shrink-0">0{i + 1}.</span> {item}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 bg-navy-blue/5 border border-navy-blue/10 rounded-2xl p-5">
                        <p className="text-navy-blue font-semibold text-sm">We do not use your data for advertising, profiling, or any commercial purpose. Full stop.</p>
                    </div>
                </>
            ),
        },
        {
            id: 'data-sharing',
            title: '4. Data Sharing & Third Parties',
            content: (
                <>
                    <p className="mb-6 text-slate-600 font-medium">We only share data in the following limited circumstances:</p>
                    <div className="space-y-4">
                        {[
                            { party: 'Partner Platforms', detail: 'De-identified image hashes are shared with social media and messaging platforms integrated into our detection network. No personal information is ever shared.' },
                            { party: 'Law Enforcement', detail: 'We may disclose information if required by law, a valid court order, or to protect the safety of our users. We will notify you unless prohibited by law.' },
                            { party: 'Service Providers', detail: 'We use minimal third-party infrastructure providers (e.g., cloud hosting) who are contractually bound to confidentiality and cannot use your data for their own purposes.' },
                        ].map(item => (
                            <div key={item.party} className="border border-slate-100 rounded-2xl p-6">
                                <span className="font-black text-navy-blue block mb-1">{item.party}</span>
                                <span className="text-slate-500 text-sm font-medium">{item.detail}</span>
                            </div>
                        ))}
                    </div>
                </>
            ),
        },
        {
            id: 'retention',
            title: '5. Data Retention & Deletion',
            content: (
                <>
                    <p className="mb-4 text-slate-600 font-medium">Your image hashes are retained as long as your case is active.</p>
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-4">
                        <p className="font-bold text-amber-800 mb-2">⚠️ Important: We cannot recover lost credentials</p>
                        <p className="text-amber-700 text-sm font-medium">Raksha Hash is end-to-end encrypted. We have zero access to your Case ID or PIN. If you lose them, we cannot help you recover them. Please save them securely.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl">
                        <div className="text-3xl mb-3">🗑️</div>
                        <h4 className="font-bold text-navy-blue mb-2">Delete via Dashboard</h4>
                        <p className="text-slate-500 text-sm font-medium">Enter your Case ID and PIN in the Dashboard and select "Delete Case" to permanently remove all associated hashes. This is the only way to delete your case.</p>
                    </div>
                </>
            ),
        },
        {
            id: 'your-rights',
            title: '6. Your Rights (DPDP Act 2023)',
            content: (
                <>
                    <p className="mb-6 text-slate-600 font-medium">Under India's Digital Personal Data Protection Act 2023, you have the following rights:</p>
                    <div className="space-y-3">
                        {[
                            { right: 'Right to Access', desc: 'Request a summary of data associated with your Case ID.' },
                            { right: 'Right to Correction', desc: 'Request correction of inaccurate data we hold.' },
                            { right: 'Right to Erasure', desc: 'Request permanent deletion of your case data at any time.' },
                            { right: 'Right to Grievance Redressal', desc: 'File a grievance with our Data Protection Officer within 30 days of any concern.' },
                            { right: 'Right to Nominate', desc: 'Nominate a trusted person to exercise your rights in the event of your death or incapacity.' },
                        ].map(item => (
                            <div key={item.right} className="flex gap-4 p-5 bg-india-green/5 border border-india-green/10 rounded-2xl">
                                <span className="text-india-green font-black flex-shrink-0">✓</span>
                                <div>
                                    <span className="font-bold text-navy-blue block">{item.right}</span>
                                    <span className="text-slate-500 text-sm font-medium">{item.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ),
        },
        {
            id: 'security',
            title: '7. Security',
            content: (
                <>
                    <p className="mb-6 text-slate-600 font-medium">We implement industry-standard security practices:</p>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { label: 'AES-256 Encryption', sub: 'Data at rest' },
                            { label: 'TLS 1.3', sub: 'Data in transit' },
                            { label: 'Client-Side Hashing', sub: 'Images never uploaded' },
                        ].map(item => (
                            <div key={item.label} className="bg-navy-blue text-white text-center p-6 rounded-2xl">
                                <p className="font-black text-lg">{item.label}</p>
                                <p className="text-slate-400 text-sm mt-1">{item.sub}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-slate-500 font-medium text-sm">Our full codebase is open-source. You can audit it yourself on <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-navy-blue font-bold hover:underline">GitHub</a>. See our <Link href="/security" className="text-navy-blue font-bold hover:underline">Security page</Link> for full details.</p>
                </>
            ),
        },
        {
            id: 'contact',
            title: '8. Contact & Grievances',
            content: (
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8">
                    <h4 className="font-black text-navy-blue text-lg mb-3">General Privacy Queries</h4>
                    <p className="text-slate-500 font-medium text-sm mb-3">For non-urgent questions about how your data is used. Note: we cannot recover lost Case IDs or PINs.</p>
                    <a href="mailto:support@amanblaze.in" className="text-saffron font-bold hover:underline text-sm">support@amanblaze.in</a>
                </div>
            ),
        },
    ];

    return (
        <main className="min-h-screen pb-24">
            <div className="w-full h-2 bg-saffron" />

            {/* Hero */}
            <section className="bg-navy-blue text-white py-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="inline-block bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-white/20 tracking-widest uppercase">
                        {t('privacy.tag')}
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">{t('privacy.title')}</h1>
                    <p className="text-xl text-slate-300 font-medium mb-6">
                        {t('privacy.desc')}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-400">
                        <span>{t('privacy.effective')}</span>
                        <span>·</span>
                        <span>{t('privacy.governed')}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1"><span className="text-india-green">●</span> {t('privacy.no_sale')}</span>
                    </div>
                </div>
            </section>

            {/* TL;DR Summary */}
            <section className="container mx-auto px-6 py-12 max-w-5xl">
                <div className="bg-india-green/5 border border-india-green/20 rounded-[40px] p-10 mb-16">
                    <h2 className="font-black text-navy-blue text-2xl mb-6 flex items-center gap-2">💡 {t('privacy.plain_title')}</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-sm font-medium text-slate-600">
                        {[
                            { icon: '🖼️', key: 'plain1' },
                            { icon: '🚫', key: 'plain2' },
                            { icon: '🗑️', key: 'plain3' },
                        ].map(item => (
                            <div key={item.key} className="flex gap-4">
                                <span className="text-2xl">{item.icon}</span>
                                <div>
                                    <p className="font-bold text-navy-blue mb-1">{t(`privacy.${item.key}_t`)}</p>
                                    <p>{t(`privacy.${item.key}_d`)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Two-column layout: sidebar TOC + content */}
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sticky TOC */}
                    <aside className="md:w-64 flex-shrink-0">
                        <div className="md:sticky md:top-24 bg-slate-50 rounded-3xl p-6">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{t('privacy.contents')}</h3>
                            <nav className="space-y-1">
                                {sections.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => {
                                            setActiveSection(s.id);
                                            document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }}
                                        className={`w-full text-left text-sm px-4 py-2.5 rounded-xl font-medium transition-colors ${activeSection === s.id ? 'bg-saffron/10 text-saffron font-bold' : 'text-slate-500 hover:bg-white hover:text-navy-blue'}`}
                                    >
                                        {s.title}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="flex-1 space-y-16">
                        {sections.map(s => (
                            <section key={s.id} id={s.id} className="scroll-mt-24">
                                <h2 className="text-2xl font-black text-navy-blue mb-6 pb-4 border-b border-slate-100">
                                    {s.title}
                                </h2>
                                <div className="text-slate-600 font-medium leading-relaxed">
                                    {s.content}
                                </div>
                            </section>
                        ))}

                        {/* Legal Note */}
                        <div className="pt-12 border-t border-slate-100">
                            <p className="text-slate-400 text-xs font-medium italic">
                                {t('privacy.last_reviewed')}
                            </p>
                        </div>

                        <div className="flex gap-4 pt-8">
                            <Link href="/terms" className="btn-outline px-8 py-3 text-sm">{t('privacy.btn_terms')}</Link>
                            <Link href="/security" className="btn-outline px-8 py-3 text-sm">{t('privacy.btn_security')}</Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0" />
        </main>
    );
}
