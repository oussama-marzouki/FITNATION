import React from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Meal = (props) => {
  return (
    <div className=" flex flex-col bg-clientd bg-cover backdrop-blur-lg  w-72  rounded-3xl gap-1 shadow-md hover:shadow-xl hover:scale-110 duration-300 px-3 pb-3  overflow-hidden">
      <Link
        to="/clientfoods"
        state={{ id: props.id, name: props.name }}
        className="hover:text-rose-500 flex-col pt-7 h-full no-underline space-y-3 duration-300 mt-2 flex justify-between items-center"
      >
        <h2 className="text-white font-bold font-[Montserrat] uppercase text-2xl">
          {props.name}
        </h2>
        
        <Link className="hover:text-rose-50 text-gray-900 duration-300 w-full no-underline  flex justify-between items-center">
          <button className="text-sky-400 px-2 py-1  w-full flex items-center justify-end space-x-1 opacity-60 text-white p-2 rounded-md hover:bg-sky-400 hover:text-sky-50 duration-300">
            <h1>Foods</h1> <FiArrowRight className="mt-1" />
          </button>
        </Link>
      </Link>
    </div>
  );
};

export default Meal;
