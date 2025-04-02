import React from 'react';
import { Document } from '../interfaces/interfaces';
import { formatDate } from '../utils';

type DocumentProps = {
    document: Document,
    onDeleteClick: (documentId: string) => void
    onGenerateSummary: (documentId: string) => void
    onGenerateQuiz: (documentId: string) => void

}

const DocumentItem: React.FC<DocumentProps> = ({ document, onDeleteClick, onGenerateSummary, onGenerateQuiz }) => {


    return (
        <tr className="border-b border-gray-300 hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-800">{document.documentLabel}</td>
            <td className="px-6 py-4 text-sm text-gray-800">{formatDate(document.createdAt)}</td>
            <td className="px-6 py-4 text-sm text-gray-800 flex gap-2">
                <button  className="px-2 py-1 text-xs border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-200">
                    View
                </button>
                <button onClick={() => onGenerateSummary(document._id)} className="px-2 py-1 text-xs border-2 border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-500 hover:text-white transition duration-200">
                    Generate Summary
                </button>
                <button onClick={() => onGenerateQuiz(document._id)} className="px-2 py-1 text-xs border-2 border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition duration-200">
                    Generate Quiz
                </button>

                <button onClick={() => onDeleteClick(document._id)} className="px-2 py-1 text-xs border-2 border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition duration-200">
                    Delete
                </button>

            </td>
        </tr>
    )
}





export default DocumentItem;