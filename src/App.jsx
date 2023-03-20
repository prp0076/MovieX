import React,{useEffect } from "react";
import  {fetchDataFromApi}  from "./utils/api";
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from "./store/homeSlice"
function App() {
const dispatch = useDispatch();
const  { url } =useSelector((state)=>state.home);

 useEffect(
  ()=>{
    apitesting();
  }
 ,[])
 const apitesting = () =>{
  fetchDataFromApi("/movie/popular")
  .then((res) =>{
       dispatch(getApiConfiguration(res))
    }
  )
 }
  return (
    <div className="App">
      {url?.data?.total_pages}
    </div>
  );
}

export default App;
