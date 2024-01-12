import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { AiOutlineDownCircle } from 'react-icons/ai';
import Product from '../../component/Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../features/product/productSlice';
import { getCollections } from '../../features/collection/collectionSlice';
import { getAllCategory } from '../../features/category/categorySlice';
import { getPriceEth } from '../../features/currencyConverter/currencyConverterSlice';

const Shop = () => {
    const [priceRange, setPriceRange] = useState([50, 300])
    const [isOpenPrice, setOpenPrice] = useState(false)
    const [isOpenSort, setOpenSort] = useState(false)
    const [selectedOption, setSelectedOption] = useState('');

    const products = useSelector((state) => state?.product?.products?.data);
    const collections = useSelector((state) => state?.collection?.collection?.data);
    const categories = useSelector((state) => state?.category?.category?.data);
    const dispatch = useDispatch()

    console.log(products);

    useEffect(() => {
        dispatch(getProduct())
        dispatch(getCollections())
        dispatch(getAllCategory())
    }, [dispatch])

    useEffect(() => {
        dispatch(getPriceEth())
    }, [])

    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
    };

    const handleClickPrice = () => {
        setOpenPrice(!isOpenPrice)
    }

    const handleClickSort = () => {
        setOpenSort(!isOpenSort)
    }

    const selectOption = (option) => {
        setSelectedOption(option);
        setOpenSort(false);
    };

    return (
        <div className='py-16 w-10/12 m-auto'>
            <div className='text-center mt-10'>
                <h1 className='text-3xl font-medium'>All Product</h1>
                <span>Home . Shop</span>
            </div>
            <div className='grid grid-cols-4 gap-12 mt-10'>
                <div className=''>
                    <h3 className='text-xl font-medium'>FILTER YOUR SEARCH</h3>
                    <h4>345 Products</h4>
                </div>
                <div>
                    <h3 className='text-lg font-medium'>Search</h3>
                    <div className='flex items-center border-b border-text'>
                        <input type='text' className='w-full  py-2 bg-transparent focus:outline-none' placeholder='Search Product'></input>
                        <BsSearch className='w-6 h-6 ml-3' />
                    </div>
                </div>

                <div className='relative border-b border-text'>
                    <h3 className='text-lg font-medium'>Filter by</h3>
                    <div className='flex justify-between items-center pb-2 py-2' onClick={() => handleClickPrice()}>
                        <h6 className='text-sm font-medium'>Price</h6>
                        <AiOutlineDownCircle className='w-6 h-6' />
                    </div>
                    {isOpenPrice &&
                        <ul className="absolute left-0 mt-2 py-1 bg-white border border-gray-300 rounded-lg shadow w-full mt-3 z-20">
                            {categories?.map((category) => (
                                <li
                                    key={category.id}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => selectOption(category.attributes.categoryName)}
                                >
                                    {category.attributes.categoryName}
                                </li>
                            ))}
                        </ul>
                    }

                </div>
                <div className='border-b border-text relative'>
                    <h3 className='text-lg font-medium'>Sort by</h3>
                    <div className='flex justify-between pb-2 py-2' onClick={() => handleClickSort()}>
                        <div
                            className="bg-transparent cursor-pointer"
                        >
                            {selectedOption ? selectedOption : 'Select an option'}
                        </div>
                        <AiOutlineDownCircle className='w-6 h-6' />
                    </div>
                    {isOpenSort && (
                        <ul className="absolute left-0 mt-2 py-1 bg-white border border-gray-300 rounded-lg shadow w-full mt-3 z-20">
                            {categories?.map((category) => (
                                <li
                                    key={category.id}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => selectOption(category.attributes.categoryName)}
                                >
                                    {category.attributes.categoryName}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className='flex mt-6'>
                <div className='w-1/4 py-6 pr-12'>
                    <div>
                        <div className='border-b border-text py-2'>
                            <h3 className='text-lg font-medium '>Category</h3>
                        </div>

                        <ul className='mt-6'>
                            {categories?.map((category) => (
                                <li
                                    key={category.id}
                                    className="p-3 px-6 cursor-pointer hover:bg-gray-100 bg-white my-2 rounded-xl text-sm font-medium"
                                    onClick={() => selectOption(category.attributes.brandName)}
                                >
                                    {category.attributes.brandName}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='mt-6'>
                        <div className='border-b border-text py-2'>
                            <h3 className='text-lg font-medium '>Colors</h3>
                        </div>
                        <ul className=" mt-4 pl-3">
                            <li className="flex items-center justify-between py-2">
                                <div className='flex items-center'>
                                    <span className="block p-1 border-2 hover:border-blue-600 rounded-full transition ease-in duration-300 mr-3">
                                        <a href="#blue" className="block w-5 h-5 bg-blue-600 rounded-full"></a>
                                    </span>
                                    <h3>Blue</h3>
                                </div>
                                <span className='border border-gray-400 w-6 h-6 rounded-full text-xs flex items-center justify-center text-gray-400'>15</span>
                            </li>
                            <li className="flex items-center justify-between py-2">
                                <div className='flex items-center'>
                                    <span className="block p-1 border-2 hover:border-yellow-400 rounded-full transition ease-in duration-300 mr-3">
                                        <a href="#yellow" className="block w-5 h-5  bg-yellow-400 rounded-full"></a>
                                    </span>
                                    <h3>Blue</h3>
                                </div>
                                <span className='border border-gray-400 w-6 h-6 rounded-full text-xs flex items-center justify-center text-gray-400'>15</span>
                            </li>
                            <li className="flex items-center justify-between py-2">
                                <div className='flex items-center'>
                                    <span className="block p-1 border-2 hover:border-red-500 rounded-full transition ease-in duration-300 mr-3">
                                        <a href="#red" className="block w-5 h-5  bg-red-500 rounded-full"></a>
                                    </span>
                                    <h3>Blue</h3>
                                </div>
                                <span className='border border-gray-400 w-6 h-6 rounded-full text-xs flex items-center justify-center text-gray-400'>15</span>
                            </li>
                            <li className="flex items-center justify-between py-2">
                                <div className='flex items-center'>
                                    <span className="block p-1 border-2 hover:border-green-500 rounded-full transition ease-in duration-300 mr-3">
                                        <a href="#green" className="block w-5 h-5  bg-green-500 rounded-full"></a>
                                    </span>
                                    <h3>Blue</h3>
                                </div>
                                <span className='border border-gray-400 w-6 h-6 rounded-full text-xs flex items-center justify-center text-gray-400'>15</span>
                            </li>

                        </ul>
                    </div>

                    <div className='mt-6'>
                        <div className='border-b border-text py-2'>
                            <h3 className='text-lg font-medium '>Size</h3>
                        </div>

                        <ul className="flex flex-row items-center space-x-2 mt-4 pl-3">
                            <li className="block p-1 border-2 hover:border-blue-600 rounded-full transition ease-in duration-300">
                                <span className="block w-9 h-9 flex items-center justify-center text-sm font-medium">
                                    S
                                </span>
                            </li>
                            <li className="block p-1 border-2 hover:border-blue-600 rounded-full transition ease-in duration-300">
                                <span className="block w-9 h-9 flex items-center justify-center text-sm font-medium">
                                    M
                                </span>
                            </li>
                            <li className="block p-1 border-2 hover:border-blue-600 rounded-full transition ease-in duration-300">
                                <span className="block w-9 h-9 flex items-center justify-center text-sm font-medium">
                                    L
                                </span>
                            </li>
                            <li className="block p-1 border-2 hover:border-blue-600 rounded-full transition ease-in duration-300">
                                <span className="block w-9 h-9 flex items-center justify-center text-sm font-medium">
                                    XL
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className='mt-6'>
                        <div className='border-b border-text py-2'>
                            <h3 className='text-lg font-medium '>Price</h3>
                        </div>
                        <div className='pl-3 mt-4'>
                            <Slider
                                range
                                min={0}
                                max={500}
                                defaultValue={priceRange}
                                onChange={handlePriceRangeChange}
                            />
                            <div className='mt-2'>
                                Giá: ${priceRange[0]} - ${priceRange[1]}
                            </div>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <div className='border-b border-text py-2'>
                            <h3 className='text-lg font-medium '>Collection</h3>
                        </div>
                        <ul className='mt-4'>
                            {collections?.map((collection) => (
                                <li className="p-3 px-6 cursor-pointer hover:bg-gray-100 bg-white my-2 rounded-xl text-sm font-medium flex items-center">
                                    <input type='checkbox' className='w-5 h-5 mr-6'></input>
                                    <span>{collection.attributes.collectionName}</span>
                                </li>
                            ))}


                        </ul>
                    </div>
                </div>
                <div className='w-3/4'>
                    <div className='grid grid-cols-3 gap-12'>
                        {
                            products?.map((product) => (
                                <Product product={product} />
                            ))
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Shop