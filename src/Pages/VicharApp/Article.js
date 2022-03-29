import { Paper, makeStyles, TableBody, TableRow, TableCell } from '@material-ui/core';
import { PeopleOutlineTwoTone } from '@material-ui/icons';
import React, { useState  } from 'react';
import PageHeader from '../../Components/PageHeader';
import NewArticle from '../VicharApp/NewArticle'

const usestyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Article(props) {
    const classes = usestyles();


    return (
        <>
        <PageHeader 
         title="New Article"
         subTitle="New Article with validation"
         icon={<PeopleOutlineTwoTone fontSize="large" />}
             />
             <Paper className={classes.pageContent}> 
        {/* <EmployeeForm /> */}
        <NewArticle />
        
            
        
        </Paper>
        </>
    );
}
