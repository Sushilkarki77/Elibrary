import React, { useEffect, useState } from 'react';
import { Document } from '../interfaces/interfaces';
import { deleteDocuments, getDocumentQuiz, getDocuments, getDocumentSummary, getOriginalDocument } from '../services/httpService';
import DocumrntItem from './DocumentItem';
import Overlay from './UI/Overlay';
import FileUpload from './FileUpload';
import { useNavigate } from 'react-router';
import SummaryRenderer from './SummaryRenderer';
import toast from 'react-hot-toast';
import AppAccordian from './UI/AppAccordian';

const DocumentsListWrapper: React.FC = () => {
    const [documents, setDocuments] = useState<Document[] | null>(null);
    const [overLayVisibility, setOverlayVisibility] = useState(false);
    const [loading, setLoading] = useState(false);
    const [proessingPoc, setProcessingDoc] = useState(false);
    const [summary, setSummary] = useState<string | null>();
    const [downloadURL, setdownloadURL] = useState<string | null>();
    const [activeAccordain, setActiveAccordion] = useState<number | null>(0)


    const procesDocuments = (): { [subject: string]: Document[] } => {

        const categorizedDocuments: { [subject: string]: Document[] } = {}

        documents?.reduce((acc, curr) => {
            if (curr.subjectId?.subjectName) {
                acc[curr.subjectId.subjectName] = [...acc[curr.subjectId.subjectName] || [], curr]
            } else {
                acc["others"] = [...acc['others'] || [], curr]
            }
            return acc;
        }, categorizedDocuments)

        return categorizedDocuments;
    }

    const handleAccordionToggle = (index: number) => {
        if (index == activeAccordain) { setActiveAccordion(null); return; }
        setActiveAccordion(index)
    }

    const navigate = useNavigate()

    const fileUploadSuccess = (document: Document) => {
        setDocuments((x) => [...x || [], document]);
        setOverlayVisibility(false);
    }

    useEffect(() => {
        setLoading(true);
        getDocuments().then(x => {
            setDocuments(x);
            setLoading(false);
            // setCategorizedDocument(procesDocuments());
        })
    }, []);


    const displayOriginalFile = (documentId: string) => {
        getOriginalDocument(documentId).then(res => {

            setdownloadURL(res.downloadURL)
        })
    }

    const handleDeleteClick = (documentId: string) => {
        const userResponse = window.confirm("Are you sure you want to delete?");
        if (!userResponse) {
            return;
        }

        deleteDocuments(documentId).then(x => {
            if (documents) {
                setDocuments(prev => prev?.filter(doc => doc._id !== documentId) || []);
                toast.success(x.message);
            }
        }).catch(x =>

            toast.error(x)
        );
    }

    const generateSummary = (documentId: string) => {
        setProcessingDoc(true);
        getDocumentSummary(documentId).then((res) => {
            setSummary(res.summary);
            setProcessingDoc(false);
        }).catch((err) => {
            toast.error(err.message)
            setProcessingDoc(false);
        });
    }

    const generateQuiz = (documentId: string) => {
        setProcessingDoc(true);

        getDocumentQuiz(documentId).then(res => {
            setProcessingDoc(false);
            navigate('/quiz', { state: res })
        }).catch((err) => {
            toast.error(err.message)
            setProcessingDoc(false);
        });;
    }

    if (loading) {
        return (<>
            <div className='text-center'>Loading...</div>
        </>)
    }


    return (
        <>{documents &&
            <div className="container  mx-auto p-4 max-h-full block">
                <div className='flex justify-between items-center pb-2'>
                    <label className='mb-3'>Documents</label>
                    <button className='px-2 py-1 text-xs border-2 border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-200' onClick={() => setOverlayVisibility(true)}>Add +</button>
                </div>

                <div className="w-full mx-auto ">

                    {
                        procesDocuments() && Object.keys(procesDocuments()).map((key, index) => {
                            return <AppAccordian key={key} title={key} toggleAccordion={() => handleAccordionToggle(index)} accordianState={index == activeAccordain ? true : false}>
                                <table className='w-full'>
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Title</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {procesDocuments()[key].map(x => <DocumrntItem key={x.createdAt} document={x} onDisplayOriginalFile={displayOriginalFile} onDeleteClick={handleDeleteClick} onGenerateSummary={generateSummary} onGenerateQuiz={generateQuiz} />)}
                                    </tbody>
                                </table>

                            </AppAccordian>
                        })}
                </div>

                <Overlay isOpen={overLayVisibility} onClose={() => setOverlayVisibility(x => !x)} >
                    <FileUpload onUploadSuccess={fileUploadSuccess} onUploadError={() => setOverlayVisibility(false)} />
                </Overlay>

                <Overlay isOpen={summary ? true : false} onClose={() => setSummary(null)}>
                    <div className="mt-8 text-lg text-gray-700 whitespace-pre-wrap break-words max-w-lg max-h-[500px] overflow-auto">{summary && <SummaryRenderer summary={summary} />}</div>
                </Overlay>

                <Overlay isOpen={downloadURL && downloadURL ? true : false} onClose={() => setdownloadURL(null)}>
                    <div className="mt-6 text-lg text-gray-700 whitespace-pre-wrap break-words min-w-[100vw] min-h-[95vh] -mx-[23px] overflow-auto">
                        {downloadURL && <iframe src={downloadURL} width="100%" height={window.innerHeight * 0.96 + `px`} />}
                    </div>
                </Overlay>

                <Overlay isOpen={proessingPoc} onClose={() => { }} displayCloseButton={false} >
                    <div>Processing...</div>
                </Overlay>
            </div>

        }


        </>
    );
};

export default DocumentsListWrapper;


