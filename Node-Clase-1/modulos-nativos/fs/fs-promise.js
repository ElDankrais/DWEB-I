const { readFile } = require('node:fs/promises');

async function leer() {
  console.log('Leyendo el primer archivo');
  const texto1 = await readFile('./archivo.txt', 'utf-8');
  console.log('Primer texto: ', texto1);
  console.log('vedgvdege');

  console.log('Leyendo el segundo archivo')
  const texto2 = await readFile('./archivo2.txt', 'utf-8');
  console.log('El otro texto: ', texto2);
}

leer();