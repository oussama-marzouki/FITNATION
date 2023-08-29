import React, { useEffect, useState } from "react";
import "./Login.css";
import Logo from '../../assets/logologin.png'
import Register from "../Register/Register";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, login , reset } from "../../Redux/features/authSlice";
import axios from "axios";

const Login = () => {

  const [formData , setFormData] = useState({
    email: '',
    password: '',
  })
  
  const {email, password} = formData ;
  // const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {

    if (isError) {
      toast.error(message) ; 
    }
  if (user) {

    if (user.role ==='client') {
        navigate('/client') ;  
        //  return <Navigate to='/client' replace={true} />
      }
    if (user.role ==='coach') {
        // return <Navigate to='/client' replace={true} />
      navigate('/coach') ;  
      }
      if (user.role ==='admin') {
        // return <Navigate to='/client' replace={true} />
      navigate('/admin') ;  
      }

   }
    
    dispatch(reset()) ;
    },[user])

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name] : e.target.value,
    })) ; 
    
    // console.log(formData) ; 
  }

  const onSubmit = (e) => {
    e.preventDefault() ; 
    
    const userData = {
      email,
      password,
    } ;
    dispatch(login(userData)) ; 

  }

  const onForgot = async (e) => {
    e.preventDefault() ; 

    console.log(email) ;
    const response = await axios.post('http://localhost:5000/api/forgotpassword' , {email}) ;
    toast.success(response.data.message);
    console.log(response.data) ;
    return response.data ; 

  }

  
  return (
    <div className="abc">
      <div className="login ">
        <p className="title">Sign In</p>
        <form className="space-y-4" onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          className="inpte bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email"
          onChange={onChangeHandler}
        />
        <input
          type="password"
          name="password"
          className="inpte bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Password"
          onChange={onChangeHandler}
        />
        <p className="reset" >You forget your password ? <a href="" onClick={onForgot}>Reset Password</a></p>
        <button type="submit" className="btnregister text-white bg-principal focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button>
        </form>
      <div className=" last flex">
        <p className="regi"> You don’t have an account ? <Link to="/register">register</Link></p>
        <img src={Logo} alt="" className="image space-x-3 " />
      </div>
       
      </div>
    </div>
  );
};

export default Login;
