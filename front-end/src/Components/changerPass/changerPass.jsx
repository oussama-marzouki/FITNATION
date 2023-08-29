import React, { useState } from "react";
import { axiosClient } from "../../util/axios-config";
import axios from "axios";
import { toast } from "react-toastify";

const ChangerPass = () => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const data = { oldPassword, password };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosClient.patch("/changepassword", data) ; 
      toast.success(response.data) ;
    } catch (error) {
      toast.error(error.response.data.message);
    }

    // await axiosClient.patch("/changepassword", data)
    // .then((response) => { toast.success(response.data) ;  })
    // .catch((response)=>{ toast.error(Error.message) ; });
    
  };

  return (
    <fieldset className=" border-solid rounded-3xl p-4 w-full border-black border-[0.5px] mt-4">
      <legend className=" ml-7 p-2">Change password</legend>
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="block w-full rounded-2xl border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <input
          type="password"
          name="oldPassword"
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old password"
          className="block w-full rounded-2xl border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <input
          type="submit"
          value="change"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold hover:bg-principal text-white shadow-sm  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </form>
    </fieldset>
  );
};

export default ChangerPass;
