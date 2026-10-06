/* Uso en celular/tableta: botones ◀ ▶ en pantalla, deslizar para cambiar de lámina y aviso para girar el teléfono.
   Todo reutiliza las teclas ← → (no toca la navegación de app.js). */
(function(){
  const key=k=>window.dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true}));
  const mk=(id,html,label,fn)=>{ const b=document.createElement('button'); b.id=id; b.type='button'; b.innerHTML=html; b.setAttribute('aria-label',label); b.addEventListener('click',e=>{ e.stopPropagation(); fn(); b.blur(); }); document.body.appendChild(b); return b; };
  mk('navPrev','‹','Lámina anterior',()=>key('ArrowLeft'));
  mk('navNext','›','Siguiente',()=>key('ArrowRight'));
  if(/[?&]presenter/.test(location.search)) document.body.classList.add('presenter');

  // deslizar: izquierda = siguiente, derecha = anterior (se ignora sobre mapas, galerías, controles y fichas)
  const SKIP='#mpLeaf,#mpInset,#mpMain,#obra,.ob-thumbs,input,select,textarea,.leaflet-container,#over,#help,.range,[data-noswipe]';
  let t0=null;
  addEventListener('touchstart',e=>{ if(e.touches.length!==1){ t0=null; return; } const t=e.touches[0]; t0=e.target.closest&&e.target.closest(SKIP)?null:{x:t.clientX,y:t.clientY,lx:t.clientX,ly:t.clientY,t:Date.now()}; },{passive:true});
  addEventListener('touchmove',e=>{ if(t0&&e.touches[0]){ t0.lx=e.touches[0].clientX; t0.ly=e.touches[0].clientY; } },{passive:true});
  addEventListener('touchend',e=>{ if(!t0) return; const t=e.changedTouches&&e.changedTouches[0], x=t?t.clientX:t0.lx, y=t?t.clientY:t0.ly, dx=x-t0.x, dy=y-t0.y, dt=Date.now()-t0.t; t0=null;
    if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.6&&dt<900){ key(dx<0?'ArrowRight':'ArrowLeft'); } },{passive:true});

  // aviso en vertical (el escenario es 16:9)
  const rot=document.createElement('div'); rot.id='rotHint'; rot.innerHTML='<b>Girá el celular</b><span>La presentación se ve mejor en horizontal</span><button type="button">Seguir así</button>'; document.body.appendChild(rot);
  let dismissed=false; rot.querySelector('button').onclick=()=>{ dismissed=true; upd(); };
  function upd(){ const portrait=innerHeight>innerWidth*1.1&&innerWidth<900; rot.style.display=(portrait&&!dismissed)?'flex':'none'; }
  addEventListener('resize',upd); addEventListener('orientationchange',()=>{ dismissed=false; setTimeout(upd,200); }); upd();
})();
