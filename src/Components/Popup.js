import { DialogContent, DialogTitle, Dialog, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Controls from './Controls/Controls';
import CloseIcon from '@material-ui/icons/Close'

const usestyles = makeStyles (theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dilogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {
    const {title, children, openPopup, setOpenPopup} = props;
    const classes = usestyles();  

    return (
        <div>
            <Dialog open={openPopup} maxWidth="md" classes={{ paper:classes.dialogWrapper}}>  
                <DialogTitle className={classes.dilogTitle }>
                    <div style={{display:'flex'}}>
                    <Typography variant="h6" component="div"style={{flexGrow:1}}>
                        {title }
                    </Typography>

                    <Controls.ActionButton 
                    color="secondary"
                    onClick={() => {setOpenPopup(false)}}>
                        <CloseIcon /> 
                    </Controls.ActionButton>

                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    {children}
                </DialogContent>
            </Dialog>
            
        </div>
    );
}
