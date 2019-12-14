import React, { Component, CSSProperties } from 'react';
import axios from 'axios';

interface State {
 
   
}

interface Props {
    trips:any
}
export default class Trip extends Component<Props, State> {


    ShowStopStation = (href:string)=>{
        console.log(href)

    }
   
    renderTrips = ()=>{
        return this.props.trips.map((trip:any)=>{
            let test = trip.Leg.map((leg:any)=>{
            
                if(leg.type !== "WALK") {

                return <ul> 

                            <li> Läge A   Namn: {leg.name} {leg.Origin.name } Tid: {leg.Origin.time}</li>
                            <li> Läge B   Namn: {leg.name} {leg.Destination.name } Tid: {leg.Destination.time}</li>
                            <button onClick={()=> this.ShowStopStation(leg.JourneyDetailRef.ref)}>Visa Alla Hållplatser</button>
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
        console.log(this.props.trips)
        return <div>
            {this.renderTrips()}
        </div>

        
    }
}

const tripContainer:CSSProperties = {
    backgroundColor:"#e9e9f5"
}
