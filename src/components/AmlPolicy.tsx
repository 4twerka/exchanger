import { useTranslation } from 'react-i18next';

const AmlPolicy: React.FC = () => {
  const { t } = useTranslation();

  const rules = [
    { title: t('amlRule1Title'), text: t('amlRule1Text') },
    { title: t('amlRule2Title'), text: t('amlRule2Text') },
    { title: t('amlRule3Title'), text: t('amlRule3Text') },
    { title: t('amlRule4Title'), text: t('amlRule4Text') },
    { title: t('amlRule5Title'), text: t('amlRule5Text') }
  ];

  return (
    <section className="py-20 relative z-10 bg-[#0a0a0a] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[#121212] border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">{t('amlPolicy')}</h1>
          <p className="text-gray-400 leading-relaxed text-center mb-12">
            {t('amlSubtitle')}
          </p>
          
          <div className="flex flex-col gap-8">
            {rules.map((rule, index) => (
              <div key={index} className="border-b border-white/5 pb-8 last:border-0 last:pb-0">
                <h2 className="text-xl font-bold text-[#10b981] mb-4">{rule.title}</h2>
                <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                  {rule.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AmlPolicy;