
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  activeMenu: string;
}

export default function Header({ activeMenu }:HeaderProps) {
  const { t, i18n } = useTranslation();

  return (
    <div class="flex bg-white shadow-sm p-4 justify-between">
      <header className="">
        <h1 className="text-xl font-semibold text-gray-800">
          {t('pages.' + activeMenu)}
        </h1>
      </header>

      <select name="language-picker-select" id="language-picker-select" onChange={(e) => i18n.changeLanguage(e.currentTarget.value)}>
          <option lang="en" value="en" selected>{t('language.en')}</option>
          <option lang="pt" value="pt">{t('language.pt')}</option>
        </select>
    </div>
    
  );
}