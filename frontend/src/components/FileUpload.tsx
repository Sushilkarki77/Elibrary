import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { fileUpload, getPreSignedURL, getSubjects } from '../services/httpService';
import { Document, Subject } from '../interfaces/interfaces';
import toast from 'react-hot-toast';


type FileUploadProps = {
    onUploadSuccess: (document: Document) => void
    onUploadError: () => void;
}


const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess, onUploadError }) => {
    const [file, setFile] = useState<File | null>();
    const [slectedSubject, setSlectedSubject] = useState<string>('');
    const [formError, setError] = useState<string>();
    const [isUploading, setIsUploading] = useState(false);
    const [, setUploadSuccess] = useState(false);
    const [, setUploadError] = useState<string | null>(null);
    const [subjects, setSubjects] = useState<Subject[]>([]);



    useEffect(() => {
        getSubjects().then(x => {
            setSubjects(x);
        })
    }, [])


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target?.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    }

    const handleSelectChange  = (e:  ChangeEvent<HTMLSelectElement>) => {
        const selectedSubject = e.target.value;
        console.log(selectedSubject, 'selectedSubject');
        if(selectedSubject) {
            setSlectedSubject(selectedSubject);
        }
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!file) {
            setError('Please upload a file');
            return;
        }

        const allowedTypes = ['application/pdf'];
        const maxSize = 20 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            setError('Invalid file type. Only PDF files are allowed.');
            return;
        }
        if (file?.size > maxSize) {
            setError('File size is too large. Maximum allowed size is 5MB.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);


        try {
            setIsUploading(true);
            setUploadSuccess(false);

            const uploadedData: Document & { uploadUrl: string } = await getPreSignedURL(file.name, slectedSubject);

            const newFile = new File([file], uploadedData.documentName, {
                type: file.type,
                lastModified: Date.now(),
            });

            const uploadedDoc = await fileUpload(uploadedData.uploadUrl, newFile);

            console.log(uploadedDoc);

            onUploadSuccess(uploadedData);
            setIsUploading(false);
            setUploadSuccess(true);
            setUploadError(null);
            toast.success('Upload Successful!');


        } catch (error) {
            if (error instanceof Error) {
                setUploadError(error.message);
                onUploadError()
                toast.error(error.message)
            }
        }

    }

    if (isUploading) {
        return (<><div>Uploading...</div></>)
    }

    return (
        <>
            <form className='flex flex-col gap-2  cursor-pointer' onSubmit={handleSubmit}>
                <label htmlFor="file">Upload PDF Document </label>
                <input className='cursor-pointer' name='file' required={true} onChange={handleFileChange} type="file" />
                {formError && <label className='text-red-500'>{formError}</label>}

                {subjects && <div className="">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Choose a Subject</label>
                    <select id="options" value={slectedSubject} onChange={handleSelectChange} className="block w-full p-2 border border-gray-300 rounded-md  focus:ring-blue-500 focus:border-blue-500">
                        <option value="" disabled>Select...</option>
                        { subjects.map(x => <option key={x._id} value={x._id}>{x.subjectName}</option>) }
                    </select>
                </div>}

                <button className='btn-sm btn-primary w-max'>Submit</button>
                { }
            </form>
        </>
    );
}

export default FileUpload;