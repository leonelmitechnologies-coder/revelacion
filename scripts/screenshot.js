const puppeteer = require('C:/Proyectos Claude/Apps_Calidad/node_modules/puppeteer');
const path = require('path');

const OUT = path.join(__dirname, '..', '.superpowers', 'previews');
const URL_BASE = 'http://localhost:8777';

(async () => {
  const fs = require('fs');
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  // 1. Sobre de apertura
  await page.goto(`${URL_BASE}/index.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUT, '1-sobre.png') });

  // 2. Hero tras abrir
  await page.click('#sobre');
  await new Promise(r => setTimeout(r, 2200));
  await page.screenshot({ path: path.join(OUT, '2-hero.png') });

  // 3. Detalles + cuenta regresiva
  await page.evaluate(() => document.querySelectorAll('section')[1].scrollIntoView());
  await new Promise(r => setTimeout(r, 1300));
  await page.screenshot({ path: path.join(OUT, '3-detalles.png') });

  // 4. Votación (con un equipo elegido)
  await page.evaluate(() => document.querySelectorAll('section')[2].scrollIntoView());
  await new Promise(r => setTimeout(r, 1300));
  await page.click('.equipo.tochi');
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(OUT, '4-votacion.png') });

  // 5. Formulario
  await page.evaluate(() => document.querySelectorAll('section')[3].scrollIntoView());
  await new Promise(r => setTimeout(r, 1300));
  await page.type('#familia', 'Familia Hernández');
  await page.screenshot({ path: path.join(OUT, '5-formulario.png') });

  // 6. Cierre
  await page.evaluate(() => document.querySelectorAll('section')[4].scrollIntoView());
  await new Promise(r => setTimeout(r, 1300));
  await page.screenshot({ path: path.join(OUT, '6-cierre.png') });

  // 7. Admin: PIN y panel (PIN por defecto 2607)
  await page.goto(`${URL_BASE}/admin.html`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(OUT, '7-admin-pin.png') });
  await page.type('#pin', '2607');
  await page.click('#btn-entrar');
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUT, '8-admin-panel.png') });

  await browser.close();
  console.log('Capturas guardadas en', OUT);
})();
