const path = require("path");
const express = require("express");
// A linha a seguir não é necessária a partir da versão 4 do Express
const bodyParser = require("body-parser");

const app = express();


// A partir da versão 4 do Express, é possível substituir a linha abaixo por app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/add", (req, res) => {
  const { a, b } = req.body;
  res.send({
    result: parseInt(a) + parseInt(b)
  });
});

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});