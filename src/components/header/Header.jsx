import React,{useState,useEffect} from 'react';
import {HiOutlineSearch} from "react-icons/hi";
import {SlMenu} from "react-icons/sl";
import {VscChromeClose} from "react-icons/vsc";
import {useNavigate,useLocation} from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper"
import logo from "../../assets/movieX-log.png"
import "./Header.scss"

const Header = () => {
  const [show,setShow]=useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu , setMobileMenu] = useState(false);
  const [ query , setQuery]= useState("");
  const [showSearch , setShowSearch]=useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //location
 //jab bhi page change krege to scroll location same hi rhega page load hone pr top se start ho the write a logic
 useEffect(()=>{
  window.scrollTo(0,0);
 },[location])
  // navbar controls
  const conrtolNavbar =()=>{
    // console.log(window.scrollY)
    if(window.scrollY>200){
      if(window.scrollY > lastScrollY  && !mobileMenu){
        setShow("hide")
      }
      else{
        setShow("show")
      }
    }
    else{
      setShow("top");
    }
    setLastScrollY(window.scrollY)
  }
  useEffect(()=>{
    window.addEventListener("scroll",conrtolNavbar);
    return ()=>{
      window.removeEventListener("scroll",conrtolNavbar);
    }
  },[lastScrollY]);
  
  //mobile menu
  const opensearch = () =>{
    setMobileMenu(false)
    setShowSearch(true)
  }
  const opeMobileMenu = () =>{
   setMobileMenu(true)
   setShowSearch(false)
  }
  const searchQueryHandle = (e) =>{
    if(e.key === "Enter" && query.length > 0){
     navigate(`/search/${query}`);
     setTimeout(() => {
      setShowSearch(false)
     }, 1000);
    }
   }

  //  navigation method for tv show and movies
  const navigationHandler = (type)=>{
    if(type === "movie"){
     navigate("/explore/movie");
    }
    else{
      navigate("/explore/tv");
    }
    setMobileMenu(false)
  }


  return (
    <header className={`header ${mobileMenu ? "mobileView" :""} ${show}` }>
      <ContentWrapper>
        <div className="logo" onClick={()=>navigate("/")}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className='menuItem' onClick={()=>{
            navigationHandler("movie")
          }}>Movie</li>
          <li className='menuItem' onClick={()=>{
            navigationHandler("tv")
          }}>Tv Shows</li>
          <li className='menuItem'>
            <HiOutlineSearch onClick={opensearch}/>
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={opensearch}/>
          {mobileMenu ? <VscChromeClose onClick={()=>{
            setMobileMenu(false)
          }}/>:<SlMenu onClick={opeMobileMenu} />}
        </div>
      </ContentWrapper>

      {/* searchbar */}
      {showSearch && 
      <div className="searchBar">
        <ContentWrapper>
        <div className="searchInput">
                <input type="text"
                onKeyUp={searchQueryHandle}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search for a movie or tv show...'
                />
                <VscChromeClose onClick={() =>{setShowSearch(false)}}/>
              </div>
        </ContentWrapper>
      </div>
      }
    </header>
  )
}

export default Header