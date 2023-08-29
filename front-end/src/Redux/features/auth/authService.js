import axios from 'axios'
import { axiosClient } from "../../../util/axios-config" ;
import { toast } from 'react-toastify';
import { Navigate , useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/'

// Register user 
const register = async (userData) => {
    try {
        const response = await axios.post(API_URL + "register" , userData) ;
        toast.success("Your account is created");   
        return response.data
    } catch (error) {
        toast.error(error.response.data.message);      
    }
    // const response = await axios.post(API_URL + "register" , userData) ;
    // return response.data

}

// Login user
const login = async (userData) => {
try {
    const response = await axiosClient.post('/login', userData) ; 
    console.log(response.data) ;
    localStorage.setItem('user' , JSON.stringify(response.data)) ; 


    if (response.data.role === 'coach') {
        window.location.assign("http://localhost:3000/coach");
    } 
    else if (response.data.role === 'client') {
       window.location.assign("http://localhost:3000/client");
    }  
    else if (response.data.role === 'admin') {
       window.location.assign("http://localhost:3000/admin");
    }   
    
   return response.data 

} catch (error) {
    toast.error(error.response.data.message);  
}
    // const response = await axiosClient.post('/login', userData) ; 
    // console.log(response.data) ;
    // localStorage.setItem('user' , JSON.stringify(response.data)) ;

    // window.location.assign("https://www.example.com");
    // const user1 =  JSON.parse(localStorage.getItem("user"));
    //  if (response.data.role === 'coach') {
    //      window.location.assign("http://localhost:3000/coach");
    //  } 
    //  else if (response.data.role === 'client') {
    //     window.location.assign("http://localhost:3000/client");
    //  }  
    //  else if (response.data.role === 'admin') {
    //     window.location.assign("http://localhost:3000/admin");
    //  }   
     
    // return response.data 
}

// Logout user
const logout = async () => {
    await axios.get(API_URL + "logout") ;
    localStorage.removeItem('user');
    
}

// get User data 
// const getUser = async () => {
//     await axiosClient.get('/getclient')
//     .then((response) => {
//         localStorage.setItem('user' , JSON.stringify(response.data)) ;
//         return response.data  ;
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// }

// Update User
const updateUser = async (formData) => {

    try {
        const response = await axiosClient.patch('/updateclient', formData , {
            headers: {
              'Content-Type': 'multipart/form-data',
            },}); 
            
        //console.log(response.data);
        toast.success(" updated successfly"); 
        localStorage.setItem('user' , JSON.stringify(response.data)) ;
        return response.data ;
      }
      catch (error) {
        toast.error(error.response.data.message);
      }
}


const authService = {
    register, 
    login,
    logout,
    updateUser,
}

export default authService

