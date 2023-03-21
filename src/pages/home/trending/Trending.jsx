import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Switchtabs from '../../../components/switchtabs/Switchtabs'
const Trending = () => {
    //api call when tab chages
    const onTabChange =(tab)=>{

    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <Switchtabs data={["Day","Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
    </div>
  )
}

export default Trending