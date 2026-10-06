/* ============================================================
   Zoom detallado del mapa con mapa base real (Leaflet).
   Capas: satélite Esri (con nombres) · mapa de calles CARTO/OpenStreetMap · esquemático (el SVG de siempre).
   Necesita internet. Si no carga, queda el mapa esquemático y todo sigue andando.
   Se engancha a mapa-extra.js mediante window.__leaf (setInset, focus, refresh).
   ============================================================ */
(function(){
  const wrap=document.querySelector('.mp-inwrap'); if(!wrap||!window.__mapa) return;
  const CSS='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css', JS='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
  const IN_B={scl:[[-34.5,-72.2],[-32.5,-69.8]],sur:[[-40.5,-73.5],[-38.9,-71.3]]};
  let map=null, layers={}, base='sat', markers={}, ready=false, pending=null;
  const works=()=>WORKS.filter(w=>LOC[w.slug]);
  const short=w=>w.nombre.replace('Casa ','').replace('Hotel ','H. ').replace('Edificio ','').replace('Capilla del ','Capilla ');

  const bar=document.createElement('div'); bar.className='mp-base'; bar.innerHTML=
    '<button data-b="sat">Satélite</button><button data-b="calles">Mapa</button><button data-b="svg">Esquemático</button>';
  wrap.appendChild(bar);
  const host=document.createElement('div'); host.id='mpLeaf'; wrap.appendChild(host);
  const att=document.createElement('div'); att.className='mp-att'; wrap.appendChild(att);
  bar.addEventListener('click',e=>{ const b=e.target.closest('button'); if(b) setBase(b.dataset.b); });

  function load(){
    if(window.L) return init();
    const l=document.createElement('link'); l.rel='stylesheet'; l.href=CSS; document.head.appendChild(l);
    const s=document.createElement('script'); s.src=JS; s.onload=init; s.onerror=()=>{ wrap.classList.add('leaf-fail'); bar.innerHTML='<span>Sin conexión: mapa esquemático</span>'; };
    document.head.appendChild(s);
  }

  function init(){
    map=L.map(host,{zoomControl:true,attributionControl:false,maxZoom:19,minZoom:6,zoomSnap:.5,wheelPxPerZoomLevel:90,fadeAnimation:false});
    L.control.scale({imperial:false,position:'bottomleft'}).addTo(map);
    layers.sat=L.layerGroup([
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,maxNativeZoom:18}),
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,maxNativeZoom:16,opacity:.95})]);
    layers.calles=L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{subdomains:'abcd',maxZoom:19});
    works().forEach(w=>{ const L_=LOC[w.slug];
      const m=L.circleMarker([L_[0],L_[1]],{radius:9,weight:3,color:'#10131a',fillColor:'#f2c14e',fillOpacity:1,className:'lf-dot'});
      m.bindTooltip(short(w),{permanent:true,direction:'right',offset:[10,0],className:'lf-lab'});
      m.on('click',()=>window.__mapa.select(w.slug,false));
      m.bindPopup(function(){ return '<b>'+w.nombre+'</b><br>'+w.anio+' · '+w.lugar; },{closeButton:false,offset:[0,-4]});
      markers[w.slug]=m; });
    map.on('zoomend',labels); map.on('moveend',labels);
    ready=true; setBase(base,true); setInset(window.__mapa.inset()); if(pending){ focus(pending); pending=null; }
  }

  function setBase(b,quiet){
    base=b; [...bar.children].forEach(x=>x.classList&&x.classList.toggle('on',x.dataset.b===b));
    const svgOnly=(b==='svg');
    wrap.classList.toggle('leaf-on',!svgOnly&&ready);
    if(!ready) return;
    Object.values(layers).forEach(l=>{ if(map.hasLayer(l)) map.removeLayer(l); });
    if(!svgOnly){ layers[b].addTo(map); Object.values(markers).forEach(m=>m.addTo(map)); setTimeout(()=>{ map.invalidateSize(); labels(); },30); }
    else Object.values(markers).forEach(m=>m.remove());
    att.textContent=svgOnly?'':(b==='sat'?'Imágenes © Esri, Maxar, Earthstar Geographics · Nombres © Esri':'© OpenStreetMap contributors © CARTO');
  }
  function setInset(k){ if(!ready) return; const b=IN_B[k]; if(b){ map.invalidateSize(); map.fitBounds(b,{animate:false}); } refresh(); }
  function focus(slug){ if(!ready){ pending=slug; return; } const L_=LOC[slug]; if(!L_) return; map.flyTo([L_[0],L_[1]],Math.max(map.getZoom(),14),{duration:.8}); refresh(); }
  function refresh(){ if(!ready) return; const sel=window.__mapa.sel(), reg=window.__mapa.reg();
    Object.keys(markers).forEach(s=>{ const m=markers[s], on=s===sel, off=!!reg&&LOC[s][2]!==reg;
      m.setStyle({fillColor:on?'#f0703f':'#f2c14e',radius:on?12:9,fillOpacity:off?.35:1,opacity:off?.5:1}); if(on) m.bringToFront(); });
    labels(); }
  // etiquetas: aparecen al acercar; la seleccionada siempre
  function labels(){ if(!ready||!map) return; const z=map.getZoom(), sel=window.__mapa.sel(); const b=map.getBounds();
    Object.keys(markers).forEach(s=>{ const t=markers[s].getTooltip(); if(!t||!t._container) return;
      const show=(s===sel)||(z>=11&&b.contains(markers[s].getLatLng())); t._container.style.display=show?'':'none'; t._container.classList.toggle('sel',s===sel); }); }

  window.__leaf={setInset,focus,refresh};
  load();
})();
