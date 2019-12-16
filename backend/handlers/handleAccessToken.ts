import {keys} from './keys';
import axios from 'axios';
import * as express from 'express';
import * as moment from 'moment';

let token:string = '';
let tokenTimeExpires:number = null;
let nowDate = new Date();
let now = moment(nowDate, 'YYYY-MM-DD[T]HH:mm[Z]');

 
export const handleAccesstoken = {
    

    formHandler: async (req:express.Request, res:express.Response, next:express.NextFunction) =>{
        let tokenTime = now.add(tokenTimeExpires, 'seconds');
        
        let diff = tokenTime.isAfter(nowDate); 
        if( token === '' && diff === false) {
           
            let url = "https://api.vasttrafik.se/token";
            let response = await axios.request({ method:'post',url: url,headers: {'Content-Type': 'application/x-www-form-urlencoded'},data:`grant_type=client_credentials&client_id=${keys.key}&client_secret=${keys.secret}`});
            let resAc = response.data;
            token = response.data.access_token;
            tokenTimeExpires =  response.data.expires_in;
            console.log(token, 'new');
            res.locals.token
        } else {  
            res.locals.token = token
         
        }
        console.log(tokenTimeExpires, 'Expires times')
        console.log(diff, 'isAfter')
        console.log(now.format('YYYY-MM-DD[T]HH:mm[Z]'), 'now');
        console.log(token, 'token')
        
        next()
    }, handleError:(error:express.ErrorRequestHandler, req:express.Request, res:express.Response, next:express.NextFunction)=>{
        if (error) {
            return next(error)
          }
          res.status(500)
          res.render('error on server token', { error: error })
    }

}

