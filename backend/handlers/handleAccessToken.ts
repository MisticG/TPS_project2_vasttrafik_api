import {keys} from './keys';
import axios from 'axios';
import * as express from 'express';
import* as  moment from 'moment';

let token:string = '';
export const handleAccesstoken = {
    

    formHandler: async (req:express.Request, res:express.Response, next:express.NextFunction) =>{
        if(token == '') {

            let url = "https://api.vasttrafik.se/token";
            let response = await axios.request({ method:'post',url: url,headers: {'Content-Type': 'application/x-www-form-urlencoded'},data:`grant_type=client_credentials&client_id=${keys.key}&client_secret=${keys.secret}`});
            let resAc = response.data;
            token = response.data.access_token;
            console.log(token, 'is getting new fot the first time')
        } else {
            console.log(token , 'token exist')
        }
        console.log(token, 'here')
        res.locals.token = token
      next()
    }

}