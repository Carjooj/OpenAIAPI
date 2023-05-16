const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const { Configuration, OpenAIApi } = require("openai")
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

app.engine("handlebars", handlebars({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function (req, res) {
  res.render("principal")
})

app.post("/", function (req, res) {
  async function runCompletion() {
    const body = req.body
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(body.nome, body.telefone, body.endereco, body.email, body.objetivo, body.exp, body.educacao, body.comp),
      max_tokens: 2048,
      temperature: 1
    });
    let response = completion.data.choices[0].text;
    response = response.split("\n")
    response = response.filter(elements => elements !== "");
    res.render("principal", {response})
  }
  runCompletion();
})

function generatePrompt(nome, telefone, endereco, email, objetivo, exp, educacao, comp) {
  return `Crie um curriculo com essas informações
  Informações: Clodowaldo Oswaldo Nelson, (11) 912345678, Rua Imaginária 102, Bairro Fake, clodowaldo@dominio.com.br, Estágio na área com crescimento profissional e academico, Experiência em suporte de TI, Empresa XYZ, 2019 até 2020, Técnico em TI na Instituição XYZ 2023 até 2025, Proatividade, criatividade e paciência
  Curriculo:
  Nome: Clodowaldo Oswaldo Nelson
  Telefone: (11) 912345678
  Endereço: Rua Imaginária 102, Bairro Fake
  Email: clodowaldo@dominio.com.br
  Objetivo: Estagiar na área de TI para crescimento profissional e academico, e também praticar as habilidades adquiridas
  Experiência: Empresa XYZ: Suporte de TI (2019-2020)
  Educação: Instiuição XYZ: Técnico em TI (2023-2025)
  Competências: Sou uma pessoa Proativa, criativa e paciente
  
  Informações: ${nome}, ${telefone}, ${endereco}, ${email}, ${objetivo}, ${exp}, ${educacao}, ${comp}
  Curriculo: `
}


app.listen(8081, function () {
  console.log("Rodando")
})