import React,{useState,useEffect} from 'react';
import {HiOutlineSearch} from "react-icons/hi";
import {SlMenu} from "react-icons/sl";
import {VscChromeClose} from "react-icons/vsc";
import {useNavigate,useLocation} from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper"
import logo from "../../assets/movix-logo.svg";
import "./Header.scss"

const Header = () => {
  const [show,setShow]=useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu , setMobileMenu] = useState(false);
  const [ query , setQuery]= useState("");
  const [showSearch , setShowSearch]=useState("");
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header className='header'>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menu-items">
          <li className='menuitem'>Movie</li>
          <li className='menuitem'>Tv Shows</li>
          <li className='menuitem'>
            <HiOutlineSearch/>
          </li>
        </ul>
      </ContentWrapper>
    </header>
  )
}

export default Header