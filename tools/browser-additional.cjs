// Focused final audit and private demo. Uses the host's optional Playwright runtime.
const fs=require('node:fs'),path=require('node:path');
let pw;try{pw=require('playwright')}catch{pw=require(path.join(process.env.NODE_REPL_NODE_MODULE_DIRS,'playwright'))}
const out=path.resolve('qa-private'),base=process.argv[2]||'http://127.0.0.1:4173/';
const checks=[];function check(name,pass,detail){checks.push({name,pass,detail});if(!pass)throw Error(name)}
(async()=>{
 const browser=await pw.chromium.launch({headless:true,executablePath:process.env.FALLOW_BROWSER});
 try{
 const c=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const p=await c.newPage();await p.goto(base,{waitUntil:'networkidle'});
 const rects=await p.locator('.weather-control').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom}}));
 const save=await p.locator('.conditions [data-action=save]').boundingBox();
 check('rain and sunlight do not overlap on mobile',rects[0].bottom<=rects[1].top);
 check('both weather settings appear before Save',rects[1].bottom<=save.y);
 await p.screenshot({path:path.join(out,'final-mobile-390.png'),fullPage:true});
 await p.locator('[data-action=guide]').first().click();
 for(let i=0;i<18;i++){await p.keyboard.press('Tab');check('dialog traps keyboard focus '+i,await p.evaluate(()=>document.activeElement.closest('dialog')?.id==='modal'));}
 await p.keyboard.press('Escape');check('guide returns focus to opener',await p.evaluate(()=>document.activeElement.dataset.action==='guide'));
 await p.locator('#day-slider').focus();await p.keyboard.press('End');check('season end disables sow',await p.locator('[data-action=plant]').isDisabled());
 await p.locator('#scene-wrap').scrollIntoViewIfNeeded();const bb=await p.locator('#meadow').boundingBox();await p.touchscreen.tap(200,bb.y+bb.height*.8);check('season end explains how to continue',(await p.locator('#toast').innerText()).includes('timeline back'));
 await p.locator('#day-slider').focus();await p.keyboard.press('Home');
 await p.locator('[data-action=plant]').click({clickCount:8,delay:50});await p.waitForTimeout(250);let state=await p.evaluate(()=>JSON.parse(localStorage.getItem('fallow-meadow-v1')));check('UI accepts up to 24 seed clusters',state.plot.plants.length===24);
 await p.locator('[data-action=plant]').click();check('capacity explains recovery',(await p.locator('#toast').innerText()).includes('24'));await p.waitForTimeout(220);state=await p.evaluate(()=>JSON.parse(localStorage.getItem('fallow-meadow-v1')));check('capacity does not add extra planting',state.plot.plants.length===24);
 await p.locator('[data-action=notebook]').click();await p.locator('[data-action=remove-last]').click();await p.waitForTimeout(220);state=await p.evaluate(()=>JSON.parse(localStorage.getItem('fallow-meadow-v1')));check('accessible remove-last removes a cluster',state.plot.plants.length===23);await p.keyboard.press('Escape');await p.locator('[data-action=undo]').click();await p.waitForTimeout(220);state=await p.evaluate(()=>JSON.parse(localStorage.getItem('fallow-meadow-v1')));check('removal is undoable',state.plot.plants.length===24);
 const colors=await p.evaluate(()=>{const s=getComputedStyle(document.documentElement);return {ink:s.getPropertyValue('--ink').trim(),muted:s.getPropertyValue('--muted').trim(),paper:s.getPropertyValue('--paper').trim()}});
 function lum(hex){const a=hex.replace('#','').match(/../g).map(h=>parseInt(h,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return a[0]*.2126+a[1]*.7152+a[2]*.0722}
 function contrast(a,b){const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
 check('body ink meets AA contrast',contrast(colors.ink,colors.paper)>=4.5,contrast(colors.ink,colors.paper));check('muted copy meets AA contrast',contrast(colors.muted,colors.paper)>=4.5,contrast(colors.muted,colors.paper));
 await c.close();
 // Short demonstration of the real public/local app, never committed.
 const demo=await browser.newContext({viewport:{width:1440,height:1000},recordVideo:{dir:out,size:{width:1440,height:1000}}});const d=await demo.newPage();await d.goto(base,{waitUntil:'networkidle'});await d.waitForTimeout(800);
 await d.locator('[data-action=preset][data-preset=empty]').click();await d.waitForTimeout(400);await d.locator('#scene-wrap').scrollIntoViewIfNeeded();
 for(const [species,x] of [['poppy',.18],['daisy',.35],['cornflower',.5],['clover',.66],['grass',.84]]){await d.locator('[data-action=seed][data-species='+species+']').click();await d.locator('#scene-wrap').scrollIntoViewIfNeeded();const b=await d.locator('#meadow').boundingBox();await d.mouse.click(b.x+b.width*x,b.y+b.height*.8);}
 for(let day=0;day<=65;day+=5){await d.locator('#day-slider').evaluate((e,n)=>{e.value=n;e.dispatchEvent(new Event('input',{bubbles:true}))},day);await d.waitForTimeout(120);}
 await d.locator('[data-action=compare]').click();await d.waitForTimeout(800);await d.locator('#alt-rain').focus();await d.keyboard.press('Home');await d.waitForTimeout(500);await d.locator('[data-action=apply-climate]').click();await d.waitForTimeout(650);await d.locator('[data-action=undo]').click();await d.waitForTimeout(300);
 await d.locator('[data-action=save]').click();await d.locator('#meadow-name').fill('A little wild');await d.locator('#save-form button').click();await d.waitForTimeout(900);await d.keyboard.press('Escape');await d.evaluate(()=>scrollTo(0,0));await d.waitForTimeout(800);
 const video=d.video();await demo.close();await video.saveAs(path.join(out,'fallow-demo.webm'));await browser.close();
 }catch(e){console.error(e);process.exitCode=1;await browser.close();}
 fs.writeFileSync(path.join(out,'additional-qa-report.json'),JSON.stringify({base,date:new Date().toISOString(),checks},null,2));console.log(JSON.stringify({checks:checks.length,passed:checks.filter(x=>x.pass).length}));
})();
