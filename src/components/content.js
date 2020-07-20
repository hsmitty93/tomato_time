import React, { useState } from 'react';
import {
    Grid,
    ThemeProvider,
} from '@material-ui/core';
import { TaskPanel } from './taskPanel';
import { TimerArea } from './timerArea';
import { theme1 } from '../App';


export function Content() {

    const [selectedTask, setSelectedTask] = useState(1);
    const [earnedTomato, setEarnedTomato] = useState(0);



    return (
        <ThemeProvider theme={theme1}>
            <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                <Grid item >
                    <TaskPanel
                        earnedTomato={earnedTomato}
                        setEarnedTomato={setEarnedTomato}
                        selectedTask={selectedTask}
                        setSelectedTask={setSelectedTask}
                    />
                </Grid>

                <Grid item >
                    <TimerArea setEarnedTomato={setEarnedTomato} />
                </Grid>

            </Grid>
        </ThemeProvider>

    )
}
