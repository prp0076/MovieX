import React from 'react'
import "./Detail.scss"
import {useParams} from "react-router-dom"
import useFetch from "../../hooks/usefetch"
import DetailsBanner from './detailsBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideosSection from './videosSection/videoSection'
import Similar from './caraousels/Similar'
import Recommendation from './caraousels/Recommadation'

const Details = () => {
  
  const {mediaType,id}=useParams();
  // console.log(mediaType,id);
  const {data,loading}=useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits,loading:creditsloading}=useFetch(`/${mediaType}/${id}/credits`)
  // console.log(data?.data?.results)
  // console.log(credits?.data?.cast)
  // console.log(loading)
  // console.log(data);

  return (
    <div>
      <DetailsBanner video={data?.data?.results} crew={credits?.data?.crew}/>
      <Cast data={credits?.data?.cast} loading={creditsloading}/>
      {/* <VideosSection data={data?.data?.results} loading={loading}/> */}
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType}  id={id}/>
    </div>
  )
}
 
export default Details;