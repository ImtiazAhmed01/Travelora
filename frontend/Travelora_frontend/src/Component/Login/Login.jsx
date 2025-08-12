import 'react-toastify/dist/ReactToastify.css';

import { useContext, useState } from "react";
import { AuthContext } from "../Provider/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Login = () => {
    const { signInUser, signInWithGoogle, handleForgotPassword } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/");
            toast.success('Login successful!', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            console.error("Google login failed:", error.message);
            toast.error('Google login failed. Please try again.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email || !password) {
            toast.error('Please enter both email and password.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        try {
            const userCredential = await signInUser(email, password);
            const user = userCredential.user;

            if (user) {
                navigate('/');
                toast.success('Login successful!', {
                    position: "top-center",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error("Login failed:", error.message);
            toast.error('Invalid email or password. Please try again.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const handleForgotPasswordSubmit = async () => {
        if (!email) {
            toast.error('Please enter your email address to reset your password.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        try {
            await handleForgotPassword(email);
            toast.success('Password reset email sent successfully! Check your inbox.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } catch (error) {
            console.error("Password reset failed:", error.message);
            toast.error('Failed to send password reset email. Please try again.', {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <h1 className="text-5xl font-bold">Login now & learn the world!</h1>

                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            name="email"
                            className="input input-bordered"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="password"
                                name="password"
                                className="input input-bordered w-full pr-10"
                                required
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d={showPassword
                                        ? "M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z M2 12s2.75-5.5 10-5.5S22 12 22 12s-2.75 5.5-10 5.5S2 12 2 12z"
                                        : "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"}
                                />
                            </svg>
                        </div>
                        <label className="label">
                            <button
                                type="button"
                                className="label-text-alt link link-hover"
                                onClick={handleForgotPasswordSubmit}
                            >
                                Forgot password?
                            </button>
                        </label>
                    </div>

                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn"
                            style={{
                                backgroundColor: "#BC6C25",
                                color: "#3F0113",
                                border: "none",
                                transition: "background-color 0.3s, color 0.3s",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#3F0113";
                                e.target.style.color = "#BC6C25";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#BC6C25";
                                e.target.style.color = "#3F0113";
                            }}
                        >
                            Login
                        </button>
                    </div>

                    <div className="mt-3">
                        <hr />
                        <button type="button" onClick={handleGoogleSignIn} className="btn mt-5 btn-ghost btn-outline">
                            Login with Google
                            {/* Google SVG Icon */}
                        </button>
                    </div>
                    <div className="form-control mt-6">
                        <h3 className="text-xl">
                            Don't have an account? <Link to="/register">Register now</Link>
                        </h3>
                    </div>
                </form>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="bounce"
            />
        </div>
    );
};

export default Login;
