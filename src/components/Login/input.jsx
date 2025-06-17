import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

import InputField from './InputField';
import { login, register, resetPassword } from '../../api/login_api';
import { setTemporaryMessageClear, validatePasswordStrength } from '../../utils';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [mode, setMode] = useState({ isLogin: true, isResetPassword: false });
    const [status, setStatus] = useState({ isLoading: false, error: '', successMessage: '' });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ ...status, isLoading: true, error: '', successMessage: '' });

        try {
            const { email, password, newPassword, confirmPassword, name } = formData;
            const { isLogin, isResetPassword } = mode;

            let result;
            if (isLogin) {
                result = await login(email, password);
                if (result.success) {
                    localStorage.setItem('user_token', result.data.access);
                    onLogin();
                    navigate('/home');
                } else {
                    setStatus({ ...status, error: result.message });
                    setTemporaryMessageClear(setStatus);
                }
            } else if (isResetPassword) {
                if (newPassword !== confirmPassword) throw new Error("Passwords do not match.");
                const { isValid, errors } = validatePasswordStrength(newPassword);
                if (!isValid) throw new Error(Object.values(errors).filter(Boolean).join(" "));

                result = await resetPassword(email, newPassword, confirmPassword);
                setStatus({ ...status, successMessage: result.success ? "Password updated!" : result.message });
                setTemporaryMessageClear(setStatus);
            } else {
                const { isValid, errors } = validatePasswordStrength(password);
                if (!isValid) throw new Error(Object.values(errors).filter(Boolean).join(" "));

                if (password !== confirmPassword) throw new Error("Passwords do not match.");
                result = await register(name, email, password);
                setStatus({ ...status, successMessage: result.message });
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                setMode({ isLogin: true, isResetPassword: false });
                setTemporaryMessageClear(setStatus);
            }
        } catch (error) {
            setStatus({ ...status, error: error.message || "Unexpected error. Try again." });
            setTemporaryMessageClear(setStatus);
        } finally {
            setStatus({ ...status, isLoading: false });
        }
    };

    return (
        <div className="flex h-screen bg-gray-900">
            <div className="flex-grow flex items-center justify-center">
                <form onSubmit={handleSubmit} className="p-6 rounded-lg w-96">
                    <FontAwesomeIcon icon={faTwitter} className="text-6xl text-twitter-blue mb-4" />
                    {mode.isResetPassword ? (
                        <InputField type="email" placeholder="Email address" value={formData.email} onChange={handleChange} />
                    ) : (
                        <>
                            {!mode.isLogin && (
                                <InputField type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                            )}
                            <InputField type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                            <InputField type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                            {!mode.isLogin && <InputField type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />}
                        </>
                    )}
                    {mode.isResetPassword && (
                        <>
                            <InputField type="password" name="newPassword" placeholder="New Password" value={formData.newPassword} onChange={handleChange} />
                            <InputField type="password" name="confirmPassword" placeholder="Confirm New Password" value={formData.confirmPassword} onChange={handleChange} />
                        </>
                    )}
                    <button type="submit" className="w-full bg-twitter-blue text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200">
                        {mode.isResetPassword ? 'Send' : (mode.isLogin ? 'Login' : 'Sign Up')}
                    </button>
                    {status.error && <p className="text-red-500 mt-4">{status.error}</p>}
                    {status.successMessage && <p className="text-green-500 mt-4">{status.successMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
