import React, { useEffect, useState } from 'react'
import "./SearchResults.scss"
import InfiniteScroll from "react-infinite-scroll-component"
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import MovieCard from "../../components/moviecard/MovieCard"
import Spinner from "../../components/spinner/Spinner"
const SearchResults = () => {
  const [data, setData]=useState(null);
  const [pagenum , setPageNum]=useState(1)
  const [loading , setLoading]=useState(false)
  const {query}=useParams();
  const fetchInfiniteData =()=>{
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then((res)=>{
      setData(res);
      setPageNum((prev)=>prev+1);
      setLoading(false);
    });
  }
  // const fetchNextPageData =()=>{
  //   fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then((res)=>{
      
  //   });
  // }
  useEffect(()=>{
    fetchInfiniteData();
  },[query])
  return (
    <div className='searchResultsPage'>
      
    </div>
  )
}

export default SearchResults