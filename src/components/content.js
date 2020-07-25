import React, { useState } from 'react';

//Material Components
import {
    Grid,
    ThemeProvider,
} from '@material-ui/core';

//Local Components
import { TaskPanel } from './taskPanel';
import { TimerArea } from './timerArea';

//Style
import { theme1 } from '../App';




export function Content() {

    const [selectedTask, setSelectedTask] = useState(0);
    const [earnedTomato, setEarnedTomato] = useState(0);

    const styles = {
        container: {
            margin: 10,
            padding: 5,
            width: "98%",
            minHeight: "89vh",
        }
    }

    return (
        <ThemeProvider theme={theme1}>
            <Grid container style={styles.container} spacing={2} direction="row" justify="space-around" alignItems="center">
                <Grid item md={6}>
                    <TaskPanel
                        earnedTomato={earnedTomato}
                        setEarnedTomato={setEarnedTomato}
                        selectedTask={selectedTask}
                        setSelectedTask={setSelectedTask}
                    />
                </Grid>

                <Grid item md={6}>
                    <TimerArea setEarnedTomato={setEarnedTomato} />
                </Grid>

            </Grid>
        </ThemeProvider>

    )
}
