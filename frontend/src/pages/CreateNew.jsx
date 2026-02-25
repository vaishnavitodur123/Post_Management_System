import React from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

export default function CreateNew() {
    const [data, setdata] = useState({
        title: "",
        author: "",
        category: "",
        status: "",
        content: "",
    });
    const [IsSubmit, setIsSubmit] = useState(false);
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
        // console.log(data);
        setIsSubmit(true);
        try {
            const response = await api.post("/post", data);
            navigate("/home");

            console.log(response);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setIsSubmit(false);
        }
    };
    return (
        <>
            <div className='container'>
                {/* <!-- Page Header --> */}
                <div className='page-title'>
                    <h1>Create New Post</h1>
                    <nav>
                        <ol className='breadcrumb'>
                            <li className='breadcrumb-item'>
                                <Link to='/home'>Home</Link>
                            </li>
                            <li className='breadcrumb-item active'>
                                Create Post
                            </li>
                        </ol>
                    </nav>

                    {/* <!-- Card --> */}
                    <div className='card card-custom mt-4'>
                        <div className='card-header'>
                            <strong>Post Details</strong>
                        </div>

                        <div className='card-body'>
                            <form
                                id='post-form'
                                onSubmit={HandleSubmit}
                                method='POST'
                            >
                                <div className='row mb-3'>
                                    <div className='col-md-6'>
                                        <label className='form-label'>
                                            Title
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='title'
                                            onChange={HandleChange}
                                            value={data.title}
                                        />
                                    </div>

                                    <div className='col-md-6'>
                                        <label className='form-label'>
                                            Author
                                        </label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            name='author'
                                            onChange={HandleChange}
                                            value={data.author}
                                        />
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <div className='col-md-6'>
                                        <label className='form-label'>
                                            Category
                                        </label>
                                        <select
                                            className='form-select'
                                            name='category'
                                            onChange={HandleChange}
                                            value={data.category}
                                        >
                                            <option>Select category</option>
                                            <option value='Web Devlopment'>
                                                Web Development
                                            </option>
                                            <option value='Programming'>
                                                Programming
                                            </option>
                                        </select>
                                    </div>

                                    <div className='col-md-6'>
                                        <label className='form-label'>
                                            Status
                                        </label>
                                        <select
                                            className='form-select'
                                            name='status'
                                            onChange={HandleChange}
                                            value={data.status}
                                        >
                                            <option value='Status'>
                                                Status
                                            </option>
                                            <option value='Published'>
                                                Published
                                            </option>
                                            <option value='Draft'>Draft</option>
                                            <option value='Achived'>
                                                Achived
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <label className='form-label'>
                                        Content
                                    </label>
                                    <textarea
                                        className='form-control'
                                        rows='6'
                                        name='content'
                                        onChange={HandleChange}
                                        value={data.content}
                                    ></textarea>
                                </div>

                                <div className='text-end'>
                                    <Link
                                        to='/home'
                                        className='btn btn-secondary me-2'
                                    >
                                        Cancel
                                    </Link>
                                    {IsSubmit ? (
                                        <button
                                            type='button'
                                            className='btn btn-primary'
                                        >
                                            Saving...
                                        </button>
                                    ) : (
                                        <button
                                            type='submit'
                                            className='btn btn-primary'
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
