import React, { useEffect, useState } from 'react'
import { AiOutlineEye, AiTwotoneHeart, AiTwotoneStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { IoMdAdd, IoMdClock } from 'react-icons/io'
import { HiOutlineMinusSm } from 'react-icons/hi'
import Button from '../Button/Button'
import { baseURLImg } from '../../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, resetQuantity } from '../../features/product/productSlice'
import { addCart } from '../../features/cart/cartSlice'
import { toast } from 'react-toastify'
import { converEth } from '../../utils/utils'
import { FaEthereum } from 'react-icons/fa'
import { CiRuler } from "react-icons/ci";

const Product = (props) => {
    const [priceEth, setPriceEth] = useState(null)
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const product = props.product

    console.log(product);
    const price = product?.attributes?.productPrice
    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token)
        const user = JSON.parse(localStorage.getItem("customer"));
        const userId = user?.user.id
        setUserId(userId)
    }, [])

    console.log(userId);

    const dispatch = useDispatch();
    const quantity = useSelector((state) => state.product[product.id]?.quantity || 1);
    const ethPrice = useSelector((state) => state?.currency?.ethPrice)

    useEffect(() => {
        if (price) {
            setPriceEth(converEth(ethPrice, price))
        }
    }, [price, ethPrice])

    const handleAddToCart = (userId, product, quantity) => {
        if (token) {
            dispatch(addCart({ userId, product, quantity }))
            dispatch(resetQuantity({ productId: product.id }));
        } else {
            toast.info("Please log in to add products to cart!");
        }
    }

    console.log(product);

    return (
        <div>

            <div className="relative">
                <div className="container">
                    <div className="max-w-md w-full rounded-xl p-6 bg-white shadow-md">
                        <Link to={`/product-details/${product.id}`}>
                            <div className="flex flex-col ">
                                <div className="">
                                    <div className="relative h-62 w-full mb-3">
                                        <div className="absolute flex flex-col top-0 right-0 p-3">
                                            <button className="transition ease-in duration-300  hover:text-purple-500 hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1 hover:border border-text"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg></button>
                                        </div>
                                        <img src={baseURLImg + product?.attributes?.productImg?.data[0].attributes?.url} alt="Just a flower" className=" object-fill rounded-2xl w-60 h-64" />
                                    </div>
                                    <div className="flex-auto justify-evenly">
                                        <div className="flex flex-wrap ">
                                            <div className="w-full flex-none text-sm flex items-center text-gray-600 justify-between">
                                                <div className='flex items-center'>
                                                    <span className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <AiTwotoneStar />
                                                    </span>
                                                    <span className="text-gray-400 whitespace-nowrap mr-3">{product?.attributes?.productStar}</span>
                                                </div>
                                                <div className='flex items-center'>
                                                    <span className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <AiTwotoneHeart />
                                                    </span>
                                                    <span className="text-gray-400 whitespace-nowrap mr-3">{product?.attributes?.productHeart}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center w-full justify-between min-w-0 ">
                                                <h2 className="text-lg mr-auto cursor-pointer text-text hover:text-purple-500 truncate ">{product?.attributes?.productName}</h2>

                                            </div>
                                        </div>
                                        <div className='flex items-end'>
                                            <span className="text-base text-text font-semibold mt-1">${product?.attributes?.productPrice}.00 USD</span>
                                            <div className='flex items-center'>
                                                <span className='text-gray-400 ml-3'><FaEthereum className='text-amber-600' /></span>
                                                <span>{priceEth?.toFixed(4)} ETH</span>
                                            </div>

                                        </div>
                                        <div className="lg:flex  py-4  text-sm text-gray-600">
                                            <div className="w-1/2 inline-flex items-center mr-1">
                                                <div className="w-full flex-none text-sm flex items-center text-gray-600">
                                                    <IoMdClock className='w-5 h-auto' />
                                                    <span className='ml-4'>{product?.attributes?.category?.data?.attributes?.categoryName}</span>
                                                </div>
                                            </div>
                                            <div className="w-1/2 inline-flex items-center ml-1">
                                                <CiRuler className='w-5 h-auto' />
                                                <span className='ml-4'>{product?.attributes?.productDiameter} mm</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </Link>

                        <div className="flex space-x-2 text-sm font-medium w-full">
                            <div className='w-5/12 flex items-center'>
                                <span className='w-4/12 border py-3 rounded-l-full'><HiOutlineMinusSm className='m-auto' onClick={() => dispatch(decrement({ productId: product.id }))} /></span>
                                <input className='w-4/12 border h-full px-2' value={quantity}></input>
                                <span className='w-4/12 border py-3 rounded-r-full'><IoMdAdd className='m-auto' onClick={() => dispatch(increment({ productId: product.id }))} /></span>
                            </div>
                            <div className="w-5/12 transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 justify-center"
                                onClick={() => handleAddToCart(userId, product, quantity)}
                            >
                                <Button name='Add Cart' />
                            </div>
                            <span className="w-2/12 flex items-center justify-center transition ease-in duration-300 hover:bg-gray-800 border hover:border-gray-500 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-1">
                                <AiOutlineEye className='h-6 w-6' />
                            </span>
                        </div>

                    </div>
                </div>
            </div>


        </div >
    )
}

export default Product