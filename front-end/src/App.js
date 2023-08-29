import './App.css';
import Home from './Pages/Home/Home' ; 
import { BrowserRouter, Routes ,Route, Navigate  } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import InterfaceClient from './Pages/interfaceClient/InterfaceClient' ;
import InterfaceCoach from './Pages/interfaceCoach/InterfaceCoach' ;
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import NavBar from './Components/NavBar/NavBar';
import Profile from './Pages/Profile/Profile';
import InterfaceAdmin from './Pages/interfaceAdmin/InterfaceAdmin';
import Coach from './Pages/Coach/coach';
import Macros from './Pages/Coach/macros';
import WorkoutCreation from './Pages/Coach/WorkoutCreation';
import Footer from './Components/Footer';
import DietCreation from './Pages/Coach/DietCreation';
import Wallet from './Pages/Coach/Wallet';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Client from './Pages/Client/client';
import Coaches from './Pages/Client/Coaches';
import WorkoutPlan from './Pages/Client/WorkoutPlan';
import ExercicesList from './Pages/Client/ExercicesList';
import DietPlan from './Pages/Client/DietPlan';
import FoodList from './Pages/Client/FoodList';
import Inscription from './Pages/Client/Inscription';
import FaildPayement from './Pages/Client/FaildPayement';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Admin from './Pages/Admin/Admin';
import ClientGestion from './Pages/Admin/ClientGestion';
import CoacheGestion from './Pages/Admin/CoacheGestion';
import Contacts from './Pages/Admin/Contacts';
import AddAdmin from './Pages/Admin/AddAdmin';
import GestionTansformation from './Pages/Coach/GestionTansformation';


function App() {

  const user = JSON.parse(localStorage.getItem('user'))  ;
  // const user = useSelector((state) => state.auth.user);
  // useEffect(() => {
  //   console.log(user.role);
  // },[]);


  return (
<>
<BrowserRouter>
<NavBar />
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/> } />
    <Route path='/register' element={<Register/> } /> 

      <Route path='/profile' element={
       <ProtectedRoutes user={user} >
        <Profile/>
       </ProtectedRoutes>
      } /> 

      <Route path='/client' element={
      <ProtectedRoutes user={user && user.role === 'client'} >
        <Client/>
      </ProtectedRoutes>
      } /> 

      <Route path='/coaches' element={
      <ProtectedRoutes user={user && user.role === 'client'} >
        <Coaches/>
      </ProtectedRoutes>
      } /> 

      <Route path='/clientworkout' element={
      <ProtectedRoutes user={user && user.role === 'client'} >
        <WorkoutPlan/>
      </ProtectedRoutes>
      } /> 

      <Route path='/clientexercices' element={
      <ProtectedRoutes user={user && user.role === 'client'} >  
        <ExercicesList/>
      </ProtectedRoutes>
      } /> 

      <Route path='/clientfoods' element={
      <ProtectedRoutes user={user && user.role === 'client'} >    
        <FoodList/>
      </ProtectedRoutes>
      } /> 

      <Route path='/clientdiet' element={
      <ProtectedRoutes user={user && user.role === 'client'} >
        <DietPlan/>
      </ProtectedRoutes>
      } /> 

      <Route path='/inscription/:id' element={
      <ProtectedRoutes user={user && user.role === 'client'} >
        <Inscription/>
      </ProtectedRoutes>
      } /> 
      <Route path='/failedpayement' element={
      <ProtectedRoutes user={user && user.role === 'client'} >
        <FaildPayement/>
      </ProtectedRoutes>
      } /> 

      
      
/////////////////// COACH ROUTES /////////////////////

      <Route path='/coach' element={
      <ProtectedRoutes user={user && user.role === 'coach'} >  
        <Coach/>
      </ProtectedRoutes>
      } /> 

      <Route path="/WorkoutPlan/:id" element={
      <ProtectedRoutes user={user && user.role === 'coach'} >   
        <WorkoutCreation/>
      </ProtectedRoutes>
      } />
      <Route path="/DietPlan/:id" element={
      <ProtectedRoutes user={user && user.role === 'coach'} >   
        <DietCreation/>
      </ProtectedRoutes>
      } />

      <Route path='/macrosCalculator' element={
      <ProtectedRoutes user={user && user.role === 'coach'} >   
        <Macros/>
      </ProtectedRoutes>
      } />

      <Route path='/wallet' element={
      <ProtectedRoutes user={user && user.role === 'coach'} >
        <Wallet/>
      </ProtectedRoutes>
      } />
      

/////////////////// ADMIN ROUTES /////////////////////

      <Route path='/admin' element={
        <ProtectedRoutes user={user && user.role === 'admin'} >  
        <Admin/>
      </ProtectedRoutes>
      } />

      <Route path='/aclients' element={
        <ProtectedRoutes user={user && user.role === 'admin'} >   
        <ClientGestion/> 
        </ProtectedRoutes>
      } />
      <Route path='/acoaches' element={ 
        <ProtectedRoutes user={user && user.role === 'admin'} >   
        <CoacheGestion/> 
        </ProtectedRoutes>
      } />

      <Route path='/contacts' element={ 
        <ProtectedRoutes user={user && user.role === 'admin'} >   
        <Contacts/> 
        </ProtectedRoutes>
      } />

      <Route path='/addadmin' element={ 
        <ProtectedRoutes user={user && user.role === 'admin'} >   
        <AddAdmin/> 
        </ProtectedRoutes>
      } />

      <Route path='/transformation' element={ 
        <ProtectedRoutes user={user && user.role === 'coach'} >   
        <GestionTansformation/>
        </ProtectedRoutes>
      } />

       
           


      // <Route path='/*' element={<Navigate to='/'/>} />
      <Route path='/resetpassword/:resetToken' element={<ResetPassword/>} />
    
      </Routes>
</BrowserRouter>
<ToastContainer />
</>
  );
}

export default App;
