const express = require('express');
const nodemailer = require('nodemailer')
const app = express();
const bcrypt = require('bcrypt');

const process = require('process')
const path = require('path')
const db = require('./models/db')
const User = require('./models/User')

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

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

// ENVIANDO OS DADOS PARA O BANCO DE DADOS //
app.post('/cadastrar', async (req, res) => {
    console.log(req.body);
    let dados = req.body
    dados.password = await bcrypt.hash(dados.password, 8);

    console.log(dados);

    await User.create(dados)
    .then(() => {
        return res.json ({
            erro: false,
            mensagem: "Usuario cadastrado com sucesso"
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: " Erro: Usuario não cadastrado com sucesso"
        });
    });
})

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