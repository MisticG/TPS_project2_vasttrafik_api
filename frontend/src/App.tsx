import React, { Component, CSSProperties } from 'react';
import Form from './forms/Form';
import axios from 'axios';
import Select from 'react-select';
import AutoSeggestion from './autoSuggestions/autoSuggestion';
import Autosuggest2 from './autoSuggestions/autoSuggestion2'
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
export default class App extends Component<Props, State> {


   componentDidMount(){
    this.getAllStops()
   }
    //Get all allstops from vasttrafik api location/allStops
    getAllStops = async () => {
        let response = await axios.get('/locations');
        let acResponse = await response.data
        this.setState({locations:acResponse}, ()=>{console.log(this.state.locations.length, 'length all stops')})
      
    }


    render() {

        return (<div>
            <Autosuggest2 />
        </div> 
)
    }
}
