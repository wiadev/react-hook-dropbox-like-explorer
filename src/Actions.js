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
  button: {
    margin: `${theme.spacing(1)}px 0`,
    width: '100%',
  },
}));

export default (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState('folder');
    const [name, setName] = React.useState();
    const {updateRow} = props;

    const handleOpen = (type) => {
      setOpen(true);
      setType(type);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const handleSave = () => {
      if (!name) {
        return;
      }
      
      if (type === 'folder') {
        updateRow({
          type: 'folder',
          name,
          child: []
        })
      } else {
        updateRow({
          type: 'file',
          name,
        })
      }
      setName();
      handleClose();
    }
   

    return (
      <>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => handleOpen('folder')}>New folder</Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => handleOpen('file')}>New file</Button>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Input a {type} name
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
              <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
              <Cancel variant="contained" onClick={handleClose}>Cancel</Cancel>
            </div>
          </div>
        </Modal>
      </>
    )
  }