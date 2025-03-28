import React, { useEffect, useState } from 'react';
import { Document } from '../interfaces/interfaces';
import { getDocuments } from '../services/httpService';
import DocumrntItem from './DocumentItem';


const DocumentsList: React.FC = () => {
    const [documents, setDocuments] = useState<Document[] | null>(null);

    useEffect(() => {
        getDocuments().then(x => setDocuments(x))
    }, []);


    return (
        <>{documents &&
            <div className="container mx-auto p-4">
                <div>
                <label className='mb-3'>Documents</label>
                </div>
                <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
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
            </div>

        }


        </>
    );
};

export default DocumentsList;


