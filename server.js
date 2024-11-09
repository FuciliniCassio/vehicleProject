const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static("public"));

const vehicleSelections = { car1: 0, car2: 0, car3: 0 };

// Carrega o arquivo JSON se ele existir
if (fs.existsSync("vehicleSelections.json")) {
  const data = fs.readFileSync("vehicleSelections.json");
  Object.assign(vehicleSelections, JSON.parse(data));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/select-vehicle", (req, res) => {
  const { vehicle } = req.body;
  
  if (vehicleSelections[vehicle] !== undefined) {
    vehicleSelections[vehicle] += 1;
    
    try {
      fs.writeFileSync("vehicleSelections.json", JSON.stringify(vehicleSelections, null, 2));
      res.json({ message: "Escolha registrada com sucesso!" });
    } catch (error) {
      console.error("Erro ao escrever no arquivo:", error);
      res.status(500).json({ message: "Erro ao registrar a escolha." });
    }
  } else {
    res.status(400).json({ message: "Veículo inválido." });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
