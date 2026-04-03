import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const handlePageChange = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 pt-16 pb-12 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="flex items-start justify-between">
          
          <div className="flex flex-col gap-6">
            <span className="text-sm text-gray-600">© {currentYear} Best Obmen</span>
            <div className="flex gap-4 text-gray-500">
              <a href="#" className="hover:text-white transition">TG</a>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <div>{t('workDays')}</div>
              <div>{t('weekends')}</div>
            </div>
            <a href="mailto:support@best-obmen.com" className="text-sm text-[#10b981] hover:text-[#059669] transition">
              support@best-obmen.com
            </a>
          </div>

          <div className="flex gap-20 text-sm text-gray-500">
            <div className="flex flex-col gap-3">
              <Link to="/aml" onClick={handlePageChange} className="hover:text-white transition">{t('amlPolicy')}</Link>
              <Link to="/rules" onClick={handlePageChange} className="hover:text-white transition">{t('siteRules')}</Link>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/partnership" onClick={handlePageChange} className="hover:text-white transition">{t('partnershipProgram')}</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;