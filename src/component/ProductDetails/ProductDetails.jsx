import React, { useEffect, useState } from 'react'
import { MdAttachMoney, MdDone, MdOutlineColorLens, MdOutlineSecurity } from 'react-icons/md'
import { LiaRulerHorizontalSolid, LiaShippingFastSolid } from 'react-icons/lia'
import { TiTick } from 'react-icons/ti'
import { SiFireship, SiQualys } from 'react-icons/si'
import { AiOutlineEye } from 'react-icons/ai'
import Description from './Container/Description'
import Review from './Container/Review'
import Shipping from './Container/Shipping'
import Return from './Container/Return'
import Button from '../Button/Button'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, getProductDetails, increment, resetQuantity } from '../../features/product/productSlice'
import { baseURL, baseURLImg, params } from '../../utils/api'
import { toast } from 'react-toastify'
import { addCart } from '../../features/cart/cartSlice'
import { BsFire } from "react-icons/bs";
import { FaEthereum, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { PiHandCoinsLight, PiShoppingBagLight } from "react-icons/pi";
import { RiBattery2ChargeLine } from "react-icons/ri";

const ProductDetails = () => {
    const [activeComponent, setActiveComponent] = useState(1)

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("customer"));
    const userId = user?.user.id

    const { id } = useParams()
    const dispatch = useDispatch()

    const product = useSelector((state) => state?.product?.productDetails?.data[0])
    const stockQuantity = product?.attributes.productQuantity

    console.log(product);
    const quantity = useSelector((state) => state?.product[product?.id]?.quantity || 1);
    console.log(quantity);

    useEffect(() => {
        dispatch(getProductDetails(id))
    }, [id])

    const handleActiveComponent = (number) => {
        setActiveComponent(number)
    }

    const handleAddToCart = (userId, product, quantity) => {
        if (token) {
            dispatch(addCart({ userId, product, quantity }))
            dispatch(resetQuantity({ productId: product.id }));
        } else {
            toast.info("Please log in to add products to cart!");
        }
    }

    const handleIncrement = (id) => {
        if (quantity < stockQuantity) {
            dispatch(increment({ productId: id }))
        } else {
            toast('Quantity has exceeded in stock')
        }
    }

    console.log(product);
    return (
        <div className='py-16'>
            <section class="pt-10 font-poppins dark:bg-gray-800">
                <div class="w-10/12 px-4 mx-auto">
                    <div class="flex mb-4 m-auto w-full">
                        <div class="mb-8 w-4/12">
                            <div class="sticky top-0">
                                <div class="relative flex justify-center">
                                    <a class="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-5 h-5 text-blue-500 bi bi-chevron-left dark:text-blue-200" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z">
                                            </path>
                                        </svg>
                                    </a>
                                    <img class="object-contain w-10/12" src={baseURLImg + product?.attributes?.productImg?.data[0].attributes?.url} alt="" />
                                    <a class="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-5 h-5 text-blue-500 bi bi-chevron-right dark:text-blue-200" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                            </path>
                                        </svg>
                                    </a>
                                </div>
                                <div class="flex-wrap hidden -mx-2 md:flex">
                                    <div class="w-1/2 p-2 sm:w-1/4">
                                        <a class="block border border-gray-200 hover:border-purple-700 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                            <img class="object-contain w-full lg:h-28" src="https://i.postimg.cc/Z5KhRkD6/download-1-removebg-preview.png" alt="" />
                                        </a>
                                    </div>
                                    <div class="w-1/2 p-2 sm:w-1/4">
                                        <a class="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                            <img class="object-contain w-full lg:h-28" src="https://i.postimg.cc/8kJBrw03/download-removebg-preview.png" alt="" />
                                        </a>
                                    </div>
                                    <div class="w-1/2 p-2 sm:w-1/4">
                                        <a class="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                            <img class="object-contain w-full lg:h-28" src="https://i.postimg.cc/0jwyVgqz/Microprocessor1-removebg-preview.png" alt="" />
                                        </a>
                                    </div>
                                    <div class="w-1/2 p-2 sm:w-1/4">
                                        <a class="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                            <img class="object-contain w-full lg:h-28" src="https://i.postimg.cc/0N4Kk1PN/black-microprocessors-removebg-preview.png" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="w-5/12 mx-4">
                            <div class="">
                                <div class="mb-6 ">

                                    <h2 class="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300 border-b pb-6 border-gray-300">
                                        {product?.attributes?.productName}
                                    </h2>

                                    <div class="flex flex-wrap items-center mb-6">
                                        <ul class="flex items-center">
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                                                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                        {stockQuantity > 0 ? (
                                            <div className='flex items-center  px-3 py-1 border-x border-gray-500 mx-3'>
                                                <span><MdDone className='text-green-600 w-5 h-auto' /></span>
                                                <span class="px-2.5 py-0.5 text-base font-medium text-green-600 font-medium dark:bg-gray-700 rounded-xl dark:text-gray-200">In stock</span>
                                            </div>
                                        ) : (
                                            <div className='flex items-center  px-3 py-1 border-x border-gray-500 mx-3'>
                                                <span><MdDone className='text-red-600 w-5 h-auto' /></span>
                                                <span class="px-2.5 py-0.5 text-base font-medium text-red-500 font-medium dark:bg-gray-700 rounded-xl dark:text-gray-200">Out of stock</span>
                                            </div>
                                        )}

                                        <div className='flex items-center bg-red-700 rounded-full px-2 py-1'>
                                            <span><BsFire className='text-yellow-400' /></span>
                                            <span class="px-2.5 py-0.5 text-xs text-white font-medium dark:bg-gray-700 rounded-xl dark:text-gray-200">New
                                                Arrival</span>
                                        </div>

                                    </div>

                                </div>
                                <div class="mb-6">
                                    <div class="bg-gray-200 dark:bg-gray-700 rounded-xl">
                                        <div class="p-3 flex items-center">

                                            <div class="flex p-2 rounded-xl dark:bg-gray-800 items-center">
                                                <span><MdAttachMoney className='w-7 h-auto' /></span>
                                                <span className='text-xl font-medium'>{product?.attributes?.productPrice}.00 USD</span>
                                            </div>

                                            <span>Or</span>

                                            <div class="flex p-2 rounded-xl dark:bg-gray-800 items-center">
                                                <span><FaEthereum className='w-5 h-auto text-yellow-600' /></span>
                                                <span className='text-base font-medium text-yellow-600'>{product?.attributes?.productPrice}.00 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-6 "></div>
                                <div class="flex flex-wrap items-center mb-6">
                                    <div class="w-3/12 mb-4 mr-4 lg:mb-0">
                                        <div class="w-28">
                                            <div class="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                                                <button class="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                                                    <span class="m-auto text-2xl font-thin" onClick={() => dispatch(decrement({ productId: product.id }))}>-</span>
                                                </button>
                                                <input type="number" class="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black" placeholder={quantity} />
                                                <button class="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                                                    <span class="m-auto text-2xl font-thin" onClick={() => handleIncrement(product.id)}>+</span>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-2/12 mb-4 lg:mb-0">
                                        <button class="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class=" bi bi-heart" viewBox="0 0 16 16">
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>

                                    {stockQuantity > 0 ? (
                                        <div className='w-6/12 rounded-full shadow-lg h-12 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5' onClick={() => handleAddToCart(userId, product, quantity)}>
                                            <button className='rounded-full shadow-lg m-auto h-full hover:text-white hover:bg-transparent w-full bg-white text-text'>Add to cart</button>
                                        </div>
                                    ) : (
                                        <div><h3 className='px-4 mt-2 font-medium text-yellow-500'>Our products are currently out of stock</h3></div>
                                    )}
                                </div>
                                {stockQuantity > 0 && (
                                    <div class="flex gap-4 mb-6 h-12">
                                        <Button name='Buy now' />
                                    </div>
                                )}
                                <div class="py-6 mb-6 border-t border-b border-gray-300 dark:border-gray-700">
                                    <div className='flex text-green-500 items-center'>
                                        <span className=' border border-green-500 rounded-full'><TiTick /></span>
                                        <span class="text-base font-medium dark:text-gray-400 ml-3">In Stock <span className='font-bold'>{product?.attributes?.productQuantity}</span> product</span>
                                    </div>
                                    <div className='flex text-red-500 items-center'>
                                        <span className=''><SiFireship /></span>
                                        <span class="text-base font-medium dark:text-gray-400 ml-3">32 sold in last 7 hours</span>
                                    </div>
                                    <div className='flex text-yellow-500 items-center'>
                                        <span className=''><AiOutlineEye /></span>
                                        <span class="text-base font-medium dark:text-gray-400 ml-3">32 people are viewing this right now</span>
                                    </div>
                                    <div className='flex items-center font-medium'>
                                        <span><LiaShippingFastSolid /></span>
                                        <span class="text-gray-600 dark:text-gray-400 ml-3">
                                            Order in the next 3 - 5 days to get it between
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className='w-3/12'>
                            <div className='flex w-full'>
                                <div className='w-1/2 mr-2'>
                                    <select className='bg-transparent text-sm font-light px-2 py-1 border border-gray-500 rounded-full'>
                                        <option className='bg-transparent text-sm font-light'>All provinces, cities</option>
                                    </select>
                                </div>
                                <div className='w-1/2 ml-2'>
                                    <select className='bg-transparent text-sm font-light px-2 py-1 border border-gray-500 rounded-full w-full'>
                                        <option className='bg-transparent text-sm font-light'>All provinces, districts</option>
                                    </select>
                                </div>
                            </div>

                            <div className='flex items-center my-2'>
                                <span><FaMapMarkerAlt className='text-red-700' /></span>
                                <h3 className='ml-2'>List of stores in stock</h3>
                            </div>

                            <div className='pb-4 border-b border-gray-300'>
                                <div className='flex'>
                                    <span className='mr-4 text-red-700'>(+84) 0393053290</span>
                                    <span className='font-medium text-sm'>Accessory shop</span>
                                </div>
                                <div>
                                    <h3 className='text-sm'>Ba Giang 12, Hoa Quy, Ngu Hanh Son, DN</h3>
                                </div>
                            </div>

                            <div className='mt-4 border-2 border-gray-300 rounded-lg p-4 bg-gray-200'>
                                <h2 className='text-center text-sm font-medium text-red-700'>WHY YOU SHOULD CHOOSE ACCESSORY</h2>
                                <div className='flex items-center mt-3'>
                                    <span><SiQualys className='w-7 h-auto mr-2 text-red-700' /></span>
                                    <h3 className='text-xs font-medium'>100% GENUINE INTERNATIONAL STANDARDS</h3>
                                </div>
                                <div className='flex items-center mt-3'>
                                    <span><MdOutlineSecurity className='w-7 h-auto mr-2 text-red-700' /></span>
                                    <h3 className='text-xs font-medium'>FREE ACCESSORY CARE MAINTENANCE PACKAGE UP TO 7 MILLION</h3>
                                </div>
                                <div className='flex items-center mt-3'>
                                    <span><PiShoppingBagLight className='w-7 h-auto mr-2 text-red-700' /></span>
                                    <h3 className='text-xs font-medium'>GENUINE AUTHORIZED WARRANTY CENTER</h3>
                                </div>
                                <div className='flex items-center mt-3'>
                                    <span><PiHandCoinsLight className='w-7 h-auto mr-2 text-red-700' /></span>
                                    <h3 className='text-xs font-medium'>0% INSTALLMENT SUPPORT</h3>
                                </div>
                                <div className='flex items-center mt-3'>
                                    <span><RiBattery2ChargeLine className='w-7 h-auto mr-2 text-red-700' /></span>
                                    <h3 className='text-xs font-medium'>FREE LIFETIME BATTERY REPLACEMENT</h3>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <div className='flex items-center'>
                                    <span><FaPhone className='text-green-600' /></span>
                                    <h3 className='text-sm font-medium ml-2'>Leave your phone number for consultation</h3>
                                </div>

                                <div className='mt-4 flex'>
                                    <input className='w-7/12 font-light text-sm p-2 px-3 rounded-full bg-transparent border border-purple-600' type='number' placeholder='Phone number'></input>
                                    <div className='w-5/12'>
                                        <button className='bg-purple-600 w-full py-2 rounded-full ml-2 text-white font-medium'>Send</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='border-b border-gray-400 w-full'>
                            <ul className=' flex justify-center'>
                                <li
                                    onClick={() => handleActiveComponent(1)}
                                    className={`py-3 font-medium text-xl mx-6 ${activeComponent === 1 ? 'text-gray-800 border-b-2 border-purple-700' : 'text-gray-400 hover:text-gray-800'
                                        }`}
                                >
                                    Description
                                </li>
                                <li
                                    onClick={() => handleActiveComponent(2)}
                                    className={`py-3 font-medium text-xl mx-6 ${activeComponent === 2 ? 'text-gray-800 border-b-2 border-purple-700' : 'text-gray-400 hover:text-gray-800'
                                        }`}
                                >
                                    Review
                                </li>
                                <li
                                    onClick={() => handleActiveComponent(3)}
                                    className={`py-3 font-medium text-xl mx-6 ${activeComponent === 3 ? 'text-gray-800 border-b-2 border-purple-700' : 'text-gray-400 hover:text-gray-800'
                                        }`}
                                >
                                    Shipping
                                </li><li
                                    onClick={() => handleActiveComponent(4)}
                                    className={`py-3 font-medium text-xl mx-6 ${activeComponent === 4 ? 'text-gray-800 border-b-2 border-purple-700' : 'text-gray-400 hover:text-gray-800'
                                        }`}
                                >
                                    Return
                                </li>
                            </ul>
                        </div>

                        {activeComponent === 1 && <Description product={product} />}
                        {activeComponent === 2 && <Review product={product} />}
                        {activeComponent === 3 && <Shipping />}
                        {activeComponent === 4 && <Return />}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductDetails