import React, { Component } from 'react';

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

    renderStopStations = ()=> {
      // 5 9 något som är större än 5 men mindre eller lika med 9

        return this.props.stopStations.filter((station:{ depDate:string, depTime: string, id: string, lat: string,lon: string,name: string,routeIdx: string,track:string})=>{

            if(Number(station.routeIdx) >= Number(this.props.originIdx) && Number(station.routeIdx) <= Number(this.props.destIdx)) {
                return station
            }
        }).map((station:{ depDate:string, depTime: string, id: string, lat: string,lon: string,name: string,routeIdx: string,track:string})=>{
            if(station.name !== '') {

                return <li>Hållplats: {station.name }  AvgTid: {station.depTime}</li>
            }

        })
    }
           
  
    render() {
       
        return<ul style={{listStyle: "none"}}>
            {this.renderStopStations()}
        </ul>

        
    }
}
