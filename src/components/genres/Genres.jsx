import React from 'react'
import { useSelector } from 'react-redux'
import  "./Genres.scss"

const Genres = ({data}) => {
    const {genre} = useSelector((state) =>state.home)
  return (
    <div className='genres'>
        {data?.map((g)=>{
           return (
            <div key={g} className="genre">
                {genre[g]?.name}
            </div>
           )
        })}
    </div>
  )
}

export default Genres