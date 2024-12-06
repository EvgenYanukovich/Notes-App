import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteList from '../components/notes/NoteList';

interface Note {
    id: string;
    title: string;
    message: string;
}

const SearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const searchNotes = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/api/search?query=${encodeURIComponent(searchQuery)}`);
                if (!response.ok) {
                    throw new Error('Failed to search notes');
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Error searching notes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimeout = setTimeout(() => {
            if (searchQuery) {
                searchNotes();
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [searchQuery]);

    return (
        <div className="app-container">
            <div className="search-header">
                <div className="search-input-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Food Recipe"
                        className="search-input"
                        autoFocus
                    />
                    <button
                        className="close-button"
                        onClick={() => navigate('/')}
                    >
                        <img src="/close.svg" alt="Close" />
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="loading-state">Loading...</div>
            ) : searchResults.length > 0 ? (
                <NoteList notes={searchResults} />
            ) : (
                <div className="empty-state">
                    <img src="/notFound.png" alt="No results found" />
                    <p>Notes not found. Try searching again.</p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
