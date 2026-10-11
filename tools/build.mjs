import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});await copyFile('index.html','dist/index.html');await copyFile('.nojekyll','dist/.nojekyll');await cp('src','dist/src',{recursive:true});await cp('assets','dist/assets',{recursive:true});console.log('Static build ready: dist/ — no runtime dependencies.');
