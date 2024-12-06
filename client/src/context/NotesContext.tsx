import React, { createContext, useContext, useState, useEffect } from 'react';

interface Note {
    id: string;
    title: string;
    message: string;
}

interface NotesContextType {
    notes: Note[];
    addNote: (note: Note) => void;
    updateNote: (note: Note) => void;
    deleteNote: (id: string) => void;
    loading: boolean;
    error: string | null;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Загрузка заметок при монтировании
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/notes');
                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }
                const data = await response.json();
                setNotes(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch notes');
                console.error('Error fetching notes:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    // Сохранение заметок при изменениях
    useEffect(() => {
        if (loading) return; // Пропускаем первоначальную загрузку

        const saveNotes = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/save-notes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(notes),
                });

                if (!response.ok) {
                    throw new Error('Failed to save notes');
                }
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to save notes');
                console.error('Error saving notes:', err);
            }
        };

        saveNotes();
    }, [notes, loading]);

    const addNote = (note: Note) => {
        setNotes(prev => [...prev, note]);
    };

    const updateNote = (updatedNote: Note) => {
        setNotes(prev => prev.map(note => 
            note.id === updatedNote.id ? updatedNote : note
        ));
    };

    const deleteNote = (id: string) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    };

    const value = {
        notes,
        addNote,
        updateNote,
        deleteNote,
        loading,
        error
    };

    return (
        <NotesContext.Provider value={value}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (context === undefined) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    return context;
};
