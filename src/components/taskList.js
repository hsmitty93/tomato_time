import React, { useState, useEffect, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import { Task } from './task';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        justifyContent: "center"
    },
    list: {
        paddingLeft: 0,
        paddingRight: 0,
        maxHeight: 246,
        overflow: 'auto'
    },
    input: {
        flex: 1,
        display: 'flex',
    },
    divider: {
        height: 2,
        marginBottom: 12,
        marginTop: 12,
    }
}));

function CreateTask({ addTask }) {
    const classes = useStyles();
    const [value, setValue] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("");
    }

    return (
        <Paper component="form" className={classes.root} style={{ paddingTop: 8 }}>
            <form onSubmit={handleSubmit} noValidate autoComplete="off" >
                <TextField
                    className={classes.input}
                    id="outlined-basic"
                    label="Add a new Task"
                    variant="outlined"
                    value={value}
                    onChange={(event) => setValue(event.target.value)} />
            </form>
        </Paper>
    );
}



function TaskList({ earnedTomato, setEarnedTomato, selectedTask, setSelectedTask }) {
    const classes = useStyles();

    const [tasks, setTasks] = useState([
        {
            content: "create a task",
            isCompleted: false,
            estTomatos: 3,
            tomatoValue: 2,
        },
        {
            content: "another task",
            isCompleted: false,
            estTomatos: 1,
            tomatoValue: 0,
        },
        {
            content: "another nother task",
            isCompleted: false,
            estTomatos: 1,
            tomatoValue: 0,
        }
    ])

    function addTask(value) {
        const newTasksList = [...tasks, {
            content: value,
            isCompleted: false,
            estTomatos: 1,
            tomatoValue: 0,
        }];
        setTasks(newTasksList);
    }

    function updateTaskAtIndex(event, index) {
        if (!tasks[index].isCompleted) {
            const newTasksList = [...tasks];
            newTasksList[index].content = event.target.value;
            setTasks(newTasksList);
        }
    }

    const completeTask = (index) => {
        const newTasksList = [...tasks];
        if (newTasksList[index].isCompleted) {
            newTasksList[index].isCompleted = false;
        } else {
            newTasksList[index].isCompleted = true;
        }
        setTasks(newTasksList);
    }

    const removeTask = (index) => {
        const newTasksList = [...tasks];
        newTasksList.splice(index, 1);
        setTasks(newTasksList)
    }

    const updateTomatoTime = (index, value) => {
        const newTasksList = [...tasks];
        newTasksList[index].estTomatos = value;
        setTasks(newTasksList);
    }

    const handleListItemClick = (event, index) => {
        setSelectedTask(index)
    }

    useEffect(() => {
        const newTasksList = [...tasks];
        newTasksList[selectedTask].tomatoValue += earnedTomato;
        setTasks(newTasksList);
        setEarnedTomato(0);
    }, [earnedTomato])

    /* const TaskItem = memo((props) => {
        const {
            index,
            data } = props;

        return (
            <ListItem className={classes.list} selected={selectedTask === index} onClick={(event) => handleListItemClick(event, index)}>
                <Task
                    task={data[index]}
                    key={index}
                    index={index}
                    updateTaskAtIndex={updateTaskAtIndex}
                    completeTask={completeTask}
                    removeTask={removeTask}
                    updateTomatoTime={updateTomatoTime}
                />
            </ListItem>
        )
    }, areEqual)
    console.log(selectedTask) */

    return (
        <div className={classes.root}>
            <CreateTask addTask={addTask} />
            <Divider orientation="horizontal" className={classes.divider} />
            <List className={classes.list}>
                {tasks.map((task, index) =>
                    <ListItem selected={selectedTask === index} onClick={(event) => handleListItemClick(event, index)}>
                        <Task
                            task={task}
                            key={index}
                            index={index}
                            updateTaskAtIndex={updateTaskAtIndex}
                            completeTask={completeTask}
                            removeTask={removeTask}
                            updateTomatoTime={updateTomatoTime}
                        />
                    </ListItem>
                )}

            </List>
        </div >
    )

}

export default TaskList;