import React from 'react';

//Material Components
import { makeStyles } from '@material-ui/core/styles';
import {
    Checkbox,
    FormControl,
    FormHelperText,
    InputLabel,
    IconButton,
    Paper,
    InputBase,
    Popover,
    Button,
    Typography,
    Select,
    MenuItem,
    SvgIcon,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

//Material Icons
import DeleteIcon from '@material-ui/icons/Delete';
import { ReactComponent as TomatoOutline } from '../assets/tomatoOutline.svg';
import { ReactComponent as TomatoFilled } from '../assets/tomatoFilled.svg';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    formControl: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    popOverText: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2)
    }

}));

export function Task({ task, index, completeTask, removeTask, updateTaskAtIndex, updateTomatoTime }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Paper component="form" className={classes.root}>
            <Checkbox
                className={classes.iconButton}
                checked={task.isCompleted}
                onClick={() => completeTask(index)}
                inputProps={{ 'aria-label': 'complete checkbox' }}
            />

            <InputBase
                className={classes.input}
                value={task.content}
                onChange={(event) => updateTaskAtIndex(event, index)}
                style={{ textDecoration: task.isCompleted ? "line-through" : "" }}
            />
            <Button onClick={handleClick}>
                <Rating emptyIcon={<SvgIcon component={TomatoOutline} viewBox="0 0 512.002 512.002" />} icon={<SvgIcon component={TomatoFilled} viewBox="0 0 512.002 512.002" />} readOnly={true} max={(task.tomatoValue > task.estTomatos) ? task.tomatoValue : task.estTomatos} value={task.tomatoValue} />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Typography className={classes.popOverText}>Estimate how many tomatoes are needed to finish this task</Typography>
                <FormControl varient="outlined" className={classes.formControl}>
                    <InputLabel>Tomatoes</InputLabel>
                    <Select
                        label="Est. Time"
                        value={task.estTomatos}
                        onChange={(event) => updateTomatoTime(index, event.target.value)}
                    >
                        <MenuItem value={1}>1 Tomato</MenuItem>
                        <MenuItem value={2}>2 Tomatoes</MenuItem>
                        <MenuItem value={3}>3 tomatoes</MenuItem>
                        <MenuItem value={4}>4 Tomatoes</MenuItem>
                        <MenuItem value={5}>5 Tomatoes</MenuItem>
                    </Select>
                    <FormHelperText>1 tomato = 25 min</FormHelperText>
                </FormControl>

            </Popover>

            <IconButton color="primary" className={classes.iconButton} onClick={() => removeTask(index)} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </Paper>
    )
}
