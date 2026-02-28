"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { locale, toggleLanguage, t } = useLanguage();

    // Helper to render brand title with 3-color sequence
    const renderBrandTitle = () => {
        const fullText = t('common.title');
        const parts = fullText.split(/<\/?\d>/);
        if (parts.length >= 6) {
            return (
                <span className="flex items-center tracking-tighter uppercase">
                    <span className="text-saffron">{parts[1]}</span>
                    <span className="text-navy-blue">{parts[3]}</span>
                    <span className="text-india-green ml-1">{parts[5]}</span>
                </span>
            );
        }
        return fullText;
    };

    return (
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-[100] px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <span className="text-xl font-black">{renderBrandTitle()}</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-bold text-navy-blue">
                    <Link href="/" className="hover:text-saffron transition-colors">{t('navbar.home')}</Link>
                    <Link href="/protect" className="hover:text-saffron transition-colors">{t('navbar.protect')}</Link>
                    <Link href="/dashboard" className="hover:text-saffron transition-colors">{t('navbar.dashboard')}</Link>
                    <Link href="/support" className="hover:text-saffron transition-colors">{t('navbar.support')}</Link>
                    <Link href="/help" className="hover:text-red-600 transition-colors text-red-500">{t('navbar.help')}</Link>
                    <Link href="/legal" className="hover:text-amber-600 transition-colors text-amber-700 font-black">⚖️ {t('navbar.legal')}</Link>

                    <div className="relative group/lang">
                        <button className="bg-slate-100 px-4 py-2 rounded-xl text-sm flex items-center gap-2 border border-slate-200 hover:bg-white transition-colors">
                            <span>🌐</span> {locale.toUpperCase()}
                        </button>
                        <div className="absolute top-full right-0 pt-2 bg-transparent hidden group-hover/lang:block min-w-[140px] z-50">
                            <div className="bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden max-h-[400px] overflow-y-auto">
                                {[
                                    { id: 'en', name: 'English' },
                                    { id: 'hi', name: 'हिन्दी' },
                                    { id: 'mr', name: 'मराठी' },
                                    { id: 'bn', name: 'বাংলা' },
                                    { id: 'ta', name: 'தமிழ்' },
                                    { id: 'te', name: 'తెలుగు' },
                                    { id: 'kn', name: 'ಕನ್ನಡ' },
                                    { id: 'ml', name: 'മലയാളം' },
                                    { id: 'gu', name: 'ગુજરાતી' },
                                    { id: 'pa', name: 'ਪੰਜਾਬੀ' }
                                ].map((l) => (
                                    <button
                                        key={l.id}
                                        onClick={() => toggleLanguage(l.id)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${locale === l.id ? 'font-bold text-saffron' : 'text-navy-blue'}`}
                                    >
                                        {l.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-2xl text-navy-blue"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-6 font-bold shadow-xl animate-in slide-in-from-top duration-300">
                    <Link href="/" onClick={() => setIsOpen(false)}>{t('navbar.home')}</Link>
                    <Link href="/protect" onClick={() => setIsOpen(false)}>{t('navbar.protect')}</Link>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>{t('navbar.dashboard')}</Link>
                    <Link href="/support" onClick={() => setIsOpen(false)}>{t('navbar.support')}</Link>
                    <Link href="/help" onClick={() => setIsOpen(false)}>{t('navbar.help')}</Link>
                    <Link href="/legal" onClick={() => setIsOpen(false)} className="text-amber-700">⚖️ {t('navbar.legal')}</Link>
                    <hr className="border-slate-100" />
                    <div className="flex justify-between items-center">
                        <span className="text-navy-blue">{t('navbar.language')}</span>
                        <select
                            value={locale}
                            onChange={(e) => toggleLanguage(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-sm text-navy-blue"
                        >
                            <option value="en">English</option>
                            <option value="hi">हिन्दी</option>
                            <option value="mr">मराठी</option>
                            <option value="bn">বাংলা</option>
                            <option value="ta">தமிழ்</option>
                            <option value="te">తెలుగు</option>
                            <option value="kn">ಕನ್ನಡ</option>
                            <option value="ml">മലയാളം</option>
                            <option value="gu">ગુજરાતી</option>
                            <option value="pa">ਪੰਜਾਬੀ</option>
                        </select>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
