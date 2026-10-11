// Development-only asset preparation; the deployed site never contacts Google.
import {mkdir,writeFile} from 'node:fs/promises';
const out='assets/fonts';await mkdir(out,{recursive:true});
const endpoint='https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap';
const res=await fetch(endpoint,{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'}});if(!res.ok)throw new Error('Font stylesheet '+res.status);const css=await res.text();
const chunks=[...css.matchAll(/\/\* ([^*]+) \*\/\s*(@font-face\s*\{[^}]+\})/g)];let localCSS='',urls=new Map();
for(const [,subset,block]of chunks){if(!['latin','cyrillic'].includes(subset.trim()))continue;const url=block.match(/url\(([^)]+)\)/)[1];let file=urls.get(url);if(!file){file='font-'+urls.size+'.woff2';urls.set(url,file);const response=await fetch(url);if(!response.ok)throw new Error('Font '+response.status);await writeFile(out+'/'+file,Buffer.from(await response.arrayBuffer()));}localCSS+='/* '+subset+' */\n'+block.replace(url,'./'+file)+'\n';}
if(!urls.size)throw new Error('No supported subsets');await writeFile(out+'/fonts.css',localCSS);
for(const family of ['manrope','cormorantgaramond']){const url='https://raw.githubusercontent.com/google/fonts/main/ofl/'+family+'/OFL.txt';const response=await fetch(url);if(!response.ok)throw new Error('License '+response.status);await writeFile(out+'/'+family+'-OFL.txt',await response.text());}
await writeFile(out+'/SOURCES.md','# Self-hosted fonts\n\nDownloaded 2026-10-11 from the Google Fonts official CSS API: '+endpoint+'\n\nLatin and Cyrillic subsets. Original unmodified WOFF2 files. Manrope and Cormorant Garamond: SIL Open Font License 1.1. License files are bundled.\n');console.log(urls.size+' font files prepared.');
