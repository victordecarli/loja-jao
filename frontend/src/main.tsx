import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from '@/themes/themeContext.tsx';
import App from './App/index.tsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)

