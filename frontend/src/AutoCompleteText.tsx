import React, { Component } from 'react';
import InputForm from './InputForm';


interface State {
    items:string
};

class AutoCompleteText extends Component{

    
    constructor(props:any){
        super(props);
        this.state= {
           name: 'Davide',
        };
    }

    render(){
        return(
            <div>
                <InputForm/>
            </div>
        )

    }
}

export default AutoCompleteText;