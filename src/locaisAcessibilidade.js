const prisma = require('./lib/prisma');

function coordenadaValida(valor, minimo, maximo) {
  if (valor === undefined || valor === null || valor === '') return false;
  const numero = Number(valor);
  return Number.isFinite(numero) && numero >= minimo && numero <= maximo;
}

async function listarLocaisAcessibilidade(req, res) {
  try {
    const locais = await prisma.localAcessibilidade.findMany({
      where: { visualization: true },
      select: {
        id: true,
        name: true,
        description: true,
        latitude: true,
        longitude: true,
        accessibilityType: true,
      },
      orderBy: { createdat: 'desc' },
    });

    return res.json(locais);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao buscar locais acessíveis.' });
  }
}

async function criarLocalAcessibilidade(req, res) {
  const { name, description, latitude, longitude, accessibilityType } = req.body;
  const nome = typeof name === 'string' ? name.trim() : '';
  const tipo = typeof accessibilityType === 'string' ? accessibilityType.trim() : '';

  if (!nome || !tipo || !coordenadaValida(latitude, -90, 90) || !coordenadaValida(longitude, -180, 180)) {
    return res.status(400).json({
      error: 'Nome, tipo de acessibilidade e coordenadas válidas são obrigatórios.',
    });
  }

  try {
    const local = await prisma.localAcessibilidade.create({
      data: {
        name: nome,
        description: typeof description === 'string' && description.trim() ? description.trim() : null,
        latitude: String(Number(latitude)),
        longitude: String(Number(longitude)),
        accessibilityType: tipo,
      },
    });

    return res.status(201).json(local);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao cadastrar local acessível.' });
  }
}

module.exports = { listarLocaisAcessibilidade, criarLocalAcessibilidade };
