const http = require('http');                
const cheerio = require('cheerio');

const PORT = 3000;

const TARGET_URL = 'https://example.com/';   
const SELECTOR   = 'h1';                     
const INTERVAL_MS = 15_000;                   

let last = { when: '—', text: '—', status: '—' };

async function scrape() {
  try {
    const res = await fetch(TARGET_URL);
    const html = await res.text();
    const $ = cheerio.load(html);
    const text = $(SELECTOR).first().text().trim() || '(vacío)';
    last = { when: new Date().toLocaleString(), text, status: `OK ${res.status}` };
    console.log(`[${last.when}] ${text}`);
  } catch (e) {
    last = { when: new Date().toLocaleString(), text: '(error)', status: e.message };
    console.error('Scrape error:', e.message);
  }
}

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <h1>Web scraping demo</h1>
    <p><b>URL:</b> ${TARGET_URL}</p>
    <p><b>Selector:</b> <code>${SELECTOR}</code></p>
    <p><b>Último resultado:</b> ${last.text}</p>
    <p><b>Status:</b> ${last.status}</p>
    <p>Se actualiza cada ${INTERVAL_MS/1000}s.</p>
  `);
}).listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

scrape();
setInterval(scrape, INTERVAL_MS);
