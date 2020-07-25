import React from 'react';

//Material Components
import {
    Dialog,
    DialogActions,
    DialogTitle,
    Button
} from '@material-ui/core';

export function FinishedDialog({ openDialog, setOpenDialog, value }) {

    const handleClose = () => {
        setOpenDialog(false);
    }

    var title;

    switch (value) {
        case 0:
            title = "25 min is up! Time for a break!"
            break;
        case 1:
            title = "5 min break is up! Time for work!"
            break;
        case 2:
            title = "10 min break is up! Time for work!"
            break;
    }


    return (
        <Dialog
            open={openDialog}
            onClose={handleClose}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}