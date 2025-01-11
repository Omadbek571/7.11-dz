import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();

        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        axios.post("https://auth-rg69.onrender.com/api/auth/signin", user, {
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((res) => {
                if (res.data.accessToken) {
                    console.log(res.data.accessToken);
                    
                    localStorage.setItem("token", res.data.accessToken)
                    navigate("/")
                }

            })
            .catch((err) => {
                if (err.message === "Request failed with status code 404") {
                    alert("Notogri login kiritingiz")
                    navigate("/register")
                }
                console.log(err.message);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input
                            ref={usernameRef}
                            type="text"
                            placeholder="Enter Name..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Enter Password..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <button
                        onClick={() => navigate('/register')}
                        className="text-blue-500 hover:underline focus:outline-none"
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
