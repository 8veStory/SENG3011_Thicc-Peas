/** POLYFILLS */
if (!Object.entries)
   Object.entries = function( obj ){
      var ownProps = Object.keys( obj ),
         i = ownProps.length,
         resArray = new Array(i); // preallocate the Array

      while (i--)
         resArray[i] = [ownProps[i], obj[ownProps[i]]];
      return resArray;
   };

const diseases = {
    "covid-19": {
        id: 1,
        name: "COVID-19",
        description: "Coronaviruses are a large family of viruses that can cause illness in animals or humans. In humans there are several known coronaviruses that cause respiratory infections. These coronaviruses range from the common cold to more severe diseases such as severe acute respiratory syndrome (SARS), Middle East respiratory syndrome (MERS), and COVID-19. COVID-19 was identified in Wuhan, China in December 2019. COVID-19 is caused by the virus severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2), a new virus in humans causing respiratory illness which can be spread from person-to-person. Early in the outbreak, many patients were reported to have a link to a large seafood and live animal market, however, later cases with no link to the market confirmed person-to-person transmission of the disease. Additionally, travel-related exportation of cases has occurred.",
        symptoms: [
            {
                name: "Fever or chills"
            },
            {
                name: "Cough"
            },
            {
                name: "Shortness of breath or difficulty breathing"
            },
            {
                name: "Fatigue"
            },
            {
                name: "Muscle or body aches"
            },
            {
                name: "Headache"
            },
            {
                name: "New loss of taste or smell"
            },
            {
                name: "Sore throat"
            },
            {
                name: "Congestion or runny nose"
            },
            {
                name: "Nausea or vomiting"
            },
            {
                name: "Diarrhea"
            }
        ]
    },
    "listeria": {
        id: 2,
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
    },
    "salmonella": {
        id: 3,
        name: "Salmonella",
        description: "Salmonella are bacteria that make people sick. They were first discovered by an American scientist named Dr. Daniel E. Salmon in 1885. CDC estimates Salmonella bacteria cause about 1.35 million infections, 26,500 hospitalizations, and 420 deaths in the United States every year. Food is the source for most of these illnesses.",
        symptoms: [
            {
                name: "Diarrhea (that can be bloody)"
            },
            {
                name: "Fever"
            },
            {
                name: "Stomach cramps"
            },
        ]
    }
};

let outbreaks = {
    1: {
        outbreak_id: 1,
        disease_id: 1,
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
    2: {
        outbreak_id: 2,
        disease_id: 2,
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
}

/**
 * The following example is a basic API created in express.js
 * 
 * NOTE: You should try to conform to the OpenAPI Specification, which lets your
 * API be understood by humans AND machines. You get benefits like easy
 * documentation to because of SwaggerHub. You can also upload your API easily
 * to API Gateway on AWS or Google Cloud.
 */

const express = require('express');
const fs = require('fs');
const app = express();

// CONSTANTS
// const PORT = process.env.PORT;
const PORT = 3000;

function log(req, res) {
    let utcTime = new Date().toJSON();
    result = `\n${utcTime} | ${req.ip} requested '${req.url}' - Status Code: ${res.statusCode}`
    fs.appendFile("log.txt", result, () => {
        console.log(`${result}`)
    });
}

/**
 * Listen on $PORT for JSON.
 */
app.use(express.json())

/**
 * Endpoint: GET '/log'
 * Retrieve the contents of the log file.
 */
app.get('/log', (req, res) => {
    fs.readFile('log.txt', (err, data) => {
        file = data.toString();
        logs = file.split("\n");

        res.send({ logs: logs });
    })
})

/**
 * Endpoint: GET '/outbreaks'
 * Send a 200 response and all the outbreaks.
 */
app.get('/outbreak', (req, res) => {
    let results = [];
    for (let key in outbreaks) {
        results.push(outbreaks[key]);
    }

    res.status(200).send({
        results
    })

    log(req, res);
})

app.get('/outbreak/:outbreakid', (req, res) => {
    const outbreakID = req.params.outbreakid;

    if (!outbreaks[outbreakID]) {
        res.statusCode = 404;
        res.send({
            message: `No outbreaks match the ID ${outbreakID}`
        });
        log(req, res);
        return;
    }
    res.send(outbreaks[outbreakID]);

    log(req, res);
})

/**
 * Return all diseases.
 */
app.get('/disease', (req, res) => {
    console.log(diseases);

    res.send(
        {
            diseases: [
                {
                    id: 1,
                    name: "COVID-19",
                    description: "Coronaviruses are a large family of viruses that can cause illness in animals or humans. In humans there are several known coronaviruses that cause respiratory infections. These coronaviruses range from the common cold to more severe diseases such as severe acute respiratory syndrome (SARS), Middle East respiratory syndrome (MERS), and COVID-19. COVID-19 was identified in Wuhan, China in December 2019. COVID-19 is caused by the virus severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2), a new virus in humans causing respiratory illness which can be spread from person-to-person. Early in the outbreak, many patients were reported to have a link to a large seafood and live animal market, however, later cases with no link to the market confirmed person-to-person transmission of the disease. Additionally, travel-related exportation of cases has occurred.",
                    symptoms: [
                        {
                            name: "Fever or chills"
                        },
                        {
                            name: "Cough"
                        },
                        {
                            name: "Shortness of breath or difficulty breathing"
                        },
                        {
                            name: "Fatigue"
                        },
                        {
                            name: "Muscle or body aches"
                        },
                        {
                            name: "Headache"
                        },
                        {
                            name: "New loss of taste or smell"
                        },
                        {
                            name: "Sore throat"
                        },
                        {
                            name: "Congestion or runny nose"
                        },
                        {
                            name: "Nausea or vomiting"
                        },
                        {
                            name: "Diarrhea"
                        }
                    ]
                },
                {
                    id: 2,
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
                },
                {
                    id: 3,
                    name: "Salmonella",
                    description: "Salmonella are bacteria that make people sick. They were first discovered by an American scientist named Dr. Daniel E. Salmon in 1885. CDC estimates Salmonella bacteria cause about 1.35 million infections, 26,500 hospitalizations, and 420 deaths in the United States every year. Food is the source for most of these illnesses.",
                    symptoms: [
                        {
                            name: "Diarrhea (that can be bloody)"
                        },
                        {
                            name: "Fever"
                        },
                        {
                            name: "Stomach cramps"
                        },
                    ]
                }
            ]
        })

    log(req, res);
}
)

/**
 * Endpoint: GET '/disease/:diseasename'
 * Example of a dynamic URL parameter (':diseasename') as it accepts an outbreak diseasename.
 * NOTE: By default Express doesn't parse json in the body. So we have to setup a middleware.
 * It is shared code that is run before every endpoint's callback.
 */
app.get('/disease/:diseasename', (req, res) => {
    // URL Parameters are located in req.params
    const { diseasename } = req.params;
    diseaseKey = diseasename.toLowerCase();
    if (!diseases[diseaseKey]) {
        res.statusCode = 404;
        res.send({
            message: `No diseases match the name ${diseasename}`
        });
        log(req, res);
        return;
    }
    res.send(diseases[diseaseKey]);
    log(req, res);
})


app.listen(
    PORT,
    () => console.log(`API is alive on http://localhost:${PORT}`)
);
