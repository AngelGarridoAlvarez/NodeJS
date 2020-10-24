'use strict'

var mongoose = require('mongoose'); //importamos mongoose para poder trabajar con los modelos
var Schema = mongoose.Schema; //Definimos el esquema del modelo

//Creamos el Schema de project:
//* este es el objeto molde con el que voy a crear nuevos documentos en la BBDD
//* Le paso por parámetro un objeto json con todas las propiedades que tiene que tener un project
//* Cuando haga New Project voy a tener todas estas propiedades predefinidas para crear nuevos documentos a partir de ProjectSchema

var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    //langs: [String], //Así es como digo que va a ser un array de strings
    langs: String, //Quitamos el array de string para simplificar el proceso
    image: String

});

//Exporto el modelo para poder utilizarlo en otros ficheros:
// * Primer parámetro: nombre de la entidad
// * Segundo parámetro: el esquema
// * mongoose va a generar una colección en la BBDD
//      * El nombre de la colección es el mismo que pasamos por parámetro en minúsculas y en plural
//      * Si ya existe ese nombre de la colección, simplemente introduce el nuevo documento cuando nosotros hagamos un save de un nuevo documento

module.exports = mongoose.model('Project', ProjectSchema)