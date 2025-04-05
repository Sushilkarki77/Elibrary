import React from 'react';

interface OverlayProps {
    isOpen: boolean;
    displayCloseButton?: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ isOpen, onClose, children, displayCloseButton = true }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-40 flex justify-center items-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full min-w-max">
                <button style={{ display: displayCloseButton ? 'block' : 'none' }}
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                >
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
};

export default Overlay;
