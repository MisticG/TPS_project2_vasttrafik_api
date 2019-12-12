import React, { Component, CSSProperties } from 'react';
import Form from './forms/Form';
import axios from 'axios'
interface State {
    start:string,
    end:string,
    avgande:string,
    ankommande:string
   
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
            ankommande:''
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
   handleOnchange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    this.setState({
        [event.target.name]:event.target.value
    } as Pick<State, any>)
   }

    render() {
        return (<div>
            <h1>Sök din resa här!</h1>
            <Form>
            <form onSubmit={this.handleSubmit} style={formStyle}>
                <label>
                Från:
                    <input type="text" name="start" onChange={this.handleOnchange} required/>
                </label>

                <label>
                Til:
                    <input type="text" name="end" onChange={this.handleOnchange} required/>
                </label>
                <input type="submit" value="Söka" />
                <label>
                Avgående tid:
                    <input type="text" name="avgande" onChange={this.handleOnchange} required/>
                </label>
                <label>
                Ankommande tid:
                    <input type="text" name="ankommande" onChange={this.handleOnchange} required/>
                </label>
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