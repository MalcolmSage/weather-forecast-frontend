import React, { Component } from "react";


class Card extends Component {


  render() {
    const {weather, isWeather, onSubmit, value, onChange} = this.props
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} value={value} />
        </form>
        <h1>{isWeather ? weather.location : ""}</h1>
        <h1>{isWeather ? weather.clouds : ""}</h1>
        <h1>{isWeather ? weather.temperature : ""}</h1>
      </div>
    )
  }

  // constructor() {
  //   super()
  //   this.state = {
  //     value: "",
  //     arrayOfWeather: [],
  //   }
  // }



  // onChange = event => {
  //   this.setState({ value: event.target.value });
  // }
  // onSubmit = event => {
  //   event.preventDefault();
  //   const { value } = this.state;
  //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(data => {
  //       let currentWeatherPrediction = {
  //         location: data.name,
  //         clouds: data.weather[0].description,
  //         temperature: data.main.temp,
  //         value: value,
  //       }
  //       console.log(currentWeatherPrediction)
  //       let newArray = this.state.arrayOfWeather
  //       newArray.unshift(currentWeatherPrediction)
  //       this.setState({
  //         value: "",
  //         arrayOfWeather: newArray
  //       })
  //       console.log(this.state.arrayOfWeather)
  //     })

  // }

  // render() {
  //   const { value, arrayOfWeather } = this.state;
  //   const weather = arrayOfWeather.length !== 0 ? arrayOfWeather[0] : ""
  //   function isWeather(){
  //     if (arrayOfWeather.length !== 0) {
  //       return true
  //     } 
  //     return false
  //   }
  //   return (
  //     <div>
  //       <form onSubmit={this.onSubmit}>
  //         <input onChange={this.onChange} value={value} />
  //       </form>
  //       <h1>{isWeather ? weather.location : ""}</h1>
  //       <h1>{isWeather ? weather.clouds : ""}</h1>
  //       <h1>{isWeather ? weather.temperature : ""}</h1>
  //     </div>
  //   );
  // }
}

export default Card;