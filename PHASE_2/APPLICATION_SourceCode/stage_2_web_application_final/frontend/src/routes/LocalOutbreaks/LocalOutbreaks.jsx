import { useState } from 'react';
window.getReports = (disease) => {
    fetch('http://thicc-peas-cdc-api-o54gbxra3a-an.a.run.app/reports')
        .then((value) => {
            console.log(value);
        });
}

export default function LocalOutbreaks(props) {
    const [reports, setReports] = useState([]);

    return (
        <div className="local-outbreaks">
            <div className="outbreak-card"></div>
        </div>
    )
}