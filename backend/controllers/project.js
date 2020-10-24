'use strict'

//* Podemos hacer un objeto json directamente o hacer funciones que nos devuelvan json
//* En este caso hacemos un json que incorpora funciones dentro

var Project = require('../models/project'); //Importo el modelo project para poder instanciarlo en el método saveProject()

var controller = {

    home: function(req, res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    test: function (req, res){
        return res.status(200).send({
            message: 'Soy el método o acción test del controlador del project'
        });

    },

    saveProject: function (req, res){
        var project = new Project(); //para crear un nuevo objeto en base a nuestro modelo

        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null; //luego añadiremos la lógica de la imagen

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({message:'Error al guardar el documento.'});

            if(!projectStored) return res.status(404).send({message: 'Nose ha podido guardar el proyecto'});

            return res.status(200).send({project: projectStored});
        })
/* Al haber incorporado un status 200 con la funcionalidad de guardar a mi código quito este código de pruebas
        return res.status(200).send({

            project: project,

            //params: params, //me va a devolver los parámetros que le pase por el método POST en Postman en su ruta 'api/save-project'

            message: 'Soy el método save-project'
        })
*/
    }
};

module.exports = controller; //ahora con require me puedo importar mi controlador en otros archivos