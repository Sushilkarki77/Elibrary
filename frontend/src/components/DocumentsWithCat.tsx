
import React, { useEffect, useState } from 'react';
import AppAccordian from './UI/AppAccordian';
import { Document } from '../interfaces/interfaces';


type DocumentWithCatProps = {
    documents: Document[]
}

const DocumentWithCat: React.FC<DocumentWithCatProps> = ({ documents }) => {

    const [categorizedDocument, setCategorizedDocument] = useState<{ [subject: string]: Document[] }>({});

    const procesDocuments = (documents: Document[]): { [subject: string]: Document[] } => {

        const categorizedDocuments: { [subject: string]: Document[] } = {}

        documents.reduce((acc, curr) => {
            if (curr.subjectId?.subjectName) {
                acc[curr.subjectId.subjectName] = [...acc[curr.subjectId.subjectName] || [], curr]
            } else {
                acc["others"] = [...acc['others'] || [], curr]
            }
            return acc;
        }, categorizedDocuments)
        console.log(categorizedDocuments)

        return categorizedDocuments;
    }

    useEffect(() => {
        setCategorizedDocument(procesDocuments(documents));
    }, [documents])


    return (
        <div className="w-full mx-auto mt-10">

            {categorizedDocument && Object.keys(categorizedDocument).map(key => {
               return <AppAccordian key={key} title={key}>
                <p>Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.</p>
            </AppAccordian>
            })}
        </div>
    );
}
export default DocumentWithCat;
