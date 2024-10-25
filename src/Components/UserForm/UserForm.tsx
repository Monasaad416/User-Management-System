
import { useNavigate, useParams } from 'react-router-dom';

import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import {User} from '../Types/User.ts';
import { useEffect, useState } from 'react';

interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
}

interface UserFormProps {
  user? : User
}
    


const AddUser: React.FC<UserFormProps> = ({ user }) => {

  
 const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  // console.log(userId);
  const [currentUser, setCurrentUser] = useState<User | null>(user || null); // Use prop for initial value


  const { register, handleSubmit, formState: { errors },setValue } = useForm<FormInputs>({
    defaultValues: user || undefined,
  });




    const fetchUser = async () => {
      if (userId) {
        try {
          const response = await axios.get(`https://dummyjson.com/users/${userId}`);
          console.log(response?.data);
          setCurrentUser(response?.data);
          console.log(currentUser);
          // Set default values in the form
          setValue('firstName', response.data.firstName);
          setValue('lastName', response.data.lastName);
          setValue('email', response.data.email);
          setValue('age', response.data.age);
          setValue('phone', response.data.phone);
          setValue('birthDate', formatedDate(response.data.birthDate));
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch user data.", {
            theme: "colored"
          });
        }
      }
    };


  useEffect(() => {
    fetchUser();
  }, [userId, setValue]);


  const formatedDate = (dateString: string): string => {
    const dateParts = dateString.split('-');
    const year = dateParts[0];
    const month = String(dateParts[1]).padStart(2, '0'); // Ensure two digits
    const day = String(dateParts[2]).padStart(2, '0'); // Ensure two digits
    return `${year}-${month}-${day}`;
  };



    const submit :SubmitHandler<FormInputs> = async (data) => {
        try {
          if(userId) {
            const response = await axios.put(`https://dummyjson.com/users/${userId}`,data);
            setCurrentUser(response?.data);
            navigate("/dashboard/users");
            toast.info("User Updated Successfully!", {
                theme: "colored"
            });
          } else {
            const response = await axios.post('https://dummyjson.com/users/add',data);
              console.log(response);
              navigate("/dashboard/users");
              toast.success("New User Added Successfully!", {
                  theme: "colored"
              });
          }
              
        } catch (err) {
            if(userId) {
              console.log(err);
                toast.error("Fail To Update User!", {
                    theme: "colored"
                });
            } else {
               console.log(err);
                toast.error("Fail To Add New  User!", {
                    theme: "colored"
                });
            }
  
        }

    }

  return (
  <div>
      <div className='mx-5'>
        <h3>{userId ? 'Edit': 'Add'} User</h3>
        <hr className='text-muted'/>
        <div className="row">
          <div className="col-12">
            <div className="mx-3 my-3 bg-white"  style={{borderRadius:'15px'}}>
              <div className="">
                <form className="text-start px-4 py-4" onSubmit={handleSubmit(submit)}>
                  <div className="row my-5">
                    <div className="col-md-6">
                      <div className='pe-4'>
                        <label htmlFor="firstName" className="text-muted form-label">First Name</label>
                        <input type="text" className="form-control inputStyle" placeholder='Enter your first name'
                        {...register("firstName",{required:"firstName is required"})} />
                        {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
                      </div>
                    </div>

                    <div className="col-md-6">
                    <div className='pe-4'>
                      <label htmlFor="lastName" className="text-muted form-label">Last Name</label>
                      <input type="text" className="form-control inputStyle" placeholder='Enter your Last name'
                    {...register("lastName",{required:"lastName is required"})}/>
                    {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
                    </div>
            
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-6">
                    <div className='pe-4'>
                      <label htmlFor="email" className="text-muted form-label">Email</label>
                      <input type="email" className="form-control inputStyle" placeholder='Enter your email'
                      {...register("email",{required:"email is required" , pattern:{
                        value:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,message:"please enter a valid email address"
                      }})}/>
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                    </div>
                    </div>

                    <div className="col-md-6">
                    <div className='pe-4'>
                      <label htmlFor="age" className="text-muted form-label">Age</label>
                      <input type="text" className="form-control inputStyle" placeholder='Enter your age'
                      {...register("age",{required:"age is required" ,
                        max:{value:200,message:"Age must be less than 200"},
                        min:{value:0,message:"Age must be greater than 0"
                        }}
                      )}/>
                    {errors.age && <span className="text-danger">{errors.age.message}</span>}
                  </div>

                </div>
                    
                  </div>

                  <div className="row my-5">
                    <div className="col-md-6">
                      <div className='pe-4'>
                        <label htmlFor="phone" className="text-muted form-label">Phone</label>
                        <input type="text" className="form-control inputStyle" placeholder='Enter your phone'
                        {...register("phone",{required:"phone is required"})}/>
                        {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className='pe-4'>
                        <label htmlFor="birthDate" className="text-muted form-label">Birth Date</label>
                        <input type="date" className="form-control inputStyle" placeholder='Enter your date of birth'
                        {...register("birthDate",{required:"birthdate is required"})}/>
                        {errors.birthDate && <span className="text-danger">{errors.birthDate.message}</span>}
                    </div>

                  </div>
                    
                  </div>


                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-warning text-white" type="submit">{userId ? 'Edit': 'Create'} User</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUser;
