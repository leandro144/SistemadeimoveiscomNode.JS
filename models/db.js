async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
    }
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:root@localhost:3306/celke");
    console.log('Conectou no banco');
    global.connection = connection;
    return connection;
}

connect();

// função para buscar os dados do banco
async function selectCustomers(){
    const conn = await connect();
    const rows = conn.query('SELECT * FROM homes;')
    return await rows;
}


// Função para enviar os dados ao banco
async function sendUsers(costumer){
    const conn = await connect();
    const sql = 'INSERT INTO homes (name, email, telefone, data_nascimento, cidade, estado, endereco) VALUES (?,?,?,?,?,?,?);';
    const values = [costumer.name, costumer.email, costumer.telefone, costumer.data_nascimento, costumer.cidade, costumer.estado, costumer.endereco];
    await conn.query(sql,values);
    // return await send;
}

module.exports = {selectCustomers, sendUsers};




// Pode deletar se não for fazer mais dessa maneira 



const Sequelize = require('sequelize');

const sequelize = new Sequelize('celke', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

sequelize.authenticate()
.then(() => {
    console.log(" Conexão com o banco de dados realizada com sucesso!");
}).catch(() => {
    console.log("Erro: Conexão com o banco de dados não realizada com sucesso!");
})

module.exports = sequelize;