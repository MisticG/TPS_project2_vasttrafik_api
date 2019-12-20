import { keys } from "./keys";
import axios from 'axios';

import * as fs from 'file-system';
import handleToken from './handleAccessToken'

export default async function saveAllLocation() {
    
    //Get keys, tokens and urls here.
    let url = "https://api.vasttrafik.se/bin/rest.exe/v2/location.allstops?format=json"
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
                if(err) {
                    console.log(err)
                    throw err
                };
                console.log('filesUpdated')
            })
        } else {
            console.log("Error saveLocationHandler...");
        }

    } catch(error) {
        console.log(error.status)
    }
}

/*  let response = await axios.get("https://api.vasttrafik.se/bin/rest.exe/v2/location.allstops?format=json", {
                    headers: {
                    Authorization: `Bearer ${res.locals.token}`,
                    },
                })
            let awaitResponse = await response.data.LocationList.StopLocation;
            //console.log(awaitResponse)
            let stringifiedlocations = JSON.stringify(awaitResponse);
           
            fileSytem.writeFile('locations.json', stringifiedlocations, (error, fs)=>{
                if(error) {
                    console.log(error)
                }
                //console.log(stringifiedlocations)
                res.send('Can write'+ fs)
               
            })
             */