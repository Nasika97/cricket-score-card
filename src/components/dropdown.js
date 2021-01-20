import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    minWidth: "30%",
  },
  selectEmpty: {
    marginTop: 0,
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(props.value);
console.log("kk",state)
  const handleChange = (event) => {
    setState(event.target.value);
    props.onDropdownChange(props.label,event.target.value)
  };
console.log(props)
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id={`Input_Label ${props.label}`}>{props.label}</InputLabel>
        <Select
          labelId={`Label_Id ${props.label}`}
          id={`Select_OutLined ${props.label}`}
          value={state}
          onChange={handleChange}
          label={props.label}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            props.menuItem!=undefined&&props.menuItem.map((item)=>{
              return(
                <MenuItem value={item.id}>{item.name}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
     </div>
  );
}
