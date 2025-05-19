import { LogOut } from "lucide-preact";
import { useAuth } from "../auth/authProvider";
import { useLocation } from 'preact-iso';
import { useTranslation } from "react-i18next";

interface ExitProps {
  collapsed: boolean;
}

export default function Exit({ collapsed }:ExitProps) {

  const location = useLocation();
  const { logout } = useAuth();
  const { t } = useTranslation();

  
  return (
    <a 
    className={`w-full flex items-center px-4 py-3 hover:bg-gray-700 transition-colors cursor-pointer`}
    onClick={() => {
      logout();
      location.route('/login');
    }}
    >
      <div className="flex items-center justify-center">
        <LogOut size={30} />
      </div>
      {!collapsed && (
        <span className="ml-3 text-sm">{t('sidebar.exit')}</span>
      )}
    </a>
  );
}