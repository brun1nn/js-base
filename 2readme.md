# 🚀 Desafio Técnico: Agregador de Inteligência de Usuários

Este exercício prático foi desenvolvido para consolidar seus conhecimentos em orquestração de APIs, paralelismo e resiliência em JavaScript Moderno.

## 🎯 Objetivo
Criar um script que receba uma lista de IDs de usuários e gere um relatório detalhado de engajamento, cruzando dados de perfis, álbuns e postagens em tempo recorde.

## 🛠️ Requisitos Técnicos

### 1. Orquestração Paralela
Para evitar o efeito de "cascata" (esperar uma requisição terminar para começar outra), você deve utilizar o método `Promise.all()`. Isso permite disparar as chamadas simultaneamente, fazendo com que o tempo total de resposta seja limitado apenas pela requisição mais lenta, gerando um ganho de performance de até 40%.

### 2. Tratamento de Erros Robusto
Diferente de outras bibliotecas, a Fetch API não rejeita a Promise em casos de erro 404 (Não Encontrado) ou 500 (Erro de Servidor). 

*   **Ação Obrigatória:** Você deve verificar manualmente a propriedade `response.ok`. Se for `false`, lance um erro explicitamente para que ele seja capturado pelo bloco `catch`. 
*   **Parsing:** Lembre-se que `response.json()` também é assíncrono e pode falhar se o corpo da resposta não for um JSON válido (ex: o servidor caiu e retornou uma página HTML de erro). 

### 3. Regras de Negócio
*   **Dados Iniciais:** Buscar o perfil do usuário, seus álbuns e seus posts em paralelo. 
*   **Filtro:** Considere apenas os 2 primeiros posts de cada usuário (`.slice(0, 2)`).
*   **Enriquecimento:** Para cada um desses 2 posts, dispare uma busca pelos comentários associados.
*   **Resiliência:** Se um ID de usuário não existir (404), o script não deve parar. Ele deve retornar um objeto indicando o erro para aquele ID específico e continuar processando os demais.

## 🔗 Endpoints (Sandbox: [JSONPlaceholder](https://jsonplaceholder.typicode.com/))
*   **Perfil:** `https://jsonplaceholder.typicode.com/users/{id}`
*   **Álbuns:** `https://jsonplaceholder.typicode.com/users/{id}/albums`
*   **Posts:** `https://jsonplaceholder.typicode.com/users/{id}/posts`
*   **Comentários:** `https://jsonplaceholder.typicode.com/posts/{postId}/comments`

## 💻 Template para o seu arquivo `desafio.js`
Copie o código abaixo para o seu arquivo de script e implemente a lógica nos comentários indicados.

```javascript
/**
 * Função Principal de Agregação
 * @param {Array} userIds - Lista de IDs para processar (ex: [1, 2, 999])
 */
async function gerarRelatorioInteligencia(userIds) {
    console.log("Iniciando processamento assíncrono...");

    const promessasRelatorios = userIds.map(async (id) => {
        try {
            // PASSO 1: Dispare as buscas de Perfil, Álbuns e Posts em paralelo
            // DICA: const [resUser, resAlbums, resPosts] = await Promise.all([ fetch(...), ... ]);

            // PASSO 2: Valide cada resposta com 'ok'. Se falhar, dê um 'throw'
            // if (!resUser.ok) throw new Error(`Usuário ${id} não encontrado`);

            // PASSO 3: Converta as respostas para JSON
            // const [user, albums, posts] = await Promise.all([ resUser.json(), ... ]);

            // PASSO 4: Pegue os 2 primeiros posts e busque os comentários em paralelo
            // const postsLimitados = posts.slice(0, 2);
            // ... implementar busca de comentários para cada post

            return {
                userId: id,
                nome: user.name,
                estatisticas: {
                    totalAlbuns: albums.length,
                    postsRecentes: postsLimitados.map(p => ({
                        titulo: p.title,
                        qtdComentarios: 0 // preencher com o total real de comentários buscados
                    }))
                }
            };

        } catch (erro) {
            // Garante que o erro de um usuário não quebre o loop global
            return { userId: id, erro: erro.message };
        }
    });

    // Aguarda todos os relatórios (sucessos e falhas tratadas)
    const resultados = await Promise.all(promessasRelatorios);
    
    console.log("Relatório Consolidado:");
    console.table(resultados);
    return resultados;
}

// Execução de Teste (O ID 999 deve retornar erro tratado)
gerarRelatorioInteligencia([1, 2, 999]);
```

## ✅ Critérios de Sucesso
1.  O script não deve exibir erros vermelhos (Uncaught) no console, mesmo para o ID 999.
2.  As requisições de um mesmo usuário devem acontecer simultaneamente (verifique a aba Network do navegador).
3.  A saída final deve ser um array de objetos limpos e prontos para o front-end.
