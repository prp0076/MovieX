import React,{useEffect } from "react";
import  {fetchDataFromApi}  from "./utils/api";
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from "./store/homeSlice"
import { BrowserRouter,Route,Routes} from "react-router-dom";
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Details from "./pages/details/Details"
import PageNotFound from "./pages/404/pageNotFound"
import SearchResults from "./pages/searchResults/SearchResults"
import Explore from "./pages/explore/Explore"
import Home from "./pages/home/Home";
function App() {
const dispatch = useDispatch();
const  { url } =useSelector((state)=>state.home);

 useEffect(
  ()=>{
    fetchapiconfig();
    genresCall();
  }
 ,[])
 const fetchapiconfig = () =>{
  fetchDataFromApi("/configuration")
  .then((res) =>{
      // console.log(res)
       const urlimg ={
        backdrop: res.data.images.secure_base_url + "original",
        poster: res.data.images.secure_base_url + "original",
        profile: res.data.images.secure_base_url + "original",
       }
      //  console.log(urlimg)
       dispatch(getApiConfiguration(urlimg))
    }
  )
 }

 //genres
 const genresCall= async()=>{
   let promises =[]
   //we have two api call methods in promises movie and tv
   let endpoints =["tv","movie"]
   let allGenres ={}

   endpoints.forEach((url)=>{
    promises.push(fetchDataFromApi(`/genre/${url}/list`))
   })

   const data = await Promise.all(promises);
   console.log(data)
   console.log(data[0].data.genres)
   data.map(({genres})=>{
    return data[0].data.genres.map((item) =>(allGenres[item.id]=item))
    console.log(genres);
   })

 }
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route path="/:mediaType.:id" element={<Details/>}/>
      <Route path="/search/:query" element={<SearchResults/>}/>
      <Route path="/explore/:mediaType" element={<Explore/>}/>
      <Route path="*" element={<PageNotFound/>}/>
     </Routes>
     <Footer/>
    </BrowserRouter>
  );
}

export default App;
