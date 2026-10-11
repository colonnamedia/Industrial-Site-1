import {readFile,stat} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit'});
const files=['index','capabilities','industries','safety','project-history','request-proposal'];
for(const page of files){const html=await readFile(`dist/${page}.html`,'utf8');if(!/<h1>/.test(html)||!/<meta name="description"/.test(html)||!html.includes('noindex,nofollow'))throw Error(`${page}: missing SEO/demo metadata`);for(const match of html.matchAll(/href="\/(?!assets|#)([^"?#]*)/g)){const target=match[1]||'index';await stat(`dist/${target}.html`).catch(()=>{throw Error(`${page}: broken link /${target}`)})}}
const js=await readFile('assets/site.js','utf8');if(!js.includes('event.preventDefault()')||/fetch\(|localStorage|sendBeacon/.test(js))throw Error('Demo submission safety changed');
console.log('Checked six pages, navigation, metadata, and local-only form logic.');
