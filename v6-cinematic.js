
(() => {
  const body=document.body, mode=body.dataset.mode||[...body.classList].find(c=>c.startsWith('fx-'))?.replace('fx-','')||'generic';
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const accentMap={nova:[131,255,191],velocity:[255,105,78],apex:[244,246,248],pulse:[92,224,177],nexus:[0,255,221],mono:[255,255,255],aura:[229,187,185],vertex:[173,214,255]};
  const a=accentMap[mode]||[131,255,191]; document.documentElement.style.setProperty('--fx-accent-rgb',a.join(','));
  const make=(tag,cls,parent=document.body)=>{const e=document.createElement(tag);e.className=cls;parent.appendChild(e);return e};
  const pre=make('div','fx-preloader');pre.innerHTML='<div class="loader-ring"></div><div class="loader-mark">FRONTEND VAULT / '+mode.toUpperCase()+'</div>';
  const transition=make('div','fx-transition');transition.innerHTML='<i></i><i></i><i></i><i></i><i></i>';
  const grain=make('div','fx-grain'); const caption=make('div','fx-cinema-caption');caption.textContent='FRONTEND VAULT / CINEMATIC MODE';
  const rail=make('div','fx-side-rail');for(let i=0;i<6;i++) rail.appendChild(document.createElement('i'));

  function addStage(){
    const main=document.querySelector('main'); if(!main) return;
    const stage=document.createElement('section');stage.className='fx-stage fx-mask-reveal';stage.dataset.fxSection='signature';
    stage.innerHTML=`<canvas class="fx-webgl" aria-hidden="true"></canvas><div class="fx-webgl-fallback"></div><svg class="fx-svg-morph" viewBox="0 0 800 800" aria-hidden="true"><path d="M400,90 C570,90 710,225 710,390 C710,580 565,710 400,710 C220,710 90,565 90,400 C90,220 220,90 400,90 Z"><animate attributeName="d" dur="7s" repeatCount="indefinite" values="M400,90 C570,90 710,225 710,390 C710,580 565,710 400,710 C220,710 90,565 90,400 C90,220 220,90 400,90 Z;M400,70 C590,110 730,255 680,430 C630,600 545,735 375,690 C185,642 60,530 115,350 C168,174 242,89 400,70 Z;M400,90 C570,90 710,225 710,390 C710,580 565,710 400,710 C220,710 90,565 90,400 C90,220 220,90 400,90 Z"/></path></svg><div class="fx-orbit-core"></div><div class="stage-copy"><div class="stage-kicker">SIGNATURE EXPERIENCE / 06</div><h2>${({nova:'Intelligence, in motion.',velocity:'Ideas that refuse to sit still.',apex:'Motion, engineered.',pulse:'Make numbers feel alive.',nexus:'Enter the system.',mono:'Code is the interface.',aura:'Fashion, in a new frame.',vertex:'The product is the world.'}[mode]||'Designed to move.')}</h2><p>${({nova:'A cinematic control surface built around orchestration, confidence and response.',velocity:'A visual studio experience using masks, type rhythm and art-directed motion.',apex:'A performance scene where speed, depth and light become part of the interface.',pulse:'A living financial surface where information has pace, hierarchy and signal.',nexus:'A reactive game world with radar, scan, glitch and HUD-like depth.',mono:'A developer portfolio that treats the browser like an instrument.',aura:'A fashion editorial where typography, space and image rhythm carry the story.',vertex:'A product launch sequence designed around dimensionality and motion.'}[mode]||'An interactive visual layer for modern digital products.')}</p></div>`;
    const children=[...main.children]; const anchor=children[1]||children[0]; main.insertBefore(stage,anchor);
    return stage;
  }
  function addHorizontal(){
    const main=document.querySelector('main'); if(!main) return; const wrap=document.createElement('section');wrap.className='fx-horizontal';wrap.dataset.fxSection='horizontal';
    const labels={nova:['ORCHESTRATE','OBSERVE','OPTIMIZE'],velocity:['ART DIRECTION','MOTION SYSTEM','IDENTITY'],apex:['SHAPE','SPEED','PRECISION'],pulse:['SIGNAL','FLOW','CONTROL'],nexus:['SCAN','TARGET','LAUNCH'],mono:['STACK','SHIP','ITERATE'],aura:['FORM','TEXTURE','LIGHT'],vertex:['DESIGN','ENGINEER','LAUNCH']}[mode]||['01','02','03'];
    const track=document.createElement('div');track.className='h-track';labels.forEach((label,i)=>{const p=document.createElement('article');p.className='fx-panel fx-depth fx-mask-reveal';p.innerHTML=`<span class="panel-num">${String(i+1).padStart(2,'0')} / ${mode.toUpperCase()}</span><div class="shape"></div><div class="panel-title">${label}</div>`;track.appendChild(p)});wrap.appendChild(track);const second=[...main.children].find(x=>x.id==='signal'||x.id==='pricing');main.insertBefore(wrap,second||null);return wrap;
  }
  const stage=addStage(), horiz=addHorizontal();

  function webglLike(canvas){
    if(reduce||!canvas) return;
    const gl=canvas.getContext('webgl',{alpha:true,antialias:true}); if(!gl) return;
    const vs=`attribute vec3 p; attribute float s; uniform float t; varying float v; void main(){float c=cos(t*.35),q=sin(t*.35);vec3 r=vec3(p.x*c-p.z*q,p.y,p.x*q+p.z*c);float d=1.8-r.z;gl_Position=vec4(r.xy/d,r.z*.35,1.0);gl_PointSize=s*(1.8/d);v=s;}`;
    const fs=`precision mediump float; uniform vec3 col; varying float v; void main(){float d=distance(gl_PointCoord,vec2(.5));if(d>.5)discard;float a=(1.0-d*2.0)*.75;gl_FragColor=vec4(col,a);}`;
    const compile=(type,src)=>{const sh=gl.createShader(type);gl.shaderSource(sh,src);gl.compileShader(sh);return sh};
    const prog=gl.createProgram();gl.attachShader(prog,compile(gl.VERTEX_SHADER,vs));gl.attachShader(prog,compile(gl.FRAGMENT_SHADER,fs));gl.linkProgram(prog);gl.useProgram(prog);
    const pts=[];const N=420;for(let i=0;i<N;i++){const z=Math.random()*2-1,th=Math.random()*Math.PI*2,r=Math.sqrt(1-z*z),rad=.26+.18*Math.random();pts.push(r*Math.cos(th)*rad,r*Math.sin(th)*rad,z*rad,(Math.random()*2+.8));}
    const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(pts),gl.STATIC_DRAW);const pLoc=gl.getAttribLocation(prog,'p'),sLoc=gl.getAttribLocation(prog,'s');gl.enableVertexAttribArray(pLoc);gl.vertexAttribPointer(pLoc,3,gl.FLOAT,false,16,0);gl.enableVertexAttribArray(sLoc);gl.vertexAttribPointer(sLoc,1,gl.FLOAT,false,16,12);const tLoc=gl.getUniformLocation(prog,'t'),cLoc=gl.getUniformLocation(prog,'col');gl.uniform3f(cLoc,a[0]/255,a[1]/255,a[2]/255);
    function resize(){const r=canvas.getBoundingClientRect();canvas.width=Math.max(1,Math.floor(r.width*devicePixelRatio));canvas.height=Math.max(1,Math.floor(r.height*devicePixelRatio));gl.viewport(0,0,canvas.width,canvas.height);}resize();addEventListener('resize',resize);
    let start=performance.now(); function frame(now){const t=(now-start)/1000;gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.uniform1f(tLoc,t);gl.drawArrays(gl.POINTS,0,N);requestAnimationFrame(frame)}requestAnimationFrame(frame);
  }
  webglLike(stage?.querySelector('canvas'));

  if(!reduce){
    window.addEventListener('load',()=>setTimeout(()=>pre.classList.add('done'),520));
    window.addEventListener('beforeunload',()=>{transition.classList.add('in');});
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('fx-in'); if(e.target.matches('[data-fx-section]')) body.dataset.activeSection=e.target.dataset.fxSection; io.unobserve(e.target)}}),{threshold:.16});
    document.querySelectorAll('.fx-stage,.fx-panel,.fx-mask-reveal').forEach((el,i)=>{el.style.setProperty('--fx-delay',(i%5)*90+'ms');io.observe(el)});
    if(horiz){
      const panels=[...horiz.querySelectorAll('.fx-panel')];let rect=horiz.getBoundingClientRect();
      const setH=()=>{horiz.style.height=Math.max(innerHeight*1.8,innerHeight+Math.min(2.8,panels.length-1)*innerWidth*.6)+'px';rect=horiz.getBoundingClientRect()};setH();addEventListener('resize',setH);
      const onScroll=()=>{const start=rect.top+scrollY, total=horiz.offsetHeight-innerHeight, p=Math.max(0,Math.min(1,(scrollY-start)/Math.max(1,total)));horiz.querySelector('.h-track').style.setProperty('--hx',p*((panels.length-1)*(Math.min(58,84)*.01)*innerWidth));};addEventListener('scroll',onScroll,{passive:true});onScroll();
    }
    const depth=[...document.querySelectorAll('.fx-depth,[data-tilt],.hero-console,.device,.poster,.look,.window,.buy-box')];
    depth.forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX/r.width-r.left/r.width,y=e.clientY/r.height-r.top/r.height;el.style.transform=`perspective(1200px) rotateX(${(0.5-y)*7}deg) rotateY(${(x-0.5)*9}deg) translateY(-4px)`},{passive:true}));
    depth.forEach(el=>el.addEventListener('pointerleave',()=>el.style.removeProperty('transform')));
    addEventListener('scroll',()=>{document.querySelectorAll('.fx-parallax').forEach(el=>{const r=el.getBoundingClientRect(),y=(innerHeight/2-r.top-r.height/2)*.05;el.style.transform=`translate3d(0,${y}px,0)`})},{passive:true});
    const railItems=[...rail.children], sections=[...document.querySelectorAll('main section')]; addEventListener('scroll',()=>{let idx=0,best=Infinity;sections.forEach((s,i)=>{const d=Math.abs(s.getBoundingClientRect().top-innerHeight*.32);if(d<best){best=d;idx=i}});railItems.forEach((x,i)=>x.classList.toggle('active',i===idx%railItems.length))},{passive:true});
    // fragment links become cinematic transitions
    document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{transition.classList.remove('out');transition.classList.add('in');setTimeout(()=>transition.classList.remove('in'),650)}));
  } else {pre.classList.add('done');transition.remove();caption.remove();rail.remove();grain.remove()}
})();
