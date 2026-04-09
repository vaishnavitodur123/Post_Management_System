import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function CreateNew() {
    const [data, setdata] = useState({
        title: "",
        author: "",
        category: "",
        status: "Published",
        content: "",
    });
    const [IsSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmit(true);
        try {
            await api.post("/post", data);
            navigate("/", { state: { goToLastPage: true } });
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Failed to create post");
            } else {
                setError("Network error. Please check your connection.");
            }
            console.log(err);
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <>
            <div className="container">
                {/* Page Header */}
                <div className="page-title">
                    <h1>Create New Post</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item active">
                                Create Post
                            </li>
                        </ol>
                    </nav>

                    {/* Card */}
                    <div className="card card-custom mt-4">
                        <div className="card-header">
                            <strong>Post Details</strong>
                        </div>

                        <div className="card-body">
                            {error && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                            <form id="post-form" onSubmit={HandleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            onChange={HandleChange}
                                            value={data.title}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="author"
                                            onChange={HandleChange}
                                            value={data.author}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Category
                                        </label>
                                        <select
                                            className="form-select"
                                            name="category"
                                            onChange={HandleChange}
                                            value={data.category}
                                            required
                                        >
                                            <option value="">
                                                Select category
                                            </option>
                                            <option value="Web Development">
                                                Web Development
                                            </option>
                                            <option value="Programming">
                                                Programming
                                            </option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">
                                            Status
                                        </label>
                                        <select
                                            className="form-select"
                                            name="status"
                                            onChange={HandleChange}
                                            value={data.status}
                                        >
                                            <option value="Published">
                                                Published
                                            </option>
                                            <option value="Draft">Draft</option>
                                            <option value="Archived">
                                                Archived
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Content
                                    </label>
                                    <textarea
                                        className="form-control"
                                        rows="6"
                                        name="content"
                                        onChange={HandleChange}
                                        value={data.content}
                                        required
                                    ></textarea>
                                </div>

                                <div className="text-end">
                                    <Link
                                        to="/"
                                        className="btn btn-secondary me-2"
                                    >
                                        Cancel
                                    </Link>
                                    {IsSubmit ? (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            disabled
                                        >
                                            Saving...
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Create Post
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
