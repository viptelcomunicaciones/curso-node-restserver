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
const get1 = (req = request, res = response) => {
    res.render('home',{
        Name:'Cesar Barrero',
        Titulo:'Curso node js',
    });
}

const getinicio = (req = request, res = response) => {
    res.render('home',{
        Name:'Cesar Barrero',
        Titulo:'Curso node js',
    });
}

const getgeneric = (req = request, res = response) => {
    res.render('generic',{
        Name:'Cesar Barrero',
        Titulo:'Curso node js',
    });
}

const getelements = (req = request, res = response) => {
    res.render('elements',{
        Name:'Cesar Barrero',
        Titulo:'Curso node js',
    });
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
    get1,
    userput,
    userpost,
    userdelete,
    userpatch,
    getinicio,
    getgeneric,
    getelements
}