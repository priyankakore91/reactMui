import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';

const usestyles = makeStyles({
    paperContent: {
      padding:'40px',
      margin:'24px'
    }
  })

const Article = (props) => {

    const classes = usestyles();

    return (
    <div>
        
        <Paper elevation={3} className={classes.paperContent}>
        hello 
        </Paper>
    </div>
    )       
};

export default Article;