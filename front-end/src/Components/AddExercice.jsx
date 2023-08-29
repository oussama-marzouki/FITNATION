import React, { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { axiosCoach } from '../util/axios-config';
import { RiFileUploadLine } from 'react-icons/ri';

const AddExercice = (props) => {
  
  function handleClick() {
    props.onUpdate();
  }
    
 


  const [name, setName] = useState("");
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  // const [photo, setPhoto] = useState("");

  const formData = new FormData();
  formData.append('name', name);
  formData.append('reps', reps);
  formData.append('sets', sets);
  formData.append('description', description);
  formData.append('cdcFile' , file) ;

  //{name: name , reps: reps , sets: sets , description: description }
  const addExercice = async (e) => {
    e.preventDefault() ; 
    try {
      props.handleIsLoading(true) ; 
      const response = await axiosCoach.post(`/addexercice/${props.workoutid}`, formData );
      window.location.reload();
      props.handleIsLoading(false) ; 
      console.log(response.data) ;
    } catch (err) {
      console.log(err);
    }
  };

  

  return (
<>

{/* {isLoading && ( */}


{/* 
<div role="status" className='w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed bg-black bg-opacity-30 backdrop-blur-lg inset-0 z-50 outline-none focus:outline-none'>
    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div> */}

  {/* )} */}

<div className=" flex text-black shadow-2xl bg-principal justify-between items-center rounded-2xl px-6 mt-3 w-[95%] ">

<form action="" onSubmit={addExercice} className=" flex items-center justify-center py-2 space-x-2 w-full" >
{/* <button type="submit" className=" w-fit  h-11 rounded-xl" ><CiCirclePlus className=' hover:text-white' size={'40px'} /> </button> */}
<input type="text" name="" id="" placeholder="Name" className=" rounded-xl pl-3 placeholder:text-sm text-sm w-1/6 h-9" onChange={(e) => setName(e.target.value)}/>
<input type='number' id="" placeholder="Reps" min={1} className=" rounded-xl pl-3 text-sm placeholder:text-sm w-1/6 h-9" onChange={(e) => setReps(e.target.value)} />
<input type='number' name="" id=""placeholder="Sets" min={1} className=" rounded-xl pl-3 placeholder:text-sm text-sm w-1/6 h-9" onChange={(e) => setSets(e.target.value)} />
<input type='text' name="" id="" placeholder="Description" className=" rounded-xl pl-3 placeholder:text-sm text-sm w-1/2 h-9" onChange={(e) => setDescription(e.target.value)} /> <br />


<label htmlFor="upload" className="label flex underline items-center space-x-1 text-black text-center py-2 rounded-2xl text-sm font-poppins font-extrabold w-[230px]  cursor-pointer  text-uppercase  ">
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
{/* <input className="block text-sm text-gray-900 w-[380px] h-7 placeholder:text-sm rounded-none cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
aria-describedby="file_input_help" 
id="file_input" 
type="file"
onChange={(e) => setFile(e.target.files[0]) }/> */}

<button type="submit" className=" w-fit flex items-center bg-black h-fit bg-opacity-40 border-black border-2 px-7 text-white py-1 rounded-2xl" > <h1>ADD</h1>   </button>

</form>

<button className=' ml-2' onClick={handleClick} ><RxCross2 size={'25px'}/></button>
</div>

</>
  )
}

export default AddExercice
