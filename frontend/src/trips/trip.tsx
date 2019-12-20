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
    componentWillReceiveProps(){
        this.renderTrips()
    }
    renderStopStations = ()=>{ 
        //Since we one empty station item at begining 
        if(this.state.stopStations.length > 0 ) {
          
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
        if(this.props.trips.length > 0 ) {

            return this.props.trips.map((trip:any, index:number)=>{
        
                if(Array.isArray(trip.Leg)){
                   
                    let test = trip.Leg.map((leg:any, i:number)=>{
                        
                    
                        if(leg.type !== "WALK") {
        
                        return <ul style={{listStyle: "none"}}> 
        
                            <li> Från hållplats: {leg.name} {leg.Origin.name } Tid: {leg.Origin.time}</li>
                            <li> Till hållplats: {leg.name} {leg.Destination.name } Tid: {leg.Destination.time}</li>

                            <button style={{marginTop: "1em", marginRight: "1em"}} className="btn btn-warning" onClick={()=> this.getTrafikInfo(leg.Origin.id, leg.Origin.date, leg.Origin.time, leg.journeyNumber)}>Har den föresning?</button>
                            
                            <button style={{marginTop: "1em"}} className="btn btn-warning" onClick={()=> this.sendRef(
                                leg.JourneyDetailRef.ref, leg.Origin.routeIdx,leg.Destination.routeIdx, index,i


                                    
                                    )}>Visa Alla Hållplatser</button>
                            
                            { this.state.tripI === index && this.state.legI === i ? this.renderStopStations():''}
                                  
                                    
                                </ul>
                        } else {
                            return <ul style={{listStyle: "none"}}> 
        
                                    <li> 🏃‍♀️ {leg.name} {leg.Origin.name } Tid: {leg.Origin.time}</li>
                                    <li> 🧍‍♀️ {leg.name} {leg.Destination.name } Tid: {leg.Destination.time}</li>
                                </ul>
                        }
                            
        
                    })
                    return <div style={tripContainer}> <h3> Din sökta resa: </h3> {test} </div>
                } else {


                    if(trip.type !== "WALK") {
        
                        return <div style={tripContainer}>
                                 <ul style={{listStyle: "none", padding: "1em"}}> 
        
                                    <li> Från hållplats: {trip.Leg.name} {trip.Leg.Origin.name } Tid: {trip.Leg.Origin.time}</li>
                                    <li> Till hållplats: {trip.Leg.name} {trip.Leg.Destination.name } Tid: {trip.Leg.Destination.time}</li>
    
                                    <button style={{marginTop: "1em", marginRight: "1em"}}className="btn btn-warning" onClick={()=> this.getTrafikInfo(trip.Leg.Origin.id, trip.Leg.Origin.date, trip.Leg.Origin.time, trip.Leg.journeyNumber)}>Är den försenad?</button>
                                   
                                    <button style={{marginTop: "1em"}} className="btn btn-warning" onClick={()=> this.sendRef(
                                       trip.Leg.JourneyDetailRef.ref, trip.Leg.Origin.routeIdx,trip.Leg.Destination.routeIdx, index,index
                                         
                                        )}>Visa hållplatser</button>
                                    
                                    { this.state.tripI === index && this.state.legI === index ? this.renderStopStations():''}
                                  
                                    
                                </ul>
                                </div>
                        } else {

                            return <div style={tripContainer}>
                                    <ul style={{listStyle: "none"}}> 
            
                                        <li> 🏃‍♀️ {trip.Leg.name} {trip.Leg.Origin.name } Tid: {trip.Leg.Origin.time}</li>
                                        <li> 🧍‍♀️ {trip.Leg.name} {trip.Leg.Destination.name } Tid: {trip.Leg.Destination.time}</li>
                                    </ul>
                                </div>
                        }
                            
                }
            })

        }

    }
    
    render() {
      
        return <div>
            {this.renderTrips()}
        </div>

        
    }
}

const tripContainer:CSSProperties = {
    width: "50%",
    backgroundColor:"#e9e9f5",
    padding: "1em",
    listStyle: "none",
    margin: "1em"
}
