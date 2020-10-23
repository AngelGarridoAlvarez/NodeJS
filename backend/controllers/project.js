'use strict'

//* Podemos hacer un objeto json directamente o hacer funciones que nos devuelvan json
//* En este caso hacemos un json que incorpora funciones dentro

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

    }
};

module.exports = controller; //ahora con require me puedo importar mi controlador en otros archivos