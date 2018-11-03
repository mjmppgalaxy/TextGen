import React, { Component } from 'react';
import './App.css';
import './components/output.js';
import Output from './components/output';
import Select from './components/controls/select';
import Text from './components/controls/text';
import axios from 'axios';


class App extends Component {
constructor(props){
  super(props);
  this.state = {
    amount: '4',
    html: true,
    text: ' '
  }
}

componentWillMount(){
  this.getSampleText();
}
getSampleText(){
  axios.get('http://www.randomtext.me/api/gibberish'+this.state.amount+'&html='+this.state.html)
  .then((response) => {
    this.setState({text: response.data.text_out}, function(){
      console.log(this.state);
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

showHtml(x){
  this.setState({html: x}, this.getSampleText );
}
changeAmount(num){
  this.setState({amount: num}, this.getSampleText );
}

  render() {
    return (
      <div className="App container ">
      <h1 className="text-center"> TextGen</h1>
      <hr /> 
      <form className="form-inline ">
        <div className="form-group">
        <label>Include HTML</label>
        <Select value={this.state.html} onChange={this.showHtml.bind(this)}></Select>
        </div>
      </form>
      <br></br>
      <form className="form-inline ">
        <div className=" form-group ">
        <label>Characters</label>
        <Text value={this.state.amount} onChange={this.changeAmount.bind(this)}></Text>
        </div>
      </form>
      <hr />
  

      <div className="jumbotron">
        <Output value={this.state.text}></Output>
        </div>
      </div>
    );
  }
}

export default App;
