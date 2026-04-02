import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const FALLBACK_RATES: Record<string, number> = {
  USDT: 1, BTC: 65000, ETH: 3300, EUR: 1.08,
  UAH: 0.025, PLN: 0.25, GBP: 1.25, CZK: 0.043,
  HUF: 0.0028, RON: 0.22
};

const RecentExchanges: React.FC = () => {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const generateFakes = async () => {
      let rates = FALLBACK_RATES;
      try {
        const cachedRates = localStorage.getItem('exchange_rates_cache');
        const cacheTime = localStorage.getItem('exchange_rates_time');
        const now = Date.now();

        if (!cachedRates || !cacheTime || now - parseInt(cacheTime) > 86400000) {
          const [cryptoRes, fiatRes] = await Promise.all([
            fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd'),
            fetch('https://open.er-api.com/v6/latest/USD')
          ]);

          if (cryptoRes.ok && fiatRes.ok) {
            const cryptoData = await cryptoRes.json();
            const fiatData = await fiatRes.json();
            rates = {
              USDT: cryptoData.tether?.usd || 1,
              BTC: cryptoData.bitcoin?.usd || 65000,
              ETH: cryptoData.ethereum?.usd || 3300,
              EUR: 1 / (fiatData.rates?.EUR || 0.92),
              UAH: 1 / (fiatData.rates?.UAH || 39.5),
              PLN: 1 / (fiatData.rates?.PLN || 4.0),
              GBP: 1 / (fiatData.rates?.GBP || 0.79),
              CZK: 1 / (fiatData.rates?.CZK || 23.5),
              HUF: 1 / (fiatData.rates?.HUF || 360),
              RON: 1 / (fiatData.rates?.RON || 4.6),
            };
            localStorage.setItem('exchange_rates_cache', JSON.stringify(rates));
            localStorage.setItem('exchange_rates_time', now.toString());
          }
        } else {
          rates = JSON.parse(cachedRates);
        }
      } catch (error) {}

      const names = ["CryptoFox", "WhaleAlert", "DeFi_Degen", "HodlMaster", "AnonTrader", "MoonWalker", "P2P_Ninja", "SatoshiGhost", "Web3_Alex", "TradeBot", "BullRun", "ETH_Maxi", "SwapGod", "KyivTrader", "LvivCrypto", "BitMaster", "EagleEye", "ShadowTrader"];
      const cryptos = ["USDT", "BTC", "ETH"];
      const fiats = ["EUR", "UAH", "PLN", "GBP", "CZK", "HUF", "RON"];
      const results = [];

      for(let i = 1; i <= 100; i++) {
        const isCryptoToFiat = Math.random() > 0.5;
        const giveCur = isCryptoToFiat ? cryptos[Math.floor(Math.random()*cryptos.length)] : fiats[Math.floor(Math.random()*fiats.length)];
        const getCur = isCryptoToFiat ? fiats[Math.floor(Math.random()*fiats.length)] : cryptos[Math.floor(Math.random()*cryptos.length)];
        const isMicro = Math.random() > 0.6; 

        let giveAmt;
        if (isCryptoToFiat) {
           if (giveCur === 'BTC') giveAmt = isMicro ? (Math.random() * 0.001 + 0.0003).toFixed(4) : (Math.random() * 0.1 + 0.01).toFixed(3);
           else if (giveCur === 'ETH') giveAmt = isMicro ? (Math.random() * 0.02 + 0.005).toFixed(3) : (Math.random() * 1.5 + 0.1).toFixed(2);
           else giveAmt = isMicro ? Math.floor(Math.random() * 80 + 20) : Math.floor(Math.random() * 2000 + 100);
        } else {
           if (giveCur === 'HUF') giveAmt = isMicro ? Math.floor(Math.random() * 15000 + 5000) : Math.floor(Math.random() * 300000 + 50000);
           else if (giveCur === 'CZK' || giveCur === 'UAH') giveAmt = isMicro ? Math.floor(Math.random() * 1500 + 600) : Math.floor(Math.random() * 40000 + 2500);
           else giveAmt = isMicro ? Math.floor(Math.random() * 80 + 20) : Math.floor(Math.random() * 2000 + 100);
        }

        const valueInUSD = Number(giveAmt) * (rates[giveCur] || 1);
        let getAmt = (valueInUSD / (rates[getCur] || 1)) * 0.98;
        let getAmtStr;
        if (getCur === 'BTC') getAmtStr = getAmt.toFixed(5);
        else if (getCur === 'ETH') getAmtStr = getAmt.toFixed(4);
        else getAmtStr = getAmt.toFixed(2);

        const timeRand = Math.random();
        let timeVal, timeUnit;
        if (timeRand < 0.65) {
          timeVal = Math.floor(Math.random() * 5) + 1;
          timeUnit = 'min';
        } else if (timeRand < 0.90) {
          timeVal = Math.floor(Math.random() * 5) + 6;
          timeUnit = 'min';
        } else if (timeRand < 0.98) {
          timeVal = Math.floor(Math.random() * 40) + 11;
          timeUnit = 'min';
        } else {
          timeVal = Math.floor(Math.random() * 3) + 1;
          timeUnit = 'hour';
        }

        results.push({ 
          id: i, 
          name: names[Math.floor(Math.random()*names.length)] + "_" + Math.floor(Math.random()*999), 
          give: giveAmt.toString(), 
          giveCur, 
          get: getAmtStr, 
          getCur, 
          time: { value: timeVal, unit: timeUnit }
        });
      }
      setTransactions(results);
    };
    generateFakes();
  }, []);

  if (transactions.length === 0) return null;

  return (
    <section className="py-12 border-y border-white/5 bg-[#0a0a0a] overflow-hidden relative">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 900s linear infinite;
            display: flex;
            width: max-content;
            will-change: transform;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="container mx-auto px-4 mb-6">
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">
          {t('recentExchanges')}
        </h3>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee">
          {[...transactions, ...transactions].map((tx, index) => (
            <div 
              key={`${tx.id}-${index}`} 
              className="flex items-center gap-4 bg-[#121212] border border-white/5 rounded-full py-2 px-5 mx-3 whitespace-nowrap shadow-sm transition-colors hover:border-[#10b981]/30 cursor-default"
            >
              <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xs font-bold text-gray-300 flex-shrink-0">
                {tx.name.charAt(0)}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-white">{tx.name}</span>
                <span className="text-gray-500 mx-1">{t('exchanged')}</span>
                <span className="text-[#10b981] font-bold">{tx.give} {tx.giveCur}</span>
                <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span className="text-white font-bold">{tx.get} {tx.getCur}</span>
              </div>
              <div className="text-xs text-gray-600 ml-2 border-l border-white/10 pl-3">
                {t(tx.time.unit === 'min' ? 'minAgo' : 'hoursAgo', { time: tx.time.value })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentExchanges;