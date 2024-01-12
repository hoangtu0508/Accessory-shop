import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrementProductCart, getProductCart, incrementProductCart, removeProductCart } from '../../../features/cart/cartSlice'
import { baseURLImg } from '../../../utils/api'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { AiOutlineEdit } from 'react-icons/ai'
import { converEth } from '../../../utils/utils'
import { FaEthereum } from 'react-icons/fa'
import { getPriceEth } from '../../../features/currencyConverter/currencyConverterSlice'

const ProductCart = ({ product, indexId }) => {

    console.log(indexId);
    const [priceEth, setPriceEth] = useState(null)
    const dispatch = useDispatch()

    const price = product?.product?.attributes?.productPrice

    console.log(priceEth);

    const user = JSON.parse(localStorage.getItem("customer"));
    const userId = user?.user.id

    const productCartState = useSelector((state) => state?.cart?.productCart?.data[0])
    const productCart = productCartState?.attributes?.products
    const cartId = productCartState?.id

    const ethPrice = useSelector((state) => state?.currency?.ethPrice)

    useEffect(() => {
        setPriceEth(converEth(ethPrice, price))
    }, [price, ethPrice])

    useEffect(() => {
        dispatch(getPriceEth())
    }, [])

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
    return (
        <div>
            <div className="flex w-full space-x-2 sm:space-x-4">
                <div className='w-1/3'>
                    <img className="w-full flex-shrink-0 object-cover dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={baseURLImg + product?.product?.attributes?.productImg?.data[0].attributes?.url} alt="Polaroid camera" />
                </div>
                <div className="flex flex-col justify-between w-2/3 pb-4">
                    <div className="w-full pb-2">
                        <div className="space-y-1">
                            <h3 className="text-base font-medium leadi sm:pr-8">{product?.product?.attributes?.productName}</h3>
                        </div>

                        <div className='flex text-xs my-1'>
                            <span className='mr-6'>Color: {product.color}</span>
                            <span>Size: {product.size}</span>
                        </div>
                        <div className="flex items-center">
                            <p className="text-base font-semibold mr-3">$ {product?.product?.attributes?.productPrice}.00</p>
                            <div className='flex items-center'>
                                <span><FaEthereum /></span>
                                <p className="text-sm dark:text-gray-600 ml-2">{priceEth?.toFixed(4)} ETH</p>
                            </div>
                        </div>
                        <div className='mt-2 flex items-center'>
                            <span><AiOutlineEdit /></span>
                            <div className='flex items-center ml-3 border'>
                                <div className='p-2' onClick={() => handledecrementQuanity(indexId, productCart, cartId)}><IoMdRemove /></div>
                                <div className='w-14 text-center p-2'>{product?.quantity}</div>
                                <div className='p-2' onClick={() => handleincrementQuanity(indexId, productCart, cartId)}><IoMdAdd /></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex text-sm divide-x">
                <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1 hover:text-red-500"
                    onClick={() => handleRemoveProductCart(indexId, productCart, cartId)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                        <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                        <rect width="32" height="200" x="168" y="216"></rect>
                        <rect width="32" height="200" x="240" y="216"></rect>
                        <rect width="32" height="200" x="312" y="216"></rect>
                        <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                    </svg>
                    <span>Remove</span>
                </button>
                <button type="button" className="flex items-center px-2 py-1 space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                        <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                    </svg>
                    <span>Add to favorites</span>
                </button>
            </div>
        </div>
    )
}

export default ProductCart