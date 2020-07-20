import React from 'react';
import {
    AppBar,
    Typography,
    Toolbar,
    Paper,
    IconButton,
    makeStyles

} from '@material-ui/core';
import {
    AddRounded,
    FilterListRounded,
} from '@material-ui/icons';
import TaskList from './taskList';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxHeight: 500
    },
    toolbar: {
        alignItems: 'flex-start',
        paddingRight: 0,
        paddingLeft: 0
    },
    title: {
        fontSize: "2rem",
        margin: theme.spacing(1) + 2,
        width: '64%',
    },
    iconButton: {
        padding: 10
    }
}));

export function TaskPanel({ earnedTomato, setEarnedTomato, selectedTask, setSelectedTask }) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.title} varient="h6" noWrap>
                        Tasks
                    </Typography>
                    <div className={classes.iconButton}>
                        <IconButton>
                            <AddRounded />
                        </IconButton>
                        <IconButton>
                            <FilterListRounded />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <TaskList
                earnedTomato={earnedTomato}
                setEarnedTomato={setEarnedTomato}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
            />
        </Paper>

    )
}