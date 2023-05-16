/*const { Configuration, OpenAIApi } = require("openai");
import('dotenv').config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Say this is a test",
  max_tokens: 7,
  temperature: 0,
});
console.log("teste")*/



const { Configuration, OpenAIApi } = require("openai")
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion () {
    
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt("clodowaldo", "11999615887", "rua teste", "email@teste.com", "Estágio na area x", "Atendimento da Empresa Y, 2019 até 2020", "Bacharel em Administração, instituição POP, 2022 até 2024", "Criatividade"),
      max_tokens: 2048,
      temperature: 1
    });
    console.log(completion.data.choices[0].text);
}
runCompletion();

/*export default async function (req, res) {

    const nome = req.body.nome
    const telefone = req.body.telefone
    const endereco = req.body.endereco
    const email = req.body.email
    const objetivo = req.body.objetivo 
    const exp = req.body.exp
    const educacao = req.body.educacao
    const comp = req.body.comp
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(nome, telefone, endereco, email, objetivo, exp, educacao, comp),
            temperature: 1,Estou muito bem, obrigada!',
    index: 0,
        });
       res.send(completion.data.choices[0].text)
    } catch(erro) {
        res.send("Erro: " + erro)
    }

}*/

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
    Curriculo:`
}
