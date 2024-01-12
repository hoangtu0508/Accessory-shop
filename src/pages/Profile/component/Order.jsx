import React, { useEffect, useState } from 'react'
import { FaShop } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderUser } from '../../../features/order/orderSlice'
import { baseURLImg } from '../../../utils/api'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { GrNext, GrPrevious } from "react-icons/gr";
import { Link } from 'react-router-dom'
import Review from '../../../component/Review/Review'
import { setproductReview } from '../../../features/review/reviewSlice'

const Order = () => {
    const user = JSON.parse(localStorage.getItem("customer"));
    const userId = user?.user.id
    const dispatch = useDispatch()

    const [orders, setOrders] = useState()
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1);
    const [showReview, setShowReview] = useState(false)

    const orderState = useSelector((state) => state?.order?.orderUser?.data);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders?.slice(indexOfFirstItem, indexOfLastItem);

    console.log(showReview);

    const totalPages = Math.ceil(orders?.length / itemsPerPage);

    useEffect(() => {
        if (Array.isArray(orderState)) {
            const sortedOrders = orderState.slice().sort((a, b) => b.id - a.id);
            setOrders(sortedOrders)
        } else {
            console.error("orderState không phải là một mảng hoặc không tồn tại.");
        }
    }, [orderState])

    useEffect(() => {
        dispatch(getOrderUser(userId))
    }, [])

    const prev = () => {
        if (currentPage === 1) {
        } else {
            setCurrentPage(currentPage - 1);
        }
    };

    const next = () => {
        if (currentPage === totalPages) {
        } else {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleReview = (productReview) => {
        setShowReview(true)
        dispatch(setproductReview(productReview))
    }
    console.log(orders);
    return (
        <div className='mb-10'>
            {showReview && <Review setShowReview={setShowReview} />}
            <div className='text-left bg-white py-4 px-3 rounded-xl'>
                <label className='font-medium py-1 px-1 border-b-2 border-orange-600'>All Order</label>
            </div>

            {currentItems?.map((order) => (
                <div className='bg-white mt-4 p-4'>
                    <div className='flex justify-between items-center border-b border-gray-300 pb-3'>
                        <div className='flex items-center'>
                            <label className='text-xs font-medium px-2 py-1 rounded-md bg-orange-600 text-white mr-2'>Favourite</label>
                            <span className='text-lg font-medium'>|</span>
                            <div className='flex items-center mr-2'><span className='mx-2'><FaShop className='' /></span> <label className='text-xs font-medium '>Accessory shop</label></div>
                            <span className='text-lg font-medium'>|</span>
                            <div className='flex items-center px-2 py-1 border-2 rounded-md border-orange-600 mx-2'><span><FaShop className='mr-2 text-orange-600' /></span><label className='text-xs font-medium text-orange-600'>Shop now</label></div>
                        </div>

                        <div className='flex items-center'>
                            <label className='font-normal'>{order?.attributes?.status?.data?.attributes?.statusName}</label>
                            <span className='text-lg font-medium mx-2'>|</span>
                            <label>{order?.attributes?.payment?.data?.attributes?.paymentName}</label>
                        </div>
                    </div>

                    <Link to={`/user/order/${order?.id}`}>
                        <div className=''>
                            {order?.attributes?.products?.map((product) => (
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

                        </div></Link>

                    <div className='flex justify-end'>
                        <h3 className='text-lg my-4 flex items-center'><span><FaMoneyBillAlt className='mr-2 w-5 h-5 text-orange-600' /></span>Total Money: <span className='font-medium text-orange-600 text-xl ml-2'>{order?.attributes?.totalPrice}.00 USD</span></h3>
                    </div>

                    <div className='flex justify-end'>
                        <div onClick={() => handleReview(order?.attributes?.products)}>
                            <Link to={''}><h3 className='p-2 px-9 bg-orange-600 text-white'>Review</h3></Link>
                        </div>

                        <div>
                            <Link><h3 className='p-2 px-6 border border-gray-300 mx-4 '>Contact seller</h3></Link>
                        </div>

                        <div>
                            <Link><h3 className='p-2 px-6 border border-orange-600 text-orange-600 '>Repurchase</h3></Link>
                        </div>
                    </div>
                </div>
            ))
            }

            <div className='flex justify-between p-4 mt-4 bg-white'>
                <div className="flex">
                    <h4>Show</h4>
                    <input
                        type="number"
                        min={10}
                        max={orders?.length}
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                        className='border border-gray-500 rounded-sm px-2 w-12 mx-2 font-medium text-orange-600'
                    />
                    <h4>order page</h4>
                </div>

                <div className='flex items-center'>
                    <div className='icon'
                        onClick={() => prev()}>
                        <GrPrevious className='icon-prev' />
                    </div>
                    <div className="page-number">
                        <span className='mx-2'>1</span>
                        <input
                            type="number"
                            min="1"
                            max={totalPages}
                            value={currentPage}
                            onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                            className='w-12 border border-gray-500 rounded-sm px-2 text-orange-600 mx-2 font-medium'
                        />
                        <span className='mx-2'>{totalPages}</span>
                    </div>
                    <div className='icon' onClick={() => next()}><GrNext className='icon-next' /></div>

                    <div className="ml-4">
                        <h4>Total: <span className='font-medium text-orange-600'>{orders?.length}</span> Orders</h4>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default Order