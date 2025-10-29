const http = require('http');
const { URL } = require('url');

const PORT = 3000;

const DICT = [
  'lobo','cielo','verde','nube','sol','rio','noche','fuego','piedra','viento',
  'luz','hoja','tierra','luna','mar','roble','metal','norte','sur','este','oeste',
  'trueno','arena','roca','musgo','cobre','plata','oro','brisa','cima','valle','rayo',
  'mapa','campo','eco','puma','bambu','lirio','naranja','limon','uva','kiwi','mango',
  'perla','cactus','neon','quark','roble','ciervo'
];

const randWord = () => DICT[Math.floor(Math.random() * DICT.length)];

function genPassword(n) {
  const words = Array.from({ length: n }, randWord);
  const num = Math.floor(Math.random() * 100);
  const sym = ['!','@','#','$','%','*'][Math.floor(Math.random() * 6)];
  return words.join('-') + num + sym;
}

http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const x = Number(url.searchParams.get('x')) || 4; // por defecto 4 palabras
  const n = Math.min(Math.max(x, 1), 10);           // limitamos 1..10

  const pwd = genPassword(n);

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <h1>Contraseña aleatoria</h1>
    <p><strong>${pwd}</strong></p>
    <p>Usa <code>?x=NUM</code> para elegir nº de palabras (1–10). Ej: <code>/?x=6</code></p>
  `);
}).listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
