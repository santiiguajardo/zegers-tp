/* ============================================================
   Láminas «Relatos» y «Doble discurso».
   Citas textuales cortas con su fuente; el resto son paráfrasis.
   Los números de la columna "datos" se calculan con WORKS (data.js / derive.js).
   Todo lo marcado "para discutir" es interpretación del grupo.
   ============================================================ */
(function(){
  const $=id=>document.getElementById(id); if(!$('md-rel')||!$('md-dd')) return;
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const fmt=n=>Number(n).toLocaleString('es-AR',{maximumFractionDigits:0});
  const W=WORKS, n=W.length;
  const m2=W.map(w=>w.m2).sort((a,b)=>a-b), med=n%2?m2[(n-1)/2]:(m2[n/2-1]+m2[n/2])/2;
  const curva=W.filter(w=>w.tip==='Forma curva').length, madera=W.filter(w=>w.mat==='Madera').length;
  const pers=W.filter(w=>w.ctipo==='Persona o familia').length, emp=W.filter(w=>w.ctipo==='Empresa o inmobiliaria').length, inst=W.filter(w=>w.ctipo==='Institución o comunidad').length;
  const arau=W.filter(w=>w.region==='La Araucanía').length, inmo=W.filter(w=>/Bosques de Pucón/i.test(w.cliente)).length;
  const viv=W.filter(w=>w.prog==='Vivienda').length, chile=W.filter(w=>w.geo==='Chile').length;
  const grande=W.filter(w=>w.terreno!=null&&w.terreno>100000).length;
  const hotel=W.find(w=>w.slug==='hotel-tierra-patagonia');
  const conT=W.filter(w=>w.terreno!=null); const tCon=conT.length, tv=conT.map(w=>w.terreno).sort((a,b)=>a-b);
  const tMed=tCon%2?tv[(tCon-1)/2]:(tv[tCon/2-1]+tv[tCon/2])/2;
  const t1ha=conT.filter(w=>w.terreno>=10000).length, t10ha=conT.filter(w=>w.terreno>100000).length;
  const rat=conT.map(w=>w.terreno/w.m2).sort((a,b)=>a-b); const tRatio=Math.round(rat.length%2?rat[(rat.length-1)/2]:(rat[rat.length/2-1]+rat[rat.length/2])/2);

  /* ---------- RELATOS: lo que ella dice (y lo que dice su estudio) ---------- */
  const RELATOS=[
   {g:'De sí misma', q:'«Las mujeres somos ondulantes.»', t:'Sobre su manera de proyectar', src:['Un día una arquitecta (entrevista)','https://undiaunaarquitecta.wordpress.com/2015/10/15/cazu-zegers-1958/'],
    p:'Contrapone el pensamiento «vectorial» masculino con uno femenino «ondulante», y dice que le atrae la velocidad y la levedad, no la arquitectura estática y gravitacional.',
    a:'La forma curva aparece como firma de autora. ¿Es una teoría de la forma o un rasgo de estilo reconocible para el mercado?'},
   {g:'De sí misma', q:'«I am really an artist, and architecture is my artistic support.»', t:'Madame Architect, 2021', src:['Madame Architect, 2021','https://www.madamearchitect.org/interviews/2021/8/23/caz-zegers'],
    p:'Se define como artista y usa la arquitectura como soporte. Juega con la palabra «ama» (artista, mujer y arquitecta). Dice que cada proyecto tiene una reflexión conceptual profunda.',
    a:'Teóricas 7 y 8: la arquitectura como arte da autonomía a la forma. Es el camino que Cacopardo asocia con la cultura dominante y la arquitectura-marca.'},
   {g:'De su obra', q:'«Desde una postura leve y precaria…»', t:'Hotel Tierra Patagonia, web del estudio', src:['Web del estudio: hotel','https://cazuzegers.com/en/arquitectura/hotel_tierra_patagonia/'],
    p:'La arquitectura «se suma de manera respetuosa al patrimonio natural». La tesis del estudio es el «habitar leve y precario»: low-tech, con alto impacto experiencial.',
    a:'«Leve» describe la huella, la estética o el discurso? Lo contrastamos con la escala, el comitente y la tarifa.'},
   {g:'De su obra', q:'«…un lenguaje del aquí, vernáculo…»', t:'Casa Cala, web del estudio', src:['Web del estudio: Casa Cala','https://cazuzegers.com/arquitectura/casa-cala/'],
    p:'La forma y la palabra crean un lenguaje del aquí donde el desarme del galpón tradicional es el deshoje de la flor. Es su «casa tesis».',
    a:'Rudofsky llama vernácula a la arquitectura anónima y comunal. Acá es una casa de autor, con firma, premio y cliente propietario.'},
   {g:'Del territorio', q:'«El territorio es a América, como los monumentos son a Europa.»', t:'Tesis del estudio', src:['Web del estudio: Somos','https://cazuzegers.com/somos/'],
    p:'Sostiene que el mayor valor de Chile y Latinoamérica es su territorio. De ahí su idea de una arquitectura «en progreso» y una reflexión poética sobre cómo se habita.',
    a:'Si el territorio es el «monumento», ¿quién accede a él? Pelli y Cacopardo preguntan por el habitar de quienes no son comitentes.'},
   {g:'Del territorio', q:'«…la unidad mínima para conquistar un territorio.»', t:'Entrevista, Revista Ed., 2024', src:['Revista Ed.: «Leve»','https://www.ed.cl/archivo/arquitectura/leve-la-sintesis-de-cazu-zegers/'],
    p:'Explica que su categoría Leve nace de preguntarse cuál es la unidad mínima para conquistar y habitar un territorio de manera bella. En Kawelluco las llama «Unidades de Conquista» (tiny houses).',
    a:'Vocabulario de conquista aplicado al paisaje. Teórica 2 y Liernur: el poder colonial destruye o deforma tejidos culturales preexistentes.'},
   {g:'Del territorio', q:'«Yo lo llamo “colonización 2.0”.»', t:'Entrevista, Revista Ed., 2024', src:['Revista Ed.: «Leve»','https://www.ed.cl/archivo/arquitectura/leve-la-sintesis-de-cazu-zegers/'],
    p:'Se refiere a una generación joven que decide irse de la ciudad para volver a la naturaleza. Dice además que ve desconexión del país con su paisaje y su territorio.',
    a:'La palabra «colonización» como descripción neutral de quien ocupa tierra rural. ¿Quién ya vivía ahí?'},
   {g:'De la ruralización', q:'Kawelluco: no un balneario, «una manera de habitar en comunidad».', t:'Web del estudio: Kawelluco', src:['Web del estudio: Kawelluco','https://cazuzegers.com/territorio/kawelluco/'],
    p:'Una ruralización que se aprovecha de una vieja explotación forestal para conservar un parque nativo: 600 hectáreas de reserva y 396 ha en sitios ruralizados, con una hectárea como unidad mínima.',
    a:'Habitar en comunidad, pero con lotes vendidos a particulares. ¿Comunidad de quiénes? (Pelli, teórica 11).'},
   {g:'De la sostenibilidad', q:'«…regeneración y recuperación del hábitat.»', t:'Entrevista, Madera21', src:['Madera21','https://www.madera21.cl/cazu-zegers-a-la-vanguardia-de-la-arquitectura-en-la-transformacion-social-y-la-construccion-sostenible-en-madera/'],
    p:'No se trata solo de ser sostenibles. Habla del paso de un sistema egocéntrico a uno ecocéntrico y de que el lugar aporta una dimensión poética que ella materializa con el material del lugar, casi siempre madera.',
    a:'Es el relato de mayor consenso. ¿Se sostiene en una trayectoria de segundas viviendas y turismo de lujo?'},
   {g:'De las comunidades', q:'Se presenta como «experta» en etnoarquitectura y etnoingeniería.', t:'Web del estudio', src:['Web del estudio: etnoarquitectura','https://cazuzegers.com/etnoarquitectura/'],
    p:'Dice que años de práctica con comunidades locales y técnicas ancestrales le dieron una metodología participativa; lidera proyectos para organizaciones mundiales (la guía de etnoingeniería del BID, 2022).',
    a:'Massad (cap. 4): los «narradores» de lo social ofrecen soluciones seguras para el mercado. Pelli: ¿quién decide la forma legítima?'},
   {g:'Sobre América', q:'«Los americanos éramos imitadores de costumbres…»', t:'Cita usada en el TP (fuente a ubicar)', src:null,
    p:'Es la frase con que cerramos la reflexión: no habíamos asumido nuestra propia cultura. Funciona como diagnóstico y como programa de su obra.',
    a:'Scarano y Liernur: ¿se resuelve imitando menos al centro, o cambiando quién enuncia y quién valida?'},
   {g:'De la medida', q:'«No toda la arquitectura se mide en metros cuadrados.»', t:'Reel del podcast de A. Ahumada (ep. 50 con Cazú), abril 2026', src:['Instagram: reel del episodio 50','https://www.instagram.com/reel/DXFnyLehVG6/'],
    p:'El reel que anuncia el episodio dice que algunas arquitecturas se miden en silencio, paisaje y emoción. Ojo: es el texto del conductor al promocionar la entrevista, no una cita textual de ella.',
    a:'Silencio y paisaje son atributos del terreno: se compran en hectáreas. Lo contrastamos con la superficie de terreno de cada ficha.'},
  ];

  const ESCALA=[['regional','Blog de arquitectas de habla hispana (ARQA / Un día una arquitecta); llega a lectores de América Latina y España.'],['global','Entrevista en una revista de Estados Unidos (Madame Architect), en inglés.'],['global','Web del estudio en español e inglés; el texto del hotel circuló en ArchDaily, Domus y otros medios internacionales.'],['global','Web bilingüe del estudio, para el mercado internacional.'],['global','Tesis del estudio en su web bilingüe, repetida en entrevistas y presentaciones en el exterior.'],['nacional','Revista Ed. (Chile).'],['nacional','Revista Ed. (Chile).'],['nacional','Web del estudio sobre un proyecto en Pucón (Chile).'],['nacional','Medio chileno de la industria de la madera (Madera21).'],['regional','Programa del BID para América Latina y el Caribe, y web del estudio.'],['sin dato','Cita usada en el TP; fuente original por ubicar.'],['nacional','Podcast y reel de un conductor chileno, en Instagram.']];
  RELATOS.forEach((o,i)=>{ if(ESCALA[i]){ o.e=ESCALA[i][0]; o.ew=ESCALA[i][1]; } });

  /* ---------- DOBLE DISCURSO: relato contra datos ---------- */
  const DD=[
   {t:'«Leve y precaria»: el hotel de Torres del Paine',
    r:'Postura leve y precaria; «mínimas intervenciones» en el paisaje (web del estudio).',
    d:[
     '<b>4.900 m²</b> en <b>70 hectáreas</b>: '+Math.round(hotel.m2/med)+' veces la mediana de las '+n+' obras ('+fmt(med)+' m²).',
     'Tarifa 2025–26: <b>US$ 2.450 a 4.540</b> por habitación y noche, todo incluido, mínimo 3 noches.',
     'Dueña: <b>Katari S.A. (Tierra Hotels)</b>, de las familias Purcell (Ski Portillo) y Matetic. En 2022 vendieron el <b>83,5 %</b> a Baillie Lodges, de KSL Capital Partners.'],
    l:'Cacopardo (teórica 12): el productor es una red; la obra «leve» es un nodo de capital financiero. Jameson: la arquitectura es la más cercana a lo económico.',
    m:'La web describe medidas reales de bajo impacto: la vegetación se levantó, se guardó y se replantó. Levedad no es lo mismo que ausencia de escala.',
    q:'¿Es leve la intervención, o es leve el discurso y la estética?',
    s:[['Tarifas','https://patagoniatierra.com/rates-packages/'],['Venta de Katari','https://www.nld.cl/en/relevant-experience/nld-advises-katari-s-a-on-the-sale-of-tierra-hotels/'],['DF: Purcell y Matetic','https://www.df.cl/empresas/industria/grupos-purcell-y-matetic-concretan-venta-de-participacion-mayoritaria-de']]},
   {t:'«Habitar en comunidad»: Kawelluco',
    r:'Ruralización «no a modo de balneario sino como una manera de habitar en comunidad»; conserva un parque nativo (web del estudio).',
    d:[
     '996 ha: <b>600 de reserva</b> y <b>396 en sitios</b> de al menos una hectárea.',
     inmo+' de las '+n+' obras tienen como cliente a la <b>Inmobiliaria Bosques de Pucón</b>; '+arau+' obras están en La Araucanía.',
     'Socio en 1996: Rafael Larraín, entonces su esposo, a cargo del desarrollo.'],
    l:'Pelli y teórica 11: quién define la «bella forma» y para quién es el habitar. Rudofsky: la arquitectura comunal es anónima y de todos, no de lotes.',
    m:'La reserva de 600 ha protege un bosque antes explotado, y eso es un aporte real. Conservar no quita que el suelo fue parcelado y comercializado.',
    q:'¿Comunidad de quiénes?',
    s:[['Web del estudio: Kawelluco','https://cazuzegers.com/territorio/kawelluco/'],['Un día una arquitecta','https://undiaunaarquitecta.wordpress.com/2015/10/15/cazu-zegers-1958/']]},
   {t:'«Lenguaje del aquí, vernáculo»: Casa Cala',
    r:'Forma y palabra crean un lenguaje del aquí; el desarme del galpón tradicional es el deshoje de la flor (web).',
    d:[
     'Casa de autor de <b>447 m²</b> en <b>20 ha</b> privadas (Lago Ranco, Los Ríos); cliente particular (José Manuel Morales).',
     'Gana el <b>Gran Premio Latinoamericano de Arquitectura 1993</b> (Bienal de Buenos Aires): la validación es de un circuito disciplinar, no de una comunidad.',
     'Cliente: no pudimos confirmar el cargo que el TP le atribuía (gerente general de la Bolsa de Comercio).'],
    l:'Rudofsky: arquitectura sin arquitectos. Liernur: ¿completa o discute el canon? Scarano: enunciar desde el margen sin pedir legitimación al centro.',
    m:'Lo vernáculo aparece como lenguaje y material (madera local), y es su obra más premiada por esa razón.',
    q:'¿Puede ser «del aquí» una obra firmada, premiada y encargada por un propietario?',
    s:[['Ficha de la obra','https://cazuzegers.com/arquitectura/casa-cala/'],['Premios','https://cazuzegers.com/premios/']]},
   {t:'«Lo ondulante» y la madera: coherencia y forma',
    r:'Lo ondulante frente a lo estático; «material del lugar», casi siempre madera.',
    d:[
     '<b>'+curva+' de '+n+'</b> obras están clasificadas como forma curva; <b>'+madera+' de '+n+'</b> son de madera.',
     'La curva y la madera aparecen desde Casa Cala (1991) y se repiten en el hotel (2012).'],
    l:'Cacopardo (teórica 8): la madera laminada curva «sin coherencia» entre material, tecnología y forma se naturalizó y hasta se premia. Mies exigía coherencia; Venturi la rompe y le da autonomía a la forma.',
    m:'Su método (Gesto–Figura–Forma) busca que la forma nazca de la observación del lugar, y usa carpintería local: es un argumento de coherencia propio.',
    q:'¿Es una forma que nace del lugar o una firma que se repite en lugares distintos?',
    s:[['Teórica 8','https://www.youtube.com/watch?v=NJzfaieCdgA'],['Revista Ed.','https://www.ed.cl/archivo/arquitectura/leve-la-sintesis-de-cazu-zegers/']]},
   {t:'«El territorio es el monumento» y el lenguaje de la conquista',
    r:'El territorio como mayor valor de América; unidades mínimas «para conquistar un territorio»; «colonización 2.0».',
    d:[
     '<b>'+chile+' de '+n+'</b> obras en Chile; '+viv+' son viviendas.',
     'Clientes: <b>'+pers+' personas o familias</b>, <b>'+emp+' empresas</b>, <b>'+inst+'</b> institución o comunidad.',
     grande+' obras en terrenos de más de 10 hectáreas.'],
    l:'Teórica 2 y Liernur: el poder colonial destruye o deforma tejidos culturales. Scarano: la palabra del centro sobre el margen. El léxico de conquista es suyo, no del grupo.',
    m:'Lo usa para hablar de una nueva forma de ocupar el campo, con criterio ecológico.',
    q:'¿Se puede hablar de «conquista» y «colonización» sin preguntar por los habitantes previos?',
    s:[['Revista Ed.','https://www.ed.cl/archivo/arquitectura/leve-la-sintesis-de-cazu-zegers/'],['Web: Somos','https://cazuzegers.com/somos/']]},
   {t:'Etnoarquitectura: saber indígena y participación',
    r:'Metodología participativa que valora el conocimiento tradicional; experta que lidera proyectos para organismos mundiales (web).',
    d:[
     'La <b>guía de etnoingeniería</b> (2022) es un encargo del <b>BID</b>: actualiza una guía de hace 18 años.',
     'La <b>Ruta Pehuenche</b> busca posicionar la Araucanía como destino turístico de «clase mundial».',
     'De las '+n+' obras, solo <b>'+inst+'</b> tienen una comunidad o institución como comitente, y <b>ninguna</b> una comunidad indígena.'],
    l:'Massad (cap. 4): los «narradores» de lo social ofrecen soluciones convenientes para el mercado. Pelli: el conflicto de poder entre la estética del arquitecto y la del habitante.',
    m:'Hay trabajo concreto con comunidades: Casas Maternas (Bolivia) y el Mirador de la Corona con la comunidad mapuche de Arenales (Andes Workshop 2017).',
    q:'¿Cuánto decide la comunidad y cuánto el productor que contrata?',
    s:[['Guías BID (web)','https://cazuzegers.com/etno-arquitectura/guias-etnoingenieria/'],['Ruta Pehuenche','https://cazuzegers.com/etno-arquitectura/ruta-pehuenche/'],['Andes Workshop 2017','https://www.archdaily.mx/mx/890133/cazu-zegers-y-grupotalca-otorgan-valor-al-territorio-a-traves-de-andesworkshop']]},
   {t:'«Se mide en silencio y paisaje»: ¿y en hectáreas?',
    r:'«No toda la arquitectura se mide en metros cuadrados. Algunas se miden en silencio, paisaje… y emoción» (reel del podcast ep. 50, abril 2026; texto del conductor).',
    d:[
     'La mediana del <b>terreno</b> es de <b>'+fmt(tMed)+' m²</b> (una hectárea) para casas de '+fmt(med)+' m²: '+tRatio+' veces lo construido.',
     '<b>'+t1ha+' de '+tCon+'</b> obras con dato de terreno tienen una hectárea o más; <b>'+t10ha+'</b> superan las 10 hectáreas (20, 70 y 70; Fogón figura con 936 ha, la superficie de Kawelluco).',
     'Las fichas del estudio publican siempre <b>área de terreno y área construida</b>. Las obras de ciudad (oficinas, hoteles urbanos, Soplo, Magnolia) están en lotes de entre 646 y 1.460 m².'],
    l:'Cacopardo (habitar) y Pelli: el silencio y el paisaje son un bien de quien posee el suelo. Jameson: la arquitectura es la más cercana a los valores del terreno.',
    m:'No todos los terrenos son enormes: '+(tCon-t1ha)+' de '+tCon+' son menores a una hectárea, y la propia web separa lo construido de lo que se conserva.',
    q:'Si silencio y paisaje se miden en hectáreas privadas, ¿a quién le queda esa medida?',
    s:[['Reel de Instagram','https://www.instagram.com/reel/DXFnyLehVG6/'],['Fichas del estudio','https://cazuzegers.com/arquitectura/']]},
  ];

  /* ---------- armado de las láminas ---------- */
  function build(root,list,label,detail){
    const L=$(root).querySelector('.md-list'), D=$(root).querySelector('.md-det');
    const items=list.map((o,i)=>{ const b=document.createElement('button'); b.className='md-i'; b.innerHTML=label(o,i); b.onclick=()=>pick(i); L.appendChild(b); return b; });
    function pick(i){ items.forEach((b,j)=>b.classList.toggle('on',i===j)); D.innerHTML=detail(list[i],i); D.classList.remove('flash'); void D.offsetWidth; D.classList.add('flash'); }
    pick(0);
  }
  const link=s=>s?'<a href="'+s[1]+'" target="_blank" rel="noopener">▶ '+esc(s[0])+'</a>':'<span class="srcn">Fuente a ubicar</span>';
  build('md-rel',RELATOS,(o,i)=>'<span class="n">'+(i+1)+'</span><span><i class="g">'+esc(o.g)+' <i class="esc e-'+(o.e==='sin dato'?'sin':o.e)+'">'+esc(o.e)+'</i></i>'+esc(o.q.length>52?o.q.slice(0,50)+'…':o.q)+'</span>',
    o=>'<div class="mono">'+esc(o.g)+' · '+esc(o.t)+'</div><div class="relq">'+esc(o.q)+'</div><div class="blk"><div class="mono">Qué dice</div><p>'+esc(o.p)+'</p></div><div class="blk caso"><div class="mono">Para el análisis · para discutir</div><p>'+esc(o.a)+'</p></div><div class="blk"><div class="mono">Escala del relato · '+esc(o.e)+'</div><p>'+esc(o.ew)+'</p></div><div class="srcs">'+link(o.src)+'</div>');
  build('md-dd',DD,(o,i)=>'<span class="n">'+(i+1)+'</span><span>'+o.t+'</span>',
    o=>'<h3>'+o.t+'</h3>'
     +'<div class="dd"><div class="dd-c"><div class="blk rel"><div class="mono">El relato</div><p>'+o.r+'</p></div>'
     +'<div class="blk dat"><div class="mono">Los datos</div><ul>'+o.d.map(x=>'<li>'+x+'</li>').join('')+'</ul></div></div>'
     +'<div class="dd-c"><div class="blk"><div class="mono">Lectura con las teóricas y los textos</div><p>'+o.l+'</p></div>'
     +'<div class="blk mat"><div class="mono">Matiz: lo que juega a favor</div><p>'+o.m+'</p></div>'
     +'<div class="blk caso"><div class="mono">Para discutir</div><p><b>'+o.q+'</b></p></div></div></div>'
     +'<div class="srcs">'+o.s.map(link).join('')+'</div>');
})();
