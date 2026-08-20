const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não informado.' });
  }

  const token = authHeader.slice('Bearer '.length);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
}

async function apenasAdmin(req, res, next) {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.userId },
      select: { isAdmin: true },
    });

    if (!usuario?.isAdmin) {
      return res.status(403).json({ error: 'Acesso restrito a administradores.' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao verificar permissões.' });
  }
}

module.exports = { autenticar, apenasAdmin };
