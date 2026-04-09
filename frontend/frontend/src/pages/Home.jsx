import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle goToLastPage from CreateNew (runs once on mount)
    useEffect(() => {
        FetchPosts();
    }, []);

    // Fetch posts whenever currentPage changes
    useEffect(() => {
        FetchPosts(currentPage);
    }, [currentPage]);

    const FetchPosts = async (page) => {
        try {
            const response = await api.get(`/posts?page=${page}`);
            setPosts(response.data.data);
            setCurrentPage(response.data.current_page);
            setLastPage(response.data.last_page);
            setTotal(response.data.total);
            setPerPage(response.data.per_page);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            } else {
                console.log(error.response?.data?.message || error.message);
            }
        }
    };

    const HandleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await api.delete(`/post/${id}`);
                FetchPosts(currentPage);
            } catch (error) {
                console.log(error.response?.data?.message || error.message);
            }
        }
    };

    const HandleLogout = async () => {
        try {
            await api.post("/logout");
        } catch (error) {
            console.log("Logout error:", error);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        }
    };

    // Generate page numbers array
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= lastPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    // Calculate "Showing X to Y of Z entries"
    const startEntry = (currentPage - 1) * perPage + 1;
    const endEntry = Math.min(currentPage * perPage, total);

    return (
        <div className="container">
            {/* Navbar / Header */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <h4 className="mb-0">Post Management</h4>
                <button
                    onClick={HandleLogout}
                    className="btn btn-outline-danger btn-sm"
                >
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
            </div>

            <hr />

            {/* Card */}
            <div className="card card-custom mt-2">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">All Posts</h5>
                    <Link to="/create" className="btn btn-primary btn-sm">
                        Create New
                    </Link>
                </div>

                <div className="card-body p-2">
                    <table className="table table-striped m-0 ">
                        <thead className="table-dark ">
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.author}</td>
                                        <td>{post.category}</td>
                                        <td>
                                            <span
                                                className={`badge ${
                                                    post.status === "Published"
                                                        ? "bg-success"
                                                        : post.status ===
                                                            "Draft"
                                                          ? "bg-warning text-dark"
                                                          : "bg-secondary"
                                                }`}
                                            >
                                                {post.status}
                                            </span>
                                        </td>
                                        <td>
                                            {new Date(
                                                post.created_at,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <Link
                                                to={`/edit/${post.id}`}
                                                className="btn btn-sm btn-outline-primary me-2"
                                            >
                                                <i className="fa-solid fa-pen"></i>
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    HandleDelete(post.id)
                                                }
                                                className="btn btn-sm btn-outline-danger"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No posts found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {lastPage > 1 && (
                    <div className="card-footer d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                            Showing {startEntry} to {endEntry} of {total}{" "}
                            entries
                        </small>

                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                {/* Previous Button */}
                                <li
                                    className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                    >
                                        &laquo; Prev
                                    </button>
                                </li>

                                {/* Page Numbers */}
                                {getPageNumbers().map((page) => (
                                    <li
                                        key={page}
                                        className={`page-item ${currentPage === page ? "active" : ""}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    </li>
                                ))}

                                {/* Next Button */}
                                <li
                                    className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage(currentPage + 1)
                                        }
                                        disabled={currentPage === lastPage}
                                    >
                                        Next &raquo;
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}
