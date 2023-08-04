import React from 'react'
import Header from '../Header'
import { NavLink, Route, Routes } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { isActiveStyle, isNotActiveStyle } from '../../utils/styles';
import {DashboardHome,DashboardAlbums,DashboardArtists,DashboardSong,DashboardUsers, NewSong, Alert} from '../index'
import { useStatevalue } from '../../context/StateProvider';


const Dashboard = () => {
  const[{alertType},dispatch] = useStatevalue()
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center '>
    <Header/>
       <div className='w-[60%] h-12 my-2 p-4 flex items-center justify-evenly'>

             <NavLink to={"/dashboard/home"} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>
             <FontAwesomeIcon icon={faHouse} className='text-2xl text-textColor'/> </NavLink>

             <NavLink to={"/dashboard/user"}  className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>Users</NavLink>
             <NavLink to={"/dashboard/songs"}  className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>Songs</NavLink>
             <NavLink to={"/dashboard/artist"}  className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>Artists</NavLink>
             <NavLink to={"/dashboard/albums"}  className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>Albums</NavLink>
      </div>
      <div className='my-4 w-full p-4'>
      <Routes>
            <Route path='/home' element = { <DashboardHome/>}/>
            <Route path='/user' element = { <DashboardUsers/>}/>
            <Route path='/songs' element = { <DashboardSong/>}/>
            <Route path='/artist' element = { <DashboardArtists/>}/>
            <Route path='/albums' element = { <DashboardAlbums/>}/>
            <Route path='/newSong' element = { <NewSong/>}/>
      </Routes>

      </div>
      {alertType && (
        <Alert type={alertType} />
      )}
    </div>
  )
}

export default Dashboard