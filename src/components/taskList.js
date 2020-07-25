import React, { useState, useEffect } from 'react';

//Material Components
import { makeStyles } from '@material-ui/core/styles';
import {
    List,
    ListItem,
    TextField,
    Divider,
} from '@material-ui/core';

//Local Components
import { Task } from './task';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        justifyContent: "center",
    },
    list: {
        paddingLeft: 0,
        paddingRight: 0,
        maxHeight: 325,
        overflow: 'auto',
        width: "100%",
        /* minHeight: 325 */
    },
    input: {
        flex: 1,
        display: 'flex',
    },
    divider: {
        height: 2,
        marginBottom: 12,
        marginTop: 1,
    },
    addTask: {
        justifyContent: "center",
        padding: "10px",
        alignItems: "center",
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
        <div className={classes.addTask}>
            <form onSubmit={handleSubmit} noValidate autoComplete="off" >
                <TextField
                    className={classes.input}
                    id="outlined-basic"
                    label="Add a new Task"
                    variant="outlined"
                    value={value}
                    onChange={(event) => setValue(event.target.value)} />
            </form>
        </div>
    );
}



function TaskList({ earnedTomato, setEarnedTomato, selectedTask, setSelectedTask }) {
    const classes = useStyles();

    const [tasks, setTasks] = useState([]);

    function addTask(value) {
        if (tasks.length === 0) {
            setTasks([{
                content: value,
                isCompleted: false,
                estTomatos: 1,
                tomatoValue: 0,
            }]);
        } else {
            const newTasksList = [...tasks, {
                content: value,
                isCompleted: false,
                estTomatos: 1,
                tomatoValue: 0,
            }];
            setTasks(newTasksList);
        }
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
        if (tasks.length > 0) {
            const newTasksList = [...tasks];
            newTasksList[selectedTask].tomatoValue += earnedTomato;
            setTasks(newTasksList);
            setEarnedTomato(0);
        }
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
            <div className={classes.list}>
                {tasks.length > 0 &&
                    <List>
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
                }
            </div>

        </div >
    )

}

export default TaskList;