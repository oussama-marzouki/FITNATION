import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Calc from "../assets/calc.png";

const Result = (props) => {

    const [showModal, setShowModal] = useState(false);

  return (
    <>
    
    <button
        className="text-white bg-principal font-bold uppercase text-sm px-6 py-3 rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="submit"
        onClick={() => setShowModal(true)}
      >
        CALCULATE
      </button>
      {showModal ? (
        <>
          <div
            className=" fixed flex items-center justify-center backdrop-blur-lg inset-0 z-50 "
            // onClick={() => setShowModal(false)}
          >

            <div className="relative w-2/5 justify-center h-80 space-x-3 items-center">
              {/*content*/}
              <div className="overlay text-black" onClick={() => setShowModal(false)}></div>
              <div className="border-0 rounded-2xl flex-col items-center justify-center h-fit p-6 pb-10 space-y-4 bg-[#28282B] text-principal mt-6 flex w-[90%] bg-none outline-none focus:outline-none">
             
              <img src={Calc} className=' w-52 ' alt="" />
                {/*body*/}
                <h1 className=' text-2xl w-1/2'>Protein : {props.protein} g </h1>
                <hr className=' text-white' />
                <h1 className=' text-2xl w-1/2'>Carbs : {props.carbs} g </h1>
                <hr />
                <h1 className=' text-2xl w-1/2'>Fat : {props.fat} g </h1>


              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black">
          </div>
        </>
      ) : null}
    
    </>
  )
}

export default Result
