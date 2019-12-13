import express  = require('express')
import * as bodyParser from 'body-parser';
import { handleAccesstoken  } from './handlers/HandleaccessToken';
import axios from 'axios';
import * as fileSytem from 'file-system'
import getTwoPointStops from './handlers/handleGetTwoPointsStops';
import  getAllStops from './handlers/handleGetAllStops';
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
           /*  fileSytem.readFile('locations.json',(error, data)=>{
                if(error){
                    console.log(error)
                }
                let dataParse = JSON.parse(data)
                console.log(dataParse.length);
                res.json({length:dataParse.length})
            }) */

        } catch(error){ 
            console.log(error, 'here')
        }
    } 
    //test ()
    res.send('holla')

})
//Get orgin-dest points stops
app.post('/searchTrip',(req:express.Request, res:express.Response)=>{
 
    getTwoPointStops(req, res, axios);
})

//Get all stops 
app.get('/locations', (req:express.Request, res:express.Response)=>{
    getAllStops(fileSytem,res);
   
})


const port = 5000;
app.listen(port, () => console.log(`Listening on port ${ process.env.PORT||port }`));