const fs = require('fs');

// Leemos un archivo en la dirección dada y el callback es invocado cuando se termina de leer y procesar el archivo

fs.readFile('jsonFiles/people.json', (err, data)=>{
    if (err) {
        //Si recibimos un error en el callback, lo mostraremos en la consola
        console.log('WTF! there was an error reading the file! ¬_¬');
    }else{
        //Si obtenemos los datos y no un error, habtá wur transformar la información con JSON.parse() para mostrarla
        const parseData = JSON.parse(data);
        console.log(parseData);
    }
});