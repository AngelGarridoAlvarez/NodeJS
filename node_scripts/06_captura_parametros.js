// Podemos pasar los parámetros por nuestro terminal:
// ```shell node .\06_captura_parametros.js 22 "hello" true flofi 123```

'use strict'
var params = process.argv.slice(2) //ponemos el 2 para que no me devuelva la ruta del archivo
var params0 = process.argv.slice(1) //si ponemos 1 me devuelve la ruta del archivo


console.log(params); //[ '22', 'hello', 'true', 'flofi', '123' ]
console.log(params0);
/*
[
  'C:\\Users\\angel\\GitHub\\nodeJS\\node_scripts\\06_captura_parametros.js',
  '22',
  'hello',
  'true',
  'flofi',
  '123'
]
 */

// A continuación voy a realizar operaciones de calculadora con los valores 0 y 4 del array params (que son los dos a los que les he puesto un número de valor)

let valor1 = parseFloat(params[0]); //pasamos a formato número decimal el parámetro 0
let valor2 = parseFloat(params[4]);

console.log(`${valor1} + ${valor2} = ${valor1 + valor2}`);
console.log(`${valor1} - ${valor2} = ${valor1 - valor2}`);
console.log(`${valor1} x ${valor2} = ${valor1 * valor2}`);
console.log(`${valor1} / ${valor2} = ${valor1 / valor2}`);
/*
22 + 123 = 145
22 - 123 = -101
22 x 123 = 2706
22 / 123 = 0.17886178861788618
 */
