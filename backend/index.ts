import * as express from 'express';
import * as bodyParser from 'body-parser';
import { authenticate } from './authenticationHandler';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req:express.Request, res:express.Response)=>{
    res.send(authenticate())
})



const port = 5000;
app.listen(port, () => console.log(`Listening on port ${ process.env.PORT||port }`));