import { response, request } from 'express';

const userget = (req = request, res = response) => {
    
    const {id,name,apikey,pag=1,limit=10}= req.query;
    res.status(200).json({ 
        msg: 'get API-- controller ',
        id,
        name,
        apikey,
        pag,
        limit
    })
}

const userput = (req, res = response) => {
    const id  = req.params.id
    res.status(200).json({ 
        msg: 'put API-- controller ',
        id
    })
}

const userpost = (req, res = response) => {
    const nombre = req.body.name
    const edad = req.body.Edad
    res.status(200).json({ 
        msg: 'post API-- controller ',
        nombre,
        edad
    })
}

const userpatch = (req, res = response) => {
    res.status(200).json({ 
        msg: 'patch API-- controller ' })
}

const userdelete = (req, res = response) => {
    res.status(200).json({ 
        msg: 'delete API-- controller ' })
}

export {
    userget,
    userput,
    userpost,
    userdelete,
    userpatch
}