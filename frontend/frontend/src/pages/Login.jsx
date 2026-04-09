import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";

export default function Login() {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const signupSuccess = location.state?.signupSuccess;

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmit(true);
        try {
            const response = await api.post("/login", data);
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user),
                );
                navigate("/");
            } else {
                setError(response.data.result || "Login failed");
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(
                    err.response.data.result || "Invalid email or password",
                );
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card glass-card fade-in-up">
                            <div className="card-header auth-header text-center">
                                <h2>Welcome Back</h2>
                                <p className="text-secondary small">Please enter your details</p>
                            </div>
                            <div className="card-body p-4">
                                {signupSuccess && (
                                    <div
                                        className="alert alert-success border-0 shadow-sm mb-4"
                                        role="alert"
                                        style={{ borderRadius: '12px' }}
                                    >
                                        Account created successfully! Please login.
                                    </div>
                                )}
                                {error && (
                                    <div
                                        className="alert alert-danger border-0 shadow-sm mb-4"
                                        role="alert"
                                        style={{ borderRadius: '12px' }}
                                    >
                                        {error}
                                    </div>
                                )}
                                <form onSubmit={HandleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            onChange={HandleChange}
                                            value={data.email}
                                            placeholder="name@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label">Password</label>
                                        </div>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={HandleChange}
                                            value={data.password}
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>

                                    <div className="d-grid mb-3">
                                        {isSubmit ? (
                                            <button
                                                type="button"
                                                className="btn btn-primary-custom"
                                                disabled
                                            >
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Signing in...
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="btn btn-primary-custom w-100"
                                            >
                                                Sign In
                                            </button>
                                        )}
                                    </div>
                                </form>

                                <div className="text-center mt-4">
                                    <span className="text-secondary small">Don't have an account? </span>
                                    <Link to="/signup" className="auth-link small">Create Account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
