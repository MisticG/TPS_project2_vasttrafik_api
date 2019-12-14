import React, { Component, CSSProperties } from 'react';
import axios from 'axios';
import TripDetail from '../tripDetails/tripDetail'
interface State {
 
   
}

interface Props {
    trips:any
}
export default class Trip extends Component<Props, State> {

    
    sendRef = async (ref:string)=>{
        
        let data = {
            ref: ref
        }
        console.log(ref)
        console.log(data)
        try {
            let response = await axios.post('/getTripDetail', data);

            let actuallResponse = await response.data;
            console.log(actuallResponse, 'here is trip detail')
        } catch(error) {
            
            console.log('Could not get trip details')
        }
        
    }
    

   
    renderTrips = ()=>{
        return this.props.trips.map((trip:any)=>{
            let test = trip.Leg.map((leg:any)=>{
            
                if(leg.type !== "WALK") {

                return <ul> 

                            <li> Läge A   Namn: {leg.name} {leg.Origin.name } Tid: {leg.Origin.time}</li>
                            <li> Läge B   Namn: {leg.name} {leg.Destination.name } Tid: {leg.Destination.time}</li>
                         
                            <button onClick={()=> this.sendRef(leg.JourneyDetailRef.ref)}>Visa Alla Hållplatser</button>
                            
                        </ul>
                } else {
                    return <ul> 

                            <li> Läge A   Namn: {leg.Origin.name } Tid: {leg.Origin.time}</li>
                            <li> Läge B   Namn: {leg.name} {leg.Destination.name } Tid: {leg.Destination.time}</li>
                        </ul>
                }
                    

            })
        return <div style={tripContainer}> Here is one trip: {test}</div>
        })

    }
    
    render() {
      
        return <div>
            {this.renderTrips()}
        </div>

        
    }
}

const tripContainer:CSSProperties = {
    backgroundColor:"#e9e9f5"
}
