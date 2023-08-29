import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import coach from "../assets/coach1.jpg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { axiosAthlete } from "../util/axios-config";
import { useDispatch } from 'react-redux';
import { setId } from '../Redux/features/idSlice';
import AlbumTransformation from "./AlbumTransformation";
import { BiPhotoAlbum } from "react-icons/bi";

const CoachCard = (props) => {

  const dispatch = useDispatch();

//const [rating , setRating] = useState(0) ; 


  const getoffre = async (e) => { 
    e.preventDefault() ;
    try {
      dispatch(setId(props.id)) ;
      const response = await axiosAthlete.post(`/payement` , {amount : props.price*1000 , id : props.id});
      const { result } = response.data ;
      window.location.href = result.link ; 
      console.log(response.data); 
    } catch (err) {
      console.log(err);
    }
    console.log(props.price) ;
  };
  


  return (
    <div key={props.id} className="single-product flex flex-col bg-[#28282B] backdrop-blur-lg pb-3 items-center rounded-3xl gap-1 shadow-md hover:shadow-xl hover:scale-105 duration-300 overflow-hidden">
      <div className="flex w-[94%] pt-3 items-center justify-center">
        <img
          className="w-[100%] h-[300px] object-cover hover:scale-100 rounded-3xl duration-500"
          src={props.photo}
        />
      </div>
      <div className="flex flex-col justify-start mt-2 space-x-1 items-start w-[90%]">
      <Link className="hover:text-rose-500 no-underline duration-300 flex justify-between items-center">
        <h2 className="text-white font-semibold text-2xl capitalize">{props.firstName} {props.lastName}</h2>
      </Link>
      <p className=" text-xs w-[90%] text-white text-justify">
      {props.bio}
      </p>
      <p className="text-xl font-semibold uppercase text-principal">
       price : <span className="font-semibold capitalize"> {props.price} dt</span>
      </p>
      </div>
      <div className="flex justify-between pt-2 items-center px-2  h-full  w-full  ">
        {/* <Link className="hover:text-rose-50 text-gray-900 no-underline duration-300 flex justify-between items-center">
          <button className="text-sky-400 px-2 py-1 border border-principal text-principal rounded-md hover:bg-sky-400 hover:text-sky-50 duration-300">
            See Transformations
          </button>
        </Link> */}
       {/* <Link
          to="/inscription"
          state={{ id: props.id }}> */}
          <div className="flex w-[100%] items-center justify-start space-x-2   h-fit">
        <button
          onClick={getoffre}
          className="bg-sky-400 flex  justify-center  items-center  space-x-2 hover:bg-opacity-0 hover:text-principal hover:border-principal hover:border  text-sky-50 hover:bg-sky-50 w-[150px] text-start bg-principal hover:text-sky-400 duration-300 px-1 py-1 rounded-md"
        >
           <h1 className=" uppercase">Get His Offre</h1> <AiOutlineShoppingCart/>
        </button>
{  props.trans.length > 0 &&     
 <button
        className=" text-principal uppercase "
        onClick={() => {
          props.handelmodal(true) ;
          props.handelGetTrans(props.id) ;
        }}
        >
          <BiPhotoAlbum size={'30px'} />
        </button>
        }
        {/* </div> */}

          
<div class="flex justify-center space-x-1 items-center">
    {[1, 2, 3, 4, 5].map((value) => (
               <svg 
               key={value}
               //onClick={() => setRating(value)}
               style={{ cursor: 'pointer', color: value <= props.rating ? 'gold' : 'gray' }}
               aria-hidden="true" color="gold" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                
                
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>    
        ))}
       <h1 className=" text-principal"> ( {props.ratesnumber} )</h1>
</div>
</div>

 
       
        {/* </Link> */}
      </div>
    </div>
  );
};

export default CoachCard;
