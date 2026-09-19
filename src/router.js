const express = require('express');
const { cadastrarUsuario } = require('./cadastro');
const { loginUsuario } = require('./login');
const { exibirUsuario } = require('./dados');
const { atualizarLocalizacao } = require('./localizacao');
const { listarUsuariosVisiveis } = require('./usuarios');
const {
  listarLocaisAcessibilidade,
  criarLocalAcessibilidade,
} = require('./locaisAcessibilidade');
const {
  listarAvaliacoes,
  criarAvaliacao,
  editarAvaliacao,
  removerAvaliacao,
} = require('./avaliacoes');
const { autenticar, apenasAdmin } = require('./middleware/auth');

const router = express.Router();

router.post('/cadastro', cadastrarUsuario);
router.post('/login', loginUsuario);
router.get('/dados/:id', exibirUsuario);
router.patch('/localizacao', autenticar, atualizarLocalizacao);
router.get('/usuarios/mapa', autenticar, apenasAdmin, listarUsuariosVisiveis);
router.get('/locais-acessibilidade', autenticar, listarLocaisAcessibilidade);
router.post('/locais-acessibilidade', autenticar, apenasAdmin, criarLocalAcessibilidade);

router.get('/locais-acessibilidade/:localId/avaliacoes', listarAvaliacoes);
router.post('/locais-acessibilidade/:localId/avaliacoes', autenticar, criarAvaliacao);
router.put('/avaliacoes/:id', autenticar, editarAvaliacao);
router.delete('/avaliacoes/:id', autenticar, removerAvaliacao);

module.exports = router;