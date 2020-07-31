## Ejemplo1. Probando funcionalidades de node.js

1. Crear una carpeta de trabajo (en mi caso ejercicio1_node_scripts)
2. Crear archivo **ejemplo1_helloWorld.js**
    * ```jsx
      console.log('Hello World')
      ```
      
    * escribir en el terminal 'node ejemplo1_helloWorld.js'
    
    * La consola debería mostrar:
    ![image](src/Captura de pantalla de 2020-07-31 11-09-44.png)
    
  Esto significa que estamos lanzando scripts directamente en nuestro S.O. que antes de nodejs solo se podían ejecutar a través del navegador.
    
 NodeJS en un S.O. abre posibilidades como escribir archivos o abrir servidores.
    
    
## Ejemplo2. Script para escribir archivos - fs.writeFile

1. Crear archivo 'ejemplo2_crearArchivo.js' 
2. Crearemos una funcón usando el paquete 'fs' de node, el la que dado un array de objetos escriba un archivo .json :
    ```jsx
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
   
   fs.writeFile('jsonFiles/people.json', data, () => {
       console.log('File created!');
   })
      
   ```
3. ejecutamos en el terminal 'node ejemplo2_crearArchivo.js'

![image](src/Captura%20de%20pantalla%20de%202020-07-31%2013-07-23.png)

Vemos como se ha creado el archivo en la ruta especificada

![image](src/Captura%20de%20pantalla%20de%202020-07-31%2013-18-06.png)

Gracias a esta herramienta podemos crear archivos de forma automática, esto abre muchas posibilidades en combinación con el uso de APIs externas.


## Ejemplo3. Crear un servidor HTTP

Existen  paquetes preparados para abrir servidores:
* http
* https (es para crear sevidores seguros, necesita usar certificados y firmas seguros para funcionar)

1. Crear archivo ejemplo3_servodor.js
2. Añadir el siguiente código:
```jsx
const http = require('http');

//Se encarga de escuchar las peticiones que lleguen al servidor.
const requestHandler = (req, res) => {
    //Si hacemos un console.log de req y res veremos que por consola sale un output muy largo
    console.log(req);
    console.log(res);
    //Indicamos que vamos a responder con un contenido de tipo json
    res.setHeader("Content-Type", "application/json");
    //Indicamos que la respuesta será el status 200 (éxito)
    res.writeHead(200);
    //Enviamos la respuesta a nuestros usarios
    res.end('Toma que toma! el servidor está rulando')

};


const PORT = 3000;
const server = http.createServer(requestHandler);


// El servidor necesita dos argumentos, el puerto y un callback para que funcione con node
server.listen(PORT, ()=>{
    console.log(`Server started in http://localhost:${PORT}`);
})

```   
 
* Req &rarr; **request**

    * Contenido que llega desde el navegador al servidor
    * Contiene info sobre cookies, sesión, url y los headers que identifican una petición http.
    * "***Me dice qué nos están pidiendo al servidor, y si esta petición la están haciendo como usuario registrado o no.***" Yo Mismo Garrido Álvarez
  

* Res &rarr; **response**
    * indica la forma en la que queremos envíar la información de vuelta al navegador

* Los HTTP headers son la parte central de los HTTP requests y responses, y transmiten información acerca del navegador del cliente, de la página solicitada, del servidor, etc.


Si marcamos en el terminal node ejemplo3_servidor.js y ponemos en nuestro navagador http://localhost:3000/ veremos el mesaje que se está lanzando desde el servidor que hemos creado:

![image](src/Captura%20de%20pantalla%20de%202020-07-31%2015-56-46.png);

Ya tenemos un servidor que responde a nuestras peticiones abierto en node.js 💃

## Ejemplo4. Leer archivos utilizando Node.js