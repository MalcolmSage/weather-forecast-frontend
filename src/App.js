import './App.css';
import React, { Component } from "react";

class App extends Component {
  constructor(){
    super()
    this.state = {
      location:"",
      clouds:"",
      temperature:"",
    }
  }

  componentDidMount(){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=nottingham&units=imperial&appid=${process.env.REACT_APP_WEATHER_KEY}`
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
      this.setState({
        location: data.name,
        clouds: data.weather[0].description,
        temperature: data.main.temp,
      })
    })
  }
  render() {
    return (
      <div className="App">
        <h1>Weather</h1>
        <h1>{this.state.location}</h1>
        <h1>{this.state.clouds}</h1>
        <h1>{this.state.temperature}</h1>
      </div>
    );
  }
}

export default App;