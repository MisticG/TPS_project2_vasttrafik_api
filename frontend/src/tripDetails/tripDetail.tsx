import React, { Component, CSSProperties } from 'react';
import axios from 'axios';


interface State {
  
}

interface stopStations {
    depDate:string, 
    depTime: string,
    id: string, 
    lat: string,
    lon: string,
    name: string,
    routeIdx: string,
    track:string,
  
}

interface Props{
    stopStations:stopStations[],
    originIdx:string,
    destIdx:string,
    flagg:boolean,
    trips:any
   
   
}

export default class TripDetail extends Component<Props, State> {
    constructor(props:Props){
        super(props);
        
    }

    renderStopStations = ()=> {
      

        return this.props.stopStations.filter((station:{ depDate:string, depTime: string, id: string, lat: string,lon: string,name: string,routeIdx: string,track:string})=>{

            if(station.routeIdx >= this.props.originIdx && station.routeIdx <= this.props.destIdx && this.props.flagg === true) {
                return station
            }
        }).map((station:{ depDate:string, depTime: string, id: string, lat: string,lon: string,name: string,routeIdx: string,track:string})=>{
        return <li>Station Namn: {station.name}  AvgTid: {station.depTime}</li>

        })
    }
           
  
    render() {
       
        return<ul>
            {this.renderStopStations()}
        </ul>

        
    }
}

const tripContainer:CSSProperties = {
    backgroundColor:"#e9e9f5"
}
