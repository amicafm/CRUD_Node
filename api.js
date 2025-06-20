import express from "express";

const app = express();
const PORT = 3000;

//RAIZ
app.get('/', (req, res) =>{
    res.send("Bem vindo a API CRUD de clientes criada para aprendizado de Node :D")
})

// CREATE
app.post("/cliente", async (req, res) => {
  try {
    const data = {
      id: req.body.id || req.query.id,
      nome: req.body.nome || req.query.nome,
      idade: req.body.idade || req.query.idade,
      sexo: req.body.sexo || req.query.sexo,
      status: req.body.status || req.query.status
    };
    const novoCliente = await Pessoa.create({
      id: Number(data.id),
      nome: data.nome,
      idade: Number(data.idade),
      sexo: data.sexo,
      status: data.status
    });
    console.log("Novo cliente adicionado!", novoCliente);
    res.json(novoCliente);
  } catch (error) {
    console.log("Erro ao adicionar cliente:", error);
    res.status(500).json({ error: "Erro ao adicionar cliente" });
  }
});

// READ
app.post("/clientes", async (req, res) => {
  try {
    const clientes = await Pessoa.find();
    res.json(clientes);
    console.log("Lista de clientes:", clientes);
  } catch (error) {
    console.log("Erro ao listar clientes:", error);
    res.status(500).json({ error: "Erro ao listar clientes" });
  }
});

// UPDATE
app.post("/cliente/:id", async (req, res) => {
  try {
    const data = {
      nome: req.body.nome || req.query.nome,
      idade: req.body.idade || req.query.idade,
      sexo: req.body.sexo || req.query.sexo,
      status: req.body.status || req.query.status
    };
    const clienteX = await Pessoa.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );
    res.json(clienteX);
    console.log("Cliente alterado:", clienteX);
  } catch (error) {
    console.log("Erro ao alterar cliente:", error);
    res.status(500).json({ error: "Erro ao alterar cliente" });
  }
});

// DELETE
app.delete("/cliente/:id", async (req, res) => {
  try {
    const clienteX = await Pessoa.findByIdAndDelete(req.params.id);
    res.json(clienteX);
    console.log("Cliente deletado:", clienteX);
  } catch (error) {
    console.log("Erro ao deletar cliente:", error);
    res.status(500).json({ error: "Erro ao deletar cliente" });
  }
});

app.listen(PORT, () => console.log('O servidor esta rodando na porta' + PORT));
