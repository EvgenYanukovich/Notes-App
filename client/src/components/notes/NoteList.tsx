import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../../context/NotesContext';

interface Note {
    id: string;
    title: string;
    message: string;
}

interface NoteListProps {
    notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
    const navigate = useNavigate();
    const { deleteNote } = useNotes();

    const handleNoteClick = (id: string) => {
        navigate(`/task/${id}`);
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        deleteNote(id);
    };

    const getRandomColor = () => {
        const colors = ['var(--card-pink)', 'var(--card-green)', 'var(--card-yellow)', 'var(--card-blue)', 'var(--card-purple)'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="note-list">
            {notes.map((note) => (
                <div
                    key={note.id}
                    className="note-card"
                    style={{ backgroundColor: getRandomColor() }}
                    onClick={() => handleNoteClick(note.id)}
                >
                    <h3>{note.title || 'Без названия'}</h3>
                    <p>{note.message}</p>
                    <button
                        className="delete-button"
                        onClick={(e) => handleDelete(e, note.id)}
                    >
                        <img src="/delete.svg" alt="Delete" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NoteList;
