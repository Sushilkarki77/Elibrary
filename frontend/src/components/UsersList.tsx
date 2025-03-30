import React, { useEffect, useState } from 'react';
import { deleteUsers, getUsers } from '../services/httpService';
import { User } from '../interfaces/interfaces';
import Overlay from './UI/Overlay';
import UserForm from './UserForm';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [overLayVisibility, setOverlayVisibility] = useState(false);


    useEffect(() => {
        setLoading(true)
        getUsers().then(x => {
            setUsers(x);
            setLoading(false)
        });
    }, []);

    const handleDeleteClick = (_id: string) => {

        const userResponse = window.confirm("Are you sure you want to delete?");
        if (!userResponse) {
            return;
        }
        deleteUsers(_id).then(() => setUsers(users.filter(user => user._id !== _id)));
    };


    const handleUserFormSubmit = (user: User) => {
        setUsers([...users, { ...user, role: 'user' }])
    }


    if (loading) {
        return (<>
            <div className='text-center'>Loading...</div>
        </>)
    }

    return (
        <div className="container mx-auto p-4">
            <div className='flex justify-between items-center p-2'>
                <label className='mb-3'>Users</label>
                <button onClick={() => setOverlayVisibility(true)} className='px-2 py-1 text-xs border-2 border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition duration-200'>Add +</button>
            </div>

            {users?.length === 0 ? <div className='text-center'>No Users!</div> :
                <table className="min-w-full table-auto border-collapse border shadow-sm border-gray-100 bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">role</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.username} className="border-t border-gray-100">
                                <td className="px-6 py-3 text-sm text-gray-800">{user.username}</td>
                                <td className="px-6 py-3 text-sm text-gray-800">{typeof (user.role) === 'string' ? user.role : user.role.name}</td>
                                <td className="px-6 py-3 text-sm">
                                    <button
                                        className='text-red-500 hover:underline'
                                        onClick={() => handleDeleteClick(user._id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

            <Overlay isOpen={overLayVisibility} onClose={() => setOverlayVisibility(x => !x)} >
                <UserForm onSubmit={handleUserFormSubmit} />
            </Overlay>
        </div>
    );
};

export default UserList;
