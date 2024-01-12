import React from 'react'
import error from '../../img/error.gif'

const Error = () => {
  return (
    <div className='mt-10'>
        <h3 className='text-xl font-medium'>Sorry, we currently do not have this form of payment</h3>
        <div className='w-2/3 mt-6 m-auto'><img src={error} className='rounded-xl'></img></div>
    </div>
  )
}

export default Error