import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./DetailsBanner.scss"; 

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circlerating/CircleRating";
import Img from "../../../components/lazyloadimage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "./Playbtn";


const DetailsBanner = ({ video, crew }) => {
    const {mediaType,id}=useParams();
    
    const {data,loading}=useFetch(`/movie/${id}`);
    

    const url = useSelector((state)=>state.home);
    // genres
    const _genres=data?.data?.genres.map((g)=>g.id);
    console.log(_genres)
    
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    console.log(data);
    return (
        <div className="detailsBanner">
            {!loading ? (
               <>
               {/* check for data */}
               {!!data &&(
                // console.log(url.url.backdrop+data.data.backdrop_path),
               <React.Fragment>
                
                    <div className="backdrop-img">
                        <Img src={url.url.backdrop +data?.data?.backdrop_path}/>
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data?.data?.poster_path?(
                                    <Img className="posterImg" src={url?.url?.backdrop + data?.data?.poster_path}/>
                                ):(
                                    <Img className="posterImg" src={PosterFallback}/>

                                )}
                            </div>
                            <div className="right">
                                <div className="title">
                                    {`${data?.data?.name || data?.data?.title} (${dayjs(data?.data?.release_date).format("YYYY")})`}
                                </div>
                                <div className="subtitle">
                                    {data?.data?.tagline}
                                </div>
                                <Genres data={_genres}/>
                                {/* rating and playbutton */}
                                <div className="row">
                                    <CircleRating rating={data?.data?.vote_average.toFixed(1)}/>
                                    {/* playbtn */}
                                    <div className="playbtn" onClick={()=>{}}>
                                        <PlayIcon/>
                                        <span className="text">
                                            Watch Trailer
                                        </span>
                                    </div>
                                </div>
                                {/* overviw */}
                                <div className="overview">
                                    <div className="heading">
                                        Overview
                                    </div>
                                    <div className="description">
                                        {data?.data?.overview}
                                    </div>
                                </div>
                                <div className="info">
                                    {data.data.status && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Status :{" "}
                                            </span>
                                            <span className="text">
                                                {data?.data?.status}
                                            </span>
                                        </div>
                                    )}
                                    {data.data.release_date && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                               Release Date :{" "}
                                            </span>
                                            <span className="text">
                                                {dayjs(data?.data?.release_date).format("MMM D, YYYY")}
                                            </span>
                                        </div>
                                    )}
                                    {data.data.runtime && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                               Runtime :{" "}
                                            </span>
                                            <span className="text">
                                                {toHoursAndMinutes(data?.data?.runtime)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </ContentWrapper>
               </React.Fragment>)}
               </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;

// CSS
