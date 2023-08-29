import React, { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { axiosCoach } from '../util/axios-config';
import { RiFileUploadLine } from 'react-icons/ri';

const AddFood = (props) => {


  function handleClick() {
    props.onUpdate();
  }

  const [name, setName] = useState("");
  const [quantite, setQuantite] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const formData = new FormData();
  formData.append('name', name);
  formData.append('quantite', quantite);
  formData.append('description', description);
  formData.append('cdcFile' , file) ;

  const addFood = async (e) => {
    e.preventDefault() ; 
    try {
      //console.log(formData) ;
      props.handleIsLoading(true) ;
      const response = await axiosCoach.post(`/addfood/${props.mealid}`, formData );
      window.location.reload();
      props.handleIsLoading(false) ; 
      //console.log(response.data) ;
    } catch (err) {
      console.log(err);
    }
  };

  return (
<>

<div className=" flex text-black shadow-2xl bg-principal justify-between items-center rounded-2xl px-6 mt-3 w-[95%] ">

<form action="" onSubmit={addFood} className=" flex items-center justify-center py-2 space-x-2 w-full" >
{/* <button type="submit" className=" w-fit  h-11 rounded-xl" ><CiCirclePlus className=' hover:text-white' size={'40px'} /> </button> */}
<input type="text" name="" id="" placeholder="Name" className=" rounded-xl pl-3 placeholder:text-sm text-sm w-1/6 h-9" onChange={(e) => setName(e.target.value)}/>
<input type='text' name="" id=""placeholder="Quantite" className=" rounded-xl pl-3 placeholder:text-sm text-sm w-1/6 h-9" onChange={(e) => setQuantite(e.target.value)} />
<input type='text' name="" id="" placeholder="Description" className=" rounded-xl pl-3 placeholder:text-sm text-sm w-1/2 h-9" onChange={(e) => setDescription(e.target.value)} /> <br />



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


{/* <input class="block text-sm text-gray-900 w-[380px] h-7 placeholder:text-sm rounded-none cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
 aria-describedby="file_input_help"
 id="file_input"
 onChange={(e) => setFile(e.target.files[0]) }
 type="file" 
 /> */}


<button type="submit" className=" w-fit flex items-center bg-black h-fit bg-opacity-40 border-black border-2 px-7 text-white py-1 rounded-2xl" > <h1>ADD</h1>   </button>
</form>

<button className=' ml-2' onClick={handleClick} ><RxCross2 size={'25px'}/></button>
</div>

</>
  )
}

export default AddFood
