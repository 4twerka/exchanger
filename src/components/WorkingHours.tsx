import React from 'react';
import { useTranslation } from 'react-i18next';

const WorkingHours: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="schedule" className="py-20 relative z-10 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('navSchedule')}</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
              {t('scheduleDescription')}
            </p>
          </div>

          <h3 className="text-xl font-bold text-white mb-8">{t('supportScheduleTitle')}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-4 hover:border-[#10b981]/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#10b981]/10 text-[#10b981] flex items-center justify-center mb-2">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{t('workDays')}</h3>
            </div>

            <div className="bg-[#121212] border border-white/5 p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center gap-4 hover:border-[#10b981]/30 transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#10b981]/10 text-[#10b981] flex items-center justify-center mb-2">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">{t('weekends')}</h3>
            </div>
          </div>

          <div className="mt-12 inline-flex flex-col sm:flex-row items-center gap-6 bg-[#1a1a1a] border border-white/5 py-4 px-8 rounded-2xl">
            <span className="text-gray-400">{t('support')}:</span>
            <a href="https://t.me/cryptoex69" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:text-[#10b981] transition font-medium">
              <svg className="w-5 h-5 text-[#2AABEE]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/></svg>
              @cryptoex69
            </a>
            <div className="hidden sm:block w-px h-6 bg-white/10"></div>
            <a href="mailto:support@best-obmen.com" className="text-white hover:text-[#10b981] transition font-medium">
              support@best-obmen.com
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WorkingHours;