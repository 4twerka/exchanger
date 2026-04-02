import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import ExchangeForm from './components/ExchangeForm';
import CheckoutPage from './components/CheckoutPage';
import RecentExchanges from './components/RecentExchanges';
import Reviews from './components/Reviews';
import Footer from './components/Footer';

const App: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const detectLanguage = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country_code;

        const countryToLang: Record<string, string> = {
          'PL': 'pl',
          'DE': 'de', 'AT': 'de', 'CH': 'de', 'LI': 'de',
          'RO': 'ro', 'MD': 'ro',
          'CZ': 'cs',
          'HU': 'hu',
          'FR': 'fr', 'BE': 'fr', 'LU': 'fr', 'MC': 'fr',
          'ES': 'es', 'AD': 'es',
          'IT': 'it', 'SM': 'it', 'VA': 'it',
          'PT': 'pt',
          'NL': 'nl',
          'SE': 'sv',
          'UA': 'uk'
        };

        const detectedLang = countryToLang[country] || 'en';
        i18n.changeLanguage(detectedLang);
      } catch (error) {
        console.error(error);
      }
    };

    detectLanguage();
  }, [i18n]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24">
          <Routes>

            <Route 
              path="/" 
              element={
                <>
                  <ExchangeForm />
                  <RecentExchanges />
                  <Reviews />
                </>
              } 
            />

            <Route path="/exchange" element={<CheckoutPage />} />

          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;