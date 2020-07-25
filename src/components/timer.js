import React, { useEffect, useState } from 'react';

//Material Components
import {
    Paper,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        width: 300,
        height: 300,
        borderRadius: '50%',
    },
    number: {
        fontSize: "4rem",
        textAlign: "center",
        paddingTop: 102,
        paddingBottom: 102
    }
})

export function Timer({ timer, isActive, isRestart, setRestart, setWorkDone, reset }) {
    const [minutes, setMinutes] = useState(timer.minutes);
    const [seconds, setSeconds] = useState(timer.seconds);

    const classes = useStyles();


    useEffect(() => {
        let interval = null;
        if (isRestart) {
            setMinutes(timer.minutes);
            setSeconds(timer.seconds);
            setRestart(false);
        }
        if (isActive) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(second => second - 1);
                }

                if (seconds === 0) {
                    if (minutes !== 0) {
                        setSeconds(59);
                        setMinutes(minute => minute - 1);
                    }
                }
            }, 1000);
        }

        if (isActive && (seconds === 0 && minutes === 0)) {
            setWorkDone(true);
            reset();
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, minutes, seconds, isRestart]);

    return (
        <Paper className={classes.root}>
            <Typography className={classes.number} varient="h1" component="h1">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Typography>

        </Paper>


    )
}