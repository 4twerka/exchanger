import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', name: 'English', flag: 'gb' },
  { code: 'pl', name: 'Polski', flag: 'pl' },
  { code: 'de', name: 'Deutsch', flag: 'de' },
  { code: 'ro', name: 'Română', flag: 'ro' },
  { code: 'cs', name: 'Čeština', flag: 'cz' },
  { code: 'hu', name: 'Magyar', flag: 'hu' },
  { code: 'fr', name: 'Français', flag: 'fr' },
  { code: 'es', name: 'Español', flag: 'es' },
  { code: 'it', name: 'Italiano', flag: 'it' },
  { code: 'pt', name: 'Português', flag: 'pt' },
  { code: 'nl', name: 'Nederlands', flag: 'nl' },
  { code: 'sv', name: 'Svenska', flag: 'se' },
  { code: 'uk', name: 'Українська', flag: 'ua' }
];

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentLangCode = i18n.language || 'en';
  const currentLang = languages.find(l => l.code === currentLangCode) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangMenuOpen(false);
  };

  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-white/5">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center font-bold text-xl text-white">
            O
          </div>
          <span className="text-2xl font-bold">Obmen</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition">{t('navHome')}</a>
          <a href="#" className="hover:text-white transition">{t('navHowItWorks')}</a>
          <a href="#reviews" onClick={scrollToReviews} className="hover:text-white transition">{t('navReviews')}</a>
          <a href="#" className="hover:text-white transition">{t('navFaq')}</a>
          <a href="https://t.me/best_obmen_news" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#10b981] hover:text-[#059669] transition">
            <span className="text-lg">@</span>
            <span>news</span>
          </a>
        </nav>

        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center gap-2 hover:bg-white/5 px-3 py-2 rounded-lg transition"
          >
            <div className="w-5 h-5 rounded-sm border border-white/20 overflow-hidden flex-shrink-0">
              <img 
                src={`https://flagcdn.com/w20/${currentLang.flag}.png`} 
                alt={currentLang.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="text-sm font-medium">{currentLang.name}</span>
            <svg 
              className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isLangMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden z-50 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-white/10 transition text-left ${
                    currentLangCode === lang.code ? 'bg-white/5 text-white' : 'text-gray-400'
                  }`}
                >
                  <div className="w-5 h-5 rounded-sm border border-white/20 overflow-hidden flex-shrink-0">
                    <img 
                      src={`https://flagcdn.com/w20/${lang.flag}.png`} 
                      alt={lang.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="text-sm font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;