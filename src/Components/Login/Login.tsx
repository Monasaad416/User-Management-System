import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Login.module.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import PreLoader from '../PreLoader/PreLoader';

export default function Login() {

    const navigate = useNavigate();
    // const Login:React.FC = () => {
    interface LoginFormInputs {
        username:string;
        password:string;
    }
    
    const {
      register,
      handleSubmit,
      formState: {errors},
    } = useForm<LoginFormInputs>();

    const authContext = useContext(AuthContext); 
    if(!authContext) {
        return <div><PreLoader/></div>; //  handle the null case 
    }
    const {getUserToken} = authContext;
    const submit :SubmitHandler<LoginFormInputs> = async (data) => {
        try {
                const response = await axios.post('https://dummyjson.com/auth/login',data);
                localStorage.setItem('userAccessToken',response?.data?.accessToken);
                getUserToken()

                navigate("/dashboard");

                toast.success("Login Successfully!", {
                    theme: "colored"
                });
                // setTimeout(() =>{
                //   
                // }, 2000);   
        } catch (err) {
            console.log(err);
            toast.error("Login Failed!",{
                theme:"colored"
            });
        }

    }



    

  return (
    <div className={`vh-100 w-100 d-flex justify-content-center align-items-center ${styles.login_bg}`}>
        <div className={`d-flex justify-content-center align-items-start ${styles.login_form}`}>
            <div className='text-center'>
                <div className="d-flex">
                    <div className="mt-5 mx-2" style={{ width:'5px',height:'30px',backgroundColor:"#F8D442" }}></div>
                    <h2 className='mt-5'>User Management System</h2>
                </div>
                
                <p className="text-uppercase mt-5 mb-1 fs-5 fw-bold">sign in</p>
                <small className="text-muted">Enter your credentials to access your account</small>
                <form className='mt-5 py-3' onSubmit={handleSubmit(submit)}>
                    <div className="mb-3 mx- text-start mx-0">
                        <label htmlFor="exampleInputEmail1" className="text-muted form-label">Username</label>
                        <input type="text" className="form-control inputStyle" placeholder='Enter Username'
                        {...register("username",{required:"username is required"})}/>
                        {errors.username && <span className="text-danger">{errors.username.message}</span>}
                    </div>
                    <div className="mb-3 text-start" >
                        <label htmlFor="exampleInputPassword1" className="text-muted form-label">Password</label>
                        <input type="password" className="form-control inputStyle" placeholder='Enter Password' 
                        {...register("password",{required:"password is required"})}/>
                        {errors.password && <span className="text-danger">{errors.password.message}</span>}
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-warning text-white mt-4">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
