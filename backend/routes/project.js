'use strict'

var express = require('express'); //Cargo el módulo de express para crear mis propias rutas
var ProjectController = require('../controllers/project') //Cargo el controlador que me he hecho

var router = express.Router(); //Cargo este servicio de express que me sirve tiene diferentes métodos para acceder a las rutas

router.get('/home', ProjectController.home); //Paso el nombre de la ruta y el método al que quiero que acceda de mi controlador en esa ruta
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject); //Método para guardar documentos en la BBDD

module.exports = router; //exporto router para poder utilizar mi configuración de rutas fuera de aquí