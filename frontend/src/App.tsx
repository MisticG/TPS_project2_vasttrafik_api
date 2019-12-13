import React, { Component, CSSProperties } from 'react';
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

    getStartValue = (value:string)=>{
        console.log(value, 'here is valuehhahahah start')
       
    }
    getEndValue = (value:string)=>{
        console.log(value, 'here is end value')
     
    }
  
    render() {
        return (<div style={formStyle}>
                <span>It my take 5 seconds...</span>
                <Autosuggest2 placeholder={'Från'} value={this.state.start} onChange={this.getStartValue} type={'start'}/><br />
                <Autosuggest2 placeholder={'Till'} value={this.state.end} onChange={this.getEndValue} type={'end'}/>
                </div> 
)
    }
}

const formStyle:CSSProperties = {
    display:"flex",
    flexDirection:"column",
    alignItems:'center'
}