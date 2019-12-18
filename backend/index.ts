import express  = require('express')
import * as bodyParser from 'body-parser';

import saveAllLocation from './handlers/saveLocationHandler';
import handleToken from './handlers/authenticationHandler'

import axios from 'axios';
import * as fileSytem from 'file-system'
import getTwoPointStops from './handlers/handleGetTwoPointsStops';
import  getAllStops from './handlers/handleGetAllStops';
import getTripDetail from './handlers/HandleGetTripDetail';
import getTrafikInfo from './handlers/handleGetTrafikInfo';
export const app:express.Application = express();

//Initiate everything before the page is loaded
//Get a token and save Locations in json file 
saveAllLocation()

//Set a timer to get locations to a json-file every 24h
//setInterval(saveAllLocation, 1000 * 60 * 60 * 24)
setInterval(saveAllLocation, 1000 * 30)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//app.use('/searchJourney')
//app.use([handleAccesstoken.formHandler, handleAccesstoken.handleError])

app.get('/', async (req:express.Request, res:express.Response)=>{

    res.send('Hello from start page')
 
})
//Get all stops 
app.get('/locations', async (req:express.Request, res:express.Response)=>{
    
    getAllStops(fileSytem,res);
   
})
//Get orgin-dest points stops
app.post('/searchTrip',async (req:express.Request, res:express.Response)=>{
    let token = await handleToken();
    console.log(token)
    getTwoPointStops(req, res, axios, token);
})
//Get stop stations of specefic trip

app.post('/getTripDetail', async (req:express.Request, res:express.Response) => {
    let token = await handleToken();
    getTripDetail(req, res, axios, token)
})

app.post('/getTrafikInfo', async (req:express.Request, res:express.Response)=>{
    let token = await handleToken();

    getTrafikInfo(req,res,axios, token)

})

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send({handleToken})
})

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${ process.env.PORT||port }`));