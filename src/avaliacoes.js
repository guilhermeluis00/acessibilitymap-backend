const prisma = require('./lib/prisma');

async function recalcularMedia(localId) {
  const stats = await prisma.avaliacao.aggregate({
    where: { localId },
    _avg: { nota: true },
    _count: { id: true },
  });

  await prisma.localAcessibilidade.update({
    where: { id: localId },
    data: {
      mediaAvaliacoes: stats._avg.nota || 0,
      totalAvaliacoes: stats._count.id,
    },
  });
}

// GET /locais-acessibilidade/:localId/avaliacoes (pública, sem autenticar)
async function listarAvaliacoes(req, res) {
  try {
    const avaliacoes = await prisma.avaliacao.findMany({
      where: { localId: req.params.localId },
      include: { usuario: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(avaliacoes);
  } catch (error) {
    console.error('Erro em listarAvaliacoes:', error);
    res.status(500).json({ error: 'Erro ao buscar avaliações.' });
  }
}

// POST /locais-acessibilidade/:localId/avaliacoes
async function criarAvaliacao(req, res) {
  const { nota, comentario } = req.body;
  const { localId } = req.params;
  const userId = req.userId;

  if (!nota || nota < 1 || nota > 5) {
    return res.status(400).json({ error: 'Nota deve ser entre 1 e 5.' });
  }

  try {
    const local = await prisma.localAcessibilidade.findUnique({ where: { id: localId } });
    if (!local) return res.status(404).json({ error: 'Local não encontrado.' });

    const avaliacao = await prisma.avaliacao.create({
      data: { nota, comentario, localId, userId },
    });

    await recalcularMedia(localId);

    res.status(201).json(avaliacao);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Você já avaliou este local.' });
    }
    console.error('Erro em criarAvaliacao:', error);
    res.status(500).json({ error: 'Erro ao criar avaliação.' });
  }
}

// PUT /avaliacoes/:id
async function editarAvaliacao(req, res) {
  const { id } = req.params;
  const { nota, comentario } = req.body;

  if (!nota || nota < 1 || nota > 5) {
    return res.status(400).json({ error: 'Nota deve ser entre 1 e 5.' });
  }

  try {
    const avaliacao = await prisma.avaliacao.findUnique({ where: { id } });
    if (!avaliacao) return res.status(404).json({ error: 'Avaliação não encontrada.' });
    if (avaliacao.userId !== req.userId) return res.status(403).json({ error: 'Sem permissão.' });

    const atualizada = await prisma.avaliacao.update({
      where: { id },
      data: { nota, comentario },
    });

    await recalcularMedia(avaliacao.localId);

    res.json(atualizada);
  } catch (error) {
    console.error('Erro em editarAvaliacao:', error);
    res.status(500).json({ error: 'Erro ao atualizar avaliação.' });
  }
}

// DELETE /avaliacoes/:id
async function removerAvaliacao(req, res) {
  const { id } = req.params;

  try {
    const avaliacao = await prisma.avaliacao.findUnique({ where: { id } });
    if (!avaliacao) return res.status(404).json({ error: 'Avaliação não encontrada.' });
    if (avaliacao.userId !== req.userId) return res.status(403).json({ error: 'Sem permissão.' });

    await prisma.avaliacao.delete({ where: { id } });
    await recalcularMedia(avaliacao.localId);

    res.status(204).send();
  } catch (error) {
    console.error('Erro em removerAvaliacao:', error);
    res.status(500).json({ error: 'Erro ao remover avaliação.' });
  }
}

module.exports = {
  listarAvaliacoes,
  criarAvaliacao,
  editarAvaliacao,
  removerAvaliacao,
};