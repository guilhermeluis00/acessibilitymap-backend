const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('./lib/prisma');

async function loginUsuario(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const emailFormatado = email.toLowerCase().trim();

    // Busca no modelo 'usuario'
    const usuario = await prisma.usuario.findUnique({
      where: { email: emailFormatado },
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Compara a senha informada com o campo 'password' do banco
    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // Gera o token
    const token = jwt.sign(
      { userId: usuario.id, role: usuario.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '365d' }
    );

    return res.json({
      message: 'Login realizado com sucesso!',
      token,
      user: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        role: usuario.role,
        isAdmin: usuario.isAdmin,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao tentar fazer login.' });
  }
}

module.exports = { loginUsuario };