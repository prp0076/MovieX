import React,{useEffect, useState} from 'react'
import "./heroBanner.scss"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/usefetch';
import Img from '../../../components/lazyloadimage/Img';
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
const HeroBanner = () => {
 const [background, setBackground] = useState("");
 const [query, setQuery] = useState("");
//  when user click on button it redirect to search page
const navigate = useNavigate();
const { data , loading }=useFetch("/movie/upcoming");


//  for backdrop size profile size
const { url } = useSelector((state) =>state.home);
//backdrop path
useEffect(() => {
    const bg =  url.backdrop+ data?.data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    // console.log(url);
    // console.log(bg)
    setBackground(bg);
  },[data]);


 const searchQueryHandle = (e) =>{
  if(e.key === "Enter" && query.length > 0){
   navigate(`/search/${query}`)
  }
 }


  return (
    <div className="herobanner">
      {/*  backdrop img is rendered when loading state is false */}
      {!loading && <div className="backdrop-img">
       <Img src={background}  />
      </div>}
      <div className="opacity-layer">

      </div>
     <ContentWrapper>
      
          <div className="herobannerContent">
              <span className="title">Welcome.</span>
              <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now</span>
              <div className="search-input">
                <input type="text"
                onKeyUp={searchQueryHandle}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search for a movie or tv show...'
                />
                <button>Search</button>
              </div>

          </div>
        
     </ContentWrapper>
     
    </div>
  )
}

export default HeroBanner