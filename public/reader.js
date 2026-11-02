'use strict';
(async()=>{
 try {
  const r=await fetch('episodes.json');if(!r.ok)return;
  const {episodes}=await r.json();const published=episodes.filter(e=>e.status==='published'&&e.approved===true);
  const id=new URLSearchParams(location.search).get('episode');const e=published.find(e=>e.id===id);if(!e)return;
  const root=document.getElementById('reader');root.replaceChildren();document.title=`${e.title} — KRATU HERO`;
  const head=document.createElement('div');head.className='reader-heading';const h=document.createElement('h1');h.textContent=e.title;head.append(h);root.append(head);
  for(const [i,panel] of e.panels.entries()){const img=document.createElement('img');img.src=panel.src;img.alt=panel.alt;img.width=panel.width||1080;img.height=panel.height||1350;img.loading=i<2?'eager':'lazy';root.append(img);}
  if(e.transcript){const d=document.createElement('details');d.style.padding='25px';const s=document.createElement('summary');s.textContent='Read episode transcript';const p=document.createElement('p');p.textContent=e.transcript;d.append(s,p);root.append(d);}
  const end=document.createElement('nav');end.className='reader-end';end.setAttribute('aria-label','Episode navigation');const n=published.indexOf(e);
  for(const [label,item] of [['← PREVIOUS',published[n-1]],['NEXT →',published[n+1]]]){if(item){const a=document.createElement('a');a.href=`read.html?episode=${encodeURIComponent(item.id)}`;a.textContent=label;end.append(a);}}root.append(end);
  window.addEventListener('scroll',()=>{const total=document.documentElement.scrollHeight-innerHeight;const v=total>0?Math.min(100,Math.round(scrollY/total*100)):100;document.getElementById('progress').value=v;try{localStorage.setItem('kratu-reading',JSON.stringify({id:e.id,progress:v}));}catch{}},{passive:true});
 }catch{/* No false episode or completion state when manifest is unavailable. */}
})();
