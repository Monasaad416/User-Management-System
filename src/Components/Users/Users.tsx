import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { MdModeEdit ,MdDelete, MdDeleteForever } from "react-icons/md";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import PreLoader from "../PreLoader/PreLoader.tsx";
import CustomPagination from "../CustomPagination/CustomPagination.tsx";





export default function Users() {
  //list of users from api
  const[users,setUsers] = useState([])

  //delete modal
  const [showDelete, setShowDelete] = useState(false);

  //get user id with each delete or edit btn
  const [userId, setUserId] = useState(0);
  const [page, setPage] = useState(1)
  const usersPerPage = 16
  
  const totalUser = users.length;
  const totalPages = Math.ceil(totalUser /  usersPerPage);
  const indexOfLastUser = page *  usersPerPage
;
  const indexOfFirstUser = indexOfLastUser -  usersPerPage
;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);


// Assuming 'page' is a state variable and 'setPage' is its setter
const handleChangePage = useCallback((newPage: number) => {
  setPage(newPage);
}, []);

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = (id:number) => {
    setShowDelete(true);
    setUserId(id);
  }
  
const [loading,setLoading] = useState(true);
  const getAllUsers = async() => {
    try {
        const response = await axios.get("https://dummyjson.com/users");
        setUsers(response?.data?.users);
        setLoading(false);
        // console.log(response?.data);
    } catch (err) {
        console.log(err);
    }
  }

  const deleteUser = async () => {
    try{
        const deleteResponse = await axios.delete(`https://dummyjson.com/users/${userId}`);
        console.log(deleteResponse);
        handleCloseDelete();
        toast.success('User deleted successfully', {
                    theme: "colored"
                });
        
  
    } catch(err) {
      console.log(err);
      toast.error('Sorry something went wrong, cannot delete user !', {
            theme: "colored"
        });
    }
  }


  const navigate = useNavigate();

  const navigateToAddNewUser = () => {
    navigate('/dashboard/users/add-user');
  }


  useEffect(() =>{
    getAllUsers()

  },[])


  interface User {
  key: number; // or number, depending on your data
  id:number;
  email:string;
  firstName: string;
  lastName: string;
  phone:string;
  birthDate: number;
  image: string;
  // Add other properties as needed
}
  return (
    <>
    {loading ? <PreLoader/> : 
    <div className='row mx-5 px-5 '>
      <div className="d-flex justify-content-between my-5">
        <h3>Users List</h3>
        <button className="btn btn-warning px-5 text-white" onClick={navigateToAddNewUser}>Add New User</button>
      </div>
      <hr className='text-muted'/>
   
      <div  style={{borderRadius:'20px'}}>
        <table className="table table-responsive table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Birth Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((userInfo : User) =>(
              <tr key={userInfo.id}>
                <td>{userInfo.id}</td>
                <td><img src={userInfo.image} style={{  width: "20%"}}className="w-20" alt="profile image"/></td>
                <td>{userInfo.firstName}</td>
                <td>{userInfo.lastName}</td>
                <td>{userInfo.email}</td>
                <td>{userInfo.phone}</td>
                <td>{userInfo.birthDate}</td>
                <td>
                  <Link to={`/dashboard/users/update-user/${userInfo.id}`}>
                    <MdModeEdit size={25} title="Edit User" className="text-warning mx-2"/>
                  </Link>
                  <MdDelete size={25} title="Delete User" onClick={()=>handleShowDelete(userInfo.id)} className="text-warning mx-2"/>
                </td>
              </tr>
            ))}
      

          </tbody>
        </table>
      </div>
    


     {/* Delete Modal Start  */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <MdDeleteForever size={50} color={'rgb(165 40 52)'} />
          <Modal.Title >Confirm Delete User </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete user!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            No
          </Button>
          <Button variant="danger" onClick={()=>deleteUser()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal End */}
 



            {totalPages > 1 && (
              <CustomPagination
                total={totalPages}
                current={page}
                onChangePage={handleChangePage}
              />
            )}

    </div>
   
    }
     </>
  )
}