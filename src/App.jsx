import React,{useEffect } from "react";
import  {fetchDataFromApi}  from "./utils/api";
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration ,getGenres} from "./store/homeSlice"
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
   const data1 = data[0].data;
   const data2 = data[1].data;
   const final_data =[data1,data2];
  //  console.log(final_data)
  //  console.log(final_data[0]);
  //  console.log(final_data[1]);
   final_data.map(({genres})=>{
    return genres.map((item) =>(allGenres[item.id]=item))
    
   })
  //  console.log(allGenres)

  //save in state
  dispatch(getGenres(allGenres));
  
 }
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route path="/:mediaType/:id" element={<Details/>}/>
      <Route path="/search/:query" element={<SearchResults/>}/>
      <Route path="/explore/:mediaType" element={<Explore/>}/>
      <Route path="*" element={<PageNotFound/>}/>
     </Routes>
     <Footer/>
    </BrowserRouter>
  );
}

export default App;
