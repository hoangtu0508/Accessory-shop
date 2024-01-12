import React from 'react'
import { baseURLImg } from '../../../utils/api';

const Description = (props) => {
  const product = props.product

  console.log('h', product);
  return (
    <div>
      <div className='flex'>
        <div className='w-4/6 mr-4'>
          <div className='border-b border-gray-400 pb-3 pt-8'>
            <label className='text-xl font-medium pb-3 border-b-2 border-purple-700'>PRODUCT DESCRIPTION</label>
          </div>

          <div className='flex mt-4 items-center'>
            <div className='w-2/3 '>
              {product?.attributes?.productDesc.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}<br></br></p>
              ))}
            </div>

            <div className='w-1/3'>
              <img class="object-contain" src={baseURLImg + product?.attributes?.productImg?.data[0].attributes?.url} alt="" />
            </div>
          </div>
        </div>
        <div className='w-2/6 ml-4'>
          <div className='border-b border-gray-400 pb-3 pt-8'>
            <label className='text-xl font-medium pb-3 border-b-2 border-purple-700'>SPECIFICATIONS</label>
          </div>
          <div className='mt-4'>
            <div className='bg-gray-200 flex p-2 '>
              <div className='w-5/12'>Product code</div>
              <div className='w-7/12 font-medium'>00{product?.id}</div>
            </div>
            <div className=' flex p-2 '>
              <div className='w-5/12'>Gender</div>
              <div className='w-7/12 font-medium'>{product?.attributes?.collection?.data?.attributes?.collectionName}</div>
            </div>
            <div className='bg-gray-200 flex p-2 '>
              <div className='w-5/12'>Brand</div>
              <div className='w-7/12 font-medium'>{product?.attributes?.brand?.data?.attributes?.brandName}</div>
            </div>
            <div className=' flex p-2 '>
              <div className='w-5/12'>Maintenance time</div>
              <div className='w-7/12 font-medium'>2 years international</div>
            </div>
            <div className='bg-gray-200 flex p-2 '>
              <div className='w-5/12'>Face size</div>
              <div className='w-7/12 font-medium'>{product?.attributes?.productDiameter} mm</div>
            </div>
            <div className=' flex p-2 '>
              <div className='w-5/12'>Machine type</div>
              <div className='w-7/12 font-medium'>{product?.attributes?.category?.data?.attributes?.categoryName}</div>
            </div>
            <div className='bg-gray-200 flex p-2 '>
              <div className='w-5/12'>Face shape</div>
              <div className='w-7/12 font-medium'>Round/ Oval</div>
            </div>
            <div className=' flex p-2 '>
              <div className='w-5/12'>Glass material</div>
              <div className='w-7/12 font-medium'>Sapphire glass</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Description