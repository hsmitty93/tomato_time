import React, { useState, useEffect } from 'react';

//Material Components
import { makeStyles } from '@material-ui/core/styles';
import {
    List,
    ListItem,
    TextField,
} from '@material-ui/core';

//Local Components
import { Task } from './task';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: "#ffbcaf",
        justifyContent: "center",
    },
    list: {
        paddingLeft: 0,
        paddingRight: 0,
        maxHeight: 454,
        overflow: 'auto',
        width: "100%",
    },
    input: {
        flex: 1,
        display: 'flex',
        backgroundColor: "white",
        borderRadius: "2% 2% 0% 0%"
    },
    addTask: {
        justifyContent: "center",
        padding: "10px",
        alignItems: "center",
        backgroundColor: "#ff7961",
    },
    selected: {
        backgroundColor: "#7dffff"
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
                    style={{ color: "#00b4c1" }}
                    className={classes.input}
                    id="filled-basic"
                    label="Add a new Task"
                    variant="filled"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
            </form>
        </div>
    );
}



function TaskList({ earnedTomato, setEarnedTomato, selectedTask, setSelectedTask, tasks, setTasks, onTaskChange}) {
    const classes = useStyles();
    //console.log(tasks)

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
        newTasksList[index].isCompleted = !newTasksList[index].isCompleted;
        setTasks(newTasksList);
    }

    const removeTask = (index) => {
        const newTasksList = [...tasks];
        newTasksList.splice(index, 1);
        if(selectedTask === index){
            setSelectedTask(0);
        }
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

    useEffect(() => {
        console.log(`Tasks in TaskPanel: ${tasks}`)
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks])

    return (
        <div className={classes.root} >
            <CreateTask addTask={addTask} />
            <div className={classes.list} >
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