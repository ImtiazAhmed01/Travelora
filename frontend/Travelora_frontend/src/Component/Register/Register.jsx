import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Provider/authProvider";
import { Bounce, toast, ToastContainer } from "react-toastify";

const Register = () => {
    const { signInWithGoogle, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [passwordError, setPasswordError] = useState("");
    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        imageURL: ""
    });

    const handleGoogleSignIn = async () => {
        try {
            const auth = getAuth();
            const result = await signInWithGoogle();
            const user = auth.currentUser;

            if (user) {
                const userData = {
                    firstName: user.displayName.split(" ")[0] || "Google User",
                    lastName: user.displayName.split(" ")[1] || "",
                    email: user.email,
                    photoURL: user.photoURL,
                    registrationDate: new Date().toISOString(),
                };

                const serverResponse = await fetch("http://localhost:5000/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });

                if (!serverResponse.ok) {
                    throw new Error("Failed to save Google user data to the server.");
                }

                toast.success("Google sign-in successful, and user data saved!", {
                    position: "top-center",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce,
                });

                navigate("/");
            }
        } catch (error) {
            console.error("Google login failed:", error.message);
            toast.error("Google sign-in failed. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const validatePassword = (password) => {
        if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
        if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
        if (password.length < 6) return "Password must be at least 6 characters long.";
        return "";
    };

    const validateForm = ({ fname, lname, email, password }) => {
        const errors = {};
        if (!fname.trim()) errors.fname = "First name is required.";
        if (!lname.trim()) errors.lname = "Last name is required.";
        if (!email.trim()) errors.email = "Email is required.";
        if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid.";
        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) errors.password = passwordValidationError;
        return errors;
    };

    const sendOtpEmail = async (email) => {
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otpCode);

        const emailData = {
            to: email,
            subject: "Your OTP for Registration",
            message: `Your OTP for registration is: ${otpCode}. It is valid for 10 minutes.`
        };

        try {
            const response = await fetch("http://localhost:5000/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(emailData),
            });

            if (response.ok) {
                setIsOtpSent(true);
                toast.success("OTP sent to your email!", {
                    position: "top-center",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce,
                });
            } else {
                throw new Error("Failed to send OTP.");
            }
        } catch (error) {
            console.error("Failed to send OTP:", error);
            toast.error("Failed to send OTP. Please try again.", {
                position: "top-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const newFormData = {
            fname: e.target.fname.value,
            lname: e.target.lname.value,
            email: e.target.email.value,
            password: e.target.password.value,
            imageURL: e.target.imageURL.value || "",
        };

        const errors = validateForm(newFormData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            toast.error("Please fix the errors in the form.");
            return;
        }

        setFormData(newFormData);
        await sendOtpEmail(newFormData.email);
    };

    const handleOtpVerification = async () => {
        if (otp === generatedOtp) {
            try {
                const auth = getAuth();
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;

                await updateUserProfile({
                    displayName: `${formData.fname} ${formData.lname}`,
                    photoURL: formData.imageURL,
                    role: "tourist",
                });

                const userData = {
                    uid: user.uid,
                    firstName: formData.fname,
                    lastName: formData.lname,
                    email: formData.email,
                    photoURL: formData.imageURL,
                    registrationDate: new Date().toISOString(),
                };

                const serverResponse = await fetch("http://localhost:5000/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });

                if (!serverResponse.ok) {
                    throw new Error("Failed to save user data to the server.");
                }

                toast.success("User registered successfully!");
                navigate("/");
            } catch (error) {
                console.error("Error creating user:", error.message);
                toast.error("Error creating user. Please try again.");
            }
        } else {
            toast.error("Invalid OTP. Please try again.", {
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
        <div>
            <form onSubmit={handleRegister} className="w-full max-w-lg mx-auto my-7">
                <h1 className="text-5xl font-bold mb-5 ml-2">Register here!</h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="fname"
                            placeholder="Your first name"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                        {formErrors.fname && <p className="text-red-500 text-xs italic mt-2">{formErrors.fname}</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lname"
                            placeholder="Your last name"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                        {formErrors.lname && <p className="text-red-500 text-xs italic mt-2">{formErrors.lname}</p>}
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                        required
                    />
                    {formErrors.email && <p className="text-red-500 text-xs italic mt-2">{formErrors.email}</p>}
                </div>
                <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Image URL
                    </label>
                    <input
                        type="text"
                        name="imageURL"
                        placeholder="Enter your image URL"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    />
                </div>
                <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Length must be 6, contain 1 upperclass, 1 lowerclass alphabet"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-3 text-gray-700"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {passwordError && (
                        <p className="text-red-500 text-xs italic mt-2">{formErrors.password}</p>
                    )}
                </div>

                {!isOtpSent && (
                    <div className="form-control mt-6">
                        <button
                            type="submit"
                            className="btn"
                            style={{
                                backgroundColor: "#52C960",
                                color: "#3F0113",
                                border: "none",
                                transition: "background-color 0.3s, color 0.3s",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#3F0113";
                                e.target.style.color = "#52C960";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#52C960";
                                e.target.style.color = "#3F0113";
                            }}
                        >
                            Register
                        </button>
                    </div>
                )}

                {isOtpSent && (
                    <div className="mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter the OTP sent to your email"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            required
                        />
                        <button
                            type="button"
                            onClick={handleOtpVerification}
                            className="btn mt-4"
                            style={{
                                backgroundColor: "#52C960",
                                color: "#3F0113",
                                border: "none",
                                transition: "background-color 0.3s, color 0.3s",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#3F0113";
                                e.target.style.color = "#52C960";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#52C960";
                                e.target.style.color = "#3F0113";
                            }}
                        >
                            Verify OTP
                        </button>
                    </div>
                )}

                <div className="mt-3">
                    <hr />
                    <button onClick={handleGoogleSignIn} className="btn mt-5 btn-ghost btn-outline">
                        Login with Google
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                        >
                            <path
                                fill="#FFC107"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                            ></path>
                            <path
                                fill="#FF3D00"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                            ></path>
                            <path
                                fill="#4CAF50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                            ></path>
                            <path
                                fill="#1976D2"
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="mt-6 text-xl text-[#52C960]">
                    Already have an account? <Link to="/login">Login now</Link>
                </div>
            </form>

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

export default Register;