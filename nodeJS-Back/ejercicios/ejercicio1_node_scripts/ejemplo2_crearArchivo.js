const fs = require('fs');

//Array de objetos que representan personas
const people = [
    {
        firstName:'Ángel',
        lasName: 'Garrido'
    },
    {
        FirstName: 'Diana',
        lastName: 'Ripalda'
    },
    {
        firstName: 'Mabel',
        lastName: 'Álvarez'
    }
];

// Transformamos el array a un JSON en formato String
const data = JSON.stringify(people);

// Creamos el archivo people.json y hacemos un console.log para que nos avise cuando se complete la escritura
//La carpeta de destino tiene que estar creada para que funcione

fs.writeFile('jsonFiles/people.json', data, () => {
    console.log('File created!');
})