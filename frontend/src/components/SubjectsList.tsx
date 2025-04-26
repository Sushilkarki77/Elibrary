import React, { useEffect, useState } from 'react';
import Overlay from './UI/Overlay';
import { Subject } from '../interfaces/interfaces';
import { deleteSubjects, getSubjects } from '../services/httpService';
import SubjectForm from './SubjectForm';

const SubjectList: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [overLayVisibility, setOverlayVisibility] = useState(false);


    useEffect(() => {
        setLoading(true)
        getSubjects().then(x => {
            setSubjects(x);
            setLoading(false)
        });
    }, []);

    const handleDeleteClick = (_id: string) => {

        const userResponse = window.confirm("Are you sure you want to delete?");
        if (!userResponse) {
            return;
        }
        deleteSubjects(_id).then(() => setSubjects(subjects.filter(user => user._id !== _id)));
    };


    const handleUserFormSubmit = (subject: Subject) => {
        console.log(subject)
        setSubjects([...subjects, subject ])
        setOverlayVisibility(false);
    }


    if (loading) {
        return (<>
            <div className='text-center'>Loading...</div>
        </>)
    }

    return (
        <div className="container mx-auto p-4">
            <div className='flex justify-between items-center p-2'>
                <label className='mb-3'>Subjects</label>
                <button onClick={() => setOverlayVisibility(true)} className='px-2 py-1 text-xs border-2 border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition duration-200'>Add +</button>
            </div>

            {subjects?.length === 0 ? <div className='text-center'>No Subjects!</div> :
                <table className="min-w-full table-auto border-collapse border shadow-sm border-gray-100 bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(subject => (
                            <tr key={subject.subjectName} className="border-t border-gray-100">
                              <td className="px-6 py-3 text-sm text-gray-800">{subject.subjectName}</td>
                                <td className="px-6 py-3 text-sm">
                                    <button
                                        className='text-red-500 hover:underline'
                                        onClick={() => handleDeleteClick(subject._id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

            <Overlay isOpen={overLayVisibility} onClose={() => setOverlayVisibility(x => !x)} >
            <SubjectForm onSubmit={handleUserFormSubmit} />
            </Overlay>
        </div>
    );
};

export default SubjectList;
