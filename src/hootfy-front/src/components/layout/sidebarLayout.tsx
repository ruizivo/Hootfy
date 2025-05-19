import { lazy, Route, Router } from 'preact-iso';

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

  const NotFound = lazy(() => import('../../pages/notFound'));

  return (

    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-6">
          <Router
            onRouteChange={(url) => console.log('Route changed to', url)}
            onLoadStart={(url) => console.log('Starting to load', url)}
            onLoadEnd={(url) => console.log('Finished loading', url)}
          >
            <Route path="/" component={Dashboard} />
            <Route path="/sites" component={SitesPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/monitoring" component={MonitoringPage} />
            <Route path="/reports" component={ReportsPage} />
            <Route path="/alerts" component={AlertsPage} />
            <Route path="/notifications" component={NotificationsPage} />
            <Route path="/settings" component={SettingsPage} />
            {/* @ts-ignore */}
            <NotFound default/>
          </Router>
        </main>

      </div>
    </div>
  );
}