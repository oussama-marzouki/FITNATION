import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
    password: "",
    password2: "",
  };

const ResetPassword = () => {

    const [formData, setformData] = useState(initialState);
    const { password, password2 } = formData;

    const navigate = useNavigate() ;

    // const [password, setPassword] = useState("");
    // const [password2, setPassword2] = useState("");
  
    const { resetToken } = useParams();
  
    // const handleInputChange = (e) => {
    
    //  setPassword(e.target.value) ;
    //  setPassword(e.target.value) ;  
    //   const { name, value } = e.target;
    //   setformData({ ...formData, [name]: value });
    // };

    const onChangeHandler = (e) => {
        setformData((prevState) => ({
          ...prevState, 
          [e.target.name] : e.target.value,
        })) ; 
    }
    const reset = async (e) => {
      e.preventDefault();

      if (password !== password2) {
        return toast.error("Passwords do not match");
      }

    const userData = {
        password,
        password2,
      };
  
      try {
            const response = await axios.put(
                `http://localhost:5000/api/resetpassword/${resetToken}`,
                userData
              );
            toast.success(response.data.message);
            navigate('/login') ;

      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <>
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full p-6 rounded-3xl shadow-2xl dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 class="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={reset}>

              <div>
                  <input type="password" name="password" id="password" placeholder="Password" onChange={onChangeHandler} className=" border border-gray-300 text-gray-900 sm:text-sm rounded-3xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div>
                  <input type="password" name="password2" id="confirm-password" placeholder="Confirme Password" onChange={onChangeHandler} className="border border-gray-300 text-gray-900 sm:text-sm rrounded-3xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <button type="submit" class="w-full text-white bg-principal hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset password</button>
          </form>
      </div>
  </div>
</section>
</>
  )
}

export default ResetPassword
