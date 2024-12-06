import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../components/modals/Modal';
import { useNotes } from '../context/NotesContext';

const NotePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { notes, addNote, updateNote } = useNotes();
    const [isEditing, setIsEditing] = useState(false);
    const [note, setNote] = useState<{ id: string; title: string; message: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            const foundNote = notes.find(note => note.id === id);
            if (foundNote) {
                setNote(foundNote);
            } else {
                setIsEditing(true);
                setNote({ id, title: '', message: '' });
            }
        }
    }, [id, notes]);

    const handleBack = () => {
        if (isEditing) {
            setIsModalOpen(true);
        } else {
            navigate('/');
        }
    };

    const handleSave = () => {
        if (note) {
            if (notes.find(n => n.id === note.id)) {
                updateNote(note);
            } else {
                addNote(note);
            }
            setIsModalOpen(false);
            navigate('/');
        }
    };

    const handleDiscard = () => {
        setIsModalOpen(false);
        navigate('/');
    };

    if (!note) return null;

    return (
        <div className="app-container">
            <div className="editor">
                <div className="editor-header">
                    <button className="icon-button" onClick={handleBack}>
                        <img src="/back.svg" alt="Back" />
                    </button>
                    <div className="editor-actions">
                        <button className="icon-button" onClick={() => setIsEditing(!isEditing)}>
                            <img src={isEditing ? "/readMode.svg" : "/editMode.svg"} alt={isEditing ? "View" : "Edit"} />
                        </button>
                        {isEditing && (
                            <button className="icon-button" onClick={() => setIsModalOpen(true)}>
                                <img src="/save.svg" alt="Save" />
                            </button>
                        )}
                    </div>
                </div>

                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={note.title}
                            onChange={(e) => setNote({ ...note, title: e.target.value })}
                            placeholder="Title"
                        />
                        <textarea
                            value={note.message}
                            onChange={(e) => setNote({ ...note, message: e.target.value })}
                            placeholder="Type something..."
                        />
                    </>
                ) : (
                    <>
                        <div className="editor-content title">
                            {note.title || 'Untitled'}
                        </div>
                        <div className="editor-content message">
                            {note.message || 'No content'}
                        </div>
                    </>
                )}
            </div>
            <Modal 
                isOpen={isModalOpen}
                onClose={handleDiscard}
                onSave={handleSave}
            />
        </div>
    );
};

export default NotePage;
