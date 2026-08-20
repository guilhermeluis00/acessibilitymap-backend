const prisma = require('./lib/prisma');

async function listarUsuariosVisiveis(req, res) {
  try {
    const usuarios = await prisma.usuario.findMany({
      where: {
        visualization: true,
        localizationLatitude: { not: null },
        localizationLongitude: { not: null },
      },
      select: {
        id: true,
        name: true,
        role: true,
        localizationLatitude: true,
        localizationLongitude: true,
      },
    });

    return res.json(usuarios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao buscar usuários.' });
  }
}

module.exports = { listarUsuariosVisiveis };
