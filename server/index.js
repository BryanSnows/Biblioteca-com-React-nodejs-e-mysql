
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"36638947",
    database:"library",
    
});



app.use(cors());
app.use(express.json())

app.post("/register", (req, res) => {
    const { books_name } = req.body;
    const { author } = req.body;
    const { copies } = req.body;
    const { copies_available } = req.body;


    let SQL = "INSERT INTO new_table ( books_name, author, copies, copies_available) VALUES ( ?,?,?,?) "


    db.query(SQL, [books_name, author, copies, copies_available ], (err,result) => {
        console.log(err);
    });
});


app.post("/search", (req, res) => {
    const { books_name } = req.body;
    const { author } = req.body;
    const { copies } = req.body;
    const { copies_available } = req.body;
  
    let mysql =
      "SELECT * from new_table WHERE books_name = ? AND author = ? AND copies = ? AND copies_available = ?";
    db.query(mysql, [books_name, author, copies, copies_available], (err, result) => {
      if (err) res.send(err);
      res.send(result);
    });
  });

app.get("/getCards", (req, res) => {
    let SQL = "SELECT * from new_table ";

    db.query(SQL, (err, result)=> {
        if (err) console.log(err);
        else res.send(result); 
    });
});

app.put("/edit", (req, res) => {
    const { idnew_table } = req.body;
    const { books_name } = req.body;
    const { author } = req.body;
    const { copies } = req.body;
    const { copies_available } = req.body;
    let mysql = "UPDATE new_table SET books_name = ?, author = ?, copies = ?, copies_available = ? WHERE idnew_table = ?";
    db.query(mysql, [books_name, author, copies, copies_available, idnew_table], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id} = req.params;
    let mysql = "DELETE FROM new_table WHERE idnew_table = ?";
    db.query(mysql, id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });



/*app.get("/", (req, res) => {
    let SQL = 
    "INSERT INTO games( idgames, name, cost, category ) VALUES ('2', 'FAR CRY 5', '120', 'ACAO')";
    
    db.query(SQL, (err, result)=>{
        console.log(err)
    })
});*/



app.listen(3007, () => {
    console.log("rodando servidor")
}); 