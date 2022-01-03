import React from "react";
import "../styles/App.css"


import { AppBar} from "@mui/material";

import { Button, ButtonGroup } from "@material-ui/core"

export default function Footer(props) {
    const { backTab, nextTab, arrayOfWeather} = props
    const classes = props.style()

    return (
        <AppBar position="fixed" className={classes.primaryBG} sx={{ top: 'auto', bottom: 0, display: { xs: 'block', sm: 'none' } }}>
            {arrayOfWeather.length < 2 ? "" :
                <ButtonGroup fullWidth size="large">
                    <Button onClick={backTab} className={classes.secondaryText}>
                        Back
                    </Button>
                    <Button onClick={nextTab} className={classes.secondaryText}>
                        Next
                    </Button>
                </ButtonGroup>}
        </AppBar>
    );
}