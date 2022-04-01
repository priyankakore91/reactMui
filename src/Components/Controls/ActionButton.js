import React from 'react';
import { makeStyles, Button } from '@material-ui/core';

export default function ActionButton(props) {

    const usestyles = makeStyles (theme => ({
        root: {
            minWidth: 0,
            margin: theme.spacing(0.5)
        },
        secondary: {
            backgroundColor: theme.palette.secondary.light,
            '& .MuiButton-label': {
                color: theme.palette.secondary.main,
            }
        },
        primary: {
            backgroundColor: theme.palette.primary.light,
            '& .MuiButton-label': {
                color: theme.palette.primary.main,
            }
        },
    }))

    const {color, children, onClick} = props;

    const classes = usestyles();
    return (
        <Button 
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}>
            {children}
        </Button>
    );
}

