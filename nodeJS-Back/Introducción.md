# Introducción

## Node.js: JavaScript en el servidor

* Node.js es un **entorno de ejecución para JavaScript construido con el motor JavaScript v8 de Chrome.**

* Hace funcionar código JavaScript directamente en el S.O. sin usar un navegador aplicando este mismo motor.

* Programadores Frontend de JavaScript ahora pueden programar en el mismo lenguaje en el Backend

### Ejemplo Hello World en servidor HTTP

```jsx
const http = require('http');

const PORT = 3000;
const server = http.createServer();

// El servidor necesita dos argumentos, el puerto y un callback para que funcione con node

server.listen(PORT, ()=>{
    console.log(`Server started in http://localhost:${PORT}`);
})
```