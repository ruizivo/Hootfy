import { useEffect } from 'preact/hooks';
import { ComponentChildren } from 'preact';
import { useAuth } from './auth/authProvider';
import { useLocation } from 'preact-iso';



export function PrivateRoute({ children }: { children: ComponentChildren }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
        location.route('/login', true);
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
}