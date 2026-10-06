/* ============================================================
   Datos derivados: ubicaciones, tipo de cliente, filtros nuevos y
   correcciones con la ficha oficial (https://cazuzegers.com/arquitectura/).
   Se carga después de data.js y fichas.js, antes de app.js.
   ============================================================ */

// --- correcciones a data.js con la ficha oficial de la web ---
(function(){
  const fix={
    'casa-cala':        {lugar:'Lago Ranco, Los Ríos'},
    'casa-santa-maria': {lugar:'Kawelluco, Pucón', m2:200},
    'casa-del-fuego':   {m2:860},
    'casa-t':           {m2:489},
  };
  WORKS.forEach(w=>{ const f=fix[w.slug]; if(f) Object.assign(w,f); });
})();

// Ubicación aproximada de cada obra [lat, lon, región]. Fuente de la localidad: ficha de la web.
const LOC = {
  'casa-cala':[-40.30,-72.40,'Los Ríos'],  // Lago Ranco (la web); el TP decía Los Vilos / Zapallar
  'casa-do':[-31.96,-71.53,'Coquimbo'],
  'golf-manquehue':[-33.36,-70.51,'Metropolitana'], 'open-office':[-33.39,-70.58,'Metropolitana'],
  'capilla-espiritu-santo':[-33.61,-70.58,'Metropolitana'], 'casa-petra':[-33.372,-70.559,'Metropolitana'], 'casa-t':[-33.83,-70.92,'Metropolitana'],
  'casa-soplo':[-33.43,-70.68,'Metropolitana'], 'casa-esmeralda':[-33.33,-70.49,'Metropolitana'], 'hotel-magnolia':[-33.46,-70.64,'Metropolitana'],
  'oficinas-felices':[-33.40,-70.57,'Metropolitana'], 'casa-k':[-33.41,-70.61,'Metropolitana'], 'tiny-house':[-33.48,-70.70,'Metropolitana'],
  'casa-haiku':[-32.88,-71.25,'Valparaíso'],
  'casa-fogon':[-39.27,-71.98,'La Araucanía'], 'casa-taller-cubo':[-39.30,-71.95,'La Araucanía'], 'casa-del-silencio':[-39.25,-71.90,'La Araucanía'],
  'casa-cascara':[-39.28,-72.03,'La Araucanía'], 'casa-tea':[-39.32,-71.93,'La Araucanía'], 'casa-granero':[-39.22,-71.97,'La Araucanía'], 'casa-carpa':[-39.35,-71.75,'La Araucanía'],
  'casa-santa-maria':[-39.31,-71.88,'La Araucanía'],  // Kawelluco, Pucón (la web); el TP decía Chicureo
  'casa-del-fuego':[-40.18,-72.00,'Los Ríos'], 'casa-llu':[-40.12,-72.05,'Los Ríos'], 'casa-ye':[-39.81,-73.25,'Los Ríos'],
  'hotel-tierra-patagonia':[-51.00,-72.90,'Magallanes'],
};
const REG_INSET = {'Metropolitana':'scl','Valparaíso':'scl','La Araucanía':'sur','Los Ríos':'sur'};

// Tipo de cliente (nuestra clasificación según el nombre del comitente)
const TIPO_CL = { 'casa-cala':'p','golf-manquehue':'s','casa-del-fuego':'p','open-office':'e','casa-fogon':'e','casa-santa-maria':'p','casa-taller-cubo':'p','casa-del-silencio':'p','casa-do':'p','casa-cascara':'e','casa-tea':'e','casa-haiku':'p','capilla-espiritu-santo':'i','casa-granero':'p','casa-petra':'p','casa-carpa':'p','casa-t':'e','casa-soplo':'e','hotel-tierra-patagonia':'e','casa-esmeralda':'e','hotel-magnolia':'e','oficinas-felices':'e','casa-k':'p','casa-llu':'p','casa-ye':'p','tiny-house':'e','jardin-cruz-roja':'i' };
const TIPO_LBL = {p:'Persona o familia', e:'Empresa o inmobiliaria', i:'Institución o comunidad', s:'Sin dato'};

// Entorno (nuestra clasificación a partir de la localidad que indica la web)
const ENTORNO = {
  'casa-cala':'Lago','casa-del-fuego':'Lago','casa-llu':'Lago','casa-t':'Lago',
  'casa-fogon':'Bosque y volcán (Pucón)','casa-taller-cubo':'Bosque y volcán (Pucón)','casa-del-silencio':'Bosque y volcán (Pucón)','casa-cascara':'Bosque y volcán (Pucón)','casa-tea':'Bosque y volcán (Pucón)','casa-granero':'Bosque y volcán (Pucón)','casa-carpa':'Bosque y volcán (Pucón)','casa-santa-maria':'Bosque y volcán (Pucón)',
  'casa-do':'Costa','casa-haiku':'Valle','hotel-tierra-patagonia':'Patagonia','casa-ye':'Sur húmedo (Valdivia)',
  'golf-manquehue':'Precordillera de Santiago','casa-petra':'Precordillera de Santiago','casa-esmeralda':'Precordillera de Santiago',
  'open-office':'Ciudad','capilla-espiritu-santo':'Ciudad','casa-soplo':'Ciudad','hotel-magnolia':'Ciudad','oficinas-felices':'Ciudad','casa-k':'Ciudad','tiny-house':'Ciudad','jardin-cruz-roja':'Ciudad',
};

// Notas de contraste entre el TP y la ficha oficial (se muestran en la ficha de cada obra)
const NOTAS_FICHA = {
  'casa-cala':'La web ubica la obra en Lago Ranco (Los Ríos). En nuestra cronología figuraba Los Vilos y en la biografía El Pangue (Zapallar): revisar.',
  'casa-santa-maria':'Superficie: 200 m² según la web (en el TP figuraba 2.002). Está en Kawelluco, Pucón; el TP decía Chicureo.',
  'casa-del-fuego':'Superficie: 860 m² según la web (en el TP figuraba 528).',
  'casa-t':'Superficie: 489 m² según la web (en el TP figuraba 245).',
  'casa-llu':'La web publica 4.900 m² y 70 ha: los mismos datos que el Hotel Tierra Patagonia. Puede ser un error de la web.',
  'capilla-espiritu-santo':'La web publica 903 m², la misma cifra que Casa Haiku.',
  'hotel-tierra-patagonia':'Año: la web indica 2011; en el TP figura 2012.',
  'hotel-magnolia':'Año: la web indica 2016; en el TP figura 2015.',
  'casa-ye':'La web indica 2008 como año del proyecto y 2016–2018 como construcción.',
};

// --- parseo de la ficha oficial ---
function fichaGet(slug, re){ const f=(typeof FICHAS!=='undefined'&&FICHAS[slug])?FICHAS[slug].ficha:[]; const x=f.find(p=>re.test(p[0])); return x?x[1]:null; }
function terrenoM2(slug){
  const s=fichaGet(slug,/terreno/i); if(!s) return null;
  const m=s.toLowerCase().replace('m²','m2').match(/([\d.,]+)\s*(m2|hect)/); if(!m) return null;
  let n=m[1]; n = /\d\.\d{3}/.test(n) ? n.replace(/\./g,'').replace(',','.') : n.replace(',','.');
  const v=parseFloat(n); if(isNaN(v)) return null; return m[2].startsWith('hect') ? v*10000 : v;
}
WORKS.forEach(w=>{
  w.ctipo = TIPO_LBL[TIPO_CL[w.slug]||'s'];
  w.region = LOC[w.slug] ? LOC[w.slug][2] : 'Exterior (Suiza)';
  w.entorno = ENTORNO[w.slug] || 'Sin dato';
  w.terreno = terrenoM2(w.slug);
  const ficha=(typeof FICHAS!=='undefined'&&FICHAS[w.slug])?FICHAS[w.slug].ficha:[];
  const compartida = ficha.some(p=>/^Arquitect(os|a)\s+(asociad|colaborad)|^Arquitecta y Dise|^Arquitecta L[ií]der/i.test(p[0])) || ficha.some(p=>/^Arquitectos$/i.test(p[0]) && !/^Caz[uú] Zegers( G\.)?$/i.test(p[1]));
  w.autoria = compartida ? 'Con otros arquitectos' : 'Autoría propia del estudio';
  const foto=fichaGet(w.slug,/^foto/i);
  w.fotografo = !foto ? 'Sin dato' : (/wenborne/i.test(foto) ? 'Guy Wenborne' : 'Otros fotógrafos');
});

// --- filtros nuevos (los anteriores quedan igual) ---
DIMS.push(
  { id:'ctipo',  label:'Tipo de cliente',        nuevo:true, get:w=>w.ctipo },
  { id:'region', label:'Región',                 nuevo:true, get:w=>w.region },
  { id:'entorno',label:'Entorno',                nuevo:true, get:w=>w.entorno },
  { id:'terreno',label:'Tamaño del terreno',     nuevo:true, get:w=> w.terreno==null ? 'Sin dato' : (w.terreno<1000 ? '< 1.000 m²' : (w.terreno<10000 ? '1.000 – 10.000 m²' : (w.terreno<=100000 ? '1 – 10 ha' : '> 10 ha'))) },
  { id:'autoria',label:'Autoría',                nuevo:true, get:w=>w.autoria },
  { id:'foto',   label:'Fotógrafo (circulación)',nuevo:true, get:w=>w.fotografo },
);
