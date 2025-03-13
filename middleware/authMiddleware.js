const jwt = require('jsonwebtoken');

exports.protegerRota = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
  }
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (erro) {
    res.status(401).json({ erro: 'Token inválido.' });
  }
};
