import React, { Component, CSSProperties } from 'react';
import Form from './forms/Form';
import axios from 'axios';
import Select from 'react-select';
import AutoSeggestion from './autoSuggestions/autoSuggestion';
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
    avgande:string,
    ankommande:string,
    locations:location[],
    options:string[]
   
}

interface Props {

}
export default class App extends Component<Props, State> {
    private timer: any;
    constructor(props:Props){
        super(props);
        this.state = {
            start:'',
            end:'',
            avgande:'',
            ankommande:'',
            locations:[{name:'', id:0, lat:0, lon:0, weight:0, track:''}],
            options:[]
        }
    }

   handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
 
    this.searchForSelectedDestination()
   }

   searchForSelectedDestination = async ()=> {
    let response = await axios.post('/searchJourny', {start:this.state.start, end:this.state.end});
    let actuallResponse = await response;
    console.log(actuallResponse)
   }
  

   componentDidMount(){
    this.getAllLocations()
   }
    //Get all allstops from vasttrafik
    getAllLocations = async ()=>{
        let response = await axios.get('/locations');
        let acResponse = await response.data
        this.setState({locations:acResponse}, ()=>{console.log(this.state.locations.length, 'length all stops')})
    }
    //Set value from auto sugggestion
    getValueFromAutoSuggestion = (data: { value: string, label: string }) => {
        this.setState({start:data.value})
    }
    //DisplayInterval
    displayAutoSuggestion = () => {
    
        if (this.state.start !== '' && this.state.options.length >0 ) {
            return <AutoSeggestion getvalue={this.getValueFromAutoSuggestion} options={this.state.options}/>
        }
    }

    //Handle onchange and start interval
    handleOnchange  = ( event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({start:event.target.value},
        ()=>{
            this.timer = setInterval(
                () => this.startAuto(),
                2000);
        }
        )

    };
    startAuto = ()=>{
        
      
    let options = this.state.locations.filter((location:any) =>
        (location.name.toLowerCase()).search(this.state.start.toLowerCase()) !== -1 
    ).map((location) => location.name)
    
    console.log(options.length, 'here is options length')
    this.setState({options:options},()=>{console.log(this.state.options)})

    }
   

    //Cleare interval
    componentWillUnmount(){
        clearInterval(this.timer)
    }


    render() {
       //const { selectedOption } = this.state.start;
        return (<div>
            <h1>Sök din resa här!</h1>
            <Form>
            <form onSubmit={this.handleSubmit} style={formStyle}>
            <label>
                Från:
                    <input type="text" name="start" onChange={this.handleOnchange} required/>
                </label>
               
                <input type="submit" value="Söka" />
            </form>

            </Form>
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