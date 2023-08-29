import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserChoice from "../../Components/UserChoice/UserChoice";
import { logout, reset } from "../../Redux/features/authSlice";

const InterfaceCoach = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  console.log("hiiiiiiiiii");
  console.log(user);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <h1>Coach : {user.firstName}</h1>
      <button onClick={logoutHandler}> Logout </button>
      <UserChoice />
    </div>
  );
};

export default InterfaceCoach;
