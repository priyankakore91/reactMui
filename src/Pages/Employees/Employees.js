import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { PeopleOutlineTwoTone, Search } from '@material-ui/icons';
import React, { useState,useEffect  } from 'react';
import PageHeader from '../../Components/PageHeader';
import EmployeeForm from './EmployeeForm';
import useTable from '../../Components/useTable';
import * as employService from '../../Services/employService'
import Controls from '../../Components/Controls/Controls'
import { search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Popup, { } from '../../Components/Popup';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../../Components/Notification';
import ConfirmDialog from '../../Components/Controls/ConfirmDialog';


const usestyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    {id:'fullName', label:'Employee Name'},
    {id:'email', label:'Email Address (Personal)'},
    {id:'mobile', label:'Mobile Number'},
    {id:'department', label:'Department'},
    {id:'actions', label:'Actions',disableSorting:true}  
]   

function Employees(props) {
    const classes = usestyles();
    const [recordforEdit, setRecordforEdit] = useState(null);
    const [user, setUser] = useState(null);
    const [records, setRecords] = useState(employService.getAllEmployees());
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState ({isOpen:false, message:'', type:''});
    const [confirmDialog, setConfirmDialog] = useState ({isOpen:false, title:'', subTitle:''});

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting

    } = useTable(records, headCells, filterFn)

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }


    // useEffect(() => {
    //     var z 
    //     fetch('https://jsonplaceholder.typicode.com/todos/1')
    //         .then(response => response.json())
    //         .then(a => setUser(a))
    //   },[]);


      useEffect(() => {
        console.log(user?.title)
      },[user]);
    

    const addorEdit = (employee, resetForm) => {
        if (employee.id == 0)          // then we will do insert operation
             employService.insertEmployee(employee)
        else
            employService.updateEmployee(employee)
        resetForm()
        setRecordforEdit(null)
        setOpenPopup(false)
        setRecords(employService.getAllEmployees())
        setNotify ({
            isOpen:true,
            message:'submitted successfully',
            type: 'success'
        })
    }

    const onDelete = id => {
        setConfirmDialog ({
            ...confirmDialog,
            isOpen: false,
        
        })
        employService.deleteEmployee(id);
        setRecords(employService.getAllEmployees()) 
        setNotify ({
            isOpen:true,
            message:'Deleted successfully',
            type: 'error'
        })
     }

    const openInPopup = item => { 
        setRecordforEdit(item)
        setOpenPopup(true)
    }

    return (
        <>
        <PageHeader 
         title="New Employee"
         subTitle="Form design with validation"
         icon={<PeopleOutlineTwoTone fontSize="large" />}
             />
             <Paper className={classes.pageContent}> 
       
        <Toolbar>
            <Controls.Input
            label="Search Employees"
            className = {classes.searchInput}
                InputProps= {{
                    startAdornment: (<InputAdornment position="start">
                    <Search />
                    </InputAdornment>)
            }}
            onChange={  handleSearch}
            />
        <Controls.Button
            text = "Add New"
            variant = "outlined"
            startIcon = {<AddIcon />}
            className ={classes.newButton}
            onClick = {() => {setOpenPopup(true); setRecordforEdit(null); }}
        />

        </Toolbar>
        <TblContainer>
            <TblHead />
            <TableBody>
                {
                    recordsAfterPagingAndSorting().map (item => 
                    (<TableRow key={item.id}> 
                        <TableCell>{item.fullName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.mobile}</TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell>
                            <Controls.ActionButton
                                color="primary"> 
                                    <EditOutlinedIcon fontSize="small"
                                    onClick = {() => {openInPopup(item)}} /> 
                            </Controls.ActionButton>
                            <Controls.ActionButton
                                color="secondary"
                                onClick={() => {
                                    setConfirmDialog ({
                                    isOpen:true,
                                    title:'Are you sure you want to delete this record?',
                                    subTitle:"You cant undo this operation",
                                    onConfirm: () => { onDelete(item.id) }
                                    })
                                }}> 
                                    <CloseIcon fontSize="small" /> 
                            </Controls.ActionButton>
                        </TableCell>
                    </TableRow>))
                }

            </TableBody>
            
        </TblContainer>
        <TblPagination />
        </Paper>
        <Popup
            title="Employee Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            >
             <EmployeeForm 
             recordforEdit={recordforEdit}
             addorEdit={addorEdit}/>
        </Popup>
        <Notification 
            notify={notify}
            setNotify={setNotify}
            /> 
        <ConfirmDialog 
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        />
        </>
    );
}


export default Employees;