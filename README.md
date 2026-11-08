# Web Service SOAP — Caixa (Trabalho C)

Trabalho da disciplina de Desenvolvimento Web II. Um Web Service SOAP que
gerencia **produtos** e **vendas** do sistema de Caixa/PDV (o mesmo domínio
dos diagramas de componentes e implantação): uma venda tem vários produtos e
um produto aparece em várias vendas. Tudo com validação nos setters, CRUD
simulado em Map e uma aplicação cliente pra testar.

## Requisitos

- Node.js (qualquer versão LTS serve)
- `npm install` pra baixar o pacote `soap`

## Rodar

Terminal 1 — servidor:

```bash
npm start
```

Vai subir em `http://localhost:8000/caixa` e o WSDL fica em
`http://localhost:8000/caixa?wsdl`.

Terminal 2 — cliente de teste:

```bash
npm run cliente
```

O cliente roda um fluxo completo (criar produtos, criar venda, adicionar
produtos na venda, listar, atualizar, remover/excluir) e no final provoca um
erro de validação pra mostrar o SOAP Fault.

## Prints pra entrega

1. WSDL: abrir `http://localhost:8000/caixa?wsdl` no navegador.
2. Funcionamento: print do terminal do `npm run cliente`.

## Estrutura

```
src/modelo/     Produto.js e Venda.js (validação nos setters)
src/controle/   ProdutoControle.js e VendaControle.js (CRUD em Map)
src/servidor.js servidor SOAP (soap.listen)
src/caixa.wsdl  contrato do serviço
cliente.js      aplicação cliente de teste
```
