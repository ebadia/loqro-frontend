import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  button: {
    margin: theme.spacing.unit,
  },
  pregunta: {
    marginTop: 20,
    marginBottom: 20,
  },
});

class ConfirmModal extends Component {
  static propTypes = {
    open: PropTypes.bool,
    label: PropTypes.string,
    handleCancel: PropTypes.func,
    handleConfirm: PropTypes.func,
  };

  render() {
    const { classes, open, label, handleCancel, handleConfirm } = this.props;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            Borrar {label}.
          </Typography>
          <Typography variant="subtitle1" id="pregunta" className={classes.pregunta}>
            ¿Estas seguro?.
          </Typography>
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => handleConfirm()}
            >
              Si
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => handleCancel()}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(ConfirmModal);
