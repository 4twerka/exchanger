import React from 'react';
import { useTranslation } from 'react-i18next';

const SiteRules: React.FC = () => {
  const { t } = useTranslation();

  const rules = [
    { title: t('rule1Title'), text: t('rule1Text') },
    { title: t('rule2Title'), text: t('rule2Text') },
    { title: t('rule3Title'), text: t('rule3Text') },
    { title: t('rule4Title'), text: t('rule4Text') },
    { title: t('rule5Title'), text: t('rule5Text') },
    { title: t('rule6Title'), text: t('rule6Text') },
    { title: t('rule7Title'), text: t('rule7Text') },
  ];

  return (
    <section className="py-20 relative z-10 bg-[#0a0a0a] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[#121212] border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">{t('siteRules')}</h1>
          
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

export default SiteRules;