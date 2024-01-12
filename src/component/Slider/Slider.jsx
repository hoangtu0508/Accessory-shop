import React from 'react'

import SimpleImageSlider from "react-simple-image-slider";

import imgone from '../../img/Home.webp'
import imgtwo from '../../img/slider1.webp'
import imgthree from '../../img/slider2.webp'
import Button from '../Button/Button';

const Slide = () => {
    const images = [
        {
            url: imgone,
        },
        {
            url: imgtwo,
        },
        {
            url: imgthree,
        },
        // Thêm các mục khác (nếu có)
    ]
    return (
        <>
            <div className="relative">
                <SimpleImageSlider
                    width="100%"
                    height={670}
                    images={images}
                    showBullets={true}
                    showNavs={true}
                    autoPlay={true}
                    duration={0.5}
                />
                <div className="absolute z-20 w-40 h-14 top-2/3 right-1/2">
                    <Button name="Shop now" />
                </div>
            </div>
        </>
    )
}

export default Slide