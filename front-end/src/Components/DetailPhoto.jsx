// import React, { useEffect, useState } from "react";
// import { axiosCoach } from "../util/axios-config";
// import { toast } from "react-toastify";

// export default function DetailPhoto(props) {
//   const [showModal, setShowModal] = React.useState(false);

//   return (
//     <>
//       <button
//         className=" text-black active:bg-pink-600 font-bold  text-sm rounded-2xl px-3 py-2 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//         type="button"
//         onClick={() => setShowModal(true)}
//       >
//              <img
//                 src={exercice.photo}
//                 className=" h-14 w-14 bg-white rounded-full border p-1"
//                 alt="..."
//               />
//       </button>
//       {showModal ? (
//         <>
//           <div
//             className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
//           >
//             <div className="relative w-auto my-6  mx-auto max-w-3xl">
    
//               <div className="border-0 rounded-lg bg-adminb bg-cover shadow-lg  relative flex flex-col w-full  outline-none focus:outline-none">

//                 <img src={props.photo} alt="" />

//               </div>
//             </div>
//           </div>
//           <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//         </>
//       ) : null}
//     </>
//   );
// }