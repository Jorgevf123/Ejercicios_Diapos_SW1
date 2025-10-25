const http = require('http');
const os = require('os');
const fs = require('fs');

// --- Configuración ---
const { intervalSeconds = 5 } = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const PORT = 3000;

// --- Servidor mínimo ---
http.createServer((req, res) => res.end('Node monitor OK'))
  .listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
    // Al iniciar: info del sistema y versión de Node
    console.log(`SO: ${os.type()} ${os.release()} (${os.arch()})`);
    console.log(`CPUs: ${os.cpus().length} | Node: ${process.version}`);
  });

// --- Helpers ---
const fmt = secs => {
  const h = Math.floor(secs/3600), m = Math.floor((secs%3600)/60), s = Math.floor(secs%60);
  return `${h}h ${m}m ${s}s`;
};
const mb = b => (b/1024/1024).toFixed(1);

// --- Reporte periódico ---
setInterval(() => {
  // CPU: usamos la carga media de 1 min y la llevamos a %
  const cores = os.cpus().length;
  const load1 = os.loadavg()[0];                // carga 1 min
  const cpuPct = Math.min(100, (load1 / cores) * 100);  // aprox %

  // Memoria del proceso Node
  const mem = process.memoryUsage();

  const line = [
    `CPU ~${cpuPct.toFixed(1)}% (load1=${load1.toFixed(2)})`,
    `Mem proceso: ${mb(mem.heapUsed)}/${mb(mem.heapTotal)} MB (RSS ${mb(mem.rss)} MB)`,
    `Uptime SO: ${fmt(os.uptime())}`,
    `Uptime Node: ${fmt(process.uptime())}`,
  ].join(' | ');

  console.log(`[${new Date().toLocaleTimeString()}] ${line}`);
}, intervalSeconds * 1000);
