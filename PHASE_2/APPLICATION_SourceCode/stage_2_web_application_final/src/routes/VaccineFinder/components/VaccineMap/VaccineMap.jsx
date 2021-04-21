import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

import './VaccineMap.css';

const defaultProps = { center: { lat: -34.397, lng: 150.644 }, zoom: 8 } ;
export default function VaccineMap({center, zoom, clinics}) {
    if (!center || !zoom) {
        center = defaultProps.center;
        zoom = defaultProps.zoom;
        console.log("Using default props.");
    }

    const state = useState();

    const onMapEnter = (e) => {
        console.log(e);
    }

    const onMapLeave = (e) => {
        console.log(e);
    }

    return (
        <GoogleMapReact className="vaccine-map"
            bootstrapURLKeys={{
                key: 'AIzaSyAGrnG8WTVBcpYTlFF_dHJe4X8-XMcWduA',
                language: 'en'
            }}
            defaultCenter={center}
            defaultZoom={zoom}
            onChildMouseEnter={onMapEnter}
            onChildMouseLeave={onMapLeave}
        >
            {
                clinics.map((clinic) => (
                    <Marker text={clinic.name} lat={clinic.location.lat} lng={clinic.location.lng} onClick={clinic.onclick ? clinic.onclick : () => {}}></Marker>
                ))
            }
        </GoogleMapReact>
    )
}

function Marker() {
    return (
        <div class="marker"><div className="inner-marker"></div></div>
    )
}