require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Erro de Rejeição Não Tratada: ${err.message}`);
  server.close(() => process.exit(1));
});