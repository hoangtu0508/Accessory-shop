import React, { useEffect, useState } from 'react'
import { TiTick } from 'react-icons/ti'
import Button from '../../../component/Button/Button'
import { GrSecure } from 'react-icons/gr'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../../features/auth/authSlice'
import { getProductCart } from '../../../features/cart/cartSlice'

const Login = () => {
    const [user, setUser] = useState({ identifier: "", password: "" })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLocal = JSON.parse(localStorage.getItem("customer"));
    const userId = userLocal?.user.id

    const handleClick = () => {
        navigate('/sign-up')
    }

    const handleLogin = async () => {
        await dispatch(loginUser(user));
        navigate('/');
    };
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUser((currentUser) => ({
            ...currentUser,
            [name]: value,
        }))
    }

    return (
        <div className='py-16 w-10/12 m-auto'>
            <div className='text-center mt-16 pb-14'>
                <h1 className='text-4xl font-bold'>CustomerLogin</h1>
                <p className='mt-3 text-text'>Log in to your Longines account to enjoy all personalized features.</p>
            </div>
            <div className='flex w-9/12 m-auto'>
                <div className='flex-auto w-1/2 bg-white mx-3 rounded-xl p-12'>
                    <h3 className='font-semibold '>I don't have an account</h3>
                    <p className='text-sm text-text mt-4 mb-8'>Create an account to enjoy a personalised shopping experience.</p>
                    <ul>
                        <li className='flex items-center mb-2'><TiTick />Receive Longines Newsletters</li>
                        <li className='flex items-center mb-2'><TiTick />Speed up checkout</li>
                        <li className='flex items-center mb-2'><TiTick />Follow orders and returns</li>
                        <li className='flex items-center mb-2'><TiTick />Compare products</li>
                    </ul>

                    <div className='w-1/2 h-12 mt-8' onClick={() => handleClick()}>
                        <Button name='Create an account' />
                    </div>
                </div>

                <div className='flex-auto w-1/2 bg-white mx-3 rounded-xl p-12'>
                    <h3 className='font-semibold '>I already have an account</h3>
                    <div className='mt-4'>
                        <form>
                            <div className='mb-4'>
                                <label className='text-sm text-text mt-4 ml-4'>Email address</label>
                                <input
                                    className='border border-text w-full p-3 px-4 my-2 rounded-full'
                                    placeholder='example@gmail.com'
                                    type="email"
                                    name="identifier"
                                    value={user.identifier}
                                    onChange={handleChange}
                                >
                                </input>
                            </div>
                            <div className='mb-4'>
                                <label className='text-sm text-text mt-4 ml-4'>Password</label>
                                <input
                                    type='password'
                                    className='border border-text w-full p-3 px-4 my-2 rounded-full'
                                    placeholder='........'
                                    name='password'
                                    value={user.password}
                                    onChange={handleChange}
                                ></input>
                            </div>
                        </form>
                    </div>

                    <div className='flex items-center'>
                        <span><GrSecure className='w-8 h-8 mr-2' /></span>
                        <div>
                            <h3 className='text-sm'>Anti-Robot Verification</h3>
                            <Link><h3 className='text-sm font-semibold'>Click to start verification</h3></Link>
                        </div>
                    </div>
                    <div className='w-1/3 h-12 mt-8' onClick={() => handleLogin()}>
                        <Button name='Log in' />
                    </div>
                    <h4 className='text-sm mt-4'><ins>I forgot my password</ins></h4>
                </div>
            </div>
        </div>
    )
}

export default Login