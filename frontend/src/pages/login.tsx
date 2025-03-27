import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginRequest } from '../services/httpService';
import { useAuth } from '../context/auth.context';
import { useNavigate } from 'react-router';

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: Yup.object({
            userName: Yup.string().required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        }),
        onSubmit: (values) => {
            loginRequest(values.userName, values.password).then((token: string) => {
                login(token);
                navigate('/dashboard');
            }
        );


        },
    });

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-xl">
                <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
                        <input
                            type="userName"
                            id="userName"
                            name="userName"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                        />
                        {formik.touched.userName && formik.errors.userName ? (
                            <p className="text-red-500 text-sm">{formik.errors.userName}</p>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <p className="text-red-500 text-sm">{formik.errors.password}</p>
                        ) : null}
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
