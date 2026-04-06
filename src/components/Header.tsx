import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
  { code: 'uk', name: 'Українська', flag: 'ua' },
  { code: 'ru', name: 'Русский', flag: 'ru' }
];

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false); 
  const menuRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (location.hash === '#reviews') {
      const section = document.getElementById('reviews');
      if (section) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng_user_selected', code);
    setIsLangMenuOpen(false);
    setIsMobileMenuOpen(false); 
  };

  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); 
    
    if (location.pathname !== '/') {
      navigate('/#reviews');
      return;
    }
    const section = document.getElementById('reviews');
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handlePageChange = () => {
    setIsMobileMenuOpen(false); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        <Link to="/" onClick={handlePageChange} className="flex items-center gap-2 cursor-pointer relative z-50">
          <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center font-bold text-xl text-white">
            O
          </div>
          <span className="text-2xl font-bold text-white">Best Obmen</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link to="/" onClick={handlePageChange} className="hover:text-white transition">{t('navHome')}</Link>
          <Link to="/schedule" onClick={handlePageChange} className="hover:text-white transition">{t('navSchedule')}</Link>
          <a href="/#reviews" onClick={scrollToReviews} className="hover:text-white transition">{t('navReviews')}</a>
          <Link to="/faq" onClick={handlePageChange} className="hover:text-white transition">{t('navFaq')}</Link>
        </nav>

        <div className="flex items-center gap-4 relative z-50">

          <div className="hidden md:block relative" ref={menuRef}>
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 hover:bg-white/5 px-3 py-2 rounded-lg transition"
            >
              <div className="w-5 h-5 rounded-sm border border-white/20 overflow-hidden flex-shrink-0">
                <img 
                  src={`https://unpkg.com/flag-icons@6.11.1/flags/4x3/${currentLang.flag}.svg`} 
                  alt={currentLang.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="text-sm font-medium text-white">{currentLang.name}</span>
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
                        src={`https://unpkg.com/flag-icons@6.11.1/flags/4x3/${lang.flag}.svg`} 
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

          <button 
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/5 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[calc(100vh-70px)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-4 overflow-y-auto max-h-[calc(100vh-70px)] scrollbar-thin scrollbar-thumb-gray-700">
          
          <nav className="flex flex-col gap-2 mb-6">
            <Link to="/" onClick={handlePageChange} className="text-lg font-medium text-white py-3 px-4 hover:bg-white/5 rounded-xl transition">{t('navHome')}</Link>
            <Link to="/schedule" onClick={handlePageChange} className="text-lg font-medium text-white py-3 px-4 hover:bg-white/5 rounded-xl transition">{t('navSchedule')}</Link>
            <a href="/#reviews" onClick={scrollToReviews} className="text-lg font-medium text-white py-3 px-4 hover:bg-white/5 rounded-xl transition">{t('navReviews')}</a>
            <Link to="/faq" onClick={handlePageChange} className="text-lg font-medium text-white py-3 px-4 hover:bg-white/5 rounded-xl transition">{t('navFaq')}</Link>
          </nav>

          <div className="border-t border-white/10 pt-6">
            <button 
              onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
              className="w-full flex items-center justify-between py-3 px-4 bg-[#1a1a1a] rounded-xl border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-sm border border-white/20 overflow-hidden flex-shrink-0">
                  <img src={`https://unpkg.com/flag-icons@6.11.1/flags/4x3/${currentLang.flag}.svg`} alt={currentLang.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-base font-bold text-white">{currentLang.name}</span>
              </div>
              <svg className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${isMobileLangOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`transition-all duration-300 overflow-hidden ${isMobileLangOpen ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${
                      currentLangCode === lang.code ? 'bg-[#10b981]/10 border-[#10b981]/30 text-[#10b981]' : 'bg-[#121212] border-white/5 text-gray-400 hover:bg-white/5'
                    } transition`}
                  >
                    <div className="w-5 h-5 rounded-sm overflow-hidden flex-shrink-0 opacity-80">
                      <img src={`https://unpkg.com/flag-icons@6.11.1/flags/4x3/${lang.flag}.svg`} alt={lang.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;