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

})();

const Home = require('./models/Home');



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

const UserLogin = [];

app.get('/cadastrar', (req, res) => {
    return res.sendFile(__dirname + '/public/cadastro.html')
})


app.post('/login', async (req, res) => {

    const users = await Home.findAll({
        // ESCOLHER DADOS PARA RECUPERAR,
        attributes: ['name','email','senha'],
        where: {
            // DADOS DO EMAIL QUE FOR DIGITADO NO FORMULÁRIO
            email: `${req.body.name}`
          }

    });
    console.log(users);
   
    console.log(req.body.name);

    console.log(users[0].senha);
    if(users == null){
        return res.status(400).send('Usuário ou Senha Inválida!')
    }
    try{
        if(await bcrypt.compare(req.body.password, users[0].senha)) {
            return res.sendFile(__dirname + '/public/Imoveis.html');
        } else {
            res.send("Senha Inválida")
        }
    } catch {
        res.status(500).send();
    }

});

// ENVIANDO OS DADOS PARA O BANCO DE DADOS //
app.post('/artigo', async (req, res) => {
    console.log(req.body)

    const dados = (req.body)

    dados.senha = await bcrypt.hash(dados.senha, 8);
    console.log(dados)

     try {
         const user = await Home.create(req.body)

         res.sendFile(__dirname + '/public/login.html')
     } catch (err) {
         console.log(err);
         return res.status(400).send({ error : 'Falha no cadastro'});
     }
});


app.post('/login', async (req, res) => {
    const users = await Home.findAll({
        // Aqui você escolhe os dados que quer recuperar,
            // No caso estou trazendo o nome, email e senha
        attributes: ['name','email','senha'],
        where: {
            // vai fazer os dados do email que for digitado no formulário
            email: `${req.body.name}`
          }
    });
    // Aqui vc ve todos os dados recuperados
    console.log(users);
    // Aqui você ve o email recuperado
    console.log(req.body.name);
    // Aqui vc ve a senha recuperada
    console.log(users[0].senha);
    if(users == null){
        return res.status(400).send('não foi possivel encontrar usuário')
    }
    try{
        if(await bcrypt.compare(req.body.password, users[0].senha)) {
            res.send("voce logou com sucesso");
        } else {
            res.send("não deu certo")
        }
    } catch {
        res.status(500).send();
    }

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