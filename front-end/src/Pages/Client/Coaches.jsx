import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CoachCard from "../../Components/CoachCard";
import { BiArrowBack } from "react-icons/bi";
import { axiosAthlete } from "../../util/axios-config";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);
  // const [filteredCoachs, setFilteredCoachs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);

  /// PAGINATION
  const items = 6;
  const [current, setCurrent] = useState(1);
  const NbPage = Math.ceil(coaches.length / items);
  const startIndex = (current - 1) * items;
  const endIndex = startIndex + items;

  const dataPerPage = coaches.slice(startIndex, endIndex);

  useEffect(() => {
    getCoaches();
    getTransformation();
    //console.log(images);
  }, []);

  ////////////////////////// GET COACHES ////////////////////////
  const getCoaches = async () => {
    try {

      const response = await axiosAthlete.get(`/getcoaches`);
      setCoaches(response.data);
      //console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handelmodal = (data) => {
    setShowModal(data);
  };
  const handelGetTrans = (data) => {
    getTransformation(data);
  };

  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrev = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const handleNext = () => {
    setCurrentImage((prevImage) =>
      prevImage === images.length - 1 ? 0 : prevImage + 1
    );
  };

  const getTransformation = async (id) => {
    try {
      const response = await axiosAthlete.get(`/gettransformation/${id}`);
      console.log(response.data);
      setImages(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mx-auto pb-20">
        <div className=" flex items-center justify-center space-x-96 pr-96 mr-5 ">
          {" "}
          <Link to="/client">
            <BiArrowBack size={"28px"} />
          </Link>
          <h2 className="text-center text-5xl underline decoration-principal uppercase font-bold py-10">
            All Coaches
          </h2>
        </div>
        <div className="flex flex-col justify-between gap-10">
          <div className="w-[100%] bg-gray-50 flex flex-col gap-3  pt-2">
            <form className=" w-full">
              <label
                for="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className=" w-[90%] flex ml-16 items-center justify-center relative">
                <div className="absolute inset-y-0 left-8 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                  className="block w-[95%] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder:capitalize dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Find a specific Coach"
                  required
                />
                {/* <button type="button" onClick={handleSearch} className="text-white absolute right-2.5 bottom-2.5 w-24 text-lg top-2 text-center justify-center flex items-center bg-principal hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
              </div>
            </form>
          </div>
          <div className=" flex justify-center items-center">
            <div className="grid grid-cols-3 gap-5 w-[85%] ">
              {dataPerPage
                .filter((asd) =>
                  asd.user.firstName.toLowerCase().includes(searchText)
                )
                .map((coach) => (
                  <CoachCard
                    handelmodal={handelmodal}
                    handelGetTrans={handelGetTrans}
                    id={coach.coach._id}
                    firstName={coach.user.firstName}
                    lastName={coach.user.lastName}
                    bio={coach.coach.bio}
                    price={coach.coach.price}
                    photo={coach.user.photo}
                    trans={coach.coach.transformations}
                    rating={coach.coach.totalrating}
                    ratesnumber = {coach.ratesnumber}
                  />
                ))}
            </div>
          </div>
          <div className=" flex justify-center space-x-4 items-center ">
            {Array.from({ length: NbPage }, (_, i) => i + 1).map((page) => {
              return (
                <div>
                  {" "}
                  <button
                    onClick={() => setCurrent(page)}
                    className=" px-4 rounded-3xl py-2 bg-principal"
                  >
                    {page}
                  </button>{" "}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showModal ? (
        <>
          <div
            //onClick={() => setShowModal(false)}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed bg-black bg-opacity-30 backdrop-blur-lg inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative flex justify-center items-center w-full my-6 mx-auto max-w-3xl">
              <div
                className="overlay text-black "
                onClick={() => setShowModal(false)}
              ></div>
              <div className=" rounded-2xl flex items-center justify-center space-x-4  mt-8 w-[70%] ">
                <button
                  onClick={handlePrev}
                  className="  items-center flex  bg-white bg-opacity-40  hover:bg-opacity-100    p-2 rounded-full"
                >
                  <FiArrowLeft size={"30px"} />
                </button>

                <div className="h-[100%] w-[100%] flex bg-black rounded-3xl bg-opacity-30 items-center justify-center ">
                  {images.length > 0 ? (
                    <img
                      //key={index}
                      // alt={`Image ${index}`}
                      src={images[currentImage]}
                      className={` h-[500px] object-contain  flex `}
                    />
                  ) : (
                    <h1 className=" text-3xl text-white py-8 w-full font-poppins ">
                      No transformations exist! 
   
                    </h1>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  className=" items-center  bg-white bg-opacity-40  hover:bg-opacity-100 flex   p-2 rounded-full"
                >
                  <FiArrowRight size={"30px"} />
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black">oussama</div>
        </>
      ) : null}
    </>
  );
};

export default Coaches;
