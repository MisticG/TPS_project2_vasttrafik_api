import {keys} from './keys';
import axios from 'axios';
import * as moment from 'moment';
//since token could be at first moment we leave it as any as it is
let token_time: any;
let expires_in:number;
let token: string;

export default async function handleToken () {
  
    token_time = moment();
    token_time.add(expires_in, 'seconds');
    let token_time_format = token_time.format('YYYY-MM-DD[T]HH:mm:ss[Z]')
    let now = moment();
    let nowFm = now.format('YYYY-MM-DD[T]HH:mm:ss[Z]')
    let difference = moment(nowFm).isAfter(token_time_format);
    console.log(difference, 'dif')
    console.log(token_time_format, 'token time');
    console.log(nowFm, 'now')
    //as long as token time is in the future we update the time.
    if(!difference) {

        let url = "https://api.vasttrafik.se/token";
        let response = await axios.request({ method:'post',url: url,headers: {'Content-Type': 'application/x-www-form-urlencoded'},data:`grant_type=client_credentials&client_id=${keys.key}&client_secret=${keys.secret}`});
    
        token = response.data.access_token;
        expires_in = response.data.expires_in;
        console.log(expires_in, 'here is current expires_in')
        console.log(token, 'here is token ')

        return token;
    }
   /*  console.log(expires_in)
    return token */
            
        
}
   


