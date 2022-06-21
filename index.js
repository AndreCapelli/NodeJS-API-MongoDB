// config inicial
require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

// forma de ler JSON /middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// rotas API
const personRoutes = require("./routes/personRoutes");

app.use("/person", personRoutes);

// rota Inicial / endpoint
app.get("/", (req, res) => {
  // mostrar req

  res.json({ message: "Oi" });
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

// entregar porta
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.dcl8nuj.mongodb.net/bancoapi?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("conectado");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
