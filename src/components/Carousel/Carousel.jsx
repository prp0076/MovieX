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
  return (
    <div>Carousel</div>
  )
}

export default Carousel