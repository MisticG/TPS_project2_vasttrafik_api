import { keys } from "./keys";
const { default: axios } = require('axios');
const querystring = require('querystring');

export async function authenticate() {

    let url = "https://api.vasttrafik.se" + keys.oauthUrl
    let body = querystring.stringify({'grant_type':'client_credentials', 'client_id': keys.key, 'client_secret': keys.secret})
    let headers = {
        'Content-type': 'application/x-www-form-urlencoded',
    }

    try{

        let request = await axios.post(url, body, headers)
        let response = await request

        if (response.status === 200 ) {
            return console.log(response.data)
        } else {
            return response.status + 'Error: ' + response.statusText
        }

    } catch(error) {
        console.log(error)
    }
}
