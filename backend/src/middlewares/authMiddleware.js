const jwt = require("jsonwebtoken");
const Tutor = require("../models/Tutor");
const Professor = require("../models/Professor");

module.exports = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ success: false, error: "Acesso negado" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto");
    let user = await Tutor.findById(decoded.id);
    if (!user) {
      user = await Professor.findById(decoded.id);
    }
    if (!user) {
      return res.status(401).json({ success: false, error: "Usuário não encontrado" });
    }
    req.user = user;
    if (!req.user.role) {
      req.user = {
        _id: user._id,
        nome: user.nome,
        email: user.email,
        role: "professor",
        status: "ativo"
      };
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Token inválido" });
  }
};
