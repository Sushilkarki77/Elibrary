import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AppAccordianProps {
    title: string;
    children: React.ReactNode;
}

const AppAccordian = ({ title, children }: AppAccordianProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => setIsOpen(!isOpen);

    return (
        <div className="border border-gray-300 w-full rounded-md  overflow-hidden">
            <button
                onClick={toggleAccordion}
                className="w-full flex justify-between items-center bg-gray-100 p-4 text-left"
            >
                <span className="font-medium text-gray-800">{title}</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
            </button>
            {isOpen && (
                <div className="p-4 bg-white text-gray-700">
                    {children}
                </div>
            )}
        </div>
    );
}

export default AppAccordian;
