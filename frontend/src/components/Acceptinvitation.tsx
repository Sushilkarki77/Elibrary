import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"; // <-- fixed import
import { activateUser, verifyInvitationToken } from "../services/httpService";
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

import * as Yup from 'yup';

const AcceptInvitation = () => {
    const { isAuthenticated, logout } = useAuth();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [loading, setLoading] = useState(true);
    const [valid, setValid] = useState<boolean | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Confirm password is required"),
        }),
        onSubmit: (values) => {
            activateUser(token || "", values.password).then((token: string) => {
                login(token);
                navigate('/dashboard');
                toast.success('Login Successful!');
            })
        },
    });

    useEffect(() => {
        if (!token) return;

        const verifyToken = async () => {
            try {
                await verifyInvitationToken(token);
                setValid(true);
                if (isAuthenticated) {
                    logout();
                }
            } catch (err) {
                console.log(err)
                setValid(false);
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token, isAuthenticated, logout]);

    if (!token) return <Navigate to="/" />;

    if (loading) return <p>Verifying invitation...</p>;
    if (valid === false) return <Navigate to="/" />;

    return <>
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-xl">
                <h1 className="text-2xl font-bold text-center text-gray-800">Set Your Password</h1>
                <form className="space-y-6" onSubmit={formik.handleSubmit}>
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
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                        ) : null}
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
                        Set Password
                    </button>
                </form>
            </div>
        </div>
    </>;
};

export default AcceptInvitation;
