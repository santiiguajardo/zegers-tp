/* ============================================================
   Presentación interactiva · Cazú Zegers · TyC 1.4 Cacopardo
   Navegación + widgets. Los datos están en data.js / ctx.js
   ============================================================ */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const el=(tag,cls,html)=>{const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e;};
const fmt=n=>Number(n).toLocaleString('es-AR',{maximumFractionDigits:2});
const obraImg=w=>`assets/obras/${w.slug}.jpg`;
const byName=n=>WORKS.find(w=>w.slug===n);

const isPresenter=/[?&]presenter/.test(location.search);
const stage=$('#stage');
const slides=$$('.slide');
const widgets={};           // id -> {onStep(n,silent), onEnter()}
let cur=0, step=0, pvWin=null;
const memo=slides.map(()=>0);

/* ---------- escala del escenario ---------- */
function fit(){
  const s=Math.min(innerWidth/1920,innerHeight/1080);
  stage.style.transform=`translate(${-960*s}px,${-540*s}px) scale(${s})`;
}
addEventListener('resize',fit); fit();

/* ---------- pasos ---------- */
const stepsOf=s=>+s.dataset.steps||0;
function applyStep(i,n){
  const s=slides[i];
  $$('.step',s).forEach(e=>e.classList.toggle('on',(+e.dataset.step||0)<=n));
  const w=widgets[s.id]; if(w&&w.onStep) w.onStep(n);
}

/* ---------- navegación ---------- */
function show(i,n){
  i=Math.max(0,Math.min(slides.length-1,i));
  n=Math.max(0,Math.min(stepsOf(slides[i]),n));
  if(i!==cur){ slides[cur].classList.remove('active'); slides[i].classList.add('active'); cur=i; const w=widgets[slides[i].id]; if(w&&w.onEnter) w.onEnter(); }
  step=n; memo[i]=n; applyStep(i,n);
  $('#bar').style.width=((i+1)/slides.length*100)+'%';
  $('#count').textContent=(i+1)+' / '+slides.length;
  if(!isPresenter) history.replaceState(null,'','#'+(i+1));
  sync();
}
function next(){ if(step<stepsOf(slides[cur])) show(cur,step+1); else if(cur<slides.length-1) show(cur+1,0); }
function prev(){ if(step>0) show(cur,step-1); else if(cur>0) show(cur-1,stepsOf(slides[cur-1])); }
function nextSlide(){ if(cur<slides.length-1) show(cur+1,0); }
function prevSlide(){ if(cur>0) show(cur-1,0); }
const App={ setStep:n=>show(cur,n), get step(){return step;} };

/* ---------- vista del presentador (ventana aparte) ---------- */
function stateMsg(){
  const s=slides[cur], nt=$('.notes',s);
  return {type:'state',i:cur,step,total:slides.length,steps:stepsOf(s),title:s.dataset.title||'',notes:nt?nt.innerText.trim():'',next:slides[cur+1]?slides[cur+1].dataset.title:'(fin)'};
}
function sync(){ if(pvWin&&!pvWin.closed) pvWin.postMessage(stateMsg(),'*'); }
function openPresenter(){
  const url=location.href.split('#')[0].split('?')[0]+'?presenter=1';
  pvWin=window.open(url,'tyc_presenter','width=980,height=860');
  setTimeout(sync,900);
}
addEventListener('message',e=>{
  const d=e.data||{};
  if(d.type==='cmd'){ ({next,prev,nextSlide,prevSlide})[d.cmd]&&({next,prev,nextSlide,prevSlide})[d.cmd](); }
  if(d.type==='ready') sync();
});

/* ---------- teclado ---------- */
addEventListener('keydown',e=>{
  if(isPresenter||e.ctrlKey||e.metaKey||e.altKey) return;
  const k=e.key;
  if(k==='ArrowRight'||k===' '||k==='Enter'){ e.preventDefault(); if(e.target.blur) e.target.blur(); next(); }
  else if(k==='ArrowLeft'||k==='Backspace'){ e.preventDefault(); if(e.target.blur) e.target.blur(); prev(); }
  else if(k==='PageDown'||k==='ArrowDown'){ e.preventDefault(); nextSlide(); }
  else if(k==='PageUp'||k==='ArrowUp'){ e.preventDefault(); prevSlide(); }
  else if(k==='Home') show(0,0);
  else if(k==='End') show(slides.length-1,0);
  else if(k==='f'||k==='F'){ if(window.togglePantallaCompleta) togglePantallaCompleta(); }
  else if(k==='b'||k==='B'){ const b=$('#black'); b.style.display=b.style.display==='block'?'none':'block'; }
  else if(k==='g'||k==='G'){ toggleOverview(); }
  else if(k==='p'||k==='P'){ openPresenter(); }
  else if(k==='?'||k==='h'||k==='H'){ const h=$('#help'); h.style.display=h.style.display==='flex'?'none':'flex'; }
  else if(k==='Escape'){ $('#over').style.display='none'; $('#help').style.display='none'; $('#black').style.display='none'; }
});
$('#help').addEventListener('click',()=>$('#help').style.display='none');

function toggleOverview(){
  const o=$('#over'); if(o.style.display==='block'){o.style.display='none';return;}
  const g=$('#ovgrid'); g.innerHTML='';
  slides.forEach((s,i)=>{ const b=el('button','ovc'+(i===cur?' cur':''),`<i>${i+1}</i><span>${s.dataset.title||''}</span>`); b.onclick=()=>{o.style.display='none';show(i,0);}; g.appendChild(b); });
  o.style.display='block';
}

/* ============================================================
   WIDGETS
   ============================================================ */

/* ---- portada: mosaico ---- */
(function(){
  const m=$('#mosaic'); const list=WORKS.slice().sort((a,b)=>a.anio-b.anio);
  list.forEach((w,i)=>{ const im=el('img'); im.src=obraImg(w); im.alt=''; im.style.animationDelay=(i*70)+'ms'; m.appendChild(im); });
})();

/* ---- salones ---- */
(function(){
  const V=['casa-cala','hotel-tierra-patagonia','capilla-espiritu-santo','casa-cascara','casa-granero','casa-k','casa-ye','casa-fogon'];
  const fv=$('#framesV'), fl=$('#framesL');
  V.forEach(n=>{ const f=el('div','frame'); const im=el('img'); im.src=`assets/obras/${n}.jpg`; im.alt=''; f.appendChild(im); fv.appendChild(f); });
  for(let i=0;i<8;i++) fl.appendChild(el('div','frame ghost','?'));
})();

/* ---- videos de las teóricas ---- */
(function(){
  const box=document.getElementById('vids'); if(!box||typeof VIDEOS==='undefined') return;
  Object.keys(VIDEOS).forEach(k=>{ const g=el('div','vg','<h3>Teórica '+k+'</h3>');
    VIDEOS[k].forEach((v,i)=>{ const a=el('a','','<b>V'+(i+1)+'</b>'+(v.t.replace(/^V[0-9]+[ ]*/i,'').replace(/^ANTICIPACIONES P PRITZKER[ ]*/,'Anticipaciones Pritzker · ')||'Video completo')); a.href='https://www.youtube.com/watch?v='+v.id; a.target='_blank'; a.rel='noopener'; g.appendChild(a); });
    box.appendChild(g); });
})();

/* ---- clases ---- */
(function(){
  const box=$('#classes'), det=$('#clsDetail');
  CLASES.forEach(c=>{
    const b=el('button','cls'+(c.uso?'':' off'),`<div class="n">${c.n}</div><div class="t">${c.t}</div><div class="s">${c.s}</div>`);
    b.onclick=()=>{ $$('.cls',box).forEach(x=>x.classList.remove('sel')); b.classList.add('sel');
      det.innerHTML=c.uso?`<span><b class="pg">Clase ${c.n}.</b> ${c.nota}</span>`:`<span><b class="pg">Clase ${c.n}.</b> No entró de forma directa en el trabajo.</span>`; };
    box.appendChild(b);
  });
})();

/* ---- corpus: conteo + filtros ---- */
(function(){
  const sl=$('#s-corpus'), filters={}; let dimId='mat';
  const dimsBox=$('#cDims'), bars=$('#cBars'), chips=$('#cChips'), grid=$('#cGrid'), card=$('#cCard');
  const thumbs=WORKS.map(w=>{ const t=el('div','w',`<img src="${obraImg(w)}" alt=""><span class="yr">${w.anio}</span>`); t.onmouseenter=()=>showCard(w); t.onclick=()=>{ showCard(w); if(window.openObra) openObra(w.slug); }; grid.appendChild(t); return t; });
  function passes(w,skip){ return DIMS.every(d=>d.id===skip||!filters[d.id]||d.get(w)===filters[d.id]); }
  function showCard(w){
    card.className='wcard';
    card.innerHTML=`<h3>${w.nombre} <span style="display:inline;font-size:20px;letter-spacing:.1em;color:var(--gold)">${w.anio}</span></h3>
      <div><span>Lugar</span>${w.lugar}</div><div><span>Superficie</span>${fmt(w.m2)} m²</div><div><span>Cliente</span>${w.cliente}</div><div><span>Colabora</span>${w.colab}</div>
      <div><span>Materialidad</span>${w.mat}</div><div><span>Comitente</span>${w.com}</div><div><span>Programa</span>${w.prog}</div><div><span>Tipología</span>${w.tip}</div>`;
  }
  function render(){
    const base=WORKS.filter(w=>passes(w));
    $('#cCount').textContent=base.length;
    $('#cOf').textContent=base.length===WORKS.length?'relevadas':'de '+WORKS.length;
    thumbs.forEach((t,i)=>t.classList.toggle('dim',!base.includes(WORKS[i])));
    const m2=base.map(w=>w.m2).sort((a,b)=>a-b);
    const med=m2.length?(m2.length%2?m2[(m2.length-1)/2]:(m2[m2.length/2-1]+m2[m2.length/2])/2):0;
    const big=base.slice().sort((a,b)=>b.m2-a.m2)[0];
    $('#cStats').innerHTML=base.length?`<span>mediana <b>${fmt(med)} m²</b></span><span>mayor: <b>${big.nombre}</b> (${fmt(big.m2)} m²)</span>`:'';
    dimsBox.innerHTML='';
    DIMS.forEach(d=>{ const b=el('button','dim'+(d.id===dimId?' act':'')+(filters[d.id]?' has':'')+(d.nuevo?' nw':''),d.label); b.onclick=()=>{dimId=d.id;render();}; dimsBox.appendChild(b); });
    const d=DIMS.find(x=>x.id===dimId); const pool=WORKS.filter(w=>passes(w,dimId)); const counts={};
    pool.forEach(w=>{const v=d.get(w); counts[v]=(counts[v]||0)+1;});
    const rows=Object.entries(counts).sort((a,b)=>b[1]-a[1]); const mx=rows.length?rows[0][1]:1;
    bars.innerHTML='';
    rows.forEach(([v,c])=>{ const b=el('button','bar'+(filters[dimId]===v?' sel':''),`<span class="lb">${v}</span><span class="tr"><span class="fl" style="display:block"></span></span><span class="ct">${c}</span>`);
      b.onclick=()=>{ if(filters[dimId]===v) delete filters[dimId]; else filters[dimId]=v; render(); };
      bars.appendChild(b); requestAnimationFrame(()=>requestAnimationFrame(()=>{ $('.fl',b).style.width=(c/mx*100)+'%'; })); });
    chips.innerHTML='';
    Object.keys(filters).forEach(k=>{ const dd=DIMS.find(x=>x.id===k); const c=el('span','chip',`${dd.label}: ${filters[k]}`); const x=el('button','',  '×'); x.onclick=()=>{delete filters[k];render();}; c.appendChild(x); chips.appendChild(c); });
    if(Object.keys(filters).length){ const r=el('button','reset','limpiar filtros'); r.onclick=()=>{ for(const k in filters) delete filters[k]; render(); }; chips.appendChild(r); }
  }
  widgets['s-corpus']={onEnter:render}; render();
})();

/* ---- cronología ---- */
(function(){
  const Y0=1990,Y1=2025;
  const rng=$('#cRange'), yEl=$('#cYear'), wk=$('#cWorks'), ctx=$('#cCtx'), ticks=$('#cTicks'), play=$('#cPlay'), only=$('#cOnly');
  const workYears=[...new Set(WORKS.map(w=>w.anio))].sort((a,b)=>a-b);
  const SPEEDS=[3,5,8,12,18,25]; let si=2;
  let timer=null, onlyW=false;
  for(let y=Y0;y<=Y1;y++){ const p=(y-Y0)/(Y1-Y0)*100; const has=workYears.includes(y); const t=el('div','tick'+(has?' has':'')); t.style.left=p+'%'; ticks.appendChild(t);
    if(y%5===0){ const l=el('div','tl',y); l.style.left=p+'%'; l.style.top='52px'; ticks.appendChild(l);} }
  if(typeof PREMIOS!=='undefined'){ [...new Set(PREMIOS.map(p=>p.y))].forEach(y=>{ const m=el('div','tk-p'); m.style.left=((y-Y0)/(Y1-Y0)*100)+'%'; ticks.appendChild(m); }); [...new Set(PUBLICACIONES.map(p=>p.y))].forEach(y=>{ const m=el('div','tk-q'); m.style.left=((y-Y0)/(Y1-Y0)*100)+'%'; ticks.appendChild(m); }); }
  const ROWS=[['arq_cl','Arquitectura en Chile','var(--disc)'],['arq_int','Arquitectura internacional','var(--valid)'],['pol_cl','Contexto en Chile','var(--poder)'],['mundial','Contexto mundial','var(--gold)']];
  function render(){
    const y=+rng.value; yEl.textContent=y;
    const ws=WORKS.filter(w=>w.anio===y); wk.innerHTML='';
    if(!ws.length) wk.appendChild(el('div','cw-none','Sin obra relevada este año'));
    ws.forEach(w=>{ const d=el('div','cw','<img src="'+obraImg(w)+'" alt=""><b>'+w.nombre+'</b><span>'+((window.FICHAS&&FICHAS[w.slug]&&FICHAS[w.slug].loc)||w.lugar)+' · '+fmt(w.m2)+' m²</span><span class="ver">Ver ficha y fotos ›</span>'); d.onclick=()=>{ if(window.openObra) openObra(w.slug); }; wk.appendChild(d); });
    const rec=$('#cRec'); if(rec){ rec.innerHTML=''; const R=window.reconocPorAnio?reconocPorAnio(y):{premios:[],pub:[]}; R.premios.forEach(p=>rec.appendChild(el('div','rc p','<i>Premio</i>'+p.t+'<em>'+p.obra+'</em>'))); R.pub.forEach(p=>rec.appendChild(el('div','rc q','<i>'+(p.tipo==='libro'?'Libro':'Publicación')+'</i>'+p.t+'<em>'+p.medio+'</em>'))); }
    const c=CTX[y]||{}; ctx.innerHTML='';
    ROWS.forEach(r=>ctx.appendChild(el('div','ctxc','<div class="mono">'+r[1]+'</div><p>'+(c[r[0]]||'—')+'</p>')).style.setProperty('--c',r[2]));
  }
  const snap=y=>workYears.reduce((p,c)=>Math.abs(c-y)<Math.abs(p-y)?c:p);
  function go(dir){ let y=+rng.value;
    if(onlyW){ y = dir>0 ? (workYears.find(v=>v>y)||workYears[0]) : ([...workYears].reverse().find(v=>v<y)||workYears[workYears.length-1]); }
    else { y+=dir; if(y>Y1) y=Y0; if(y<Y0) y=Y1; }
    rng.value=y; render(); }
  function startTimer(){ stopTimer(); timer=setInterval(()=>{ if(slides[cur].id!=='s-cron'){ stop(); return; } go(1); }, SPEEDS[si]*1000); }
  function stopTimer(){ if(timer){ clearInterval(timer); timer=null; } }
  function stop(){ stopTimer(); play.textContent='▶ Recorrer'; play.classList.remove('act'); }
  function manual(dir){ go(dir); if(timer) startTimer(); }
  rng.addEventListener('input',()=>{ if(onlyW) rng.value=snap(+rng.value); render(); });
  play.onclick=()=>{ if(timer){ stop(); return; } play.textContent='❚❚ Pausa'; play.classList.add('act'); startTimer(); };
  only.onclick=()=>{ onlyW=!onlyW; only.classList.toggle('act',onlyW); if(onlyW){ rng.value=snap(+rng.value); render(); } };
  $('#cPrev').onclick=()=>manual(-1); $('#cNext').onclick=()=>manual(1);
  const spd=()=>{ $('#cSpd').textContent=SPEEDS[si]+' s'; if(timer) startTimer(); };
  $('#cSlow').onclick=()=>{ si=Math.min(SPEEDS.length-1,si+1); spd(); }; $('#cFast').onclick=()=>{ si=Math.max(0,si-1); spd(); };
  addEventListener('keydown',e=>{ if(isPresenter||slides[cur].id!=='s-cron'||(window.obraAbierta&&obraAbierta())) return; if(e.key===']'){ manual(1); e.preventDefault(); } else if(e.key==='['){ manual(-1); e.preventDefault(); } });
  widgets['s-cron']={onEnter:render}; render();
})();

/* ---- biografía ---- */
(function(){
  const s=$('#s-bio'); s.dataset.steps=BIO.length-1;
  const IMG={'1958':'assets/img/cazu.jpg','1991–93':'assets/img/cc-foto1.jpg','1996':'assets/fotos/casa-santa-maria/00.jpg','1997':'assets/fotos/open-office/00.jpg','2011–12':'assets/img/tp-foto3.jpg','2017':'assets/img/tp-croquis.jpg','2023':'assets/fotos/jardin-cruz-roja/00.jpg','Hoy':'assets/img/cazu.jpg'};
  const TAG={disc:'Campo disciplinar',extra:'Campo extra-disciplinar',obra:'Obra y mercado'};
  const tr=$('#bTrack');
  BIO.forEach((b,i)=>{ const d=el('button','tdot tag-'+b.tag,`<i></i><span>${b.y}</span>`); d.style.left=((i+.5)/BIO.length*100)+'%'; d.onclick=()=>App.setStep(i); tr.appendChild(d); });
  function paint(i){ const b=BIO[i];
    $('#bY').textContent=b.y; $('#bT').textContent=b.t; $('#bD').textContent=b.d;
    const tg=$('#bTag'); tg.textContent=TAG[b.tag]; tg.className='bio-tag tag-'+b.tag;
    const im=$('#bImg'); im.innerHTML=IMG[b.y]?`<img src="${IMG[b.y]}" alt="">`:''; im.style.visibility=IMG[b.y]?'visible':'hidden';
    $$('.tdot',tr).forEach((d,j)=>d.classList.toggle('cur',j===i)); }
  widgets['s-bio']={onStep:paint,onEnter(){paint(step)}}; paint(0);
})();

/* ---- genealogía (recorrido por la lámina) ---- */
(function(){
  const view=$('#gView'), img=$('#gImg'), side=$('#gSide');
  const stops=[{t:'Vista general',r:[0,0,1,1],d:'La genealogía completa: campo disciplinar a la izquierda, extra-disciplinar a la derecha.'}].concat(GENEALOGIA);
  stops.forEach((st,i)=>{ const b=el('button','gstop',`<span class="gn">${i}</span><b>${st.t}</b><span class="gd">${st.d}</span>`); b.onclick=()=>App.setStep(i); side.appendChild(b); });
  function go(i){
    const nw=img.naturalWidth, nh=img.naturalHeight; if(!nw) return;
    const vw=view.clientWidth, vh=view.clientHeight, r=stops[i].r;
    const rw=(r[2]-r[0])*nw, rh=(r[3]-r[1])*nh;
    const s=Math.min(vw/rw,vh/rh)*(i?0.94:1);
    const cx=(r[0]+r[2])/2*nw, cy=(r[1]+r[3])/2*nh;
    img.style.width=nw+'px'; img.style.height=nh+'px';
    img.style.transform=`translate(${vw/2-cx*s}px,${vh/2-cy*s}px) scale(${s})`;
    $$('.gstop',side).forEach((b,j)=>b.classList.toggle('cur',j===i));
  }
  img.addEventListener('load',()=>go(step));
  widgets['s-gen']={onStep:go,onEnter(){go(step)}};
})();

/* ---- triángulos epistemológicos ---- */
const TRI={
 tp:{
  img:'assets/img/tp-hotel.jpg', name:'Hotel Tierra Patagonia', sub:'Torres del Paine · 2011–12',
  intro:`<div class="mono" style="color:var(--gold)">Ficha</div><h3 style="color:var(--ink)">Su obra más conocida</h3>
    <div class="intro-grid"><div><span>Superficie</span><b>4.900 m²</b></div><div><span>Terreno</span><b>70 hectáreas</b></div><div><span>Cliente</span><b>Katari S.A.</b></div><div><span>Construye</span><b>Grupo Aira</b></div><div><span>Programa</span><b>Hotel · madera · forma curva</b></div><div><span>Método</span><b>Gesto + Figura + Forma</b></div></div>
    <p class="body" style="margin-top:28px">Para entenderla hacemos tres preguntas: <b class="pd">¿bajo qué disciplina se funda?</b> <b class="pv">¿quién la validó?</b> <b class="pc">¿quién la financia?</b></p>`,
  poder:`<div class="mono">Vértice 3 · Poder</div><h3>¿Quién la financia?</h3>
    <ul><li><b>Katari S.A.</b> es la dueña de <b>Tierra Hotels</b> (Tierra Atacama, Tierra Patagonia y Tierra Chiloé). La fundaron las familias <b>Purcell</b> (Ski Portillo) y <b>Matetic</b> (viña Matetic).</li>
    <li>En <b>agosto de 2022</b> vendieron el <b>83,5 %</b> a <b>Baillie Lodges</b>, de <b>KSL Capital Partners</b> (fondo de inversión).</li>
    <li>Tarifa 2025–26: <b>US$ 2.450 a 4.540</b> por habitación y noche, todo incluido, mínimo 3 noches.</li></ul>
    <div class="imgs"><img src="assets/fotos/hotel-tierra-patagonia/00.jpg" style="height:230px" alt=""><img src="assets/fotos/hotel-tierra-patagonia/04.jpg" style="height:230px" alt=""></div>`,
  valid:`<div class="mono">Vértice 2 · Validación</div><h3>¿Quién la legitima?</h3>
    <ul><li><b>Revistas</b> de viajes, hotelería y diseño.</li><li><b>Publicaciones de arquitectura</b>: ArchDaily, ARQA, Archilovers, Architizer.</li><li><b>Premios</b>: Traveler 100 Best Hotels, Tripadvisor Travellers’ Choice, National Geographic World Legacy Awards, Condé Nast Readers’ Choice, Gold List.</li></ul>
    <div class="imgs"><img src="assets/img/tp-revistas.jpg" style="height:215px" alt=""><img src="assets/img/tp-publicaciones.jpg" style="height:104px" alt=""></div>
    <div class="imgs dark" style="margin-top:8px"><img src="assets/img/tp-premios.jpg" style="height:104px" alt=""></div>
    <div class="call"><b>Lectura:</b> la validación circula sobre todo por el circuito del turismo de lujo.</div>`,
  disc:`<div class="mono">Vértice 1 · Disciplina</div><h3>¿Bajo quiénes se funda?</h3>
    <ul><li><b>Cruz Covarrubias:</b> «la intención poética antes que el programa».</li><li><b>Eyquem:</b> aerodinámica y viento; audacia estructural para las superficies curvas (según la genealogía del TP).</li><li><b>Casanueva:</b> lo lúdico y el respeto por la duna; estructuras que se posan sobre el relieve.</li></ul>
    <div class="imgs"><img src="assets/img/maestros.jpg" style="height:120px" alt=""><img src="assets/img/tp-aira.jpg" style="height:190px" alt=""></div>
    <div class="call"><b>Disciplinar-productivo:</b> arquitectos, ingenieros, constructora (Grupo Aira) e inspección técnica que materializan el hotel. <b>Teórico:</b> Escuela de Valparaíso, Amereida, Ciudad Abierta.</div>`
 },
 cc:{
  img:'assets/img/cc-casa.jpg', name:'Casa Cala', sub:'Lago Ranco · 1991–92 · «casa tesis»',
  intro:`<div class="mono" style="color:var(--gold)">Ficha</div><h3 style="color:var(--ink)">La casa tesis de Cazú</h3>
    <div class="intro-grid"><div><span>Superficie</span><b>447 m²</b></div><div><span>Terreno</span><b>20 hectáreas</b></div><div><span>Cliente</span><b>José Manuel Morales</b></div><div><span>Premio</span><b>Gran Premio Latinoamericano, 1993</b></div><div><span>Programa</span><b>Vivienda · madera · forma curva</b></div><div><span>Método</span><b>Nace el Gesto–Figura–Forma</b></div></div>
    <p class="body" style="margin-top:28px">Otra escala, las mismas tres preguntas: <b class="pd">¿bajo qué disciplina?</b> <b class="pv">¿quién la validó?</b> <b class="pc">¿quién?</b></p>`,
  poder:`<div class="mono">Vértice 3 · Poder</div><h3>¿Quién la contrata?</h3>
    <ul><li><b>José Manuel Morales</b> figura como cliente en la web de la obra.</li>
    <li>El TP lo presentaba como gerente general de la Bolsa de Comercio de Santiago: <b>no pudimos confirmarlo</b>.</li>
    <li>Casa de <b>447 m²</b> en <b>20 hectáreas</b> de propiedad privada, en Lago Ranco (Los Ríos).</li>
    <li><i>Hipótesis:</i> es la carta de presentación de la autora ante el mercado: el premio de 1993 la hace visible.</li></ul>
    <div class="imgs"><img src="assets/fotos/casa-cala/00.jpg" style="height:220px" alt=""><img src="assets/fotos/casa-cala/05.jpg" style="height:220px" alt=""></div>`,
  valid:`<div class="mono">Vértice 2 · Validación</div><h3>¿Quién la legitima?</h3>
    <ul><li><b>Gran Premio de Arquitectura Latinoamericana, 1993</b>: primera versión, ganada con la casa tesis.</li><li>Bienales de arquitectura, <i>The Architectural Review</i> (Emerging Architecture) y AREA.</li><li>ArchDaily y ARQA.</li></ul>
    <div class="imgs"><img src="assets/img/cc-premios.jpg" style="height:190px" alt=""><img src="assets/img/cc-revistas.jpg" style="height:190px" alt=""></div>
    <div class="call"><b>Cadena de validación global:</b> leyó la curva de madera como vanguardia latinoamericana de alta sofisticación fenomenológica y sustentable. Blindó la reputación del estudio frente al mercado local.</div>`,
  disc:`<div class="mono">Vértice 1 · Disciplina</div><h3>¿Bajo quiénes se funda?</h3>
    <ul><li><b>Cruz:</b> la soltura para desafiar la gravedad en pendientes extremas.</li><li><b>Eyquem:</b> la lectura del viento para deformar aerodinámicamente las cubiertas de madera.</li><li><b>Gesto–Figura–Forma:</b> metodología que la web atribuye a la propia Cazú (el TP la vinculaba con Casanueva, sin fuente). Aquí nace del dibujo de una flor de cala.</li></ul>
    <div class="imgs"><img src="assets/img/maestros.jpg" style="height:120px" alt=""><img src="assets/img/cc-ciudad.jpg" style="height:190px" alt=""></div>
    <div class="call"><b>Gesto:</b> el dibujo de una Cala (flor). Escuela de Valparaíso, Amereida, Ciudad Abierta.</div>`
 }
};
$$('[data-widget="tri"]').forEach(sec=>{
  const C=TRI[sec.dataset.tri], host=$('[data-host]',sec);
  host.innerHTML=`<div class="tri-l">
      <svg viewBox="0 0 900 830"><polygon points="450,100 110,640 790,640" fill="rgba(200,169,110,.07)" stroke="#6e5a35" stroke-width="2"/>
      <line x1="450" y1="100" x2="110" y2="640" stroke="#777" stroke-dasharray="8 8"/><line x1="450" y1="100" x2="790" y2="640" stroke="#777" stroke-dasharray="8 8"/><line x1="110" y1="640" x2="790" y2="640" stroke="#777" stroke-dasharray="8 8"/></svg>
      <div class="tnode" data-k="1" style="--c:var(--poder);left:450px;top:100px">PODER</div>
      <div class="tnode" data-k="2" style="--c:var(--valid);left:110px;top:640px;font-size:19px;letter-spacing:.04em">VALIDACIÓN</div>
      <div class="tnode" data-k="3" style="--c:var(--disc);left:790px;top:640px;font-size:20px;letter-spacing:.04em">DISCIPLINA</div>
      <div class="tcenter" data-k="0"><img src="${C.img}" alt=""><b>${C.name}</b><span>${C.sub}</span></div>
    </div>
    <div class="tri-r">
      <div class="tpanel on" style="--c:var(--gold)">${C.intro}</div>
      <div class="tpanel" style="--c:var(--poder)">${C.poder}</div>
      <div class="tpanel" style="--c:var(--valid)">${C.valid}</div>
      <div class="tpanel" style="--c:var(--disc)">${C.disc}</div></div>`;
  const ORD=[0,3,2,1]; $$('[data-k]',host).forEach(n=>n.onclick=()=>{ const s=ORD.indexOf(+n.dataset.k); App.setStep(s===step?0:s); });
  widgets[sec.id]={onStep(n){ const k=ORD[n]; $$('.tpanel',host).forEach((p,i)=>p.classList.toggle('on',i===k)); $$('.tnode',host).forEach(x=>x.classList.toggle('cur',+x.dataset.k===k)); }};
});

/* ---- reflexión ---- */
(function(){
  const L=$$('#reflList .rl');
  L.forEach(b=>b.onclick=()=>{ const on=b.classList.contains('on'); L.forEach(x=>x.classList.remove('on')); if(!on) b.classList.add('on'); });
  widgets['s-refl']={onEnter(){ if(!L.some(x=>x.classList.contains('on'))) L[0].classList.add('on'); }};
})();

/* ============================================================
   ARRANQUE
   ============================================================ */
$$('[data-go]').forEach(bt=>bt.addEventListener('click',()=>show(slides.indexOf(document.getElementById(bt.dataset.go)),0)));
if(isPresenter){
  document.body.classList.add('presenter');
  let t0=Date.now(); const clk=$('#pvClock');
  setInterval(()=>{ const s=Math.floor((Date.now()-t0)/1000); clk.textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0'); },500);
  addEventListener('message',e=>{ const d=e.data; if(d&&d.type==='state'){
    $('#pvCnt').textContent=`Lámina ${d.i+1} de ${d.total}`;
    $('#pvNow').textContent=d.title;
    $('#pvStep').textContent=d.steps?`Paso ${d.step} de ${d.steps} (→ para avanzar)`:'';
    $('#pvNotes').textContent=d.notes; $('#pvNext').textContent='Sigue: '+d.next; }});
  const cmd=c=>opener&&opener.postMessage({type:'cmd',cmd:c},'*');
  $('#pvPrev').onclick=()=>cmd('prev'); $('#pvNextB').onclick=()=>cmd('next'); $('#pvReset').onclick=()=>{t0=Date.now();};
  addEventListener('keydown',e=>{ if(['ArrowRight',' ','Enter'].includes(e.key)){e.preventDefault();cmd('next');} else if(['ArrowLeft','Backspace'].includes(e.key)){e.preventDefault();cmd('prev');} else if(e.key==='PageDown')cmd('nextSlide'); else if(e.key==='PageUp')cmd('prevSlide'); },true);
  opener&&opener.postMessage({type:'ready'},'*');
} else {
  const hp=(location.hash||'').slice(1).split('.'); const h=parseInt(hp[0],10), hs=parseInt(hp[1],10)||0;
  slides[0].classList.add('active');
  show(isNaN(h)?0:h-1,hs);
  addEventListener('hashchange',()=>{ const n=parseInt((location.hash||'').slice(1),10); if(!isNaN(n)&&n-1!==cur) show(n-1,0); });
}
})();
