import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Logo, Input } from './index'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

function Signup() {

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const create = async(data) => {
        setLoading(true)
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    setLoading(false)
                }
                navigate("/")
            }
        } catch (error) {
            if (error.message.includes("A user with the same id, email, or phone already exists")) {
                setError("An account with this email already exists. Please try logging in or use a different email.");
            } else {
                setError(error.message || "An error occurred. Please try again.");
            }
            setLoading(false);
        }
    }

  return (
    <div className='flex items-center justify-center py-14 px-4 min-h-[60vh]'>
        {error && (
            <div className="error-notification">
                {error}
                <button onClick={() => setError(null)}>×</button>
            </div>
        )}
        <div className={`mx-auto w-full max-w-lg rounded-xl p-10 bg-dark-clr`}>
            <div className="mb-4 flex justify-center">
                <span className="inline-block">
                    <Link to={'/'}>
                        <Logo width="100%" className="hover:bg-transparent hover:ring-0 hover:ring-transparent text-white" />
                    </Link>
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <form onSubmit={handleSubmit(create)} className='mt-8'>
                <div className="space-y-5">
                    <Input placeholder="Your Name" type="text" className="mt-0" {...register("name", {
                        required: true,
                    })} required />
                    <Input label="" placeholder="Enter a valid Email" type="email" className="mt-0" {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })} required />
                    <div className='relative'>
                        <Input label="" placeholder="Enter your password" type={showPassword ? "text" : "password"} className="mt-0" {...register("password", {
                            required: true,
                        })} required />
                        <button
                            type='button'
                            onClick={() => setShowPassword(prevState => !prevState)}
                            className='absolute right-4 top-[2.1rem] cursor-pointer transform -translate-y-1/2 text-primary'
                        >
                            <div className="text-white text-lg">
                                {showPassword ? (<FaEyeSlash />) : (<FaEye />)}
                            </div>
                        </button>
                    </div>
                    <Button type='submit' className='w-full my-5'>
                    {loading ? (
                        <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    ) : null}
                        Create Account
                    </Button>
                </div>
            </form>
            <p className="mt-2 text-center text-base text-font-clr">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline text-white"
                >
                    Sign In
                </Link>
            </p>
        </div>
    </div>
  )
}

export default Signup
