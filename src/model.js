export const MAX_PLANTS = 24;
export const MAX_DAY = 120;
export const SPECIES = [
  {id:'poppy',name:['Poppy','Мак'],latin:'Papaver rhoeas',color:'#b86249',petal:'#dc8462',leaf:'#56684b',height:240,rain:35,light:90,growth:0.058,bloom:[30,88],radius:85,description:['A sun lover. Happy with less rain.','Любит солнце. Обходится малым количеством дождя.']},
  {id:'daisy',name:['Oxeye daisy','Нивяник'],latin:'Leucanthemum vulgare',color:'#e8dfb9',petal:'#f9f9e8',leaf:'#5b7150',height:200,rain:55,light:75,growth:0.065,bloom:[28,98],radius:70,description:['Easy company. A little sun, a little rain.','Неприхотливый сосед. Немного солнца и дождя.']},
  {id:'cornflower',name:['Cornflower','Василёк'],latin:'Centaurea cyanus',color:'#657eb4',petal:'#8da2c9',leaf:'#59786b',height:220,rain:45,light:85,growth:0.057,bloom:[35,92],radius:65,description:['Blue on a clear day. Prefers open light.','Синева ясного дня. Предпочитает открытый свет.']},
  {id:'clover',name:['Red clover','Клевер'],latin:'Trifolium pratense',color:'#a7779e',petal:'#bc8faf',leaf:'#618364',height:115,rain:65,light:55,growth:0.072,bloom:[20,108],radius:95,description:['Low and lovely. Thrives in softer light.','Невысокий, нежный. Хорошо растёт в полутени.']},
  {id:'yarrow',name:['Yarrow','Тысячелистник'],latin:'Achillea millefolium',color:'#e5ca76',petal:'#f0dda0',leaf:'#7b8260',height:205,rain:25,light:85,growth:0.052,bloom:[40,106],radius:80,description:['Quietly resilient. Made for dry days.','Спокойная стойкость. Создан для сухих дней.']},
  {id:'grass',name:['Meadow grass','Луговой злак'],latin:'Poa pratensis',color:'#898954',petal:'#b1af72',leaf:'#738659',height:270,rain:60,light:65,growth:0.065,bloom:[48,116],radius:80,description:['The green between. Gives the meadow its rhythm.','Зелень между цветами. Задаёт ритм лугу.']}
];
export const speciesById = id => SPECIES.find(s=>s.id===id);
export const clamp = (n,min,max) => Math.min(max,Math.max(min,n));
export function random(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
export function makePlot(preset='open',seed=42017){
 const rand=random(seed),ids=preset==='dry'?['yarrow','poppy','yarrow','cornflower','poppy','yarrow','grass','poppy','cornflower','yarrow']:preset==='shade'?['clover','grass','daisy','clover','grass','clover','daisy','clover','grass','daisy']:['grass','daisy','poppy','clover','cornflower','grass','yarrow','daisy','poppy','clover','cornflower','grass','daisy','yarrow','poppy','clover'];
 return {version:1,title:preset,seed,day:preset==='empty'?0:52,rain:preset==='dry'?25:preset==='shade'?65:55,light:preset==='shade'?40:78,plants:preset==='empty'?[]:ids.map((species,i)=>({id:i+1,species,x:55+(i/(ids.length-1))*890+(rand()-.5)*20,z:rand(),planted:0,seed:Math.floor(rand()*1e7)}))};
}
// A deterministic artistic model. Traits are authored, dimensionless values,
// not a calibrated ecological or agricultural forecast.
export function simulate(plot,day=plot.day){
 day=clamp(Math.round(day),0,MAX_DAY);const plants=plot.plants.map(p=>({...p,growth:0.025,health:1,age:0,water:plot.rain/100,bloom:0,competition:0}));
 let soil=.4;
 for(let d=0;d<=day;d++){
  soil=clamp(soil*.9+(plot.rain/100)*.13-(plot.light/100)*.024+.004*Math.sin((d+plot.seed%100)/4),0,1);
  const previous=plants.map(p=>({growth:p.growth,health:p.health}));
  plants.forEach((p,i)=>{
   if(d<p.planted){p.growth=0;p.bloom=0;return}const s=speciesById(p.species);p.age=d-p.planted;
   if(d===p.planted)p.growth=.025;
   let competition=0,shade=0;
   plants.forEach((q,j)=>{if(j===i||d<q.planted)return;const distance=Math.hypot((q.x-p.x),(q.z-p.z)*130);const overlap=Math.max(0,1-distance/(s.radius+speciesById(q.species).radius));competition+=overlap*previous[j].growth*.24;const taller=speciesById(q.species).height*previous[j].growth>s.height*previous[i].growth;if(taller)shade+=overlap*previous[j].growth*.13;});
   p.competition=clamp(competition,0,.7);
   const water=clamp(soil/(.95+s.rain/500)-p.competition*.15,0,1),light=clamp(plot.light/100-shade,.01,1);
   const moistureFit=Math.max(.04,1-Math.abs(water-s.rain/100)*1.15),lightFit=Math.max(.08,1-Math.abs(light-s.light/100)*.85);
   const drought=clamp((.17-water)*3.5,0,.5),dark=clamp((.12-light)*1.2,0,.3),season=clamp((p.age-98)/60,0,.45);
   p.health=clamp(p.health+.009*moistureFit*lightFit-drought*.07-dark*.04-season*.015,.05,1);
   const growth=s.growth*(.35+p.growth)*Math.max(.05,1-p.growth)*moistureFit*lightFit*(1-p.competition)*p.health;
   p.growth=clamp(p.growth+growth-drought*.006-season*.004,.018,1);
   p.water=water;
   const start=s.bloom[0]+Math.round((1-moistureFit*lightFit)*16);const end=s.bloom[1];
   p.bloom=p.age<start||p.age>end||p.growth<.32?0:clamp(Math.min((p.age-start)/12,(end-p.age)/15),0,1)*p.health;
  });
 }
 const active=plants.filter(p=>p.planted<=day);const alive=active.filter(p=>p.health>.3&&p.growth>.1);
 return {day,soil,plants,species:new Set(alive.map(p=>p.species)).size,blooms:active.filter(p=>p.bloom>.15).length,vitality:active.length?Math.round(active.reduce((sum,p)=>sum+p.health,0)/active.length*100):0,coverage:Math.round(active.reduce((sum,p)=>sum+p.growth*speciesById(p.species).radius,0)/18)};
}
export function addPlant(plot,species,x,z=.6){
 if(!speciesById(species))throw new Error('Unknown species');if(plot.plants.length>=MAX_PLANTS)throw new Error('Meadow is full');
 const ids=new Set(plot.plants.map(p=>p.id));let next=1;while(ids.has(next))next++;return {...plot,plants:[...plot.plants,{id:next,species,x:clamp(x,35,965),z:clamp(z,0,1),planted:plot.day,seed:(plot.seed+next*7193)>>>0}]};
}
export function validatePlot(value){
 if(!value||typeof value!=='object'||value.version!==1)throw new Error('Unsupported meadow file');
 if(!Number.isInteger(value.seed)||value.seed<0||value.seed>4294967295)throw new Error('Invalid seed');
 for(const [key,max] of [['rain',100],['light',100],['day',120]])if(!Number.isFinite(value[key])||value[key]<0||value[key]>max)throw new Error('Invalid '+key);
 if(!Array.isArray(value.plants)||value.plants.length>MAX_PLANTS)throw new Error('Invalid planting count');
 const ids=new Set();const plants=value.plants.map(p=>{
  if(!p||!Number.isSafeInteger(p.id)||p.id<1||p.id>1e9||ids.has(p.id)||!speciesById(p.species))throw new Error('Invalid plant');ids.add(p.id);
  for(const [key,min,max] of [['x',35,965],['z',0,1],['planted',0,120],['seed',0,4294967295]])if(!Number.isFinite(p[key])||p[key]<min||p[key]>max)throw new Error('Invalid plant '+key);
  return {id:p.id,species:p.species,x:p.x,z:p.z,planted:Math.round(p.planted),seed:Math.floor(p.seed)};
 });
 return {version:1,title:typeof value.title==='string'?value.title.slice(0,80):'open',seed:value.seed,day:Math.round(value.day),rain:Math.round(value.rain),light:Math.round(value.light),plants};
}
