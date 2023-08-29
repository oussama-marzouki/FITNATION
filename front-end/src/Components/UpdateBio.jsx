import React, { useEffect, useState } from "react";
import { axiosCoach } from "../util/axios-config";
import { toast } from "react-toastify";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const [bio , setBio] = useState() ; 


  useEffect(() => {
    getBio();
  },[]);

  const getBio = async () => { 
    try {
      const response = await axiosCoach.get(`/getbio`);
      setBio(response.data.bio); 
    } catch (err) {
      console.log(err);
    }
}

const updateBio = async () => { 
    try {
      await axiosCoach.patch(`/updatebio` , {bio});
      toast.success('Bio updated successfuly');
      setShowModal(false) ;
    } catch (err) {
        toast.error(err.response.data.message);
    }
}


  return (
    <>
      <button
        className=" text-black active:bg-pink-600 font-bold  text-sm rounded-2xl px-3 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Change your bio
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6  mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg bg-adminb bg-cover shadow-lg  relative flex flex-col w-full  outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between ml-7 font-bold pt-5  border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-principal font-semibold">
                   Change you bio 
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl rounded-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative pb-6 pt-4 px-6 flex-auto">
                  <textarea 
                  onChange={(e)=>setBio(e.target.value)}
                  placeholder={bio}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="" id="" cols="90" rows="10"></textarea>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center px-6 pb-6 0 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className=" bg-principal rounded-2xl text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={updateBio}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}