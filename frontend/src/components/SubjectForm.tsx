import React, { FormEvent, useState } from 'react';
import { addSubject} from '../services/httpService';
import { AxiosError } from 'axios';
import { Subject } from '../interfaces/interfaces';


type SubjectFormProps = {
    onSubmit(user: Subject): void
}

const SubjectForm: React.FC<SubjectFormProps> = ({ onSubmit }) => {
    const [subjectName, setsubjectname] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addSubject({ subjectName }).then(subject => {
            setsubjectname('');
            onSubmit(subject)
        }).catch(err => {
            const message = (err as AxiosError<{name: string, message: string}>).response?.data?.message || ''; 
            window.alert(message);
        });

        
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4  rounded-lg  bg-white">
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">subjectname</label>
                <input
                    type="text"
                    value={subjectName}
                    onChange={(e) => setsubjectname(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
           
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200">
                Create Subject
            </button>
        </form>
    );
};

export default SubjectForm;
