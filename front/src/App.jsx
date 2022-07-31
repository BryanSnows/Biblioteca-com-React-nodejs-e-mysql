import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/cards";

export default function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterGame = () => {
    Axios.post("http://localhost:3007/register", {
      books_name: values.books_name,
      author: values.author,
      copies: values.copies,
      copies_available: values.copies_available,
    }).then(() => {
      Axios.post("http://localhost:3007/search", {
        books_name: values.books_name,
        author: values.author,
        copies: values.copies,
        copies_available: values.copies_available,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            idnew_table: response.data[0].idnew_table,
            books_name: values.books_name,
            author: values.author,
            copies: values.copies,
            copies_available: values.copies_available,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3007/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Biblioteca</h1>

        <input
          type="text"
          name="books_name"
          placeholder="Nome do Livro"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Autor"
          name="author"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Páginas"
          name="copies"
          className="register-input"
          onChange={handleaddValues}
        />
         <input
          type="text"
          placeholder="Cópias"
          name="copies_available"
          className="register-input"
          onChange={handleaddValues}
        />

        <button onClick={handleRegisterGame} className="register-button">
          Enviar Livro
        </button>
      </div>
      <div className="container-card">

      {listCard.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.idnew_table}
          idnew_table={val.idnew_table}
          books_name={val.books_name}
          author={val.author}
          copies={val.copies}
          copies_available={val.copies_available}
        />
      ))}
      </div>
    </div>
  );
}