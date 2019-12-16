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
      // 5 9 något som är större än 5 men mindre eller lika med 9

        let data =  this.props.stopStations.filter((station:{ depDate:string, depTime: string, id: string, lat: string,lon: string,name: string,routeIdx: string,track:string})=>{

            if(Number(station.routeIdx) >= Number(this.props.originIdx) && Number(station.routeIdx) <= Number(this.props.destIdx)) {
                return station
            }
        }).map((station:{ depDate:string, depTime: string, id: string, lat: string,lon: string,name: string,routeIdx: string,track:string})=>{
        return <li>Station Namn: {station.name}  AvgTid: {station.depTime}</li>

        })
        console.log(this.props.stopStations, 'all data here', this.props.originIdx,this.props.destIdx )
        console.log(data, 'here from detaillll')
        return data
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
