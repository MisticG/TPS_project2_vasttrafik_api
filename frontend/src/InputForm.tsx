import React, { Component } from 'react';

interface state {
  value:string
}

export default class InputForm extends React.Component<{}, state> {
  constructor(props:any) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event:any) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event:any) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }



  render() {

    return (
      <div className="card card-body mb-4 p-4">
        <h1 className= "display-4 text-center">Välkommen Till Västtrafik</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
            className="form-control form-control-lg mb-4"
            placeholder="From:" 
            type="text" value={this.state.value} onChange={this.handleChange} 
            />
        
            <input
            className="form-control form-control-lg mb-4"
            placeholder="To:"  
            type="text" value={this.state.value} onChange={this.handleChange} 
            />

            <button
              className="btn btn-primary btn-lg btn-block mb-5"
              type="submit"
            >
              Find Your Trip
            </button>
          </div>
        </form>
        
      </div>
    );
  }
}