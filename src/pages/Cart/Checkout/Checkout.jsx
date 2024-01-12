import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { baseURLImg } from '../../../utils/api';
import { FaEthereum, FaMapMarkerAlt, FaShippingFast } from 'react-icons/fa';
import { getProductCart, getShip, setIdShip, } from '../../../features/cart/cartSlice';
import Shipping from '../../../component/Shipping/Shipping';
import { calculateTotalPrice, converEth, getSelectedProducts } from '../../../utils/utils';
import { IoIosArrowBack, IoLogoUsd } from 'react-icons/io';
import { getPriceEth } from '../../../features/currencyConverter/currencyConverterSlice';
import { getDataUser } from '../../../features/auth/authSlice';
import { MdAdd } from 'react-icons/md';
import { getAddresShipsUser, setAddressDelivery, setIdAddress } from '../../../features/address/addressSlice';
import Button from '../../../component/Button/Button';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userDataState = useSelector((state) => state?.auth?.dataUser)

    const [selectedDiv, setSelectedDiv] = useState(2);
    const [shipMethod, setShipMethod] = useState(0)
    const [shipEth, setShipEth] = useState()
    const [subtotalEth, setSubtotalEth] = useState()
    const [addressShip, setAddressShip] = useState()
    const [isShow, setIsShow] = useState(true)
    const [addressNumber, setAddressNumber] = useState(0)
    const [showAddShip, setShowAddShip] = useState(false)

    const user = JSON.parse(localStorage.getItem("customer"));
    const userId = user?.user.id

    const productCartState = useSelector((state) => state?.cart?.productCart?.data[0])
    const productCart = productCartState?.attributes?.products
    const ship = useSelector((state) => state?.cart?.ship?.data)
    const ethPrice = useSelector((state) => state?.currency?.ethPrice)
    const addressUserState = useSelector((state) => state?.address?.addressUser?.data);

    const productPayment = getSelectedProducts(productCart)

    const subtotal = calculateTotalPrice(productPayment);

    useEffect(() => {
        setAddressShip(addressUserState?.[addressNumber])
    }, [addressNumber])

    useEffect(() => {
        setSubtotalEth(converEth(ethPrice, subtotal))
    }, [subtotal, ethPrice])

    useEffect(() => {
        setShipEth(converEth(ethPrice, shipMethod))
    }, [shipMethod, ethPrice])

    const totalEth = subtotalEth + shipEth

    useEffect(() => {
        dispatch(setIdShip(selectedDiv))
    }, [selectedDiv])

    useEffect(() => {
        dispatch(getProductCart(userId))
    }, [dispatch])

    useEffect(() => {
        dispatch(getPriceEth())
        dispatch(getShip())
        dispatch(getDataUser(userId))
        dispatch(getAddresShipsUser(userId))
    }, [])

    useEffect(() => {
        if (ship?.length > 0) {
            const defaultShipMethod = 2; // Giá trị mặc định bạn muốn
            setSelectedDiv(defaultShipMethod);
            setShipMethod(ship.find(item => item.id === defaultShipMethod)?.attributes?.shippingPrice || 0);
        }
    }, [ship]);

    const handleChange = (radioId, price) => {
        setSelectedDiv(radioId);
        setShipMethod(price);
    };

    const handleSelect = async (index) => {
        await setAddressNumber(index)
    }

    const handlePayment = (address, id) => {
        dispatch(setIdAddress(id))
        dispatch(setAddressDelivery(address))
        navigate('/cart/payment')
    }

    console.log(addressUserState);
    return (
        <div className='mb-6'>
            {showAddShip && (
                <Shipping setShowAddShip={setShowAddShip} />
            )}
            <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div class="pr-4 pt-8 h-auto">
                    <p class="text-xl font-medium">Order Summary</p>
                    <p class="text-gray-400">Check your items. And select a suitable shipping method.</p>
                    <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 h-auto">
                        {productPayment?.map((product) => (
                            <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                                <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src={baseURLImg + product?.product?.attributes?.productImg?.data[0].attributes?.url} alt="" />
                                <div class="flex w-full flex-col px-4 py-4">
                                    <span class="font-semibold">{product?.product?.attributes?.productName}</span>
                                    <span class="float-right text-gray-400">42EU - 8.5US</span>
                                    <p class="text-lg font-bold">${product?.product?.attributes?.productPrice}.00</p>
                                </div>
                            </div>
                        ))}

                        <div class="mt-6 border-t border-b py-2">
                            <div class="flex justify-between">
                                <p class="text-sm font-medium text-gray-900">Subtotal</p>
                                <div>
                                    <h3 className='flex items-center'><IoLogoUsd /><span className='ml-3'>{subtotal}.00 USD</span></h3>
                                    <h3 className='flex items-center'><FaEthereum /><span className='ml-3'>{subtotalEth?.toFixed(4)} ETH</span></h3>
                                </div>

                            </div>
                            <div class="flex justify-between">
                                <p class="text-sm font-medium text-gray-900">Shipping</p>
                                <div>
                                    <h3 className='flex items-center'><IoLogoUsd /><span className='ml-3'>{shipMethod}.00 USD</span></h3>
                                    <h3 className='flex items-center'><FaEthereum /><span className='ml-3'>{shipEth?.toFixed(4)} ETH</span></h3>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6 flex justify-between">
                            <p class="text-base font-medium text-gray-900">Total</p>
                            <div className='text-lg font-medium'>
                                <h3 className='flex items-center'><IoLogoUsd /><span className='ml-3'>{subtotal + shipMethod}.00 USD</span></h3>
                                <h3 className='flex items-center'><FaEthereum /><span className='ml-3'>{totalEth?.toFixed(4)} ETH</span></h3>
                            </div>
                        </div>
                    </div>


                </div>
                <div className='h-auto'>
                    <div className='mt-8'>
                        <p class="text-xl font-medium">Shipping</p>
                        <p class="text-gray-400">Complete your order by providing your shipping address.</p>

                        {isShow ? (
                            <div className='p-4 bg-white rounded-lg mt-8 '>
                                <div className='flex items-center '>
                                    <span><FaMapMarkerAlt /></span>
                                    <h3 className='ml-2 font-medium'>Address Reveice</h3>
                                </div>
                                <div className='flex mt-2 text-sm items-center'>
                                    <div className='w-1/4'>
                                        <h3>Full name</h3>
                                        <h3>Phone number</h3>
                                        <h3>Address</h3>
                                    </div>
                                    <div className='w-2/4'>
                                        <h3>{addressShip?.attributes.nameReceive}</h3>
                                        <h3>{addressShip?.attributes.phoneReceive}</h3>
                                        <h3>{addressShip?.attributes.address}</h3>
                                    </div>
                                    <div className='flex items-center'>
                                        <h3>Default</h3>
                                        <div className='ml-4'>
                                            <button className='px-6 py-2 border-2 border-green-700 font-medium text-green-700' onClick={() => setIsShow(false)}>Change</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className=' mt-8 '>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center p-4'>
                                        <span><FaMapMarkerAlt /></span>
                                        <h3 className='ml-2 font-medium'>Address Reveice</h3>
                                    </div>

                                    <button className='flex items-center px-4 py-2 border-2 border-green-700 text-green-700 font-medium'
                                        onClick={() => setShowAddShip(true)}
                                    >
                                        <MdAdd className='w-5 h-auto' />
                                        <span>Add to Address</span>
                                    </button>
                                </div>
                                {addressUserState?.map((address, index) => (
                                    <div className='flex text-sm items-center bg-white rounded-lg p-4 mb-2'>
                                        <div className='w-1/12'>
                                            <input type='radio' name='radio' className='w-5 h-5' checked={index === addressNumber} onClick={() => handleSelect(index)}></input>
                                        </div>
                                        <div className='w-3/12'>
                                            <h3>Full name</h3>
                                            <h3>Phone number</h3>
                                            <h3>Address</h3>
                                        </div>
                                        <div className='w-6/12'>
                                            <h3>{address?.attributes.nameReceive}</h3>
                                            <h3>{address?.attributes.phoneReceive}</h3>
                                            <h3>{address?.attributes.address}</h3>
                                        </div>
                                        <div className='flex items-center w-2/12'>
                                            {index === addressNumber && <h3>Default</h3>}
                                        </div>
                                    </div>
                                ))
                                }

                                <div className='flex items-center justify-between bg-white rounded-lg p-4'>
                                    <button className='flex items-center' onClick={() => setIsShow(true)}><IoIosArrowBack className='w-5 h-auto mr-2' /><span className='font-medium'>Back</span></button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* <Shipping /> */}
                    <p class="mt-8 text-lg font-medium">Shipping Methods</p>
                    <form class="mt-5 grid gap-6">
                        <div>
                            {ship?.map(item => (
                                <div className="relative my-2" key={item.id} onClick={() => handleChange(item.id, item.attributes.shippingPrice)}>
                                    <input
                                        className="peer hidden"
                                        id={`radio_${item.id}`}
                                        type="radio"
                                        name="radio"
                                        checked={selectedDiv === item.id}
                                        onChange={() => handleChange(item.id)}
                                    />
                                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-none"></span>
                                    <label
                                        className={`peer-checked:border-2 peer-checked:border-gray-700 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 ${selectedDiv === item.id ? 'bg-white' : ''}`}
                                        htmlFor={`radio_${item.id}`}
                                    >
                                        <span>
                                            <FaShippingFast className="w-10 h-10 ml-6" />
                                        </span>
                                        <div className="ml-5">
                                            <span className="mt-2 font-semibold">{item.attributes.shippingName}</span>
                                            <p className="text-slate-500 text-sm leading-6">Giao hàng: 2-3 ngày</p>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </form>
                </div>
            </div>

            <div className='px-32 flex justify-between'>
                <div className='w-1/6 mt-6 h-12 text-base font-medium' onClick={() => handlePayment(addressShip?.attributes.address)}>
                    <button className='flex items-center'>
                        <IoIosArrowBack className='w-5 h-auto'/>
                        <span>Back</span>
                    </button>
                </div>
                <div className='w-1/6 mt-6 h-12 text-base font-medium' onClick={() => handlePayment(addressShip?.attributes.address, addressShip.id)}>
                    <Button name='Place Order' />
                </div>
            </div>
        </div>
    )
}

export default Checkout