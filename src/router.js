const express = require('express');
const JWT = require('jsonwebtoken');
const { cadastrarUsuario } = require('./cadastro');
const { loginUsuario } = require('./login');
const prisma = require('./lib/prisma');

const router = express.Router();

router.post('/cadastro', cadastrarUsuario);
router.post('/login', loginUsuario);

module.exports = router;