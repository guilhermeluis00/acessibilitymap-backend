const prisma = require('./lib/prisma');

async function exibirUsuario(request, reply) {
  const { id } = request.params;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: id,
      },
      // O select diz pro Prisma para trazer só esses campos
      select: {
        name: true,
        email: true,
        role: true,
      }
    });

    if (!usuario) {
      return reply.status(404).send({
        error: 'Usuário não encontrado'
      });
    }


    return reply.send(usuario);

  } catch (error) {
    console.error(error);
    return reply.status(500).send({
      error: 'Erro interno ao buscar usuário'
    });
  }
}

module.exports = { exibirUsuario };