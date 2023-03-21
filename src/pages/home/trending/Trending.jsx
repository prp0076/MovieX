import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import Switchtabs from '../../../components/switchtabs/Switchtabs'
const Trending = () => {
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <Switchtabs data={["Day","Week"]}/>
        </ContentWrapper>
    </div>
  )
}

export default Trending