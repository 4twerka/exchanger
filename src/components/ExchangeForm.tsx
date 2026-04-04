import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// const OPERATOR_USERNAME = 'cryptoex69';

type CurrencyType = 'fiat' | 'crypto';

interface Currency {
  id: string;
  code: string;
  name: string;
  type: CurrencyType;
  flag?: string;
  symbol?: string;
}

const currencies: Currency[] = [
  { id: 'tether', code: 'USDT', name: 'Tether (TRC20)', type: 'crypto', symbol: '$' },
  { id: 'bitcoin', code: 'BTC', name: 'Bitcoin', type: 'crypto', symbol: '₿' },
  { id: 'ethereum', code: 'ETH', name: 'Ethereum', type: 'crypto', symbol: 'Ξ' },
  { id: 'eur', code: 'EUR', name: 'Euro', type: 'fiat', flag: 'eu' },
  { id: 'uah', code: 'UAH', name: 'Ukrainian Hryvnia', type: 'fiat', flag: 'ua' },
  { id: 'pln', code: 'PLN', name: 'Polish Zloty', type: 'fiat', flag: 'pl' },
  { id: 'gbp', code: 'GBP', name: 'British Pound', type: 'fiat', flag: 'gb' },
  { id: 'czk', code: 'CZK', name: 'Czech Koruna', type: 'fiat', flag: 'cz' },
  { id: 'huf', code: 'HUF', name: 'Hungarian Forint', type: 'fiat', flag: 'hu' },
  { id: 'ron', code: 'RON', name: 'Romanian Leu', type: 'fiat', flag: 'ro' },
];

const FALLBACK_USD_RATES: Record<string, number> = {
  USDT: 1, BTC: 65000, ETH: 3300, EUR: 1.08,
  UAH: 0.025, PLN: 0.25, GBP: 1.25, CZK: 0.043,
  HUF: 0.0028, RON: 0.22
};

interface CurrencyInputProps {
  label: string;
  currency: Currency;
  value: string;
  onChangeValue: (value: string) => void;
  onSelectCurrency: (currency: Currency) => void;
  quickAmounts?: number[];
  error?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ 
  label, currency, value, onChangeValue, onSelectCurrency, quickAmounts, error 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-2 relative" ref={dropdownRef}>
      <style>
        {`
          /* Надійно приховуємо стрілочки (spin buttons) у всіх браузерах */
          .hide-arrows::-webkit-outer-spin-button,
          .hide-arrows::-webkit-inner-spin-button {
            -webkit-appearance: none !important;
            margin: 0 !important;
          }
          .hide-arrows {
            -moz-appearance: textfield !important;
          }
        `}
      </style>
      
      <div className={`border border-white/5 bg-[#1a1a1a] p-5 rounded-2xl transition ${isOpen ? 'border-[#10b981]' : error ? 'border-red-500' : 'hover:border-white/10'}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-gray-400">{label}</div>
        </div>
        <div className="flex items-center justify-between">
          <div onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 -ml-2 rounded-xl transition w-1/2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg bg-[#262626] overflow-hidden flex-shrink-0 border border-white/10">
              {currency.type === 'crypto' ? <span className="text-[#10b981]">{currency.symbol}</span> : <img src={`https://flagcdn.com/w40/${currency.flag}.png`} alt={currency.code} className="w-full h-full object-cover" />}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl">{currency.code}</span>
            </div>
            <svg className={`w-5 h-5 text-gray-600 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
          <input 
            type="number" 
            placeholder="0.00" 
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
            className="hide-arrows bg-transparent text-right text-2xl sm:text-3xl font-bold w-1/2 focus:outline-none focus:ring-0 outline-none border-none text-white appearance-none" 
            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
          />
        </div>
      </div>
      
      {error && <div className="text-red-500 text-xs px-2">{error}</div>}

      {quickAmounts && (
        <div className="flex gap-2 px-1">
          {quickAmounts.map((amount) => (
            <button key={amount} onClick={() => onChangeValue(amount.toString())} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#1a1a1a] text-gray-400 border border-white/5 hover:bg-[#10b981]/10 hover:text-[#10b981] transition">
              {amount}
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="absolute top-[90px] left-0 w-full bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
          {currencies.map((c) => (
            <div key={c.code} onClick={() => { onSelectCurrency(c); setIsOpen(false); }} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-[#262626] overflow-hidden border border-white/10 flex-shrink-0">
                {c.type === 'crypto' ? <span className="text-[#10b981]">{c.symbol}</span> : <img src={`https://flagcdn.com/w40/${c.flag}.png`} alt={c.code} className="w-full h-full object-cover" />}
              </div>
              <span className="font-bold text-white">{c.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ExchangeForm: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [giveCurrency, setGiveCurrency] = useState<Currency>(currencies[0]); 
  const [getCurrency, setGetCurrency] = useState<Currency>(currencies[3]); 
  
  const [rate, setRate] = useState<number>(0);
  const [usdRate, setUsdRate] = useState<number>(1); 
  const [amountGive, setAmountGive] = useState<string>('');
  const [amountGet, setAmountGet] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const isSameCurrency = giveCurrency.code === getCurrency.code;

  useEffect(() => {
    let isMounted = true;

    const fetchRate = async () => {
      const cacheKey = `rate_${giveCurrency.code}_${getCurrency.code}`;

      if (isSameCurrency) { 
        if (isMounted) {
          setRate(1); 
          setIsLoading(false); 
        }
        return; 
      }
      
      if (isMounted && rate === 0) setIsLoading(true);
      
      try {
        let newRate = 0;
        let giveUsdRate = 1;
        
        if (giveCurrency.type === 'fiat' && getCurrency.type === 'fiat') {
          const res = await fetch(`https://open.er-api.com/v6/latest/${giveCurrency.code}`);
          if (!res.ok) throw new Error('API Rate Limit');
          const data = await res.json();
          if (data && data.rates) {
            newRate = data.rates[getCurrency.code];
            const usdRes = await fetch(`https://open.er-api.com/v6/latest/USD`);
            const usdData = await usdRes.json();
            giveUsdRate = 1 / usdData.rates[giveCurrency.code];
          }
        } else if (giveCurrency.type === 'crypto' && getCurrency.type === 'crypto') {
          const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${giveCurrency.id},${getCurrency.id}&vs_currencies=usd`);
          if (!res.ok) throw new Error('API Rate Limit');
          const data = await res.json();
          if (data[giveCurrency.id] && data[getCurrency.id]) {
            newRate = data[giveCurrency.id].usd / data[getCurrency.id].usd;
            giveUsdRate = data[giveCurrency.id].usd;
          }
        } else {
          const cryptoId = giveCurrency.type === 'crypto' ? giveCurrency.id : getCurrency.id;
          const fiatCode = giveCurrency.type === 'fiat' ? giveCurrency.code : getCurrency.code;
          const cryptoRes = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);
          if (!cryptoRes.ok) throw new Error('API Rate Limit');
          const cryptoData = await cryptoRes.json();
          const cryptoUsd = cryptoData[cryptoId]?.usd;
          
          const fiatRes = await fetch(`https://open.er-api.com/v6/latest/USD`);
          if (!fiatRes.ok) throw new Error('API Rate Limit');
          const fiatData = await fiatRes.json();
          const usdFiat = fiatData.rates?.[fiatCode];
          
          if (cryptoUsd && usdFiat) {
            const cryptoToFiatRate = cryptoUsd * usdFiat; 
            newRate = giveCurrency.type === 'crypto' ? cryptoToFiatRate : 1 / cryptoToFiatRate;
            
            if (giveCurrency.type === 'crypto') {
              giveUsdRate = cryptoUsd;
            } else {
               giveUsdRate = 1 / fiatData.rates[giveCurrency.code];
            }
          }
        }
        
        if (newRate > 0 && isMounted) {
          const finalRate = newRate * 0.98;
          setRate(finalRate);
          setUsdRate(giveUsdRate);
          setTimeLeft(300);
          localStorage.setItem(cacheKey, finalRate.toString());
        } else if (isMounted) {
          throw new Error("Invalid rate");
        }
      } catch (error) { 
        if (isMounted) {
          const fallbackGiveUsd = FALLBACK_USD_RATES[giveCurrency.code] || 1;
          const fallbackGetUsd = FALLBACK_USD_RATES[getCurrency.code] || 1;
          
          setUsdRate(fallbackGiveUsd);

          const cachedRate = localStorage.getItem(cacheKey);
          if (cachedRate) {
            setRate(parseFloat(cachedRate));
            setTimeLeft(60);
          } else {
            const emergencyRate = (fallbackGiveUsd / fallbackGetUsd) * 0.98;
            setRate(emergencyRate);
            setTimeLeft(60);
          }
        }
      } finally { 
        if (isMounted) setIsLoading(false); 
      }
    };

    fetchRate();
    
    return () => {
      isMounted = false;
    };
  }, [giveCurrency, getCurrency, isSameCurrency, refreshTrigger]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setRefreshTrigger(prev => prev + 1);
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const validateLimits = (valueInGiveCurrency: number) => {
      const valueInUsd = valueInGiveCurrency * usdRate;
      
      if (valueInUsd < 50) {
          const minAmt = 50 / usdRate;
          const minFormatted = giveCurrency.type === 'crypto' ? minAmt.toFixed(5) : minAmt.toFixed(2);
          setError(`${t('minExchange', 'Minimum amount:')} ${minFormatted} ${giveCurrency.code} (~50 EUR)`);
          return false;
      } else if (valueInUsd > 50000) {
          const maxAmt = 50000 / usdRate;
          const maxFormatted = giveCurrency.type === 'crypto' ? maxAmt.toFixed(5) : maxAmt.toFixed(2);
          setError(`${t('maxExchange', 'Maximum amount:')} ${maxFormatted} ${giveCurrency.code} (~50,000 EUR)`);
          return false;
      }
      
      setError('');
      return true;
  };

  useEffect(() => {
    if (amountGive && rate > 0 && !isSameCurrency) {
      const numValue = parseFloat(amountGive);
      if (!isNaN(numValue)) {
        setAmountGet((numValue * rate).toFixed(4));
        validateLimits(numValue);
      }
    } else {
        setError('');
    }
  }, [rate, isSameCurrency, usdRate]);

  const handleGiveChange = (value: string) => {
    setAmountGive(value);
    if (value === '' || isSameCurrency || rate <= 0) { 
      setAmountGet(''); 
      setError('');
      return; 
    }
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
        setAmountGet((numValue * rate).toFixed(4));
        validateLimits(numValue);
    }
  };

  const handleGetChange = (value: string) => {
    setAmountGet(value);
    if (value === '' || isSameCurrency || rate <= 0) { 
      setAmountGive(''); 
      setError('');
      return; 
    }
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
        const newGiveAmount = numValue / rate;
        setAmountGive(newGiveAmount.toFixed(4));
        validateLimits(newGiveAmount);
    }
  };

  const swapCurrencies = () => {
    setGiveCurrency(getCurrency);
    setGetCurrency(giveCurrency);
    setAmountGive(amountGet);
  };

  const handleExchangeSubmit = () => {
    if (isLoading || isSameCurrency || rate <= 0 || !amountGive || parseFloat(amountGive) <= 0 || error) return;
    
    navigate('/exchange', {
      state: {
        giveCurrency,
        getCurrency,
        amountGive,
        amountGet,
        rate
      }
    });
  };

  return (
    // Зменшено відступ зверху на мобільних пристроях (з pt-32 на pt-24 md:pt-32)
    <section className="pt-24 md:pt-32 pb-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto border border-white/5 bg-[#121212] p-8 rounded-3xl shadow-2xl relative">

          <div className="flex flex-col md:flex-row items-stretch gap-3 mb-6 relative">
            <CurrencyInput 
              label={t('youGive')} currency={giveCurrency} value={amountGive}
              onChangeValue={handleGiveChange} onSelectCurrency={setGiveCurrency}
              quickAmounts={[100, 500, 1000]} 
              error={error}
            />
            
            <div className="flex items-center justify-center pt-0 md:pt-8 py-4 md:py-0">
              <button onClick={swapCurrencies} className="p-3 rounded-full bg-[#1a1a1a] border border-white/5 text-gray-400 hover:border-[#10b981] hover:text-[#10b981] transition group z-10">
                <svg className="w-6 h-6 transform group-hover:rotate-180 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </button>
            </div>

            <CurrencyInput 
              label={t('youGet')} currency={getCurrency} value={amountGet}
              onChangeValue={handleGetChange} onSelectCurrency={setGetCurrency}
            />
          </div>

          <div className="flex flex-col items-center justify-between mb-8 gap-4 sm:flex-row">
            {isSameCurrency ? (
              <div className="font-bold text-red-500 w-full text-center sm:text-left">{t('selectDifferent')}</div>
            ) : (
              <>
                <div className="font-medium text-gray-400 text-sm">
                  {t('exchangeRate')}: 1 {giveCurrency.code} = <span className="text-[#10b981]">{isLoading && rate <= 0 ? '...' : rate.toFixed(4)}</span> {getCurrency.code}
                </div>
                {amountGive && parseFloat(amountGive) > 0 && rate > 0 && !error && (
                  <div className="text-sm text-gray-400 flex items-center gap-2 bg-[#1a1a1a] px-3 py-1.5 rounded-lg border border-white/5">
                    <svg className="w-4 h-4 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {t('courseFixed')} <span className="font-bold text-white w-[40px]">{formatTime(timeLeft)}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={handleExchangeSubmit}
              disabled={isLoading || isSameCurrency || rate <= 0 || !amountGive || parseFloat(amountGive) <= 0 || !!error}
              className="w-full bg-[#10b981] hover:bg-[#059669] disabled:bg-gray-700 disabled:text-gray-400 disabled:shadow-none transition-colors text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg shadow-green-900/20"
            >
              {t('exchange')}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExchangeForm;