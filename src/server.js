const express = require("express");
const app = express();
const port = 3000;
const ip = "192.168.1.66";

app.use(express.static(__dirname + "/public"));

app.get("/", (request, response) => response.sendFile("index.html"));
app.listen(process.env.port || port, () => console.log("Servidor rodando na porta "+port));