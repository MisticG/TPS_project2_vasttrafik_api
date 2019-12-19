import React, { Component, CSSProperties } from 'react';
import Autosuggest2 from './autoSuggestions/autoSuggestion2'
import Form from './forms/Form';
import axios from 'axios';
import Trip from './trips/trip';
import snowFall from './snowFall';

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
    trips:any,
    choosenVehicle:string[]
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
            trips:[],
            choosenVehicle:[]
        }
    }
   
    handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
       
        event.preventDefault();
        
        if( this.state.choosenStart.name !== '' && this.state.chooosenEnd.name !== '' && this.state.text.substring(2,3) === ":") {

            this.searchTrip()
        } else {
            alert('Du behöver fylla i fler uppgifter.')
        }
    }

    searchTrip = async ()=> {
        let isDepOrArrTime = this.state.ankAvg === 'arraivle'?1:0;
        let choosenVehicleTypes = this.state.choosenVehicle;
        let data = {
            originId:this.state.choosenStart.id,
            destId:this.state.chooosenEnd.id,
            date:this.state.date,
            time:this.state.text,
            isDepOrArrTime:isDepOrArrTime,

            useTram:choosenVehicleTypes.indexOf('Spårvagn') !== -1?1:0,
            useBoat:choosenVehicleTypes.indexOf('Båt') !== -1 ? 1:0,
            useBus:choosenVehicleTypes.indexOf('Buss') !== -1 ? 1:0,
            useElse:choosenVehicleTypes.indexOf('Övriga tåg') !== -1 ? 1:0,
            useVas:choosenVehicleTypes.indexOf('Västtåg') !== -1 ? 1:0
        }

        try {
            
            let response = await axios.post('/searchTrip', data);

            let actuallResponse = await response.data;
            response.status === 200 && actuallResponse.length > 0 ? await this.setState({trips:actuallResponse, choosenVehicle:[]},()=>alert('It takes time to update!')):this.setState({trips:[]},()=>{alert('Hittar ingen resa')});
    
            console.log(actuallResponse, 'here is from axios')
        } catch(error) {

            alert('Couldnt deliver request searchTrip')
            /* 
            om man gör flera vehicke type visa den som hittas och aler för den som inte finns
            
            */
            
            console.log('Could not search current trip', error)
        }
    }

    handleOnchange = ( event: React.ChangeEvent<HTMLInputElement>) => { this.setState({[event.target.type]:event.target.value} as Pick<State, any>) }
 
    handleSelect = (event: any) => { this.setState({ankAvg:event.target.value}) }

    getStartValue = (value:{name: string, id: number, lat: number, lon: number,weight: number,track: string})=>{
        
        this.setState({choosenStart: value})
    }
    getEndValue = (value:{name: string, id: number, lat: number, lon: number,weight: number,track: string})=>{
        
        this.setState({chooosenEnd:value})
    }
   
    choosenVehicleType = (choosen:string)=>{
        let choosenVehicles = this.state.choosenVehicle;

        choosenVehicles.push(choosen);
        this.setState({choosenVehicle:choosenVehicles}, ()=>{alert(`Du valde ${choosen}`)})

    }

    renderFiltering = () => {
        let filters = ['Spårvagn', 'Buss', 'Båt','Västtåg', 'Övriga tåg'];
        return filters.map((filter)=>{
            return<li style={filterItemStyle}><button className="btn btn-info" onClick={()=>this.choosenVehicleType(filter)}>{filter}</button></li> 
        })
    }

    render() {
        console.log('holla')
        return (
            <div className="container-fluid">
                {snowFall()}
                <div style={style}>
                    <h5 style={{marginLeft: "1.5em"}}>Välj transportmedel (valfritt): </h5>
                    {/*flytta inte ul this.renderfiltreting*/}
                    <ul style={filterStyle}> {this.renderFiltering()} </ul>
                    <div className="container">
                        <Form>
                            <form onSubmit={this.handleSubmit}>
                                <Autosuggest2 placeholder={'Från'} value={this.state.start} onChange={this.getStartValue} type={'start'}/><br />
                                <Autosuggest2 placeholder={'Till'} value={this.state.end} onChange={this.getEndValue} type={'end'}/><br/>

                                <label>Datum: <input type="date" value={this.state.date} onChange={this.handleOnchange} required/></label> <br/>
                                {/* Since type date only has 0-12andpm/am option and we need time like 13:00 exc.So we use text type instead */}
                                <label>Tid: HH:MM <input type="text" value={this.state.text} onChange={this.handleOnchange} required maxLength={5}/></label>
                                <select value={this.state.ankAvg} onChange={this.handleSelect}>
                                    <option defaultChecked value='departure'>Avgående</option>
                                    <option value={'arraivle'}>Ankommande</option>
                                </select>
                                <ul>
                            
                                </ul>
                                <input type="submit" value="Sök resa" />
                            </form>
                        </Form>
                    
                    </div>
                <Trip trips={this.state.trips}/>
                </div> 
            </div>
        )
    }
}



const style:CSSProperties = {
    display:"flex",
    flexDirection:"column",
    alignItems:'left',
    marginTop: '4em'
}

const formStyle:CSSProperties = {
    display: 'flex',
    marginTop: '1em',
    alignItems:'center',
}


const filterStyle:CSSProperties = {
    display:"flex",
    flexDirection:"row",
 
    //justifyItems:"space-between"
}

const filterItemStyle:CSSProperties = {
    listStyleType:'none',
    padding:"2em"
}