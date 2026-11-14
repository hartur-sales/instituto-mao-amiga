# Instituto Mão Amiga - Projeto N2

Aplicativo Expo/React Native que consome a API Spring Boot em `backend/`.
Pontos de coleta e doações são persistidos no servidor; somente os IDs dos
pontos favoritos ficam no `AsyncStorage`.

## Como executar

Requisitos: Node.js/npm e Java 25 (versão definida em `backend/pom.xml`).

```bash
npm install
cp .env.example .env
npm run backend
npx expo start
```

No `.env`, use `http://localhost:8080/api/v1` no navegador/iOS,
`http://10.0.2.2:8080/api/v1` no emulador Android ou
`http://IP_DO_COMPUTADOR:8080/api/v1` em um celular na mesma rede. A API fica
em `http://localhost:8080`.

Para testar no celular físico, o computador e o celular precisam estar na mesma
rede Wi-Fi e a porta `8080` precisa estar acessível. O IP usado pelo app é
alterado somente em `.env`, na variável `EXPO_PUBLIC_API_URL`.

## API

Swagger: `http://localhost:8080/swagger-ui/index.html`

Pontos:

- `GET /api/v1/pontos/filtro?filtro=&page=0&size=10`
- `GET /api/v1/pontos/{id}`
- `POST /api/v1/pontos`
- `PUT /api/v1/pontos/{id}`
- `DELETE /api/v1/pontos/{id}`

O cadastro de ponto usa `nome`, `endereco`, `bairro`, `horario` e `tipo`
(`coleta` ou `distribuição`). A busca filtra por nome ou bairro e retorna
`content` e `page`.

Doações:

- `GET /api/v1/doacoes/filtro?filtro=&page=0&size=10`
- `GET /api/v1/doacoes/{id}`
- `POST /api/v1/doacoes`
- `PUT /api/v1/doacoes/{id}`
- `DELETE /api/v1/doacoes/{id}`

O cadastro usa `tipoItem`, `quantidade` maior que zero e `pontoDestino` com o
nome do ponto. `criadoEm` é definido pela API e não muda na edição. IDs são
UUIDs. O banco H2 grava em arquivo em `backend/data/maoamiga`.

Exemplos de busca:

```text
/api/v1/pontos/filtro?filtro=&page=0&size=10
/api/v1/pontos/filtro?filtro=Bueno&page=0&size=10
/api/v1/pontos/filtro?filtro=&page=1&size=10
```

As três respostas têm o formato abaixo; `content` contém os pontos da página
e `page` informa a paginação:

```json
{
  "content": [
    {
      "id": "uuid-do-ponto",
      "nome": "Instituto Recomeçar",
      "endereco": "Rua 1, 100",
      "bairro": "Setor Bueno",
      "horario": "Seg a Sex, 8h às 17h",
      "tipo": "coleta"
    }
  ],
  "page": {
    "size": 10,
    "number": 0,
    "totalElements": 25,
    "totalPages": 3
  }
}
```

O filtro por bairro usa comparação sem diferenciar maiúsculas e minúsculas.
Para mudar a ordenação, por exemplo, use
`/api/v1/pontos/filtro?filtro=&page=0&size=10&sort=bairro,asc`.

Para doações, o filtro padrão ordena pela data de cadastro, da mais nova para a
mais antiga:

```text
/api/v1/doacoes/filtro?filtro=&page=0&size=10
/api/v1/doacoes/filtro?filtro=roupa&page=0&size=10
/api/v1/doacoes/filtro?filtro=&page=1&size=10
```

O Swagger permite verificar as respostas de sucesso, validação `400` (campo
obrigatório vazio ou quantidade inválida) e recurso inexistente `404`.

## Evidências do Swagger

Adicionar ao entregar os prints das operações abaixo, feitos em
`http://localhost:8080/swagger-ui/index.html`:

- Pontos: `GET` lista, `GET` por ID, `POST`, `PUT`, `DELETE`, uma resposta `400`
  e uma resposta `404`.
- Pontos filtrados: chamada sem filtro, filtro por bairro e segunda página.
- Doações: `GET` filtrado, `GET` por ID, `POST`, `PUT`, `DELETE`, uma resposta
  `400` e uma resposta `404`.

Os prints devem mostrar a URL/parâmetros enviados e o corpo da resposta.

## Roteiro de demonstração

1. Buscar um ponto por nome/bairro e abrir seu detalhe.
2. Cadastrar, editar e excluir um ponto.
3. Favoritar um ponto, abrir **Meus pontos** e mostrar a persistência.
4. Cadastrar uma doação, editar e excluir pelo histórico.
5. No Swagger, demonstrar um `400` de validação e um `404` com UUID inexistente.
