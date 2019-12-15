import React, { Component, CSSProperties } from 'react';
import Autosuggest2 from './autoSuggestions/autoSuggestion2'
import Form from './forms/Form';
import axios from 'axios';
import Trip from './trips/trip';
interface location {
    name: string;
    id: number;
    lat: number;
    lon: number;
    weight: number;
    track: string;
}

interface State {
    start:string,
    end:string,
    date:string,
    choosenStart:location,
    chooosenEnd:location,
    ankAvg:string,
    text:string,
    trips:any

   
}

interface Props {}
export default class App extends Component<Props, State> {
    constructor(props:Props){
        super(props);
        this.state = {
            start:'',
            end:'',
            date:'',
            ankAvg:'',
            choosenStart:{name:'', id:0, lat:0, lon:0, weight:0, track:''},
            chooosenEnd:{name:'', id:0, lat:0, lon:0, weight:0, track:''},
            text:'',
            trips:[]
            
        }
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
      
        event.preventDefault();
        
        if( this.state.choosenStart.name !== '' && this.state.chooosenEnd .name !== '' && this.state.text.substring(2,3) === ":") {

            this.searchTrip()
        } else {
            alert('Fyll alla inputs eller du har fyllt fel uppgifter.')
        }
      
    }

    searchTrip = async ()=> {
        let isDepOrArrTime = this.state.ankAvg === 'arraivle'?1:0;
        let data = 
        {originId:this.state.choosenStart.id,
        destId:this.state.chooosenEnd.id,
        date:this.state.date,
        time:this.state.text,
        isDepOrArrTime:isDepOrArrTime
        }
        try {
            
            let response = await axios.post('/searchTrip', data);

            let actuallResponse = await response.data;
            response.status === 200 ? this.setState({trips:actuallResponse}): this.setState({trips:[]});
    
            console.log(actuallResponse, 'here is from axios')
        }catch(error){
            
            console.log('Could not search current trip')
        }
    }

    handleOnchange= ( event: React.ChangeEvent<HTMLInputElement>) => { this.setState({[event.target.type]:event.target.value} as Pick<State, any>) }

    handleSelect = (event: any) => { this.setState({ankAvg:event.target.value}) }

    getStartValue = (value:{name: string, id: number, lat: number, lon: number,weight: number,track: string})=>{
        
        this.setState({choosenStart: value})
    }
    getEndValue = (value:{name: string, id: number, lat: number, lon: number,weight: number,track: string})=>{
        
        this.setState({chooosenEnd:value})
    }
    renderTrips = ()=>{
        if(this.state.trips.length > 0){
            console.log(this.state.trips, 'here is trips')
            return <Trip trips={this.state.trips}/>
        } else {
            return ''
        }

    }
  

    render() {
        return (
        <div style={formStyle}>

            <span>It my take 5 seconds... before loading result</span>
            <Form> 
            <form onSubmit={this.handleSubmit} style={formStyle}>
                <Autosuggest2 placeholder={'Från'} value={this.state.start} onChange={this.getStartValue} type={'start'}/><br />
                <Autosuggest2 placeholder={'Till'} value={this.state.end} onChange={this.getEndValue} type={'end'}/><br/>

               <label>Datum: <input type="date" value={this.state.date} onChange={this.handleOnchange} required/></label> <br/>
               {/* Since type date only has 0-12andpm/am option and we need time like 13:00 exc.So we use text type instead */}
                <label>Tid: ex 14:00 <input type="text" value={this.state.text} onChange={this.handleOnchange} required maxLength={5}/></label>
                <select value={this.state.ankAvg} onChange={this.handleSelect}>
                    <option defaultChecked value='departure'>Avgående</option>
                    <option value={'arraivle'}>Akommande</option>
                </select>
                
                <input type="submit" value="Söka" />
            </form>
           </Form>
            {this.renderTrips()}
        </div> 
)
    }
}

const formStyle:CSSProperties = {
    display:"flex",
    flexDirection:"column",
    alignItems:'center'
}