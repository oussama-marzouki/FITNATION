import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector , useDispatch } from "react-redux";
import { register , reset } from "../../Redux/features/authSlice";
import Sprinner from "../../Components/Sprinner";


const Register = () => {

const [formData , setFormData] = useState({
  firstName: '', 
  lastName: '',
  email: '',
  password: '',
  gender: '',
  age: '', 
  role: ''
})

const {firstName, lastName, email, password, gender, age , role} = formData ; 

const navigate = useNavigate()
const dispatch = useDispatch()

const { user, isLoading, isError, isSuccess, message } = useSelector(
  (state) => state.auth
)

useEffect(() => {

if (isError) {
  toast.error(message) ; 
}
if (isSuccess === true) {
  navigate('/login') ;
}

dispatch(reset()) ;
},[user, isError, isSuccess, message])

const onChangeHandler = (e) => {
  setFormData((prevState) => ({
    ...prevState, 
    [e.target.name] : e.target.value,
  })) ;  
}

const onSubmit = (e) => {
  e.preventDefault() ; 

  const userData = {
    firstName, 
    lastName,
    email,
    password,
    gender,
    age,
    role
  }

  console.log(userData) ; 
  dispatch(register(userData)) ; 

}

if (isLoading) {
  return <Sprinner />
}

  return (
    <div className="abcd ">
      <div class="register space-y-4">
        <p className="title">Sign Up</p>
<form onSubmit={onSubmit} className=" space-y-3">
        <div className=" reg flex space-x-3 mb-6 ">
          <input
            name="firstName"
            type="text"
            id="default-input"
            class="inp bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="First Name"
            onChange={onChangeHandler}
          />
          <input
            name="lastName"
            type="text"
            id="default-input"
            class="inp bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Last Name"
            onChange={onChangeHandler}
          />
        </div>
        <input
          name="email"
          type="text"
          id="default-input"
          class="inp bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email"
          onChange={onChangeHandler}
        />
        <input
          name="password"
          type="password"
          id="default-input"
          class=" inp bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Password"
          onChange={onChangeHandler}
        />
        <div className=" flex space-x-3 ">
          <select
            name="gender"
            type="text"
            id="selectp"
            class="block w-full p-2 mb-6 text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={onChangeHandler}
          >
            <option value="none" selected disabled hidden>
              Your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="date"
            name="age"
            min={0}
            id="default-input"
            class="inp bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Age"
            onChange={onChangeHandler}
          />
        </div>  
        <div class="flex checkbox-group required pb-4 mb-6">

    <label class="inline-flex  ml-4 items-center">
      <input type="radio" name="role" value={'coach'} className="w-5 h-5 text-principal  rounded-2xl focus:ring-0" onChange={onChangeHandler} />
      <span class="ml-4">Coach</span>
    </label>
  <label class="inline-flex  ml-4 items-center">
      <input type="radio" name="role" value={'client'} className="w-5 h-5 text-principal  rounded-2xl focus:ring-0" onChange={onChangeHandler}/>
      <span class="ml-4">Client</span>
    </label>

</div>
    
        <p className="log">
          You already a member ? <Link to="/login">Sign In</Link>
        </p>
        <button
          type="submit"
          class="btn text-white bg-principal focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium px-5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Sign Up
        </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
