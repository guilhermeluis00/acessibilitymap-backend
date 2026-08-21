require('dotenv').config();
const JWT = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const router = require('./router');
const prisma = require('./lib/prisma');


const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// rota de teste do backend 

app.get('/test_api', async (req, res) => {
  // escreve no console do backend
  console.log('Rota de teste do backend acessada');
  res.json({ message: 'Rota de teste do backend acessada com sucesso!' });
}  )
 
//portServer = 74203

app.listen(61203, () => {
  console.log(`Servidor rodando na porta 61203`);
});