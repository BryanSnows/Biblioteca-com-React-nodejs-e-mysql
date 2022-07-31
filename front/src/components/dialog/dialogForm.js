import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";
import produce from "immer";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    idnew_table: props.idnew_table,
    books_name: props.books_name,
    author: props.author,
    copies: props.copies,
    copies_available: props.copies_available,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditGame = () => {
    Axios.put("http://localhost:3007/edit", {
      idnew_table: editValues.idnew_table,
      books_name: editValues.books_name,
      author: editValues.author,
      copies: editValues.copies,
      copies_available: editValues.copies_available,
      
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.idnew_table == editValues.idnew_table
            ? {

                idnew_table: editValues.idnew_table,
                books_name: editValues.books_name,
                author: editValues.author,
                copies: editValues.copies,
                copies_available: editValues.copies_available,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteGame = () => {
    Axios.delete(`http://localhost:3007/delete/${editValues.idnew_table}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.idnew_table != editValues.idnew_table;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="idnew_table"
            label="idnew_table"
            defaultValue={props.idnew_table}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="books_name"
            label="Nome do Livro"
            defaultValue={props.books_name}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="author"
            label="Autor"
            defaultValue={props.author}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="copies"
            label="Número de Paginas"
            defaultValue={props.copies}
            type="number"
            onChange={handleChangeValues}
            fullWidth
          />

            <TextField
            autoFocus
            margin="dense"
            id="copies_available"
            label="Cópias disponíveis"
            defaultValue={props.copies_available}
            type="number"
            onChange={handleChangeValues}
            fullWidth
            />        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeleteGame()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditGame()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}