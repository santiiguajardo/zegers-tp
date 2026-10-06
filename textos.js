/* ============================================================
   «Texto contra texto» (TP 1bis, etapa 2B): matriz de diálogo entre las lecturas.
   Hecho a partir de la lectura de los 11 textos de la cátedra (los escaneados se leyeron
   por muestra: revisar antes de citar). Las "aperturas" para el caso son hipótesis del grupo.
   ============================================================ */
(function(){
  const root=document.getElementById('s-texto'); if(!root) return;
  const A=['Freire','Rudofsky','Liernur','Scarano','Colomina','Jameson','Venturi','Massad 1','Massad 4','Pelli','Sztulwark'];
  const FULL={'Freire':'Freire · El acto de estudiar','Rudofsky':'Rudofsky · Arquitectura sin arquitectos','Liernur':'Liernur · ¡Es el punto de vista, estúpido!','Scarano':'Scarano · Enunciar desde el margen','Colomina':'Colomina · 1949','Jameson':'Jameson · Posmodernismo','Venturi':'Venturi · Complejidad y contradicción','Massad 1':'Massad · La naturaleza de los dioses','Massad 4':'Massad · Impostura y demagogia','Pelli':'Pelli · La casa bella','Sztulwark':'Sztulwark · Formas de habitar'};
  const P=[
   ['Liernur','Scarano','Descentrar el relato',
    'Los dos desconfían de las categorías rígidas centro/periferia y de la reivindicación «local» como esencia intacta.',
    'Liernur propone ampliar la globalización y escribir nuevos relatos totalizantes, aunque provisorios, desde puntos de vista localizados. Scarano pone el acento en el lugar de enunciación del margen y en el riesgo de importar teorías que piden legitimación al centro.',
    'Cazú habla desde América (Amereida) pero circula por premios y medios del centro. ¿Completa el canon o enuncia desde otro lugar?'],
   ['Liernur','Rudofsky','Lo «otro» como fuente',
    'Ambos critican una historia de la arquitectura hecha con pocas culturas y desde un solo punto de vista.',
    'Rudofsky reivindica lo anónimo y vernáculo como alternativa. Liernur muestra que ese interés por lo «primitivo» (cabaña, gruta, kasbah) fue un tópico recurrente de la propia modernidad, y no una salida.',
    'El «lenguaje vernáculo» de Cazú puede leerse dentro de esa tradición: lo otro como fuente de pureza para el arquitecto de autor.'],
   ['Jameson','Venturi','Fin de la pureza moderna',
    'Los dos registran el quiebre del modernismo puro: la mezcla, la ironía y el abandono del «lenguaje puritano».',
    'Venturi lo propone como manifiesto a favor de la complejidad y la contradicción; Jameson lo ve como síntoma de la dominante cultural del capitalismo tardío. Cacopardo lee a Venturi como preceptiva de esa cultura dominante.',
    'La forma curva y libre del material: ¿liberación formal o forma autónoma al servicio del mercado?'],
   ['Jameson','Massad 1','Arquitectura y capital',
    'Ambos ligan la arquitectura al dinero: mecenazgo de los negocios multinacionales (Jameson) y capitalismo estético (Massad).',
    'Jameson describe una lógica sistémica y de época; Massad baja a la figura del arquitecto-estrella, el espectáculo y la celebridad como mecanismos concretos.',
    'La validación de Cazú (premios de hotelería, prensa global digital) como forma de star-system a escala latinoamericana.'],
   ['Massad 1','Massad 4','Del ícono al narrador',
    'Los dos capítulos muestran cómo el relato sirve al sistema que lo premia.',
    'En el primero el protagonista es el arquitecto-dios de la obra icónica. En el cuarto, el «narrador» de lo social (Aravena) que ofrece soluciones convenientes para el mercado.',
    'Cazú aparece en los dos polos: hotel de lujo con relato leve, y etnoarquitectura con encargo de un banco multilateral.'],
   ['Pelli','Sztulwark','El habitar como conflicto',
    'Ambos entienden el habitar como terreno de poder entre quien proyecta y quien vive.',
    'Pelli lo muestra en la vivienda social: arquitecto, habitante y funcionario con estéticas distintas. Sztulwark lo piensa con Heidegger y define la arquitectura moderna como época porque anudaba técnica, arte y programa social.',
    'En la obra de Cazú se ven técnica y arte; el programa social queda afuera. ¿Quién define la bella forma en sus casas?'],
   ['Pelli','Colomina','Quién produce el estilo de vida',
    'Los dos preguntan quién define cómo se vive y qué se considera bello.',
    'Colomina: las revistas y el programa Case Study fabricaron un estilo de vida de posguerra. Pelli: la casa es expresión de la identidad del habitante, aunque el arquitecto crea poseer la bella forma.',
    'Los medios que publican a Cazú y los habitantes de sus casas: ¿quién fabrica el «habitar leve»?'],
   ['Colomina','Massad 1','Medios que consagran',
    'Publicar es una forma de producir sentido y de consagrar.',
    'Colomina estudia revistas como Arts & Architecture y la fotografía como productora de arquitectura. Massad señala críticos y publicaciones (El Croquis) que se volvieron panegiristas del star-system.',
    'Su archivo de prensa es casi todo digital y global: Domus, Wallpaper, ArchDaily, Gooood. ¿Qué circuito es ese?'],
   ['Freire','Scarano','Leer sin copiar',
    'Los dos piden ser sujeto del conocimiento y no repetidor.',
    'Freire habla de estudiar críticamente un texto, sin dejarse «magnetizar» por el autor. Scarano advierte contra los «epígonos transfronterizos» que importan categorías.',
    'Es el método de este trabajo: usar los textos como herramienta propia para volver al caso.'],
   ['Rudofsky','Pelli','Quién posee la bella forma',
    'Ambos descentran al arquitecto como único dueño de la belleza.',
    'Rudofsky mira lo construido por pueblos sin arquitectos; Pelli la vivienda social contemporánea, donde el habitante expresa su identidad a pesar del arquitecto.',
    'Una arquitectura «del lugar» pensada para pocos: ¿qué belleza y de quién?'],
   ['Sztulwark','Jameson','Pérdida del programa social',
    'Los dos describen un tiempo en que la arquitectura se separó de su sentido social.',
    'Sztulwark: hoy hay desconexión entre época y reflexión arquitectónica. Jameson: la producción estética se integra a la producción general de mercancías.',
    'Una trayectoria de segundas viviendas y turismo de lujo es un caso de esa separación, con sus contrapesos (etnoarquitectura, tiny houses).'],
   ['Liernur','Jameson','El capital detrás del canon',
    'Los dos introducen lo que los relatos canónicos ignoran: capital, imperio y colonialismo.',
    'Liernur lo hace para ampliar el relato moderno a otros puntos de vista; Jameson para periodizar el posmodernismo como lógica cultural.',
    'Quién escribe el relato de la arquitectura latinoamericana «leve» y desde dónde.'],
  ];
  const key=(a,b)=>A.indexOf(a)<A.indexOf(b)?a+'|'+b:b+'|'+a;
  const map={}; P.forEach((p,i)=>{ map[key(p[0],p[1])]=i; });
  const grid=document.getElementById('txGrid'), det=document.getElementById('txDet');
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
  let h='<div class="tx-c0"></div>'+A.map(a=>'<div class="tx-h">'+a+'</div>').join('');
  A.forEach(r=>{ h+='<div class="tx-r">'+r+'</div>'; A.forEach(c=>{ if(r===c) h+='<div class="tx-d"></div>'; else { const i=map[key(r,c)]; h+= i===undefined ? '<div class="tx-e"></div>' : '<button class="tx-p" data-i="'+i+'" aria-label="'+r+' y '+c+'"></button>'; } }); });
  grid.innerHTML=h;
  function pick(i){ const p=P[i]; grid.querySelectorAll('.tx-p').forEach(b=>b.classList.toggle('on',+b.dataset.i===i));
    det.innerHTML='<div class="mono">Texto contra texto</div><h3>'+esc(p[2])+'</h3><div class="tx-ab"><span>'+esc(FULL[p[0]])+'</span><i>↔</i><span>'+esc(FULL[p[1]])+'</span></div>'
     +'<div class="blk co"><div class="mono">Coinciden</div><p>'+esc(p[3])+'</p></div><div class="blk di"><div class="mono">Divergen</div><p>'+esc(p[4])+'</p></div><div class="blk caso"><div class="mono">Qué abre para el caso · para discutir</div><p>'+esc(p[5])+'</p></div>'; det.classList.remove('flash'); void det.offsetWidth; det.classList.add('flash'); }
  grid.querySelectorAll('.tx-p').forEach(b=>b.onclick=()=>pick(+b.dataset.i));
  pick(0);
})();
