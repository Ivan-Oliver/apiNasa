const routerNasa = require('express').Router();
const apiNasaRoutes = require('../services/api');
//const { getNasaList, getNasaById, createNasa, updateNasa, removeNasa } = require('../controllers/controlerNasa');


routerNasa.get('/', async (request, response) => {
    try {
        const result = await apiNasaRoutes() /* aqui está trayendo 'newlist' cargado de datos*/
        console.log(result.length)
        response.status(200).json(result)
    } catch (error) {
        response.status(500)
    }
});

module.exports = routerNasa;
