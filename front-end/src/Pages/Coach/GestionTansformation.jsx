import React, { useState } from 'react'
import Transformations from '../../Components/Transformations.jsx'
import { RiFileUploadLine } from 'react-icons/ri';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar.jsx';
import { axiosCoach } from '../../util/axios-config.jsx';
import Sprinner from '../../Components/Sprinner.jsx';

const GestionTansformation = () => {

    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formData = new FormData();
    formData.append('cdcFile' , file) ;

    const addTransformation = async (e) => {
        e.preventDefault() ; 
        try {
            setIsLoading(true) ; 
          const response = await axiosCoach.post(`/addtransformation`, formData );
          window.location.reload();
          setIsLoading(false) ; 
          console.log(response.data) ;
        } catch (err) {
          console.log(err);
        }
      };

  return (
<>
 <div className='flex'>
          <SideBar />
  
    <div className=' py-12 flex flex-col justify-center w-full h-full items-center'>
<div className=' flex flex-col mb-6 w-full  space-y-4 justify-center items-center '>

<div className='w-[70%] flex items-start justify-between'>
<Link to='/coach' ><FiArrowLeft size={'30px'}  /> </Link> 
<div className=" flex flex-col justify-center items-center button-wrapper">
<h1 className=' text-5xl font-[Montserrat] font-extrabold'>TRANFORMATIONS</h1>
    <label htmlFor="upload" className="label flex underline items-center space-x-2 text-principal text-center py-2 rounded-2xl text-xl font-poppins font-extrabold w-[300px]  px-4 cursor-pointer  text-uppercase  ">
      <RiFileUploadLine /> <h1>Upload Transformation</h1>
    </label>
      <input
        type="file"
        name="upload"
        id="upload"
        onChange={(e)=> setFile(e.target.files[0])}
        className="upload-box absolute z-10 w-full h-10 top-0 left-0 opacity-0 cursor-pointer"
        placeholder="Upload File"
      />
          </div>
          <button
          onClick={addTransformation} 
          className=' bg-principal font-medium hover:bg-opacity-0 border-2 hover:border-2 hover:text-principal border-principal hover:border-principal text-lg px-6 py-2 rounded-2xl text-white'>Save</button>
    </div>
</div>


      <Transformations /> 
    </div>
    </div>


    {  isLoading === true &&  <>
<Sprinner />
</> }


    </> 
  )
}

export default GestionTansformation ;
