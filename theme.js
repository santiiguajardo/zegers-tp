/* Tema claro / oscuro: botón arriba a la derecha y tecla T. Se recuerda en el navegador. */
(function(){
  const root=document.documentElement;
  const SUN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  let stored=null; try{ stored=localStorage.getItem('tyc_tema'); }catch(e){}
  const btn=document.createElement('button'); btn.id='themebtn'; btn.type='button'; document.body.appendChild(btn);
  function set(light,save){
    root.classList.toggle('light',light);
    btn.innerHTML=(light?MOON:SUN)+'<span>'+(light?'Tema oscuro':'Tema claro')+'</span>';
    btn.setAttribute('aria-label',light?'Cambiar a tema oscuro':'Cambiar a tema claro');
    if(save){ try{ localStorage.setItem('tyc_tema',light?'claro':'oscuro'); }catch(e){} }
  }
  set(stored==='claro',false);
  btn.onclick=()=>set(!root.classList.contains('light'),true);
  addEventListener('keydown',e=>{ if(e.ctrlKey||e.metaKey||e.altKey) return; if(e.key==='t'||e.key==='T'){ if(window.obraAbierta&&obraAbierta()) return; set(!root.classList.contains('light'),true); } });
})();

/* Botón de pantalla completa (junto al de tema). La tecla F ya hace lo mismo. */
(function(){
  const EXP='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg>';
  const CON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h5V3M21 8h-5V3M3 16h5v5M21 16h-5v5"/></svg>';
  const b=document.createElement('button'); b.id='fsbtn'; b.type='button'; document.body.appendChild(b);
  function paint(){ const on=!!document.fullscreenElement; b.innerHTML=(on?CON:EXP)+'<span>'+(on?'Salir':'Pantalla completa')+'</span>'; b.setAttribute('aria-label',on?'Salir de pantalla completa':'Pantalla completa'); }
  b.onclick=()=>{ document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{}); b.blur(); };
  document.addEventListener('fullscreenchange',paint); paint();
})();
