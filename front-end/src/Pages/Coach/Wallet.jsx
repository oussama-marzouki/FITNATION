import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import { useSelector } from "react-redux";
import { FaMoneyBillWave, FaUsers } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { axiosCoach } from "../../util/axios-config";

const Wallet = () => {

  const [showModal, setShowModal] = useState(false);

  const [price, setPrice] = useState(0);
  const [priceforupdate, setPriceforupdate] = useState(0); 
  const [number, setNumber] = useState(0);

  useEffect(() => {

    getPrice();
    console.log(price);

  },[]);
  
    ////////////////////////// GET CLIENTS NUMBER ////////////////////////
    const getPrice = async () => { 
      try {
        const response = await axiosCoach.get(`/getprice`);
        setPrice(response.data.price); 
      } catch (err) {
        console.log(err);
      }
    };


    useEffect(() => {
  
      getClientsNumber();
      console.log(number);
  
    },[]);
    
      ////////////////////////// GET CLIENTS NUMBER ////////////////////////
      const getClientsNumber = async () => { 
        try {
          const response = await axiosCoach.get(`/getclientsnumber`);
          setNumber(response.data.clientsNumber); 
        } catch (err) {
          console.log(err);
        }
      };

            ////////////////////////// UPDATE PRICE ////////////////////////
            const PriceUpdateHandler = async () => { 
              try {
                const response = await axiosCoach.patch(`/updateprice` , {price : priceforupdate});
                console.log(response.data) ;
              } catch (err) {
                console.log(err);
              }
            };



  const user = useSelector((state) => state.auth.user);
  

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col mx-12 items-start p-5 justify-center w-full h-full">
        <div className=" bg-wallet bg-cover  w-full rounded-3xl pt-6 ">
          <h1 className=" text-[50px] ml-6 text-white border- uppercase font-[Montserrat]  mb-4 font-medium text-start">
            <span className="bg-white w-fit text-black font-bold px-4">
              {user.firstName} this is your
            </span>{" "}
            <br />{" "}
            <span className="bg-white w-fit text-black font-bold px-4">
              {" "}
              Personal Wallet{" "}
            </span>{" "}
          </h1>
          <div className=" rounded-3xl h-fit p-8 justify-center items-center  space-y-7 bg-[#28282B] flex flex-col w-full">
            <div className=" w-full h-full  flex flex-col rounded-3xl bg-principal">
              <div className=" w-full h-full pl-6 py-3 justify-between pr-6 space-x-4 flex items-center rounded-3xl bg-principal">
                <div className=" flex items-center space-x-3">
                  <FaUsers className=" w-12 h-12" />{" "}
                  <h1 className=" text-xl">Clients Number : {number} client</h1>
                </div>

              </div>
              <div className=" w-full h-fit py-4 rounded-3xl flex flex-col items-center justify-center bg-white">
               <div className="flex font-[Montserrat] space-x-4  ">  
                <h1 className=" text-3xl">Price of 6 weeks : {price} DT </h1> <button onClick={() => setShowModal(true)} className=" bg-principal py-2 px-4 rounded-2xl font-bold hover:bg-black hover:text-principal text-xl">Change Price</button>          
               </div> 
               {showModal ? 
               <div className=" flex text-white py-2 px-4 shadow-2xl bg-[#28282B] items-center rounded-2xl h-fit mt-4 w-[52%] ">

<form  action="" onSubmit={PriceUpdateHandler} className=" flex items-center justify-center space-x-7 w-full" 

>
<input type="number" name="" min={0} id="" placeholder="Price" onChange={(e)=>setPriceforupdate(e.target.value)} className=" rounded-2xl pl-3 placeholder:text-xs w-[70%] h-11"/>
<button type="submit" className=" w-1/6 h-11 bg-principal mr-3 rounded-2xl" >CHANGE</button>
</form>

<button 
onClick={()=>setShowModal(false)}
><RxCross2 size={'25px'}/></button>
</div>
: null}
             
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
