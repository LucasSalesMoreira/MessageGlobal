const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/teste", (request, response) => response.sendFile("index.html"));
app.listen(process.env.PORT || 3000, () => console.log("Servidor rodando!!!"));

