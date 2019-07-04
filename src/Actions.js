import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from './Modal';

const useStyles = makeStyles(theme => ({
  button: {
    margin: `${theme.spacing(1)}px 0`,
    width: '100%',
  },
}));

export default (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [newData, setNewData] = React.useState({
      type: 'file',
      name: '',
    });
    const {updateRow} = props;

    const handleOpen = (type) => {
      if (type === 'folder') {
        setNewData({
          type: 'folder',
          name: '',
          child: []
        })
      } else {
        setNewData({
          type: 'file',
          name: '',
        })
      }
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const handleSave = (row) => {
      if (!row.name) {
        return;
      }

      updateRow(row);
      handleClose();
    }
   

    return (
      <>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => handleOpen('folder')}>New folder</Button>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => handleOpen('file')}>New file</Button>

        <Modal
          open={open}
          handleClose={handleClose}
          handleSave={handleSave}
          row={newData}
        />
      </>
    )
  }