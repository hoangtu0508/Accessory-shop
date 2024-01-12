import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const defaultProps = {
    center: {
        lat: null,
        lng: null
    },
    zoom: 13
};

const Map = ({ address }) => {
    const [coords, setCoords] = useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { longitude, latitude } }) => {
            setCoords({ lat: latitude, lng: longitude })
        }, () => { }, { timeout: 10000 })
    }, [])

    useEffect(() => {
        const getCoords = async () => {
            const results = await geocodeByAddress(address)
            const latLng = await getLatLng(results[0])
            setCoords(latLng)
        };
        address && getCoords();
    }, [address])

    return (
        <div className='w-full h-72'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyADnqF18I_3sObpHpF142hIyV1TRR9yGG4" }}
                defaultCenter={coords}
                defaultZoom={defaultProps.zoom}
                center={coords}
            >
                <AnyReactComponent
                    lat={coords?.lat}
                    lng={coords?.lng}
                    text={<FaMapMarkerAlt className='w-6 h-6 text-red-700' />}
                />
            </GoogleMapReact>
        </div >
    )
}

export default Map