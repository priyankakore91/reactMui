import React, {useState, useEffect} from 'react';
import {Grid } from '@material-ui/core';
import Controls from '../../Components/Controls/Controls';
import { makeStyles } from '@material-ui/core';
import {useForm, Form} from '../../Components/useForm';
import * as articleService from '../../Services/articleService';


const initialFValues ={
    id :0,
    title:'',
    content:'',
    articleInfo:'',
    author:'',
    articleTypeId:'', // dropdown
    publish:false,
    trust:false,
    notification:false

}

function NewArticle(props) {

        const validate =(fieldValues = values)=> {
            let temp = {...errors}
            if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This field is required."
            if ('content' in fieldValues)
            temp.content = fieldValues.content ? "" : "This field is required."
            if ('author' in fieldValues)
            temp.author = fieldValues.author ? "" : "This field is required."
        //     if ('email' in fieldValues)
        //     temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid"
        //     if ('mobile' in fieldValues)
        //     temp.mobile = fieldValues.mobile.length>9 ? "" : "Minimum 10 numbers required"
        //     if ('departmentId' in fieldValues)
        //     temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
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
            // window.alert('validated...')
            // employService.insertEmployee(values)
                console.log(values)
        }
    
    
        return (
            <Form onSubmit={handleSubmit}> 
                
                <Grid container>
                    <Grid item xs={12}>
                        <Controls.Input
                        name="title"
                        label="Title"
                        value={values.title}
                        onChange={handleInputChange}
                        error={errors.title}
                        />
                        
                        <Controls.Input
                        name="content"
                        label="Content"
                        multiline
                        rows={8}
                        value={values.content}
                        onChange={handleInputChange}
                        error={errors.content}
                        />

    
                        <Controls.Input
                        name="articleInfo"
                        label="Article Info"
                        value={values.articleInfo}
                        onChange={handleInputChange}
                        error={errors.articleInfo}
                        />

                        <Controls.Input
                        name="author"
                        label="Author"
                        value={values.author}
                        onChange={handleInputChange}
                        error={errors.author}
                        />

                        <Controls.Select
                        name="articleTypeId"
                        label="ArticleType"
                        value={values.articleTypeId}
                        onChange={handleInputChange}
                        options={articleService.getArticleTypeCollection()}
                        error={errors.articleTypeId}
                        />

                        <Grid container>
                            <Grid>
                            <Controls.Checkbox
                            name="publish"
                            label="Publish"
                            value={values.publish}
                            onChange={handleInputChange}
                            />
                            </Grid>

                            <Grid>
                            <Controls.Checkbox
                            name="trust"
                            label="Trust"
                            value={values.trust}
                            onChange={handleInputChange}
                            />
                            </Grid>

                            <Grid>
                            <Controls.Checkbox
                            name="notification"
                            label="Notification"
                            value={values.notification}
                            onChange={handleInputChange}
                            />
                            </Grid>
                        </Grid>

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

export default NewArticle;