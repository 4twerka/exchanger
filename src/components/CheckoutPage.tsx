import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TELEGRAM_BOT_TOKEN = '8603271123:AAFF4dpif76mwY6xrLKEMvcUC573tnAIUpA';
const TELEGRAM_CHAT_ID = '-5014982896';
const OPERATOR_USERNAME = 'cryptoex69'; 

type MessengerType = 'telegram' | 'viber' | 'whatsapp';

const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { state } = location;

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { giveCurrency, getCurrency, amountGive, amountGet, rate } = state;

  const [messenger, setMessenger] = useState<MessengerType>('telegram');
  const [contactInfo, setContactInfo] = useState('');
  const [wallet, setWallet] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleMessengerChange = (type: MessengerType) => {
    setMessenger(type);
    setContactInfo('');
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (messenger === 'telegram') {
      val = val.replace(/[^a-zA-Z0-9_@+]/g, '');
    } else {
      val = val.replace(/[^\d+]/g, '');
    }
    setContactInfo(val);
  };

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (getCurrency.type === 'fiat') {
      val = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 34);
    } else {
      val = val.replace(/[^a-zA-Z0-9]/g, '');
    }
    setWallet(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo || !wallet || !agreed) {
      setError('Будь ласка, заповніть всі поля та погодьтеся з правилами.');
      return;
    }
    
    if (getCurrency.type === 'fiat') {
      if (wallet.length < 15) {
        setError('IBAN повинен містити мінімум 15 символів.');
        return;
      }
    }

    setError('');
    setIsSubmitting(true);

    try {
      const messengerName = messenger === 'telegram' ? 'Telegram' : messenger === 'viber' ? 'Viber' : 'WhatsApp';
      
      const adminMessage = `
🚨 <b>New Exchange Request!</b>

<b>Gives:</b> ${amountGive} ${giveCurrency.code}
<b>Gets:</b> ${amountGet} ${getCurrency.code}
<b>Rate:</b> 1 ${giveCurrency.code} = ${rate.toFixed(4)} ${getCurrency.code}

<b>Client Contact (${messengerName}):</b> <code>${contactInfo}</code>
<b>Details (${getCurrency.type === 'crypto' ? 'Wallet' : 'IBAN'}):</b> <code>${wallet}</code>
      `;

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: adminMessage,
          parse_mode: 'HTML'
        })
      });

      const clientMessageText = t('tgMessage', {
        amountGive,
        currencyGive: giveCurrency.code,
        amountGet,
        currencyGetCode: getCurrency.code
      });
      const encodedText = encodeURIComponent(clientMessageText);
      
      window.location.href = `https://t.me/${OPERATOR_USERNAME}?text=${encodedText}`;

    } catch (err) {
      setError('Сталася помилка. Спробуйте пізніше.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 relative z-10">
      <div className="max-w-4xl mx-auto">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-[#10b981] transition mb-8 group"
        >
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Назад до калькулятора
        </button>

        <h1 className="text-3xl font-bold text-white mb-8">Оформлення заявки</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 bg-[#121212] border border-white/5 p-6 rounded-3xl h-fit shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Деталі обміну
            </h3>
            
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
                <span className="text-gray-500 text-sm">Ви віддаєте:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-white">{amountGive}</span>
                  <span className="text-[#10b981] font-bold">{giveCurrency.code}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
                <span className="text-gray-500 text-sm">Ви отримуєте:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl text-white">{amountGet}</span>
                  <span className="text-gray-300 font-bold">{getCurrency.code}</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm pt-2">
                <span className="text-gray-500">Курс:</span>
                <span className="text-gray-400 font-medium">1 {giveCurrency.code} = <span className="text-[#10b981]">{rate.toFixed(4)}</span> {getCurrency.code}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-[#121212] border border-white/5 p-8 rounded-3xl shadow-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-4">
                  Як з вами зв'язатися? <span className="text-[#10b981]">*</span>
                </label>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => handleMessengerChange('telegram')}
                    className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all ${
                      messenger === 'telegram' 
                        ? 'bg-[#2AABEE]/10 border-[#2AABEE] text-[#2AABEE]' 
                        : 'bg-[#1a1a1a] border-white/5 text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/></svg>
                    <span className="font-medium text-sm">Telegram</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleMessengerChange('viber')}
                    className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all ${
                      messenger === 'viber' 
                        ? 'bg-[#7360F2]/10 border-[#7360F2] text-[#7360F2]' 
                        : 'bg-[#1a1a1a] border-white/5 text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.877 10.744c-.035-.118-.086-.234-.148-.346-.484-1.284-1.298-2.39-2.348-3.18-.707-.53-1.503-.923-2.355-1.16-.142-.04-.29-.074-.442-.095a6.002 6.002 0 00-1.874-.034c-.15.02-.298.053-.44.093-.852.235-1.648.628-2.355 1.16-1.05.79-1.864 1.896-2.348 3.18-.06.11-.112.227-.146.345-.102.34-.16.696-.168 1.058-.007.41.047.818.158 1.213.11.397.275.776.488 1.13.43.708 1.01 1.306 1.69 1.745.68.44 1.442.71 2.238.795.795.086 1.603.003 2.37-.245.765-.246 1.472-.658 2.062-1.205a5.95 5.95 0 001.213-1.688c.18-.363.313-.746.394-1.14.08-.396.113-.8.096-1.205-.015-.365-.072-.723-.174-1.066m-3.804 4.094a4.114 4.114 0 01-1.396.95c-.52.215-1.08.312-1.64.286-.56-.026-1.106-.176-1.604-.44-.498-.262-.93-.63-1.265-1.077a4.125 4.125 0 01-.734-1.554 4.137 4.137 0 01.03-1.666c.14-.54.385-1.044.72-1.48.334-.434.757-.783 1.24-1.025.48-.24 1.013-.36 1.556-.35.54.008 1.07.147 1.545.405.474.258.882.617 1.196 1.052.313.434.524.93.616 1.455.093.525.06 1.062-.096 1.57a4.102 4.102 0 01-.663 1.332 4.1 4.1 0 01-1.07 1.047M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/></svg>
                    <span className="font-medium text-sm">Viber</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => handleMessengerChange('whatsapp')}
                    className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all ${
                      messenger === 'whatsapp' 
                        ? 'bg-[#25D366]/10 border-[#25D366] text-[#25D366]' 
                        : 'bg-[#1a1a1a] border-white/5 text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 21c-1.566-.002-3.111-.418-4.468-1.206l-4.965 1.302 1.325-4.84a9.697 9.697 0 01-1.298-4.832C2.625 5.922 7.042 1.5 12.55 1.5 17.986 1.5 22.4 5.922 22.4 11.425c0 5.503-4.414 9.923-9.85 9.925h-.519zm0-17.85c-4.412 0-8.006 3.593-8.006 8.006 0 1.56.452 3.076 1.285 4.316l-1.071 3.91 4.003-1.05a7.99 7.99 0 004.28 1.218h.01c4.41 0 8-3.592 8-8.005 0-4.413-3.59-8.007-8-8.007z"/></svg>
                    <span className="font-medium text-sm">WhatsApp</span>
                  </button>
                </div>

                <input 
                  type="text" 
                  value={contactInfo}
                  onChange={handleContactChange}
                  placeholder={
                    messenger === 'telegram' ? "@username або номер" : 
                    "Введіть ваш номер телефону"
                  }
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#10b981] transition shadow-inner"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-3 flex items-center justify-between">
                  <span>
                    {getCurrency.type === 'crypto' 
                      ? `Ваш гаманець ${getCurrency.code}` 
                      : `Ваш IBAN (${getCurrency.code})`}
                    <span className="text-[#10b981] ml-1">*</span>
                  </span>
                  {getCurrency.type === 'crypto' && (
                    <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-500">Мережа TRC20</span>
                  )}
                </label>
                <input 
                  type="text" 
                  value={wallet}
                  onChange={handleWalletChange}
                  placeholder={getCurrency.type === 'crypto' ? "T..." : "UA000000000000000000000000000"}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#10b981] transition font-mono tracking-wide shadow-inner"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {error}
                </div>
              )}

              <div className="h-px w-full bg-white/5 my-2"></div>

              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex items-center mt-0.5">
                  <input 
                    type="checkbox" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="appearance-none w-5 h-5 border-2 border-white/20 rounded bg-transparent checked:bg-[#10b981] checked:border-[#10b981] transition cursor-pointer"
                  />
                  {agreed && (
                    <svg className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
                <span className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition">
                  Я підтверджую правильність введених даних та погоджуюсь з <a href="#" className="text-[#10b981] hover:underline">Правилами сервісу</a> та <a href="#" className="text-[#10b981] hover:underline">AML політикою</a>.
                </span>
              </label>

              <button 
                type="submit"
                disabled={isSubmitting || !agreed}
                className="w-full bg-[#10b981] hover:bg-[#059669] disabled:bg-[#1a1a1a] disabled:text-gray-500 disabled:border disabled:border-white/5 transition-all text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg shadow-[#10b981]/20 disabled:shadow-none flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Обробка заявки...
                  </>
                ) : (
                  <>
                    Створити заявку та перейти в {messenger === 'telegram' ? 'Telegram' : messenger === 'viber' ? 'Viber' : 'WhatsApp'}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;