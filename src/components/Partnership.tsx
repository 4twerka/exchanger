import { useTranslation } from 'react-i18next';

const Partnership: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 relative z-10 bg-[#0a0a0a] min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[#121212] border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl text-center">
          
          <div className="w-20 h-20 bg-[#10b981]/10 text-[#10b981] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('partnershipProgram')}</h1>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
            {t('partnershipDesc')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
              <div className="text-3xl font-bold text-[#10b981] mb-4">1</div>
              <h3 className="text-white font-bold text-lg mb-2">{t('partnerStep1Title')}</h3>
              <p className="text-sm text-gray-400">{t('partnerStep1Desc')}</p>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
              <div className="text-3xl font-bold text-[#10b981] mb-4">2</div>
              <h3 className="text-white font-bold text-lg mb-2">{t('partnerStep2Title')}</h3>
              <p className="text-sm text-gray-400">{t('partnerStep2Desc')}</p>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
              <div className="text-3xl font-bold text-[#10b981] mb-4">3</div>
              <h3 className="text-white font-bold text-lg mb-2">{t('partnerStep3Title')}</h3>
              <p className="text-sm text-gray-400">{t('partnerStep3Desc')}</p>
            </div>
          </div>

          <button className="bg-[#10b981] hover:bg-[#059669] transition-colors text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-green-900/20">
            {t('partnerJoinBtn')}
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default Partnership;