import React from "react";
import { Link } from "react-router-dom";
import { Router } from "react-router";

export default function NotFound() {
    return (
        <>
            <h1 className='text-center'>404-Page Not Found</h1>
            <div className='text-center mt-4'>
                <Link to='/' className='btn btn-primary'>
                    Go Home
                </Link>
            </div>
        </>
    );
}
