import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Block, VerticalAlignBottom } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    }
}))

export default function Checkbox(props) {
    const {name, label, value, onChange}=props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })
    const classes = useStyles();

    return (
        <FormControl>
            <FormControlLabel
            control={<MuiCheckbox 
            name={name}
            color="primary"
            checked={value}
            classes= {{root:classes.root}}
            onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
            />}
            label={label}
            />
        </FormControl>
    );
}
