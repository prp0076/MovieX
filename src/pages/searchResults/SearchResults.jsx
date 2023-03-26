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
  
  const fetchNextPageData =()=>{
    fetchDataFromApi(`/search/multi?query=${query}&page=${pagenum}`).then((res)=>{
      if(data?.results){
        setData({
          ...data, results:[...data?.results,...res?.data?.results]
        })
      }
      else{
        setData(res?.data)
      }
      setPageNum((prev)=>prev+1);
    });
  }
  useEffect(()=>{
    setPageNum(1);
    fetchInfiniteData();
  },[query])
  
  return (
    <div className='searchResultsPage'>
      {loading && <Spinner initial={true}/>}
      {!loading && (
        <ContentWrapper>
          
          {data?.results?.length >0 ? (
            <>
            <div className="pageTitle">
              {`Search ${data?.total_results >1 ? "results" : "result"} of ${query}`}
            </div>
            <InfiniteScroll className='content' dataLength={data?.results?.length || []} next={fetchNextPageData} hasMore={pagenum <= data?.total_pages} loader={Spinner} >
              {data?.results.map((item,index)=>{
                if(item.media_type === "person") return ;
                return (<MovieCard key={index} data={item} fromSearch={true}/>);
              })}
            </InfiniteScroll>
            </>
          ) :
           <span className='resultNotFound'>
            Sorry, Result not found!
           </span>
          }
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResults