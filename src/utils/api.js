import { axios } from "axios"
const BASE_URL = "https://api.themoviedb.org/3"

const TMDB_TOKEN = process.env.REACT_APP_TMDB_API_TOKEN;
const headers = {
   Authorization: "bearer" + TMDB_TOKEN,
};

export const fetchDateFromApi = async (url , params)=>{
 try{
   const data = await axios.get(BASE_URL + url ,{
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