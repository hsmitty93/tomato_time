import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useSound from 'use-sound';

//Material Components
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardActions,
    Button,
    Tabs,
    Tab,
    Grid,
    CardContent,
    Paper,
    SvgIcon,
    Typography,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

//Icons
import { ReactComponent as TomatoOutline } from '../assets/tomatoOutline.svg';
import { ReactComponent as TomatoFilled } from '../assets/tomatoFilled.svg';

//Sounds
import notificationSfx from '../assets/dialogNoise.mp3';

//Local Components
import { Timer } from './timer';
import { FinishedDialog } from './dialog';

const useStyles = makeStyles({
    root: {
        minWidth: 370,
        height: 600,
        borderRadius: "2%",
        /* backgroundColor: "#ffbcaf" */
    },
    media: {
        height: 400,
        width: '100%',
    },
    header: {
        height: 100
    },
    totalHeight: {
        height: '100%'
    },
    midHeight: {
        height: '85%'
    },
    flexContainer: {
        backgroundColor: "#f44336",
    },
    wrapper: {
        color: "black",

    },
    selected: {
        backgroundColor: "#ff7960"
    },
    spacing: {
        backgroundColor: "#f44336"
    },
    text: {
        backgroundColor: "#ff7961",
        fontWeight: 500
    }

});

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <div className={classes.totalHeight}
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Grid container justify="center" className={classes.totalHeight} direction="row" alignItems="center">
                    <Grid item>
                        {children}
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export function TimerArea({ setEarnedTomato, selectedTask, tasks }) {
    const classes = useStyles();
    const [playDialog, { stop, isPlaying }] = useSound(notificationSfx);

    const [activeTimer, setActiveTimer] = useState(0);
    const [timers, setTimer] = useState([
        {
            type: "work",
            minutes: 25,
            seconds: 0,
        },
        {
            type: "short",
            minutes: 5,
            seconds: 0,
        },
        {
            type: "long",
            minutes: 10,
            seconds: 0,
        },

    ]);
    const [isActive, setIsActive] = useState(false);
    const [isRestart, setRestart] = useState(false);
    const [workDone, setWorkDone] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [breaks, setBreaks] = useState(0);

    const handleChange = (event, newActiveTimer) => {
        setActiveTimer(newActiveTimer);
        reset();
    };

    const handleDialogClick = () => {
        stop();
        setOpenDialog(false)
    }

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setRestart(true);
        setIsActive(false);
    }
    //Create a ref to save which timer was previously active
    const prevActiveTimerRef = useRef();


    useEffect(() => {
        if (workDone) {
            prevActiveTimerRef.current = activeTimer;
            switch (activeTimer) {
                case 0:
                    setEarnedTomato(1);
                    if (breaks <= 4) {
                        setActiveTimer(1);
                    } else {
                        setActiveTimer(2);
                    }
                    break;
                case 1:
                    setBreaks((b) => b + 1);
                    setActiveTimer(0);
                    break;
                case 2:
                    setBreaks(0);
                    setActiveTimer(0);
                    break;
            }
            setOpenDialog(true);
            setWorkDone(false);
        }
    }, [workDone]);

    useEffect(() => {
        if (openDialog && isPlaying == false) {
            playDialog();
        }
    }, [openDialog])


    const prevActiveTimer = prevActiveTimerRef.current;

    return (
        <Card className={classes.root}>
            <Tabs
                classes={{ flexContainer: classes.flexContainer }}
                value={activeTimer}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                centered
            >
                <Tab classes={{ wrapper: classes.wrapper, selected: classes.selected }} label="Work" />
                <Tab classes={{ wrapper: classes.wrapper, selected: classes.selected }} label="Short Break" />
                <Tab classes={{ wrapper: classes.wrapper, selected: classes.selected }} label="Long Break" />
            </Tabs>
            <CardActionArea className={classes.media} onClick={toggle}>
                <TabPanel value={activeTimer} index={0}>
                    <Timer
                        timer={timers[0]}
                        isActive={isActive}
                        isRestart={isRestart}
                        setRestart={setRestart}
                        setWorkDone={setWorkDone}
                        reset={reset}
                    />
                </TabPanel>
                <TabPanel value={activeTimer} index={1}>
                    <Timer
                        timer={timers[1]}
                        isActive={isActive}
                        isRestart={isRestart}
                        setRestart={setRestart}
                        setWorkDone={setWorkDone}
                        reset={reset}
                    />
                </TabPanel>
                <TabPanel value={activeTimer} index={2}>
                    <Timer
                        timer={timers[2]}
                        isActive={isActive}
                        isRestart={isRestart}
                        setRestart={setRestart}
                        setWorkDone={setWorkDone}
                        reset={reset}
                    />
                </TabPanel>
            </CardActionArea>
            <CardContent style={{ height: 52 }}>
                {tasks.length > 0 && tasks[selectedTask] && tasks[selectedTask].isCompleted == false &&
                    <Paper elevation="4" style={{ width: "100%", display: "flex", padding: 5 }}>
                        <div style={{ width: "50%" }}>
                            <Typography varient="subtitle1">Current Task: {tasks[selectedTask].content}</Typography>
                        </div>
                        <div style={{ width: "50%" }}>
                            <Rating
                                emptyIcon={<SvgIcon component={TomatoOutline} viewBox="0 0 512.002 512.002" />}
                                icon={<SvgIcon component={TomatoFilled} viewBox="0 0 512.002 512.002" />}
                                readOnly={true}
                                max={(tasks[selectedTask].tomatoValue > tasks[selectedTask].estTomatos) ?
                                    tasks[selectedTask].tomatoValue : tasks[selectedTask].estTomatos}
                                value={tasks[selectedTask].tomatoValue}
                            />
                        </div>

                    </Paper>}
            </CardContent>
            <CardActions style={{ justifyContent: "space-around", height: 52 }} classes={{ spacing: classes.spacing }}>
                <Button
                    classes={{ text: classes.text }}
                    onClick={toggle}
                    color="#000000"
                    varient="outlined"
                >
                    {isActive ? "Pause" : "Start"}
                </Button>
                <Button classes={{ text: classes.text }} onClick={reset} color="#000000" varient="outlined">Restart</Button>
            </CardActions>
            <FinishedDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                value={prevActiveTimer}
                onClick={handleDialogClick}
            />
        </Card>
    )
}