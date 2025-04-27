import { Document } from '../interfaces/interfaces';


export const processDocuments = (documents: Document[] | null): { [subject: string]: Document[] } => {
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