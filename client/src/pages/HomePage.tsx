import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteList from '../components/notes/NoteList';
import AddButton from '../components/buttons/AddButton';
import InfoModal from '../components/modals/InfoModal';
import { useNotes } from '../context/NotesContext';

const HomePage: React.FC = () => {
    const { notes } = useNotes();
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="app-container">
            <header className="header">
                <h1>Notes</h1>
                <div className="header-buttons">
                    <button 
                        className="icon-button"
                        onClick={() => navigate('/search')}
                    >
                        <img src="/search.svg" alt="Search" />
                    </button>
                    <button 
                        className="icon-button"
                        onClick={() => setIsInfoModalOpen(true)}
                    >
                        <img src="/info.svg" alt="Info" />
                    </button>
                    <AddButton />
                </div>
            </header>
            
            {notes.length === 0 ? (
                <div className="empty-state">
                    <img src="/emptyStartPage.png" alt="Create your first note!" />
                    <p>Create your first note!</p>
                </div>
            ) : (
                <NoteList notes={notes} />
            )}
            
            <InfoModal 
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
            />
        </div>
    );
};

export default HomePage;
