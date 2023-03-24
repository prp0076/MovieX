import React from 'react'
import "./Home.scss"
import HeroBanner from './heroBanner/heroBanner'
import Trending from './trending/Trending'
import Popular from './Popular/Popular'
import TopRated from './TopRated/TopRated'
const Home = () => {
  return (
    <div className='homePage'>
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}


export default Home