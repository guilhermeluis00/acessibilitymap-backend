const prisma = require('./lib/prisma');

async function atualizarLocalizacao(req, res) {
  const { latitude, longitude } = req.body;

  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'latitude e longitude são obrigatórios.' });
  }

  try {
    const usuario = await prisma.usuario.update({
      where: { id: req.userId },
      data: {
        localizationLatitude: String(latitude),
        localizationLongitude: String(longitude),
      },
      select: {
        id: true,
        localizationLatitude: true,
        localizationLongitude: true,
      },
    });

    return res.json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao atualizar localização.' });
  }
}

module.exports = { atualizarLocalizacao };
