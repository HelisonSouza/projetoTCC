//Carregando módulos
    const express =             require('express')                     //serviço 
    const handlebars =          require('express-handlebars')       //template engine
    const bodyParser =          require('body-parser')              //interpretação de URL
    const mongoose =            require('mongoose')                 //conexão ao MongoDB
    const path =                require('path')
    const session =             require('express-session')
    const flash =               require('connect-flash')                           //módulo para trabalhar com diretórios
    const app =                 express() 
    const usuario =             require('./routes/usuario')
    const programacao =         require('./routes/programacao')

//Configurações
    //Sessão
        app.use(session({
            secret: 'superSecreto',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //Middleware
        app.use((req, res, next)=>{
            res.locals.success_msg = req.flash('success_msg')   //variável global que guarda as mensagens de sucesso
            res.locals.error_msg = req.flash('error_msg')       //variável global que guarda as mensagens de erro
            next();
        })
    //Body-Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
    //Handlerbars -> template engine
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost:27017/dbTCC').then(()=>{
            console.log('=>   Conectado com sucesso ao MongoDB!')
        }).catch((err)=>{
            console.log('=>   Erro de conecção com o MongoBD :/ -> '+err)
        })

    //Arquivos estáticos ->Public
        app.use(express.static(path.join(__dirname,'public')))

//Rotas
    //Grupo de rotas 
    app.use('/usuario', usuario)
    app.use('/programacao', programacao)

    app.get('/', (req, res)=>{
        res.render('./dashboard/home')
        })

//Serviço
    const PORT = 3000;
    app.listen(PORT, ()=>{
        console.log('=>   Servidor rodando na porta 3000!')
    })