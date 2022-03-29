//import { FormControl, FormControlLabel, FormLabel, Paper, RadioGroup, Radio, TextField } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {Grid } from '@material-ui/core';
import Controls from '../../Components/Controls/Controls';
import { makeStyles } from '@material-ui/core';
import {useForm, Form} from '../../Components/useForm';
import * as employService from '../../Services/employService';

const genderitems =[
    {id:'male',title:'Male'},
    {id:'female',title:'Female'},
    {id:'other',title:'Other'},
]

const initialFValues ={
    id :0,
    fullName:'',
    email:'',
    mobile:'',
    city:'',
    gender:'male',
    departmentId:'',
    hireDate: new Date(),
    ispermanent:false,

}

function EmployeeForm(props) {

    const validate =(fieldValues = values)=> {
        let temp = {...errors}
        if ('fullName' in fieldValues)
        temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
        temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid"
        if ('mobile' in fieldValues)
        temp.mobile = fieldValues.mobile.length>9 ? "" : "Minimum 10 numbers required"
        if ('departmentId' in fieldValues)
        temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues = values)
        return Object.values(temp).every( x => x == "")

    }


    const {
        values,
        setValues,
        handleInputChange,
        errors,
        setErrors,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {

        e.preventDefault()
        if (validate())
        employService.insertEmployee(values)
    }


    return (
        <Form onSubmit={handleSubmit}> 
            
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                    name="fullName"
                    label="FullName"
                    value={values.fullName}
                    onChange={handleInputChange}
                    error={errors.fullName}
                    />
                    
                    <Controls.Input
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    />

                    <Controls.Input
                    label="mobile"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleInputChange}
                    error={errors.mobile}
                    />

                    <Controls.Input
                    label="city"
                    name="city"
                    value={values.city}
                    onChange={handleInputChange}
                    /> 

                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                    name="gender"
                    label="Gender"
                    value={values.gender}
                    onChange={handleInputChange}
                    items={genderitems}
                    />

                    <Controls.Select
                    name="departmentId"
                    label="Department"
                    value={values.departmentId}
                    onChange={handleInputChange}
                    options={employService.getDepartmentCollection()}
                    error={errors.departmentId}
                    />

                    <Controls.DatePicker
                    name="hireDate"
                    label="Hire Date"
                    value={values.hireDate}
                    onChange={handleInputChange}
                    />
                    
                    <Controls.Checkbox
                    name="ispermanent"
                    label="Permanent Employee"
                    value={values.ispermanent}
                    onChange={handleInputChange}
                    />

                    <div>
                        <Controls.Button
                        type="submit"
                        text="Submit"
                        />

                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={resetForm}
                        />
                    </div>

                </Grid>
            </Grid>
            </Form>
        
    );
}

export default EmployeeForm;