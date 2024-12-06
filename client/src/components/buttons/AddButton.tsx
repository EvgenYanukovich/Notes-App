import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddButton: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        const newNoteId = Date.now().toString();
        navigate(`/task/${newNoteId}`);
    };

    return (
        <button className="add-button" onClick={handleClick}>
            <img src="/plus.svg" alt="Add note" />
        </button>
    );
};

export default AddButton;
