import MenuItem from './menuItem';
import UserProfile from './userProfile';
import SidebarHeader from './sidebarHeader';
import { 
  Home, 
  Globe, 
  Bell, 
  Settings, 
  PieChart, 
  List, 
  AlertTriangle 
} from 'lucide-preact';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  activeMenu: string;
  setActiveMenu: (id: string) => void;
}

export default function Sidebar({ collapsed, toggleSidebar, activeMenu, setActiveMenu }:SidebarProps) {
  const menuItems = [
    { 
      icon: <Home size={20} />, 
      title: 'dashboard', 
      id: 'dashboard' 
    },
    { 
      icon: <Globe size={20} />, 
      title: 'sites', 
      id: 'sites' 
    },
    { 
      icon: <List size={20} />, 
      title: 'monitoring', 
      id: 'monitoring' 
    },
    { 
      icon: <PieChart size={20} />, 
      title: 'reports', 
      id: 'reports' 
    },
    { 
      icon: <AlertTriangle size={20} />, 
      title: 'alerts', 
      id: 'alerts',
      alertCount: 3 
    },
    { 
      icon: <Bell size={20} />, 
      title: 'notifications', 
      id: 'notifications' 
    },
    { 
      icon: <Settings size={20} />, 
      title: 'settings', 
      id: 'settings' 
    }
  ];

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-gray-800 text-white transition-all duration-300 flex flex-col`}>
      <SidebarHeader collapsed={collapsed} toggleSidebar={toggleSidebar} />
      
      <nav className="flex-1 pt-4">
        {menuItems.map(item => (
          <MenuItem 
            key={item.id}
            icon={item.icon} 
            title={item.title} 
            collapsed={collapsed} 
            active={activeMenu === item.id} 
            onClick={() => setActiveMenu(item.id)} 
            alertCount={item.alertCount} 
          />
        ))}
      </nav>
      
      <UserProfile collapsed={collapsed} />
    </div>
  );
}