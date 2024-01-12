import React, { useEffect, useState } from 'react'
import Button from '../../../component/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { areAllSelected, calculateTotalPrice, converEth, getSelectedProducts } from '../../../utils/utils'
import { allSelected, getProductCart, setTotalEth, setTotalPrice } from '../../../features/cart/cartSlice'
import ProductList from './ProductList/ProductList'
import { IoLogoUsd } from 'react-icons/io'
import { FaEthereum } from 'react-icons/fa'
import { getPriceEth } from '../../../features/currencyConverter/currencyConverterSlice'

const YourCart = () => {
    const [total, setTotal] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("customer"));
    const userId = user?.user.id

    const productCartState = useSelector((state) => state?.cart?.productCart?.data[0])
    const productCart = productCartState?.attributes?.products
    const cartId = productCartState?.id
    const ethPrice = useSelector((state) => state?.currency?.ethPrice)

    const productPayment = getSelectedProducts(productCart)
    const totalPrice = calculateTotalPrice(productPayment);

    useEffect(() => {
        dispatch(getProductCart(userId))
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(setTotalPrice(totalPrice))
    // }, [totalPrice])

    useEffect(() => {
        setTotal(converEth(ethPrice, totalPrice))
    }, [totalPrice, ethPrice])

    useEffect(() => {
        dispatch(getPriceEth())
    }, [])

    // useEffect(() => {
    //     dispatch(setTotalEth(total))
    // }, [total])


    const handleAllSelected = (productCart, cartId) => {
        dispatch(allSelected({ productCart, cartId }))
        dispatch(getProductCart(userId))
    }

    const handleClickCheckout = () => {
        navigate('/cart/check-out')
    }

    return (
        <div className='pb-6'>

            <div className='w-8/12 m-auto mt-4'>

                <div >
                    <div className='mt-10'>
                        <div className='font-medium grid grid-cols-6 gap-4 py-3 bg-white px-4'>
                            <div className='col-span-2'>
                                <h4>Product</h4>
                            </div>

                            <div className=''>
                                <h4>Classify</h4>
                            </div>

                            <div className=''>
                                <h4>Quantity</h4>
                            </div>

                            <div>
                                <h4>Total</h4>
                            </div>

                            <div>
                                <h4>Order</h4>
                            </div>
                        </div>

                        <div className='mt-3'>
                            {productCart?.map((product, index) => (
                                <div>
                                    <ProductList product={product} indexId={index} />
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className='pb-4 bg-white p-4'>
                        <div className='flex items-center justify-between'>
                            <div className='w-1/2 flex'>
                                <ul className='w-full'>
                                    {productPayment?.map((product) => (
                                        <li className='border-b py-2 flex items-center'>
                                            <h3 className='w-2/3'>{product?.product?.attributes?.productName}</h3>
                                            <h4 className='w-1/3'><span className='font-medium mx-3'>X</span>{product?.quantity}</h4>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='text-right w-1/2'>
                                <div className='text-xl font-medium flex justify-end'>
                                    <span>Subtotal:</span>
                                    <div>
                                        <h3 className='flex items-center'><IoLogoUsd /><span className='ml-3'>{totalPrice}.00 USD</span></h3>
                                        <h3 className='flex items-center'><FaEthereum /><span className='ml-3'>{total?.toFixed(4)} ETH</span></h3>
                                    </div>
                                </div>
                                <p className='text-base my-2 text-text'>Taxes and shipping calculated at checkout</p>
                                <p className='text-base text-text'>All charges are billed in <span className='text-black font-medium'>USD</span>. While the content of your cart is currently displayed in <span className='text-black font-medium'>VND</span>, the checkout will use <span className='font-medium text-black'>USD</span> at the most current exchange rate.</p>
                            </div>
                        </div>

                        <div className='flex items-end justify-between'>
                            <div className='flex items-center w-1/2' onClick={() => handleAllSelected(productCart, cartId)}>
                                <input type='checkbox' className='w-5 h-5 mr-3' checked={productCart && areAllSelected(productCart)}></input>
                                <h3>Sellect all (3)</h3>
                            </div>


                            <div className='w-1/4 h-12 float-right mt-6' onClick={() => handleClickCheckout()}>
                                <Button name='CHECK OUT' />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default YourCart