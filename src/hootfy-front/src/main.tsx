import './index.css'
import { hydrate } from 'preact-iso';
import './i18n/i18n';
import App from './app';
import { AuthProvider } from './components/auth/authProvider';


hydrate(
    <AuthProvider>
        <App />
    </AuthProvider>
);