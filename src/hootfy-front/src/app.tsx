import SidebarLayout from './components/layout/sidebarLayout';

export default function App() {

  return (
    <SidebarLayout />
    
  )
}


//// src/App.tsx
// import { useState } from 'preact/hooks';
// // Use o hook personalizado em vez do hook padrão
// import { useTranslation } from './i18n/useTranslation';
// import ChildComponent from './components/ChildComponent';
// // import './App.css';

// export default function App() {
//   const { t, i18n } = useTranslation();
//   const [count, setCount] = useState(0);

//   // Função para alternar entre idiomas
//   const toggleLanguage = () => {
//     const currentLang = i18n.language;
//     const newLang = currentLang === 'pt' ? 'en' : 'pt';
//     i18n.changeLanguage(newLang);
//   };

//   return (
//     <div className="app">
//       <header className="app-header">
//         <h1>{t('welcome')}</h1>
//         <div className="language-switcher">
//           <button onClick={toggleLanguage}>
//             {i18n.language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
//           </button>
//           <span className="current-lang">
//             {i18n.language === 'pt' ? '🇧🇷' : '🇺🇸'}
//           </span>
//         </div>
//       </header>

//       <main>
//         <div className="counter">
//           <p>{t('counter.value', { count })}</p>
//           <button onClick={() => setCount(count + 1)}>
//             {t('counter.increment')}
//           </button>
//         </div>

//         {/* Incluindo o componente filho que também usa traduções */}
//         <div className="child-section">
//           <ChildComponent />
//         </div>
//       </main>

//       <footer>
//         <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
//       </footer>
//     </div>
//   );
// }