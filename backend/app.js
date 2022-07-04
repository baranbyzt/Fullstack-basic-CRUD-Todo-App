const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const portNumber = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "admin123",
  database: "fullstack-todo-app"
})

app.get("/getitems", (req, res) => {
  db.query("SELECT * FROM my_notes", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createitem", (req,res) => {
  const category = req.body.category;
  const description = req.body.description;

  db.query(
    "INSERT INTO my_notes (description,category) VALUES (?,?)",
    [description,category],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  )
})

app.post("/deleteitem/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM my_notes WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

app.listen(portNumber,() => {
  console.log(`Listening on port ${portNumber}`)
})