import React, { useState } from 'react'
import Headder from '../component/Header/Headder'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShoppingCart from '../component/ShoppingCart/ShoppingCart';
import Footer from '../component/Footer/Footer';

const Layout = () => {
    // const [showCart, setShowCart] = useState(true)
    return (
        <div className='bg-bg font-sans w-full m-auto'>
            {/* {showCart && <ShoppingCart setShowCart={setShowCart} showCart={showCart} />} */}
            <Headder />
            <Outlet />
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Layout