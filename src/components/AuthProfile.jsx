import React, { useState, useEffect } from 'react';
import authService from '../appwrite/auth';
import { Input, Button } from '../components';
import appwriteService from '../appwrite/configure';
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

function MyProfile({ user, setUser }) {
    const [newName, setNewName] = useState(user.name);
    const [newEmail, setNewEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [submitLoader, setSubmitLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false)

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitLoader(true);
        setErrorMessage('');
        setSuccessMessage('');

        const updates = {};

        if (newEmail !== user.email && !password) {
            setErrorMessage('Please provide your password to update email');
            setSubmitLoader(false);
            return;
        }
        if (password && password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long');
            setSubmitLoader(false);
            return;
        }

        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (newEmail && !emailRegex.test(newEmail)) {
            setErrorMessage('Email address must be a valid address');
            setSubmitLoader(false);
            return;
        }

        if (newName !== user.name) {
            updates.name = newName;
        }

        if (newEmail !== user.email) {
            updates.email = newEmail;
        }

        try {
            if (updates.name) {
                await authService.updateUserName(newName);
                await appwriteService.updatePostsByUserId(user.$id, newName);
            }
            if (updates.email) {
                await authService.updateUserEmail(newEmail, password);
                setPassword('');
            }

            const updatedUser = await authService.getCurrentUser();
            setUser(updatedUser);
            setSuccessMessage('Profile updated successfully');
            setSubmitLoader(false);
        } catch (error) {
            console.log('Error occurred while updating', error);
            setErrorMessage(error.message || 'Failed to update profile');
            setSubmitLoader(false);
        }
    };

    function generateAvatarUrl(name) {
        if (!name) return 'https://cloud.appwrite.io/v1/avatars/initials?name=Anonymous&width=80&height=80';
        const formattedName = name.trim().replace(/\s+/g, ' ');
        return `https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(formattedName)}&width=80&height=80`;
    }

    return (
        <div className='max-w-[28rem] mx-auto lg:p-8 px-5 py-7 bg-dark-clr rounded-xl'>
            {errorMessage && (
                <div className="error-notification">
                    {errorMessage}
                    <button onClick={() => setErrorMessage(null)}>×</button>
                </div>
            )}
            {successMessage && (
                <div className="success-notification">
                    {successMessage}
                    <button onClick={() => setSuccessMessage(null)}>×</button>
                </div>
            )}
            <h2 className="text-center text-2xl font-bold leading-tight mb-5">My Profile</h2>
            <div className="w-full flex justify-center items-center">
                <img
                    src={generateAvatarUrl(newName)}
                    alt={newName}
                    className="w-15 h-15 rounded-full mr-2"
                />
            </div>
            <form onSubmit={handleUpdate}>
                <Input
                    label="Name:"
                    placeholder="User Name"
                    className="mb-4"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                />
                <Input
                    label="Email:"
                    placeholder="Email"
                    className="mb-4"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                />
                <div className='relative'>
                    <Input
                        label="Write Password to update Email:"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type='button'
                        onClick={() => setShowPassword(prevState => !prevState)}
                        className='absolute right-4 top-[3.6rem] cursor-pointer transform -translate-y-1/2 text-primary'
                    >
                        <div className="text-white text-lg">
                            {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                        </div>
                    </button>
                </div>
                <Button type="submit" className="w-full hover:bg-primary-hover bg-primary-clr mt-3">
                    {submitLoader ? (
                        <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : null}
                    Update
                </Button>
            </form>
        </div>
    );
}

export default MyProfile;
