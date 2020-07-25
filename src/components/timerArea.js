import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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
} from '@material-ui/core';

//Local Components
import { Timer } from './timer';
import { FinishedDialog } from './dialog';

const useStyles = makeStyles({
    root: {
        minWidth: 370,
        height: 500,
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

export function TimerArea({ setEarnedTomato }) {
    const classes = useStyles();

    const [value, setValue] = useState(0);
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
        reset();
    };

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setRestart(true);
        setIsActive(false);
    }

    const prevValueRef = useRef();


    useEffect(() => {
        if (workDone) {
            prevValueRef.current = value
            switch (value) {
                case 0:
                    setEarnedTomato(1);
                    if (breaks <= 4) {
                        setValue(1);
                    } else {
                        setValue(2);
                    }
                    break;
                case 1:
                    setBreaks((p) => p + 1);
                    setValue(0);
                    break;
                case 2:
                    setBreaks(0);
                    setValue(0);
                    break;
            }
            setOpenDialog(true);
            setWorkDone(false);
        }
    }, [workDone]);

    const prevValue = prevValueRef.current;
    console.log(prevValue)



    return (
        <Card className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Work" />
                <Tab label="Short Break" />
                <Tab label="Long Break" />
            </Tabs>
            <CardActionArea className={classes.media} onClick={toggle}>
                <TabPanel value={value} index={0}>
                    <Timer timer={timers[0]} isActive={isActive} isRestart={isRestart} setRestart={setRestart} setWorkDone={setWorkDone} reset={reset} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Timer timer={timers[1]} isActive={isActive} isRestart={isRestart} setRestart={setRestart} setWorkDone={setWorkDone} reset={reset} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Timer timer={timers[2]} isActive={isActive} isRestart={isRestart} setRestart={setRestart} setWorkDone={setWorkDone} reset={reset} />
                </TabPanel>
            </CardActionArea>

            <CardActions style={{ justifyContent: "center" }}>
                <Button onClick={toggle}>{isActive ? "Pause" : "Start"}</Button>
                <Button onClick={reset}>Restart</Button>
            </CardActions>
            <FinishedDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                value={prevValue}
            />
        </Card>
    )
}