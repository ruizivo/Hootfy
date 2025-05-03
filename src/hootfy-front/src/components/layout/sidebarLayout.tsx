import { useState } from 'preact/hooks';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/header';
import Dashboard from '../../pages/dashboard';
import SitesPage from '../../pages/sitesPage';
import MonitoringPage from '../../pages/monitoringPage';
import ReportsPage from '../../pages/reportsPage';
import AlertsPage from '../../pages/alertsPage';
import NotificationsPage from '../../pages/notificationsPage';
import SettingsPage from '../../pages/settingsPage';

export default function SidebarLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      
      <div className="flex-1 overflow-auto">
        <Header activeMenu={activeMenu} />
        
        <main className="p-6">
          {activeMenu === 'dashboard' && <Dashboard />}
          {activeMenu === 'sites' && <SitesPage />}
          {activeMenu === 'monitoring' && <MonitoringPage />}
          {activeMenu === 'reports' && <ReportsPage />}
          {activeMenu === 'alerts' && <AlertsPage />}
          {activeMenu === 'notifications' && <NotificationsPage />}
          {activeMenu === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}