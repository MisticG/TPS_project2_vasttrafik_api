import * as express from 'express';
import * as bodyParser from 'body-parser';

const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req:express.Request, res:express.Response)=>{
    res.send('Hell haahahah')
})

// Access the parse results as request.body
app.post('/', (req:express.Request, res:express.Response) => {
    // Formulär data
    console.log(req.body.to);
    console.log(req.body.from);


   /*  const to = req.body.to
    const from = req.body.from */

    // Skicka till västtrafik för att hämta Stops
    // Skicka tillbaka till klienten 
})



const port = 5000;
app.listen(port, () => console.log(`Listening on port ${ process.env.PORT||port }`));