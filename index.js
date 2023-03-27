const express = require('express')
const app = express()

const pessoas=[]

app.listen('3000')

//midleware
app.use(express.json())
//get
app.get('/pessoa/:id',(req, res) =>{
    const id = req.params.id
    const pessoa = pessoas.find(p => p.id == id)
    if (!pessoa) {
        res.set('Status-code',404)
        res.status(404).send("Não tem nada aqui :c")
    }
    res.set('Status-code',200)
    res.send(`pessoa ${pessoa.nome}`)
})



//post
app.post('/pessoa/',(req,res) =>{
    const {nome, idade} = req.body

    const maisPessoas ={
        id : pessoas.length + 1,
        nome,
        idade
    }
    pessoas.push(maisPessoas)
    res.send(`${req.body.nome} ${req.body.idade}`)
})
//put
app.put('/pessoa/:id',(req,res) => {

    const id = req.params.id
    const pessoa = pessoas.find(p => p.id == id)
    const index = pessoas.findIndex(p => p.id == id)

    if (!pessoa){
        res.set('Status-code',404)
        res.status(404).send("Não tem nada aqui :c")
    }

    const {nome, idade} = req.body

    const pessoaRenew = {
        id : pessoa.id,
        nome,
        idade
    }
    pessoas[index]=pessoaRenew
    res.set('Status-code',200)
    res.set('pessoa-nome', pessoaRenew.nome)
    res.json(pessoaRenew)

})
//delete
app.delete('/pessoa/:id',(req,res)=>{
    const id = req.params.id
    const pessoa = pessoas.find(p => p.id == id)
    const index = pessoas.findIndex(p => p.id == id)

    if (!pessoa){
        res.set('Status-code',404)
        res.status(404).send("Não tem nada aqui :c")
    }

    pessoas.splice(index, 1)
    res.set('status-code', 204)
    res.set('pessoa-nome', pessoa.nome)
    res.status(204).end()
})

app.patch('/pessoa/:id',(req,res) => {

    const id = req.params.id
    const pessoa = pessoas.find(p => p.id == id)
    const index = pessoas.findIndex(p => p.id == id)

    if (!pessoa){
        res.set('Status-code',404)
        res.status(404).send("Não tem nada aqui :c")
    }

    const {nome, idade} = req.body

    const pessoaRenew = {
        id : pessoa.id,
        nome:nome || pessoa.nome,
        idade: idade || pessoa.idade
    }
    pessoas[index]=pessoaRenew
    res.set('Status-code',200)
    res.set('pessoa-nome', pessoaRenew.nome)
    res.json(pessoaRenew)

})

app.options('/pessoa/:id',(req,res) => {
    res.set("Allow","GET,POST,PUT,DELETE,PATCH,OPTIONS,HEAD")
    res.set('Status-code',204)
    res.status(204).end()
})

app.head('/pessoa/:id',(req,res) => {
    const id = req.params.id
    const pessoa = pessoas.find(p => p.id == id)
    if (!pessoa) {
        res.set('Status-code',404)
        res.status(404).end()
    }
    res.set('Status-code',204)
    res.status(204).end()
})