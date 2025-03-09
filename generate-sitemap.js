import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/products', changefreq: 'weekly', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.6 }
];

const sitemapStream = new SitemapStream({ hostname: 'https://yourwebsite.com' });
const writeStream = createWriteStream('./public/sitemap.xml');

// Запись данных в файл
sitemapStream.pipe(writeStream);

(async () => {
  try {
    // Преобразуем массив ссылок в поток и записываем в sitemap
    const xmlData = await streamToPromise(Readable.from(links).pipe(sitemapStream));
    
    console.log('✔ Sitemap создан!');
  } catch (err) {
    console.error('Ошибка:', err);
  }
})();
