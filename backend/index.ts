import express  = require('express')
import * as bodyParser from 'body-parser';
import { handleAccesstoken  } from './handlers/HandleaccessToken';
import axios from 'axios';
import * as fileSytem from 'file-system'

const app:express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use('/', handleAccesstoken.formHandler)

app.get('/', (req:express.Request, res:express.Response)=>{
   
    async function test (){

        try{

           /*  let response = await axios.get("https://api.vasttrafik.se/bin/rest.exe/v2/location.allstops?format=json", {
                    headers: {
                    Authorization: `Bearer ${res.locals.token}`,
                    },
                })
            let awaitResponse = await response.data.LocationList.StopLocation;
            //console.log(awaitResponse)
            let stringifiedlocations = JSON.stringify(awaitResponse);
           
            fileSytem.writeFile('locations.json', stringifiedlocations, (error, fs)=>{
                if(error) {
                    console.log(error)
                }
                //console.log(stringifiedlocations)
                res.send('Can write'+ fs)
               
            })
             */
            //check the length of json file
            fileSytem.readFile('locations.json',(error, data)=>{
                if(error){
                    console.log(error)
                }
                let dataParse = JSON.parse(data)
                console.log(dataParse.length);
                res.json({length:dataParse.length})
            })

        } catch(error){ 
            console.log(error, 'here')
        }
    } 
    test ()

})

app.post('/searchJourny', (req:express.Request, res:express.Response)=>{
    let data = req.body;
    console.log(data)
    res.json({text:'success'});

    //1departureBoard uses id from all locations and return the next 20 stops by giving time
    /* 
    This method will return the next 20 departures (or less if not existing) from a given point
     in time or the next departures in a given timespan. The service can only be called for stops/stations
      by using according ID retrieved by the location method. The parameter is called id. The time and date
       are defined with the parameters date and time.
    
    */
    //2journyDetail arrival times can not be called directly
    //3 /trip from which time a bus will leave

})




const port = 5000;
app.listen(port, () => console.log(`Listening on port ${ process.env.PORT||port }`));