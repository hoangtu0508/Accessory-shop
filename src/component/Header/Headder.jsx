import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connectWallet } from '../../features/metamask/metamaskSlice';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg'
import { FiSearch } from 'react-icons/fi'
import { GiLuckyFisherman } from 'react-icons/gi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Button from '../Button/Button';
import './Header.scss'
import { toast } from 'react-toastify';
import { FaEthereum } from 'react-icons/fa'
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { getCollections } from '../../features/collection/collectionSlice';
import { getAllCategory } from '../../features/category/categorySlice';
import { FaCartShopping } from 'react-icons/fa6';
import { MdOutlineEventNote } from 'react-icons/md';
import { IoLogInOutline } from 'react-icons/io5';

const Headder = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate()

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [showCart, setShowCart] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCollections())
        dispatch(getAllCategory())
    }, [])

    const walletInfo = useSelector(state => state.metamask.walletInfo)
    const walletAddress = walletInfo?.walletAddress;
    const balance = walletInfo?.balance;
    const collections = useSelector(state => state?.collection?.collection?.data)
    const categories = useSelector(state => state?.category?.category?.data)

    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };

    const handleConnect = () => {
        if (token) {
            dispatch(connectWallet())
        } else {
            toast.info("Please log in to connect your wallet!");
        }
    }

    const handleLogout = async () => {
        await localStorage.clear()
        await navigate('/');
        toast.success("Logout Success");
    }

    return (
        <>
            <div className='z-50 flex h-12 fixed justify-between w-full mt-6 px-32'>
                <div className='w-1/5'>
                    <div className='rounded-3xl shadow-lg h-full w-12'>
                        <GiLuckyFisherman className='rounded-3xl shadow-lg m-auto h-full bg-bg w-12 text-oranger' />
                    </div>
                </div>
                <div
                    className="
                flex items-center justify-center text-center rounded-3xl shadow-lg px-5 bg-white text-sm font-semibold
                w-1/4
            "
                >
                    <ul className='flex flex-row w-full'>
                        <li className='m-auto'><Link to='/'>Home</Link></li>
                        <li className='m-auto'><Link to='/shop'>Shop</Link></li>
                        <li className='m-auto'><Link to='/blogs'>Blog</Link></li>
                        <li className='m-auto'><Link>Abouts</Link></li>
                        <li className='m-auto relative group cursor-pointer inline-block'>
                            Category
                            <ul class="hidden group-hover:block z-50 absolute p-3 bg-white w-80 shadow-md rounded-lg grid grid-cols-2 gap-4 pt-4">
                                <li class="py-2 border-l-4 border-transparent transition-all text-left px-2">
                                    <h3 className='text-base pb-2 border-b border-text '>Category</h3>
                                    <ul>
                                        {categories?.map((category) => (
                                            <li key={category.id} className='py-2 text-itxam hover:border-blue-500 duration-300 ease-in-out'>
                                                <Link to={`/category/${category.id}`}>{category?.attributes?.brandName}</Link>
                                            </li>
                                        ))

                                        }
                                    </ul>
                                </li>
                                <li class="py-2 border-l-4 border-transparent transition-all duration-300 ease-in-out text-left px-2">
                                    <h3 className='pb-2 border-b border-text text-base'>Collection</h3>
                                    <ul >
                                        {collections?.map((collection) => (
                                            <li key={collection.id} className='py-2 text-itxam hover:border-blue-500'>
                                                <Link to={`/collection/${collection.id}`}>{collection.attributes.collectionName}</Link>
                                            </li>
                                        ))

                                        }
                                    </ul>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div >

                <div className='w-1/5 '>
                    <div className="w-full py-1 flex items-center justify-center text-center text-sm font-semibold">
                        <span className='m-auto'><FiSearch className='w-6 h-6 ' /></span>
                        {
                            walletAddress ? (
                                <div className='rounded-3xl shadow-lg h-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5'>
                                    <div className='rounded-full shadow-lg m-auto h-full px-5 text-white w-full'>
                                        <div className='flex items-center'>
                                            <FaEthereum className='w-5 h-5 mr-2' />
                                            <h3 className='text-base'>{balance.slice(0, 6)} ETH</h3>
                                        </div>
                                        <h4>{walletAddress.slice(0, 9) + '...' + walletAddress.slice(-5)}</h4>
                                    </div>
                                </div>
                            ) : (
                                <div onClick={handleConnect} className='h-10 m-auto w-5/12'>
                                    <Button name='Connect' />
                                </div>
                            )
                        }
                        {token ? (
                            <div className='icon-dropdown m-auto' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <span><CgProfile className='h-6 w-6 m-auto' />
                                    {
                                        isDropdownOpen && (
                                            <div className='m-auto'>
                                                <div className="dropdown-content pt-9 bg-none">
                                                    <div className="shadow-md bg-gray-100 rounded-lg p-4 w-56">
                                                        <div className='flex items-center border-b pb-4 border-text'>
                                                            <div >
                                                                <img src='http://localhost:1337/uploads/t1398072203800_1676370170_jpg_6950632396.webp' className='w-10 h-10 rounded-full'></img>
                                                            </div>
                                                            <div className='text-left ml-4'>
                                                                <h3 className='font-bold text-base'>THT</h3>
                                                                <h3 className='text-xs'>THT@gmail.com</h3>
                                                            </div>
                                                        </div>
                                                        <div className='text-gray-600 py-2 border-b border-text'>
                                                            <Link to='/user/profile'>
                                                                <div className='flex items-center py-2'>
                                                                    <span><CgProfile className='w-5 h-auto mr-4' /></span>
                                                                    <h3>My profile</h3>
                                                                </div>
                                                            </Link>
                                                            <Link to='/cart/your-cart'>
                                                                <div className='flex items-center py-2'>
                                                                    <span><FaCartShopping className='w-5 h-auto mr-4' /></span>
                                                                    <h3>Shopping cart</h3>
                                                                </div>
                                                            </Link>
                                                            <Link to='/user/order'>
                                                                <div className='flex items-center py-2'>
                                                                    <span><MdOutlineEventNote className='w-5 h-auto mr-4' /></span>
                                                                    <h3>Purchase order</h3>
                                                                </div>
                                                            </Link>
                                                        </div>

                                                        <div className='mt-2 text-gray-600'>
                                                            <Link>
                                                                <div className='flex items-center py-2' onClick={() => handleLogout()}>
                                                                    <span><IoLogInOutline className='w-5 h-auto mr-4' /></span>
                                                                    <h3>Log out</h3>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        {/* <ul className='p-3'>
                                                            <li><Link to='sign-in'>Sign In</Link></li>
                                                            <li><Link to='sign-up'>Sign Up</Link></li>
                                                        </ul> */}
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    }

                                </span></div>
                        ) : (
                            <div className='icon-dropdown m-auto' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><span><CgProfile className='h-6 w-6 m-auto' />
                                {
                                    isDropdownOpen && (
                                        <div className='m-auto'>
                                            <div className="dropdown-content pt-9 bg-none">
                                                <ul className='p-3'>
                                                    <li><Link to='sign-in'>Sign In</Link></li>
                                                    <li><Link to='sign-up'>Sign Up</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                }

                            </span></div>
                        )}

                        <span className='m-auto' onClick={() => setShowCart(true)}><AiOutlineShoppingCart className='h-6 w-6 m-auto' /></span>

                        {/* {isLogin ? (
                            // if user is logged in, show profile button and dropdown menu
                            <li className='nav-right-btn'>
                                <CgProfile className='icon-profile' onClick={handleClick} />
                                {isOpen && (
                                    <div className="dropdown-content">
                                        <Profile setIsLogin={setIsLogin} />
                                    </div>
                                )}
                            </li>
                        ) : (
                            // if user is not logged in, show login and register buttons
                            <li className='nav-right-btn'>
                                <CgProfile className='icon-profile' onClick={handleClick} />
                                {isOpen && (
                                    <div className="dropdown-content">
                                        <a href="sign-in" onClick={handleLogin}>Sign In</a>
                                        <a href="sign-up">Sign Up</a>
                                    </div>
                                )}
                            </li>
                        )} */}


                    </div>

                </div>

            </div >
            {showCart && <ShoppingCart setShowCart={setShowCart} showCart={showCart} />}
        </>

    )
}

export default Headder