import React, { FormEvent, useState } from 'react';
import { registerUser } from '../services/httpService';
import { AxiosError } from 'axios';

type UserFormValue = {
    username: string,
    password: string
}
type UserFormProps = {
    onSubmit(user: UserFormValue): void
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        registerUser({ username, password }).then(user => {
            setUsername('');
            setPassword('');
            onSubmit(user)
        }).catch(err => {
            const message = (err as AxiosError<{name: string, message: string}>).response?.data?.message || ''; 
            window.alert(message);
        });

    }

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4  rounded-lg  bg-white">
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200">
                Create User
            </button>
        </form>
    );
};

export default UserForm;
