
import { Link } from "react-router-dom";
import api from "../api/api";
import { useEffect, useState } from "react";
import LogoutButton from "./Logout";

export default function Home() {

    useEffect(() => {
        getallposts();
    }, []);


       const [IsLoading, setIsLoading] = useState(false);
       const [ispost, setIspost] = useState([]);
       const [deleteid, setDeleteid] = useState([]);
       const [currentPage, setCurrentPage] = useState(1);
       const [lastPage, setLastPage] = useState(1);
       const [total, setTotal] = useState(0);
       const [perPage, setPerPage] = useState(3);

    const getallposts = async (page = 1)=>{
    
        setIsLoading(true);
        try{
               const response = await api.get(`/allpost?page=${page}`);
              setIspost(response.data.data);
              setCurrentPage(response.data.current_page);
              setLastPage(response.data.last_page);
              setTotal(response.data.total);
              setPerPage(response.data.per_page);
               
        } catch(error){
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    }


    const deletemodal = (id)=>{
        setDeleteid(id);
        console.log(id);
    }

    const deletepost =async ()=>{
       
const response = await api.delete(`/deletepost/${deleteid}`);
getallposts(currentPage);
const Model = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
Model.hide();

       
    }
    return (
        <>
            <div className='container'>
                {/* <!-- Header --> */}
                <div className='header-title'>
                    <h1>Post Management System</h1>
                    <p className='text-muted'>Manage your posts efficiently</p>
                </div>

                {/* <!-- Card --> */}
                <div className='card card-custom mt-4'>
                    <div className='card-header d-flex justify-content-between align-items-center'>
                        <h5 className='mb-0'>All Posts</h5>
                        <div className="d-flex gap-2">
                        <Link
                            to='/createpost'
                            className='btn btn-primary btn-sm'
                        >
                            Create New
                        </Link>
                         <LogoutButton />
                        </div>
                    </div>

                    <div className='card-body p-2'>
                        {IsLoading ?
                        <center>Loading...</center>:
                        <table className='table table-striped m-0 '>
                            <thead className='table-dark '>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Content</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {ispost.map((item,index)=>(
                                <tr key={item.id || index}>
                                    <td>{(currentPage - 1) * perPage + index + 1}</td>
                                    <td>
                                        <Link to={`/editpost/${item.id}`}>
                                            {item.title}
                                        </Link>
                                        
                                    </td>
                                    <td>{item.author}</td>
                                    <td>{item.category}</td>
                                    <td>
                            {item.status === "Published" ? 
                       <span className='badge bg-success'>
                         {item.status}</span>
                          :item.status === "Draft" ? 
                        <span className='badge bg-danger'>
                         {item.status}</span>
                         :
                        <span className='badge bg-warning'>
                         {item.status}</span>
}
                                        
                                    </td>
                                    <td>{item.content}</td>
                                   <td>{new Date(item.created_at).toLocaleDateString()}</td>

                                    <td>
                                        <Link to={`/editpost/${item.id}`} className='btn btn-sm btn-outline-primary' >
                                            <i className='fa-solid fa-pen' ></i>
                                        </Link>

                                        <button className='btn btn-sm btn-outline-danger' onClick={()=>deletemodal(item.id)} data-bs-toggle="modal" data-bs-target="#deleteModal">
                                            <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
 ))}
                        
                            </tbody>
                        </table>
}

                        {/* Pagination */}
                        {!IsLoading && lastPage > 1 && (
                        <nav className="d-flex justify-content-between align-items-center mt-3 px-2 pb-2">
                            <span className="text-muted">Showing page {currentPage} of {lastPage} ({total} total posts)</span>
                            <ul className="pagination mb-0">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => getallposts(currentPage - 1)}>Previous</button>
                                </li>

                                {[...Array(lastPage)].map((_, i) => (
                                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => getallposts(i + 1)}>{i + 1}</button>
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => getallposts(currentPage + 1)}>Next</button>
                                </li>
                            </ul>
                        </nav>
                        )}

                    </div>
                </div>
            </div>

            {/* <!-- delete Modal --> */}
<div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog ">
    <div className="modal-content ">
      <div className="modal-header bg-danger text-white">
        <h1 className="modal-title fs-5 " id="exampleModalLabel">Delete Post</h1>
        <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Are you sure you want to delete this post?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger" onClick={deletepost} data-bs-dismiss="modal">Delete</button>
      </div>
    </div>
  </div>
</div>
        </>
    );
}
