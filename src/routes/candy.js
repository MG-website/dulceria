const server = require('express').Router();
const {Candy} = require('../db.js')
server.get('/', (req,res)=>{

    Candy.findAll()
    .then(list => {
        res.send(list)
    })
});

server.post('/add', (req,res)=>{
    const {name,description,stock,price_unit} =req.body
    if(!name || !description || !stock || !price_unit) return res.send('no se enviaron todos los datos')
    Candy.create(req.body)
    .then(resp => {
        res.send(resp)
    })
})

server.put('/update', (req,res)=>{
const {id, name, description, stock, price_unit}= req.body;
const obj = {name, description, stock, price_unit}
if(!id) return res.send('no se envio id');
Candy.update({name, description, stock,price_unit}, {where:{id}})
.then(resp =>{
    res.send(resp)
})
})

server.put('/vender', (req,res)=>{
    const {id, quantity}= req.body;
    if(!id) return res.send('no se envio id');


        Candy.update({stock:quantity}, {where:{id}})
        .then(resp =>{
            res.send(resp)
        })
    })


server.delete('/delete/:id', (req,res)=>{
const{id}=req.params;
Candy.findOne({where:{id}})
.then(resp => {
    resp.destroy()
    .then(remove =>{
        return res.send(remove)
    })
})
.catch(err =>{
    res.sendStatus(500)
})
})
module.exports = server;
