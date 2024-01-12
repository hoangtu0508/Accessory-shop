import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import Slider from "react-slick";
import Button from '../Button/Button';

const Blogs = () => {
    const settings = {
        // dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
    };

    const blogs = [
        {
            id: 1,
            title: 'Gregory Wathelet & Julien Epaillard triumphant at the Longines Equita Lyon-Concours Hippique International 2023',
            desc: 'The Longines Equita Lyon-Concours Hippique International 2023 provided the perfect stage to witness the brilliance of Gregory Wathelet in the 3rd leg of the Longines FEI Jumping World Cup™. Similarly, Julien Epaillard delivered an unmatched performance during the Longines Grand Prix. In addition to being the Title Partner and Official Timekeeper, Longines was proud to present the new Mini DolceVita as the Official Watch of the event.',
            img: 'https://cms.longines.com/uploads/media/global-large-push/05/1315-Gregory_Wathelet-Bond_Jamesbond_de_Hay-LYON23L107705.jpg?v=1-3&w=1200'
        },
        {
            id: 2,
            title: 'Gregory Wathelet & Julien Epaillard triumphant at the Longines Equita Lyon-Concours Hippique International 2023',
            desc: 'The Longines Equita Lyon-Concours Hippique International 2023 provided the perfect stage to witness the brilliance of Gregory Wathelet in the 3rd leg of the Longines FEI Jumping World Cup™. Similarly, Julien Epaillard delivered an unmatched performance during the Longines Grand Prix. In addition to being the Title Partner and Official Timekeeper, Longines was proud to present the new Mini DolceVita as the Official Watch of the event.',
            img: 'https://cms.longines.com/uploads/media/global-large-push/05/1315-Gregory_Wathelet-Bond_Jamesbond_de_Hay-LYON23L107705.jpg?v=1-3&w=1200'
        },
        {
            id: 3,
            title: 'Gregory Wathelet & Julien Epaillard triumphant at the Longines Equita Lyon-Concours Hippique International 2023',
            desc: 'The Longines Equita Lyon-Concours Hippique International 2023 provided the perfect stage to witness the brilliance of Gregory Wathelet in the 3rd leg of the Longines FEI Jumping World Cup™. Similarly, Julien Epaillard delivered an unmatched performance during the Longines Grand Prix. In addition to being the Title Partner and Official Timekeeper, Longines was proud to present the new Mini DolceVita as the Official Watch of the event.',
            img: 'https://cms.longines.com/uploads/media/global-large-push/05/1315-Gregory_Wathelet-Bond_Jamesbond_de_Hay-LYON23L107705.jpg?v=1-3&w=1200'
        },
    ]
    return (
        <div className=''>
            <div className='flex items-center justify-between py-6 border-b border-text'>
                <div>
                    <h3 className='font-bold text-lg'>Discover our news</h3>
                </div>
                <div className='flex'>
                    <h3 className='font-medium text-base'>View all </h3>
                    <BsArrowRight className="w-4 h-auto ml-2" />
                </div>
            </div>

            <div className='mt-6'>
                <div>
                    <Slider {...settings}>
                        {blogs.map((blog) => (
                            <div key={blog.id}>
                                <div className='flex'>
                                    <div className='relative w-1/2 overflow-hidden rounded-full mr-6'>
                                        <img src={blog.img} className='w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full'></img>
                                    </div>
                                    <div className='w-1/2 mx-6'>
                                        <p className='font-medium text-2xl'>{blog.title}</p>
                                        <p className='my-6 text-sm'>{blog.desc.slice(0 - 200)}</p>
                                        <div className='w-2/5 h-12'>
                                            <Button name='Discover' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Blogs