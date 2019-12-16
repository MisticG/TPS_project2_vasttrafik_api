import { keys } from "./keys";
import axios from 'axios';
import * as express from 'express';
import * as fs from 'file-system';

//import * as moment from 'moment';
//const querystring = require('querystring');
//let oldTime: moment.Moment;

export const locationHandler = {
    saveAllLocation : async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let url = keys.allLocationUrl
        let token = res.locals.token
        let headers: any = {
            'Authorization':'Bearer ' + token
        }

        console.log("I saveAllLocation...");

        /*var now = new Date;
        var duration_to_expire = moment().subtract(6, 'seconds')
        var when_to_expire = duration_to_expire.isAfter(now)
        //console.log("when",when_to_expire)
        //var time_to_expire = moment().fromNow()*/
        
        

        try{
            // if-sats som i authenticationsHandler fast en dag framåt och inte sekunder.
                console.log("trying...");
                let request = await axios.get(url, {headers});
                let response = await request.data;
                
                if(request.status === 200) {
                    let allLocationData = response.LocationList.StopLocation
                    let data = JSON.stringify(allLocationData, null, 2);
                    //console.log()
                    let filesUpdated = fs.writeFile('./allLocation.json', data, (err, fs)=> {
                        if(err) throw err;
                        //console.log('filesUpdated')
                    })

                    console.log("Location data length: ", allLocationData.length);
                    res.json({text: 'test'})
                    
                } else {
                    console.log("Error saveLocationHandler...");
                    //console.error
                }
            //}
        } catch(error){
            console.log(error.status)
        }
        next();
    }
}

