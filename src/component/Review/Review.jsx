import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { baseURL, baseURLImg, config, params } from '../../utils/api';
import { FaStar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Web3Modal from "web3modal";
import { Address, ABI } from "../../utils/constants";
import { ethers } from "ethers";
import axios from 'axios';
import { getDataUser } from '../../features/auth/authSlice';

const Review = (props) => {
    const setShowReview = props.setShowReview
    const [rating, setRating] = useState(5);
    const [productReview, setProductReview] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [isShowReview, setIsShowReview] = useState(false);
    const [content, setContent] = useState("");
    const [review, setReview] = useState()

    const dataState = useSelector((state) => state?.review?.productReview);
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("customer"));
    const userId = user?.user.id

    const userDataState = useSelector((state) => state?.auth?.dataUser)

    console.log(userDataState);

    useEffect(() => {
        dispatch(getDataUser(userId))
    }, [])

    useEffect(() => {
        if (dataState?.length > 1) {
            setIsShow(true)
        }
    }, [])

    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleSelectProduct = (index) => {
        setProductReview([dataState[index]])
        setIsShowReview(true)
    }

    const handleReview = async (id) => {
        const res = await handleAddReview(id)
        if (res) {
            const resData = await axios.get(`${baseURL}products/${id}`, config)
            const review = await resData?.data?.data?.attributes.review

            console.log(review);

            if (review?.length > 0) {
                const updateReivew = [...review, res]
                console.log('h', updateReivew);
                const response = await axios.put(`${baseURL}products/${id}`, { data: { review: updateReivew } }, params)
            } else {
                console.log(res);
                const data = await axios.put(`${baseURL}products/${id}`, { data: { review: [res] } }, params)
            }
            setShowReview(false)
        }
    }

    // const handleAddReview = async (id) => {
    //     try {
    //         const web3Modal = new Web3Modal();
    //         const provider = await web3Modal.connect();
    //         const web3 = new Web3(provider);

    //         const contract = new web3.eth.Contract(ABI, Address);
    //         const accounts = await web3.eth.getAccounts();
    //         const signer = accounts[0];

    //         const transaction = await contract.methods.addReview(id, rating, content).send({ from: signer, gas: 1000000 });

    //         console.log("Mã Giao Dịch:", transaction.transactionHash);

    //         const receipt = await transaction.wait();
    //         console.log("Biên Nhận Giao Dịch:", receipt);

    //         const status = receipt.status;
    //         console.log(status);

    //         if (status === "0x1") {
    //             setReview({
    //                 productId: id,
    //                 reviewer: signer,
    //                 rating: rating,
    //                 comment: content,
    //             });

    //             console.log("Đã Thêm Nhận Xét Thành Công!");

    //             const event = receipt.events.ReviewAdded;

    //             if (event) {
    //                 const { reviewId, reviewer, productId, rating, content } = event.returnValues;
    //                 console.log("Chi Tiết Nhận Xét:", {
    //                     reviewId,
    //                     reviewer,
    //                     productId,
    //                     rating,
    //                     content,
    //                 });
    //             }
    //         } else {
    //             console.error("Thêm Nhận Xét Thất Bại. Trạng Thái: ", status);
    //         }

    //         // await handleReviewProduct({ id, review });
    //     } catch (error) {
    //         console.error("Lỗi khi thêm nhận xét:", error.message);
    //     }
    // };

    const handleAddReview = async (id) => {

        console.log(id);
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.BrowserProvider(connection);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(Address, ABI, signer);

            const transaction = await contract.addReview(id, rating, content);

            console.log("Transaction Hash:", transaction.hash);

            const receipt = await transaction.wait();
            console.log("Transaction Receipt:", receipt);
            const address = await receipt.to
            const status = await receipt.status;

            if (status === 1) {
                console.log("Review added successfully!");

                const review = {
                    productId: id,
                    reviewer: address,
                    transactionHash: transaction.hash,
                    rating: rating,
                    comment: content,
                    user: userDataState
                }
                const event = receipt.events.find((e) => e.event === "ReviewAdded");

                if (event) {
                    const { reviewId, reviewer, productId, rating, content } = event.args;
                    console.log("Review Details:", {
                        reviewId,
                        reviewer,
                        productId,
                        rating,
                        content,
                    });

                }
                return review
            } else {
                console.error("Review addition failed. Status: ", status);
            }
            return review

        } catch (error) {
            console.error("Error adding review:", error.message);
        }
    };

    return (
        <div className='fixed w-screen h-screen bg-black z-50 bg-opacity-70 top-0 right-0 bottom-0 left-0 flex items-center justify-center'>
            <div className='w-2/6 h-auto bg-white p-6'>
                <div className='flex justify-between items-center'>
                    <h3 className='font-medium text-2xl'>Review Product</h3>
                    <h3 onClick={() => setShowReview(false)}><label>Close</label><span className='font-medium text-xl ml-2'>X</span></h3>
                </div>

                <div className='py-2 border-b'>
                    {isShow ? (
                        <div>
                            {isShowReview ? (
                                <div>
                                    {productReview?.map((product) => (
                                        <div>
                                            <div className='mt-4 flex items-center'>
                                                <img src={baseURLImg + product?.product?.attributes?.productImg?.data[0].attributes?.url} className='w-12 h-12'></img>
                                                <div className='ml-2'>
                                                    <h3 className='text-base font-medium'>{product?.product?.attributes?.productName}</h3>
                                                    <h3 className='text-xs text-gray-500'>{product?.product?.attributes?.category?.data?.attributes?.categoryName}</h3>
                                                </div>
                                            </div>
                                            <div className='mt-4'>
                                                <div>
                                                    <h3 className='text-base font-medium'>Product quality:</h3>
                                                    <div className='flex my-4'>
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <span
                                                                key={star}
                                                                onClick={() => handleRatingClick(star)}
                                                                style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}

                                                            >
                                                                <FaStar className='w-8 h-auto mr-2' />
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className='text-base font-medium'>Detailed description:</h3>
                                                    <textarea className='w-full h-40 p-2 border border-gray-500 rounded-md mt-4' placeholder='Please share what you like about this product with others' onChange={(e) => setContent(e.target.value)} value={content}></textarea>
                                                </div>
                                            </div>

                                            <div className='flex mt-4 justify-end'>
                                                <Link><label className='px-6 py-2 border border-gray-500 mr-4' onClick={() => setShowReview(false)}>Cancel</label></Link>
                                                <Link><label className='px-6 py-2 bg-orange-600 text-white' onClick={() => handleReview(product.product.id)}>Review</label></Link>

                                            </div>
                                        </div>

                                    ))}

                                </div>
                            ) : (
                                <div>
                                    <div>
                                        <h3 className='text-center text-lg font-medium'>Please select a product to review</h3>
                                        <div>
                                            {dataState?.map((product, index) => (
                                                <div className='mt-4 flex items-center' onClick={() => handleSelectProduct(index)}>
                                                    <img src={baseURLImg + product?.product?.attributes?.productImg?.data[0].attributes?.url} className='w-12 h-12'></img>
                                                    <div className='ml-2'>
                                                        <h3 className='text-base font-medium'>{product?.product?.attributes?.productName}</h3>
                                                        <h3 className='text-xs text-gray-500'>{product?.product?.attributes?.category?.data?.attributes?.categoryName}</h3>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            )}
                        </div>
                    ) : (
                        <div>
                            {dataState?.map((product) => (
                                <div>
                                    <div className='mt-4 flex items-center'>
                                        <img src={baseURLImg + product?.product?.attributes?.productImg?.data[0].attributes?.url} className='w-12 h-12'></img>
                                        <div className='ml-2'>
                                            <h3 className='text-base font-medium'>{product?.product?.attributes?.productName}</h3>
                                            <h3 className='text-xs text-gray-500'>{product?.product?.attributes?.category?.data?.attributes?.categoryName}</h3>
                                        </div>
                                    </div>
                                    <div className='mt-4'>
                                        <div>
                                            <h3 className='text-base font-medium'>Product quality:</h3>
                                            <div className='flex my-4'>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        onClick={() => handleRatingClick(star)}
                                                        style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}

                                                    >
                                                        <FaStar className='w-8 h-auto mr-2' />
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className='text-base font-medium'>Detailed description:</h3>
                                            <textarea className='w-full h-40 p-2 border border-gray-500 rounded-md mt-4' placeholder='Please share what you like about this product with others' onChange={(e) => setContent(e.target.value)} value={content}></textarea>
                                        </div>
                                    </div>

                                    <div className='flex mt-4 justify-end'>
                                        <Link><label className='px-6 py-2 border border-gray-500 mr-4' onClick={() => setShowReview(false)}>Cancel</label></Link>
                                        <Link><label className='px-6 py-2 bg-orange-600 text-white' onClick={() => handleReview(product.product.id)}>Review</label></Link>
                                    </div>
                                </div>
                            ))}

                        </div>

                    )}

                </div>


            </div>
        </div>
    )
}

export default Review