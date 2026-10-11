import {SPECIES,speciesById,random,simulate} from './model.js';
const f=n=>Number(n.toFixed(2));
function leaf(x,y,length,width,angle,color){return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)})"><path d="M0 0 Q${length*.55} ${-width} ${length} 0 Q${length*.42} ${width*.65} 0 0" fill="${color}"/><path d="M0 0L${length*.87} 0" stroke="#dce2b7" opacity=".23" stroke-width=".5"/></g>`;}
function flower(s,x,y,size,angle,r){
 let petals='';
 if(s.id==='poppy'){
  for(let k=0;k<4;k++)petals+=`<path d="M0 2 C${-size} ${size*.2} ${-size*1.4} ${-size} ${-size*.65} ${-size*1.25} C${size*.45} ${-size*1.65} ${size*.9} ${-size*.9} 0 2" fill="${k%2?s.petal:s.color}" transform="rotate(${k*90+20})" opacity=".9"/>`;
  petals+=`<circle r="${size*.24}" fill="#3b3d28"/><circle r="${size*.12}" fill="#85844b"/>`;
 }else if(s.id==='daisy'){
  for(let k=0;k<13;k++)petals+=`<ellipse cy="${-size*.7}" rx="${size*.21}" ry="${size*.62}" fill="${k%3===0?'#e3e3cd':s.petal}" transform="rotate(${k*360/13})"/>`;
  petals+=`<circle r="${size*.37}" fill="#c6a650"/><circle r="${size*.24}" fill="#d8bb69"/>`;
 }else if(s.id==='cornflower'){
  for(let k=0;k<10;k++)petals+=`<path d="M0 0L${-size*.4} ${-size*.75}L${-size*.22} ${-size*.65}L${-size*.1} ${-size*1.2}L${size*.1} ${-size*.9}L${size*.3} ${-size*1.05}L${size*.36} ${-size*.6}Z" fill="${k%2?s.petal:s.color}" transform="rotate(${k*36})"/>`;
  petals+=`<circle r="${size*.27}" fill="#536486"/>`;
 }else if(s.id==='clover'){
  for(let k=0;k<32;k++){const a=k*2.4,rr=Math.sqrt(k/32)*size*.8;petals+=`<ellipse cx="${f(Math.cos(a)*rr)}" cy="${f(Math.sin(a)*rr)}" rx="${size*.18}" ry="${size*.3}" fill="${k%3?s.petal:s.color}" transform="rotate(${k*13})"/>`;}
 }else if(s.id==='yarrow'){
  for(let k=0;k<15;k++){const a=k*2.4,rr=Math.sqrt(k/15)*size;petals+=`<circle cx="${f(Math.cos(a)*rr)}" cy="${f(Math.sin(a)*rr*.48)}" r="${size*.25}" fill="${k%2?s.petal:s.color}"/><circle cx="${f(Math.cos(a)*rr)}" cy="${f(Math.sin(a)*rr*.48)}" r="${size*.075}" fill="#a68f47"/>`;}
 }
 return `<g transform="translate(${f(x)} ${f(y)}) rotate(${angle})">${petals}</g>`;
}
export function plantDrawing(p,{thumbnail=false,roots=false,idPrefix='p',positionScale=1}={}){
 const s=speciesById(p.species),r=random(p.seed),g=thumbnail?.83:p.growth;
 if(!g||g<.005)return '';
 const size=thumbnail?1: .8+p.z*.28;let height=s.height*g*size;const width=(thumbnail?1:.76+p.z*.3)*(positionScale<1?.72:1);
 const base=thumbnail?0:430+p.z*29,rootX=thumbnail?0:p.x*positionScale;
 const leafColor=p.health<.45?'#a29862':s.leaf;
 let branches='',rootPaths='';
 const branchCount=s.id==='grass'?9:s.id==='clover'?7:s.id==='yarrow'?5:5;
 for(let i=0;i<branchCount;i++){
  const direction=i%2?-1:1;const spread=direction*(10+r()*35)*width;
  const branchHeight=height*(.48+r()*.5),endX=spread*(.5+r()*.4),endY=-branchHeight;
  const controlX=spread*(1.15+r()*.45);
  const stem=`M0 0 C${f(spread*.16)} ${f(-branchHeight*.38)} ${f(controlX)} ${f(-branchHeight*.73)} ${f(endX)} ${f(endY)}`;
  branches+=`<path d="${stem}" fill="none" stroke="${leafColor}" stroke-width="${s.id==='grass'?1.15:1.45}" stroke-linecap="round"/>`;
  if(s.id==='grass'){
   for(let j=0;j<5;j++){const yy=endY+8+j*6;branches+=`<path d="M${f(endX)} ${f(yy+9)}q${direction*8} -6 ${direction*5} -13 M${f(endX)} ${f(yy+9)}q${-direction*7} -3 ${-direction*4} -9" fill="none" stroke="${s.petal}" stroke-width="1.4"/>`;}
   branches+=`<path d="M0 0Q${spread*1.7} ${-height*.28} ${spread*1.25} ${-height*.72}Q${spread*1.6} ${-height*.24} 0 0" fill="${leafColor}" opacity=".82"/>`;
  }else{
   for(let j=1;j<=3;j++){
    const t=j/4;const yy=-branchHeight*t,xx=spread*Math.sin(t*Math.PI)*.58;
    if(s.id==='clover'){
     for(let k=0;k<3;k++)branches+=leaf(xx,yy,14+g*10,10+g*4,(-90+k*55)*direction,leafColor);
    }else if(s.id==='yarrow'){
     for(let k=0;k<5;k++)branches+=leaf(xx+k*direction*2,yy-k*3,(7+g*6),3,direction*(k%2?150:25),leafColor);
    }else branches+=leaf(xx,yy,(14+g*23)*(1-t*.2),s.id==='poppy'?7:5,direction*(j%2?-145:-35),leafColor);
   }
   if(p.bloom>.05||thumbnail)branches+=flower(s,endX,endY,(s.id==='poppy'?14:s.id==='clover'?10:12)*(thumbnail?1:Math.max(.25,p.bloom))*(.75+r()*.3),r()*25,r);
   else if(p.age>s.bloom[1])branches+=`<ellipse cx="${f(endX)}" cy="${f(endY)}" rx="3" ry="4.5" fill="#8a7754"/>`;
   else branches+=`<ellipse cx="${f(endX)}" cy="${f(endY)}" rx="2.4" ry="4" fill="${leafColor}"/>`;
  }
 }
 if(roots){for(let i=0;i<6;i++){const spread=(r()-.5)*70*g,depth=(20+r()*65)*g;rootPaths+=`<path d="M0 0Q${f(spread*.2)} ${f(depth*.4)} ${f(spread)} ${f(depth)}m${f(-spread*.3)} ${f(-depth*.4)}q${f((r()-.5)*18)} 9 ${f((r()-.5)*25)} 16" fill="none" stroke="#acb78d" stroke-width=".8" opacity=".6"/>`;}}
 if(g<.14){branches=`<path d="M0 0Q-4 -13 0 ${-height}" stroke="${leafColor}" stroke-width="1.3" fill="none"/>${leaf(0,-height*.6,7,4,-155,leafColor)}${leaf(0,-height*.35,9,4,-30,leafColor)}`;}
 return `<g class="plant" data-plant="${p.id}" transform="translate(${f(rootX)} ${f(base)})"><g class="plant-sway" style="--sway:${f(1+r()*2.2)}deg;--duration:${f(4+r()*4)}s;--delay:${f(-r()*9)}s">${branches}</g>${rootPaths}</g>`;
}
export function seedIcon(id){const s=speciesById(id);return `<svg viewBox="-65 -265 130 275" aria-hidden="true">${plantDrawing({id:0,species:id,seed:SPECIES.indexOf(s)*999+14,growth:.83,health:1,age:55,bloom:1,z:0},{thumbnail:true})}</svg>`;}
export function sceneMarkup(plot,{roots=false,uid='scene',animated=false,portrait=false}={}){
 const sim=simulate(plot);const randomSky=random(plot.seed);let grasses='',dots='',rootsBg='';
 // Fine grass and soil marks remain decorative; the 24 planted clusters above
 // are the only objects counted in the model and the metrics.
 const W=portrait?600:1000,k=W/1000;
 for(let i=0;i<100;i++){const x=randomSky()*W,y=428+randomSky()*25,h=7+randomSky()*24;grasses+=`<path d="M${f(x)} ${f(y)}q${f((randomSky()-.5)*20)} ${-h*.45} ${f((randomSky()-.5)*12)} ${-h}" fill="none" stroke="#8b9770" stroke-width=".7" opacity=".45"/>`;}
 for(let i=0;i<90;i++){const x=randomSky()*W,y=470+randomSky()*70;dots+=`<circle cx="${f(x)}" cy="${f(y)}" r="${f(.5+randomSky()*1.1)}" fill="#667251" opacity=".23"/>`;}
 const season=plot.day>90?'autumn':plot.day>35?'summer':'spring';const bg=plot.rain<20?'#edecd8':plot.light<45?'#e2e9df':'#e9eddf';
 const plants=[...sim.plants].filter(p=>p.planted<=plot.day).sort((a,b)=>a.z-b.z);
 if(roots)rootsBg=`<path d="M0 458 Q${280*k} 442 ${510*k} 453 T${W} 447V540H0Z" fill="#465a3e"/>`;
 const sky=`<defs><linearGradient id="${uid}-sky" x2="0" y2="1"><stop stop-color="${bg}"/><stop offset="1" stop-color="#e8ead5"/></linearGradient><linearGradient id="${uid}-soil" x2="0" y2="1"><stop stop-color="#d8dec4"/><stop offset="1" stop-color="#e8ead8"/></linearGradient><radialGradient id="${uid}-sun"><stop stop-color="#f8f6cf"/><stop offset="1" stop-color="#f0efd8" stop-opacity="0"/></radialGradient><clipPath id="${uid}-clip"><rect width="${W}" height="540"/></clipPath></defs>`;
 let atmosphere=`<rect width="${W}" height="540" fill="url(#${uid}-sky)"/><circle cx="${780*k}" cy="130" r="100" fill="url(#${uid}-sun)" opacity="${plot.light/100}"/><circle cx="${780*k}" cy="130" r="49" fill="#f6f3d7" opacity="${.2+plot.light/170}"/><path d="M0 405Q${250*k} 352 ${495*k} 412T${W} 389V490H0Z" fill="#cad4b5" opacity=".23"/><path d="M0 439Q${310*k} 418 ${530*k} 438T${W} 432V540H0Z" fill="url(#${uid}-soil)"/>`;
 const rendered=plants.map(p=>plantDrawing(p,{roots,idPrefix:uid,positionScale:k})).join('');
 let pollen='';if(animated&&sim.blooms){for(let i=0;i<7;i++){const x=(randomSky()*850+50)*k,y=randomSky()*200+80;pollen+=`<circle class="pollen" cx="${f(x)}" cy="${f(y)}" r="1.3" fill="#a4ab75" style="animation-delay:${-i*1.3}s"/>`;}}
 return `${sky}<g clip-path="url(#${uid}-clip)">${atmosphere}${grasses}${rootsBg}${dots}${rendered}${pollen}</g>`;
}
export function exportSVG(plot,roots=false){return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="950" viewBox="0 0 1000 594">${sceneMarkup(plot,{roots,uid:'export'})}<rect y="540" width="1000" height="54" fill="#f1f2e8"/><text x="32" y="572" font-family="Georgia,serif" font-size="17" fill="#314830">FALLOW · a small world, grown by you</text><text x="965" y="572" text-anchor="end" font-family="Arial,sans-serif" font-size="10" fill="#314830">DAY ${plot.day} / RAIN ${plot.rain}% / SUN ${plot.light}% · seoshiro</text></svg>`;}
