import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , Link } from 'react-router-dom';

const ProfileCard = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    
    const user = useSelector((state) => state.auth.user);
    console.log(user);

  
    function gererRoles() {
      if (user.role === 'client') {
        return '/client'
      } else if (user.role === 'coach') {
        return '/coach'
      } else {return '/admin'}
    }

  return (
<div className="  rounded-2xl w-full h-2/3 shadow-2xl shadow-gray">
              <div className="flex flex-col justify-center  h-full max-w-full p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                <img
                  src={user.photo}
                  alt="Avatar"
                  className=" w-32 h-32 object-cover mx-auto mb-4 rounded-full dark:bg-gray-500 aspect-square"
                />
                <div className="space-y-4 text-center divide-gray-700">
                  <div className="mb-8">
                    
                    <h2 className="text-xl font-semibold sm:text-2xl">
                      {user.firstName} {user.lastName}
                    </h2>
                  </div>

                  <div className=" text-left space-y-4 my-7 font-semibold " >
                  <hr/>
                    <h3>Email :&nbsp; {user.email}</h3>
                    <hr/>
                    <h3>Date of Birth :
                      &nbsp; {user.age.substring(0,10)}
                      </h3>
                    <hr/>
                    <h3>Gender :&nbsp; {user.gender}</h3>
                    <hr/>
                  </div>
                  <div class="mt-9 flex items-center justify-start gap-x-6">
                    <button
                      type="submit"
                      class="rounded-md bg-indigo-600 border-solid bg-white bg-opacity-40 hover:bg-opacity-100 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <Link to={gererRoles()}>Go to your space</Link>
                    </button>
            </div>
                </div>
              </div>
            </div>
  )
}

export default ProfileCard
