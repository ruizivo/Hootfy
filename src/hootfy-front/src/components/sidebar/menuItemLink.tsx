import { ComponentChildren } from 'preact';
import { useLocation } from 'preact-iso';
import { useTranslation } from 'react-i18next';

interface MenuItemLinkProps {
  icon: ComponentChildren;
  collapsed:boolean;
  title: string;
  link:string
}

export default function MenuItem({
  icon,
  collapsed,
  title,
  link
}: MenuItemLinkProps) {

  const { t } = useTranslation();
  const { url } = useLocation();

  return (
    <a href={link} 
    className={`w-full flex items-center px-4 py-3 hover:bg-gray-700 transition-colors ${url === '/'+title ? 'bg-blue-600 ' : ''}`}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      {!collapsed && (
        <span className="ml-3 text-sm">{t('sidebar.'+title.toLocaleLowerCase())}</span>
      )}
    </a>
  );
}