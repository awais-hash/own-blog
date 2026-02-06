import React, { useState } from 'react'
import { Logo, Button, Input } from './index'
import { login as authLogin } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import authservice from '../appwrite/auth_service';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const onLogin = async (data) => {
        setLoading(true)
        setError("")
        try {
            const session = await authservice.login(data);
            if (session) {
                // Wait for session to be established
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const userData = await authservice.getCurrentUser();
                
                if (userData) {
                    dispatch(authLogin(userData)); // ✅ Direct payload
                    navigate('/');
                } else {
                    setError("Login successful but couldn't fetch user data");
                }
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center w-full min-h-screen'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(onLogin)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Please enter a valid email address"
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login