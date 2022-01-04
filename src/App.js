import React, { Component } from "react";
import "./styles/App.css"

import {
  makeStyles,
  createTheme,
  ThemeProvider
} from "@material-ui/core/styles";

import LocationCard from './components/card'
import SearchAppBar from './components/lookup'
import Footer from "./components/bottomCycle";

import { Typography, Box, Grid } from "@mui/material";



import PropTypes from 'prop-types';

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
  primaryBG: {
    backgroundColor: "#282c34",
  },
  secondaryText: {
    color: "white"
  }
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
        if(data.cod !== 200){
          console.log(data.message)
          this.setState({
            value: "",
          })
        } else {
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
        }
      })

  }

  render() {
    const { value, arrayOfWeather } = this.state;
    // TAB FUNCTION
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
              <Typography component={'span'}>{children}</Typography>
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

    // TAB FUNCTION END
    const handleChange = (event, newValue) => {
      this.setState({ tabValue: newValue });
    };

    const nextTab = () => {
      if (this.state.tabValue !== (this.state.arrayOfWeather.length - 1)) {
        this.setState({ tabValue: (this.state.tabValue + 1) });
      }
    }
    const backTab = () => {
      if (this.state.tabValue !== 0) {
        this.setState({ tabValue: (this.state.tabValue - 1) });
      }
    }

    return (
      <ThemeProvider theme={theme} >
        <Box className="App">
          <SearchAppBar onChange={this.onChange} style={useStyles} onSubmit={this.onSubmit} value={value} a11yProps={a11yProps} tabValue={this.state.tabValue} handleChange={handleChange} arrayOfWeather={this.state.arrayOfWeather} />
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              {arrayOfWeather.map((item) => (
                <TabPanel value={this.state.tabValue} index={item.index} key={item.index}>
                  <LocationCard item={item} />
                </TabPanel>
              ))}
            </Grid>
          </Grid>
          <Footer style={useStyles} nextTab={nextTab} backTab={backTab} arrayOfWeather={this.state.arrayOfWeather}/>
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;