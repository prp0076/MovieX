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
      console.log(res?.data);
      setData(res?.data);
      setPageNum((prev)=>prev+1);
      setLoading(false);
    });
  }
  console.log(data?.results);
  const fetchNextPageData =()=>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then((res)=>{
      if(data?.results){
        setData({
          ...data, results:[...data?.results,res?.data?.results]
        })
      }
      else{
        setData(res?.data)
      }
      setPageNum((prev)=>prev+1);
    });
  }
  useEffect(()=>{
    fetchInfiniteData();
  },[query])
  return (
    <div className='searchResultsPage'>
      
    </div>
  )
}

export default SearchResults