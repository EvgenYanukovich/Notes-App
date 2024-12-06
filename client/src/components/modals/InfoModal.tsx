import React from 'react';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content info-modal">
                <button className="close-button" onClick={onClose}>
                    <img src="/close.svg" alt="Close" />
                </button>
                <h2>О приложении</h2>
                <div className="info-content">
                    <p><strong>Название:</strong> Notes App</p>
                    <p><strong>Версия:</strong> 1.0.0</p>
                    <p><strong>Автор:</strong> Янукович Евгений</p>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
