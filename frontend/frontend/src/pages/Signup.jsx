import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Signup() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setGeneralError("");
        setIsSubmit(true);
        try {
            const response = await api.post("/signup", data);
            if (response.data.success) {
                navigate("/login", { state: { signupSuccess: true } });
            }
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors || {});
            } else if (err.response && err.response.data) {
                setGeneralError(err.response.data.message || "Signup failed");
            } else {
                setGeneralError("Something went wrong. Please try again.");
            }
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 col-lg-5">
                        <div className="card glass-card fade-in-up">
                            <div className="card-header auth-header text-center">
                                <h2>Join Us Today</h2>
                                <p className="text-secondary small">Create your account to get started</p>
                            </div>
                            <div className="card-body p-4">
                                {generalError && (
                                    <div
                                        className="alert alert-danger border-0 shadow-sm mb-4"
                                        role="alert"
                                        style={{ borderRadius: '12px' }}
                                    >
                                        {generalError}
                                    </div>
                                )}
                                <form onSubmit={HandleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            name="name"
                                            onChange={HandleChange}
                                            value={data.name}
                                            placeholder="John Doe"
                                            required
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name[0]}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                            name="email"
                                            onChange={HandleChange}
                                            value={data.email}
                                            placeholder="name@example.com"
                                            required
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email[0]}
                                            </div>
                                        )}
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                                name="password"
                                                onChange={HandleChange}
                                                value={data.password}
                                                placeholder="••••••••"
                                                required
                                            />
                                            {errors.password && (
                                                <div className="invalid-feedback">
                                                    {errors.password[0]}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <label className="form-label">Confirm Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password_confirmation"
                                                onChange={HandleChange}
                                                value={data.password_confirmation}
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="d-grid mb-3">
                                        {isSubmit ? (
                                            <button
                                                type="button"
                                                className="btn btn-primary-custom"
                                                disabled
                                            >
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Creating Account...
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="btn btn-primary-custom w-100"
                                            >
                                                Create Account
                                            </button>
                                        )}
                                    </div>
                                </form>

                                <div className="text-center mt-4">
                                    <span className="text-secondary small">Already have an account? </span>
                                    <Link to="/login" className="auth-link small">Sign In</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
