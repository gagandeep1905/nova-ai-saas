const q=s=>document.querySelector(s), all=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const body=document.body;
const mode=body.dataset.mode || [...body.classList].find(c=>c.startsWith('fx-'))?.replace('fx-','') || 'generic';

q('.menu')?.addEventListener('click',()=>q('.navlinks')?.classList.toggle('open'));

const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('fx-in'); ro.unobserve(e.target)}}),{threshold:.12});
all('section,.hero-copy,.hero-console,.car-scene,.device,.poster,.look,.price,.f-card,.side-stat,.transactions,.tx,article,.feature,.story,.specs,.project').forEach((el,i)=>{el.classList.add('fx-reveal');el.style.setProperty('--fx-delay',`${Math.min(i%7,6)*85}ms`);ro.observe(el)});

if(!reduce){
 const spot=document.createElement('div');spot.className='fx-spot';body.appendChild(spot);
 let mx=innerWidth/2,my=innerHeight/2,tx=mx,ty=my;
 addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
 const loop=()=>{tx+=(mx-tx)*.11;ty+=(my-ty)*.11;spot.style.transform=`translate3d(${tx}px,${ty}px,0)`;requestAnimationFrame(loop)};loop();
 all('a,button,.round,.cta,.buy,.play,.primary,.navpill').forEach(el=>{
   el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--mx',`${x*12}px`);el.style.setProperty('--my',`${y*9}px`)});
   el.addEventListener('pointerleave',()=>{el.style.removeProperty('--mx');el.style.removeProperty('--my')});
 });
 all('[data-tilt],.hero-console,.money-card,.device,.hud,.poster,.look,.load-card,.window,.buy-box').forEach(el=>{
   el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--rx',`${-y*6}deg`);el.style.setProperty('--ry',`${x*8}deg`);el.style.transform=`perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(-3px)`});
   el.addEventListener('pointerleave',()=>el.style.transform='');
 });
}
const progress=document.createElement('div');progress.className='fx-progress';body.appendChild(progress);
const updateProgress=()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${h?scrollY/h:0})`;};addEventListener('scroll',updateProgress,{passive:true});updateProgress();

if(!reduce){
 const canvas=document.createElement('canvas');canvas.className='fx-canvas';body.prepend(canvas);const ctx=canvas.getContext('2d');let W=0,H=0,dpr=Math.min(devicePixelRatio||1,2),nodes=[];
 const palettes={nova:[110,255,230],velocity:[255,90,70],apex:[255,255,255],pulse:[95,210,180],nexus:[0,255,220],mono:[255,255,255],aura:[224,185,180],vertex:[220,230,255]};
 const pc=palettes[mode]||[255,255,255];
 function resize(){W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0);nodes=Array.from({length:Math.min(70,Math.floor(W/22))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.18,r:Math.random()*1.7+.4,a:Math.random()*.26+.05}))}resize();addEventListener('resize',resize);
 function draw(){ctx.clearRect(0,0,W,H);for(const p of nodes){p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.fillStyle=`rgba(${pc[0]},${pc[1]},${pc[2]},${p.a})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}requestAnimationFrame(draw)}draw();
}

if(!reduce && mode==='nova'){const hero=q('.hero-console');if(hero){const rings=document.createElement('div');rings.className='fx-orbits';rings.innerHTML='<i></i><i></i><i></i>';hero.append(rings)}}
if(!reduce && mode==='velocity'){const h1=q('h1');if(h1){const clone=h1.cloneNode(true);clone.className='fx-ghost';h1.parentElement.append(clone)}}
if(!reduce && mode==='apex'){const scene=q('.car-scene');if(scene){const streak=document.createElement('div');streak.className='fx-speedlines';scene.append(streak)}addEventListener('scroll',()=>{q('.car-scene')?.style.setProperty('--scroll-shift',`${Math.min(100,scrollY*.05)}px`)},{passive:true})}
if(!reduce && mode==='pulse'){all('.big-chart,.spark').forEach(el=>el.classList.add('fx-draw'))}
if(!reduce && mode==='nexus'){const hero=q('.hero');if(hero){const scan=document.createElement('div');scan.className='fx-radar';hero.append(scan)}setInterval(()=>q('h1')?.classList.toggle('fx-glitch'),2200)}
if(!reduce && mode==='mono'){all('.hero-code div').forEach((el,i)=>{el.style.setProperty('--type-delay',`${i*450}ms`);el.classList.add('fx-type')})}
if(!reduce && mode==='aura'){const img=q('.hero-image');if(img){const veil=document.createElement('div');veil.className='fx-veil';img.append(veil)}}
if(!reduce && mode==='vertex'){const dev=q('.device');if(dev){const halo=document.createElement('div');halo.className='fx-device-halo';dev.append(halo)}}
