// Instâncias do Express e do Nunjucks

const express = require('express');
const routes = require('./routes')
const nunjucks = require('nunjucks');
const session = require('./config/session')
const methodOverride = require('method-override')
// Instanciando o server

const server = express();

server.use(session);

server.use((req, res,next) => {
    res.locals.session = req.session;
    next();
});

// Setando o motor (Depois de instalar o nunjucks)

server.set('view engine', 'njk')

// Habilitar o express para envio de dados por formulários
server.use(express.urlencoded({ extended: true }));

// Habilitando o express para localizar os arquivos estáticos
server.use(express.static('public'));

// Configuração para usar a lib 'METHOD-OVERRIDE' que serve para sobrepor o verbo GET/POST para usar PUT/DELETE
server.use(methodOverride('_method'));

// Habilitando o uso das rotas
server.use(routes);

// Configurando o nunjucks
nunjucks.configure('src/app/views', {
    express:server,
    autoescape: false,
    noCache: true
})

// Rodando o servidor na porta 5000
server.listen(5000, function() {
    console.log('Server is running...');
})