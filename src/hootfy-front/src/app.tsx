import { ErrorBoundary, LocationProvider } from 'preact-iso';
import { useAuth } from './components/auth/authProvider';
import SidebarLayout from './components/layout/sidebarLayout';
import Login from './pages/login';

export default function App() {
  const { isAuthenticated } = useAuth();


  return (
    <LocationProvider>
      <ErrorBoundary onError={(e) => console.log(e)}>

        {isAuthenticated ? <SidebarLayout /> : <Login />}

      </ErrorBoundary>
    </LocationProvider>
  )
}
