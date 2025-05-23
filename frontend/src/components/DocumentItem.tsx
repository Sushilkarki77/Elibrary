import React from 'react';
import { Document } from '../interfaces/interfaces';
import { formatDate } from '../utils';
import ActionDropDown from './UI/Dropdown';

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
                <ActionDropDown onGenerateSummary={() => onGenerateSummary(document._id)} onDisplayOriginalFile={() => onDisplayOriginalFile(document._id)} onGenerateQuiz={() => onGenerateQuiz(document._id)} onDeleteClick={() => onDeleteClick(document._id)} />
            </td>
        </tr>
    )
}





export default DocumentItem;