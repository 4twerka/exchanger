import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/5 pt-16 pb-12 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="flex items-start justify-between">
          
          <div className="flex flex-col gap-6">
            <span className="text-sm text-gray-600">© 2026 Best Obmen</span>
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
              <a href="#" className="hover:text-white transition">{t('amlPolicy')}</a>
              <a href="#" className="hover:text-white transition">{t('termsAndConditions')}</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="hover:text-white transition">{t('siteRules')}</a>
              <a href="#" className="hover:text-white transition">{t('partnershipProgram')}</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;