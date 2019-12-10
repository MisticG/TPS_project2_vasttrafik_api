import { keys } from "./keys";
import axios from 'axios';

const querystring = require('querystring');
export let token: String;

export async function authenticate() {

    let url = "https://api.vasttrafik.se" + keys.oauthUrl
    let body = querystring.stringify({
        'grant_type':'client_credentials', 
        'client_id': keys.key, 
        'client_secret': keys.secret
    })

    //definiera typningen för 'config'
    let config: any = {
        'Content-type': 'application/x-www-form-urlencoded',
    }

    try {
        let request = await axios.post(url, body, config)
        let response = await request

        if (response.status === 200 ) {
            token = response.data.access_token
            return token
            //console.log(response.data)
        } else {
            return response.status + 'Error: ' + response.statusText
        }

    } catch(error) {
        console.log(error)
    }
}
