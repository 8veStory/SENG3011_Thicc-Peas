import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

import './VaccineMap.css';

const defaultProps = { center: { lat: -34.397, lng: 150.644 }, zoom: 8 } ;
export default function VaccineMap(props) {
    if (!props.center || !props.zoom) {
        props = defaultProps;
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
            defaultCenter={props.center}
            defaultZoom={props.zoom}
            onChildMouseEnter={onMapEnter}
            onChildMouseLeave={onMapLeave}
        />
    )
}