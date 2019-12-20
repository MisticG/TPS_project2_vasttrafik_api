import React, { Component } from 'react';
import Framework7React from 'framework7-react';

//Skapa en form med två input - en "från" och en "till". Värdena ska skickas till backend.

//Det ska vara möjligt att kunna se värdena som man har skickat från frontend till index.ts(backend) via console.log i backend.

 class InputForm extends Component {

  state ={
    fromInput:'',
    toInput:''

  };

  componentDidMount(){
        
    this.$f7ready((app)=>{

        var autocomplete = app.autocomplete.create({

            
            inputEl: '#searchFeild',
            openIn: 'dropdown',
            source: function (query, render) {
                console.log(query);
        
            }
          });
    });
}

/*   findTrip = (e:any) =>{
    e.preventDefault();

    const payload = {
      to: this.state.toInput,
      from: this.state.fromInput
    }

    fetch('SOME URL', {
      body: JSON.stringify(payload)
    })

  /*   axios
    .get(`http:apikey.InputF`)
    .then(res=>{
      //console.log(res.data);
      this.setState({trip_list: res.data.message.body.trip_list});
    })
    .catch(err => console.log(err)); 
  } */

  onChange = (e:any) =>{
    this.setState({[e.target.name]: e.target.value});
  }

  render() {

    return (
      <div className="card card-body mb-4 p-4">
        <h1 className= "display-4 text-center">Välkommen Till Västtrafik</h1>
        <form /* onSubmit={this.findTrip} */>
          <div className="form-group">
            <input
            type="text"
            id="searchFeild"
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