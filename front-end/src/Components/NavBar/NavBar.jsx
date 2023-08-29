import React from 'react'
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import logoNav from '../../assets/Logo.png'
import UserChoice from '../UserChoice/UserChoice'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../../Redux/features/authSlice'

const NavBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  // console.log(user);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
//     <div className='flex m-4 mx-12 relative px-5 box-content items-center justify-between text-center'>
//     <div  className='' >
//       <img src={logoNav} className='w-8/12' alt="LOGO" />
//     </div>
    
//     <div className='space-x-16 inline-flex justify-center items-center p-4 font-medium text-xl  w-full md:block md:w-auto ' id="navbar-default">
//         <Link className='no-underline hover:underline'>about</Link>
//         <Link className='no-underline hover:underline'>contact</Link>
//         <Link className='no-underline hover:underline'>services</Link>
//     </div>
//     <div className=' button1 flex space-x-5 font-medium text-xl '>
//         {/* <button className=''><Link to='/register' className='no-underline' >Sign Up</Link></button> 
//         <Link to='/login' className='no-underline'>Sign In</Link>
//         */}
        
//         <button className='btnl bg-principal text-white px-4 my-5 h-10 rounded-2xl max-w-md'><Link to='/login' className='no-underline'>Sign In</Link></button>
//     </div>
// </div>

<div
className={`flex mr-4 ml-4 my-4 bg-white w-full border-b-2 shadow-2xl justify-between items-center`}
id=""
>
<Link to='/'>
<div className="flex justify-center h-full items-center">
<img src={logoNav} 
 //onClick={() => navigate("/")} 
 className=" h-12 mr-3" alt="LOGO" /> 
</div>
</Link> 


<div
  className="space-x-16 inline-flex justify-center items-center font-medium text-xl w-full md:block md:w-auto "
  id="navbar-default"
>
  {/* <Link to='/' className="no-underline hover:underline"></Link> */}
  <HashLink className='no-underline hover:underline' smooth to="/#content">about</HashLink>
  <Link to='/' className="no-underline hover:underline">
  <HashLink className='no-underline'  smooth to="/#contact">contact</HashLink>
  </Link>
  <Link to='/' className="no-underline hover:underline">
  <HashLink className='no-underline'  smooth to="/#services">services</HashLink>
    </Link>
</div>
<div className=" button1 flex space-x-5 justify-center items-center font-medium text-xl ">
  {/* <button className=''><Link to='/register' className='no-underline' >Sign Up</Link></button> 
<Link to='/login' className='no-underline'>Sign In</Link>
*/}
   {user && <button onClick={logoutHandler} className="text-principal h-10 no-underline rounded-2xl">
    <Link className=" no-underline" to={"/"}>
Logout
    </Link>
  </button> 
 }
 { !user &&
 <div> <button className="text-principal px-4 my-5 h-10 no-underline rounded-2xl max-w-md">
    <Link className=" no-underline" to={"/register"}>
      Sign Up
    </Link>
  </button>
  <button className="btnl bg-principal text-white px-4 my-5 h-10  no-underline rounded-2xl max-w-md">
    <Link className=" no-underline" to={"/login"} >
      Sign In
    </Link>
  </button> </div> }
</div>
</div>

  )
}

export default NavBar
