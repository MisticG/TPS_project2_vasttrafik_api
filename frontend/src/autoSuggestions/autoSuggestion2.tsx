import Autosuggest from 'react-autosuggest';
import React, { Component, CSSProperties } from 'react';
import axios from 'axios';
interface State{
    value:string,
    suggestions:any,
    locations:any
}
interface Props{

}

  
  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion:any) => suggestion.value;
  

  const renderSuggestion = (suggestion:any) => (
    <ul>
      <li>{suggestion.value}</li>
    </ul>
  );




export default class Autosuggest2 extends React.Component<Props,State> {
  constructor(props:Props) {
    super(props)
    this.state = {
        value: '',
        suggestions:[],
        locations:[]
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
    
    getSuggestions = (value:string)=>{
       
        let options:any = this.state.locations.filter((location: {name: string,id: number,lat: number, lon: number,weight: number,track: string}) =>
            (location.name.toLowerCase()).search(value.toLowerCase()) !== -1 
        ).map((location:any) => { return {value:location.name, label:location.name}})


   
        return options
    }

    onChange = (event:any, { newValue }:any) => {
        this.setState({
          value: newValue
        });
      };

      onSuggestionsFetchRequested = ({ value }:any) => {
          let data =   this.getSuggestions(value)
          if(data.length > 0 ){

              this.setState({ suggestions:data });
          }
      };
     
      onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };
      

      render() {

        const { value, suggestions } = this.state;
        

    // Autosuggest will pass through all these props to the input.
        const inputProps = {
        placeholder: 'Från ',
        value,
        onChange: this.onChange
        };

        return (<div>


      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={ async (value:any)=>{
            if(!value){
                this.setState({suggestions:[]})
            }
            let options:any = this.state.locations.filter((location: {name: string,id: number,lat: number, lon: number,weight: number,track: string}) =>
            (location.name.toLowerCase()).search(value.value.toLowerCase()) !== -1 
            ).map((location:any) => { return {value:location.name, label:location.name}})
            console.log(options)
            this.setState({suggestions:options})
        }   
        }
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
        </div> 
            )}

}
