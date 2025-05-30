import React from 'react';
import { Document } from '../interfaces/interfaces';
import { formatDate } from '../utils';
// import ActionDropDown from './UI/Dropdown';

type DocumentProps = {
    document: Document,
    onDeleteClick: (documentId: string) => void
    onGenerateSummary: (documentId: string) => void
    onGenerateQuiz: (documentId: string) => void
    onDisplayOriginalFile: (documentId: string) => void

}

const DocumentItem: React.FC<DocumentProps> = ({ document, onDeleteClick, onGenerateQuiz, onDisplayOriginalFile, onGenerateSummary }) => {

    return (
        <tr className="border-b border-gray-300 hover:bg-gray-50">
            <td className="px-2 py-2 text-sm text-gray-800">{document.documentLabel}</td>
            <td className="px-2 py-2 text-sm text-gray-800">{formatDate(document.createdAt)}</td>
            <td className="px-2 py-2 text-sm text-gray-800 flex gap-2">
                {/* <ActionDropDown onGenerateSummary={() => onGenerateSummary(document._id)} onDisplayOriginalFile={() => onDisplayOriginalFile(document._id)} onGenerateQuiz={() => onGenerateQuiz(document._id)} onDeleteClick={() => onDeleteClick(document._id)} /> */}

                <button onClick={() => onDisplayOriginalFile(document._id)} className="px-2 py-1 text-xs border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-200">
                    View
                </button>
                <button onClick={() => onGenerateSummary(document._id)} className="px-2 py-1 text-xs border-2 border-teal-600 text-teal-600 rounded-md hover:bg-teal-600 hover:text-white transition duration-200">
                    Summary
                </button>
                <button onClick={() => onGenerateQuiz(document._id)} className="px-2 py-1 text-xs border-2 border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition duration-200">
                    Quiz
                </button>

                <button onClick={() => onDeleteClick(document._id)} className="px-2 py-1 text-xs border-2 border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition duration-200">
                    Delete
                </button>
            </td>
        </tr>
    )
}





export default DocumentItem;