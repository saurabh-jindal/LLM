const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/llm_database';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

client.connect().then(() => {
    db = client.db('llm_database');
    app.listen(3000, () => console.log('Server running on port 3000'));
});

app.post('/query', async (req, res) => {
    const { model, question } = req.body;
    const response = await fetch('http://localhost:8000/api/query/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
    });

    const data = await response.json();

    const conversation = {
        model,
        question,
        response: data.response,
        date: new Date()
    };
    await db.collection('conversations').insertOne(conversation);
    res.json(data);
});

app.get('/conversations', async (req, res) => {
    const conversations = await db.collection('conversations').find().sort({ date: -1 }).toArray();
    res.json(conversations);
});

app.get('/conversations/:id', async (req, res) => {
    const { id } = req.params;
    const conversation = await db.collection('conversations').findOne({ _id: new ObjectId(id) });
    res.json(conversation);
});
