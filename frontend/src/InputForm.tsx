import React, { Component } from 'react';


 class InputForm extends Component {

  state ={
    fromInput:'',
    toInput:''

  };

  onChange = (e:any) =>{
    this.setState({fromInput: e.target.value});
    this.setState({toInput: e.target.value});
  }

/*     this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event:any) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event:any) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  } */



  render() {

    return (
      <div className="card card-body mb-4 p-4">
        <h1 className= "display-4 text-center">Välkommen Till Västtrafik</h1>
        <form>
          <div className="form-group">
            <input
            type="text"
            className="form-control form-control-lg mb-4"
            placeholder="From:"
            name="fromInput"
            value={this.state.fromInput}
            onChange={this.onChange}  
            />
        
            <input
            type="text"
            className="form-control form-control-lg mb-4"
            placeholder="To:"
            name="toInput"
            value={this.state.toInput}
            onChange={this.onChange} 
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

export default InputForm;