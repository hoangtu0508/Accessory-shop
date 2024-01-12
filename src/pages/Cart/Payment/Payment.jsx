import React, { useEffect, useState } from 'react'
import paypal from '../../../img/paypal.png'
import { BsCashCoin } from 'react-icons/bs'
import { FaBitcoin, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import { SiVisa } from 'react-icons/si'
import { IoInformationCircle } from "react-icons/io5";
import Wallet from '../../../component/Wallet/Wallet'
import PaymentVisa from '../../../component/PaymentVisa/PaymentVisa'
import Error from '../../../component/Error/Error'
import CashCoin from '../../../component/CashCoin/CashCoin'
import { useDispatch, useSelector } from 'react-redux'
import { getDataUser } from '../../../features/auth/authSlice'
import { FaEthereum } from "react-icons/fa";
import Button from '../../../component/Button/Button'
import { calculateTotalPrice, converEth, getProductId, getSelectedProducts, sendTransaction, updateCart, uploadQuantity } from '../../../utils/utils'
import { getPriceEth } from '../../../features/currencyConverter/currencyConverterSlice'
import { getProductCart, getShip, updateCartOrder } from '../../../features/cart/cartSlice'
import { addOrderUser } from '../../../features/order/orderSlice'
import { useNavigate } from 'react-router-dom'
import { getAddressShipId } from '../../../features/address/addressSlice'
import { updateQuantity } from '../../../features/product/productSlice'
import axios from 'axios'
import { baseURL, config } from '../../../utils/api'

const Payment = () => {
    const [active, setActive] = useState(1)
    const [priceShip, setPriceShip] = useState()
    const [shipEth, setShipEth] = useState()
    const [subtotalEth, setSubtotalEth] = useState()
    const [userDate, setUserData] = useState({ name: "", phone: "" })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("customer"));
    const userId = user?.user.id

    const address = useSelector((state) => state?.address?.addressDelivery)
    const userDataState = useSelector((state) => state?.auth?.dataUser)
    const shipId = useSelector((state) => state?.cart?.shipId)
    const shipState = useSelector((state) => state?.cart?.ship?.data)
    const ethPrice = useSelector((state) => state?.currency?.ethPrice)
    const addressShipId = useSelector((state) => state?.address?.addressShipID)
    const addressShipState = useSelector((state) => state?.address?.addressShip)
    const addressShip = addressShipState?.data[0]

    const productCartState = useSelector((state) => state?.cart?.productCart?.data[0])
    const productCart = productCartState?.attributes?.products
    const cartId = productCartState?.id

    const total = shipEth + subtotalEth

    const productPayment = getSelectedProducts(productCart)
    const subtotal = calculateTotalPrice(productPayment);
    const totalAll = subtotal + priceShip

    useEffect(() => {
        if (shipState?.length > 0) {
            const ship = shipState?.filter(item => item.id === shipId)
            const shipPrice = ship[0]?.attributes?.shippingPrice
            setPriceShip(shipPrice)
        }
    }, [shipId])

    useEffect(() => {
        setShipEth(converEth(ethPrice, priceShip))
    }, [priceShip, ethPrice])

    useEffect(() => {
        setSubtotalEth(converEth(ethPrice, subtotal))
    }, [subtotal, ethPrice])

    useEffect(() => {
        if (userDataState && userDataState.length > 0) {
            setUserData(prevUserData => ({
                name: userDataState[0]?.username,
                phone: userDataState[0]?.phone
            }));
        }
    }, [userDataState])

    useEffect(() => {
        dispatch(getAddressShipId(addressShipId))
    }, [addressShipId])

    useEffect(() => {
        dispatch(getDataUser(userId))
        dispatch(getProductCart(userId))
        dispatch(getPriceEth())
        dispatch(getShip())
    }, [])

    useEffect(() => {

    }, [productPayment])

    const handleSelectActive = (number) => {
        setActive(number)
    }

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUserData((currentUser) => ({
            ...currentUser,
            [name]: value,
        }))
    }

    const handleupdateCartOrder = () => {
        const data = updateCart(productCart)
        dispatch(updateCartOrder({ data, cartId }))
    }
    

    const handleUploadQuantity = async () => {
        try {
            for (const product of productPayment) {
                let quantity
                const productId = product.product.id;
                const qty = product.quantity;
               
                const data = await getProductId(productId);
                if(data > 0) {
                    quantity = data - qty
                } else {
                    quantity = 0
                }
                const updateQuantity = uploadQuantity({productId, quantity})
            }
        } catch (error) {
            console.error('Error handling test:', error);
            // Xử lý lỗi nếu cần thiết
        }
    };


    const handlePaymentCoinCash = async () => {
        await dispatch(addOrderUser({ userId, shipId, totalAll, address, productPayment, userDataState, active, addressShipId }))
        await handleupdateCartOrder()
        await handleUploadQuantity()
        // await dispatch(updateQuantity(productPayment))
        navigate('/user/order')
    }

    const handlePaymentMetamask = async () => {
        try {
            const transactionHash = await sendTransaction(total);
            setActive()
            console.log(transactionHash);
            if (transactionHash) {
                await dispatch(addOrderUser({ userId, shipId, totalAll, address, productPayment, userDataState, active }));
                await handleupdateCartOrder();
                navigate('/user/order');
            }
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };


    return (
        <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
            <div className='bg-gray-50 px-8 pt-8'>
                <p class="text-xl font-medium">Payment Methods</p>
                <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>

                <div className='mt-8 grid grid-cols-5 gap-4 h-14 '>
                    <div className={`'w-full flex items-center justify-center border border-gray-400 rounded-xl hover:border-sky-500 hover:border-2' ${active === 1 ? 'border-sky-500 border-2 ' : ''}`}
                        onClick={() => handleSelectActive(1)}
                    >
                        <span><BsCashCoin className='text-amber-500 w-5 h-auto' /></span>
                        <h3 className='ml-2 text-xs font-bold text-gray-400'>Cash <span className='text-sky-600'>Coin</span></h3>
                    </div>

                    <div className={`'w-full flex items-center justify-center border border-gray-400 rounded-xl hover:border-sky-500 hover:border-2' ${active === 2 ? 'border-sky-500 border-2 ' : ''}`}
                        onClick={() => handleSelectActive(2)}
                    >
                        <img src={paypal} className='object-cover w-2/3'></img>
                    </div>

                    <div className={`'w-full flex items-center justify-center border border-gray-400 rounded-xl hover:border-sky-500 hover:border-2' ${active === 3 ? 'border-sky-500 border-2 ' : ''}`}
                        onClick={() => handleSelectActive(3)}
                    >
                        <span><FaBitcoin className='text-amber-600 w-5 h-auto' /></span>
                        <h3 className='ml-2 text-xs font-bold'>Bitcoin</h3>
                    </div>

                    <div className={`'w-full flex items-center justify-center border border-gray-400 rounded-xl hover:border-sky-500 hover:border-2' ${active === 4 ? 'border-sky-500 border-2 ' : ''}`}
                        onClick={() => handleSelectActive(4)}
                    >
                        <span><SiVisa className='text-blue-700 w-9 h-auto' /></span>
                    </div>
                </div>

                <div>
                    {active === 1 && <CashCoin totalAll={totalAll} />}
                    {active === 2 && <Error />}
                    {active === 3 && <Wallet />}
                    {active === 4 && <PaymentVisa />}
                </div>
            </div>

            <div class="px-8 pb-8">
                <div>
                    <p class="mt-8 text-lg font-medium">Shipping Methods</p>
                    <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
                    <div class="mt-4 space-y-3 rounded-lg border bg-white px-6 py-4 sm:px-6">
                        <div>
                            <label for="card-holder" class="mt-2 mb-2 block text-sm font-medium">Full name</label>
                            <div class="relative">
                                <input type="text" id="card-holder"
                                    class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    value={addressShip?.attributes?.nameReceive}
                                    name="name"
                                    onChange={handleChange}

                                />
                                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <IoInformationCircle class="h-5 w-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">Phone number</label>
                            <div class="relative">
                                <input type="number" id="card-holder"
                                    class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    value={addressShip?.attributes?.phoneReceive}
                                    name='phone'
                                    onChange={handleChange}
                                />
                                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <FaPhone class="h-5 w-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">Delivery address</label>
                            <div class="relative">
                                <div class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                >{addressShip?.attributes?.address}</div>
                                <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <FaMapMarkerAlt class="h-5 w-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <p class="text-xl font-medium">Order Summary</p>
                    <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
                    <div class="mt-8 space-y-3 rounded-lg border bg-white px-6 py-4 sm:px-6">
                        <div class="mt-6 border-t border-b py-2 px-8">
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-900">Balance Amount</p>
                                <p class="font-semibold text-gray-900">{active === 3 ? (<><div className='flex items-center'><span><FaEthereum /></span><h3>{subtotalEth?.toFixed(4)} ETH</h3></div></>) : (<>${subtotal}.00</>)}</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-gray-900">Shipping</p>
                                <p class="font-semibold text-gray-900">
                                    {active === 3 ? (<><div className='flex items-center'><span><FaEthereum /></span><h3>{shipEth?.toFixed(4)} ETH</h3></div></>) : (<>${priceShip}.00</>)}
                                </p>
                            </div>
                        </div>
                        <div class="mt-6 flex items-center justify-between px-8">
                            <p class="text-sm font-medium text-gray-900">Total</p>
                            <p class="text-2xl font-semibold text-gray-900">
                                {active === 3 ? (<><div className='flex items-center'><span><FaEthereum /></span><h3>{total?.toFixed(4)} ETH</h3></div></>) : (<>${totalAll}.00</>)

                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    {active === 1 && (
                        <div className='mt-4 h-12' onClick={() => handlePaymentCoinCash()}>
                            <Button name='Place Order' /></div>
                    )}
                    {active === 3 && (<div className='mt-4 h-12' onClick={() => handlePaymentMetamask()}>
                        <Button name='Place Order' />
                    </div>)}
                </div>


            </div>

        </div>
    )
}

export default Payment