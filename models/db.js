

const Sequelize = require('sequelize');

const sequelize = new Sequelize('celke', 'root', 'root' , {
    host: 'localhost',
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