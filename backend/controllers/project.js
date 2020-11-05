'use strict'

//*Todos estos controladores llevarán su ruta correspondiente para poder acceder a ellos, en este caso será siempre a través de la ruta api/ ya que así lo hemos determinado en app.js
// Podemos hacer un objeto json directamente o hacer funciones que nos devuelvan json
//* En este caso hacemos un json que incorpora funciones dentro

let Project = require('../models/project'); //Importo el modelo project para poder instanciarlo en el método saveProject()
let fs = require('fs'); //librería de node que voy a utilizar para borrar archivos

let controller = {

    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy el método o acción test del controlador del project'
        });

    },

    saveProject: function (req, res) {
        var project = new Project(); //para crear un nuevo objeto en base a nuestro modelo

        var params = req.body;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null; //luego añadiremos la lógica de la imagen

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({message: 'Error al guardar el documento.'});

            if (!projectStored) return res.status(404).send({message: 'Nose ha podido guardar el proyecto'});

            return res.status(200).send({project: projectStored});
        })
        /* Al haber incorporado un status 200 con la funcionalidad de guardar a mi código quito este código de pruebas
                return res.status(200).send({

                    project: project,

                    //params: params, //me va a devolver los parámetros que le pase por el método POST en Postman en su ruta 'api/save-project'

                    message: 'Soy el método save-project'
                })
        */
    },

    getProject: function (req, res) {
        let projectId = req.params.id;

        if (projectId == null) return res.status(404).send({message: 'El proyecto no existe.'});


        Project.findById(projectId, (err, project) => {

            if (err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if (!project) return res.status(404).send({message: 'El proyecto no existe.'});

            return res.status(200).send({
                project
            });
        });
    },

    //Creamos un método que nos liste todos los documentos de la BBDD:

    getProjects: function (req, res) {

        Project.find({}).exec((err, projects) => { //Dentro de find podríamos poner condiciones para filtrar tipo Project.find({year: 2019})
            //Podríamos ordenar por año usando el método .sort()
            // *  Project.find({}).sort('year').exec((err, projects) - de menor a mayor
            // *  Project.find({}).sort('-year').exec((err, projects) - de mayor a menor
            if (err) return res.status(500).send({message: 'Error al devolver los datos.'});

            if (!projects) return res.status(404).send({message: 'No hay proyectos que mostrar.'});

            return res.status(200).send({projects});
        })

    },
    //Creamos el método updateProjects para actualizar proyectos

    updateProject: function (req, res) {
        let projectId = req.params.id;
        let update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdated) => {
            //{new:true} para que además de actualizar me devuelva el objeto actualizado cuándo haga el PUT
            if (err) return res.status(500).send({message: 'Error al actualizar'});

            if (!projectUpdated) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    deleteProject: function (req, res) {
        let projectId = req.params.id;

        Project.findByIdAndDelete(projectId, (err, projectRemoved) => {
            if (err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});

            if (!projectRemoved) return res.status(404).send({message: "No se puede eliminar ese projecto"});

            return res.status(200).send({
                project: projectRemoved
            });
        });
    },

    //Creamos un método para subir imágenes
    //Hemos tenido que instalar previamente connect-multiparty

    uploadImage: function (req, res) {
        let projectId = req.params.id;
        let fileName = 'Imagen no subida...';

        if (req.files) {
            let filePath = req.files.image.path;//guardamos la ruta del archivo que subimos
            let fileSplit = filePath.split('\\'); //nombre real del archivo que se ha guardado
            let fileName = fileSplit[1];
            let extSplit = fileName.split('\.'); //nos corta a partir del punto, y así obtenemos el nombre de la extensión
            let fileExt = extSplit[1];

            //Si el archivo tiene una de las extensiones que digo, entonces puede guardarlo en la BBDD:
            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

                Project.findByIdAndUpdate(projectId, {image:fileName}, {new: true}, (err, projectUpdated) =>{
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido'});

                    if(!projectUpdated) return  res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imagen'})

                    return res.status(200).send({
                        project: projectUpdated
                    });
                });

            }else{ //Si no tiene esas extensiones borro el archivo
                fs.unlink(filePath, (err) => {
                   return res.status(200).send({message: 'La extensión no es valida'});
                });
            }



        }else{
            return res.status(200).send({
                message: fileName
            });
        };
    },

};

module.exports = controller; //ahora con require me puedo importar mi controlador en otros archivos