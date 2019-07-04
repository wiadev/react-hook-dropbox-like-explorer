import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

const Cancel = styled(Button)`
  &&& {
    margin-left: 10px;
  }
`

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export default (props) => {
  const classes = useStyles();
  const {open, handleClose, row, handleSave} = props;
  const [name, setName] = React.useState(row.name);

  React.useEffect(() => {
    setName(row && row.name);
  }, [row]);

  const handleSaveRow = () => {
    handleSave({
      ...row,
      name
    })
    setName();
  }

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <Typography variant="h6" id="modal-title">
          Input a {row.type} name
        </Typography>
        <TextField
          id="outlined-name"
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <div>
          <Button variant="contained" color="primary" onClick={handleSaveRow}>Save</Button>
          <Cancel variant="contained" onClick={handleClose}>Cancel</Cancel>
        </div>
      </div>
    </Modal>
  )
}