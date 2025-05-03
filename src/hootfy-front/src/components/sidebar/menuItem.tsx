import { ComponentChildren } from 'preact';
import { useTranslation } from 'react-i18next';

interface MenuItemProps {
  icon: ComponentChildren;
  title: string;
  collapsed: boolean;
  active: boolean;
  onClick: () => void;
  alertCount?: number;
}

export default function MenuItem({
  icon,
  title,
  collapsed,
  active,
  onClick,
  alertCount,
}: MenuItemProps) {

  const { t } = useTranslation();

  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 ${
        active ? 'bg-blue-600' : 'hover:bg-gray-700'
      } transition-colors relative`}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      
      {!collapsed && (
        <span className="ml-3 text-sm">{t('sidebar.'+title.toLocaleLowerCase())}</span>
      )}
      
      {!collapsed && alertCount && (
        <div className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {alertCount}
        </div>
      )}
      
      {collapsed && alertCount && (
        <div className="absolute top-0 right-0 mt-1 mr-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {alertCount}
        </div>
      )}
    </button>
  );
}