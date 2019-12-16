import * as express from 'express';
import * as bodyParser from 'body-parser';
//import { token } from './authenticationHandler';
import { handleAuthenticate } from './handlers/authenticationHandler';
import { locationHandler } from './handlers/saveLocationHandler';

const app = express();

handleAuthenticate.authenticate;
setInterval(locationHandler.saveAllLocation, 1000 * 60 * 60 * 24)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use('/', handleAuthenticate.authenticate);
//app.use('/', locationHandler.saveAllLocation)

app.use('/searchJourney')

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {

    res.send({token: res.locals.token})
})

/* 
Jag ringer på slack
 */
const port = 5000;
app.listen(port, () => console.log(`Listening on port ${ process.env.PORT||port }`));