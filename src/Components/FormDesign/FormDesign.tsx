import { useEffect, useState } from "react";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";


  
  interface FormInputs {
      firstname:string;
      lastname:string;
      email:string;
      age:number;
      phone:string;
      birthdate:string;
  }


interface UserFormProps {
    submit: (data: FormInputs) => void;
    initialValues?: FormInputs; 
    isEditing?: boolean; // Flag to indicate if it's an edit
    isProfile?: boolean; // Flag to indicate if it's a profile
    // register: UseFormRegister<FormInputs>;
    // errors: FieldErrors;
}




const FormDesign: React.FC<UserFormProps> = (submit, initialValues, isEditing = false,isProfile = false) => {



      const {
      register,
      handleSubmit,
      formState: {errors},
    } = useForm<FormInputs>(initialValues);


    const [values,setValues] useState(false);
    // Reset the form with initial values when editing
    useEffect(() => {
        if (initialValues) {
            setValues(initialValues);
        }
    }, [initialValues, setValues]);

    return (
         <form className="text-start px-md-4 py-md-4" onSubmit={handleSubmit(submit)}>
            <div className="row my-5">
              <div className="col-md-6">
                <div className='pe-4'>
                  <label htmlFor="firstname" className="text-muted form-label">First Name</label>
                  <input type="text" className="form-control inputStyle" placeholder='Enter your first name'
                  {...register("firstname",{required:"firstname is required"})}/>
                  {errors.firstname && <span className="text-danger">{errors.firstname.message}</span>}
                </div>
              </div>

              <div className="col-md-6">
               <div className='pe-4'>
                <label htmlFor="lastname" className="text-muted form-label">Last Name</label>
                <input type="text" className="form-control inputStyle" placeholder='Enter your Last name'
               {...register("lastname",{required:"lastname is required"})}/>
               {errors.lastname && <span className="text-danger">{errors.lastname.message}</span>}
              </div>
      
               </div>
            </div>

            <div className="row my-5">
              <div className="col-md-6">
              <div className='pe-4'>
                <label htmlFor="email" className="text-muted form-label">Email</label>
                <input type="email" className="form-control inputStyle" placeholder='Enter your email'
                {...register("email",{required:"email is required" , pattern:{
                  value:/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,message:"please enter a valid email address"
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
                  <label htmlFor="birthdate" className="text-muted form-label">Birth Date</label>
                  <input type="date" className="form-control inputStyle" placeholder='Enter your date of birth'
                  {...register("birthdate",{required:"birthdate is required"})}/>
                  {errors.birthdate && <span className="text-danger">{errors.birthdate.message}</span>}
              </div>

            </div>
               
            </div>


            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-warning text-white" type="submit">Submit</button>
            </div>
          </form>
    );
}

export default FormDesign;
