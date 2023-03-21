import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyloadimage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./Carousel.scss"
const Carousel = ({data,loading}) => {
    //refrence
    const carouselConatiner = useRef();
    const {url}=useSelector((state)=>state.home);
    const navigate = useNavigate();
    // navigation for left and right scroll
    const navigation = (direction) =>{
     
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
                            </div>
                        </div>
                    )
                })}
              </div>
            ) : (
                <span>loading...</span>
            )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel