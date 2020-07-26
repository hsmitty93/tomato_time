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
} from '@material-ui/core';

//Material Icons
import {
    AddRounded,
    FilterListRounded,
} from '@material-ui/icons';

//Local Components
import TaskList from './taskList';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "37.5em",
        maxHeight: "37.5em",
        minWidth: 370,
        backgroundColor: "#ffbcaf"
    },
    toolbar: {
        alignItems: 'center',
        paddingRight: 0,
        paddingLeft: 0,
        width: "100%",
        borderRadius: "2% 2% 0% 0%",
        color: "black"
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

export function TaskPanel({ earnedTomato, setEarnedTomato, selectedTask, setSelectedTask, tasks, setTasks }) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <AppBar position="static" color="primary" styles={{ borderRadius: "2% 2% 0% 0%" }}>
                <Toolbar className={classes.toolbar} disableGutters="true">
                    <Grid container direction="row" justify="center" styles={{ borderRadius: "2% 2% 0% 0%" }}>
                        <Grid item xs={6} md={7}>
                            <Typography className={classes.title} varient="h6">
                                Tasks
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={5} className={classes.iconButton}>
                            <IconButton edge="start">
                                <AddRounded />
                            </IconButton>
                            <IconButton edge="end">
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
                tasks={tasks}
                setTasks={setTasks}
            />
        </Paper >

    )
}