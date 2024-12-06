import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Save changes?</h2>
                <div className="modal-buttons">
                    <button className="button secondary" onClick={onClose}>
                        Discard
                    </button>
                    <button className="button primary" onClick={onSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
