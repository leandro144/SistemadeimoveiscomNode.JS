const express = require('express');
const nodemailer = require('nodemailer')
const app = express();
const bcrypt = require('bcrypt');
const process = require('process')
const cors = require('cors');

(async () => {


    const db = require('./models/db')
    
    //SE COLOCAR OS DADOS NO CÓDIGO QUE ESTA COMENTADO ABAIXO OS DADOS VÃO PARA O BANCO DE DADOS 

    // await db.sendUsers({
    //     name: 'antonieta',
    //     email: 'miltretas@teste.com.br',
    //     telefone: '1999999-9999',
    //     data_nascimento: '31/07/1989',
    //     cidade: 'piracicaba',
    //     estado: 'são paulo',
    //     endereco: 'rua das amoras, 1000'
    // });

    // const clientes = await db.selectCustomers();
    // console.log(clientes);
})();

const Home = require('./models/Home')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Acess-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
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

app.get('/cadastrar', (req, res) => {
    return res.sendFile(__dirname + '/public/cadastro.html')
})

app.get('/login', (req, res) => {
    return res.sendFile(__dirname + '/public/login.html')
})

// ENVIANDO OS DADOS PARA O BANCO DE DADOS //
app.post('/artigo', async (req, res) => {
   res.send(req.body);
   var nome = req.body.nome;
   var email = req.body.email;
   var telefone = req.body.telefone;
   var data = req.body.data;
   var cidade = req.body.cidade;
   var estado = req.body.estado;
   var endereco = req.body.endereco;

//    AQUI DA ERRO "ReferenceError: db is not defined"... ENTÃO SE DER UM JEITO DO DB.SENDUSERS SER VISTO ai da certo...
    await Home.create(req.body);

    // name: nome,
    //     email: email,
    //     telefone: telefone,
    //     data_nascimento: data,
    //     cidade: cidade,
    //     estado: estado,
    //     endereco: endereco
   console.log(req.body);

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