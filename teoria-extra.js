/* ============================================================
   Láminas «Ideas de las teóricas», «Lecturas × caso» y «Clientes»
   Contenido: transcripciones de las teóricas (ciclo anterior) y lecturas 2026.
   Todo lo marcado "para discutir" es hipótesis del grupo, no afirmación del autor.
   ============================================================ */
const YT = id => 'https://www.youtube.com/watch?v=' + id;

const IDEAS = [
  { t:'La crítica es el abismo entre el discurso y la cosa',
    dice:'Lo que se presenta como verdad deja «colgado» a quien lo acepta sin pensar. Teoría y crítica ocupan el espacio entre las palabras y las cosas; sin ese espacio, el campo de lo pensable se estrecha y se reproduce lo dado sin saber de dónde viene. El sentido final de la crítica es la libertad.',
    src:[['Teórica 1',YT('XYFfv_Yiviw')],['Teórica 2 · Crítica y disciplina',YT('2sls3N8UQdw')]],
    caso:'Los relatos de Cazú («leve y precaria», «lenguaje del aquí») son el discurso; las hectáreas, el comitente y los premios son la cosa. Nuestro TP trabaja en ese abismo.' },
  { t:'Disciplina ≠ profesión ≠ técnica',
    dice:'La profesión es la ocupación dentro de la división del trabajo; la técnica son destrezas que se repiten sin saber de dónde vienen; la disciplina es la conciencia de un cuerpo histórico de saberes. Reducir la disciplina a técnica produce prácticas automáticas y frívolas: el significante separado del sentido.',
    src:[['Teórica 1',YT('XYFfv_Yiviw')],['Teórica 2 · Crítica y profesión',YT('XZEq_DMfBTc')],['Teórica 6 · Estallar la preceptiva',YT('mut8CwTi2NA')]],
    caso:'Para discutir: ¿el Gesto–Figura–Forma que hereda de Valparaíso sigue siendo teoría cuando se aplica a hoteles y casas de lujo, o pasa a ser técnica y retórica?' },
  { t:'Preceptiva: reglas con tono obligatorio',
    dice:'La preceptiva es el conjunto de reglas del taller («esto se hace así»). La teoría anticipa y produce realidad: el modelo institucional del arquitecto reproduce un campo estrecho. Cacopardo cita encuestas de los años 90 en la UBA: los arquitectos intervenían en menos del 10 % del hábitat construido.',
    src:[['Teórica 3 · Teoría y preceptiva',YT('uGGqdyZ8TZ8')],['Teórica 3 · Carácter anticipatorio',YT('0Y3s5NfqKEk')],['Teórica 6',YT('7Q5YIDuy-Pk')]],
    caso:'Para discutir: casi todo lo construido por Cazú es vivienda y turismo para clientes de alto poder adquisitivo, el extremo opuesto de ese 90 % del hábitat que queda afuera.' },
  { t:'La forma como frontera',
    dice:'Siguiendo a Tafuri, la forma es límite y a la vez superficie de impacto de vectores: biografía, teoría, preceptiva, intereses económicos e institucionales. Con Rossi, Cacopardo muestra qué parte de una obra viene de la biografía y qué parte de una discusión teórica; cuando la preceptiva «plancha» la teoría, solo se replica retórica.',
    src:[['Teórica 4',YT('iHvMZjDbG8o')],['Teórica 4 · Forma como frontera',YT('eNuEhcabELc')],['Teórica 5 · Biografía, teoría y obra',YT('t4e970bXSZI')],['Teórica 5 · Preceptiva',YT('sLyNsN-VGBw')]],
    caso:'Casa Cala como frontera: viaje en moto y e[ad] (biografía), Amereida y Casanueva (teoría), Morales y el condominio de El Pangue (capital). Las tres cosas perforan la curva de madera.' },
  { t:'Cultura dominante: la posmodernidad no es un estilo',
    dice:'Con Jameson: una dominante cultural que integra la estética a la producción económica. Sus categorías son la superficialidad, el pastiche, la parodia, la pérdida de historia y el mandato de novedad. Venturi anticipa esa preceptiva (complejidad, contradicción, ambigüedad) y le da autonomía a la forma: ya no importa cómo esté construida. De ahí se llega a la arquitectura como marca y a los premios que legitiman.',
    src:[['Teórica 7 · Cultura dominante',YT('mfn_Fk6nllU')],['Teórica 7 · Proyecto y cultura global',YT('CbWa-qAkmnE')],['Teórica 8 · Venturi y Pritzker',YT('CrBQE_MBQxQ')],['Teórica 8 · Metaproyecto',YT('NJzfaieCdgA')]],
    caso:'Para discutir: Cacopardo señala que la madera laminada curva «sin coherencia» entre material, tecnología y forma se volvió natural y hasta se premia. ¿Dónde queda la curva de madera de Cazú frente a esa lectura?' },
  { t:'Habitar: un conflicto de poder',
    dice:'El habitar (Heidegger) une construir y vivir. En los ejemplos de la ventana, el baño y la escalera, la estética de la disciplina choca con los modos de habitar de quienes viven la obra. Pelli lo formula así: ¿cuál es la bella forma legítima, quién la produce y con qué fines? Es una pregunta por democratizar la disciplina.',
    src:[['Teórica 10 · Disciplina y habitar',YT('J0uPOYRLi68')],['Teórica 10 · Habitar vs. cultura dominante',YT('NAl0BV1hHIg')],['Teórica 11 · Estéticas del habitar',YT('mAAXsmXPXVg')]],
    caso:'«Habitar el paisaje» ¿para quién? Entre el condominio privado de Casa Cala y las comunidades de la guía de etnoingeniería, la pregunta de Pelli se vuelve el centro de nuestra reflexión.' },
  { t:'El productor es una red, no una persona',
    dice:'Con el Museo de la Biodiversidad de Gehry en Panamá, Cacopardo dibuja el triángulo: la obra al centro, entre la red de poder económico-político, las instituciones que validan y la disciplina y profesión. Pone nombre y apellido a los actores: fundación, banco, gobierno, mentores.',
    src:[['Teórica 12 · Gehry en Panamá',YT('yZbcuES5Tj8')]],
    caso:'Nuestro triángulo (Poder · Validación · Disciplina) sigue ese esquema: Katari, Grupo Aira, Larraín, Morales, las revistas y premios, la Escuela de Valparaíso, el BID.' },
];

const LECTURAS = [
  { a:'Freire', t:'El acto de estudiar', idea:'Estudiar es un acto crítico de quien se asume sujeto: situar el texto en su condicionamiento histórico y apropiarse de su significado profundo, sin memorizar ni dejarse «magnetizar» por la palabra del autor. La bibliografía es un desafío, no una prescripción dogmática.', caso:'Es el método de lectura del TP 1bis: leer los textos como herramienta propia para volver al caso.' },
  { a:'Rudofsky', t:'Arquitectura sin arquitectos', idea:'La historia de la arquitectura, tal como se enseña, es un «quién es quién» de los privilegiados. La arquitectura vernácula, anónima y comunal, que se adapta al clima y a la topografía, queda sin genealogía y sin nombre.', caso:'Cazú invoca lo vernáculo («el desarme del galpón») desde un estudio de autor y para clientes con capital: ¿qué queda del saber comunitario anónimo de Rudofsky?' },
  { a:'Liernur', t:'¡Es el punto de vista, estúpido!', idea:'Las narraciones canónicas de la arquitectura moderna son miopes: euronorteamericanas y locales. El regionalismo crítico y el poscolonialismo reproducen el canon como «envés inofensivo». Barragán, Niemeyer y Fathy no deben reducirse a su contexto local. Propone descentralizar la construcción del relato, no negar el canon.', caso:'¿Cazú completa el canon (premio latinoamericano, revistas globales) o lo discute? Su frase «éramos imitadores de costumbres» dialoga con esta lectura.' },
  { a:'Scarano', t:'Enunciar/interpelar desde el margen', idea:'Centro y margen funcionan como perspectivas móviles, no como categorías rígidas. Importar teorías del centro tiene el riesgo de seguir pidiendo legitimación a ese centro. Propone pensarse desde un lugar propio de enunciación, sin «travestismo cultural».', caso:'Cazú enuncia desde América (Amereida) pero circula por sistemas de validación del centro. ¿Desde qué lugar habla su relato?' },
  { a:'Colomina', t:'1949 (La domesticidad en guerra)', idea:'La arquitectura no es solo edificios: es la historia de lo que decimos, fotografiamos y publicamos. Las revistas (Arts & Architecture, L’Architecture d’aujourd’hui) y el programa Case Study House fabricaron un estilo de vida y desplazaron el centro de la arquitectura.', caso:'Las revistas, premios y plataformas (ArchDaily, ARQA, Architectural Review) como productoras de sentido: así circula la validación de Casa Cala y del hotel.' },
  { a:'Jameson', t:'Posmodernismo y capitalismo tardío', idea:'El posmodernismo es una dominante cultural, no un estilo. La arquitectura es el arte más cercano a lo económico y su florecimiento se apoya en el mecenazgo de los negocios multinacionales.', caso:'El hotel y las casas de lujo dependen de capital privado; la obra no es neutral respecto de ese financiamiento.' },
  { a:'Venturi', t:'Complejidad y contradicción', idea:'A favor de una arquitectura de elementos híbridos y ambiguos, frente al «lenguaje puritano» del movimiento moderno. Cacopardo la lee como teoría que también opera como preceptiva y da autonomía a la forma.', caso:'La curva como forma libre del material: la lectura de Cacopardo sobre la madera laminada curva es un punto de contacto con la arquitectura de Cazú.' },
  { a:'Massad', t:'Crítica de choque · 1. La naturaleza de los dioses', idea:'El arquitecto-estrella y la «arquitectura icónica» se sostienen en el espectáculo, la celebridad y la sustitución del pensamiento crítico por la idolatría. Muchos críticos se volvieron panegiristas y beneficiarios.', caso:'La fama del apellido Zegers y el relato de autora: ¿cuánto de su validación es crítica y cuánto celebridad?' },
  { a:'Massad', t:'Crítica de choque · 4. Impostura y demagogia', idea:'Los «narradores» (storytellers) del neopopulismo arquitectónico, como Aravena, exhiben soluciones para los pobres que son seguras para el mercado: no desafían la lógica del capital sino que la preservan.', caso:'Su guía de etnoingeniería con el BID: ¿participación real o relato que no desafía a su productor?' },
  { a:'Pelli', t:'La casa bella', idea:'Estética, identidad y poder en la vivienda: el arquitecto se considera autoridad en «la bella forma», pero el habitante también expresa su identidad en la casa. Ese conflicto no declarado distorsiona las metas de la acción habitacional.', caso:'¿Quién decide la bella forma en Casa Cala, el hotel o un proyecto con comunidades pehuenches?' },
  { a:'Sztulwark', t:'Formas de habitar, formas de vivir', idea:'Con Heidegger, construir, habitar y pensar van juntos. La arquitectura moderna fue una época porque anudó técnica, arte y programa social; hoy esa unión se desconectó y se piensa en «tiempos fluidos».', caso:'En la obra de Cazú se ve la técnica y el arte (la curva), pero el programa social queda afuera: segunda vivienda, hotel de lujo.' },
];

/* ---- master/detail genérico ---- */
function buildMD(list, rootId, opt){
  const root=document.getElementById(rootId); if(!root) return;
  const lst=root.querySelector('.md-list'), det=root.querySelector('.md-det');
  const items=list.map((o,i)=>{ const b=document.createElement('button'); b.className='md-i';
    b.innerHTML=opt.label(o,i); b.onclick=()=>pick(i); lst.appendChild(b); return b; });
  function pick(i){ items.forEach((b,j)=>b.classList.toggle('on',i===j)); det.innerHTML=opt.detail(list[i],i); det.classList.remove('flash'); void det.offsetWidth; det.classList.add('flash'); }
  pick(0);
}
buildMD(IDEAS,'md-ideas',{
  label:(o,i)=>'<span class="n">'+(i+1)+'</span><span>'+o.t+'</span>',
  detail:o=>'<h3>'+o.t+'</h3><div class="blk"><div class="mono">Qué dice Cacopardo</div><p>'+o.dice+'</p></div>'
    +'<div class="blk caso"><div class="mono">En el caso Cazú · para discutir</div><p>'+o.caso+'</p></div>'
    +'<div class="blk"><div class="mono">Dónde se dice (videos, ciclo anterior)</div><div class="srcs">'+o.src.map(s=>'<a href="'+s[1]+'" target="_blank" rel="noopener">▶ '+s[0]+'</a>').join('')+'</div></div>'
});
buildMD(LECTURAS,'md-lect',{
  label:(o,i)=>'<span class="n">'+(i+1)+'</span><span><b>'+o.a+'</b> · '+o.t.replace(/^Crítica de choque · /,'CdC · ')+'</span>',
  detail:o=>'<h3>'+o.a+'</h3><div class="mono" style="margin:-4px 0 14px;color:var(--gold)">'+o.t+'</div><div class="blk"><div class="mono">Idea central</div><p>'+o.idea+'</p></div>'
    +'<div class="blk caso"><div class="mono">En el caso Cazú · para discutir</div><p>'+o.caso+'</p></div>'
});

/* ---- clientes en la línea de tiempo (guía: Etapa 3, punto C) ---- */
(function(){
  const svg=document.getElementById('clSvg'); if(!svg||typeof WORKS==='undefined') return;
  const TIPO=TIPO_CL;
  const LANES=[['p','Personas / familias','#c8a96e'],['e','Empresas e inmobiliarias','#f0703f'],['i','Institución o comunidad','#6a9bf7'],['s','Sin dato claro','#8a8272']];
  const W=1700,H=470,L=300,R=30,T=30,B=50,Y0=1990,Y1=2024;
  const x=y=>L+(y-Y0)/(Y1-Y0)*(W-L-R), laneH=(H-T-B)/LANES.length;
  const ly=k=>T+LANES.findIndex(l=>l[0]===k)*laneH+laneH/2;
  const rad=m=>Math.max(7,Math.sqrt(m)*0.62);
  let s='';
  LANES.forEach((l,i)=>{ const y=T+i*laneH; s+='<rect x="'+L+'" y="'+y+'" width="'+(W-L-R)+'" height="'+laneH+'" style="fill:var(--'+(i%2?'lane2':'lane1')+')"/><text x="'+(L-16)+'" y="'+(y+laneH/2+6)+'" text-anchor="end" font-size="20" fill="'+l[2]+'" font-family="Archivo,sans-serif" font-weight="600">'+l[1]+'</text>'; });
  for(let y=1990;y<=2024;y+=5) s+='<line x1="'+x(y)+'" y1="'+T+'" x2="'+x(y)+'" y2="'+(H-B)+'" style="stroke:var(--line)"/><text x="'+x(y)+'" y="'+(H-B+28)+'" text-anchor="middle" font-size="18" style="fill:var(--dim)" font-family="Archivo,sans-serif">'+y+'</text>';
  const byYear={};
  WORKS.slice().sort((a,b)=>b.m2-a.m2).forEach(w=>{ const k=TIPO[w.slug]||'s'; const lane=LANES.find(l=>l[0]===k); const key=k+w.anio; const n=(byYear[key]=(byYear[key]||0)+1)-1; const cy=ly(k)+(n%2?1:-1)*Math.ceil(n/2)*22;
    s+='<circle class="cl-dot" data-s="'+w.slug+'" cx="'+x(w.anio).toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+rad(w.m2).toFixed(1)+'" fill="'+lane[2]+'" fill-opacity=".78" style="stroke:var(--bg)" stroke-width="1.5"/>';
    if(w.m2>1500) s+='<text x="'+x(w.anio).toFixed(1)+'" y="'+(cy-rad(w.m2)-8).toFixed(1)+'" text-anchor="middle" font-size="17" style="fill:var(--ink)" font-family="Archivo,sans-serif" font-weight="600">'+w.nombre.replace('Edificio ','').replace('Hotel ','H. ')+'</text>'; });
  svg.setAttribute('viewBox','0 0 '+W+' '+H); svg.innerHTML=s;
  const info=document.getElementById('clInfo'), fmt=n=>Number(n).toLocaleString('es-AR',{maximumFractionDigits:0});
  function show(slug){ const w=WORKS.find(q=>q.slug===slug); const k=TIPO[slug]||'s'; const ln=LANES.find(l=>l[0]===k);
    info.innerHTML='<img src="assets/obras/'+slug+'.jpg" alt=""><div><h3>'+w.nombre+' <span class="pg" style="font-size:22px">'+w.anio+'</span></h3><div class="row"><div><span>Cliente</span>'+w.cliente+'</div><div><span>Tipo</span><b style="color:'+ln[2]+'">'+ln[1]+'</b></div><div><span>Superficie</span>'+fmt(w.m2)+' m²</div></div></div>'; }
  svg.querySelectorAll('.cl-dot').forEach(c=>{ c.onmouseenter=()=>show(c.dataset.s); c.onclick=()=>{ show(c.dataset.s); if(window.openObra) openObra(c.dataset.s); }; });
  show('hotel-tierra-patagonia');
  const cnt={}; WORKS.forEach(w=>{const k=TIPO[w.slug]||'s'; cnt[k]=(cnt[k]||0)+1;});
  const m2=WORKS.map(w=>w.m2).sort((a,b)=>a-b), med=m2.length%2?m2[(m2.length-1)/2]:(m2[m2.length/2-1]+m2[m2.length/2])/2;
  const hotel=WORKS.find(w=>w.slug==='hotel-tierra-patagonia'), cala=WORKS.find(w=>w.slug==='casa-cala');
  document.getElementById('clStats').innerHTML=
    '<div><b>'+cnt.p+'</b><span>obras para personas o familias</span></div>'
   +'<div><b>'+cnt.e+'</b><span>para empresas e inmobiliarias</span></div>'
   +'<div><b>'+((cnt.i||0)+(cnt.s||0))+'</b><span>institución, comunidad o sin dato</span></div>'
   +'<div><b>'+fmt(med)+' m²</b><span>mediana de las 27 obras</span></div>'
   +'<div><b>×'+(hotel.m2/med).toFixed(0)+'</b><span>el hotel respecto de la mediana</span></div>'
   +'<div><b>×'+(cala.m2/med).toFixed(1).replace('.',',')+'</b><span>Casa Cala respecto de la mediana</span></div>';
})();
