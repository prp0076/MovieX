import React ,{useState}from 'react'
import Carousel from '../../../components/Carousel/Carousel'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Switchtabs from '../../../components/switchtabs/Switchtabs'
import useFetch from "../../../hooks/usefetch"
const Trending = () => {
    const[endpoint,setEndpoint]=useState("day");
    const {data,loading}=useFetch(`/trending/all/${endpoint}`);
    //api call when tab chages
    const onTabChange =(tab)=>{
     setEndpoint(tab === "Day" ? "day" : "week");
    }
    
    
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <Switchtabs data={["Day","Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        {/* carousel section */}
        
        <Carousel data={data?.data?.results} loading={loading}/>
    </div>
  )
}

export default Trending