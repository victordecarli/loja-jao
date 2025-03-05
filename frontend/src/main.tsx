import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@/themes/themeContext.tsx';
import { Auth0Provider } from '@auth0/auth0-react';
import App from '@/App';

const domain = process.env.REACT_APP_AUTH0_DOMAIN!;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;
// Caso você precise enviar uma audiência para o backend, inclua:
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const root = createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience,
      }}
    >
      <App />
    </Auth0Provider>
  </ThemeProvider>
)

