const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Public')));

const playersFilePath = path.join(__dirname, '../players.json');

// Endpoint para obter todos os jogadores
app.get('/players', (req, res) => {
    fs.readFile(playersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de jogadores:', err);
            res.status(500).send('Erro ao ler o arquivo de jogadores');
            return;
        }
        const players = JSON.parse(data);
        res.json(players);
    });
});

// Endpoint para adicionar um novo jogador
app.post('/players', (req, res) => {
    const newPlayer = req.body;
    console.log('Novo jogador recebido:', newPlayer);

    fs.readFile(playersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de jogadores:', err);
            res.status(500).send('Erro ao ler o arquivo de jogadores');
            return;
        }
        const players = JSON.parse(data);
        players.push(newPlayer);
        console.log('Jogadores atualizados:', players);

        fs.writeFile(playersFilePath, JSON.stringify(players, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao salvar o novo jogador:', err);
                res.status(500).send('Erro ao salvar o novo jogador');
                return;
            }
            res.status(201).send('Jogador adicionado com sucesso');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/players', (req, res) => {
    fs.readFile(playersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo de jogadores:', err);
            res.status(500).send('Erro ao ler o arquivo de jogadores');
            return;
        }
        const players = JSON.parse(data);
        res.json(players);
    });
});