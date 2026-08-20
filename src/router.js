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
const { autenticar, apenasAdmin } = require('./middleware/auth');

const router = express.Router();

router.post('/cadastro', cadastrarUsuario);
router.post('/login', loginUsuario);
router.get('/dados/:id', exibirUsuario);
router.patch('/localizacao', autenticar, atualizarLocalizacao);
router.get('/usuarios/mapa', autenticar, apenasAdmin, listarUsuariosVisiveis);
router.get('/locais-acessibilidade', autenticar, listarLocaisAcessibilidade);
router.post('/locais-acessibilidade', autenticar, apenasAdmin, criarLocalAcessibilidade);

module.exports = router;
