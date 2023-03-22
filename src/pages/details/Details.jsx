import React from 'react'
import "./Detail.scss"
import {useParams} from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import DetailsBanner from './detailsBanner/DetailsBanner'
const Details = () => {
  
  const {mediaType,id}=useParams();
  const {data,loading}=useFetch(`/${mediaType}/${id}/videos`)
  const {data:credits,loading:creditsloading}=useFetch(`/${mediaType}/${id}/credits`)
  // console.log(data?.data?.results[0])
  // console.log(credits?.data?.crew)

  return (
    <div>
      <DetailsBanner video={data?.data?.results[0]} crew={credits?.credits?.crew}/>
    </div>
  )
}
 
export default Details;