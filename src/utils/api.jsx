import axios from "axios";
import { jwtToken } from "../config";

const BASE_URL = "https://api.themoviedb.org/3"

// var TMDB_TOKEN = process.env.REACT_APP_API_KEY;
const headers = {
   Authorization: "bearer " + jwtToken,
};

export const fetchDataFromApi = async (url , params)=>{
 try{
   const data = await axios.get( BASE_URL + url ,{
    headers: headers,
    params: params
   })
   return data;
 }
 catch(error){
   console.log(error);
   return error;
 }
}