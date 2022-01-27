const mongoose = require('mongoose');

const Artigo = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }

},
{
    timestamps: true,
});

mongoose.model('artigo', Artigo);