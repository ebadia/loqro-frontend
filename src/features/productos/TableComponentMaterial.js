import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import * as moment from 'moment';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 500,
  },
});

const TableComponent = ({ classes, productos, onEdit, onAdd, onDelete }) => {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell numeric>Precio</TableCell>
            <TableCell numeric>Oferta</TableCell>
            <TableCell>Desde</TableCell>
            <TableCell>Hasta</TableCell>
            <TableCell>
              <Button variant="fab" mini onClick={() => onAdd()}>
                <AddIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos &&
            productos.map(row => {
              return (
                <TableRow key={row.id} hover={true}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.precio}</TableCell>
                  <TableCell>{row.oferta}</TableCell>
                  <TableCell>{row.desde ? moment(row.desde).format('DD MMMM') : '--'}</TableCell>
                  <TableCell>{row.hasta ? moment(row.hasta).format('DD MMMM') : '--'}</TableCell>
                  <TableCell>
                    <IconButton aria-label="Edit" onClick={() => onEdit(row.id)}>
                      <Create />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => onDelete(row.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Paper>
  );
};

TableComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableComponent);
