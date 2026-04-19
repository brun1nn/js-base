# Programação Assíncrona em JavaScript

## Por que precisamos de programação assíncrona?

O JavaScript é single-threaded: ele executa uma coisa de cada vez. Se o código parar para esperar uma resposta do servidor, a interface trava e nada mais responde.

A programação assíncrona permite que o JavaScript peça dados, continue fazendo outras coisas e depois trate a resposta quando ela chegar.

## A base: Promises, `.then()` e `.catch()` 🤝

Antes do `async/await`, a forma padrão de lidar com operações assíncronas era a Promise (Promessa). Quando você chama `fetch()`, o JavaScript não devolve o dado imediatamente; ele devolve um “ticket” (a Promise) que promete o resultado no futuro.

Para usar esse ticket, aplicamos `then()`. Para lidar com erros, usamos `catch()`.

```js
function buscarUsuarioAntigo() {
  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(resposta => {
      // O primeiro .then() recebe a resposta bruta e a converte
      return resposta.json();
    })
    .then(dados => {
      // O segundo .then() recebe os dados já convertidos
      console.log('Sucesso:', dados.name);
    })
    .catch(erro => {
      // O .catch() captura qualquer erro que aconteça em qualquer .then() acima
      console.error('Deu ruim:', erro);
    });
}
```

### Limitação do `.then()`

Quando há várias operações assíncronas em sequência, o código fica mais difícil de ler e cresce muito para a direita. Esse padrão pode gerar o famoso *callback hell* ou *pyramid of doom*.

## A evolução: `async` e `await` ⏳

`async` e `await` não substituem Promises; eles apenas permitem escrever código assíncrono de forma mais clara e linear, como se fosse síncrono.

- `async` marca uma função como assíncrona.
- `await` pausa a execução da função até que a Promise seja resolvida.

## Segurança com `try` e `catch` 🛡️

Quando usamos `await`, o tratamento de erros costuma ser feito com `try/catch`.

```js
async function buscarUsuarioModerno() {
  try {
    // O código fica linear. O await espera a resposta.
    const resposta = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const dados = await resposta.json();

    console.log('Sucesso:', dados.name);
  } catch (erro) {
    // Se a internet cair no fetch, ou o JSON falhar, ele cai direto aqui.
    console.error('Deu ruim:', erro);
  }
}
```

## Resumo rápido

- Promises são o modelo subjacente para operações assíncronas.
- `then()` e `catch()` funcionam bem, mas podem ser verbosos.
- `async`/`await` deixam o código mais legível.
- `try/catch` é o padrão recomendado para capturar erros em funções assíncronas.

Com esse entendimento, fica mais fácil construir fluxos de dados que não bloqueiam a interface do usuário nem travam a aplicação.