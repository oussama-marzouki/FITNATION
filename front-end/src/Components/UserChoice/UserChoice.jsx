import React, { useState } from "react";
import "./UserChoice.css";

const UserChoice = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button onClick={togglePopup}>START NOW</button>

      {showPopup && (
        <div className="popup w-full ">
          <div className="overlay" onClick={togglePopup}></div>
          <p className="text-2xl">WHO YOU ARE ?</p>
          <div className="roles space-x-3 h-full flex">
            <div className="coachpath w-1/3 h-full rounded-3xl">
              <div className="cover1 w-full h-full rounded-3xl">
                <h1 className="text-5xl text-principal">COACH</h1>
              </div>
            </div>
            <div className="clientpath w-1/3 h-full rounded-3xl">
              <div className="cover1 w-full h-full rounded-3xl">
                <h1 className="text-5xl text-principal">CLIENT</h1>
              </div>
            </div>
            <div className="adminpath w-1/3 h-full rounded-3xl">
              <div className="cover1 w-full h-full items-center rounded-3xl">
                <h1 className="text-5xl text-principal">ADMIN</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserChoice;
