import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';




interface ActionTypeDropDown {
    onDeleteClick: () => void;
    onGenerateSummary: () => void;
    onGenerateQuiz: () => void;
    onDisplayOriginalFile: () => void;
}

const ActionDropDown: React.FC<ActionTypeDropDown> = ({ onDeleteClick, onGenerateSummary, onGenerateQuiz, onDisplayOriginalFile }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Actions
                <ChevronDown className="ml-2 h-5 w-5" />
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg border-1 border-gray-300 ring-opacity-5"
                >
                    <div className="py-1">

                        <a onClick={() => onDisplayOriginalFile()}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            View
                        </a>
                        <a onClick={() => onGenerateSummary()}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Summary
                        </a>
                        <a onClick={() => onGenerateQuiz()}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Quiz
                        </a>
                        <a onClick={() => onDeleteClick()}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Delete
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ActionDropDown;