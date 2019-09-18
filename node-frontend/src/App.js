import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
      dataku: [],
		};
	}

	klikPost(e){
    e.preventDefault();
    var url = 'http://localhost:4000/data';
    axios.post(url, {
      name: this.inputname.value,
      address: this.inputaddress.value,
      email: this.inputemail.value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.inputname.value = '';    
    this.inputaddress.value = '';
    this.inputemail.value = '';
  };

  
klikGet(e){
  e.preventDefault();
  var url = 'http://localhost:4000/data';
  axios.get(url)
  .then((ambilData) => {
    console.log(ambilData.data);
    this.setState({
      dataku: ambilData.data,
    }) 
  })
};

	render() {
    const dataMySQL = this.state.dataku.map((item, index)=>{
      var arrayku = ['Name: ',item.name,', Address: ', item.Usia, ' , Email: ', item.Usia].join(' ');
      return <p key={index}>{arrayku}</p>;
    })
		return (
      
			<div className="container">
		
        <center style={{margin:'25px'}}>
    
				<form>
					<div className="form-group" style={{margin:'15px'}}>
						NAME:<input className="form-control" type="text" id="name" 
						  	ref={ name => this.inputname = name }
                placeholder="Input name!"/>
					</div>

          <div className="form-group" style={{margin:'15px'}}>
						ADDRESS:<input className="form-control" type="text" id="name" 
						  	ref={ name => this.inputname = name }
                placeholder="Input address!"/>
					</div>

          <div className="form-group" style={{margin:'15px'}}>
						EMAIL:<input className="form-control" type="text" id="name" 
						  	ref={ name => this.inputname = name }
                placeholder="Input email!"/>
					</div>
					<br />
		
          <button className="btn btn-primary" style={{width:'100px'}}
          onClick={this.klikPost.bind(this)}>POST</button>

          <button className="btn btn-success" style={{margin:'15px',width:'100px'}}
           onClick={this.klikGet.bind(this)}>GET</button>

				</form>
					<hr />
          <div>
				  { dataMySQL }
     </div>
     </center>
   </div>
    );
    }
  }
export default App;