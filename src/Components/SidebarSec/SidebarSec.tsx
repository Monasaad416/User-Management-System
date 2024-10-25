
import { Link, useNavigate } from 'react-router-dom'

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaArrowCircleLeft, FaArrowCircleRight, FaHome, FaUsers } from 'react-icons/fa'
import { TiUserAdd } from 'react-icons/ti'
import { CgProfile } from 'react-icons/cg'
import { LuLogOut } from 'react-icons/lu'

import React, { useContext ,useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import PreLoader from '../PreLoader/PreLoader';
import { toast } from 'react-toastify';

const SidebarSec: React.FC = () => {

  const navigate = useNavigate();
  //sidebar collapse
  const [isCollapsed,setItCollapsed] = useState(false);

  const toggleCollapse = () => {
    setItCollapsed(!isCollapsed);
  }


  //get user data from Auth context
  const authContext = useContext(AuthContext);
  //console.log(authContext);
  // Check if authContext is null
  if (!authContext) {
      return <div><PreLoader/></div>; //  handle the null case 
  }
  const { userData } = authContext ; 
 
  //logout 
 

  const logout = () => {
    try {
        localStorage.removeItem("userAccessToken");
        navigate("/login");
        toast.success("Logout Successfully!", {
            theme: "colored"
        });
        // setTimeout(() =>{
      
        // }, 2000);
    } catch (err) {
        console.log(err);
        toast.error("Logout Failed!",{
            theme:"colored"
        });
    }

  }

  
  return (
      <Sidebar className='sidebar_sec' collapsed={isCollapsed}>

        <div className='d-flex justify-content-center my-2'>
          { isCollapsed ? 
            <FaArrowCircleRight size={20} title='Collapse' onClick={toggleCollapse}/> :
            <FaArrowCircleLeft size={20} title='Collapse' onClick={toggleCollapse}/>
          }
        </div>
        
 
        <div className="d-flex text-start mx-2 my-2">
          <div className={`mt-3 mx-2 line`}></div>
          <h2 className={`mt-${isCollapsed == false ? 3 : 4 } fs-${isCollapsed == false ? 2 : 6 }`}>UMS</h2>
          </div>
        <div className='text-center'>
          {userData?.image &&  <img src={userData.image} className='rounded-circle w-50' /> }
          {userData?.firstName && userData?.lastName && <p className={`text-capitalize fw-${isCollapsed == false ? 'bold' : 'normal'} fs-${isCollapsed == false ? 4 : 6 } my-4`}>
              {userData?.firstName} {" "} {userData?.lastName}
          </p> }
          <h5 className={`text-capitalize fw-${isCollapsed == false ? 'bold' : 'normal'} mb-4 user_name`}>admin</h5>
        </div>
        
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem icon={<FaHome size={22}/>} component={<Link to="/dashboard" />}> Home</MenuItem>
          <MenuItem icon={<FaUsers size={22}/>}  component={<Link to="/dashboard/users" />}> Users</MenuItem>
          <MenuItem icon={<TiUserAdd size={22}/>}  component={<Link to="/dashboard/users/add-user" />}> Add User</MenuItem>
          <MenuItem icon={<CgProfile size={22}/>}  component={<Link to="/dashboard/users/user-profile/" />}> Profile</MenuItem>
          <MenuItem icon={<LuLogOut size={22}/>}  onClick={logout}> Logout</MenuItem>
        </Menu>
      </Sidebar>
  )
}


export default SidebarSec
