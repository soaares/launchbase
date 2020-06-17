// Programa para calcular a aposentadoria de uma pessoa

const nome = 'Raphael';
const sexo = 'M';
const idade = 26;
const contribuicao = 8;

if (sexo == 'M') {
    if (contribuicao >= 35) {
        const regraHomem = contribuicao + idade;

        if (regraHomem >= 95) {
            console.log(`${nome}, você pode se aposentar!`)
        } else {
            console.log(`${nome}, você não pode se aposentar!`)
        }

    } else {
        console.log(`${nome}, você não pode se aposentar!`)
    }
} else if (sexo == 'F') {
    if(contribuicao >= 30) {
        const regraHomem = contribuicao + idade;

        if(regraHomem >= 85){
            console.log(`${nome}, você pode se aposentar!`)
        } else {
            console.log(`${nome}, você não pode se aposentar!`)
        }

    } else {
        console.log(`${nome}, você não pode se aposentar!`)
    }
} else {
    console.log('Sexo não identificado!')
}