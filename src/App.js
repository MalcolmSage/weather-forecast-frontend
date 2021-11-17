import './App.css';
import React, { Component } from "react";

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: "",
      location: "Location",
      clouds: "Sky",
      temperature: "Temperature",
    }
  }

  onChange = event => {
    this.setState({ value: event.target.value });
  }
  onSubmit = event => {
    event.preventDefault();
    const { value } = this.state;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
      this.setState({
        location: data.name,
        clouds: data.weather[0].description,
        temperature: data.main.temp,
        value:"",
      })
    })
  }
  render() {
    const { value } = this.state;
    return (
      <div className="App">
        <h1>Weather</h1>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={value} />
        </form>
        <h1>{this.state.location}</h1>
        <h1>{this.state.clouds}</h1>
        <h1>{this.state.temperature}</h1>
      </div>
    );
  }
}

export default App;