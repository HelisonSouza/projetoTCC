//Carregando módulos
const express = require ('express');
const router = express.Router();

//Tratando as rotas de USUÁRIO
    router.get('/listar', (req, res)=>{
        res.render('cadastro/programacao/listar')
    })
    
    router.get('/adicionar', (req, res)=>{
        res.render('cadastro/programacao/adicionar')
    })
    
    router.get('/editar', (req, res)=>{
        res.render('cadastro/programacao/editar')
    })


module.exports = router
