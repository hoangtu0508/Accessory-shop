import React from 'react'
import SideBar from './SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import { FaFacebookMessenger } from 'react-icons/fa6'
import { IoNotifications } from 'react-icons/io5'

const Profile = () => {
  return (
    <div className='flex w-10/12 m-auto'>
      
      <div className='w-1/4 h-full mr-2'>
        <SideBar />
      </div>

      <div className='w-3/4 h-full mt-20 ml-2'>
        <Outlet />
      </div>
    </div>


  )
}

export default Profile