import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { NotesProvider } from './context/NotesContext';
import './reset.scss';
import './styles.scss';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <NotesProvider>
        <App />
      </NotesProvider>
    </BrowserRouter>
)
