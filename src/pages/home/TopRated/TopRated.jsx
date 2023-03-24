import React ,{useState}from 'react'
import Carousel from '../../../components/Carousel/Carousel'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Switchtabs from '../../../components/switchtabs/Switchtabs'
import useFetch from "../../../hooks/usefetch"
const TopRated = () => {
    const[endpoint,setEndpoint]=useState("movie");
    const {data,loading}=useFetch(`/${endpoint}/top_rated`);
    //api call when tab chages
    const onTabChange =(tab)=>{
     setEndpoint(tab === "Movies"?"movie":"tv");
    }
    
    
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Top Rated</span>
            <Switchtabs data={["Movies","Tv Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        {/* carousel section */}
        
        <Carousel data={data?.data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default TopRated