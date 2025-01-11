import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required("Username majburiy!"),
            password: Yup.string()
                .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak!")
                .required("Parol majburiy!"),
        }),
        onSubmit: (values, { setSubmitting }) => {
            axios
                .post("https://auth-rg69.onrender.com/api/auth/signin", values, {
                    headers: {
                        "Content-type": "application/json",
                    },
                })
                .then((res) => {
                    if (res.data.accessToken) {
                        console.log(res.data.accessToken);
                        localStorage.setItem("token", res.data.accessToken);
                        navigate("/");
                    }
                })
                .catch((err) => {
                    if (err.response && err.response.status === 404) {
                        alert("Notog'ri login yoki parol!");
                        navigate("/register");
                    } else {
                        alert("Xatolik yuz berdi. Qayta urinib ko'ring.");
                    }
                    console.log(err.message);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter Name..."
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.username && formik.errors.username
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="text-sm text-red-500">{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div className="mb-6">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter Password..."
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${formik.touched.password && formik.errors.password
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
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
                        disabled={formik.isSubmitting}
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {formik.isSubmitting ? "Loading..." : "Login"}
                    </button>
                </form>
                <p className="text-center text-gray-500 mt-4">
                    Don't have an account?{" "}
                    <button
                        onClick={() => navigate("/register")}
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
