import React, { useEffect, useState } from 'react';
import { Document } from '../interfaces/interfaces';
import { getDocuments } from '../services/httpService';
import DocumrntItem from './DocumentItem';
import Overlay from './UI/Overlay';


const DocumentsList: React.FC = () => {
    const [documents, setDocuments] = useState<Document[] | null>(null);
    const [overLayVisibility, setOverlayVisibility] = useState(false);

    useEffect(() => {
        getDocuments().then(x => setDocuments(x))
    }, []);


    return (
        <>{documents &&
            <div className="container mx-auto p-4">
                <div className='flex justify-between items-center p-2'>
                    <label className='mb-3'>Documents</label>
                    <button className='px-2 py-1 text-xs border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-200' onClick={() => setOverlayVisibility(true)}>Add +</button>
                </div>
                <table className="min-w-full table-auto border-collapse border shadow-sm border-gray-100 bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map(x => <DocumrntItem key={x.createdAt} document={x} />)}
                    </tbody>
                </table>
                <Overlay isOpen={overLayVisibility} onClose={() => setOverlayVisibility(x => !x)} >
                    <div>This is overlay body!</div>
                </Overlay>
            </div>

        }


        </>
    );
};

export default DocumentsList;


