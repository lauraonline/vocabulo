import { createTablePalavra, insertPalavra, selectPalavras, selectPalavraById, updatePalavra, deletePalavra } from './controller/Palavra.js';

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

createTablePalavra();

app.get('/', function(req,res){
    res.send("Olá mundo!");
})

// GET /palavra Lista todas as palavras
app.get('/palavra', async function(req,res){
    const palavras = await selectPalavras();
    res.json(palavras);
})

// GET /palavra/:id Busca palavra por ID
app.get('/palavra/:id', async function(req,res){
    const palavra = await selectPalavraById(req.params.id);
    res.json(palavra);
})

// POST /palavra Adiciona nova palavra
app.post('/palavra', function(req,res){
    insertPalavra(req.body);
    res.json({
        "statusCode": 200
    })
})

// PUT /palavra Atualiza palavra
app.put('/palavra', function(req,res){
    if(req.body && !req.body.id){
        res.json({
            "statusCode": 400,
            "msg": "Você precisa informar o id"
        })
    }else{
        updatePalavra(req.body);
        res.json({
            "statusCode": 200
        })
    }
})

// DELETE /palavra/:id Remove palavra
app.delete('/palavra/:id', function(req,res){
    deletePalavra(req.params.id);
    res.json({
        "statusCode": 200
    })
})

app.listen(3000, ()=>console.log("API rodando na porta 3000"))