import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setdata] = useState({
        title: "",
        author: "",
        category: "",
        status: "",
        content: "",
    });
    const [IsSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/post/${id}`);
                setdata(response.data.data);
            } catch (error) {
                console.log(error.response?.data?.message || error.message);
            }
        };
        fetchPost();
    }, [id]);

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        try {
            await api.put(`/post/${id}`, data);
            navigate("/");
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <div className="container">
            <div className="page-title">
                <h1>Edit Post</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item active">Edit Post</li>
                    </ol>
                </nav>
            </div>

            <div className="card card-custom mt-4">
                <div className="card-header">
                    <strong>Post Details</strong>
                </div>

                <div className="card-body">
                    <form onSubmit={HandleSubmit} method="POST">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    onChange={HandleChange}
                                    value={data.title}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Author</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="author"
                                    onChange={HandleChange}
                                    value={data.author}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    name="category"
                                    onChange={HandleChange}
                                    value={data.category}
                                >
                                    <option value="">Select category</option>
                                    <option value="Web Development">
                                        Web Development
                                    </option>
                                    <option value="Programming">
                                        Programming
                                    </option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-select"
                                    name="status"
                                    onChange={HandleChange}
                                    value={data.status}
                                >
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Content</label>
                            <textarea
                                className="form-control"
                                rows="6"
                                name="content"
                                onChange={HandleChange}
                                value={data.content}
                            ></textarea>
                        </div>

                        <div className="text-end">
                            <Link to="/" className="btn btn-secondary me-2">
                                Cancel
                            </Link>
                            {IsSubmit ? (
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    disabled
                                >
                                    Updating...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Update Post
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
