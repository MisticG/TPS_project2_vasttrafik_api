import Autosuggest from 'react-autosuggest';
import React, { Component, CSSProperties } from 'react';
import axios from 'axios';
interface location {
  name: string;
  id: number;
  lat: number;
  lon: number;
  weight: number;
  track: string;
}


interface State{
    value:string,
    suggestions:any,
    locations:location[],
    type:string
}
interface Props{
  placeholder:string
  value:string,
  onChange:(value:{name: string, id: number, lat: number, lon: number,weight: number,track: string})=>void,
  type:string
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion:any) => suggestion;


const renderSuggestion = (suggestion:any) => (
    <div>
        {suggestion.name}
    </div>
  );

export default class Autosuggest2 extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
        value: this.props.value,
        suggestions:[],
        locations:[],
        type:this.props.type
      };
    }
    componentDidMount(){
        this.getAllStops()
       }
        //Get all allstops from vasttrafik api location/allStops
        getAllStops = async () => {
            try {

                let response = await axios.get('/locations');
                let acResponse = await response.data
                this.setState({locations:acResponse}, ()=>{console.log(this.state.locations.length, 'length all stops')})
            }catch(error){
                this.setState({locations:[]},()=>{console.log('something went wrong for fetting all stops')})
            }
          
        }
    
    getSuggestions = async (value:string)=>{
       
        let options:{name: string,id: number,lat: number, lon: number,weight: number,track: string}[] = await this.state.locations.filter((location: {name: string,id: number,lat: number, lon: number,weight: number,track: string}) =>
            (location.name.toLowerCase()).indexOf(value.toLowerCase()) !== -1 
        ).map((location:any) => { return location})


   
      return options
    }

    onChange = (event:React.ChangeEvent<HTMLInputElement>, { newValue }:any) => {
      let value =  typeof newValue === 'string' ? newValue = newValue: newValue.name
      
        this.setState({
          value: value
        },()=>{ this.props.onChange(newValue)});
      };

      onSuggestionsFetchRequested = async ({ value }:any) => {
          let data =  await  this.getSuggestions(value);
          this.setState({ suggestions:data });
        
          
      };
      rendIsLoading = ()=>{
        return this.state.suggestions.length < 0 ? 'Is loding ...': '';
      
      }
     
      onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };
     

      render() {

        const { value, suggestions} = this.state;
      
        

    // Autosuggest will pass through all these props to the input.
        const inputProps = {
        placeholder: this.props.placeholder,
        value,
        type:this.props.type,
        onChange: this.onChange
        };

        return (<div>

          {this.rendIsLoading()}
                          
      <Autosuggest
        suggestions={suggestions.slice(0, 7)}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />

    </div> 
  )}

}
