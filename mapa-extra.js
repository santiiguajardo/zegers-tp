/* ============================================================
   Lámina «Geografía»: mapa de Chile + zoom libre (rueda, arrastre, botones).
   Datos: LOC y REG_INSET vienen de derive.js; contornos de mapa.js y mapa-fine.js.
   ============================================================ */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const fmt=n=>Number(n).toLocaleString('es-AR',{maximumFractionDigits:2});
  const NS='http://www.w3.org/2000/svg';
  const W=640,H=760;
  const IN={scl:{n:'Santiago y Valparaíso',b:[-72.2,-69.8,-34.5,-32.5]},sur:{n:'Pucón, lagos y Valdivia',b:[-73.5,-71.3,-40.5,-38.9]}};
  const CITIES={scl:[['Santiago',-33.45,-70.66],['Valparaíso',-33.05,-71.62],['Quillota',-32.88,-71.25]],sur:[['Pucón',-39.28,-71.97],['Villarrica',-39.28,-72.23],['Valdivia',-39.81,-73.25]]};
  // localidades de referencia (se ven al acercar)
  const TOWNS={scl:[['Lo Barnechea',-33.35,-70.52],['Vitacura',-33.39,-70.57],['Providencia',-33.43,-70.61],['Ñuñoa',-33.46,-70.60],['Maipú',-33.51,-70.76],['Puente Alto',-33.61,-70.58],['Pirque',-33.67,-70.55],['Colina',-33.20,-70.67],['Peñalolén',-33.49,-70.53],['San Bernardo',-33.59,-70.70],['Curacaví',-33.40,-71.14],['Viña del Mar',-33.02,-71.55],['La Calera',-32.79,-71.19]],
    sur:[['Curarrehue',-39.36,-71.58],['Lican Ray',-39.49,-72.23],['Panguipulli',-39.64,-72.33],['Loncoche',-39.37,-72.63],['Lanco',-39.45,-72.77],['Los Lagos',-39.85,-72.81],['Paillaco',-40.07,-72.87],['La Unión',-40.29,-73.08],['Futrono',-40.13,-72.39],['Lago Ranco',-40.31,-72.48],['Villarrica volcán',-39.42,-71.94],['Corral',-39.89,-73.43]]};
  // lagos pequeños que no vienen en la base: contornos esquemáticos (elipses)
  const SK={scl:[['Laguna Aculeo',-33.83,-70.92,.03,.017,0]],sur:[['Lago Villarrica',-39.27,-72.10,.17,.045,-.12],['Lago Calafquén',-39.55,-72.15,.10,.06,.2],['Lago Maihue',-40.2,-72.0,.03,.10,0]]};
  let inset='scl', sel=null, reg=null, z=1, vx=0, vy=0, P=null, anim=null;
  const main=$('#mpMain'), ins=$('#mpInset'), ficha=$('#mpFicha'), regsEl=$('#mpRegs'), tabs=$('#mpTabs'), lst=$('#mpList');
  const works=WORKS.filter(w=>LOC[w.slug]);
  const el=(t,a,p)=>{const e=document.createElementNS(NS,t); for(const k in a) e.setAttribute(k,a[k]); if(p)p.appendChild(e); return e;};

  function mk(b,w,h){
    const lat0=(b[2]+b[3])/2, c=Math.cos(lat0*Math.PI/180);
    const k=Math.min(w/((b[1]-b[0])*c), h/(b[3]-b[2]));
    const ox=(w-(b[1]-b[0])*c*k)/2, oy=(h-(b[3]-b[2])*k)/2;
    const f=(lon,lat)=>[ox+(lon-b[0])*c*k, oy+(b[3]-lat)*k];
    f.inv=(x,y)=>[b[0]+(x-ox)/(c*k), b[3]-(y-oy)/k]; return f;
  }
  const d_=(rings,P)=>rings.map(r=>'M'+r.map(p=>{const q=P(p[0],p[1]);return q[0].toFixed(1)+','+q[1].toFixed(1)}).join('L')+'Z').join('');
  const ellipse=(P,lon,lat,a,b,rot)=>{ const pts=[]; for(let i=0;i<40;i++){ const t=i/40*2*Math.PI, x=a*Math.cos(t), y=b*Math.sin(t); pts.push([lon+x*Math.cos(rot)-y*Math.sin(rot), lat+x*Math.sin(rot)+y*Math.cos(rot)]); } return d_([pts],P); };
  const short=w=>w.nombre.replace('Casa ','').replace('Hotel ','H. ').replace('Edificio ','').replace('Capilla del ','Capilla ');

  /* ---------- mapa general ---------- */
  const MB=[-76.5,-65.5,-55.5,-17], PM=mk(MB,270,850);
  function drawMain(){
    main.setAttribute('viewBox','0 0 270 850'); main.innerHTML='';
    ['Argentina','Peru','Bolivia'].forEach(n=>el('path',{d:d_(GEO[n],PM),class:'m-other'},main));
    el('path',{d:d_(GEO.Chile,PM),class:'m-land'},main);
    el('rect',{id:'mpBox',class:'m-box'},main);
    works.forEach(wk=>{ const L=LOC[wk.slug], q=PM(L[1],L[0]), inR=!reg||L[2]===reg;
      el('circle',{cx:q[0].toFixed(1),cy:q[1].toFixed(1),r:4.5,class:'m-dot'+(sel===wk.slug?' on':'')+(inR?'':' off')},main); });
    updBox();
  }
  function updBox(){ const r=$('#mpBox'); if(!r||!P) return; const a=P.inv(vx,vy), b=P.inv(vx+W/z,vy+H/z), p1=PM(a[0],a[1]), p2=PM(b[0],b[1]);
    r.setAttribute('x',Math.min(p1[0],p2[0]).toFixed(1)); r.setAttribute('y',Math.min(p1[1],p2[1]).toFixed(1)); r.setAttribute('width',Math.max(3,Math.abs(p2[0]-p1[0])).toFixed(1)); r.setAttribute('height',Math.max(3,Math.abs(p2[1]-p1[1])).toFixed(1)); }

  /* ---------- zoom ---------- */
  function drawInset(){
    const b=IN[inset].b; P=mk(b,W,H); ins.innerHTML=''; ins.setAttribute('viewBox','0 0 '+W+' '+H);
    const g=el('g',{id:'mpW'},ins);
    GEOF.arg.forEach(r=>el('path',{d:d_([r],P),class:'m-other'},g));
    GEOF.chile.forEach(r=>el('path',{d:d_([r],P),class:'m-land'},g));
    GEOF.lakes.forEach(l=>{ const bb=l.r; const lon=bb.reduce((a,p)=>a+p[0],0)/bb.length, lat=bb.reduce((a,p)=>a+p[1],0)/bb.length; if(lon<b[0]-.8||lon>b[1]+.8||lat<b[2]-.8||lat>b[3]+.8) return; el('path',{d:d_([l.r],P),class:'m-lake'},g); });
    (SK[inset]||[]).forEach(s=>{ el('path',{d:ellipse(P,s[2],s[1],s[3],s[4],s[5]),class:'m-lake sk'},g); });
    (SK[inset]||[]).forEach(s=>{ const q=P(s[2],s[1]); const t=el('text',{x:q[0],y:q[1],class:'m-lakename','data-fs':13,'text-anchor':'middle'},g); t.textContent=s[0].replace('Laguna ','').replace('Lago ',''); });
    (CITIES[inset]||[]).forEach(c=>{ const q=P(c[2],c[1]); el('circle',{cx:q[0],cy:q[1],r:2,class:'m-city','data-r':3.5},g); const t=el('text',{x:q[0],y:q[1],class:'m-cityname','data-fs':17},g); t.textContent=c[0]; });
    (TOWNS[inset]||[]).forEach(c=>{ const q=P(c[2],c[1]); el('circle',{cx:q[0],cy:q[1],r:1.5,class:'m-town','data-r':2.2},g); const t=el('text',{x:q[0],y:q[1],class:'m-townname','data-fs':14},g); t.textContent=c[0]; });
    el('g',{id:'mpGrid'},g);
    works.forEach(wk=>{ const L=LOC[wk.slug]; if(L[0]<b[2]-.3||L[0]>b[3]+.3||L[1]<b[0]-.3||L[1]>b[1]+.3) return; const q=P(L[1],L[0]);
      const c=el('circle',{cx:q[0].toFixed(2),cy:q[1].toFixed(2),r:7,class:'mdot','data-s':wk.slug,'data-r':6.5},g); el('title',{},c).textContent=wk.nombre+' ('+wk.anio+')';
      const t=el('text',{x:q[0].toFixed(2),y:q[1].toFixed(2),class:'m-wlabel','data-s':wk.slug,'data-fs':16},g); t.textContent=short(wk); });
    $$('.mdot',ins).forEach(c=>c.addEventListener('click',()=>{ if(moved>4) return; select(c.dataset.s,true); }));
    z=1; vx=0; vy=0; apply();
    if(window.__leaf) __leaf.setInset(inset);
  }
  function clamp(){ z=Math.max(1,Math.min(24,z)); vx=Math.max(0,Math.min(W-W/z,vx)); vy=Math.max(0,Math.min(H-H/z,vy)); }
  function apply(){
    clamp();
    ins.setAttribute('viewBox',vx.toFixed(2)+' '+vy.toFixed(2)+' '+(W/z).toFixed(2)+' '+(H/z).toFixed(2));
    const g=$('#mpW',ins); if(!g) return;
    $$('[data-r]',g).forEach(c=>{ const r0=+c.dataset.r; c.setAttribute('r',(r0*Math.pow(z,.22)/z).toFixed(3)); c.style.strokeWidth=(1.5/z).toFixed(3); });
    $$('text',g).forEach(t=>{ t.setAttribute('font-size',((+t.dataset.fs||14)/z).toFixed(3)); });
    $$('.m-townname',g).forEach(t=>{ const c=t.previousSibling; t.setAttribute('x',(+c.getAttribute('cx')+6/z).toFixed(2)); t.setAttribute('y',(+c.getAttribute('cy')+4/z).toFixed(2)); t.style.display=z>=2.6?'':'none'; });
    $$('.m-town',g).forEach(c=>{ c.style.display=z>=2.6?'':'none'; });
    grid(g);
    $$('.m-cityname',g).forEach(t=>{ const c=t.previousSibling; t.setAttribute('x',(+c.getAttribute('cx')+10/z).toFixed(2)); t.setAttribute('y',(+c.getAttribute('cy')+5/z).toFixed(2)); });
    declutter();
    const zi=$('#mpZ'); if(zi) zi.textContent='×'+(z<10?z.toFixed(1).replace('.0',''):Math.round(z));
    updBox();
  }
  // grilla de coordenadas y barra de escala (cambian con el zoom)
  function grid(g){
    const gg=g.querySelector('#mpGrid'); if(!gg) return; gg.innerHTML='';
    const a=P.inv(vx,vy), b=P.inv(vx+W/z,vy+H/z); const lon0=Math.min(a[0],b[0]), lon1=Math.max(a[0],b[0]), lat0=Math.min(a[1],b[1]), lat1=Math.max(a[1],b[1]);
    const pxDeg=(W/z>0)? (W/(lon1-lon0)) : 1; // px de pantalla por grado de longitud (base W=640 px)
    const steps=[.005,.01,.02,.05,.1,.25,.5,1,2]; const st=steps.find(s=>pxDeg*s>=110)||2;
    const fmtd=(v,pos,neg)=>{ let s=Math.abs(v).toFixed(st<.1?3:(st<1?2:0)); if(s.indexOf('.')>-1) s=s.replace(/0+$/,'').replace(/[.]$/,''); return s+'°'+(v<0?neg:pos); };
    for(let lo=Math.ceil(lon0/st)*st; lo<=lon1; lo+=st){ const p=P(lo,lat0), q=P(lo,lat1); el('line',{x1:p[0],y1:p[1],x2:q[0],y2:q[1],class:'m-grid'},gg); const t=el('text',{x:p[0]+3/z,y:vy+H/z-5/z,class:'m-gridlbl','font-size':12/z},gg); t.textContent=fmtd(lo,'E','O'); }
    for(let la=Math.ceil(lat0/st)*st; la<=lat1; la+=st){ const p=P(lon0,la), q=P(lon1,la); el('line',{x1:p[0],y1:p[1],x2:q[0],y2:q[1],class:'m-grid'},gg); const t=el('text',{x:vx+4/z,y:p[1]-3/z,class:'m-gridlbl','font-size':12/z},gg); t.textContent=fmtd(la,'N','S'); }
    // escala: km por unidad de mapa
    const lat=(lat0+lat1)/2, kmPerUnit=111.32*Math.cos(lat*Math.PI/180)*(lon1-lon0)/(W/z); // km por unidad de viewBox
    const unitsPerPx=1/z; const kmPerPx=kmPerUnit*unitsPerPx; let km=[0.1,0.2,0.5,1,2,5,10,20,50,100,200].find(k=>k/kmPerPx>=110)||200;
    const bar=document.getElementById('mpScale'); if(bar){ bar.style.width=(km/kmPerPx)+'px'; bar.querySelector('span').textContent=(km<1?(km*1000)+' m':km+' km'); }
  }
  // etiquetas de obras sin pisarse (prioriza la seleccionada y las de mayor superficie)
  function declutter(){
    const g=$('#mpW',ins); if(!g) return; const lab=$$('.m-wlabel',g); const placed=[];
    const prio=lab.map(t=>({t,w:works.find(x=>x.slug===t.dataset.s)})).sort((a,b)=>((b.t.dataset.s===sel)-(a.t.dataset.s===sel))||(b.w.m2-a.w.m2));
    prio.forEach(({t})=>{
      const c=g.querySelector('.mdot[data-s="'+t.dataset.s+'"]'); const cx=+c.getAttribute('cx'), cy=+c.getAttribute('cy');
      const fs=16/z, tw=(t.textContent.length*8.4)/z, x=cx+(13/z), y=cy+(5/z);
      t.setAttribute('x',x.toFixed(2)); t.setAttribute('y',y.toFixed(2));
      const box=[x,y-fs,x+tw,y+fs*0.3]; const isSel=t.dataset.s===sel;
      const hit=placed.some(p=>!(box[2]<p[0]||box[0]>p[2]||box[3]<p[1]||box[1]>p[3]));
      const inView=cx>=vx&&cx<=vx+W/z&&cy>=vy&&cy<=vy+H/z;
      const show=isSel || (inView && z>=1.8 && !hit);
      t.style.display=show?'':'none'; t.classList.toggle('on',isSel);
      if(show) placed.push(box);
    });
    $$('.mdot',g).forEach(c=>{ c.classList.toggle('on',c.dataset.s===sel); const L=LOC[c.dataset.s]; c.classList.toggle('off',!!reg&&L[2]!==reg); });
  }
  const pt=e=>{ const r=ins.getBoundingClientRect(); return [(e.clientX-r.left)/r.width*(W/z)+vx,(e.clientY-r.top)/r.height*(H/z)+vy]; };
  function zoomAt(f,px,py){ const rx=(px-vx)/(W/z), ry=(py-vy)/(H/z); z=Math.max(1,Math.min(24,z*f)); vx=px-rx*(W/z); vy=py-ry*(H/z); apply(); }
  function zoomCenter(f){ zoomAt(f,vx+W/z/2,vy+H/z/2); }
  function flyTo(tx,ty,tz){ if(anim) cancelAnimationFrame(anim); const z0=z,x0=vx+W/z/2,y0=vy+H/z/2,t0=performance.now(),dur=420;
    const st=now=>{ let k=Math.min(1,(now-t0)/dur); k=1-Math.pow(1-k,3); z=z0*Math.pow(tz/z0,k); const cx=x0+(tx-x0)*k, cy=y0+(ty-y0)*k; vx=cx-W/z/2; vy=cy-H/z/2; apply(); if(k<1) anim=requestAnimationFrame(st); }; anim=requestAnimationFrame(st); }
  let drag=null, moved=0;
  ins.addEventListener('wheel',e=>{ e.preventDefault(); const p=pt(e); zoomAt(e.deltaY<0?1.35:1/1.35,p[0],p[1]); },{passive:false});
  ins.addEventListener('pointerdown',e=>{ if(e.button!==0) return; drag={x:e.clientX,y:e.clientY,vx,vy}; moved=0; });
  window.addEventListener('pointermove',e=>{ if(!drag) return; const r=ins.getBoundingClientRect(); const dx=e.clientX-drag.x, dy=e.clientY-drag.y; moved=Math.max(moved,Math.hypot(dx,dy)); if(moved>3){ ins.classList.add('grab'); vx=drag.vx-dx/r.width*(W/z); vy=drag.vy-dy/r.height*(H/z); apply(); } });
  window.addEventListener('pointerup',()=>{ if(drag){ drag=null; ins.classList.remove('grab'); setTimeout(()=>{moved=0},0); } });
  ins.addEventListener('dblclick',e=>{ if(e.target.classList&&e.target.classList.contains('mdot')) return; const p=pt(e); zoomAt(2,p[0],p[1]); });
  $('#mpZin').onclick=()=>zoomCenter(1.7); $('#mpZout').onclick=()=>zoomCenter(1/1.7); $('#mpZreset').onclick=()=>{ if(anim) cancelAnimationFrame(anim); z=1; vx=0; vy=0; apply(); };

  /* ---------- panel derecho ---------- */
  function render(){
    drawMain();
    tabs.innerHTML='';
    Object.keys(IN).forEach(k=>{ const b=document.createElement('button'); b.className='btn'+(k===inset?' act':''); b.textContent='Zoom: '+IN[k].n; b.onclick=()=>{ inset=k; drawInset(); render(); }; tabs.appendChild(b); });
    const cnt={}; works.forEach(w=>{const r=LOC[w.slug][2]; cnt[r]=(cnt[r]||0)+1;});
    const rows=Object.entries(cnt).sort((a,b)=>b[1]-a[1]), mx=rows[0][1];
    regsEl.innerHTML='';
    rows.forEach(([n,c])=>{ const b=document.createElement('button'); b.className='mreg'+(reg===n?' sel':'');
      b.innerHTML='<span class="lb">'+n+'</span><span class="tr"><span class="fl" style="display:block;width:'+(c/mx*100)+'%"></span></span><span class="ct">'+c+'</span>';
      b.onclick=()=>{ reg=(reg===n?null:n); if(reg&&REG_INSET[reg]&&REG_INSET[reg]!==inset){ inset=REG_INSET[reg]; drawInset(); } render(); declutter(); }; regsEl.appendChild(b); });
    lst.innerHTML='';
    if(reg) works.filter(x=>LOC[x.slug][2]===reg).forEach(x=>{ const b=document.createElement('button'); b.className='mlist'+(sel===x.slug?' sel':''); b.textContent=x.nombre; b.onclick=()=>select(x.slug,true); lst.appendChild(b); });
    const w=works.find(x=>x.slug===sel);
    if(!w){ ficha.className='mp-ficha empty'; ficha.innerHTML='Tocá un punto del mapa o una región.<br><span style="font-size:18px">Rueda del mouse: acercar · arrastrar: mover · doble clic: acercar</span>'; }
    else { const F=(typeof FICHAS!=='undefined'&&FICHAS[w.slug])||null, ph=(F&&F.fotos)?'assets/fotos/'+w.slug+'/00.jpg':'assets/obras/'+w.slug+'.jpg';
      ficha.className='mp-ficha'; ficha.innerHTML='<img src="'+ph+'" alt=""><div class="in"><h3>'+w.nombre+' <span class="pg" style="font-size:24px">'+w.anio+'</span></h3><div class="row"><div><span>Lugar</span>'+((F&&F.loc)||w.lugar)+'</div><div><span>Superficie</span>'+fmt(w.m2)+' m²</div><div><span>Cliente</span>'+w.cliente+'</div><div><span>Ubicación en el mapa</span>'+(LOC_EXACTA.indexOf(w.slug)>-1?'exacta':'aproximada (sector)')+'</div></div><button class="btn" id="mpOpen" style="margin-top:12px">Ver ficha completa y fotos</button></div>';
      const o=$('#mpOpen'); if(o) o.onclick=()=>window.openObra&&openObra(w.slug); }
    if(window.__leaf) __leaf.refresh();
  }
  function select(slug,fly){ sel=slug; const L=LOC[slug]; const k=REG_INSET[L[2]]; const need=(k&&k!==inset); if(need){ inset=k; drawInset(); }
    render(); declutter();
    if(window.__leaf) __leaf.focus(slug);
    if(fly){ const q=P(L[1],L[0]); flyTo(q[0],q[1],Math.max(z,5)); } }
  window.__mapa={render,select:(s,f)=>select(s,f),inset:()=>inset,sel:()=>sel,reg:()=>reg};
  drawInset(); render();
})();
