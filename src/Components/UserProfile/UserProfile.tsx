import { useContext} from 'react';
import PreLoader from '../PreLoader/PreLoader.tsx';
import { AuthContext } from '../Context/AuthContext.tsx';



const UserProfile: React.FC = () => {
  const authContext = useContext(AuthContext);

  // Check if authContext is null
  if (!authContext) {
    return <div><PreLoader /></div>; // Handle the null case
  }

  const { userData } = authContext;
  console.log(authContext);

  // Check if userData is null
  if (!userData) {
    return <div>No user data available.</div>; // Handle the case where userData is null
  }


  // const formattedDate = (dateString: string): string => {
  //   const dateParts = dateString.split('-');
  //   const year = dateParts[0];
  //   const month = String(dateParts[1]).padStart(2, '0'); // Ensure two digits
  //   const day = String(dateParts[2]).padStart(2, '0'); // Ensure two digits
  //   return `${year}-${month}-${day}`;
  // };


  return (
  <div>
      <div className='mx-md-5 mx-1 vh-100'>
        <h3 className='my-md-2 my-3 mx-1'>User Profile</h3>
        <hr className='text-muted'/>
        <div className="row">
          <div className="col-12">
            <div className="mx-3 my-3 bg-white position-relative"  style={{borderRadius:'15px'}}>
              <div className="text-center" style={{position:'absolute',top:"0px",left:"50%",transform: 'translate(-50%, -50%)'}}>
                <img src={userData.image} alt="profile image"/>
              </div>
              
              <div className="">
                <form className="text-start px-4 py-4">
                  <div className="row my-5">
                    <div className="col-md-6">
                      <div className='pe-4'>
                        <label htmlFor="firstName" className="text-muted form-label">First Name</label>
                        <input type="text" className="form-control inputStyle" disabled value={userData.firstName} placeholder='Enter your first name'/>
                      </div>
                    </div>

                    <div className="col-md-6">
                    <div className='pe-4'>
                      <label htmlFor="lastName" className="text-muted form-label">Last Name</label>
                      <input type="text" className="form-control inputStyle" disabled value={userData.lastName} placeholder='Enter your Last name'/>
                    </div>
            
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-6">
                    <div className='pe-4'>
                      <label htmlFor="email" className="text-muted form-label">Email</label>
                      <input type="email" className="form-control inputStyle" disabled value={userData.email}  placeholder='Enter your email'/>
                    </div>
                    </div>

                    <div className="col-md-6">
                    <div className='pe-4'>
                      <label htmlFor="gender" className="text-muted form-label">Gender</label>
                      <input type="text" className="form-control inputStyle" disabled value={userData.gender}/>
                  </div>

                </div>
                    
                  </div> 
                  {/* <div className="row my-5">
                    <div className="col-md-6">
                      <div className='pe-4'>
                        <label htmlFor="phone" className="text-muted form-label">Phone</label>
                        <input type="text" className="form-control inputStyle" disabled value={userData.phone}  placeholder='Enter your phone'/>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className='pe-4'>
                        <label htmlFor="birthDate" className="text-muted form-label">Birth Date</label>
                        <input type="date" className="form-control inputStyle" disabled value={formattedDate(userData.birthdate)}  placeholder='Enter your date of birth'/>
                    </div>

                  </div>
                    
                  </div> */}


                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;

