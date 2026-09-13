const express = require("express");
const app = express();
const PORTA = 4000;

const produtos = [
  { id: 1, nome: "Teclado USB", preco: 120.00, destaque: false },
  { id: 2, nome: "Mouse sem fio", preco: 89.90, destaque: true },
  { id: 3, nome: "Monitor 24 polegadas", preco: 899.00, destaque: false }
];

app.get("/", (req, res) => {
  res.json({ mensagem: "Bem-vindo à API de Produtos!" });
});

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

// added as part of the challenge to return only products with destaque = true
app.get("/produtos/destaque", (req, res) => {
  res.json(produtos.filter(produto => produto.destaque === true));
});

// dynamic route to get a product by its ID needs to be the last route to avoid conflicts with other routes 
// express is a bitch 
app.get("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find(item => item.id === id);
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }
  res.json(produto);
});

app.listen(PORTA, "0.0.0.0", () => {
  console.log(`API de Produtos executando na porta ${PORTA}`);
});
