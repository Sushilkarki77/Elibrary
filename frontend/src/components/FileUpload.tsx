import React, { ChangeEvent, FormEvent, useState } from 'react';
import { fileUpload } from '../services/httpService';
import { Document } from '../interfaces/interfaces';


type FileUploadProps = {
    onUploadSuccess: (document: Document) => void
    onUploadError:() => void;
}


const FileUpload: React.FC<FileUploadProps> = ({onUploadSuccess, onUploadError}) => {
    const [file, setFile] = useState<File | null>();
    const [formError, setError] = useState<string>();
    const [isUploading, setIsUploading] = useState(false);
    const [, setUploadSuccess] = useState(false);
    const [, setUploadError] = useState<string | null>(null);


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target?.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
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
    
            const uploadedData: Document = await fileUpload(formData);
            onUploadSuccess(uploadedData);
            setIsUploading(false);
            setUploadSuccess(true);
            setUploadError(null);
            window.alert("Upload successful!");

        } catch (error) {
            if(error instanceof Error) {
                setUploadError(error.message);
                onUploadError()
                window.alert(error.message)
            }
        }
       
    }

    if(isUploading){
        return (<><div>Uploading...</div></>)
    }

    return (
        <>
            <form className='flex flex-col gap-2  cursor-pointer' onSubmit={handleSubmit}>
                <label htmlFor="file">Upload PDF Document</label>
                <input className='cursor-pointer' name='file' onChange={handleFileChange} type="file" />
                {formError && <label className='text-red-500'>{formError}</label>}

                <button className='btn-sm btn-primary w-max'>Submit</button>
                {}
            </form>
        </>
    );
}

export default FileUpload;