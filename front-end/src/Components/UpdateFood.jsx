import React, { useState } from "react";
import { axiosCoach } from "../util/axios-config";
import { FaRegEdit } from "react-icons/fa";
import { RiFileUploadLine } from "react-icons/ri";

const UpdateFood = (props) => {

    const [name, setName] = useState("");
    const [quantite, setQuantite] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    // const [photo, setPhoto] = useState("");
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('quantite', quantite);
    formData.append('description', description);
    formData.append('cdcFile' , file) ;
  

    const UpdateExercice = async (e) => {
      e.preventDefault() ; 
      try {
        props.handleIsLoading(true) ;
        const response = await axiosCoach.patch(`/updatefood/${props.foodid}`, formData);
        //console.log(response.data) ;
        window.location.reload();
        props.handleIsLoading(false) ;

      } catch (err) {
        console.log(err);
      }
    };

  return (
    <>
      <div className=" ">
        <form
          action=""
          onSubmit={UpdateExercice}
          className=" flex items-center justify-center py-2 space-x-2 w-full"
        >
          {/* <button type="submit" className=" w-fit  h-11 rounded-xl">
            <FaRegEdit className=" hover:text-principal" size={"35px"} />{" "}
          </button> */}
          <input
            type="text"
            name=""
            id=""
            placeholder="Name"
            className=" rounded-xl border pl-3 placeholder:text-sm text-sm w-1/6 h-9"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            id=""
            placeholder="Quantite"
            min={1}
            className=" rounded-xl border pl-3 text-sm placeholder:text-sm w-1/6 h-9"
            onChange={(e) => setQuantite(e.target.value)}
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Description"
            className=" rounded-xl border pl-3 placeholder:text-sm text-sm w-1/2 h-9"
            onChange={(e) => setDescription(e.target.value)}
          />{" "}
          <br />
          <label htmlFor="upload" className="label flex underline items-center space-x-1 text-black text-center py-2 rounded-2xl text-sm font-poppins font-extrabold w-[190px]  cursor-pointer  text-uppercase  ">
      <RiFileUploadLine size={'20px'} /> <h1>Upload Exercice</h1>
    
      <input
        type="file"
        name="upload"
        id="upload"
        onChange={(e)=> setFile(e.target.files[0])}
        className="upload-box absolute z-10 w-0 h-11 top-11 left-0 opacity-80 cursor-pointer"
        placeholder="Upload File"
      />
      </label>
          {/* <input
            class="block text-sm text-gray-900 w-[380px] h-7 placeholder:text-sm rounded-none cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={(e) => setFile(e.target.files[0]) }
          /> */}

<button type="submit" className=" w-fit flex items-center bg-black h-fit bg-opacity-40 border-black border-2 px-7 text-white py-1 rounded-2xl" > <h1>UPDATE</h1>   </button>
        </form>
      </div>
    </>
  );
};

export default UpdateFood;
