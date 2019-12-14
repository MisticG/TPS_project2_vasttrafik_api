import React, { Component, CSSProperties } from 'react';
import axios from 'axios';

interface State {
 

   
}

interface Props {
   ref:string
}
export default class TripDetail extends Component<Props, State> {
    constructor(props:Props){
        super(props);
        
    }
    getTripDetail = async ()=>{
        
        let data = {
            ref: this.props.ref
        }
        console.log(this.props.ref)
        console.log(data)
        try {
            let response = await axios.post('/getTripDetail', data);

            let actuallResponse = await response.data;
            console.log(actuallResponse, 'here is trip detail')
        } catch(error) {
            
            console.log('Could not get trip details')
        }
    }

    renderTripDetail = ()=> {
        console.log(this.props.ref)
        return ''
    }
    render() {
       
        return <div>
            <button onClick={ this.getTripDetail}>Visa Alla hållplatser</button>
        </div>

        
    }
}

const tripContainer:CSSProperties = {
    backgroundColor:"#e9e9f5"
}
