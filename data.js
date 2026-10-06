// ============================================================
//  DATOS DEL TP  ·  editá acá si hay que corregir algo
//  (los datos salen de la cronología del trabajo final)
// ============================================================

// slug = nombre de la foto en assets/obras/<slug>.jpg
// m2: superficie en m². Valores marcados con (?) conviene verificarlos.
const WORKS = [
  { slug:'casa-cala',               nombre:'Casa Cala',               anio:1991, lugar:'Los Vilos, Chile',          m2:447,    colab:'Cazú Zegers Taller',      cliente:'José Manuel Morales',       mat:'Madera',          com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Forma curva' },
  { slug:'golf-manquehue',          nombre:'Edificio Golf de Manquehue', anio:1994, lugar:'Lo Barnechea, Chile',    m2:8144,   colab:'Antonia Lehmann / Luis Izquierdo', cliente:'Encargo privado',  mat:'Hormigón armado', com:'Privado',    prog:'Conjunto de viviendas', geo:'Chile', tip:'Forma curva' },
  { slug:'casa-del-fuego',          nombre:'Casa del fuego',          anio:1996, lugar:'Lago Maihue, Chile',        m2:528,    colab:'Antonia Lehmann / Luis Izquierdo', cliente:'Carmen García D.', mat:'Madera',          com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Forma curva' },
  { slug:'open-office',             nombre:'Open Office',             anio:1997, lugar:'Vitacura, Santiago',        m2:583,    colab:'Grupo Aira',              cliente:'Prosequip Ltda – BASH',     mat:'Acero + vidrio',  com:'Privado',    prog:'Institucional',         geo:'Chile', tip:'Forma curva' },
  { slug:'casa-fogon',              nombre:'Casa Fogón',              anio:1997, lugar:'Pucón, La Araucanía',       m2:200,    colab:'Rafael Larraín',          cliente:'Inmobiliaria Bosques de Pucón', mat:'Madera',      com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Forma pura' },
  { slug:'casa-santa-maria',        nombre:'Casa Santa María',        anio:1998, lugar:'Chicureo, Colina',          m2:2002,   colab:'Grupo Aira',              cliente:'Ignacio Santa María y Francisca Gonz.', mat:'Madera', com:'Privado',   prog:'Vivienda',              geo:'Chile', tip:'Forma curva' },
  { slug:'casa-taller-cubo',        nombre:'Casa Taller Cubo',        anio:1999, lugar:'Pucón, Chile',              m2:140,    colab:'Grupo Aira',              cliente:'Alfredo Echazarreta',       mat:'Madera',          com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Volúmenes' },
  { slug:'casa-del-silencio',       nombre:'Casa del silencio',       anio:1999, lugar:'Pucón, Chile',              m2:260,    colab:'Grupo Aira',              cliente:'Federico Assler / Francisca Délano', mat:'Madera', com:'Privado',   prog:'Vivienda',              geo:'Chile', tip:'Forma pura' },
  { slug:'casa-do',                 nombre:'Casa Do',                 anio:2000, lugar:'Los Vilos, Chile',          m2:275,    colab:'Grupo Aira',              cliente:'Juan Forch / Francisca Vial', mat:'Hormigón armado', com:'Privado',  prog:'Vivienda',              geo:'Chile', tip:'Forma pura' },
  { slug:'casa-cascara',            nombre:'Casa Cáscara',            anio:2002, lugar:'Pucón, Chile',              m2:91,     colab:'—',                       cliente:'Inmobiliaria Bosques de Pucón', mat:'Madera',      com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Forma curva' },
  { slug:'casa-tea',                nombre:'Casa TÉA',                anio:2002, lugar:'Pucón, Chile',              m2:107,    colab:'Grupo Aira',              cliente:'Inmobiliaria Bosques de Pucón', mat:'Madera',      com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Forma pura' },
  { slug:'casa-haiku',              nombre:'Casa Haiku',              anio:2002, lugar:'Quillota, Chile',           m2:903,    colab:'Grupo Aira',              cliente:'José Luis Gómez',           mat:'Hormigón armado', com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Forma curva' },
  { slug:'capilla-espiritu-santo',  nombre:'Capilla del Espíritu Santo', anio:2003, lugar:'Puente Alto, Santiago',  m2:903,    colab:'Grupo Aira',              cliente:'Comunidad San Jerónimo',    mat:'Hormigón armado', com:'Comunidad',  prog:'Institucional',         geo:'Chile', tip:'Volúmenes' },
  { slug:'casa-granero',            nombre:'Casa Granero',            anio:2004, lugar:'Pucón, Chile',              m2:116,    colab:'Grupo Aira',              cliente:'Virginia Valdés',           mat:'Madera',          com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Forma pura' },
  { slug:'casa-petra',              nombre:'Casa Petra',              anio:2005, lugar:'Lo Curro, Chile',           m2:354,    colab:'Grupo Aira',              cliente:'Roberto Lastrico / M. Eugenia Parot', mat:'Hormigón armado', com:'Privado', prog:'Vivienda',          geo:'Chile', tip:'Forma pura' },
  { slug:'casa-carpa',              nombre:'Casa Carpa',              anio:2007, lugar:'Palguín, Chile',            m2:130,    colab:'Grupo Aira',              cliente:'Jorge Steiner / Ethel Goldbaun', mat:'Madera',     com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Forma curva' },
  { slug:'casa-t',                  nombre:'Casa T',                  anio:2009, lugar:'Laguna Aculeo, Chile',      m2:245,    colab:'Grupo Aira',              cliente:'Estruder SA',               mat:'Madera',          com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Volúmenes' },
  { slug:'casa-soplo',              nombre:'Casa Soplo',              anio:2011, lugar:'Santiago, Chile',           m2:280,    colab:'Grupo Aira',              cliente:'Inmobiliaria Casa Aira',    mat:'Hormigón armado', com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Forma curva' },
  { slug:'hotel-tierra-patagonia',  nombre:'Hotel Tierra Patagonia',  anio:2012, lugar:'Torres del Paine, Chile',   m2:4900,   colab:'Grupo Aira',              cliente:'Katari S.A.',               mat:'Madera',          com:'Privado',    prog:'Hotel',                 geo:'Chile', tip:'Forma curva' },
  { slug:'casa-esmeralda',          nombre:'Casa Esmeralda',          anio:2014, lugar:'Lo Barnechea, Chile',       m2:528.33, colab:'Gabriel Rudolphy / Ian Hsü / Yolanda M.', cliente:'Inversiones Cegede', mat:'Madera',     com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Forma pura' },
  { slug:'hotel-magnolia',          nombre:'Hotel Magnolia',          anio:2015, lugar:'Santiago, Chile',           m2:3075,   colab:'Gabriel Rudolphy / Ian Hsü', cliente:'Inversiones Villanueva', mat:'Acero + vidrio',  com:'Privado',    prog:'Hotel',                 geo:'Chile', tip:'Forma pura' },
  { slug:'oficinas-felices',        nombre:'Oficinas Felices',        anio:2017, lugar:'Vitacura, Santiago',        m2:199.25, colab:'Francisca Pereira, Isabella Massa, …', cliente:'Lembeye Abogados', mat:'Acero + vidrio',  com:'Privado',    prog:'Institucional',         geo:'Chile', tip:'Forma curva' },
  { slug:'casa-k',                  nombre:'Casa K',                  anio:2017, lugar:'Santiago, Chile',           m2:365,    colab:'Hsu Rudolphy',            cliente:'Ifie Ulloa Urrutia',        mat:'Hormigón armado', com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Forma pura' },
  { slug:'casa-llu',                nombre:'Casa Llu',                anio:2018, lugar:'Fundo Carrán, Chile',       m2:4900,   colab:'Hsü-Rudolphy',            cliente:'Victoria García Domínguez', mat:'Madera',          com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Forma pura' },
  { slug:'casa-ye',                 nombre:'Casa Ye',                 anio:2018, lugar:'Valdivia, Chile',           m2:344.07, colab:'Hsü – Rudolphy',          cliente:'José Manuel Godoy',         mat:'Hormigón armado', com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Forma pura' },
  { slug:'tiny-house',              nombre:'Tiny House',              anio:2022, lugar:'Santiago, Chile',           m2:69.02,  colab:'Francisca Pereira, Francesca Fazzalari', cliente:'RCM Constructora', mat:'Madera',     com:'Privado',    prog:'Vivienda',              geo:'Chile', tip:'Volúmenes' },
  { slug:'jardin-cruz-roja',        nombre:'Jardín Memorial Cruz Roja', anio:2023, lugar:'Ginebra, Suiza',          m2:200,    colab:'Francesca Fazzalari, Sophia Ste…', cliente:'Comité Internacional de la Cruz Roja', mat:'Hormigón armado', com:'Concurso', prog:'Institucional', geo:'Suiza', tip:'Forma curva' },
];

// Dimensiones de filtro (cada una calcula su valor a partir de la obra)
const DIMS = [
  { id:'mat',  label:'Materialidad', get:w=>w.mat },
  { id:'com',  label:'Comitente',    get:w=>w.com },
  { id:'prog', label:'Programa',     get:w=>w.prog },
  { id:'tip',  label:'Tipología',    get:w=>w.tip },
  { id:'geo',  label:'Geografía',    get:w=>w.geo },
  { id:'esc',  label:'Escala',       get:w=> w.m2<=250 ? 'Hasta 250 m²' : (w.m2<=1500 ? '250 – 1.500 m²' : 'Más de 1.500 m²') },
  { id:'dec',  label:'Década',       get:w=> w.anio<2000 ? '1990s' : (w.anio<2010 ? '2000s' : (w.anio<2020 ? '2010s' : '2020s')) },
  { id:'aira', label:'Constructora / colaborador', get:w=> /aira/i.test(w.colab) ? 'Grupo Aira' : (/larra/i.test(w.colab) ? 'Rafael Larraín' : 'Otros') },
];

// Las 11 clases teóricas (de la lámina del TP)
const CLASES = [
  { n:1,  t:'Presentación',        s:'Introducción a la materia', uso:false },
  { n:2,  t:'Arquitectura: ¿qué es?', s:'Teoría · sentido · poder', uso:true, nota:'«Poder colonial = destruye o deforma tejidos culturales existentes».' },
  { n:3,  t:'El canon',            s:'Arq. nave · hegemonía · dominación', uso:true, nota:'Qué entra en el canon y qué queda afuera: el salón de los validados.' },
  { n:4,  t:'Cultura: ¿qué es?',   s:'Campo de saberes · la arquitectura como disciplina', uso:true, nota:'La disciplina como campo: de ahí la genealogía disciplinar.' },
  { n:5,  t:'Cultura dominante',   s:'Metaproyecto · industria cultural', uso:true, nota:'Cómo circulan y se validan los relatos.' },
  { n:6,  t:'Cultura proyectual',  s:'¿De dónde vienen las cosas?', uso:true, nota:'La genealogía: de dónde viene lo que Cazú hace.' },
  { n:7,  t:'¿Qué es la posmodernidad?', s:'La «plancha» superficial', uso:true, nota:'Jameson: el posmodernismo como dominante cultural, no como estilo.' },
  { n:8,  t:'El productor',        s:'¿Soy libre cuando proyecto?', uso:true, nota:'Quién encarga, quién financia, quién valida: el triángulo.' },
  { n:9,  t:'Habitar: matar al ser', s:'Arquitectura · sujeto', uso:true, nota:'«Habitar el paisaje»: ¿para quién?' },
  { n:10, t:'Productor',           s:'Arquitectura artefacto · plus de sentido', uso:true, nota:'Gehry en Panamá vs. Libeskind en Berlín.' },
  { n:11, t:'Inteligencia Artificial', s:'¿Viene a reemplazar? ¿Nueva revolución?', uso:false },
];

// Biografía (de las láminas «Biografía» y «Genealogía»)
const BIO = [
  { y:'1958', t:'Nace en Santiago', d:'María del Carmen «Cazú» Zegers García. Se educa en colegios de élite (Villa María Academy). Algunas fuentes ubican el nacimiento en Quilicura.', tag:'extra' },
  { y:'1977+', t:'Viajes de conocimiento', d:'Desde 1977 viaja por Ecuador, Perú, Panamá, Guatemala, Tierra del Fuego y el altiplano; más tarde por Estados Unidos, Europa, India, Nepal y China.', tag:'extra' },
  { y:'1978', t:'Entra a la e[ad] de la PUCV', d:'En Valparaíso, Godofredo Iommi la convence de ser arquitecta y le abre el mundo de Amereida: pensar el territorio americano desde la poesía. Su genealogía suma a Alberto Cruz, Miguel Eyquem y Manuel Casanueva.', tag:'disc' },
  { y:'años 80', t:'Recorre Chile en moto', d:'Durante la carrera hace un viaje en motocicleta por Chile (la Patagonia chilena) junto a su pareja de entonces. Descubre el territorio de manera directa.', tag:'extra' },
  { y:'1984', t:'Se titula', d:'Cierra su formación en Valparaíso (1978–1984).', tag:'disc' },
  { y:'1987–88', t:'Nueva York', d:'Trabaja y estudia en The Parsons School of Design.', tag:'disc' },
  { y:'1990–91', t:'Abre su estudio en Santiago', d:'La fecha varía según la fuente: 1990 en su web y entrevistas, 1991 en otras. Es el comienzo de nuestra cronología.', tag:'disc' },
  { y:'1991–93', t:'Casa Cala · «casa tesis»', d:'Cliente: José Manuel Morales. Está en Lago Ranco (Los Ríos), sobre 20 hectáreas. Es su primer proyecto con la metodología Gesto–Figura–Forma, que su web atribuye a ella misma. En 1993 gana el primer Gran Premio Latinoamericano de Arquitectura (Bienal de Buenos Aires).', tag:'obra' },
  { y:'1996', t:'Kawelluco, con Rafael Larraín', d:'Con el arquitecto Rafael Larraín, entonces su esposo, desarrolla Kawelluco (Pucón): una «ruralización» sobre una antigua explotación forestal, con 600 ha de reserva y 396 ha en sitios de al menos una hectárea. Allí construye varias casas, entre ellas para la Inmobiliaria Bosques de Pucón.', tag:'obra' },
  { y:'1997', t:'Primera obra con Grupo Aira', d:'En Open Office (Vitacura) aparece Grupo Aira. La constructora la acompaña luego en La Cascada, Casa Do, Haiku y el Hotel Tierra Patagonia.', tag:'obra' },
  { y:'2005', t:'Observatorio Lastarria', d:'Con Miguel Laborde crea el Observatorio y el Centro de Estudios Geopoéticos de Chile: geopoética, patrimonio y territorio cultural.', tag:'extra' },
  { y:'2011–12', t:'Hotel Tierra Patagonia', d:'Su obra más conocida: 4.900 m² sobre 70 hectáreas en Torres del Paine, para Katari S.A. (Tierra Hotels, de las familias Purcell y Matetic). Sus premios hoteleros se acumulan entre 2012 y 2018.', tag:'obra' },
  { y:'2014', t:'Fundación +1000', d:'Refunda el Observatorio como Fundación +1000, tras una charla en París ante el Instituto Internacional de Geopoética (Kenneth White).', tag:'extra' },
  { y:'2017', t:'Andes Workshop con Grupo Talca', d:'Plataforma de trabajo con comunidades y estudiantes. En 2017, en Lonquimay, diseña el Mirador de la Corona con la comunidad mapuche de Arenales, activador de la Ruta Pehuenche.', tag:'extra' },
  { y:'2022', t:'Guía de etnoingeniería (BID)', d:'Un equipo que lidera actualiza, por encargo del Banco Interamericano de Desarrollo, una guía de hace 18 años sobre desarrollo sostenible de pueblos indígenas en América Latina y el Caribe.', tag:'extra' },
  { y:'2023', t:'Memorial de la Cruz Roja, Ginebra', d:'Gana el concurso internacional cerrado para el nuevo memorial.', tag:'obra' },
  { y:'Hoy', t:'Estudio, docencia y fundación', d:'Estudio propio en Santiago. Enseñó en la Universidad de Talca, la Universidad Católica y la Universidad del Desarrollo, y fue profesora visitante en Yale (2020). Publicó Carpinterías y Prototipos en el territorio (2008). Dirige la Fundación +1000.', tag:'extra' },
];

// Paradas del recorrido de la genealogía (coords normalizadas sobre la lámina: x0,y0,x1,y1)
const GENEALOGIA = [
  { t:'Cazú en el centro', r:[0.50,0.30,0.67,0.72], d:'Todo sale de una persona y se abre en dos mitades: el campo disciplinar (la arquitectura) a la izquierda y el campo extra-disciplinar a la derecha.' },
  { t:'Campo disciplinar · Valparaíso', r:[0.08,0.08,0.52,0.46], d:'Cruz Covarrubias (arquitectura poética, observación fenomenológica), Eyquem (territorio, viento), Casanueva (diseño territorial, construcción experimental), la PUCV (1978–84) y Ciudad Abierta de Ritoque.' },
  { t:'Campo extra-disciplinar · Amereida', r:[0.65,0.04,1.0,0.46], d:'Godofredo Iommi, poeta, fundador de Amereida (1956): América tiene identidad propia, el territorio es cultura. La poesía como acto fundacional.' },
  { t:'Relatos → Geopoética → Método', r:[0.78,0.43,1.0,0.88], d:'Poesía, territorio, observación y viaje se funden en la «geopoética», que decanta en el método proyectual: Gesto (emoción del paisaje) + Figura (croquis-idea) + Forma (arquitectura construida).' },
  { t:'Viaje: moto, ruta austral, vernáculo', r:[0.42,0.64,0.85,1.0], d:'La travesía en moto (1980–82) y la arquitectura vernácula chilena: materialidad local, escala humana, integración al paisaje, sabiduría constructiva.' },
  { t:'Quienes construyen: Larraín, Aira, Talca', r:[0.0,0.28,0.40,0.80], d:'Rafael Larraín (arquitecto, entonces su esposo; Kawelluco desde 1996), Grupo Aira (constructora, desde Open Office en 1997) y su docencia en la Universidad de Talca y en Andes Workshop.' },
  { t:'Gaudí y Nueva York', r:[0.0,0.83,0.45,1.0], d:'Gaudí (forma orgánica, geometrías fluidas) y Nueva York: Parsons (1987–88). La lámina también registra a Delgado & Gillbride, sin fuente.' },
];

// Videos de las teóricas del ciclo anterior (YouTube). Numeración del ciclo anterior.
const VIDEOS = {"1":[{"id":"XYFfv_Yiviw","t":"V1"}],"2":[{"id":"2sls3N8UQdw","t":"V1 Crítica y Disciplina"},{"id":"XZEq_DMfBTc","t":"V2 Crítica y Profesión"}],"3":[{"id":"uGGqdyZ8TZ8","t":"V1"},{"id":"0Y3s5NfqKEk","t":"V2"}],"4":[{"id":"iHvMZjDbG8o","t":"V1"},{"id":"eNuEhcabELc","t":"V2"},{"id":"LXXQNJy69WA","t":"V3"}],"5":[{"id":"t4e970bXSZI","t":"V1"},{"id":"VnHrpEH3hLE","t":"V2"},{"id":"Wckrx1DqIQ4","t":"V3"},{"id":"sLyNsN-VGBw","t":"V4"}],"6":[{"id":"7Q5YIDuy-Pk","t":"V1 AUTOANALISIS Preceptiva y Teoría"},{"id":"mut8CwTi2NA","t":"V2"}],"7":[{"id":"mfn_Fk6nllU","t":"V1 Cultura proyectual y cultura dominante"},{"id":"CbWa-qAkmnE","t":"V2 Proyecto y cultura global dominante"},{"id":"ssFuLoAE4yw","t":"V3 Proyecto y cultura global dominante"},{"id":"TxkX8-O6DDs","t":"V4 Proyecto y cultura global dominante"},{"id":"qEZ8Vezbh_g","t":"V5 Proyecto y preceptiva global larvada"}],"8":[{"id":"CrBQE_MBQxQ","t":"V1 ANTICIPACIONES P PRITZKER Cultura Dominante y Preceptiva"},{"id":"KzByMlUOr3I","t":"V2 ANTICIPACIONES P PRITZKER Cultura Dominante y Preceptiva"},{"id":"NJzfaieCdgA","t":"V3 ANTICIPACIONES P PRITZKER Cultura Dominante y Metaproyecto"}],"10":[{"id":"J0uPOYRLi68","t":"V1 Introducción Disciplina y Habitar"},{"id":"NAl0BV1hHIg","t":"V2 Cultura proyectual Dominante VS Habitar"}],"11":[{"id":"mAAXsmXPXVg","t":"V1 ESTETICAS DEL HABITAR, DISCIPLINA Y PODER"},{"id":"BWsNrlqWciE","t":"V2 ESTETICAS DEL HABITAR, DISCIPLINA Y PODER"}],"12":[{"id":"yZbcuES5Tj8","t":"F.Gehry en Panamá: Máquina financiera y hambre."}]};
