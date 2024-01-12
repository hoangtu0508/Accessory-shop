import React, { useState } from 'react'
import { GrSecure } from 'react-icons/gr'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../component/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../../features/auth/authSlice'

const Register = () => {
  const initialUser = { username: "", email: "", password: "", phone: null }
  const [user, setUser] = useState(initialUser);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async () => {
    // e.preventDefault();
    await dispatch(registerUser(user));
    navigate('/sign-in')
  };

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }))
  }

  console.log(user);

  return (
    <div className='py-16 w-10/12 m-auto'>
      <div className='w-8/12 m-auto mt-16'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold'>Create my account</h1>
          <p className='text-sm my-3'>Longines gives you an extraordinary access to a world of products, experts and services. Don't wait any longer and create your account to take advantage of these many advantages.</p>
          <h3 className='text-sm border p-3 border-text rounded-full'>For any assistance, please contact +84 393 053 290 or junxi050801@gmail.com</h3>
        </div>

        <div className='mt-8'>
          <form>
            <div className='flex justify-around'>
              <div className='w-1/2 mr-3'>
                <div className='mb-4'>
                  <label className='text-sm text-text mt-4 ml-4'>FullName</label>
                  <input
                    type='text'
                    name='username'
                    value={user.username}
                    onChange={handleUserChange}
                    className='border border-text w-full p-3 px-4 my-2 rounded-full'
                    placeholder='John One'>
                  </input>
                </div>

                <div className='mb-4'>
                  <label className='text-sm text-text mt-4 ml-4'>PhoneNumber</label>
                  <input
                    type='number'
                    name='phone'
                    value={user.phone}
                    onChange={handleUserChange}
                    className='border border-text w-full p-3 px-4 my-2 rounded-full'
                    placeholder='0909***999'>
                  </input>
                </div>

              </div>

              <div className='w-1/2 ml-3'>
                <div className='mb-4'>
                  <label className='text-sm text-text mt-4 ml-4'>Email address</label>
                  <input
                    type='text'
                    name='email'
                    value={user.email}
                    onChange={handleUserChange}
                    className='border border-text w-full p-3 px-4 my-2 rounded-full'
                    placeholder='example@gmail.com'>
                  </input>
                </div>

                <div className='mb-4'>
                  <label className='text-sm text-text mt-4 ml-4'>Password</label>
                  <input
                    type='password'
                    name="password"
                    value={user.password}
                    onChange={handleUserChange}
                    className='border border-text w-full p-3 px-4 my-2 rounded-full'
                    placeholder='........'>
                  </input>
                </div>

              </div>
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

        <div className='mt-6'>
          <div className='flex items-center'>
            <input type='checkbox' className='w-4 h-4 mx-2 mr-4'></input>
            <h3 className='text-sm'>I want to create an account with Longines and accept Terms and Conditions</h3>
          </div>
          <div className='flex items-center'>
            <input type='checkbox' className='w-4 h-4 mx-2 mr-4'></input>
            <h3 className='text-sm'>I have read and understood the Privacy Policy</h3>
          </div>

          <div className='flex justify-between items-center'>
            <div className='w-1/5 h-12 mt-4' onClick={() => handleRegister()}>
              <Button name='Create account' />
            </div>
            <Link to='/sign-in'><ins><h3>I already have an account</h3></ins></Link>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Register