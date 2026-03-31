/** @format */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LANGS = ["en", "uz", "ru"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

const STORAGE_KEY = "lang";

export function getInitialLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) {
    return saved as Lang;
  }
  const nav = (navigator.language || DEFAULT_LANG).slice(0, 2);
  return (SUPPORTED_LANGS as readonly string[]).includes(nav) ? (nav as Lang) : DEFAULT_LANG;
}

export function persistLang(lang: Lang) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
}

const resources = {
  en: {
    translation: {
      nav: {
        brand: "Book Coffee",
        language: "Language",
      },
      hero: {
        line1: "Relax.",
        line2: "Focus.",
        line3: "Enjoy.",
        subtitle:
          "An ideal place to read, work, and unwind with a cup of coffee.",
      },
      products: {
        title: "Products",
        subtitle:
          "Choose what fits your mood — coffee classics, desserts, tea, and light bites.",
        categories: {
          All: "All",
          Coffee: "Coffee",
          Dessert: "Dessert",
          Tea: "Tea",
          Breakfast: "Breakfast",
        },
        priceSuffix: "UZS",
        order: "Order",
      },
      whyUs: {
        title: "Why choose us?",
        subtitle:
          "Books, coffee, and a cozy atmosphere — all in one place.",
        items: {
          qualityTitle: "Quality guarantee",
          qualityText: "Only original and high-quality editions.",
          varietyTitle: "Wide selection",
          varietyText: "Over 10,000 books.",
          comfortTitle: "Comfortable space",
          comfortText: "Cafe and reading area available.",
        },
      },
      about: {
        title: "About us",
        subtitle:
          "Coffee, books, and rest in one place. We created a premium space to help you focus, get inspired, and enjoy time with friends.",
        features: {
          coffee: {
            title: "Coffee aroma",
            text: "Premium beans imported from Japan and Italy. Every cup is crafted with the right temperature, timing, and technique.",
          },
          books: {
            title: "Multilingual books",
            text: "5,000+ copies in literature, art, design, and business — for every taste and language.",
          },
          games: {
            title: "Board games",
            text: "A collection of strategy, cards, and logic games to enjoy with friends.",
          },
          desserts: {
            title: "Fresh desserts",
            text: "Daily-made sweets and breakfasts — only fresh and natural ingredients.",
          },
        },
      },
      feedback: {
        title: "Customer reviews",
        subtitle: "A few words from our customers.",
        prev: "Previous review",
        next: "Next review",
        items: [
          {
            name: "Dilshod",
            role: "Customer",
            text: "A very comfortable atmosphere. Great place to read and relax with a cup of coffee.",
          },
          {
            name: "Malika",
            role: "Customer",
            text: "A huge selection — they helped me quickly find the book I was looking for.",
          },
          {
            name: "Javohir",
            role: "Customer",
            text: "Excellent coffee and service. The reading area is calm and cozy.",
          },
          {
            name: "Nigora",
            role: "Customer",
            text: "Loved that they have original editions. Great options for gifts too.",
          },
        ],
      },
      orderModal: {
        heading: "Place an order",
        productLabel: "Product",
        name: "Name",
        phone: "Phone",
        address: "Address",
        telegramUsername: "Telegram username (status updates)",
        telegramHint:
          "Enter the same username as in Telegram Settings. First, send /start to the bot once — then status updates will reach you.",
        sendLocation: "Send location",
        locating: "Getting location...",
        optional: "optional",
        trackTelegram: "Track via Telegram",
        submit: "Submit order",
        submitting: "Submitting...",
        success: "Order sent. We will contact you soon.",
        errorGeneric: "Something went wrong. Please try again.",
        browserNoLocation: "Your browser doesn't support location.",
        locationDenied: "Location permission denied.",
        locationError: "Couldn't get location. Please try again.",
      },
      footer: {
        city: "Tashkent, Uzbekistan",
        contact: "Contact",
        openUntil: "Open · Closes at 23:00",
        priceRangeTitle: "Price range",
        perPerson: "(per person)",
        basedOn: "Based on 12 user reports",
        rights: "All rights reserved.",
        save: "Save",
        share: "Share",
        nearby: "Nearby",
        sendToPhone: "Send to phone",
      },
    },
  },
  uz: {
    translation: {
      nav: {
        brand: "Book Coffee",
        language: "Til",
      },
      hero: {
        line1: "Dam ol.",
        line2: "Diqqat.",
        line3: "Zavqlan.",
        subtitle:
          "Kitob o‘qish, ishlash va bir piyola qahva bilan dam olish uchun ideal maskan.",
      },
      products: {
        title: "Mahsulotlar",
        subtitle:
          "Kayfiyatingizga mos tanlang — qahva klassikalari, desertlar, choy va yengil tamaddilar.",
        categories: {
          All: "Hammasi",
          Coffee: "Qahva",
          Dessert: "Desert",
          Tea: "Choy",
          Breakfast: "Nonushta",
        },
        priceSuffix: "so'm",
        order: "Buyurtma",
      },
      whyUs: {
        title: "Nega bizni tanlash kerak?",
        subtitle:
          "Kitob, qahva va qulay muhit — barchasi bir joyda.",
        items: {
          qualityTitle: "Sifat kafolati",
          qualityText: "Faqat original va sifatli nashrlar.",
          varietyTitle: "Katta assortiment",
          varietyText: "10,000 dan ortiq kitoblar.",
          comfortTitle: "Qulay muhit",
          comfortText: "Kafe va mutolaa zali mavjudligi.",
        },
      },
      about: {
        title: "Biz haqimizda",
        subtitle:
          "Qahva, kitob va dam olish bir joyda. Biz sizga diqqat jamlash, ilhom olish va do‘stlar bilan yoqimli vaqt o‘tkazish uchun premium muhit yaratdik.",
        features: {
          coffee: {
            title: "Aromati qahva",
            text: "Yaponiya va Italiya dan import qilingan premium donlar. Har bir kubga arxitektura – to'g'ri harorat, vaqt va harakat.",
          },
          books: {
            title: "Ko'p tilli kitoblar",
            text: "Adabiyot, san'at, dizayn va biznes bo'yicha 5000+ nusxalar. Har bir til va yo'nalish uchun.",
          },
          games: {
            title: "Stol o'yinlari",
            text: "Do'stlar bilan o'tkazish uchun strategiya, karra va mantiq o'yinlari to'plami.",
          },
          desserts: {
            title: "Fresh desertlar",
            text: "Har kuni tayyorlanadigan xom asal, shirinliklar va nonushta. Faqat yangi va tabiiy mahsulotlar.",
          },
        },
      },
      feedback: {
        title: "Mijozlar fikri",
        subtitle: "Bizni tanlagan mijozlarimizdan qisqa fikrlar.",
        prev: "Oldingi fikr",
        next: "Keyingi fikr",
        items: [
          {
            name: "Dilshod",
            role: "Mijoz",
            text: "Muhit juda qulay. Kitob o‘qib, bir piyola qahva bilan dam olishga zo‘r joy.",
          },
          {
            name: "Malika",
            role: "Mijoz",
            text: "Assortiment juda katta ekan. Topolmagan kitobimni ham tezda topib berishdi.",
          },
          {
            name: "Javohir",
            role: "Mijoz",
            text: "Qahvasi ham, xizmat ko‘rsatishi ham a’lo. Mutolaa zali tinch va shinam.",
          },
          {
            name: "Nigora",
            role: "Mijoz",
            text: "Original nashrlar borligi yoqdi. Sovg‘a uchun ham zo‘r tanlovlar chiqdi.",
          },
        ],
      },
      orderModal: {
        heading: "Buyurtma berish",
        productLabel: "Mahsulot",
        name: "Ism",
        phone: "Telefon",
        address: "Manzil",
        telegramUsername: "Telegram username (holat xabarlari)",
        telegramHint:
          "Telegram Sozlamalar → Username bilan bir xil yozing. Avvalo botga bir marta /start yuboring — shunda holat xabarlari sizga boradi.",
        sendLocation: "Location yuborish",
        locating: "Location olinmoqda...",
        optional: "ixtiyoriy",
        trackTelegram: "Telegram orqali kuzatish",
        submit: "Buyurtmani yuborish",
        submitting: "Yuborilmoqda...",
        success: "Buyurtma yuborildi. Tez orada siz bilan bog‘lanamiz.",
        errorGeneric: "Xatolik yuz berdi. Qayta urinib ko‘ring.",
        browserNoLocation: "Browser location qo‘llab-quvvatlamaydi.",
        locationDenied: "Location ruxsati berilmadi.",
        locationError: "Location olishda xatolik. Qayta urinib ko‘ring.",
      },
      footer: {
        city: "Toshkent, O‘zbekiston",
        contact: "Aloqa",
        openUntil: "Ochiq · 23:00 da yopiladi",
        priceRangeTitle: "Narxlar diapazoni",
        perPerson: "(kishi boshiga)",
        basedOn: "12 ta foydalanuvchi ma’lumotiga ko‘ra",
        rights: "Barcha huquqlar himoyalangan.",
        save: "Saqlash",
        share: "Ulashish",
        nearby: "Yaqin joylar",
        sendToPhone: "Telefonga yuborish",
      },
    },
  },
  ru: {
    translation: {
      nav: {
        brand: "Book Coffee",
        language: "Язык",
      },
      hero: {
        line1: "Отдохни.",
        line2: "Сконцентрируйся.",
        line3: "Наслаждайся.",
        subtitle:
          "Идеальное место, чтобы читать, работать и отдыхать с чашкой кофе.",
      },
      products: {
        title: "Продукты",
        subtitle:
          "Выбирайте по настроению — классический кофе, десерты, чай и лёгкие перекусы.",
        categories: {
          All: "Все",
          Coffee: "Кофе",
          Dessert: "Десерт",
          Tea: "Чай",
          Breakfast: "Завтрак",
        },
        priceSuffix: "сум",
        order: "Заказать",
      },
      whyUs: {
        title: "Почему выбирают нас?",
        subtitle:
          "Книги, кофе и уютная атмосфера — всё в одном месте.",
        items: {
          qualityTitle: "Гарантия качества",
          qualityText: "Только оригинальные и качественные издания.",
          varietyTitle: "Большой выбор",
          varietyText: "Более 10 000 книг.",
          comfortTitle: "Уютная атмосфера",
          comfortText: "Есть кафе и зал для чтения.",
        },
      },
      about: {
        title: "О нас",
        subtitle:
          "Кофе, книги и отдых в одном месте. Мы создали премиальное пространство, чтобы вы могли сосредоточиться, вдохновиться и приятно провести время с друзьями.",
        features: {
          coffee: {
            title: "Аромат кофе",
            text: "Премиальные зёрна из Японии и Италии. Каждая чашка — правильная температура, время и техника.",
          },
          books: {
            title: "Книги на разных языках",
            text: "5000+ экземпляров по литературе, искусству, дизайну и бизнесу — для каждого направления.",
          },
          games: {
            title: "Настольные игры",
            text: "Коллекция стратегических, карточных и логических игр для компании друзей.",
          },
          desserts: {
            title: "Свежие десерты",
            text: "Ежедневно приготовленные сладости и завтраки — только свежие и натуральные продукты.",
          },
        },
      },
      feedback: {
        title: "Отзывы клиентов",
        subtitle: "Несколько слов от наших посетителей.",
        prev: "Предыдущий отзыв",
        next: "Следующий отзыв",
        items: [
          {
            name: "Dilshod",
            role: "Клиент",
            text: "Очень уютная атмосфера. Отличное место, чтобы читать и отдыхать с чашкой кофе.",
          },
          {
            name: "Malika",
            role: "Клиент",
            text: "Большой ассортимент — мне быстро помогли найти нужную книгу.",
          },
          {
            name: "Javohir",
            role: "Клиент",
            text: "Отличный кофе и сервис. Зал для чтения тихий и уютный.",
          },
          {
            name: "Nigora",
            role: "Клиент",
            text: "Понравилось, что есть оригинальные издания. Отличный выбор для подарков.",
          },
        ],
      },
      orderModal: {
        heading: "Оформить заказ",
        productLabel: "Товар",
        name: "Имя",
        phone: "Телефон",
        address: "Адрес",
        telegramUsername: "Telegram username (статус заказа)",
        telegramHint:
          "Введите username как в настройках Telegram. Сначала один раз отправьте /start боту — после этого будут приходить статусы.",
        sendLocation: "Отправить локацию",
        locating: "Получаем локацию...",
        optional: "необязательно",
        trackTelegram: "Отслеживать через Telegram",
        submit: "Отправить заказ",
        submitting: "Отправляем...",
        success: "Заказ отправлен. Мы скоро свяжемся с вами.",
        errorGeneric: "Произошла ошибка. Попробуйте снова.",
        browserNoLocation: "Браузер не поддерживает геолокацию.",
        locationDenied: "Доступ к геолокации запрещён.",
        locationError: "Не удалось получить локацию. Попробуйте снова.",
      },
      footer: {
        city: "Ташкент, Узбекистан",
        contact: "Контакты",
        openUntil: "Открыто · Закрывается в 23:00",
        priceRangeTitle: "Диапазон цен",
        perPerson: "(на человека)",
        basedOn: "По данным 12 пользователей",
        rights: "Все права защищены.",
        save: "Сохранить",
        share: "Поделиться",
        nearby: "Поблизости",
        sendToPhone: "Отправить на телефон",
      },
    },
  },
} as const;

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    interpolation: { escapeValue: false },
  });
}

export default i18n;

