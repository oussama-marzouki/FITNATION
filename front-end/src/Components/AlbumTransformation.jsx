import React, { useEffect, useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { axiosAthlete } from '../util/axios-config';

const AlbumTransformation = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [images , setImages] = useState([]) ; 
    const [currentImage, setCurrentImage] = useState(0);
  
    const handlePrev = () => {
      setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
    };
  
    const handleNext = () => {
      setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
    };
  
  
    useEffect(() => {
      getTransformation(props.id);
      console.log(images) ;
    },[]);
  
    const getTransformation = async (id) => { 
      try {
        const response = await axiosAthlete.get(`/gettransfomration/${id}`);
        console.log(response.data) ;
        setImages(response.data); 
      } catch (err) {
        console.log(err);
      }
  }

  return (

    <>
      
      <button onClick={() => {setShowModal(true) ; }}className=" h-24 w-24 bg-white rounded-2xl border p-1">
        Transformations 
      </button>

      {showModal ? (
        <>
    <div className=" rounded-2xl flex items-center justify-center  mt-8 w-[70%] ">
      <button
        onClick={handlePrev}
        className="absolute  items-center flex bg-white  mt-12 bg-opacity-40  hover:bg-opacity-100 transform -translate-y-2/4 left-[470px] p-2 rounded-full"
      >
         <FiArrowLeft size={'30px'}  />
      </button>
      <button
        onClick={handleNext}
        className="absolute items-center mt-12 bg-white bg-opacity-40  hover:bg-opacity-100 flex transform -translate-y-2/4 right-56 p-2 rounded-full"
      >
         <FiArrowRight size={'30px'}  />
      </button>


 <div  className="h-[80%] w-[100%] flex bg-black rounded-3xl bg-opacity-30 items-center justify-center ">
{ images.length > 0 ?   <img
       // key={index}
      //  alt={`Image ${index}`}
        src={images[currentImage]}
        className={` h-[500px] object-contain  flex `}
    /> : <h1 className=" text-2xl py-8 font-poppins ">No transformations exist! <br />
       <span  className=" text-lg">Add ones if you want </span> 
    </h1> }

</div>

    </div>

        </>
      ) : null}


    </>
  )
}

export default AlbumTransformation
