import { Paper, makeStyles, TableBody, TableRow, TableCell } from '@material-ui/core';
import { PeopleOutlineTwoTone } from '@material-ui/icons';
import React, { useState  } from 'react';
import PageHeader from '../../Components/PageHeader';
import EmployeeForm from './EmployeeForm';
import useTable from '../../Components/useTable';
import * as employService from '../../Services/employService'

const usestyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const headCells = [
    {id:'fullName', label:'Employee Name'},
    {id:'email', label:'Email Address (Personal)'},
    {id:'mobile', label:'Mobile Number'},
    {id:'department', label:'Department'}   
]   

function Employees(props) {
    const classes = usestyles();
    const [records, setRecords] = useState(employService.getAllEmployees());

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPaginationAndSorting
    } = useTable(records,headCells);

    return (
        <>
        <PageHeader 
         title="New Employee"
         subTitle="Form design with validation"
         icon={<PeopleOutlineTwoTone fontSize="large" />}
             />
             <Paper className={classes.pageContent}> 
        {/* <EmployeeForm /> */}
        <TblContainer>
            <TblHead />
            <TableBody>
                {
                    recordsAfterPaginationAndSorting().map (item => 
                    (<TableRow key={item.id}> 
                        <TableCell>{item.fullName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.mobile}</TableCell>
                        <TableCell>{item.department}</TableCell>
                    </TableRow>))
                }

            </TableBody>
            
        </TblContainer>
        <TblPagination />
        </Paper>
        </>
    );
}


export default Employees;