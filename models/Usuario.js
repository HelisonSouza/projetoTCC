const mongoose = require('mongoose');
const moment = require('moment');
//const bcrypt = require('bcryptjs');

const Usuario = new mongoose.Schema({
    nome: {
        type: String, 
        unique: true
    },
    email: {
        type: String, 
        unique: true, 
        lowercase: true
    },
    senha:{
        type: String, 
        select: false
    },
    foto: {
        type: String
    },
    cargo: {
        type: String
    },
    setor:{
        type: String
    },
    grupoAcesso: {
        type: String
    },
    registro: {
        type: Date,
        default: Date.now
    },
    ativo: {
        type: Boolean,
        default: true
    }
});

/*
Usuario.pre('save', (next)=>{

    this.registro = Date.now
    this.registro = moment().format()

    next()
})
*/


/*
//antes de salvar o usuário
schemaUsuario.pre('save', (next) => {
    //o this referece ao objeto que está sendo salvo
    const hash = bcrypt.hash(this.senha, 10);
    this.senha = hash; 

    next(); 
})
*/

mongoose.model('usuarios', Usuario);

