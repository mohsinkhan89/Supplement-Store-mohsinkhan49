const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const track=document.querySelector('.review-track');
const cards=[...track.children];let slide=0;
function visibleCards(){return innerWidth<=600?1:innerWidth<=1000?2:3}
function showSlide(){const visible=visibleCards();slide=Math.max(0,Math.min(slide,cards.length-visible));track.style.transform=`translateX(-${slide*(100/visible)}%)`}
document.querySelectorAll('.slider-controls button').forEach(btn=>btn.addEventListener('click',()=>{slide+=Number(btn.dataset.dir);showSlide()}));
addEventListener('resize',showSlide);

document.querySelectorAll('.plans button').forEach(button=>button.addEventListener('click',()=>{const old=button.textContent;button.textContent='Added to Cart ✓';button.classList.add('added');setTimeout(()=>{button.textContent=old;button.classList.remove('added')},1800)}));
document.getElementById('year').textContent=new Date().getFullYear();
