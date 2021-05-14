import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

import './VaccineMap.css';

const defaultProps = { center: { lat: -34.397, lng: 150.644 }, zoom: 8 } ;
export default function VaccineMap({center, zoom, clinics, onMarkerClick}) {
    const state = useState();

    const onMarkerClickDefault = (e) => {
        console.log(e);
    }

    if (!onMarkerClick){
        onMarkerClick = onMarkerClickDefault;
    }

    const Marker = () => {
        return (
            <div className="marker" onClick={onMarkerClick}><div className="inner-marker"></div></div>
        )
    }

    return (
        <GoogleMapReact className="vaccine-map"
            bootstrapURLKeys={{
                key: 'AIzaSyAGrnG8WTVBcpYTlFF_dHJe4X8-XMcWduA',
                language: 'en'
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            center={center}
            zoom={zoom}
        >
            {
                clinics.map((clinic) => (
                    <Marker text={clinic.name} lat={clinic.location.lat} lng={clinic.location.lng} onClick={clinic.onclick ? clinic.onclick : () => {}}></Marker>
                ))
            }
        </GoogleMapReact>
    )
}