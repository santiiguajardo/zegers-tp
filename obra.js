/* ============================================================
   Ficha de obra: galería + ficha técnica + descripción.
   Se abre con openObra(slug). Teclas: ← → fotos · Shift+← → otra obra · Esc cerrar.
   Fuente de los datos: https://cazuzegers.com/arquitectura/
   ============================================================ */
(function(){
  const stage=document.getElementById('stage'); if(!stage) return;
  const ov=document.createElement('div'); ov.id='obra'; ov.setAttribute('role','dialog'); ov.innerHTML=
   '<div class="ob-gal"><div class="ob-img"><img id="obImg" alt=""><button class="ob-nav l" id="obPrev" aria-label="Foto anterior">‹</button><button class="ob-nav r" id="obNext" aria-label="Foto siguiente">›</button><div class="ob-count" id="obCount"></div><button class="ob-zoom" id="obZoom" title="Ver foto grande">⤢</button></div><div class="ob-thumbs" id="obThumbs"></div></div>'
  +'<div class="ob-side"><div class="ob-top"><button class="ob-wk" id="obWPrev">‹ obra anterior</button><button class="ob-wk" id="obWNext">obra siguiente ›</button><button class="ob-x" id="obClose" aria-label="Cerrar">✕</button></div><div class="ob-body" id="obBody"></div></div>';
  stage.appendChild(ov);
  const $=id=>document.getElementById(id);
  const order=WORKS.slice().sort((a,b)=>a.anio-b.anio || a.nombre.localeCompare(b.nombre));
  let cur=null, ph=0, isOpen=false;
  const fmt=n=>Number(n).toLocaleString('es-AR',{maximumFractionDigits:2});
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  function photo(i){ const f=FICHAS[cur.slug], n=f?f.fotos:0; if(!n) return;
    ph=(i+n)%n; $('obImg').src='assets/fotos/'+cur.slug+'/'+String(ph).padStart(2,'0')+'.jpg';
    $('obCount').textContent=(ph+1)+' / '+n;
    [...$('obThumbs').children].forEach((t,j)=>t.classList.toggle('on',j===ph)); const th=$('obThumbs'), t=th.children[ph]; if(t){ th.scrollLeft=t.offsetLeft-(th.clientWidth-t.clientWidth)/2; } }

  function render(){
    const w=cur, f=FICHAS[w.slug]||{ficha:[],desc:[],fotos:0};
    const th=$('obThumbs'); th.innerHTML='';
    for(let i=0;i<f.fotos;i++){ const im=document.createElement('img'); im.src='assets/fotos/'+w.slug+'/'+String(i).padStart(2,'0')+'.jpg'; im.loading='lazy'; im.alt=''; im.onclick=()=>photo(i); th.appendChild(im); }
    $('obThumbs').style.display=f.fotos>1?'flex':'none';
    $('obPrev').style.display=$('obNext').style.display=f.fotos>1?'flex':'none';
    if(!f.fotos){ $('obImg').removeAttribute('src'); $('obCount').textContent='Sin fotos en la web'; } else photo(0);
    const rows=f.ficha.map(p=>'<div class="ob-r"><span>'+esc(p[0])+'</span><b>'+esc(p[1])+'</b></div>').join('');
    const idx=order.indexOf(w)+1;
    const nota=(typeof NOTAS_FICHA!=='undefined'&&NOTAS_FICHA[w.slug])?'<div class="ob-nota"><span>Para revisar en el TP</span>'+esc(NOTAS_FICHA[w.slug])+'</div>':'';
    $('obBody').innerHTML=
      '<div class="eyebrow">Obra '+idx+' de '+order.length+' · '+w.anio+'</div>'
     +'<h2>'+esc(w.nombre)+'</h2>'
     +'<div class="ob-chips"><span>'+esc(f.loc||w.lugar)+'</span>'+(f.years?'<span>'+esc(f.years)+'</span>':'')+'<span>'+esc(w.prog)+'</span><span>'+esc(w.mat)+'</span><span>'+fmt(w.m2)+' m²</span></div>'
     +(f.desc[0]?'<p class="ob-p">'+esc(f.desc[0])+'</p>':'')
     +'<div class="ob-h">Ficha técnica</div><div class="ob-tab">'+(rows||'<div class="ob-r"><span>Sin ficha</span><b>La web no publica datos para esta obra</b></div>')+'</div>'
     +nota
     +(f.desc[1]?'<p class="ob-p s">'+esc(f.desc[1])+'</p>':'')
     +'<div class="ob-h">En el TP</div><div class="ob-tab"><div class="ob-r"><span>Cliente</span><b>'+esc(w.cliente)+'</b></div><div class="ob-r"><span>Tipo de cliente</span><b>'+esc(w.ctipo||'')+'</b></div><div class="ob-r"><span>Colabora</span><b>'+esc(w.colab)+'</b></div><div class="ob-r"><span>Tipología</span><b>'+esc(w.tip)+'</b></div></div>'
     +(f.url?'<a class="ob-link" href="'+f.url+'" target="_blank" rel="noopener">Ver la obra en cazuzegers.com ↗</a>':'');
    $('obBody').scrollTop=0;
  }
  function open(slug){ const w=WORKS.find(x=>x.slug===slug); if(!w) return; cur=w; isOpen=true; ov.classList.remove('full'); ov.classList.add('on'); document.body.classList.add('obra-open'); render(); }
  function close(){ isOpen=false; ov.classList.remove('on','full'); document.body.classList.remove('obra-open'); }
  function step(d){ const i=order.indexOf(cur); cur=order[(i+d+order.length)%order.length]; render(); }
  window.openObra=open; window.closeObra=close; window.obraAbierta=()=>isOpen;

  $('obClose').onclick=close; $('obPrev').onclick=()=>photo(ph-1); $('obNext').onclick=()=>photo(ph+1);
  $('obWPrev').onclick=()=>step(-1); $('obWNext').onclick=()=>step(1);
  $('obZoom').onclick=()=>ov.classList.toggle('full'); $('obImg').onclick=()=>ov.classList.toggle('full');
  ov.addEventListener('click',e=>{ if(e.target===ov) close(); });

  // teclado: en la ficha manda ella (captura antes que la navegación de láminas)
  window.addEventListener('keydown',e=>{
    if(!isOpen) return;
    const k=e.key; let used=true;
    if(k==='Escape') { if(ov.classList.contains('full')) ov.classList.remove('full'); else close(); }
    else if(k==='ArrowRight'||k==='PageDown'){ e.shiftKey ? step(1) : photo(ph+1); }
    else if(k==='ArrowLeft'||k==='PageUp'){ e.shiftKey ? step(-1) : photo(ph-1); }
    else if(k==='f'||k==='F'){ ov.classList.toggle('full'); }
    else used=false;
    if(used){ e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); }
    else if(['ArrowDown','ArrowUp',' ','Enter','Home','End','g','G','b','B','p','P'].includes(k)){ e.stopPropagation(); e.stopImmediatePropagation(); }
  },true);
})();
