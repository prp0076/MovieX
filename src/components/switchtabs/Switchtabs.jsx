import React,{useState} from 'react'
import "./Switchtabs.scss"
const Switchtabs = ({data, onTabChange}) => {
 const[selectiveTab,setselectiveTab]=useState(0);
 const [left ,setLeft]=useState(0);

 const activeTab =(tab,index)=>{
  setLeft(index * 100);
  setTimeout(()=>{
   setselectiveTab(index);
  },300)
  onTabChange(tab,index);
 }
  return (
    <div className='switchingTabs'>
        <div className="tabItems">
            {data?.map((tab,index)=>(
             <span onClick={()=>{
              activeTab(tab,index)
             }} key={index} className={`tabItem ${selectiveTab === index ?"active":""}`}>
                {tab}
             </span>
            ))}
            <span className="movingBg" style={{left}}></span>
        </div>
    </div>
  )
}

export default Switchtabs