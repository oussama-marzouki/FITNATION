import React, { useState } from "react";
import { axiosClient } from "../../util/axios-config.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../Redux/features/authSlice.js";
import ChangerPass from "../changerPass/changerPass.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import UpdateBio from "../UpdateBio.jsx";
import Modal from "../UpdateBio.jsx";
import Sprinner from "../Sprinner.jsx";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const Loading = useSelector((state) => state.auth.isLoading);

  const [isLoading, setIsLoading] = useState(false);

  //  duysevhhz
  // https://api.cloudinary.com/v1_1/
  // fitnation

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState(null);
  const [photo , setPhoto] = useState("") ; 


    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('cdcFile' , file) ;


// const  newData = { age, gender, firstName, lastName , file };
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    // const  newData = { age, gender, firstName, lastName , file };

    try {
      setIsLoading(true) ; 
      const response = await axiosClient.patch('/updateclient', formData , {
          headers: {
            'Content-Type': 'multipart/form-data',
          },}); 
          
      //console.log(response.data);
      localStorage.setItem('user' , JSON.stringify(response.data)) ;
      setIsLoading(false) ; 
      toast.success("updated successfly"); 
      window.location.reload(); 
      return response.data ;
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
   // dispatch(updateUser(formData)); 
  };

  return (
    <>
    <div className="w-2/3 px-10 py-9 rounded-2xl shadow-2xl shadow-gray">
    <form
      onSubmit={handleUpdate}
      className=" w-full "
    >
      <div className="flex flex-col w-full items-start gap-6">
        <h1 className=" font-extrabold text-2xl font-poppins ">
          Update Profile
        </h1>
        <div className="mt-8 w-full grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="firstName"
                id="first-name"
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full rounded-2xl border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lastName"
                id="last-name"
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full rounded-2xl border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium px-2 leading-6 text-gray-900">
              Date Of Birth
            </label>
            <div className="mt-2">
              <input
                type="Date"
                name="age"
                id="first-name"
                onChange={(e) => setAge(e.target.value)}
                className="block w-full rounded-2xl border-0 py-1.5 pr-2 pl-2 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Gender
            </label>
            <div className="mt-2">
              <select
                name="gender"
                onChange={(e) => setGender(e.target.value)}
                className="block w-full rounded-2xl border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="none" selected disabled hidden>
                  Your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Profile picture
            </label>

            <div className="flex items-center justify-center w-full ">
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  name="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0]) }
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-9 flex items-center justify-start gap-x-6">
        {/* <button
          type="button"
          className="text-sm font-semibold leading-6 hover:text-principal text-gray-900"
        >
          Go to your Space
        </button> */}
        <button
          type="submit"
          className="rounded-2xl bg-indigo-600 bg-black px-3 py-2 text-sm font-semibold hover:bg-principal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save Changes
        </button>
      {user.role === 'coach' && <Modal/>}
      </div>
    </form>
    <div>
    <ChangerPass />
    </div>
    </div>

{ isLoading &&
    <Sprinner/>
    }
    </>
  );
};

export default UpdateUser;
