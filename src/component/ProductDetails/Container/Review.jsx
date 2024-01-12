import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getDataUser } from '../../../features/auth/authSlice';
import { baseURLImg } from '../../../utils/api';

const Review = (props) => {
  const [rating, setRating] = useState(5);
  const product = props.product
  const reviews = product?.attributes?.review
  console.log(reviews);

  useEffect(() => {
    const totalStar = reviews?.reduce((total, product) => {
      return total + product.rating;
    }, 0);

    const averageStar = totalStar / reviews?.length
    setRating(averageStar)
  }, [reviews])

  console.log(rating);

  return (
    <div>
      <div className='border-b border-gray-400 pb-3 pt-8'>
        <label className='text-xl font-medium pb-3 border-b-2 border-purple-700'>PRODUCT REVIEWS</label>
      </div>

      <div className='mt-4 flex pb-4 border-b border-gray-300'>
        <div className='w-3/12 border-r border-gray-400 px-4'>
          <div className='flex items-end justify-center text-purple-700'>
            <span className='text-4xl font-medium'>{rating ? rating.toFixed(1) : 0}</span>
            <span className='text-4xl'>/</span>
            <span className=' text-4xl'>5</span>
          </div>
          <div className='flex justify-center w-full mt-4'>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}

              >
                <FaStar className='w-5 h-auto mr-2' />
              </span>
            ))}
          </div>
          <div className='flex justify-center mt-2'>
            <span className='text-purple-700 font-medium mr-2'>{reviews?.length}</span>
            <span>review</span>
          </div>

          <div className='mt-2'>
            <button className='w-full py-2 border border-purple-700 rounded-full text-purple-700'>Write Review</button>
          </div>
        </div>

        <div className='w-8/12 ml-4 font-medium'>
          <h3>CUSTOMER PHOTOS</h3>
        </div>
      </div>

      <div>
        {reviews?.map((review) => (
          <div className='mb-4'>
            <div className='flex  items-center py-4 text-lg bg-gray-200 px-6'>
              {review?.user[0]?.avatar ? (
                <img src={baseURLImg + review?.user[0]?.avatar[0]?.url} className='w-12 h-12 rounded-full mr-4'></img>
              ) : (<img src="https://img.freepik.com/premium-photo/cute-fluffy-young-anime-girl-generative-ai_755833-81.jpg?w=740" alt="" className='w-12 h-12 rounded-full mr-4' />)}
              <span className='font-medium '>{review?.user[0]?.username}</span>
              <span className='font-light text-lg text-gray-400 mx-4'>|</span>
              <span className='font-medium mr-4'>{review.rating}.0</span>
              <div className='flex justify-center'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{ cursor: 'pointer', color: star <= review.rating ? 'gold' : 'gray' }}

                  >
                    <FaStar className='w-4 h-auto mr-2' />
                  </span>
                ))}
              </div>
            </div>
            <div className='flex items-center justify-between px-6 border-b border-gray-300'>
              <span>{review.comment} </span>
              <span className='text-sm text-gray-500 py-4'>07/01/2024</span>
            </div>
          </div>
        ))

        }

      </div>
    </div>
  )
}

export default Review