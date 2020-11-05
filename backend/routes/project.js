'use strict'
//Para acceder a todas estas rutas deberemos añadir api/nombre_de_ruta ya que en app.js hemos añadido un middleware para que se acceda poniendo api a todas estas rutas


var express = require('express'); //Cargo el módulo de express para crear mis propias rutas
var ProjectController = require('../controllers/project') //Cargo el controlador que me he hecho

var router = express.Router(); //Cargo este servicio de express que me sirve tiene diferentes métodos para acceder a las rutas
var multipart = require('connect-multiparty');//* Creamos un middleware (se ejecuta antes del controlador) para poder subir imágenes usando el método connect-multiparty
var multipartMiddleware = multipart({uploadDir: './uploads'});//Carpeta en la que se van a guardar mis archivos y que tengo que crear
//*tenemps que pasar este middleware  como segundo parámetro a la ruta /upload-image/ para que se ejecute antes que la acción ProjectController.uploadImage

router.get('/home', ProjectController.home); //Paso el nombre de la ruta y el método al que quiero que acceda de mi controlador en esa ruta
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject); //Método para guardar documentos en la BBDD
router.get('/project/:id?', ProjectController.getProject);//Poniendo la interrogación hago que el parámetro que le paso por la url id sea opcional
//Para probar esta ruta tenemos que introducir la id de nuestra BBDD de robomongo como por ejemplo: http://localhost:3700/api/project/5fa3ca554dec284908695fbd
router.get('/projects', ProjectController.getProjects);//Probamos http://localhost:3700/api/projects
//Creamos una ruta con el método put para actualizar proyectos:
router.put('/project/:id', ProjectController.updateProject); //al no poner ? en la ruta el parámetro project/:id es obligatorio
router.delete('/project/:id', ProjectController.deleteProject);//Ruta para borrar proyectos
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);//Ruta para subir imágenes - hemos tenido que instalar previamente connect-multiparty


module.exports = router; //exporto router para poder utilizar mi configuración de rutas fuera de aquí