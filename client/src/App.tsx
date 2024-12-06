import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotePage from './pages/NotePage';
import SearchPage from './pages/SearchPage';
import './styles.scss';

function App() {
  return (
    <div className="phone-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task/:id" element={<NotePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;