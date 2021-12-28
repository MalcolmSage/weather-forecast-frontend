import React, { Component } from "react";
import "./styles/App.css"

import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';

import CityTabs from './components/cityTabs'
import Card from './components/card'
import SearchAppBar from './components/lookup'

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from "@material-ui/core";

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
      tabValue: 0,
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
          index: this.state.arrayOfWeather.length,
          value: value,
        }
        let newArray = this.state.arrayOfWeather
        newArray.push(currentWeatherPrediction)
        this.setState({
          value: "",
          arrayOfWeather: newArray,
          tabValue: currentWeatherPrediction.index,
        })
      })

  }

  render() {
    const { value, arrayOfWeather } = this.state;
    const weather = arrayOfWeather.length !== 0 ? arrayOfWeather[0] : ""
    function isWeather() {
      if (arrayOfWeather.length !== 0) {
        return true
      }
      return false
    }

    // TESTING
    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }

    TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }

    const handleChange = (event, newValue) => {
      this.setState({ tabValue: newValue });
    };
    // const [tabValue, setTabValue] = React.useState(0);



    return (
      <ThemeProvider theme={theme} >
        <Box className="App">
          <SearchAppBar onSubmit={this.onSubmit} onChange={this.onChange} value={value} a11yProps={a11yProps} tabValue={this.state.tabValue} handleChange={handleChange} arrayOfWeather={this.state.arrayOfWeather}/>
          {/* <CityTabs a11yProps={a11yProps} tabValue={this.state.tabValue} handleChange={handleChange} arrayOfWeather={this.state.arrayOfWeather} /> */}
          {arrayOfWeather.map((item) => (
            <TabPanel value={this.state.tabValue} index={item.index} key={item.index}>
              <Card item={item} />
            </TabPanel>
          ))}
          {/* </div> */}
        </Box>
      </ThemeProvider>
    );
    // TESTING



    // return (
    <ThemeProvider theme={theme} >
      <Grid container className="App">
        <Grid item>
          <Card weather={weather} isWeather={isWeather} onSubmit={this.onSubmit} setState={this.setState} onChange={this.onChange} value={value} />
        </Grid>
      </Grid>
    </ThemeProvider>
    // );
  }
}

export default App;