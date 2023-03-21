import React,{useState} from 'react'
import "./Switchtabs.scss"
const Switchtabs = ({data, onTabChange}) => {
 const[selectiveTab,setselectiveTab]=useState(0);
 const [left ,setLeft]=useState(0);
  return (
    <div className='switchingTabs'>
        <div className="tabItems">
            {data.map((tab,index)=>(
             <span key={index} className={`tabItem`}>
                {tab}
             </span>
            ))}
            <span className="movieBg" style={{left}}></span>
        </div>
    </div>
  )
}

export default Switchtabs