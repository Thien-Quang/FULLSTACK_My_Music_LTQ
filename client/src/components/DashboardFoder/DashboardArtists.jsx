import React, { useEffect } from 'react'
import { useStatevalue } from '../../context/StateProvider';
import { getAllArtist } from '../../api';
import { actionType } from '../../context/reducer';
import SongCard from './SongCard';

const DashboardArtists = () => {

  const [{allArtists},dispatch] = useStatevalue();

  useEffect(() =>{
    if(!allArtists){
      getAllArtist().then(data =>{
        dispatch({ 
          type: actionType.SET_ALL_ARTISTS,
           allArtists: data.artist,
          });
      })
    }
  },[])

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      <div className='relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md'>
      <ArtistContainer data={allArtists}/>
      </div>
    </div>
  )
}
export const ArtistContainer = ({data}) =>{
  return(
    <div className='w-full py-6 flex flex-wrap gap-3 items-center justify-evenly'>
      {data && data.map((song,i) =>(
        
        <SongCard key={song._id} data = {song} index={i} type = "artist"/>
        
      ))}
    </div>
  )
}

export default DashboardArtists