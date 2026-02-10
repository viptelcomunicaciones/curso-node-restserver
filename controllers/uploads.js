import { response, request } from 'express';

const cargararchivospost = async(req= request, res = response) => {

    res.status(201).json( {
            msg : 'Cargar Archivos'
        });
}


export {
    cargararchivospost,
}