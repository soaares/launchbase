// Programa que armazena um array de usuários (objetos)

const users = [
    { nome: 'Raphael', tecnologias: ['Html', 'CSS'] },
    { nome: 'Lucas', tecnologias: ['Php','CSS'] },
    { nome: 'Carlos', tecnologias: ['Html','Python'] }
]

function showUsers() {

    for(user of users) {
        console.log(user.nome + ' trabalha com ' + user.tecnologias)
    }

}

showUsers();