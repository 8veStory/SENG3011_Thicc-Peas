import React, { useState } from 'react';
import VaccineMap from './components/VaccineMap/VaccineMap';
import PharmacyCard from './components/PharmarcyCard/PharmacyCard';

import './VaccineFinder.css';

export default function VaccineFinder() {
    const [addresses, setAddresses] = useState();
    // let map;
    // let apiKey = 'AIzaSyAGrnG8WTVBcpYTlFF_dHJe4X8-XMcWduA';

    // setAddresses([{
    //     name: "Plunkett's TerryWhite Chemmart Port Macquarie",
    //     address: "158 Gordon St, Port Macquarie, NSW",
    //     vaccine_data: [{
    //         type: "COVID-19",
    //         quantity: 20,
    //         available: 16
    //     }]
    // },
    // {
    //     name: "Port Macquarie Medical Centre Pharmacy",
    //     address: "1/85 Lord St, Port Macquarie, NSW",
    //     vaccine_data: [{
    //         type: "COVID-19",
    //         quantity: 10,
    //         available: 5
    //     }]
    // },
    // {
    //     name: "Priceline Pharmacy Port Macquarie",
    //     address: "36 Horton St, Port Macquarie, NSW",
    //     vaccine_data: [{
    //         type: "COVID-19",
    //         quantity: 30,
    //         available: 15
    //     }]
    // },
    // {
    //     name: "Amcal Pharmacy Port Macquarie - Settlement City",
    //     address: "Shop 10 Settlement City Shopping Centre, Port Macquarie, NSW",
    //     vaccine_data: [{
    //         type: "COVID-19",
    //         quantity: 20,
    //         available: 15
    //     }]
    // }]);

    // const initMap = () => {
    //     if (navigator.geolocation) {
    //         map = navigator.geolocation.getCurrentPosition(showPosition);
    //     } else {
    //         map = new google.maps.Map(document.getElementById("map"), {
    //             center: { lat: -34.397, lng: 150.644 },
    //             zoom: 8,
    //         });
    //         document.getElementById("addressbutton").style.display = "block";
    //     }
    // }

    // const showPosition = (position) => {
    //     map = new google.maps.Map(document.getElementById("map"), {
    //         center: { lat: position.coords.latitude, lng: position.coords.longitude },
    //         zoom: 12,
    //     });
    //     document.getElementById("addressbutton").style.display = "block";
    // }

    // const addAddresses = () => {
    //     let pharmacyList = document.getElementById("pharmacylist");
    //     while (pharmacyList.firstChild) {
    //         pharmacyList.removeChild(pharmacyList.lastChild);
    //     }
    //     for (i in addresses) {
    //         addAddress(addresses[i]);
    //     }
    // }

    // const addAddress = (addressdata) => {
    //     formatted_address = addressdata.address.replace(' ', '+')
    //     fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formatted_address}&key=${apiKey}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             var location = data.results[0].geometry.location;
    //             var marker = new google.maps.Marker({
    //                 position: new google.maps.LatLng(location.lat, location.lng),
    //                 title: "Pharmacy",
    //                 map: map
    //             });
    //             var pharmacyList = document.getElementById("pharmacylist");
    //             var pharmacyNode = document.createElement('div');
    //             pharmacyNode.id = "pharmacynode"
    //             pharmacyNode.appendChild(document.createTextNode(addressdata.name));
    //             pharmacyNode.appendChild(document.createElement('br'));
    //             pharmacyNode.appendChild(document.createTextNode(`Available vaccines: ${addressdata.vaccine_data[0].available}\n/\n${addressdata.vaccine_data[0].quantity}`));
    //             pharmacyNode.appendChild(document.createTextNode(' \n'));
    //             pharmacyNode.addEventListener('click', () => { map.setCenter(marker.getPosition()) })
    //             pharmacylist.appendChild(pharmacyNode);
    //             marker.setMap(map);
    //         });
    // }

    return (
        <div className="vaccine-finder-root">
            <div className="vaccine-finder-container">
                <div className="vaccine-map-module">
                    <div className="vaccine-finder__card vaccine-map-card">
                        <div className="vaccine-map-container">
                            <VaccineMap></VaccineMap>
                        </div>
                    </div>

                    <div className="buttons">
                        <button className="btn" id="addressbutton" >Find Available Clinics</button>
                    </div>
                </div>

                <div className="pharmacy-list-module">
                    <div className="vaccine-finder__card pharmacy-list-card">
                        <div id="pharmacy-list">
                            <PharmacyCard pharmacyId="12" name="Lidcombe Family Medical Centre" location="Shop 38/92 Parramatta Rd, Lidcombe NSW 2141" openCloseTime={{ thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm", }}></PharmacyCard>
                            <PharmacyCard pharmacyId="12" name="Redfern Family Medical Centre" location="Shop 38/92 Parramatta Rd, Lidcombe NSW 2141" openCloseTime={{ thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm", }}></PharmacyCard>
                            <PharmacyCard pharmacyId="12" name="Central Family Medical Centre" location="Shop 38/92 Parramatta Rd, Lidcombe NSW 2141" openCloseTime={{ thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm", }}></PharmacyCard>
                            <PharmacyCard pharmacyId="12" name="Fairfiel" location="Shop 38/92 Parramatta Rd, Lidcombe NSW 2141" openCloseTime={{ thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm", }}></PharmacyCard>
                            <PharmacyCard pharmacyId="12" name="Eppington Family Medical Centre" location="Shop 38/92 Parramatta Rd, Lidcombe NSW 2141" openCloseTime={{ thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm", }}></PharmacyCard>
                            <PharmacyCard pharmacyId="12" name="Lidcombe Family Medical Centre" location="Shop 38/92 Parramatta Rd, Lidcombe NSW 2141" openCloseTime={{ thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm", }}></PharmacyCard>
                            <PharmacyCard pharmacyId="12" name="Lidcombe Family Medical Centre" location="Shop 38/92 Parramatta Rd, Lidcombe NSW 2141" openCloseTime={{ thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm", }}></PharmacyCard>
                            <PharmacyCard pharmacyId="12" name="Lidcombe Family Medical Centre" location="Shop 38/92 Parramatta Rd, Lidcombe NSW 2141" openCloseTime={{ thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm", }}></PharmacyCard>
                            <PharmacyCard pharmacyId="12" name="Lidcombe Family Medical Centre" location="Shop 38/92 Parramatta Rd, Lidcombe NSW 2141" openCloseTime={{ thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm", }}></PharmacyCard>
                            <PharmacyCard pharmacyId="12" name="Lidcombe Family Medical Centre" location="Shop 38/92 Parramatta Rd, Lidcombe NSW 2141" openCloseTime={{ thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm", }}></PharmacyCard>
                            <PharmacyCard pharmacyId="12" name="Lidcombe Family Medical Centre" location="Shop 38/92 Parramatta Rd, Lidcombe NSW 2141" openCloseTime={{ thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm", }}></PharmacyCard>
                            <PharmacyCard pharmacyId="12" name="Lidcombe Family Medical Centre" location="Shop 38/92 Parramatta Rd, Lidcombe NSW 2141" openCloseTime={{ thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm", }}></PharmacyCard>
                            <PharmacyCard pharmacyId="12" name="Lidcombe Family Medical Centre" location="Shop 38/92 Parramatta Rd, Lidcombe NSW 2141" openCloseTime={{ thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm", }}></PharmacyCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}