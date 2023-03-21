import React,{useState} from 'react'
import "./HeroBanner.scss"
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/usefetch';
const HeroBanner = () => {
 const [background, setBackground] = useState("");
 const [query, setQuery] = useState("");
//  when user click on button it redirect to search page
const navigate = useNavigate();
const {data , loading}=useFetch("/movie/upcoming");
 const searchQueryHandle = (e) =>{
  if(e.key === "Enter" && query.length > 0){
   navigate(`/search/${query}`)
  }
 }

  return (
    <div className="herobanner">
      <div className="wrapper">
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
      </div>
    </div>
  )
}

export default HeroBanner