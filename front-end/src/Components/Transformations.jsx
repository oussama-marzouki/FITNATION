import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { axiosCoach } from "../util/axios-config";
import { toast } from "react-toastify";

export default function Transformations() {

  const [images , setImages] = useState([]) ; 
  const [currentImage, setCurrentImage] = useState(0);


  const handlePrev = () => {
    setCurrentImage((prevImage) => (prevImage === 0 ? images.length - 1 : prevImage - 1));
  };

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage === images.length - 1 ? 0 : prevImage + 1));
  };


  useEffect(() => {
    getTransformation();

  },[images]);

  //////////////////  get tronsformations ///////////////////
  const getTransformation = async () => { 
    try {
      const response = await axiosCoach.get(`/gettransfomrations`);
      //console.log(response.data) ;
      setImages(response.data); 
    } catch (err) {
      console.log(err);
    }
}


  //////////////////  delete tronsformations ///////////////////
const deleteTransformation = async (e , index) => { 
  e.preventDefault() ; 
  try {
    const response = await axiosCoach.patch(`/deletetransformation/${index}`);
    //console.log(response.data) ;
    toast.success(response.data.message) ;
  } catch (err) {
    console.log(err);
  }
}


  return (

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
  {/* <button className=" absolute bg-redc left-[450px] top-[320px]">delete</button> */}
{ images.length > 0 ?  <div> <button 
onClick={(e) => deleteTransformation(e , currentImage)}
className="absolute py-2 px-4 text-white rounded-2xl font-semibold opacity-40 hover:opacity-100 uppercase bg-redc left-[445px] top-[320px]">delete</button> <img
       // key={index}
      //  alt={`Image ${index}`}
        src={images[currentImage]}
        className={` h-[500px] object-contain  flex `}
    /> </div> : <h1 className=" text-2xl py-8 font-poppins ">No transformations exist! <br />
       <span  className=" text-lg">Add ones if you want </span> 
    </h1> }

</div>

    </div>

  );

}
