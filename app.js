const express = require('express');
const nodemailer = require('nodemailer')
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const process = require('process')
const path = require('path')
const mongoose = require('mongoose')

require("./models/Artigo");
const Artigo = mongoose.model('artigo')

mongoose.connect('mongodb://localhost/leandro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizada com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não foi realizada com sucesso!");
});

const exphbs = require('express-handlebars');
const res = require('express/lib/response');

var handle = exphbs.create({
    defaultLayout: 'main'
});


app.use(express.static('public'));

app.engine('handlebars', handle.engine);
app.set('view engine', 'handlebars');

const port = process.env.PORT || 8080

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({titulo: "Como criar API"});
})

// ENVIANDO OS DADOS PARA O BANCO DE DADOS //
app.post('/artigo', async (req, res) => {
    console.log(req.body)
    const artigo = Artigo.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Artigo não foi cadastrado com sucesso!"
        });
    
        return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        })
    });
});

// ENVIO DE EMAIL PELO FORMULÁRIO //
app.get('/cad', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/send', async (req, res) => {

    const form = ("Nome: " + req.body.name + "\nE-mail: " + req.body.email + "\nTelefone: " + req.body.numbers)

    const transporter = nodemailer.createTransport({
        host: "smtp.live.com",
        port: 587,
        ssl: true,
        auth: {
            user: "testecorretora123@outlook.com",
            pass: "loja1364"
        }
    });

    let message = await transporter.sendMail({
        from: "testecorretora123@outlook.com",
        to: "testecorretora123@outlook.com",
        text: form,
        subject: "Formulário preenchido do seu site",
    });

    if (message) {
        res.send("Formulário enviado com sucesso");
    } else {
        res.sendFile(__dirname + '/public/index.html')
        alert('Formulário não enviado')
    }

});

app.listen(port, () => console.log(`Running on port ${port}!`))