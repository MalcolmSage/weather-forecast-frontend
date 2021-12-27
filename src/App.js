import React, { Component } from "react";
import "./styles/App.css"

import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Card from './components/card'
import {
  Grid,
} from '@material-ui/core/';

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(46,125,50)",
    },
    secondary: {
      main: "rgb(999,999,999)",
    }
  },
})

const useStyles = makeStyles({

})

class App extends Component {
  constructor() {
    super()
    this.state = {
      value: "",
      arrayOfWeather: [],
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
      .then(response => response.json())
      .then(data => {
        let currentWeatherPrediction = {
          location: data.name,
          clouds: data.weather[0].description,
          temperature: data.main.temp,
          value: value,
        }
        console.log(currentWeatherPrediction)
        let newArray = this.state.arrayOfWeather
        newArray.unshift(currentWeatherPrediction)
        this.setState({
          value: "",
          arrayOfWeather: newArray
        })
        console.log(this.state.arrayOfWeather)
      })

  }

  render() {
    const { value, arrayOfWeather } = this.state;
    const weather = arrayOfWeather.length !== 0 ? arrayOfWeather[0] : ""
    function isWeather(){
      if (arrayOfWeather.length !== 0) {
        return true
      } 
      return false
    }
    return (
      <ThemeProvider theme={theme} >
        <Grid container className="App">
          <Grid item>
            <Card weather={weather} isWeather={isWeather} onSubmit={this.onSubmit} setState={this.setState} onChange={this.onChange} value={value}/>
            
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

export default App;