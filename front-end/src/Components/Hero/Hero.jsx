import React, { useEffect, useState } from "react";
import "./Hero.css";
import Herob from "../../assets/herob.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = (props) => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [textIndex, setTextIndex] = useState(0);
  const dataText = ['SUPER FLEXIBLE COACHING SYSTEM'];

  useEffect(() => {
    const typeWriter = (text, i, fnCallback) => {
      if (i < text.length) {
        setTypedText(text.substring(0, i + 1));
        setTimeout(() => {
          typeWriter(text, i + 1, fnCallback);
        }, 100);
      } else if (typeof fnCallback === 'function') {
        setTimeout(fnCallback, 700);
      }
    };

    const startTextAnimation = (i) => {
      if (typeof dataText[i] === 'undefined') {
        setTimeout(() => {
          startTextAnimation(0);
        }, 20000);
      } else if (i < dataText[i].length) {
        typeWriter(dataText[i], 0, () => {
          startTextAnimation(i + 1);
        });
      }
    };

    startTextAnimation(0);
  }, []);

  const [typedText, setTypedText] = useState('');

  return (
    <div className={`hero object-left-top flex ${props.opacity}`}>
      <div className="container">
        <div className=" leftSection">
          <img src={Herob} className="bottom-0 object-left-top" alt="" />
        </div>
        <div className="rightSection">
          <h1 className="text-2xl">
            {/* SUPER FLEXIBLE COACHING SYSTEM */}
            {typedText}
            <span className="border-r border-white ml-2 animate-caret"></span>
          </h1>
         

           {user && user.role ==='coach' &&  <button className="btnh text-white bg-principal hover:bg-white hover:text-principal rounded-2xl"><Link to='/coach' className=" no-underline">START KNOW</Link> </button>  } 
            {user && user.role ==='client' && <button className="btnh text-white bg-principal hover:bg-white hover:text-principal rounded-2xl"> <Link to='/client' className=" no-underline">START KNOW</Link> </button>   }
            {user && user.role ==='admin' && <button className="btnh text-white bg-principal hover:bg-white hover:text-principal rounded-2xl"> <Link to='/admin' className=" no-underline">START KNOW</Link> </button>  } 
            {!user && <button className="btnh text-white bg-principal hover:bg-white hover:text-principal rounded-2xl"> <Link to='/login' className=" no-underline">START KNOW</Link> </button>  } 

            
            
        </div>
      </div>
    </div>
  );
};

export default Hero;
