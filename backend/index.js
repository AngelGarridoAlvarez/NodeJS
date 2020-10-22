'use strict'

let mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
//cargo el módulo mongoose
//Ya tengo un objeto en la variable mongoose

//Realizamos la conexión a la base de datos mediante una promesa

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
// el local host es el predefinido de mongo que nosotros hemos seteado cuando hemos creado la BBDD
    .then(()=>{
        console.log('Conexión a la BBDD de Mongo establecida con éxito');

        //Creación del servidor
        app.listen(port, () => {
           console.log("Servidor is working properly in localhost:"+port);
        });

    })
    .catch(err => console.log(err));//Para capturar el error

module.exports.puerto = port;//para usar la variable puerto en otro app.js