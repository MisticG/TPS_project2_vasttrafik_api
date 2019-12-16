import { keys } from "./keys";
import axios from 'axios';
import * as express from 'express';
//import * as moment from 'moment';

const querystring = require('querystring');
let token: string = '';
let tokenTime: number = 0; 

export const myCache = {
    
}

/*export function fetchData() { //saveLocationHandler
    // Hämta all data som du vill cacha
    myCache.stentorp = 'Foobar'
}*/
//console.log(token, 'wut')
export const handleAuthenticate = {

authenticate : async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.locals.token
   /* let now = new Date();
    let expires_in = moment().add(tokenTime, 'seconds');
    let diff = expires_in.isAfter(now);
*/
//yes

//expires_in är 0?
    if(token === ''  && tokenTime === 0) {
    let url = keys.oauthUrl
    let body = querystring.stringify({
        'grant_type':'client_credentials', 
        'client_id': keys.key, 
        'client_secret': keys.secret
    })

    //definiera typningen för 'config'
    let config: any = {
        'Content-type': 'application/x-www-form-urlencoded',
    }
        await axios.post(url, 
            body,
            config
          )
          .then(async (response) => {
            let data = await response.data;
            token = data.access_token
            tokenTime = data.expires_in
            console.log(data, 'jag är data');

            return token
          }, (error) => {
            console.log(error);
          }); 
    } else { 
        console.log(token, 'jag är en token som redan finns')
    }
    res.locals.token = token
    next()
}
    
    /*try {
        let request = await axios.post(url, body, config)
        let response = request

        if (response.status >= 400 ) {
            return response.status + 'Error: ' + response.statusText
           
            
            //return await token
    
            //console.log(response.data)
        } else {
            console.log(response.data.access_token)
            return await response.data.access_token;
        }

    } catch(error) {
        console.log(error)
    }*/
}

