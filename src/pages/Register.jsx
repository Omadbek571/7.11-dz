import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, "Username kamida 3 ta belgidan iborat bo'lishi kerak!")
                .required("Username majburiy!"),
            email: Yup.string()
                .email("Noto'g'ri email format!")
                .required("Email majburiy!"),
            password: Yup.string()
                .min(4, "Parol kamida 6 ta belgidan iborat bo'lishi kerak!")
                .required("Parol majburiy!"),
        }),
        onSubmit: (values, { resetForm }) => {
            axios
                .post("https://auth-rg69.onrender.com/api/auth/signup", values, {
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
                    if (err.response && err.response.status === 400) {
                        alert("Ro'yxatdan o'tilgan!");
                    } else {
                        alert("Xatolik yuz berdi, qayta urinib ko'ring.");
                    }
                });
            resetForm(); 
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-700">REGISTER</h1>

                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter username..."
                            className={`w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 ${
                                formik.touched.username && formik.errors.username
                                    ? "border-red-500 focus:ring-red-500"
                                    : "focus:ring-blue-500"
                            }`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="text-sm text-red-500">{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter Email..."
                            className={`w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 ${
                                formik.touched.email && formik.errors.email
                                    ? "border-red-500 focus:ring-red-500"
                                    : "focus:ring-blue-500"
                            }`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-sm text-red-500">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter Password..."
                            className={`w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 ${
                                formik.touched.password && formik.errors.password
                                    ? "border-red-500 focus:ring-red-500"
                                    : "focus:ring-blue-500"
                            }`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-sm text-red-500">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>

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
