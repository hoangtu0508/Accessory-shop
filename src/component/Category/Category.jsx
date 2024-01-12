import React, { useEffect, useState } from 'react'
import ProductSlider from '../ProductSlider/ProductSlider'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../features/category/categorySlice'
import { getProductCategory } from '../../features/product/productSlice'

const Category = () => {
    const [activeComponent, setActiveComponent] = useState(1)

    const dispatch = useDispatch()

    const categoryState = useSelector((state) => state?.category?.category?.data)
    const productCate = useSelector((state) => state?.product?.productCate?.data[0])
    const products = productCate?.attributes?.products?.data

    console.log(products);

    useEffect(() => {
        dispatch(getAllCategory())
        dispatch(getProductCategory(1))
    }, [dispatch])

    const hanldeClickCategory = (id) => {
        setActiveComponent(id)
        dispatch(getProductCategory(id))
    }

    return (
        <div className='py-10'>
            <div className='pt-6'>
                <ul className='flex items-center justify-center'>
                    {categoryState?.map((brand) => (
                        <li
                            key={brand.id}
                            className={`font-medium text-lg mx-3 py-1 ${activeComponent === brand.id ? 'border-b border-text' : ''}`}
                            onClick={() => hanldeClickCategory(brand.id)}
                        >
                            {brand.attributes.brandName}
                        </li>
                    ))
                    }
                </ul>
            </div>

            <div className='w-10/12 m-auto py-10 border-b-2 border-text'>
                <ProductSlider products={products} />
            </div>

        </div>
    )
}

export default Category