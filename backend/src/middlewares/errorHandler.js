const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: `Recurso não encontrado com o id: ${err.value}`
    });
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: message.join(", ")
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: "Valor de campo duplicado inserido"
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Erro Interno do Servidor"
  });
};

module.exports = errorHandler;
