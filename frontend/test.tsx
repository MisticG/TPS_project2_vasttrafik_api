import React, { Component, CSSProperties } from 'react';
//import Form from './forms/Form';
import axios from 'axios';
import Select from 'react-select';
//import AutoSeggestion from './autoSuggestions/autoSuggestion';
interface location {
    name: string;
    id: number;
    lat: number;
    lon: number;
    weight: number;
    track: string;
}
interface option {
    value:'',
    label:''
}
interface State {
    start:string,
    end:string,
    avgande:string,
    ankommande:string,
    locations:location[],
    options:option[],
    test:number
   
}

interface Props {

}
class Test extends Component<Props, State> {
    private timer: any;
    constructor(props:Props){
        super(props);
        this.state = {
            start:'',
            end:'',
            avgande:'',
            ankommande:'',
            locations:[{name:'', id:0, lat:0, lon:0, weight:0, track:''}],
            options:[{value:'',label:''}],
            test:1000
        }
    }

   handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    console.log(this.timer)
    clearInterval(this.timer)
 
    //this.searchForSelectedDestination()
   }

   searchForSelectedDestination = async ()=> {
    let response = await axios.post('/searchJourny', {start:this.state.start, end:this.state.end});
    let actuallResponse = await response;
    console.log(actuallResponse)
   }
  

   componentDidMount(){
    this.getAllStops()
   }
    //Get all allstops from vasttrafik api location/allStops
    getAllStops = async () => {
        let response = await axios.get('/locations');
        let acResponse = await response.data
        this.setState({locations:acResponse}, ()=>{console.log(this.state.locations.length, 'length all stops')})
      
    }
    //Set value from auto sugggestion
    getValueFromAutoSuggestion = (data: { value: string, label: string }) => {
        this.setState({start:data.value},()=>console.log(this.state));
        
    }
    //Display autosuggestion component 
    displayAutoSuggestion = () => {
    
       /*  if (this.state.options.length> 1) {
            return <AutoSeggestion getvalue={this.getValueFromAutoSuggestion} options={this.state.options} />
        } */
    }

    //Handle onchange and start interval for getting exact location
    handleOnchange  = ( event: React.ChangeEvent<HTMLInputElement>) => {

    this.setState({start:event.target.value},()=> { this.timer = setInterval( () => this.startAuto(), 4000)})
       console.log(this.timer)
    }
    startAuto = ()=> {
        
        let options:any = this.state.locations.filter((location: {name: string,id: number,lat: number, lon: number,weight: number,track: string}) =>
            (location.name.toLowerCase()).search(this.state.start.toLowerCase()) !== -1 
        ).map((location) => { return {value:location.name, label:location.name}})
        
        this.setState({options:options})

    }
   

    //Cleare interval
    componentWillUnmount(){
     
        clearInterval(this.timer)
    }

    componentDidUpdate(prevProps:any, prevState:any) {
        if (prevState.test!== this.state.test) {
          clearInterval(this.timer);
          this.timer = setInterval(this.startAuto, this.state.test);
        }
      }

    stop = ()=>{
        console.log('ver stopped')
        clearInterval(this.timer);
    }

    render() {

        return (<div>
            <h1>Sök din resa här!</h1>
            {/* <Form> */}
            <form onSubmit={this.handleSubmit} style={formStyle}>
            <label>
                Från:
                    <input type="text"  name="start"  value={this.state.start} onChange={this.handleOnchange} required/>
            </label>
            {this.displayAutoSuggestion()}
               
                <input type="submit" value="Söka" />
                <button onClick={this.stop}>stop here</button>
            </form>

           {/*  </Form> */}
        </div> 
)
    }
}


/* 

 <label>
                Til:
                    <input type="text" name="end" onChange={this.handleOnchange} required/>
                </label>
        
                <label>
                Avgående tid:
                    <input type="text" name="avgande" onChange={this.handleOnchange} required/>
                </label>
                <label>
                Ankommande tid:
                    <input type="text" name="ankommande" onChange={this.handleOnchange} required/>
                </label>



*/

const formStyle:CSSProperties = {
    display:"flex",
    flexDirection:"column",
    alignItems:'center'
}