import React from 'react'

const Button = (props) => {

    return (
        <div className='rounded-full shadow-lg h-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5 w-full '>
            <button className='rounded-full shadow-lg m-auto h-full text-white w-full hover:bg-white hover:text-text'>{props.name}</button>
        </div>

    )
}

export default Button