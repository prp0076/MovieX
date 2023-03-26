import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./DetailsBanner.scss"; 

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/usefetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circlerating/CircleRating";
import Img from "../../../components/lazyloadimage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "./Playbtn";
import VideoPopup from "../../../components/videoPopup/videoPopup";


const DetailsBanner = ({ video, crew }) => {


const [show, setShow]=useState(false)
const [videoid , setVideoId]=useState(null)

    const {mediaType,id}=useParams();
    
    const {data,loading}=useFetch(`/movie/${id}`);
    

    const url = useSelector((state)=>state.home);
    // genres
    const _genres=data?.data?.genres?.map((g)=>g.id);
    // console.log(_genres)
    // varible for crew and writers
    // console.log(crew)
    // console.log(console.log(video);key);
    const director = crew?.filter((f)=>f.job === "Director");
    // console.log(director)
    const writter = crew?.filter((f)=> f.job==="Screenplay" || f.job ==="Story" || f.job==="Writter");
    // console.log(writter)
    // console.log(data);
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    
//    console.log(video?.key);
    return (
        <div className="detailsBanner">
            {!loading ? (
               <>
               {/* check for data */}
               {!!data &&(
                // console.log(url.url.backdrop+data.data.backdrop_path),
               <React.Fragment>
                    {console.log(url?.url?.backdrop)}
                    {console.log(data?.data)}
                    <div className="backdrop-img">
                        <Img src={url?.url?.backdrop +data?.data?.backdrop_path}/>
                    </div>
                    <div className="opacity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data?.data?.poster_path?(
                                    console.log(url?.url?.backdrop),
                                    console.log(data?.data?.poster_path),
                                    <Img className="posterImg" src={url?.url?.backdrop +data?.data?.poster_path}/>
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
                                    <CircleRating rating={data?.data?.vote_average?.toFixed(1)}/>
                                    {/* playbtn */}
                                    
                                    <div className="playbtn" onClick={()=>{
                                        setShow(true);
                                        const trailer = video?.filter((item) => item?.type === "Trailer");
                                         
                                        setVideoId(trailer[0].key);
                                    }}>
                                        <PlayIcon />
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
                                    {data?.data?.status && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                                Status :{" "}
                                            </span>
                                            <span className="text">
                                                {data?.data?.status}
                                            </span>
                                        </div>
                                    )}
                                    {data?.data?.release_date && (
                                        <div className="infoItem">
                                            <span className="text bold">
                                               Release Date :{" "}
                                            </span>
                                            <span className="text">
                                                {dayjs(data?.data?.release_date).format("MMM D, YYYY")}
                                            </span>
                                        </div>
                                    )}
                                    {data?.data?.runtime && (
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
                                {director?.length>0&&(
                                    <div className="info">
                                        <span className="text bold">
                                            Director:{" "}
                                        </span>
                                        <span className="text">
                                            {director.map((d,i)=>(
                                                <span key={i}>
                                                    {d.name}
                                                    {director?.length-1 !== i && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {writter?.length>0&&(
                                    <div className="info">
                                        <span className="text bold">
                                            Writter:{" "}
                                        </span>
                                        <span className="text">
                                            {writter.map((d,i)=>(
                                                <span key={i}>
                                                    {d.name}
                                                    {writter?.length-1 !== i && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}
                                {/* {crew?.created_by?.length>0&&(
                                    <div className="info">
                                        <span className="text bold">
                                            Creator:{" "}
                                        </span>
                                        <span className="text">
                                            {data?.data?.created_by.map((d,i)=>(
                                                <span key={i}>
                                                    {d.name}
                                                    {data?.data?.created_by?.length-1 !== i && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )} */}
                            </div>
                        </div>
                        <VideoPopup show={show} setShow={setShow} videoId={videoid} setVideoId={setVideoId}/>
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
