const express = require('express');
const nodemailer = require('nodemailer')
const app = express();

const process = require('process')
const path = require('path')
const db = require('./models/db')

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

let login = "admin";
let password = "12345";

app.get('/login', (req, res) => {

    res.sendFile(__dirname + '/public/login.html')
})

app.get('/logado', (req, res) => {

    res.sendFile(__dirname + '/public/logado.html')
})

app.post('/', (req, res) => {
    if (req.body.password == password && req.body.login == login) {
        //logado com sucesso!//

        res.sendFile(__dirname + '/public/logado.html')
    } else {
        res.sendFile(__dirname + '/public/login.html')
    }

})

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
        res.send('Formulário não enviado')
    }

});

app.listen(port, () => console.log(`Running on port ${port}!`))