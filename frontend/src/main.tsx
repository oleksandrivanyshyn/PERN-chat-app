import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.tsx';
import { AuthContextProvider } from './contexts/AuthContext.tsx';
import SocketContextProvider from './contexts/SocketContext.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
);
