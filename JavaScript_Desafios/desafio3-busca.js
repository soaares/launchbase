// Crie uma função que recebe os dados de um objeto de usuário e retorna SE o usuário trabalha com CSS ou não

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

function checkUserCss(user) {
    state = false;
    for(user of user.tecnologias) {
        if(user == 'CSS') {
            state = true;
        }
    }

    return state

}

for(let i = 0; i < users.length; i++){
    const findUserCss = checkUserCss(users[i]);

    if(findUserCss){
        console.log(`O usuário ${users[i].nome} trabalha com CSS`)
    }
}