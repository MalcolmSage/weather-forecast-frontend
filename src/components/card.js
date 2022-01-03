import React, { Component } from "react";

import { Grid, Typography } from "@material-ui/core";

class LocationCard extends Component {


  render() {
    const { item } = this.props
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item >
          <Typography variant="h3" component="div" >
            {item.location}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3" component="div">
            {item.clouds}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3" component="div">
            {Math.floor(item.temperature)}c
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

export default LocationCard;