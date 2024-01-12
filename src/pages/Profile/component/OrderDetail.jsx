import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { handleGetOrderId } from '../../../features/order/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { GrPrevious } from 'react-icons/gr'
import { BiNotepad } from "react-icons/bi";
import { MdOutlineLocalShipping, MdOutlinePayments } from 'react-icons/md'
import { HiInboxArrowDown } from "react-icons/hi2";
import { FaRegStar } from 'react-icons/fa'
import { baseURLImg } from '../../../utils/api'
import { FaShop } from 'react-icons/fa6'
import { calculateTotalPrice } from '../../../utils/utils';

const OrderDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const orderIdState = useSelector((state) => state?.order?.orderId?.data[0]);
    const productPayment = orderIdState?.attributes?.products

    const subtotal = calculateTotalPrice(productPayment);

    console.log(orderIdState);

    useEffect(() => {
        dispatch(handleGetOrderId(id))
    }, [])
    return (
        <div className='full mb-10'>
            <div className='w-full'>
                <div className='flex justify-between items-center bg-white p-4 py-6'>
                    <Link to='/user/order'>
                        <div className='flex items-center text-lg'>
                            <span><GrPrevious className='mr-2' /></span>
                            <h3>Back</h3>
                        </div>
                    </Link>
                    <div className='flex items-center text-lg'>
                        <h3>Order ID: 00{orderIdState?.id}</h3>
                        <span className='text-base font-medium mx-2'>|</span>
                        <h3 className='text-orange-600'>{orderIdState?.attributes?.status?.data?.attributes?.statusName}</h3>
                    </div>
                </div>

                <div className='bg-white pt-4 py-10 mt-0.5'>
                    <div class="flex items-center w-full">
                        <div className='w-1/5'>
                            <div className='flex w-full justify-end items-center'>
                                <div className='w-1/3 flex justify-end'>
                                    <span class={`block font-bold p-2 border-4 rounded-full ${orderIdState?.attributes?.status?.data?.id === 1 ? 'bg-green-600' : ''}  w-full h-auto border-green-600`}>
                                        <BiNotepad className={`w-9 h-auto ${orderIdState?.attributes?.status?.data?.id === 1 ? 'text-white' : 'text-green-600'}`} />
                                    </span>
                                </div>

                                <div class="w-1/3 h-1 bg-green-600"></div>
                            </div>
                            <span class="block text-base text-center mt-4">Order Placed</span>
                        </div>

                        <div className='w-1/5'>
                            <div className='flex w-full justify-end items-center'>
                                <div class="w-1/3 h-1 bg-green-600"></div>
                                <div className='w-1/3 flex justify-end'>
                                    <span class={`block font-bold p-2 border-4 rounded-full ${orderIdState?.attributes?.status?.data?.id === 2 ? 'bg-green-600' : ''}  w-full h-auto border-green-600`}>
                                        <MdOutlinePayments className={`w-9 h-auto ${orderIdState?.attributes?.status?.data?.id === 2 ? 'text-white' : 'text-green-600'}`} />
                                    </span>
                                </div>

                                <div class="w-1/3 h-1 bg-green-600"></div>
                            </div>
                            <span class="block text-base text-center mt-4">Order Confirmed</span>
                        </div>

                        <div className='w-1/5'>
                            <div className='flex w-full justify-end items-center'>
                                <div class="w-1/3 h-1 bg-green-600"></div>
                                <div className='w-1/3 flex justify-end'>
                                    <span class={`block font-bold p-2 border-4 rounded-full ${orderIdState?.attributes?.status?.data?.id === 3 ? 'bg-green-600' : ''}  w-full h-auto border-green-600`}>
                                        <MdOutlineLocalShipping className={`w-9 h-auto ${orderIdState?.attributes?.status?.data?.id === 3 ? 'text-white' : 'text-green-600'}`} />
                                    </span>

                                </div>

                                <div class="w-1/3 h-1 bg-green-600"></div>
                            </div>
                            <span class="block text-base text-center mt-4">Delivering</span>
                        </div>

                        <div className='w-1/5'>
                            <div className='flex w-full justify-end items-center'>
                                <div class="w-1/3 h-1 bg-green-600"></div>
                                <div className='w-1/3 flex justify-end'>
                                    <span class={`block font-bold p-2 border-4 rounded-full ${orderIdState?.attributes?.status?.data?.id === 4 ? 'bg-green-600' : ''}  w-full h-auto border-green-600`}>
                                        <HiInboxArrowDown className={`w-9 h-auto ${orderIdState?.attributes?.status?.data?.id === 4 ? 'text-white' : 'text-green-600'}`} />
                                    </span>

                                </div>

                                <div class="w-1/3 h-1 bg-green-600"></div>
                            </div>
                            <span class="block text-base text-center mt-4">Received The Goods</span>
                        </div>

                        <div className='w-1/5'>
                            <div className='flex w-full justify-start items-center'>
                                <div class="w-1/3 h-1 bg-green-600"></div>
                                <div className='w-1/3 flex justify-end'>
                                    <span class="block font-bold p-2 border-4 rounded-full border-green-600 w-full h-auto"><FaRegStar className='w-9 h-auto text-green-600' /></span>
                                </div>
                            </div>
                            <span class="block text-base text-center mt-4">Review</span>
                        </div>

                    </div>

                </div>
                <div className='mt-0.5'>
                    <div className='w-full'>
                        <div className='bg-be w-full p-4 text-right'>
                            <button className='p-2 px-9 bg-orange-600 text-white w-40'>Review</button>
                        </div>

                        <div className='bg-be my-0.5 p-4 text-right'>
                            <button className='p-2 px-6 border border-gray-300 w-40'>Contact seller</button>
                        </div>

                        <div className='bg-be p-4 text-right'>
                            <button className='p-2 px-6 border border-orange-600 text-orange-600 w-40'>Repurchase</button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <div className="border-t-2 border-red-500 flex-1"></div>
                    <div className="border-t-2 border-orange-500 flex-1"></div>
                    <div className="border-t-2 border-yellow-500 flex-1"></div>
                    <div className="border-t-2 border-green-500 flex-1"></div>
                    <div className="border-t-2 border-blue-500 flex-1"></div>
                    <div className="border-t-2 border-indigo-500 flex-1"></div>
                    <div className="border-t-2 border-violet-500 flex-1"></div>
                </div>
                <div className='bg-white mt-0.5'>
                    <h3 className='p-4 border-b text-lg font-medium'>Order Detail</h3>
                    <div className='p-4 flex'>
                        <div className='w-1/2'>
                            <span className='font-medium py-2 border-b border-orange-600'>User Detail</span>
                            <div className='mt-4 text-sm'>
                                <h3>Full name: {orderIdState?.attributes?.address_ship?.data?.attributes?.nameReceive}</h3>
                                <h3>Phone Number: (+84){orderIdState?.attributes?.address_ship?.data?.attributes?.phoneReceive}</h3>
                            </div>
                        </div>

                        <div className='w-1/2'>
                            <span className='font-medium py-2 border-b border-orange-600'>Delivery Address</span>
                            <div className='mt-4 text-sm'>
                                <h3>Address: {orderIdState?.attributes?.address_ship?.data?.attributes?.address}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='bg-white p-4 border-t'>
                    <div className='flex justify-between items-center border-b border-gray-300 pb-3'>
                        <div className='flex items-center'>
                            <label className='text-xs font-medium px-2 py-1 rounded-md bg-orange-600 text-white mr-2'>Favourite</label>
                            <span className='text-lg font-medium'>|</span>
                            <div className='flex items-center mr-2'><span className='mx-2'><FaShop className='' /></span> <label className='text-xs font-medium '>Accessory shop</label></div>
                            <span className='text-lg font-medium'>|</span>
                            <div className='flex items-center px-2 py-1 border-2 rounded-md border-orange-600 mx-2'><span><FaShop className='mr-2 text-orange-600' /></span><label className='text-xs font-medium text-orange-600'>Shop now</label></div>
                        </div>
                    </div>
                    <div className=''>
                        {orderIdState?.attributes?.products?.map((product) => (
                            <div className='flex py-2 border-b border-gray-300 items-center'>
                                <div className='w-1/2 flex'>
                                    <img src={baseURLImg + product?.product?.attributes?.productImg?.data[0].attributes?.url} className='w-20 h-20'></img>

                                    <div>
                                        <h3 className='text-base font-medium'>{product?.product?.attributes?.productName}</h3>
                                        <label className='text-sm'>{product?.product?.attributes?.category?.data?.attributes?.categoryName}</label>
                                        <h3>X {product.quantity}</h3>
                                    </div>
                                </div>

                                <div className='w-1/2'>
                                    <h3 className='text-right'>{product?.product?.attributes?.productPrice}.00 USD</h3>
                                </div>

                            </div>
                        ))

                        }

                    </div>
                </div>

                <div className='border-t bg-white text-right'>
                    <div className='text-sm border-b px-4 flex'>
                        <div className='w-2/3 border-r p-3'><h3>Total cost of goods</h3></div>
                        <div className='w-1/3 py-3'><h3>${subtotal}.00</h3></div>
                    </div>
                    <div className='text-sm border-b px-4 flex '>
                        <div className='w-2/3 border-r  p-3'><h3>Transport fee</h3></div>
                        <div className='w-1/3 py-3'><h3>${orderIdState?.attributes?.shipping?.data?.attributes?.shippingPrice}.00</h3></div>
                    </div>
                    <div className='text-sm border-b px-4 flex'>
                        <div className='w-2/3 border-r p-3'><h3>Total amount</h3></div>
                        <div className='w-1/3 py-3 text-lg text-orange-600 font-medium'><h3>${orderIdState?.attributes?.totalPrice}.00</h3></div>
                    </div>
                    <div className='text-sm border-b px-4 flex'>
                        <div className='w-2/3 border-r p-3'><h3>Payment methods</h3></div>
                        <div className='w-1/3 py-3 text-base'><h3>{orderIdState?.attributes?.payment?.data?.attributes?.paymentName}</h3></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default OrderDetail