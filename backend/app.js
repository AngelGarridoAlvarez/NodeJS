//En este archivo vamos a configurar Express
'use strict'

var express = require('express');//accede a la carpeta correspondiente de node_modules para usar esta librería
var bodyParser = require('body-parser');
var index = require("./index"); //Me importo index para poder usar directamente la variable puerto posteriormente

var app = express();

//Cargar Archivos de Rutas - aquí vamos a importar archivos de rutas para poder utilizarlos en el apartado inferior RUTAS
var project_routes = require('./routes/project'); //me traigo el objeto donde tengo mis rutas a project_routes y puedo utilizarlo

//Middlewares:
// * métodos que se ejecutan antes de ejecutar la acción de un controlador/ el resultado de la petición
// * Primero se ejecuta el middleware, luego la funcionalidad principal de la ruta en la que estemos

app.use(bodyParser.urlencoded({extended: false}));//configuración necesaria para bodyParser
app.use(bodyParser.json());//Lo que me llegue hay que convertirlo a JSON

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//RUTAS

app.use('/api', project_routes); //uso este middleware para añadir api/ a las rutas de project_routes


//Creo la ruta test para probar el funcionamiento mandando un JSON como mensaje
app.get('/test', (req,res) => {
    res.status(200).send({
        message: "Hello World from my NodeJS API"
    });
    //si recibo una res estatus 200 (exitosa) envío el mensaje
});

app.get('/', (req,res) => {
    res.status(200).send("<h1>Pagina de inicio, prueba las siguientes rutas:</h1>" +
        "<ul>" +
        "<li>localhost:"+ index.puerto + "/test</li>" +
        "<li>localhost:"+ index.puerto + "/api</li>" +
        "<li>localhost:"+ index.puerto + "/rutaPost - (post)</li>" +
        "<li>localhost:"+ index.puerto + "/rutaPostConParam:id - (post)</li>" +
        "<li>localhost:"+ index.puerto + "/api/home</li>" +
        "<li>localhost:"+ index.puerto + "/api/test - (post)</li>" +
        "<li>localhost:"+ index.puerto + "/api/save-project - (post)</li>" +
        "<li>localhost:"+ index.puerto + "/api/project/:id? - meter id de BBDD tipo  http://localhost:3700/api/project/5fa3ca554dec284908695fbd</li>" +
        "<li>localhost:"+ index.puerto + "/api/projects</li> - listado de proyectos" +
        "<li>localhost:"+ index.puerto + "/api/project/:id</li> - (put) - actualizar proyectos" +
        "<li>localhost:"+ index.puerto + "/api/project/:id</li> - (delete) borrar proyecto" +
        "<li>localhost:"+ index.puerto + "/api/upload-image/:id</li> - (post) subir imagen" +
        "</ul>")
   });
//Creamos una ruta para poder probar el método post

app.post('/rutaPost', (req,res) => {
    console.log(req.body.Name);//Para que me muestre la información que paso por el método post en postman

    //también puedo pasar información por manualmente en la barra de direcciones de postman, añadiendo a la ruta "?para=valor"
    //Podemos probar poniendo en POSTMAN http://localhost:3700/rutaPost?web=www.angelputoamo.com
    res.status(200).send({
        message: "This is the Post Route and the chosen param is '" +req.body.Name+"' y el parámetro que he pasado manualmente por la barra de POSTMAN y que he recogido con query es '" + req.query.web + "'"
    });
});

//Creamos una ruta para pasar parámetros obligatorios: añadimos al final de la ruta ":nombreParametro"

app.post('/rutaPostConParam:id', (req,res) => {
    console.log(req.body.id);//Para que me muestre el parámetro obligatorio que he pasado por la barra de direcciones

    //Ponemos en POSTMAN http://localhost:3700/rutaPostConParam:1982
    res.status(200).send({
        message: "This is the Post Route and the chosen param is '" +req.params.id+"'"
    });
});



// exportar
module.exports = app;//exporto la variable app que tiene express y toda la configuración de los middleware