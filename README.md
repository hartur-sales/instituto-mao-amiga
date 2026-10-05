# Instituto Mão Amiga

Aplicativo mobile para apoiar o Instituto Mão Amiga no cadastro de pontos de
coleta e no controle das doações recebidas.

O app permite registrar doações, consultar o histórico salvo no aparelho,
filtrar os registros por tipo de item, visualizar um resumo dos totais, editar
informações cadastradas e excluir registros com confirmação.

## Visão geral

| Área | O que é possível fazer |
| --- | --- |
| **Pontos de Coleta** | Cadastrar pontos e consultar seus detalhes |
| **Cadastro de Doação** | Informar tipo, quantidade e ponto de destino |
| **Doações** | Visualizar, filtrar e resumir as doações registradas |
| **Detalhe da Doação** | Consultar, editar ou excluir uma doação |

As doações e os pontos são persistidos localmente com `AsyncStorage`. Por isso,
os registros continuam disponíveis depois que o aplicativo é fechado e aberto
novamente no mesmo aparelho.

## Tecnologias

- React Native
- Expo SDK 57
- TypeScript
- React Navigation Native Stack
- AsyncStorage
- `@react-native-picker/picker`
- React Native Web

## Como executar

### Pré-requisitos

- Node.js instalado
- npm instalado
- Emulador Android, simulador iOS, dispositivo físico ou navegador

### Instalação

Na raiz do projeto, instale as dependências:

```bash
npm install
```

### Iniciar o projeto

```bash
npx expo start
```

Se a conexão local não funcionar no dispositivo ou na rede atual, use o modo
túnel:

```bash
npx expo start --tunnel
```

Depois, escolha o destino no terminal do Expo:

| Destino | Comando |
| --- | --- |
| Navegador | `npx expo start --web` |
| Android | `npm run android` |
| iOS | `npm run ios` |

## Fluxo de navegação

O fluxo principal do aplicativo é:

```text
Pontos de Coleta
      │
      ├── botão + ──> Cadastro de Doação
      │
      └── botão Doações ──> Histórico de Doações
                              │
                              ├── busca por tipo
                              ├── botão + ──> Cadastro de Doação
                              └── toque em um item ──> Detalhe da Doação
                                                           │
                                                           ├── Editar
                                                           └── Excluir
```

As telas principais possuem acesso direto entre **Pontos de Coleta** e
**Doações**. O cadastro, o detalhe e a edição são fluxos temporários e usam o
botão nativo de voltar para retornar à tela anterior.

## Roteiro de demonstração

O roteiro abaixo foi preparado para uma demonstração de aproximadamente três
minutos. Para deixar o fluxo mais claro, use valores fáceis de conferir, como
duas doações do tipo `Roupa` com quantidades diferentes.

### 1. Registrar uma doação

1. Inicie o app na tela **Pontos de Coleta**.
2. Toque no botão flutuante `+`.
3. No campo **Tipo do item**, informe `Roupa`.
4. No campo **Quantidade**, informe `5`.
5. Em **Ponto de destino**, selecione um ponto de coleta.
6. Toque em **Registrar doação**.
7. Repita o cadastro com outra doação do tipo `Roupa`, por exemplo, com
   quantidade `10`.

**Resultado esperado:** as duas doações são salvas com identificadores
próprios e aparecem no histórico quando ele for aberto.

### 2. Abrir o histórico e mostrar o resumo

1. Na tela de pontos, toque em **Doações**, no cabeçalho.
2. Mostre o cartão **Resumo de doações**.
3. Destaque o total de doações e o agrupamento:

   ```text
   Roupa: 15 unidades em 2 doações
   ```

4. Mostre que cada item apresenta tipo, quantidade, ponto de destino e data.

**Resultado esperado:** o resumo é ordenado pela maior quantidade total e
reflete o conteúdo atual do histórico.

### 3. Filtrar por tipo de item

1. Toque no campo **Buscar por tipo de item**.
2. Digite `roup`.
3. Mostre que apenas os registros cujo tipo contém esse texto continuam na
   lista, sem diferença entre letras maiúsculas e minúsculas.
4. Apague o texto digitado.

**Resultado esperado:** ao limpar a busca, todas as doações voltam a aparecer.
Se for digitado um termo sem correspondência, a tela informa o texto buscado.

### 4. Editar uma doação

1. Toque em uma doação do histórico.
2. Na tela **Detalhe da Doação**, confira os valores atuais.
3. Toque em **Editar doação**.
4. Confirme que o formulário já está preenchido.
5. Altere a quantidade de `5` para `8`.
6. Toque em **Salvar alterações**.

**Resultado esperado:** o detalhe volta a mostrar a quantidade `8`, sem criar
uma segunda doação. O histórico e o resumo também passam a usar o novo valor.

Para demonstrar o cancelamento, abra a edição novamente, mude um campo e toque
em **Cancelar**. Os dados originais devem permanecer inalterados.

### 5. Excluir uma doação

1. Na tela de detalhe, toque em **Excluir doação**.
2. No alerta, escolha **Cancelar** e confirme que a doação continua na tela.
3. Abra o alerta novamente.
4. Escolha **Excluir**.

**Resultado esperado:** a doação é removida do armazenamento, o app retorna ao
histórico e o item desaparece sem fechar o aplicativo. O resumo também é
atualizado.

### 6. Fechar e reabrir o app

1. Cadastre ou mantenha pelo menos uma doação salva.
2. Feche completamente o app ou a aba do navegador.
3. Inicie o app novamente.
4. Abra **Doações**.

**Resultado esperado:** os registros continuam disponíveis, demonstrando que a
persistência local foi mantida.

## Checklist de acabamento

- [ ] Histórico testado em uma tela estreita e em uma tela larga.
- [ ] Detalhe testado em uma tela estreita e em uma tela larga.
- [ ] Edição testada em uma tela estreita e em uma tela larga.
- [ ] Nenhum texto fica cortado ou sobreposto.
- [ ] Botões e campos possuem área de toque mínima de 44 px.
- [ ] Busca e edição continuam visíveis com o teclado aberto.
- [ ] Cancelar a edição não altera a doação.
- [ ] Confirmar a exclusão remove o registro sem reiniciar o app.
- [ ] Reabrir o app mantém os registros salvos.

## Decisões técnicas

### Totais calculados, não persistidos

O resumo é calculado a partir do array atual de doações. Não existe uma
segunda cópia dos totais no `AsyncStorage`.

Essa decisão evita inconsistências: depois de registrar, editar ou excluir
uma doação, o resumo é recalculado automaticamente a partir da fonte de
verdade atual.

### Acesso ao armazenamento centralizado

As operações de persistência ficam em `src/services/doacoesStorage.ts` e
`src/services/pontosStorage.ts`. As telas não manipulam diretamente o
`AsyncStorage`; elas recebem dados e callbacks da camada de estado da aplicação.

Isso mantém a interface responsável pela apresentação e concentra as regras de
leitura, criação, atualização e exclusão em um único lugar.

### Formulário reutilizado

A criação e a edição usam `TelaCadastroDoacao`. Na edição, a doação é enviada
por `route.params`, os campos são preenchidos e as mesmas validações do
cadastro são executadas. Assim, não há duas implementações diferentes do
formulário.

## Estrutura principal

```text
App.tsx
└── src
    ├── components
    │   ├── DoacaoHistoricoItem.tsx
    │   ├── HeaderButton.tsx
    │   └── ResumoDoacoes.tsx
    ├── entities
    │   ├── doacao.ts
    │   └── ponto.ts
    ├── hooks
    │   └── useAppData.ts
    ├── navigation
    │   └── AppNavigator.tsx
    ├── screens
    │   ├── TelaCadastroDoacao.tsx
    │   ├── TelaDetalheDoacao.tsx
    │   ├── TelaHistoricoDoacoes.tsx
    │   └── TelaListaPontos.tsx
    └── services
        ├── doacoesStorage.ts
        └── pontosStorage.ts
```

## Escopo atual

O aplicativo contempla cadastro, consulta, filtro, resumo, edição e exclusão
de doações, além do cadastro e consulta de pontos de coleta.

Não fazem parte deste escopo:

- histórico de alterações;
- filtros combinados por data ou ponto de destino;
- gráficos;
- edição ou exclusão de pontos;
- detalhes adicionais não presentes na entidade de doação.
