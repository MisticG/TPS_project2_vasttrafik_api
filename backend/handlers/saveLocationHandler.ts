import { keys } from "./keys";
import axios from 'axios';

import * as fs from 'file-system';
import handleToken from './authenticationHandler'

export default async function saveAllLocation() {
    //Get keys, tokens and urls here.
    let url = keys.allLocationUrl
    let token = await handleToken()
    let headers: any = {
        'Authorization':'Bearer ' + token
    }
    
    //Using a fs.writeFile to add locations to a JSON file.
    try {
        let request = await axios.get(url, {headers});
        let response = await request.data;
        
        if(request.status === 200) {
            let allLocationData = response.LocationList.StopLocation
            let data = JSON.stringify(allLocationData, null, 2);

            fs.writeFile('./allLocation.json', data, (err, fs)=> {
                if(err) throw err;
                console.log('filesUpdated')
            })
        } else {
            console.log("Error saveLocationHandler...");
        }

    } catch(error) {
        console.log(error.status)
    }
}