/* Junta os arquivos do app em www/, que é o que o Capacitor empacota.
   O app mora na raiz do repositório para o GitHub Pages funcionar; esta
   cópia evita levar node_modules e a pasta android/ para dentro do APK. */
import { cp, rm, mkdir } from 'node:fs/promises';

const DESTINO = 'www';
const ITENS = ['index.html', 'manifest.webmanifest', 'sw.js', 'assets'];

await rm(DESTINO, { recursive: true, force: true });
await mkdir(DESTINO, { recursive: true });

for (const item of ITENS) {
  await cp(item, `${DESTINO}/${item}`, { recursive: true });
}

console.log(`www/ pronto com ${ITENS.length} itens.`);
