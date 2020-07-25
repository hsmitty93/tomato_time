import React from 'react';

//Material Components
import {
    AppBar,
    Typography,
    Toolbar,
    Paper,
    IconButton,
    makeStyles,
    Grid,
    useMediaQuery,
} from '@material-ui/core';

//Material Icons
import {
    AddRounded,
    FilterListRounded,
    Autorenew,
} from '@material-ui/icons';

//Local Components
import TaskList from './taskList';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "31.5em",
        maxHeight: "31.5em",
        minWidth: 370,
    },
    toolbar: {
        alignItems: 'center',
        paddingRight: 0,
        paddingLeft: 0,
        width: "100%"
    },
    title: {
        fontSize: "2rem",
        margin: theme.spacing(1) + 2,
        marginRight: theme.spacing(8),
    },
    iconButton: {
        padding: 10,
    }
}));

export function TaskPanel({ earnedTomato, setEarnedTomato, selectedTask, setSelectedTask }) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <AppBar position="static" >
                <Toolbar className={classes.toolbar}>
                    <Grid container direction="row" justify="center">
                        <Grid item xs={6} md={7}>
                            <Typography className={classes.title} varient="h6">
                                Tasks
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={5} className={classes.iconButton}>
                            <IconButton>
                                <AddRounded />
                            </IconButton>
                            <IconButton>
                                <FilterListRounded />
                            </IconButton>

                        </Grid>


                    </Grid>
                </Toolbar>
            </AppBar>
            <TaskList
                earnedTomato={earnedTomato}
                setEarnedTomato={setEarnedTomato}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
            />
        </Paper >

    )
}