import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Genres from "../genres/Genres"
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyloadimage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circlerating/CircleRating";
import "./Carousel.scss"
const Carousel = ({data,loading}) => {
    //refrence
    const carouselConatiner = useRef();
    const {url}=useSelector((state)=>state.home);
    const navigate = useNavigate();
    // navigation for left and right scroll
    const navigation = (direction) =>{
     
    }
    // loading skeleton method
    const skItem = () =>{
        return (
            <div className="skeletonItem ">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title  skeleton"></div>
                    <div className="date  skeleton"></div>
                </div>
            </div>
        )
    }
  return (
    <div className="carousel">
        <ContentWrapper>
            <BsFillArrowLeftCircleFill className="carouselLeftNav arrow"  onClick={()=>navigation("left")}/>
            <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={()=>navigation("right")}/>
            {!loading ?(
              <div className="carouselItems">
                {data?.map((item)=>{
                    
                    const posterurl=item.poster_path ? url.poster + item.poster_path : PosterFallback
                    return (
                        <div key={item.id}  className="carouselItem">
                            <div className="posterBlock">
                                <Img src={posterurl}/>
                                <CircleRating rating={item.vote_average.toFixed(1)}/>
                                <Genres data={item.genre_ids}/>
                            </div>
                            <div className="textBlock">
                                <span className="title">
                                    {item.title || item.name}
                                </span>
                                <span className="date">
                                    {dayjs(item.release_date).format("MMM D, YYYY")}
                                </span>
                            </div>
                        </div>
                    )
                })}
              </div>
            ) : (
                <div className="loadingSkeleton">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                </div>
            )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel