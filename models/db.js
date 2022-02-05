

const Sequelize = require('sequelize');

const sequelize = new Sequelize('heroku_dda72828eb2af8d', 'b9e7392418e48a', 'e864faac' , {
    host: 'us-cdbr-east-05.cleardb.net',
    dialect: 'mysql',
    port: '3306',
    define: {
        timestamps: false
    }
});

sequelize.authenticate()
.then(() => {
    console.log("no Conexão com o banco de dados realizada com sucesso!");
}).catch(() => {
    console.log("Erro: Conexão com o banco de dados não realizada com sucesso!");
})

module.exports = sequelize;