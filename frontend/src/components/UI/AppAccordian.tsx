import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AppAccordianProps {
    title: string;
    children: React.ReactNode;
    accordianState?: boolean,
    toggleAccordion: () => void
}

const AppAccordian = ({ title, children, accordianState = false,  toggleAccordion}: AppAccordianProps) => {
    const [isOpen, setIsOpen] = useState(false);

   

    useEffect(() => {
        setIsOpen(accordianState)
    }, [accordianState])

    return (
        <div className="border border-gray-300 w-full   overflow-hidden">
            <button
                onClick={toggleAccordion}
                className="w-full flex justify-between items-center bg-gray-100 p-2 text-left"
            >
                <span className="font- text-md text-gray-800">{title}</span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
            </button>
            {isOpen && (
                <div className="pt-1 bg-white max-h-[45vh] overflow-auto text-gray-700">
                    {children}
                </div>
            )}
        </div>
    );
}

export default AppAccordian;
