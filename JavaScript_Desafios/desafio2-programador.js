// Programa com um objeto para armazenar dados de um programador

const programador = {
    nome: 'Raphael',
    idade: 26,
    tecnologias: [
        {nome: 'Python', especialidade: 'Data Science'},
        {nome: 'C++', especialidade: 'Desktop'}
    ]
}

console.log(`O usuário ${programador.nome} tem ${programador.idade} anos e usa a tecnologia ${programador.tecnologias[0].nome} com especialidade em ${programador.tecnologias[0].especialidade}`)