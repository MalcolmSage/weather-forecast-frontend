import React, { Component } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import "../styles/App.css"

class CityTabs extends Component {
    render() {
        const { a11yProps, tabValue, handleChange, arrayOfWeather } = this.props
        return (
            <Tabs 
            component="div" 
            value={tabValue} 
            onChange={handleChange} 
            variant="scrollable"
            scrollButtons="auto"
            aria-label="basic tabs example" >
                {arrayOfWeather.length !== 0 ? arrayOfWeather.map((item) => (
                    <Tab label={item.location} {...a11yProps(item.index)} key={item.index} className="Tab" />
                )) : ""}
            </Tabs>
        )
    }
}

export default CityTabs;