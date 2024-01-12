import React, { useEffect, useState } from 'react'
import { decrementProductCart, getProductCart, incrementProductCart, isSelectedProductCart, removeProductCart } from '../../../../features/cart/cartSlice'
import { baseURLImg } from '../../../../utils/api'
import { AiOutlineHeart } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { FaEthereum } from 'react-icons/fa'
import { IoLogoUsd } from 'react-icons/io5'
import { converEth } from '../../../../utils/utils'
import { getPriceEth } from '../../../../features/currencyConverter/currencyConverterSlice'
import { FaShop } from 'react-icons/fa6'

const ProductList = ({ product, indexId }) => {
    const [priceEth, setPriceEth] = useState()
    const [totalPriceEth, setTotalPriceEth] = useState()
    const dispatch = useDispatch()

    const price = product?.product?.attributes?.productPrice
    const totalPrice = product?.product?.attributes?.productPrice * product?.quantity

    const user = JSON.parse(localStorage.getItem("customer"));
    const userId = user?.user.id

    const productCartState = useSelector((state) => state?.cart?.productCart?.data[0])
    const productCart = productCartState?.attributes?.products
    const cartId = productCartState?.id
    const ethPrice = useSelector((state) => state?.currency?.ethPrice)

    useEffect(() => {
        dispatch(getPriceEth())
    }, [])

    useEffect(() => {
        setPriceEth(converEth(ethPrice, price))
    }, [price, ethPrice])

    useEffect(() => {
        setTotalPriceEth(converEth(ethPrice, totalPrice))
    }, [totalPrice, ethPrice])

    const handleRemoveProductCart = (indexId, productCart, cartId) => {
        dispatch(removeProductCart({ indexId, productCart, cartId }))
        dispatch(getProductCart(userId))
    }

    const handleincrementQuanity = (indexId, productCart, cartId) => {
        dispatch(incrementProductCart({ indexId, productCart, cartId }))
        dispatch(getProductCart(userId))
    }

    const handledecrementQuanity = (indexId, productCart, cartId) => {
        dispatch(decrementProductCart({ indexId, productCart, cartId }))
        dispatch(getProductCart(userId))
    }

    const handleIsSelected = (indexId, productCart, cartId) => {
        dispatch(isSelectedProductCart({ indexId, productCart, cartId }))
        dispatch(getProductCart(userId))
    }
    return (
        <div className='bg-white p-4 my-4'>
            <div className='flex items-center border-b-2 pb-2'>
                <label className='text-xs font-medium px-2 py-1 rounded-md bg-orange-600 text-white mr-2'>Favourite</label>
                <span className='text-lg font-medium'>|</span>
                <div className='flex items-center mr-2'><span className='mx-2'><FaShop className='' /></span> <label className='text-xs font-medium '>Accessory shop</label></div>
                <span className='text-lg font-medium'>|</span>
                <div className='flex items-center px-2 py-1 border-2 rounded-md border-orange-600 mx-2'><span><FaShop className='mr-2 text-orange-600' /></span><label className='text-xs font-medium text-orange-600'>Shop now</label></div>
            </div>
            <div className='grid grid-cols-6 gap-4 py-3'>
                <div className='col-span-2 flex items-center'>
                    <div className='w-1/12' onClick={() => handleIsSelected(indexId, productCart, cartId)}>
                        <input type='checkbox' className='w-5 h-5 mr-3' checked={product?.isSelected}></input>
                    </div>
                    <div className='w-3/12 h-auto'>
                        <img src={baseURLImg + product?.product?.attributes?.productImg?.data[0].attributes?.url} alt="" className='w-20'/>
                    </div>
                    <div className='ml-3 w-8/12'>
                        <h4 className='text-base font-medium'>{product?.product?.attributes?.productName}</h4>
                        <h4 className='text-base font-medium flex items-center'><IoLogoUsd /> <span className='ml-3'>{product?.product?.attributes?.productPrice}.00 USD</span></h4>
                        <div className='flex items-center'>
                            <span><FaEthereum /></span>
                            <span className='ml-3 text-sm text-text'>{priceEth?.toFixed(4)} ETH</span>
                        </div>
                    </div>
                </div>

                <div className='flex items-center'>
                    <div className='text-sm'>
                        <div className='flex items-center'>
                            <h3>Diameter: </h3>
                            <span className={`ml-3 font-medium `}>{product?.product?.attributes?.productDiameter} mm</span>
                        </div>
                        <div className='flex items-center'>
                            <h3>Machine: </h3>
                            <span className={`ml-3 font-medium capitalize`}>{product?.product?.attributes?.category?.data?.attributes.categoryName}</span>
                        </div>

                    </div>
                </div>

                <div className='flex items-center'>
                    <div className='w-10/12 grid grid-cols-3 items-center border text-center'>
                        <div className='flex justify-center p-2' onClick={() => handledecrementQuanity(indexId, productCart, cartId)}><IoMdRemove /></div>
                        <div className='p-2'>{product?.quantity}</div>
                        <div className='flex justify-center p-2' onClick={() => handleincrementQuanity(indexId, productCart, cartId)}><IoMdAdd /></div>
                    </div>
                </div>

                <div className='flex items-center'>
                    <div>
                        <div className=''>
                            <h3 className='flex items-center'><IoLogoUsd /><span className='ml-3 font-medium'>{product?.product?.attributes?.productPrice * product?.quantity}.00 USD</span></h3>
                        </div>
                        <div className='flex items-center'>
                            <span><FaEthereum /></span>
                            <h3 className='ml-3'>{totalPriceEth?.toFixed(4)} ETH</h3>
                        </div>
                    </div>
                </div>

                <div className='flex items-center'>
                    <div>
                        <div className='flex items-center'>
                            <span><AiOutlineHeart /></span>
                            <p className='ml-3'>Add to favorites</p>
                        </div>
                        <div className='flex items-center hover:text-red-500' onClick={() => handleRemoveProductCart(indexId, productCart, cartId)}>
                            <span><RiDeleteBin6Line /></span>
                            <p className='ml-3'>Remove</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList