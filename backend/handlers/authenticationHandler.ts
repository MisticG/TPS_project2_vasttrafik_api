import {keys} from './keys';

import axios from 'axios';

import * as moment from 'moment';

let time: any;

export default async function handleToken () {

    let nowDate = new Date();
    let now = moment(nowDate, 'YYYY-MM-DD[T]HH:mm:ss[Z]');

    time === undefined || time === null ? now:time;    

    let url = "https://api.vasttrafik.se/token";

    let response = await axios.request({ method:'post',url: url,headers: {'Content-Type': 'application/x-www-form-urlencoded'},data:`grant_type=client_credentials&client_id=${keys.key}&client_secret=${keys.secret}`});

    let token = response.data.access_token;

    let expires_in = response.data.expires_in;

    time = now.add(expires_in, 'seconds');

    console.log(expires_in,'here is time');

    console.log(token)

    return token;

}

