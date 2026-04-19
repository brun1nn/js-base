// Seleciona o elemento do botão no DOM usando o ID "myButton" e armazena na variável 'button'

const button = document.querySelector("#botao");

// Seleciona o elemento de parágrafo no DOM usando o ID "myText" e armazena na variável 'text'

const text = document.querySelector("#paragrafo");

// Adiciona um "ouvinte" de evento ao botão. Quando o botão for clicado, a função dentro do 'addEventListener' será executada

button.addEventListener('click', () => {
    text.textContent = 'Hello World';
})


// ============================================== Repetições ==================================================

// const botao = document.querySelector("#button");
// const texto = document.querySelector("#text");

// botao.addEventListener('click', () => {
//     texto.textContent = 'esse é o meu texto!';
// })

// const botaozinho = document.querySelectro("#botazinho");
// const textozinho = document.querySelector("#textozinho");

// botaozinho.addEventListener('click', () => {
//     textozinho.textContent = 'esse é o meu textozinho';
// })

// const sigma = document.querySelector("#sigmazinho");
// const beta = document.querySelector("#betazinho")

// sigma.addEventListener('click', () => {
//     beta.textContent = 'esse é o betazinho';
// })

// const botaozao = document.querySelector("#botaozao");
// const textao = document.querySelector("#textaozao");

// botaozao.addEventListener('click', () => {
//     textao.textContent = '7392';
// });