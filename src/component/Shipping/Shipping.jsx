import React, { useEffect, useState } from 'react'
import { MdOutlineHomeWork, MdOutlineNoteAlt } from 'react-icons/md'
import { IoChevronBack, IoHomeOutline } from 'react-icons/io5'
import { FaPhone, FaRoad } from 'react-icons/fa6'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { getAddress } from '../../utils/utils'
import Map from '../Map/Map'
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addAddressShip, getAddresShipsUser, getAddressShipping, setAddressDelivery } from '../../features/address/addressSlice'
import { useNavigate } from 'react-router-dom'
import { getDataUser } from '../../features/auth/authSlice'

const Shipping = (props) => {
  const setShowAddShip = props.setShowAddShip
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('')
  const [address, setAddress] = useState("")
  const [inputAddress, setInputAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [fullName, setFullName] = useState('')

  const user = JSON.parse(localStorage.getItem("customer"));
  const userId = user?.user.id

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addressState = useSelector((state) => state?.address?.address?.data)
  const userDataState = useSelector((state) => state?.auth?.dataUser)
  const userData = userDataState?.[0]

  useEffect(() => {
    dispatch(getDataUser(userId))
  }, [])

  useEffect(() => {
    dispatch(getAddressShipping())
  }, [dispatch])

  useEffect(() => {
    dispatch(setAddressDelivery(address))
  }, [address])

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    setSelectedCity(selectedCityId);
    const selectedCityData = addressState.find((city) => city.Id === selectedCityId);
    setDistricts(selectedCityData?.Districts || []);
    setWards([]);
    setAddress(selectedCityData.Name)
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    setSelectedDistrict(selectedDistrictId);
    const selectedDistrictData = districts.find((district) => district.Id === selectedDistrictId) || {};
    setWards(selectedDistrictData.Wards || []);
    setAddress((prevAddress) => selectedDistrictData.Name + ', ' + prevAddress);
  };

  const handleWarsChange = (e) => {
    const selectedWardId = e.target.value;
    setSelectedWard(selectedWardId)
    const selectedWardData =
      wards.find((ward) => ward.Id === selectedWardId) || {};
    setAddress((prevAddress) => selectedWardData.Name + ', ' + prevAddress);
  }

  const handleClickSave = () => {
    if (inputAddress) {
      setAddress((prevAddress) => inputAddress + ', ' + prevAddress);
    }
  }

  const handlePayment = async(address) => {
    await dispatch(setAddressDelivery(address))
    await dispatch(addAddressShip({ userId, phone, fullName, address}))
    await dispatch(getAddresShipsUser(userId))
    setShowAddShip(false)
  }
  return (
    <div className='fixed w-screen h-screen bg-black z-50 bg-opacity-70 top-0 right-0 bottom-0 left-0 flex items-center justify-center'>
      <div class="my-8 px-4 pt-8 lg:mt-0 w-4/6 h-11/12 bg-white p-6">

        <div className='flex'>
          <div className='w-3/5 mr-2'>
            <p class="text-xl font-medium">Shipping</p>
            <p class="text-gray-400">Complete your order by providing your shipping address.</p>
            <div class="">
              <div className='flex'>
                <div className='w-1/2 mr-2'>
                  <label for="billing-address" class="mt-4 mb-2 block text-sm font-medium">Country</label>
                  <div class="flex flex-col sm:flex-row">
                    <div class="relative flex-shrink-0 w-full">
                      <select type="text" id="billing-address" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                        <option value="State">Vietnamese</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <img class="h-4 w-4 object-contain" src="https://emojigraph.org/media/facebook/flag-vietnam_1f1fb-1f1f3.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='w-1/2 ml-2'>
                  <label for="email" class="mt-4 mb-2 block text-sm font-medium">Province</label>
                  <div class="relative">
                    <select type="text" id="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      value={selectedCity}
                      onChange={handleCityChange}
                    >
                      <option value="" selected>
                        Select Province
                      </option>
                      {addressState?.map((city) => (
                        <option key={city.Id} value={city.Id}>
                          {city.Name}
                        </option>
                      ))}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <MdOutlineHomeWork class="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex'>
                <div className='w-1/2 mr-2'>
                  <label for="email" class="mt-4 mb-2 block text-sm font-medium">District</label>
                  <div class="relative">
                    <select type="text" id="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                    >
                      <option value="" selected>
                        Select District
                      </option>
                      {districts?.map((district) => (
                        <option key={district.Id} value={district.Id}>
                          {district.Name}
                        </option>
                      ))}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <IoHomeOutline class="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className='w-1/2 ml-2'>
                  <label for="email" class="mt-4 mb-2 block text-sm font-medium">Wards</label>
                  <div class="relative">
                    <select type="text" id="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      value={selectedWard}
                      onChange={handleWarsChange}
                    >
                      <option value="" selected>
                        Select Ward
                      </option>
                      {wards?.map((ward) => (
                        <option key={ward.Id} value={ward.Id}>
                          {ward.Name}
                        </option>
                      ))}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <FaRoad class="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">Specific address</label>
                <div class="relative">
                  <input type="text" id="card-holder" name="card-holder" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Specific address"
                    onChange={(e) => setInputAddress(e.target.value)}
                    value={inputAddress}
                    onBlur={handleClickSave}
                  />
                  <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <FaMapMarkerAlt class="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className='flex'>
                <div className='w-1/2 mr-2'>
                  <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">Full name</label>
                  <div class="relative">
                    <input type="text" id="card-holder" name="card-holder" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Full Name"
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                    />
                    <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <MdOutlineNoteAlt class="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className='w-1/2 ml-2'>
                  <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium">Phone Number</label>
                  <div class="relative">
                    <input type="number" id="card-holder" name="card-holder" class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Phone Number"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />
                    <div class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <FaPhone class="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-2/5 ml-2'>
            <label for="card-no" class=" mb-2 block text-sm font-medium">Map</label>
            <div class="flex">
              <div class="relative w-full flex-shrink-0">
                <Map address={address} />
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='w-1/6 mt-6 h-12 text-base font-medium'>
            <button className='flex items-center px-4 py-2' onClick={() => setShowAddShip(false)}>
              <IoChevronBack className='mr-2 w-5 h-auto' />
              <span>Back</span>
            </button>
          </div>
          <div className='w-1/6 mt-6 h-12 text-base font-medium' onClick={() => handlePayment(address)}>
            <Button name='Place Order' />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Shipping