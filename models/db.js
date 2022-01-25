const Sequelize = require('sequelize');

const sequelize = new Sequelize("celke", "root", "", {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexão com banco de dados conectado com sucesso");
}).catch(function(){
     console.log("Erro: conexão com banco de dados não realizada com sucesso!");
});
  
module.exports = sequelize;