import React, { Component, CSSProperties } from 'react';
import axios from 'axios';
import TripDetail from '../tripDetails/tripDetail'
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
interface trafik {
    id:string, 
    date:string,
    time:string,
    journeyNumber:string,
    lateTime:any
}
interface State {
    stopStations:stopStations[],
    originIdx:string,
    destIdx:string,
    flagg:boolean,
    tripI:number,
    legI:number
    trafikInfo:trafik
   
}

interface Props {
    trips:any
} 
export default class Trip extends Component<Props, State> {
    constructor(props:Props){
        super(props);
        this.state = {stopStations:[{ depDate:'', 
            depTime: '',
            id: '', 
            lat: '',
            lon: '',
            name: '',
            routeIdx: '',
            track:''}], originIdx:'',destIdx:'',
            flagg:false,
            tripI:0,
            legI:0,
            trafikInfo:{id:'', date:'', time:'', journeyNumber:'', lateTime:''}
        }
           
    }
    
    
    sendRef = async (ref:string, orginIdx:string, destIdx:string, legIndex:number, i:number)=> {
            console.log(legIndex, i, 'here are indexes')
        let data = {
            ref: ref
        }
     
        try {
            let response = await axios.post('/getTripDetail', data);

            let actuallResponse = await response.data;
        
                
            this.setState({stopStations:actuallResponse, originIdx:orginIdx, destIdx:destIdx, flagg:true, tripI:legIndex,legI:i})
            
        } catch(error) {
            alert('Could not get trip details');
            console.log(`Error: ${error}`)
        }

    }
    
    renderStopStations = ()=>{ 
        if(this.state.stopStations.length > 0 ) {
            console.log('vi sätter state here')
            return <TripDetail stopStations={this.state.stopStations} originIdx={this.state.originIdx} destIdx={this.state.destIdx} flagg={this.state.flagg} trips={this.props.trips}/>
        } else {
            return ''
        }
    }

    getTrafikInfo = async (id:string, date:string, time:string, journeyNumber:string)=> {
        let data = {
        id:id,
        date:date,
        time:time,
        journeyNumber:journeyNumber
        }
        
        try {
            let response = await axios.post('/getTrafikInfo', data);
            let actuallResponse = await response.data;
            console.log(actuallResponse, 'here is trafik info')
            if (actuallResponse.length > 0 ) {

                this.setState({
                    trafikInfo:{id:id, date:date, time:time, journeyNumber:journeyNumber, lateTime:actuallResponse[0].rtTime}
                },()=>{alert('NyTid: '+ this.state.trafikInfo.lateTime)})
            } else {

            alert('Hittar ingen Föresening!')
            }
            
            
        } catch(error) {
            alert('Could not get trafik info');
            console.log(`Error: ${error}`)
        }

    }
  

   
    renderTrips = ()=> {
     
        return this.props.trips.map((trip:any, index:number)=>{
         
            if(trip.Leg.length > 0 ){
              
                let test = trip.Leg.map((leg:any, i:number)=>{
                    
                
                    if(leg.type !== "WALK") {
    
                    return <ul> 
    
                                <li> Läge A   Namn: {leg.name} {leg.Origin.name } Tid: {leg.Origin.time}</li>
                                <li> Läge B   Namn: {leg.name} {leg.Destination.name } Tid: {leg.Destination.time}</li>

                                <button onClick={()=> this.getTrafikInfo(leg.Origin.id, leg.Origin.date, leg.Origin.time, leg.journeyNumber)}>Har den föresning?</button>
                               
                                <button onClick={()=> this.sendRef(
                                   leg.JourneyDetailRef.ref, leg.Origin.routeIdx,leg.Destination.routeIdx, index,i


                                     
                                     )}>Visa Alla Hållplatser</button>
                                
                                { this.state.tripI === index && this.state.legI === i ? this.renderStopStations():''}
                              
                                
                            </ul>
                    } else {
                        return <ul> 
    
                                <li> Läge A   Namn: {leg.name} {leg.Origin.name } Tid: {leg.Origin.time}</li>
                                <li> Läge B   Namn: {leg.name} {leg.Destination.name } Tid: {leg.Destination.time}</li>
                            </ul>
                    }
                        
    
                })
                return <div style={tripContainer}> Here is one trip: {test}</div>
            }
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
