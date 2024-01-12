import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaCartShopping } from 'react-icons/fa6'
import { IoMdSettings } from 'react-icons/io'
import { IoLogInOutline } from 'react-icons/io5'
import { MdOutlineEventNote } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SideBar = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await localStorage.clear()
        await navigate('/');
        toast.success("Logout Success");
    }
    return (
        <div className='pt-20 h-full'>
            <div className='rounded-xl px-6 h-full flex flex-col pb-4'>
                <div className='flex items-center py-4 border-b border-text'>
                    <div>
                        <img src='http://localhost:1337/uploads/t1398072203800_1676370170_jpg_6950632396.webp' className='w-16 h-16 rounded-full'></img>
                    </div>

                    <div className='text-left ml-4'>
                        <h3 className='font-bold text-base'>THT</h3>
                        <h3 className='text-xs'>THT@gmail.com</h3>
                    </div>
                </div>

                <div className='text-gray-600 py-2 flex-grow'>
                    <Link to='/user/profile'>
                        <div className='flex items-center py-2'>
                            <span><CgProfile className='w-5 h-auto mr-4' /></span>
                            <h3>My profile</h3>
                        </div>
                    </Link>
                    <Link to='/cart/your-cart'>
                        <div className='flex items-center py-2'>
                            <span><FaCartShopping className='w-5 h-auto mr-4' /></span>
                            <h3>Shopping cart</h3>
                        </div>
                    </Link>
                    <Link to='/user/order'>
                        <div className='flex items-center py-2'>
                            <span><MdOutlineEventNote className='w-5 h-auto mr-4' /></span>
                            <h3>Purchase order</h3>
                        </div>
                    </Link>
                </div>

                <div className='text-gray-600 border-t border-text'>
                    <Link >
                        <div className='flex items-center py-2'>
                            <span><IoMdSettings className='w-5 h-auto mr-4' /></span>
                            <h3>Settings</h3>
                        </div>
                    </Link>
                    <Link>
                        <div className='flex items-center py-2' onClick={() => handleLogout()}>
                            <span><IoLogInOutline className='w-5 h-auto mr-4' /></span>
                            <h3>Log out</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default SideBar