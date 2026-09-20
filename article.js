const article=document.querySelector('.article');
const toc=document.querySelector('.toc');
const heads=[...article.querySelectorAll('h2,h3')];
const links=[...toc.querySelectorAll('a')];
const core=document.getElementById('架构特点');
if(core){let n=core.nextElementSibling,i=0;while(n&&n.tagName!=='H2'){if(n.tagName==='OL'){n.classList.add('insight-list');for(const item of n.children){item.dataset.index=String(++i)+'.';}}n=n.nextElementSibling;}}
const progress=document.querySelector('.progress');
const topBtn=document.querySelector('.backtop');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const contents=document.querySelector('.contents');
const narrow=matchMedia('(max-width: 900px)');
const updateLayout=()=>{contents.open=!narrow.matches;};
updateLayout();narrow.addEventListener('change',updateLayout);
let scheduled=false;
function update(){scheduled=false;const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?scrollY/max*100:0)+'%';topBtn.classList.toggle('show',scrollY>700);let active=heads[0];for(const h of heads){if(h.getBoundingClientRect().top<=140)active=h;else break;}for(const a of links){const selected=decodeURIComponent(a.hash.slice(1))===active?.id;a.classList.toggle('active',selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});addEventListener('resize',update);update();
topBtn.onclick=()=>scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});

