import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req:express.Request, res:express.Response)=>{
    res.send('Hell haahahah')
})

app.post('/', (req:express.Request, res:express.Response) => {
    // Formulär data
    const to = req.body.to
    const from = req.body.from
    // Skicka till västtrafik för att hämta Stops
    // Skicka tillbaka till klienten 
})



const port = 5000;
app.listen(port, () => console.log(`Listening on port ${ process.env.PORT||port }`));