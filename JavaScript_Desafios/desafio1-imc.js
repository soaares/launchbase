// Programa para calcular o IMC e nível de obesidade de uma pessoa
// Testando

const nome = 'Raphael';
const peso = 75;
const altura = 1.70;

const imc = peso / (altura * altura);

if( imc > 30) {
    console.log(`${nome} acima do peso.`);
} else {
    console.log(`${nome} você não está acima do peso.`);
}
