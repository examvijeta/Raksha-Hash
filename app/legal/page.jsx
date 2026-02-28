"use client";
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const STATES_UTS = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const PLATFORMS = [
    {
        name: 'Cybercrime Portal (Govt)',
        url: 'https://cybercrime.gov.in',
        icon: '🏛️',
        desc: 'Official portal to file NCII complaints in India.',
        color: 'bg-blue-50 border-blue-100 hover:border-blue-300'
    },
    {
        name: 'StopNCII.org (Global)',
        url: 'https://stopncii.org',
        icon: '🌍',
        desc: 'Best for Meta, Google, TikTok. Raksha Hash covers Indian platforms.',
        color: 'bg-purple-50 border-purple-100 hover:border-purple-300'
    },
    {
        name: 'Meta Reporting',
        url: 'https://help.meta.com/requests/1371776380779082',
        icon: '📘',
        desc: 'Direct report for Facebook/Instagram NCII issues.',
        color: 'bg-indigo-50 border-indigo-100 hover:border-indigo-300'
    },
    {
        name: 'NCW Complaint',
        url: 'https://ncwapps.nic.in/onlinecomplaintsv2/frmPubRegistration.aspx',
        icon: '👩‍⚖️',
        desc: 'National Commission for Women - specifically for women victims.',
        color: 'bg-pink-50 border-pink-100 hover:border-pink-300'
    },
];

const CHECKLIST = [
    { id: 'ss', label_key: 'legal.chk_ss', hint_key: 'legal.chk_ss_h' },
    { id: 'url', label_key: 'legal.chk_url', hint_key: 'legal.chk_url_h' },
    { id: 'dt', label_key: 'legal.chk_dt', hint_key: 'legal.chk_dt_h' },
    { id: 'sh', label_key: 'legal.chk_sh', hint_key: 'legal.chk_sh_h' },
    { id: 'wt', label_key: 'legal.chk_wt', hint_key: 'legal.chk_wt_h' },
];

const generateHindi = (form, today) => `प्रति,
श्रीमान थाना प्रभारी महोदय
साइबर क्राइम थाना, ${form.state || '[राज्य]'}

दिनांक: ${today}

विषय: सूचना प्रौद्योगिकी अधिनियम 2000 की धारा 66E एवं 67A के अंर्तगत अश्लील / आपत्तिजनक सामग्री के अनधिकृत प्रसार के संबंध में प्राथमिकी दर्ज करने हेतु आवेदन।

महोदय,

सविनय निवेदन है कि मैं ${form.name || '[आपका पूरा नाम]'}, आयु ${form.age || '[आयु]'} वर्ष, स्थायी निवासी ${form.city || '[शहर]'}, ${form.state || '[राज्य]'}, आपके समक्ष निम्नलिखित तथ्य प्रस्तुत करना चाहती/चाहता हूं।

शिकायत का विवरण:
दिनांक ${form.incident_date || '[घटना की तारीख]'} को मेरी निजी एवं अंतरंग तस्वीरें/वीडियो "${form.platform || '[प्लेटफॉर्म का नाम]'}" पर मेरी सहमति के बिना प्रसारित एवं साझा की गईं, जिससे मेरी गोपनीयता का घोर उल्लंघन हुआ है।${form.description ? `\n\nघटना का विस्तृत विवरण:\n${form.description}` : ''}

डिजिटल साक्ष्य (Digital Evidence):
---------------
• Raksha Hash Case ID : ${form.case_id || '[Case ID - optional]'}
• हैश पंजीकरण दिनांक : ${today}
• यह Case ID प्रमाणित करता है कि मेरी सामग्री का डिजिटल फिंगरप्रिंट सुरक्षित रूप से पंजीकृत था।
---------------

लागू कानूनी प्रावधान:
• धारा 66E, IT Act 2000 — निजता का उल्लंघन (Violation of Privacy)
• धारा 67A, IT Act 2000 — अश्लील सामग्री का ऑनलाइन प्रकाशन (Obscene material)
• भारतीय दंड संहिता (IPC) धारा 354C — व्यभिचार (Voyeurism)
• DPDP Act 2023 — डेटा सुरक्षा उल्लंघन

अनुरोध:
1. उपरोक्त घटना के संबंध में तत्काल प्राथमिकी (FIR) दर्ज की जाए।
2. संबंधित प्लेटफॉर्म को आपत्तिजनक सामग्री तुरंत हटाने का निर्देश दिया जाए।
3. दोषी व्यक्ति/व्यक्तियों के विरुद्ध कठोर कानूनी कार्यवाही की जाए।

भवदीय,

नाम    : ${form.name || '[आपका पूरा नाम]'}
हस्ताक्षर: ___________________`;

const generateEnglish = (form, today) => `To,
The Station House Officer
Cyber Crime Police Station, ${form.state || '[State]'}

Date: ${today}

Subject: Complaint for registration of FIR under Section 66E & 67A of the IT Act, 2000 regarding unauthorized distribution of private images.

Sir/Madam,

I, ${form.name || '[Your Full Name]'}, aged ${form.age || '[Age]'} years, resident of ${form.city || '[City]'}, ${form.state || '[State]'}, submit the following complaint.

Incident Details:
On ${form.incident_date || '[Date of Incident]'}, private and intimate imagery belonging to me was shared/distributed without my consent on the platform "${form.platform || '[Platform Name]'}". ${form.description ? `\n\nDescription of Incident:\n${form.description}` : ''}

Digital Evidence:
---------------
• Raksha Hash Case ID : ${form.case_id || '[Case ID - optional]'}
• Hash Registration Date : ${today}
• This Case ID authenticates that the digital fingerprint of my content was securely registered.
---------------

Legal Provisions:
• Section 66E, IT Act 2000 — Violation of privacy
• Section 67A, IT Act 2000 — Publishing of obscene material
• Section 354C, IPC — Voyeurism
• DPDP Act 2023 — Data Protection Violation

Request:
1. Immediate registration of FIR regarding this incident.
2. Direction to the concerned platform to remove the offensive content immediately.
3. Strict legal action against the culprits.

Sincerely,

Name    : ${form.name || '[Your Full Name]'}
Signature: ___________________`;

export default function LegalGuide() {
    const { t, language } = useLanguage();
    const [form, setForm] = useState({
        name: '', age: '', city: '', state: '', platform: '', incident_date: '', description: '', case_id: ''
    });
    const [templateType, setTemplateType] = useState('hindi'); // hindi or english
    const [copySuccess, setCopySuccess] = useState(false);
    const textAreaRef = useRef(null);

    const todayString = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const policeApplication = templateType === 'hindi' ? generateHindi(form, todayString) : generateEnglish(form, todayString);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(policeApplication);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const handleDownloadPDF = async () => {
        const sourceElement = document.getElementById('fir-print-content-full');
        if (!sourceElement) return;

        // Create a hidden clone to ensure full content is captured
        const clone = sourceElement.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.left = '-9999px';
        clone.style.top = '0';
        clone.style.width = '800px';
        clone.style.maxHeight = 'none';
        clone.style.overflow = 'visible';
        clone.style.height = 'auto';
        clone.style.padding = '80px';
        clone.style.paddingBottom = '120px'; // Extra space for signature
        clone.style.backgroundColor = 'white';
        clone.style.color = 'black';
        clone.style.fontSize = '20px';
        clone.style.lineHeight = '1.8';
        clone.style.zIndex = '-1000';
        clone.setAttribute('id', 'fir-clone');
        document.body.appendChild(clone);

        try {
            window.scrollTo(0, 0);

            const canvas = await html2canvas(clone, {
                scale: 3,
                useCORS: true,
                backgroundColor: '#ffffff',
                windowWidth: 800,
                onclone: (clonedDoc) => {
                    const el = clonedDoc.getElementById('fir-clone');
                    if (el) {
                        el.style.maxHeight = 'none';
                        el.style.overflow = 'visible';
                        el.style.display = 'block';
                    }
                }
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgPdfHeight = (canvasHeight * pdfWidth) / canvasWidth;

            let heightLeft = imgPdfHeight;
            let position = 0;

            // Add first page
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgPdfHeight);
            heightLeft -= pdfHeight;

            // Add extra pages if needed
            while (heightLeft > 0) {
                position = heightLeft - imgPdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgPdfHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save(`FIR_Draft_Raksha_Hash_${form.case_id || 'Case'}.pdf`);
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            document.body.removeChild(clone);
        }
    };

    return (
        <main className="min-h-screen pb-24 bg-slate-50 overflow-x-hidden">
            <div className="w-full h-2 bg-saffron" />

            <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
                <div className="w-full">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-navy-blue/5 text-navy-blue px-4 py-1.5 rounded-full text-xs font-black mb-6 border border-navy-blue/10 tracking-widest uppercase">
                            {t('legal.tag')}
                        </div>
                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-navy-blue mb-4 md:mb-6 tracking-tighter break-words">
                            {t('legal.title_part1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">{t('legal.title_part2')}</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed px-2">
                            {t('legal.desc')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Action Steps */}
                        <div className="space-y-8">
                            <div className="bg-white rounded-[40px] p-6 sm:p-8 md:p-10 shadow-xl border border-slate-100">
                                <h2 className="text-2xl font-black text-navy-blue mb-8 flex items-center gap-3">
                                    <span className="w-10 h-10 bg-navy-blue text-white rounded-xl flex items-center justify-center text-lg">⚖️</span>
                                    {t('legal.guide_t')}
                                </h2>

                                <div className="space-y-6">
                                    {[
                                        { step: '01', key: 'st1', icon: '🚔' },
                                        { step: '02', key: 'st2', icon: '💻' },
                                        { step: '03', key: 'st3', icon: '🛑' },
                                    ].map(item => (
                                        <div key={item.step} className="flex gap-6 group">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-300 group-hover:bg-navy-blue group-hover:text-white transition-all">
                                                {item.step}
                                            </div>
                                            <div>
                                                <h3 className="text-base sm:text-lg font-black text-navy-blue mb-1 flex items-center gap-2 break-words">
                                                    {item.icon} {t(`legal.${item.key}_t`)}
                                                </h3>
                                                <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                                                    {t(`legal.${item.key}_d`)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-navy-blue text-white rounded-[40px] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                                <h2 className="text-2xl font-black mb-6 relative z-10">{t('legal.reporting_t')}</h2>
                                <div className="grid sm:grid-cols-2 gap-4 relative z-10">
                                    {PLATFORMS.map(p => (
                                        <a
                                            key={p.name}
                                            href={p.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${p.color} p-5 rounded-2xl border transition-all group`}
                                        >
                                            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{p.icon}</div>
                                            <h4 className="font-black text-navy-blue text-sm mb-1">{p.name}</h4>
                                            <p className="text-slate-500 text-xs font-medium leading-relaxed">{p.desc}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-india-green/5 border border-india-green/20 rounded-[40px] p-6 sm:p-8 md:p-10">
                                <h2 className="text-xl font-black text-navy-blue mb-6">📝 {t('legal.checklist_t')}</h2>
                                <div className="space-y-4">
                                    {CHECKLIST.map(item => (
                                        <div key={item.id} className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl">
                                            <input type="checkbox" className="mt-1 w-5 h-5 rounded-lg border-2 border-slate-200 text-india-green focus:ring-india-green transition-all" />
                                            <div>
                                                <p className="font-black text-navy-blue text-sm">{t(item.label_key)}</p>
                                                <p className="text-slate-400 text-xs font-medium">{t(item.hint_key)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* FIR Template Generator */}
                        <div id="fir-generator" className="bg-white rounded-[48px] p-6 sm:p-8 md:p-12 shadow-2xl border border-slate-100 sticky top-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-black text-navy-blue tracking-tight break-words">{t('legal.fir_gen_t')}</h2>
                                    <p className="text-slate-400 font-medium text-xs sm:text-sm mt-1">{t('legal.fir_gen_h')}</p>
                                </div>
                                <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 self-start">
                                    <button
                                        onClick={() => setTemplateType('hindi')}
                                        className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${templateType === 'hindi' ? 'bg-white text-navy-blue shadow-lg' : 'text-slate-400 hover:text-navy-blue'}`}
                                    >
                                        {t('legal.btn_hindi')}
                                    </button>
                                    <button
                                        onClick={() => setTemplateType('english')}
                                        className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${templateType === 'english' ? 'bg-white text-navy-blue shadow-lg' : 'text-slate-400 hover:text-navy-blue'}`}
                                    >
                                        {t('legal.btn_english')}
                                    </button>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                {[
                                    { id: 'name', label: t('legal.f_name'), placeholder: t('legal.p_name'), type: 'text' },
                                    { id: 'age', label: t('legal.f_age'), placeholder: t('legal.p_age'), type: 'number' },
                                    { id: 'city', label: t('legal.f_city'), placeholder: t('legal.p_city'), type: 'text' },
                                    { id: 'platform', label: t('legal.f_plat'), placeholder: t('legal.p_plat'), type: 'text' },
                                    { id: 'incident_date', label: t('legal.f_date'), placeholder: t('legal.p_date'), type: 'date' },
                                    { id: 'case_id', label: t('legal.f_case'), placeholder: t('legal.p_case'), type: 'text' },
                                ].map((field) => (
                                    <div key={field.id} className={field.id === 'description' ? 'sm:col-span-2' : ''}>
                                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{field.label}</label>
                                        <input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={form[field.id]}
                                            onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 font-bold text-navy-blue focus:outline-none focus:border-saffron transition-colors placeholder:text-slate-300"
                                        />
                                    </div>
                                ))}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">{t('legal.f_state')}</label>
                                    <select
                                        value={form.state}
                                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 font-bold text-navy-blue focus:outline-none focus:border-saffron transition-colors"
                                    >
                                        <option value="">{t('legal.f_state_sel')}</option>
                                        {STATES_UTS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="relative group/box print:p-0 border-none print:shadow-none bg-transparent">
                                <div className="absolute inset-0 bg-india-green/5 rounded-[32px] transform group-hover/box:scale-105 transition-transform duration-500 opacity-0 group-hover/box:opacity-100 print:hidden" />
                                <div className="relative bg-slate-900 text-white rounded-[32px] p-6 sm:p-8 md:p-10 font-mono text-xs leading-relaxed overflow-hidden border-2 border-white/5 print:bg-transparent print:text-black print:border-none print:p-0 w-full overflow-x-auto">
                                    <div className="flex justify-between items-center mb-6 print:hidden">
                                        <span className="text-india-green font-bold text-[10px] uppercase tracking-widest">{t('legal.preview_tag')}</span>
                                        <div className="flex gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                                        </div>
                                    </div>
                                    <div id="fir-print-content-full" className="whitespace-pre-wrap max-h-80 overflow-y-auto custom-scrollbar print:max-h-none print:overflow-visible text-sm md:text-base break-words max-w-full">
                                        {policeApplication}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none print:hidden" />
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={copyToClipboard}
                                    className="flex-1 bg-navy-blue text-white py-4 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                                >
                                    {copySuccess ? (
                                        <>✨ {t('legal.btn_copied')}</>
                                    ) : (
                                        <>📋 {t('legal.btn_copy')}</>
                                    )}
                                </button>
                                <button
                                    onClick={handleDownloadPDF}
                                    className="sm:w-20 bg-saffron text-navy-blue py-4 rounded-2xl font-black hover:bg-orange-400 transition-all flex items-center justify-center text-xl shadow-lg active:scale-95"
                                    title="Download PDF"
                                >
                                    📥
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="w-full h-2 bg-india-green fixed bottom-0 left-0 right-0" />
        </main>
    );
}
