import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    function handleRegister(e) {
        e.preventDefault();

        const user = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axios
            .post("https://auth-rg69.onrender.com/api/auth/signup", user, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                if (res.data.message === "User registered successfully!") {
                    navigate("/login");
                }
            })
            .catch((err) => {
                if (err.message === "Request failed with status code 400") {
                    alert("Ro'yxatdan o'tilgan");
                }
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-700">REGISTER</h1>

                <input
                    ref={usernameRef}
                    type="text"
                    placeholder="Enter username..."
                    className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Enter Email..."
                    className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Enter Password..."
                    className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleRegister}
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                    Register
                </button>

                <p className="text-center text-gray-500 mt-4">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-blue-500 hover:underline focus:outline-none"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Register;
