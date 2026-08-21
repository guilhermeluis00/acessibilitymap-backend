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

app.get('/test', async (req, res) => {
}  )
 
//portServer = 74203

app.listen(61203, () => {
  console.log(`Servidor rodando na porta 61203`);
});