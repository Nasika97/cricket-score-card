import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers(props) {
  const classes = useStyles();
console.log(props,"iiii")
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Date"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        disabled="true"
        value={props.value}
        onChange={(e)=>{props.onDateChange(e.target.value)}}
      />
    </form>
  );
}
