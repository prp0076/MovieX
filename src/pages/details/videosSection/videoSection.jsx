import React, { useState } from "react";

import "./videoSection.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../detailsBanner/Playbtn";
import VideoPopup from "../../../components/videoPopup/videoPopup";
import Img from "../../../components/lazyloadimage/Img";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    // console.log(data?.results)
    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    
                    <div className="videos">
                        {data?.results?.map((video)=>{
                            // console.log(video.id,video.key);
                            <div key={video.id} className="videoItem" onClick={()=>{
                            setVideoId(video.key);
                            setShow(true);
                            }}>
                            <div className="videoThumbnail">
                                <Img src={`https://img.youtube.com/vi/${video.key}.jpg`}/>
                                <PlayIcon/>
                                </div>    

                            </div>
                        })}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;
