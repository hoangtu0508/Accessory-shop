import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { AiOutlineDownCircle } from 'react-icons/ai';
import Product from '../../component/Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { baseURLImg } from '../../utils/api';
import { useParams } from 'react-router-dom';
import { getProductCategory } from '../../features/product/productSlice';
import { getCategoryId } from '../../features/category/categorySlice';

const CategoryPage = () => {
    const [priceRange, setPriceRange] = useState([50, 300])
    const [isOpenPrice, setOpenPrice] = useState(false)
    const [isOpenSort, setOpenSort] = useState(false)

    const [selectedOption, setSelectedOption] = useState('');

    const dispatch = useDispatch()
    const { id } = useParams();

    const categoryId = useSelector((state) => state?.category?.categoryId?.data[0])
    const cateId = useSelector((state) => state?.product?.productCate?.data[0]);
    const products = cateId?.attributes?.products?.data

    console.log(categoryId);

    useEffect(() => {
        dispatch(getProductCategory(id))
        dispatch(getCategoryId(id))
    }, [id])

    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
    };

    const handleClickPrice = () => {
        setOpenPrice(!isOpenPrice)
    }

    const handleClickSort = () => {
        setOpenSort(!isOpenSort)
    }

    const options = ['Volvo', 'Saab', 'Mercedes', 'Audi'];

    const selectOption = (option) => {
        setSelectedOption(option);
        setOpenSort(false);
    };

    return (
        <div className='pb-16'>
            <div className='flex justify-end items-center'>
                <div className='w-4/12'>
                    <div className=''>
                        <h1 className='text-4xl font-bold uppercase'>{categoryId?.attributes?.brandName}'S CATEGORY</h1>
                        <h3 className='my-6 font-bold text-sm'>Suggestions</h3>
                        <p className=''>{categoryId?.attributes?.brandDesc}</p>
                    </div>
                </div>
                <div className='w-7/12 '>
                    <img src={baseURLImg + categoryId?.attributes?.brandImg?.data[0]?.attributes?.url} className='rounded-l-full h-96 w-auto'></img>
                </div>
            </div>

            <div className='mt-10 w-10/12 m-auto'>
                <div>
                    <div className='grid grid-cols-4 gap-12'>
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
                                <div className='absolute p-4 border border-text w-full mt-3 rounded-lg z-10 bg-white'>
                                    <Slider
                                        range
                                        min={0}
                                        max={500}
                                        defaultValue={priceRange}
                                        onChange={handlePriceRangeChange}
                                    />
                                    <div className='price'>
                                        Giá: ${priceRange[0]} - ${priceRange[1]}
                                    </div>
                                </div>
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
                                    {options.map((option) => (
                                        <li
                                            key={option}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => selectOption(option)}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-4 gap-12 mt-10'>
                    {products?.map((product) => (
                        <Product product={product} />
                    ))}
                </div>

                <div>

                </div>
            </div>
        </div>
    )
}

export default CategoryPage