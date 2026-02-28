"use client";
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    const year = new Date().getFullYear();

    const links = {
        product: [
            { href: '/protect', label: 'Protect Images' },
            { href: '/dashboard', label: 'My Dashboard' },
            { href: '/support', label: 'Support' },
            { href: '/help', label: 'Emergency Help' },
        ],
        learn: [
            { href: '/about', label: 'About Raksha Hash' },
            { href: '/how-to-use', label: 'How to Use' },
            { href: '/faq', label: 'FAQ' },
            { href: '/security', label: 'Security' },
            { href: '/verify', label: 'Verify Yourself' },
            { href: '/legal', label: '⚖️ Legal Action Guide' },
        ],
        legal: [
            { href: '/privacy', label: 'Privacy Policy' },
            { href: '/terms', label: 'Terms of Use' },
        ],
    };

    return (
        <footer className="bg-navy-blue text-white">
            <div className="container mx-auto px-6 py-16 max-w-7xl">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="text-2xl font-black tracking-tight flex items-center gap-1 mb-4">
                            <span className="text-saffron">Raksha</span>
                            <span className="text-white">Hash</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium">
                            {t('footer.brand_desc')}
                        </p>
                        <a href="https://github.com/examvijeta/Raksha-Hash" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-xs font-bold text-slate-500 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/10 group">
                            <span className="text-lg">💻</span>
                            <span>{t('footer.view_github')}</span>
                        </a>
                        <div className="flex gap-3 mt-6">
                            <div className="w-10 h-2 rounded-full bg-saffron" />
                            <div className="w-10 h-2 rounded-full bg-white" />
                            <div className="w-10 h-2 rounded-full bg-india-green" />
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] mb-6">{t('footer.col_product')}</h4>
                        <ul className="space-y-3">
                            {links.product.map(l => (
                                <li key={l.href}>
                                    <Link href={l.href} className="text-slate-400 text-sm font-medium hover:text-white transition-colors">
                                        {t(`navbar.${l.href.replace('/', '') || 'home'}`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Learn */}
                    <div>
                        <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] mb-6">{t('footer.col_learn')}</h4>
                        <ul className="space-y-3">
                            {links.learn.map(l => (
                                <li key={l.href}>
                                    <Link href={l.href} className="text-slate-400 text-sm font-medium hover:text-white transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-black text-white text-xs uppercase tracking-[0.2em] mb-6">{t('footer.col_legal')}</h4>
                        <ul className="space-y-3">
                            {links.legal.map(l => (
                                <li key={l.href}>
                                    <Link href={l.href} className="text-slate-400 text-sm font-medium hover:text-white transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 bg-white/5 rounded-2xl p-4 border border-white/10">
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                {t('footer.emergency_text')} <strong className="text-white">1930</strong> {t('footer.emergency_or')} <strong className="text-white">7827170170</strong>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm font-medium">
                        © {year} Raksha Hash. {t('footer.all_rights')}
                    </p>
                    <div className="flex items-center gap-4 text-slate-600 text-xs font-medium">
                        <span>🔒 {t('footer.tag_privacy')}</span>
                        <span>·</span>
                        <span>{t('footer.tag_zero_data')}</span>
                        <span>·</span>
                        <a href="https://github.com/examvijeta/Raksha-Hash" className="hover:text-white transition-colors">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
