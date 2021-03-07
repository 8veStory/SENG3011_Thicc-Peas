/**
 * The following example is a basic API created in express.js
 * 
 * NOTE: You should try to conform to the OpenAPI Specification, which lets your
 * API be understood by humans AND machines. You get benefits like easy
 * documentation to because of SwaggerHub. You can also upload your API easily
 * to API Gateway on AWS or Google Cloud.
 */

const express = require('express');
const app = express();
const PORT = 8080

/**
 * Listen on 8080
 */
app.use(express.json())

/**
 * Endpoint: GET '/outbreaks'
 * Send a 200 response and all the outbreaks.
 */
app.get('/outbreaks', (req, res) => {
    res.status(200).send({
        outbreaks: [
            {
                id: "001",
                disease_name: "COVID-19",
                locations: [
                    "Lidcome, NSW, Australia"
                ],
                reported_cases: 17,
                hospitalisations: 2,
                deaths: 0,
                start_date: "07-06-20",
                end_date: "12-06-20",
                investigation_status: false
            },
            {
                id: "002",
                disease_name: "Listeria",
                locations: [
                    "Colorado, United States of America"
                ],
                reported_cases: 2,
                hospitalisations: 1,
                deaths: 0,
                start_date: "07-09-20",
                end_date: "18-09-20",
                investigation_status: false
            },
        ]
    })
})

/**
 * Endpoint: POST '/disease/:diseasename'
 * Example of a dynamic URL parameter (':diseasename') as it accepts an outbreak diseasename.
 * NOTE: By default Express doesn't parse json in the body. So we have to setup a middleware.
 * It is shared code that is run before every endpoint's callback.
 */
app.post('/disease/:diseasename', (req, res) => {
    // URL Parameters are located in req.params
    const { diseasename } = req.params;

    res.send({
        name: "Listeria",
        description: "Listeriosis is a serious infection usually caused by eating food contaminated with the bacterium Listeria monocytogenes. An estimated 1,600 people get listeriosis each year, and about 260 die. The infection is most likely to sicken pregnant women and their newborns, adults aged 65 or older, and people with weakened immune systems.",
        symptoms: [
            {
                name: "Fever"
            },
            {
                name: "Diarrhea"
            },
            {
                name: "Muscle Aches"
            },
            {
                name: "Fatigue"
            },
            {
                name: "Miscarriage"
            },
        ]
    })
})

app.listen(
    PORT,
    () => console.log(`API is alive on http://localhost:${PORT}`)
);
