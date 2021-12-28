import React, { Component } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

class CityTabs extends Component {
    render() {
        const {a11yProps, tabValue, handleChange, arrayOfWeather} = this.props
        return (
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                    {arrayOfWeather.length !== 0 ? arrayOfWeather.map((item) => (
                        <Tab label={item.location} {...a11yProps(item.index)} />
                    )) : <Tab label="False" {...a11yProps(0)} /> }
                </Tabs>
            </Box>
        )
    }
}

export default CityTabs;