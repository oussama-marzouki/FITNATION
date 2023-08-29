import axios from "axios";

const BASE_URL="http://localhost:5000/api"
const BASE_URL_COACH="http://localhost:5000/coaching"
const BASE_URL_CLIENT="http://localhost:5000/athlete"
const BASE_URL_ADMIN="http://localhost:5000/admin"

export const axiosClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
  });

export const axiosCoach = axios.create({
    baseURL: BASE_URL_COACH,
    withCredentials: true
  });

export const axiosAthlete = axios.create({
    baseURL: BASE_URL_CLIENT,
    withCredentials: true
  });

  
export const axiosAdmin = axios.create({
  baseURL: BASE_URL_ADMIN,
  withCredentials: true
});



  