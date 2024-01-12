import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Slider from '../../component/Slider/Slider'
import men from '../../img/men.avif'
import woman from '../../img/woman.avif'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import Category from '../../component/Category/Category'
import intro from '../../img/intro.mp4'
import Blogs from '../../component/Blogs/Blogs'
import { useDispatch, useSelector } from 'react-redux'
import { getCollectionId, getCollections } from '../../features/collection/collectionSlice'
import { baseURLImg } from '../../utils/api'
import { getPriceEth } from '../../features/currencyConverter/currencyConverterSlice'

const Home = () => {
    const dispatch = useDispatch()

    const collectionState = useSelector((state) => state?.collection?.collection?.data)

    useEffect(() => {
        dispatch(getCollections())
    }, [])

    useEffect(() => {
        dispatch(getPriceEth())
    }, [])

    return (
        <div className='home py-16'>
            <div className=' bg-banner banner'>
                <Slider />
            </div>
            <div className='product-slider pb-10'>
                <Category />
            </div>
            <div className='w-9/12 m-auto'>
                <div className="flex font-serif">
                    {collectionState?.map((collection, index) => (
                        <Link key={index} className='w-1/2' to={`collection/${collection.id}`}>
                            <div>
                                <div style={{ overflow: 'hidden', borderRadius: index === 0 ? '50% 0 0 50%' : '0 50% 50% 0' }}>
                                    <img src={baseURLImg + collection.attributes.collectionImg.data[0].attributes.url} className="w-full hover:scale-110 transition-transform duration-300 ease-in-out" />
                                </div>
                                <div style={{ textAlign: index === 0 ? 'right' : 'left', margin: '40px 30px 40px 30px' }}>
                                    <h1 className='text-6xl font-bold'>{collection.attributes.collectionName}</h1>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: index === 0 ? 'flex-end' : 'flex-start' }} className='mx-6'>
                                        {index === 0 ? <BsArrowLeft className='w-8 h-8 mr-6' /> : null}
                                        <h3 className='font-bold text-xl '>More</h3>
                                        {index === 0 ? null : <BsArrowRight className='w-8 h-8 ml-6' />}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="pt-14 relative">
                <div className="relative w-full h-102 overflow-hidden">
                    <video loop muted autoPlay controls="" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full z-0">
                        <source src={intro} type="video/mp4" />
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                </div>
                <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-3/5 pl-32 z-10 text-white">
                    <h1 className="text-8xl font-medium">Longines Spirit Flyback</h1>
                    <Link to='/shop'>
                        <div className="flex mt-8">
                            <h3 className="font-medium text-xl">Discover</h3>
                            <BsArrowRight className="w-8 h-8 ml-4" />
                        </div>
                    </Link>
                </div>
            </div>

            <div className='w-10/12 m-auto mt-12'>
                <Blogs />
            </div>
        </div>
    )
}

export default Home