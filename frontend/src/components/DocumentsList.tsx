import React, { useEffect, useState } from 'react';
import { Document } from '../interfaces/interfaces';
import { deleteDocuments, getDocumentQuiz, getDocuments, getDocumentSummary } from '../services/httpService';
import DocumrntItem from './DocumentItem';
import Overlay from './UI/Overlay';
import FileUpload from './FileUpload';



const DocumentsList: React.FC = () => {
    const [documents, setDocuments] = useState<Document[] | null>(null);
    const [overLayVisibility, setOverlayVisibility] = useState(false);
    const [loading, setLoading] = useState(false);
    const [proessingPoc, setProcessingDoc] = useState(false);

    const fileUploadSuccess = (document: Document) => {
        setDocuments((x) => [...x || [], document]);
        setOverlayVisibility(false);
    }

    useEffect(() => {
        setLoading(true);
        getDocuments().then(x => {
            setDocuments(x);
            setLoading(false);
        })
    }, []);

    const handleDeleteClick = (documentId: string) => {
        const userResponse = window.confirm("Are you sure you want to delete?");
        if (!userResponse) {
            return;
        }

        deleteDocuments(documentId).then(x => {
            if (documents) {
                setDocuments(prev => prev?.filter(doc => doc._id !== documentId) || []);
                window.alert(x.message)
            }
        }).catch(x =>
            window.alert(x)
        );
    }

    const generateSummary = (documentId: string) => {
        setProcessingDoc(true);
        getDocumentSummary(documentId).then(x => {
            setProcessingDoc(false);
            console.log(x)
        });
    }

    const generateQuiz = (documentId: string) => {
        setProcessingDoc(true);

        getDocumentQuiz(documentId).then(x => {
            setProcessingDoc(false)
            console.log(x);
        });
    }

    if (loading) {
        return (<>
            <div className='text-center'>Loading...</div>
        </>)
    }


    return (
        <>{documents &&
            <div className="container mx-auto p-4">
                <div className='flex justify-between items-center p-2'>
                    <label className='mb-3'>Documents</label>
                    <button className='px-2 py-1 text-xs border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-200' onClick={() => setOverlayVisibility(true)}>Add +</button>
                </div>

                {documents.length === 0 ? <div className='text-center'>No Documents!</div> : <table className="min-w-full table-auto border-collapse border shadow-sm border-gray-100 bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map(x => <DocumrntItem key={x.createdAt} document={x} onDeleteClick={handleDeleteClick} onGenerateSummary={generateSummary} onGenerateQuiz={generateQuiz} />)}
                    </tbody>
                </table>
                }
                <Overlay isOpen={overLayVisibility} onClose={() => setOverlayVisibility(x => !x)} >
                    <FileUpload onUploadSuccess={fileUploadSuccess} />
                </Overlay>
                <Overlay isOpen={proessingPoc} onClose={() => {}} displayCloseButton={false} >
                    <div>Processing...</div>
                </Overlay>
            </div>

        }


        </>
    );
};

export default DocumentsList;


