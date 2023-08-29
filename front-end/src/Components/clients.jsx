import React, { useEffect, useState } from "react";
import { axiosCoach } from "../util/axios-config";
import Popup from "./Popup";
import { toast } from "react-toastify";

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    try {
      const response = await axiosCoach.get("/getclients");
      setClients(response.data);
    } catch (err) {
      console.log(err);
    }
  };


  const deleteClient = async (e, clientId) => {
    e.preventDefault() ; 
    try {
      
      const response = await axiosCoach.patch(`/deleteclient/${clientId}`);
      toast.success(response.data.message) ; 
      window.location.reload();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" px-10">
      <div
        className={`relative flex flex-col min-w-0 break-words w-full mb-8 shadow-2xl bg-white bg-opacity-30 rounded-lg text-blueGray-700`}
      >
        <div className="px-6 py-4 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h3 className="font-bold text-lg text-blueGray-700">
                CLIENTS LIST
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 align-middle text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-boldtext-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                  Client
                </th>
                <th className="px-6 align-middle text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold  bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                  Goal
                </th>
                <th className="px-6 align-middle border text-center border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold  bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                  Completion
                </th>
                <th className="px-6 align-middle border text-center  border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold  bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                  Validation
                </th>
                <th className="px-6 align-middle border text-center  border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-bold bg-blueGray-100 text-blueGray-500 border-blueGray-200"></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr className="" key={client._id}>
                  <td className="border-t-0 px-6 align-middle w-64 border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center justify-start  pl-5 w-56 b space-x-6">
                      <img
                        src={client.photo}
                        className="h-12 w-12 object-cover bg-white rounded-full border "
                        alt="..."
                      />
                      <span className="ml-3 uppercase font-bold NaN">
                        {client.firstName} {client.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex text-sm justify-center font-semibold items-center">{client.goal}</div>
                  </td>
                  <td className="border-t-0 px-6 items-center justify-center pl-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex justify-center items-center">
                      { client.workoutcompleted === true && client.dietcompleted === true &&
                      <h2 className=" text-[green] font-bold">COMPLETED</h2> }
                      { client.workoutcompleted === false || client.dietcompleted === false &&
                      <h2 className=" text-redc font-bold">NO COMPLETED</h2> }
                      { client.workoutcompleted === false && client.dietcompleted === false &&
                      <h2 className=" text-redc font-bold">NO COMPLETED</h2> }
                    </div>
                  </td>
                  <td className=" flex justify-center items-center  h-full px-6 pt-5 text-xs space-x-1">
                    <button>
                      <Popup
                        id={client._id}
                        firstName={client.firstName}
                        lastName={client.lastName}
                        height={client.height}
                        weight={client.weight}
                        goal={client.goal}
                        age={client.age}
                        gender={client.gender}
                        workoutPlan={client.workoutPlan}
                        dietPlan={client.dietPlan}
                        dietcompleted={client.dietcompleted}
                        workoutcompleted={client.workoutcompleted}
                      />
                    </button>
                  </td>
                  <td className=" px-6 text-xs space-x-1">
                    <button
                      type="button"
                      onClick={(e) => deleteClient(e, client._id)}
                      className=" bg-redc rounded-full text-xl px-3 hover:bg-none hover:border-solid  h-11 w-11 font-semibold hover:border-redc text-white"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clients;
