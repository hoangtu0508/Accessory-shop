import React, { useEffect } from 'react'
import './ShoppingCart.scss'
import { AiOutlineClose, AiOutlineEdit, AiOutlineHeart, AiTwotoneStar } from 'react-icons/ai'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import Button from '../Button/Button'
import banner from '../../img/banner-cart.avif'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decrementProductCart, getProductCart, incrementProductCart, removeProductCart } from '../../features/cart/cartSlice'
import { baseURLImg } from '../../utils/api'
import { calculateTotalPrice } from '../../utils/utils'
import ProductCart from './ProductCart/ProductCart'

const ShoppingCart = (props) => {
    const mavigate = useNavigate()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("customer"));
    const userId = user?.user.id

    const productCartState = useSelector((state) => state?.cart?.productCart?.data[0])
    const productCart = productCartState?.attributes?.products

    useEffect(() => {
        dispatch(getProductCart(userId))
    }, [dispatch])


    const productsHot = [
        {
            id: 1,
            name: 'Polaroid camera',
            price: 59.99,
            priceSale: 59.99,
            color: 'Blue',
            size: 'M',
            category: 'Classic',
            url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80'
        },
        {
            id: 1,
            name: 'Polaroid camera',
            price: 59.99,
            color: 'Blue',
            size: 'M',
            priceSale: 59.99,
            category: 'Classic',
            url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80'
        },
        {
            id: 1,
            name: 'Polaroid camera',
            price: 59.99,
            color: 'Blue',
            size: 'M',
            priceSale: 59.99,
            category: 'Classic',
            url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80'
        },
        {
            id: 1,
            name: 'Polaroid camera',
            price: 59.99,
            priceSale: 59.99,
            color: 'Blue',
            size: 'M',
            category: 'Classic',
            url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80'
        },
    ]
    const setShowCart = props.setShowCart

    const handleViewCart = () => {
        setShowCart(false)
        mavigate('/cart/your-cart')
    }

    const handleCheckout = () => {
        setShowCart(false)
        mavigate('/cart/checkout')
    }

    return (
        <div className='fixed w-full h-screen bg-black z-50 bg-opacity-50'>
            {productCart?.length && (
                <div className=' w-96 bg-white float-right h-screen px-8'>
                    <div className=' py-6'>
                        <div className="flex items-center justify-end">
                            <h4>Close</h4>
                            <span onClick={() => setShowCart(false)}>
                                <AiOutlineClose className="w-6 h-auto ml-3" />
                            </span>
                        </div>
                        <div className="text-left">
                            <h3 className="text-25 text-lg font-medium">Shopping Cart (3)</h3>
                        </div>
                    </div>

                    <div className='overflow-y-scroll h-1/2 w-full custom pr-2'>
                        <ul className="flex flex-col divide-y divide-gray-700 ">
                            {
                                productCart?.map((product, index) => (
                                    <li className="py-6 sm:flex-row sm:justify-between">
                                        <ProductCart product={product} indexId={index} />
                                    </li>
                                ))
                            }

                        </ul>
                    </div>

                    <div className=''>
                        <div className="space-y-1 text-right my-6">
                            <div className='flex items-center justify-between'>
                                {/* <p className='font-medium'>Total amount:</p>
                                <span className="font-semibold">{totalPrice}.00 $</span> */}
                            </div>
                            <p className="text-sm dark:text-gray-400 text-left">Taxes and shipping calculated at checkout</p>
                        </div>

                        <div id="scroll-container" className='py-4 border-y-2 border-dotted'>
                            <p id="scroll-text" className='font-normal'>
                                All charges are billed in <span className="text-text">USD</span>. While the content of your cart is currently displayed in <span className='text-text'>VND</span>, the checkout will use <span className='text-black'>USD</span> at the most current exchange rate.
                            </p>
                        </div>

                        <div className='flex mt-6'>
                            <div className='w-1/2 mr-2' onClick={() => handleCheckout()}>
                                <Button name='CHECK OUT' />
                            </div>
                            <div className='ml-2 w-6/12 rounded-full shadow-lg h-12 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5' onClick={() => handleViewCart()} >
                                <button className='rounded-full shadow-lg m-auto h-full hover:text-white hover:bg-transparent w-full bg-white text-text'>VIEW CART</button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {!productCart?.length && (
                <div className=' w-96 bg-white float-right h-screen'>
                    <div className=''>
                        <div className="z-10 fixed flex items-center p-6 right-0">
                            <span onClick={() => setShowCart(false)}>
                                <AiOutlineClose className="w-6 h-auto ml-3" />
                            </span>
                        </div>
                        <img src={banner} alt="" className='w-full' />
                    </div>

                    <div className='p-6 text-center'>
                        <h3 className='text-lg font-medium'>Take <span className='text-cyan-400'>15% off</span> your first order</h3>
                        <p className='text-base my-2'>Enter the code: <span className='font-medium'><u>CODE15OFF</u></span></p>
                    </div>

                    <div className='px-6 h-14'>
                        <Button name='CONTINUE SHOPPING' />
                    </div>
                    <div className='p-6 border-b'>
                        <h3 className='font-medium text-base'>Recommended</h3>
                    </div>

                    <div className='px-10 overflow-y-scroll custom h-1/3 mr-3'>
                        <ul>
                            {productsHot.map((product) => (
                                <li className="py-6 sm:flex-row sm:justify-between">
                                    <div className="flex w-full space-x-2 sm:space-x-4">
                                        <div className='w-1/3'>
                                            <img className="w-full flex-shrink-0 object-cover dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={product.url} alt="Polaroid camera" />
                                        </div>
                                        <div className="flex flex-col justify-between w-2/3 pb-4">
                                            <div className="w-full pb-2">
                                                <div className='flex items-center text-xs'>
                                                    <div className='flex text-yellow-400'>
                                                        <span><AiTwotoneStar /></span>
                                                        <span><AiTwotoneStar /></span>
                                                        <span><AiTwotoneStar /></span>
                                                        <span><AiTwotoneStar /></span>
                                                        <span><AiTwotoneStar /></span>
                                                    </div>
                                                    <span>(5)</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-base font-medium leadi sm:pr-8">{product.name}</h3>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-base font-semibold mr-3">{product.priceSale}$</p>
                                                </div>
                                                <div className='flex text-sm my-1 font-medium'>
                                                    <span>Size: </span>
                                                    <div className='ml-3'>
                                                        <span className="hover:text-purple-500 p-1 py-0 border-b-2 border-text">S</span>
                                                        <span className="hover:text-purple-500 p-1 py-0">M</span>
                                                        <span className="hover:text-purple-500 p-1 py-0">L</span>
                                                        <span className="hover:text-purple-500 p-1 py-0">XL</span>
                                                    </div>
                                                </div>
                                                <div className='mt-3'>
                                                    <ul className="flex flex-row items-center space-x-2">
                                                        <li className="">
                                                            <span className="block p-1 border-2 border-blue-600 rounded-full transition ease-in duration-300">
                                                                <a href="#blue" className="block w-3 h-3 bg-blue-600 rounded-full"></a>
                                                            </span>
                                                        </li>
                                                        <li className="">
                                                            <span className="block p-1 border-2 hover:border-yellow-400 rounded-full transition ease-in duration-300">
                                                                <a href="#yellow" className="block w-3 h-3  bg-yellow-400 rounded-full"></a>
                                                            </span>
                                                        </li>
                                                        <li className="">
                                                            <span className="block p-1 border-2 hover:border-red-500 rounded-full transition ease-in duration-300">
                                                                <a href="#red" className="block w-3 h-3  bg-red-500 rounded-full"></a>
                                                            </span>
                                                        </li>
                                                        <li className="">
                                                            <span className="block p-1 border-2 hover:border-green-500 rounded-full transition ease-in duration-300">
                                                                <a href="#green" className="block w-3 h-3  bg-green-500 rounded-full"></a>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <div className='grid grid-cols-3 items-center border p-2 w-4/12'>
                                            <span><IoMdRemove /></span>
                                            <span>1</span>
                                            <span><IoMdAdd /></span>
                                        </div>
                                        <div className='w-6/12 text-base mx-2'>
                                            <Button name='ADD TO CART' />
                                        </div>
                                        <div className='w-2/12 border flex items-center justify-center rounded-lg hover:border-text'>
                                            <span><AiOutlineHeart className='w-7 h-auto' /></span>
                                        </div>
                                    </div>
                                </li>
                            ))

                            }
                        </ul>
                    </div>
                </div>
            )}
        </div>


    )
}

export default ShoppingCart