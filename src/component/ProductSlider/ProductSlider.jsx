import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../Product/Product'

import Slider from "react-slick";

const ProductSlider = (props) => {

    const products = props.products
    console.log(products);

    const settings = {
        // dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
    };
    return (
        <div className=''>
            <Slider {...settings}>
                {products?.map((product) => (
                    <div className='w-1/4 px-4' key={product.id}>
                        <div className='h-full'>
                            <Product product={product} />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default ProductSlider