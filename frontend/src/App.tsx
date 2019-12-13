import React, { Component, CSSProperties } from 'react';
import Autosuggest2 from './autoSuggestions/autoSuggestion2'
import Form from './forms/Form';
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
    choosenStart:location,
    chooosenEnd:location

   
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
            choosenStart:{name:'', id:0, lat:0, lon:0, weight:0, track:''},
            chooosenEnd:{name:'', id:0, lat:0, lon:0, weight:0, track:''}
            
        }
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
      
     
        //this.searchForSelectedDestination()
    }

    handleOnchangeAvgande  = ( event: React.ChangeEvent<HTMLInputElement>) => { this.setState({avgande:event.target.value}) }

    handleOnchangeAnkommande  = ( event: React.ChangeEvent<HTMLInputElement>) => { this.setState({start:event.target.value}) }

    getStartValue = (value:{name: string, id: number, lat: number, lon: number,weight: number,track: string})=>{
        
        this.setState({choosenStart: value})
    }
    getEndValue = (value:{name: string, id: number, lat: number, lon: number,weight: number,track: string})=>{
        
        this.setState({chooosenEnd:value})
    }
  
    render() {
        return (<div style={formStyle}>
                <span>It my take 5 seconds... before loading result</span>
               
            <Form> 
            <form onSubmit={this.handleSubmit} style={formStyle}>
                <Autosuggest2 placeholder={'Från'} value={this.state.start} onChange={this.getStartValue} type={'start'}/><br />
                <Autosuggest2 placeholder={'Till'} value={this.state.end} onChange={this.getEndValue} type={'end'}/><br/>

               <label>Avgående tid: <input type="data" value={this.state.avgande} onChange={this.handleOnchangeAvgande}/></label> <br/>
                <label>Ankommande tid: <input type="data" value={this.state.ankommande} onChange={this.handleOnchangeAnkommande}/></label>
        
                <input type="submit" value="Söka" />
            </form>
           </Form>





                </div> 
)
    }
}

const formStyle:CSSProperties = {
    display:"flex",
    flexDirection:"column",
    alignItems:'center'
}