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
    <BrowserRouter>
    {/* <Header/> */}
    <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route path="/:mediaType.:id" element={<Details/>}/>
      <Route path="/search/:query" element={<SearchResults/>}/>
      <Route path="/explore/:mediaType" element={<Explore/>}/>
      <Route path="*" element={<PageNotFound/>}/>
     </Routes>
     {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
