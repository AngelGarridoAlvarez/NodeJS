//En este archivo vamos a configurar Express
'use strict'

var express = require('express');//accede a la carpeta correspondiente de node_modules para usar esta librería
var bodyParser = require('body-parser');
var index = require("./index"); //Me importo index para poder usar directamente la variable puerto posteriormente

var app = express();

//Rutas

//Middlewares:
// * métodos que se ejecutan antes de ejecutar la acción de un controlador/ el resultado de la petición
// * Primero se ejecuta el middleware, luego la funcionalidad principal de la ruta en la que estemos

app.use(bodyParser.urlencoded({extended: false}));//configuración necesaria para bodyParser
app.use(bodyParser.json());//Lo que me llegue hay que convertirlo a JSON

//CORS

//RUTAS

//Creo la ruta test para probar el funcionamiento mandando un JSON como mensaje
app.get('/test', (req,res) => {
    res.status(200).send({
        message: "Hello World from my NodeJS API"
    });
    //si recibo una res estatus 200 (exitosa) envío el mensaje
});

app.get('/', (req,res) => {
    res.status(200).send("<h1>Pagina de inicio, prueba la ruta localhost:"+ index.puerto + "/test</h1>")
   });

// exportar
module.exports = app;//exporto la variable app que tiene express y toda la configuración de los middleware