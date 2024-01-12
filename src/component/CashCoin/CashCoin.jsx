import React from 'react'
import cashcoin from '../../img/cashcoin.jpg'

const CashCoin = ({totalAll}) => {
    return (
        <div className='mt-10'>
            <h3 className='text-xl font-medium'>Thank you so mush, You select payment cash coin ! </h3>
            <p className='text-gray-400 mt-6'>Please hold your phone to receive a call from the delivery staff. The order is being delivered to you with the amount <span className='text-slate-700 font-medium'>${totalAll}.00 USD.</span></p>
            <img src={cashcoin} className='w-2/3 rounded-xl m-auto mt-6'></img>
        </div>
    )
}

export default CashCoin