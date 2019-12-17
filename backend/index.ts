import * as express from 'express';
import * as bodyParser from 'body-parser';

import saveAllLocation from './handlers/saveLocationHandler';
import handleToken from './handlers/authenticationHandler'
const app = express();

//Initiate everything before the page is loaded
//Get a token and save Locations in json file 
handleToken()
saveAllLocation()

//Set a timer to get locations to a json-file every 24h
//setInterval(locationHandler.saveAllLocation, 1000 * 60 * 60 * 24)
setInterval(saveAllLocation, 1000 * 30)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//app.use('/', handleAuthenticate.authenticate);

//app.use('/searchJourney')

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send({myCache: handleToken()})
   // res.send({token: res.locals.token})
})

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${ process.env.PORT||port }`));