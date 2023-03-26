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
    // console.log(data);
    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    
                    <div className="videos">
                        
                        {data?.map((video)=>{
                            
                            
                            <div key={video?.id} className="videoItem" onClick={()=>{setVideoId(video?.key); setShow(true); }}>
                                 {/* {console.log(video.id,video.key)} */}
                                <div className="videoThumbnail">
                                    
                                    <Img src={`https://i.ytimg.com/vi/${video?.key}/hqdefault.jpg`}/>
                                    <PlayIcon/>
                                </div>    
                                <div className="videotitle">
                                    {video?.name}
                                </div>
                            </div>
                        })}
                         video
                       
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
