
import React from "react";
import "./cards.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FormDialog
        idnew_table={props.idnew_table}
        open={open}
        setOpen={setOpen}
        books_name={props.books_name}
        author={props.author}
        copies={props.copies}
        copies_available={props.copies_available}
        listCard={props.listCard}
        setListCard={props.setListCard}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <h1 className="card-title">{props.books_name}</h1>
        <p className="card-id">{props.idnew_table}</p>
        <p className="card-author">Autor: {props.author}</p>
        <h3 className="card-pages">Páginas: {props.copies}</h3>
        <h3 className="card-copies">Cópias: {props.copies_available}</h3>
        <h4></h4>
      </div>
    </>
  );
}
