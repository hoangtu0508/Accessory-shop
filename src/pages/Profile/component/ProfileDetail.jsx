import React, { useEffect, useState } from 'react'
import { FaFacebookMessenger } from 'react-icons/fa6'
import { IoCartOutline, IoNotifications } from 'react-icons/io5'
import pg from '../../../img/pg.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { getDataUser } from '../../../features/auth/authSlice'
import { baseURLImg } from '../../../utils/api'
import { MdAttachMoney, MdOutlineEdit } from 'react-icons/md'
import { getOrderUser } from '../../../features/order/orderSlice'
import { handleSpent } from '../../../utils/utils'
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from 'react-icons/ri'
import { deleteAddress, getAddresShipsUser } from '../../../features/address/addressSlice'
import Shipping from '../../../component/Shipping/Shipping'

const ProfileDetail = () => {
    const user = JSON.parse(localStorage.getItem("customer"));
    const userId = user?.user.id
    const dispatch = useDispatch()

    const [spent, setSpent] = useState()
    const [active, setActive] = useState(1)
    const [showAddShip, setShowAddShip] = useState(false)

    const userDataState = useSelector((state) => state?.auth?.dataUser)
    const userData = userDataState?.[0]

    const orderState = useSelector((state) => state?.order?.orderUser?.data);
    const addressUserState = useSelector((state) => state?.address?.addressUser?.data);

    useEffect(() => {
        dispatch(getDataUser(userId))
        dispatch(getOrderUser(userId))
        dispatch(getAddresShipsUser(userId))
    }, [])

    useEffect(() => {
        setSpent(handleSpent(orderState))
    }, [orderState])

    const handleDeleAddress = async (id) => {
        await dispatch(deleteAddress(id))
        dispatch(getAddresShipsUser(userId))
    }

    console.log(addressUserState);
    return (
        <div className='w-full  text-gray-600 pb-6'>
            {showAddShip && (
                <Shipping setShowAddShip={setShowAddShip} />
            )}
            <div className='w-full bg-white rounded-xl h-14 items-center justify-between flex px-4 text-gray-600'>
                <div className='flex items-center'>
                    <div className={`flex items-center px-2 py-2 ${active === 1 ? 'border-b-2 border-purple-700' : ''}`} onClick={() => setActive(1)}>
                        <button className=' text-xs'>Profile</button>
                    </div>
                    <span className='text-lg font-medium mx-2'>|</span>
                    <div className={`flex items-center px-2 py-2 ${active === 2 ? 'border-b-2 border-purple-700' : ''}`} onClick={() => setActive(2)}>
                        <button className=' text-xs'>Address</button>
                    </div>
                </div>

                <div className='flex items-center'>
                    <div className='flex items-center border border-text px-2 py-1 rounded-md'>
                        <span><FaFacebookMessenger /></span>
                        <h3 className='ml-2 text-xs'>Messenger</h3>
                    </div>

                    <div className='flex items-center border border-text px-2 py-1 rounded-md ml-2'>
                        <span><IoNotifications /></span>
                        <h3 className='ml-2 text-xs'>Notification</h3>
                    </div>
                </div>
            </div>
            {active === 1 ? (
                <div className='flex'>
                    <div className='w-7/12 mt-4 mr-2 h-auto'>
                        <div className='bg-white p-4 rounded-xl h-full'>
                            <h3 className='font-semibold'>Profile Details</h3>

                            <div className='mt-2'>
                                <div>
                                    <label className='text-xs font-medium'>Username</label>
                                    <input className='text-sm px-2 py-2 w-full border border-text rounded-lg mt-2' value={userData?.username}></input>
                                </div>
                                <div className='mt-3'>
                                    <label className='text-xs font-medium'>Phone Number</label>
                                    <input className='px-2 py-1 w-full border border-text rounded-lg mt-2' value={`(+84) ${userData?.phone}`}></input>
                                </div>
                                <div className='mt-3'>
                                    <label className='text-xs font-medium'>Email</label>
                                    <input className='px-2 py-1 w-full border border-text rounded-lg mt-2' value={userData?.email}></input>
                                </div>

                                {/* <div className='mt-3'>
                                    <label className='text-xs font-medium'>Address</label>
                                    <input className='px-2 py-1 w-full border border-text rounded-lg mt-2' value={userData?.address}></input>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className='w-5/12 ml-2 bg-white rounded-xl mt-4 pb-4 h-auto'>
                        <div className="relative h-36 ">
                            <img src={pg} alt="" className='rounded-t-xl' />
                            <div className="absolute -bottom-1/2 left-0 text-center w-full h-36 z-10 flex justify-center">
                                {userData?.avatar ? (
                                    <div>
                                        <img src={baseURLImg + userData?.avatar[0]?.url} className='w-32 h-32 rounded-full' />
                                    </div>
                                ) : (
                                    <div>
                                        <img src='https://img.freepik.com/premium-photo/cute-fluffy-young-anime-girl-generative-ai_755833-81.jpg?w=740' className='w-32 h-32 rounded-full'></img>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='mt-16 text-center'>
                            <h3 className='text-2xl font-medium text-purple-800'>{userData?.username}</h3>
                            <h3 className='text-sm'>Customer ID: #00{userData?.id}</h3>
                        </div>

                        <div className='flex justify-center mt-4'>
                            <div className='flex items-center justify-center px-4 py-1 border rounded-md border-purple-700'>
                                <span><IoCartOutline /></span>
                                <span className='px-2 text-purple-700 font-medium'>{orderState?.length}</span>
                                <span>Orders</span>
                            </div>

                            <div className='flex items-center justify-center px-4 py-1 border rounded-md border-purple-700 ml-2'>
                                <span><MdAttachMoney /></span>
                                <span className='px-2 text-purple-700 font-medium'>{spent}</span>
                                <span>Spent</span>
                            </div>

                        </div>
                    </div>

                </div>
            ) : (
                <div className='h-auto'>
                    <div className='flex items-center justify-between px-4 mt-2'>
                        <h3 className='font-semibold mt-4'>Address Details</h3>
                        <button className='px-4 py-2 border-2 border-purple-700 text-purple-700 font-medium flex items-center' onClick={() => setShowAddShip(true)}>
                            <span className='mr-2'><IoMdAdd /></span>
                            <button>Add to Address</button>
                        </button>
                    </div>
                    <div className=''>
                        {addressUserState.map((item) => (
                            <div className='flex items-center bg-white mt-4 p-4'>
                                <div className='w-1/4'>
                                    <h3>Full name</h3>
                                    <h3>Address</h3>
                                    <h3>Phone Number</h3>
                                </div>
                                <div className='w-2/4'>
                                    <h3>{item.attributes.nameReceive}</h3>
                                    <h3>{item.attributes.address}</h3>
                                    <h3>(+84) {item.attributes.phoneReceive}</h3>
                                </div>
                                <div className='w-1/4'>
                                    <button className='flex items-center'>
                                        <span><MdOutlineEdit className='w-5 h-auto mr-2 text-yellow-600' /></span>
                                        <span>Edit</span>
                                    </button>
                                    <button className='flex items-center' onClick={() => handleDeleAddress(item.id)}>
                                        <span ><RiDeleteBin6Line className='w-5 h-auto mr-2 text-red-600' /></span>
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div >
            )}

        </div >
    )
}

export default ProfileDetail