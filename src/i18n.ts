import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      youGive: "You Give",
      youGet: "You Get",
      exchange: "Exchange",
      support: "Support 24/7",
      operatorOnline: "Operator online",
      tgMessage: "Hello, I want to exchange:\nGive: {{amountGive}} {{currencyGive}}\nGet: {{amountGet}} {{currencyGetCode}}",
      exchangeRate: "Exchange Rate",
      terms: "Read the terms of service before exchanging",
      selectDifferent: "Select different currencies",
      reserve: "USDT Reserve",
      courseFixed: "Rate is fixed for",
      writeToTg: "Write to Telegram"
    }
  },
  pl: {
    translation: {
      youGive: "Oddajesz",
      youGet: "Otrzymujesz",
      exchange: "Wymień",
      support: "Wsparcie 24/7",
      operatorOnline: "Operator online",
      tgMessage: "Witam, chcę wymienić:\nOddaję: {{amountGive}} {{currencyGive}}\nOtrzymuję: {{amountGet}} {{currencyGetCode}}",
      exchangeRate: "Kurs wymiany",
      terms: "Przed wymianą zapoznaj się z regulaminem",
      selectDifferent: "Wybierz różne waluty",
      reserve: "Rezerwa USDT",
      courseFixed: "Kurs jest stały przez",
      writeToTg: "Napisz na Telegramie"
    }
  },
  de: {
    translation: {
      youGive: "Sie geben",
      youGet: "Sie erhalten",
      exchange: "Umtauschen",
      support: "Unterstützung 24/7",
      operatorOnline: "Operator online",
      tgMessage: "Hallo, ich möchte umtauschen:\nIch gebe: {{amountGive}} {{currencyGive}}\nIch erhalte: {{amountGet}} {{currencyGetCode}}",
      exchangeRate: "Wechselkurs",
      terms: "Lesen Sie vor dem Umtausch die Nutzungsbedingungen",
      selectDifferent: "Wählen Sie verschiedene Währungen",
      reserve: "USDT-Reserve",
      courseFixed: "Kurs ist fixiert für",
      writeToTg: "Auf Telegram schreiben"
    }
  },
  ro: {
    translation: {
      youGive: "Dai",
      youGet: "Primești",
      exchange: "Schimbă",
      support: "Asistență 24/7",
      operatorOnline: "Operator online",
      tgMessage: "Bună ziua, vreau să schimb:\nDau: {{amountGive}} {{currencyGive}}\nPrimesc: {{amountGet}} {{currencyGetCode}}",
      exchangeRate: "Rata de schimb",
      terms: "Citiți termenii serviciului înainte de a schimba",
      selectDifferent: "Selectați monede diferite",
      reserve: "Rezervă USDT",
      courseFixed: "Cursul este fixat pentru",
      writeToTg: "Scrieți pe Telegram"
    }
  },
  cs: {
    translation: {
      youGive: "Dáváte",
      youGet: "Dostanete",
      exchange: "Vyměnit",
      support: "Podpora 24/7",
      operatorOnline: "Operátor online",
      tgMessage: "Dobrý den, chci vyměnit:\nDávám: {{amountGive}} {{currencyGive}}\nDostanu: {{amountGet}} {{currencyGetCode}}",
      exchangeRate: "Směnný kurz",
      terms: "Před výměnou si přečtěte podmínky služby",
      selectDifferent: "Vyberte různé měny",
      reserve: "Rezerva USDT",
      courseFixed: "Kurz je fixován na",
      writeToTg: "Napsat na Telegram"
    }
  },
  hu: {
    translation: {
      youGive: "Adsz",
      youGet: "Kapsz",
      exchange: "Csere",
      support: "Támogatás 24/7",
      operatorOnline: "Operátor online",
      tgMessage: "Üdvözlöm, cserélni szeretnék:\nAdok: {{amountGive}} {{currencyGive}}\nKapok: {{amountGet}} {{currencyGetCode}}",
      exchangeRate: "Árfolyam",
      terms: "Csere előtt olvassa el a szolgáltatási feltételeket",
      selectDifferent: "Válasszon különböző valutákat",
      reserve: "USDT Tartalék",
      courseFixed: "Az árfolyam rögzítve:",
      writeToTg: "Írjon Telegramon"
    }
  },
  fr: {
    translation: {
      youGive: "Vous donnez",
      youGet: "Vous obtenez",
      exchange: "Échanger",
      support: "Support 24/7",
      operatorOnline: "Opérateur en ligne",
      tgMessage: "Bonjour, je souhaite échanger :\nJe donne : {{amountGive}} {{currencyGive}}\nJ'obtiens : {{amountGet}} {{currencyGetCode}}",
      exchangeRate: "Taux de change",
      terms: "Lisez les conditions d'utilisation avant d'échanger",
      selectDifferent: "Sélectionnez des devises différentes",
      reserve: "Réserve USDT",
      courseFixed: "Le taux est fixé pour",
      writeToTg: "Écrire sur Telegram"
    }
  },
  es: {
    translation: {
      youGive: "Das",
      youGet: "Recibes",
      exchange: "Intercambiar",
      support: "Soporte 24/7",
      operatorOnline: "Operador en línea",
      tgMessage: "Hola, quiero intercambiar:\nDoy: {{amountGive}} {{currencyGive}}\nRecibo: {{amountGet}} {{currencyGetCode}}",
      exchangeRate: "Tipo de cambio",
      terms: "Lea los términos de servicio antes de intercambiar",
      selectDifferent: "Seleccione monedas diferentes",
      reserve: "Reserva USDT",
      courseFixed: "La tasa está fija por",
      writeToTg: "Escribir en Telegram"
    }
  },
  it: {
    translation: {
      youGive: "Dai",
      youGet: "Ricevi",
      exchange: "Scambia",
      support: "Supporto 24/7",
      operatorOnline: "Operatore online",
      tgMessage: "Ciao, voglio scambiare:\nDo: {{amountGive}} {{currencyGive}}\nRicevo: {{amountGet}} {{currencyGetCode}}",
      exchangeRate: "Tasso di cambio",
      terms: "Leggi i termini di servizio prima di scambiare",
      selectDifferent: "Seleziona valute diverse",
      reserve: "Riserva USDT",
      courseFixed: "Il tasso è fisso per",
      writeToTg: "Scrivi su Telegram"
    }
  },
  pt: {
    translation: {
      youGive: "Você dá",
      youGet: "Você recebe",
      exchange: "Trocar",
      support: "Suporte 24/7",
      operatorOnline: "Operador online",
      tgMessage: "Olá, quero trocar:\nDou: {{amountGive}} {{currencyGive}}\nRecebo: {{amountGet}} {{currencyGetCode}}",
      exchangeRate: "Taxa de câmbio",
      terms: "Leia os termos de serviço antes de trocar",
      selectDifferent: "Selecione moedas diferentes",
      reserve: "Reserva USDT",
      courseFixed: "A taxa é fixa por",
      writeToTg: "Escrever no Telegram"
    }
  },
  nl: {
    translation: {
      youGive: "Jij geeft",
      youGet: "Jij krijgt",
      exchange: "Omruilen",
      support: "Support 24/7",
      operatorOnline: "Operator online",
      tgMessage: "Hallo, ik wil omruilen:\nIk geef: {{amountGive}} {{currencyGive}}\nIk krijg: {{amountGet}} {{currencyGetCode}}",
      exchangeRate: "Wisselkoers",
      terms: "Lees de servicevoorwaarden voordat u omruilt",
      selectDifferent: "Selecteer verschillende valuta's",
      reserve: "USDT-reserve",
      courseFixed: "Koers is vastgezet voor",
      writeToTg: "Schrijf op Telegram"
    }
  },
  sv: {
    translation: {
      youGive: "Du ger",
      youGet: "Du får",
      exchange: "Byta",
      support: "Support 24/7",
      operatorOnline: "Operatör online",
      tgMessage: "Hej, jag vill byta:\nJag ger: {{amountGive}} {{currencyGive}}\nJag får: {{amountGet}} {{currencyGetCode}}",
      exchangeRate: "Växelkurs",
      terms: "Läs användarvillkoren innan du byter",
      selectDifferent: "Välj olika valutor",
      reserve: "USDT-reserv",
      courseFixed: "Kursen är låst i",
      writeToTg: "Skriv på Telegram"
    }
  },
  uk: {
    translation: {
      youGive: "Віддаєте",
      youGet: "Отримуєте",
      exchange: "Обміняти",
      support: "Підтримка 24/7",
      operatorOnline: "Оператор онлайн",
      tgMessage: "Вітаю, хочу обміняти:\nВіддаю: {{amountGive}} {{currencyGive}}\nОтримую: {{amountGet}} {{currencyGetCode}}",
      exchangeRate: "Курс обміну",
      terms: "Перед обміном ознайомтеся з правилами",
      selectDifferent: "Виберіть різні валюти",
      reserve: "Резерв USDT",
      courseFixed: "Курс зафіксовано на",
      writeToTg: "Написати в Telegram"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;