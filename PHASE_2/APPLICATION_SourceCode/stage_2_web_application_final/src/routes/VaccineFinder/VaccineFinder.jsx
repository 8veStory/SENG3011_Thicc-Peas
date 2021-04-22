import React, { useState } from 'react';
import MultiSelect from "react-multi-select-component";

import './VaccineFinder.css';
import VaccineMap from './components/VaccineMap/VaccineMap';
import PharmacyCard from './components/PharmarcyCard/PharmacyCard';

const clinicsData = [
    {
        id: 1,
        name: "Lidcome Family Medical Centre",
        address: "Shop 38/92 Parramatta Rd, Lidcombe NSW 2141",
        openCloseTimes: { thursday: "9am–5pm", friday: "9am–5pm", saturday: "9am–3pm", sunday: "Closed", monday: "9am–5pm", tuesday: "9am–5pm", wednesday: "9am–5pm" },
        phone: "(02) 8022 8442",
        email: "lidcomefamilyhealthcentre@outlook.com",
        location: { lat: -33.849427, lng: 151.0491153 },
        vaccines: {
            "COVID-19": 23,
            "Measles": 2,
            "Meningococcal ACWY": 12,
        },
        tests: {
            "COVID-19": 32,
        }
    },
    {
        id: 2,
        name: "Redfern Community Health Centre",
        address: "103-105 Redfern St, Redfern NSW 2016",
        openCloseTimes: { thursday: "8:30am–3pm", friday: "8:30am–3pm", saturday: "Closed", sunday: "Closed", monday: "8:30am–3pm", tuesday: "8:30am–3pm", wednesday: "8:30am–3pm" },
        phone: "(02) 9395 0444",
        email: "redfernhealthcentre@outlook.com",
        location: { lat: -33.89307240000001, lng: 151.2033416 },
        vaccines: {
            "COVID-19": 82,
            "Polio": 9,
            "Rubella": 26,
        },
        tests: {
            "COVID-19": 72,
        }
    }
]

export default function VaccineFinder() {
    const [addresses, setAddresses] = useState();
    const [selectedVaccines, setSelectedVaccines] = useState([]);
    const [selectedTests, setSelectedTests] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [lat, setLat] = useState(-33.849427);
    const [lng, setLng] = useState(151.0491153);
    const [zoom, setZoom] = useState(8);
    /* 
    - [x] Space on the right-hand side???
    - [x] Scaling google map.
    - [x] Multiple cards please.
    - [x] Add pog filters.
    - [x] List of available vaccine at each clinic.
    - [x] Location markers for each clinic.
    - [x] Click each card to locate each clinic on google map.
    - [ ] Click each marker for the clinic list to scroll to the correct clinic.
    - [ ] Only show clinics in a certain radius.
    - [ ] Actually filter lmao.
    */

    /**
     * Fetches all vaccines from database to fill out the filter box.
     */
    const getAllVaccines = () => {
        console.log("Make API call that will fetch all available vaccines from the DB...");
        return [
            { label: "COVID-19", value: "COVID-19" },
            { label: "Measles", value: "Measles" },
            { label: "Flu", value: "Flu" },
            { label: "Hepatitis B", value: "Hepatitis B" },
            { label: "Rotavirus", value: "Rotavirus" },
            { label: "Meningococcal ACWY", value: "Meningococcal ACWY" },
            { label: "Penumonococcal", value: "Penumonococcal" },
            { label: "Pertussis", value: "Pertussis" },
            { label: "Tetanus", value: "Tetanus" },
            { label: "Diphtheria", value: "Diphtheria" },
            { label: "Shingles (herpes zoster)", value: "Shingles (herpes zoster)" },
            { label: "Polio", value: "Polio" },
            { label: "Mumps", value: "Mumps" },
            { label: "Rubella", value: "Rubella" },
        ].sort((a, b) => a.label > b.label);
    }

    /**
     * Fetches all tests from database to fill out the filter box.
     */
    const getAllTests = () => {
        console.log("Make API call that will fetch all available tests from the DB...");
        return [
            { label: "COVID-19", value: "COVID-19" },
        ].sort((a, b) => a.label > b.label);
    }

    /**
     * 
     * @param {[String]} vaccines 
     */
    const getClinics = (selectedVaccines, selectedTests) => {
        console.log("Make API call that will fetch all available clinics from the DB...");
        return clinicsData;
    }

    const handleCardClick = (e) => {
        let target = e.target;
        while (target.className != "pharmacy-card") {
            console.log(target);
            target = target.parentElement;
        }

        let clinicId = target.dataset.clinic.id;
        console.log(target.dataset);
        console.log(target);

        // Get refernce to the clinic
        console.log(clinicId);
        console.log(clinics);
        let clinicResult = clinics.find(clinic => { return clinic.id == parseInt(clinicId) });
        if (!clinicResult) {
            console.error(`Clinic of ID ${clinicId} cannot be found.`);
            return;
        }

        // Relocate to the clinic's lat/long
        setLat(clinicResult.location.lat);
        setLng(clinicResult.location.lng);
    }

    const ClinicList = () => {
        return (
            <div id="pharmacy-list">
                {
                    clinics.map((clinic) => (
                        <PharmacyCard clinic={clinic} onclick={handleCardClick}></PharmacyCard>
                    ))
                }
            </div>
        )
    }

    const onMarkerClick = () => {
        // Get the clinic-id from the marker.
        
        // Scroll in the scroll-list until that element.

        // 
    }

    const populateMapAndListWithClinics = (e) => {
        e.preventDefault();

        // Get the filters.
        let vaccines = selectedVaccines;
        let tests = selectedTests;

        // Get clinics according to filter. When this setter is called, the clinic
        // list and google map shall be populated accordingly.
        setClinics(getClinics(vaccines, tests))
    }

    return (
        <div className="vaccine-finder-root">
            <div className="vaccine-finder-container">
                <div className="vaccine-map-module">
                    <div className="vaccine-finder__card vaccine-map-card">
                        <div className="vaccine-map-container">
                            <VaccineMap center={{ lat: lat, lng: lng }} zoom={zoom} clinics={clinics}></VaccineMap>
                        </div>
                    </div>

                    <div className="buttons">
                        <MultiSelect
                            className="multiselect vaccine-multiselect"
                            options={getAllVaccines()}
                            value={selectedVaccines}
                            onChange={setSelectedVaccines}
                            labelledBy="Select"
                        ></MultiSelect>
                        <MultiSelect
                            className="multiselect test-multiselect"
                            options={getAllTests()}
                            value={selectedTests}
                            onChange={setSelectedTests}
                            labelledBy="Select"
                        ></MultiSelect>

                        <button className="btn" id="addressbutton" onClick={populateMapAndListWithClinics} >Find Available Clinics</button>
                    </div>
                </div>

                <div className="pharmacy-list-module">
                    <div className="vaccine-finder__card pharmacy-list-card">
                        <ClinicList clinics={clinics}></ClinicList>
                    </div>
                </div>
            </div>
        </div>
    )
}

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