//Carregando módulos
const express = require('express');
const router =express.Router();
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios'); 

//Tratando as rotas de USUÁRIO
    router.get('/listar', (req, res)=>{
        res.render('cadastro/usuario/listar')
    })
    
    router.get('/adicionar', (req, res)=>{
        Usuario.find().then((usuarios)=>{
            res.render('cadastro/usuario/adicionar', {usuarios: usuarios})
        }).catch((err)=>{
            req.flash('error_msg', 'Houve um erro ao listar os usuário'+err)
            res.redirect('/usuario/adicionar')
        })
    })
    
    router.post('/novo', (req, res)=>{
        //validações
        var erros = []

        if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
            erros.push({texto: "Nome inválido"})
        }
        if (erros.length > 0) {
            res.render('/usuario/adicionar', {erros: erros})
        } else{
            const novoUsuario = {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                foto: req.body.foto,
                cargo: req.body.cargo,
                setor: req.body.setor,
                grupoAcesso: req.body.grupoAcesso,
                registro: req.body.registro,
                ativo: req.body.ativo
            }
            new Usuario(novoUsuario).save().then(()=>{
                req.flash('success_msg', 'Usuário cadastrado com sucesso!')
                res.redirect('/usuario/adicionar')
            }).catch((err)=>{
                req.flash('error_msg', 'Houve um erro ao salvar o cadastro do usuário, tente novamente!')
                res.redirect('/usuario/adicionar')
            })
        }
    })

    router.get('/editar/:id', (req, res)=>{
        Usuario.findOne({_id:req.params.id}).then((usuario)=>{
            res.render('cadastro/usuario/editar', {usuario: usuario})
        }).catch((err)=>{
            req.flash('error_msg', 'O id do usuário selecionado não existe'+err)
            res.redirect('/usuario/adicionar')
        })
        /*
        Usuario.find().then((usuarios)=>{
            res.render('cadastro/usuario/editar', {usuarios: usuarios})
        }).catch((err)=>{
            req.flash('error_msg', 'Houve um erro ao listar os usuário'+err)
            res.redirect('/usuario/editar')
        })
        */
        
    })

    router.post('/editar', (req, res)=>{
        Usuario.findOne({_id: req.body.id}).then((usuario)=>{
            usuario.nome = req.body.nome
            usuario.email = req.body.email
            usuario.senha = req.body.senha
            usuario.foto = req.body.foto
            usuario.cargo = req.body.cargo
            usuario.setor = req.body.setor
            usuario.grupoAcesso = req.body.grupoAcesso

            usuario.save().then(()=>{
                req.flash('success_msg', 'Edição de usuário efetuada!')
                res.redirect('/usuario/adicionar')
            }).catch((err)=>{
                req.flash('error_msg', 'Erro ao editar usuário'+err)
                res.redirect('/usuario/adicionar')
            })
        }).catch((err)=>{
            req.flash('error_msg', 'Erro ao editar usuário'+err)
            res.redirect('/usuario/adicionar')
        })
    })

    router.post('/desativar', (req, res)=>{
        Usuario.remove({_id: req.body.id}).then(()=>{
            req.flash('success_msg', 'Usuário desativado!')
            res.redirect('/usuario/adicionar')
        }).catch((err)=>{
            req.flash('error_msg', 'Erro ao desativar usuário'+err)
            res.redirect('/usuario/adicionar')
        })
    })


module.exports = router
