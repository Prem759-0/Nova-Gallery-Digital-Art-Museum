
// Gallery data
const artworks = [
  {title:'Golden Dissolution No.7',artist:'Maya Chen',cat:'abstract',ar:'3/4',c:'linear-gradient(135deg,#e8c87a,#c9883a,#8b4a15)',emoji:'🌅'},
  {title:'Fjord at Dawn',artist:'Jonas Olafsson',cat:'landscape',ar:'4/3',c:'linear-gradient(135deg,#b8d4e8,#6a9cbf,#2a5a80)',emoji:'🌊'},
  {title:'Portrait Study III',artist:'Fela Dubois',cat:'portrait',ar:'3/4',c:'linear-gradient(135deg,#d4a882,#a87050,#5a3020)',emoji:'👤'},
  {title:'Algorithm Garden #12',artist:'Riya Patel',cat:'digital',ar:'1/1',c:'linear-gradient(135deg,#80ff80,#20a820,#054005)',emoji:'🌿'},
  {title:'Volcanic Memory',artist:'Jonas Olafsson',cat:'landscape',ar:'16/9',c:'linear-gradient(135deg,#ff8844,#cc4422,#441100)',emoji:'🌋'},
  {title:'Data Dreams v.9',artist:'Riya Patel',cat:'digital',ar:'3/4',c:'linear-gradient(135deg,#88aaff,#4455cc,#110033)',emoji:'💙'},
  {title:'Amber Suspension',artist:'Maya Chen',cat:'abstract',ar:'1/1',c:'linear-gradient(135deg,#ffcc44,#cc8800,#664400)',emoji:'✨'},
  {title:'Accra Duality',artist:'Fela Dubois',cat:'portrait',ar:'3/4',c:'linear-gradient(135deg,#ffcc88,#cc8844,#884400)',emoji:'🎨'},
  {title:'Ice Sheet Survey',artist:'Jonas Olafsson',cat:'landscape',ar:'4/3',c:'linear-gradient(135deg,#e8f4ff,#88ccee,#2266aa)',emoji:'❄️'},
  {title:'Neural Bloom',artist:'Riya Patel',cat:'digital',ar:'1/1',c:'linear-gradient(135deg,#ff88cc,#cc2288,#440033)',emoji:'🌸'},
  {title:'Whisper Chroma',artist:'Maya Chen',cat:'abstract',ar:'3/4',c:'linear-gradient(135deg,#ccaaff,#6644cc,#220066)',emoji:'🔮'},
  {title:'Evening Study',artist:'Fela Dubois',cat:'portrait',ar:'4/3',c:'linear-gradient(135deg,#884422,#552211,#220800)',emoji:'🌙'},
];
 
let activeFilter='all';
function renderGallery(filter){
  const grid=document.getElementById('gallery-grid');
  const filtered=filter==='all'?artworks:artworks.filter(a=>a.cat===filter);
  grid.innerHTML=filtered.map((a,i)=>`
    <div class="art-item" onclick="openLB('${a.title}','${a.artist}','${a.c}')" data-cat="${a.cat}">
      <div class="art-placeholder" style="--ar:${a.ar};--c:${a.c};display:flex;align-items:center;justify-content:center;font-size:clamp(2rem,6vw,4rem)">${a.emoji}</div>
      <div class="art-overlay">
        <div class="art-info">
          <span class="art-year">${2018+i}</span>
          <div class="art-title">${a.title}</div>
          <div class="art-name">${a.artist}</div>
        </div>
      </div>
    </div>
  `).join('');
}
renderGallery('all');
 
function filterGallery(cat,btn){
  activeFilter=cat;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderGallery(cat);
}
 
// Lightbox
function openLB(title,artist,color){
  document.getElementById('lb-title').textContent=title;
  document.getElementById('lb-artist').textContent=artist;
  const lbc=document.getElementById('lightbox-content');
  lbc.style.background=color;
  document.getElementById('lightbox').classList.add('open');
}
function closeLB(){document.getElementById('lightbox').classList.remove('open')}
document.getElementById('lightbox').addEventListener('click',e=>{if(e.target===document.getElementById('lightbox'))closeLB()});
 
// Cursor
const cur=document.getElementById('cur'),ring=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
function ar(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(ar)}ar();
document.querySelectorAll('button,a,.art-item,.artist-card,.mem-tier,.event-item').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ring.style.width='48px';ring.style.height='48px';cur.style.background='var(--text)'});
  el.addEventListener('mouseleave',()=>{ring.style.width='32px';ring.style.height='32px';cur.style.background='var(--red)'});
});
 
// Reveal
const obs=new IntersectionObserver(e=>e.forEach(en=>{if(en.isIntersecting)en.target.classList.add('visible')}),{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
 
// Counters
const cObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const t=parseInt(e.target.dataset.count);let start=null;const step=ts=>{if(!start)start=ts;const p=Math.min((ts-start)/1500,1);e.target.textContent=Math.floor(p*t);if(p<1)requestAnimationFrame(step);else e.target.textContent=t;};requestAnimationFrame(step);cObs.unobserve(e.target)}})},{threshold:0.5});
document.querySelectorAll('[data-count]').forEach(el=>cObs.observe(el));
