import React, { FormEvent, useState } from 'react';
import { inviteUser } from '../services/httpService';
import { AxiosError } from 'axios';

type UserFormValue = {
    username: string,
    password: string
}
type UserFormProps = {
    onSubmit(user: UserFormValue): void
}

const UserInvitationForm: React.FC<UserFormProps> = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
   

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        inviteUser({ username }).then(user => {
            setUsername('');
            onSubmit(user)
        }).catch(err => {
            const message = (err as AxiosError<{name: string, message: string}>).response?.data?.message || ''; 
            window.alert(message);
        });

    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4  rounded-lg  bg-white">
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">email</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200">
                invite User
            </button>
        </form>
    );
};

export default UserInvitationForm;
