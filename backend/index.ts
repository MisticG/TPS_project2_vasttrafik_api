import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req:express.Request, res:express.Response)=>{
    res.send('Hell haahahah')
})

app.post('/', (req:express.Request, res:express.Response) => {
    req.body('hej')
})



const port = 5000;
app.listen(port, () => console.log(`Listening on port ${ process.env.PORT||port }`));