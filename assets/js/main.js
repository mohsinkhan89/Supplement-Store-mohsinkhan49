const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const reviews=document.querySelector('.reviews');
const track=document.querySelector('.review-track');
const cards=[...track.children];
const sliderButtons=[...document.querySelectorAll('.slider-controls button')];
let slide=0;
let sliderTimer;
function visibleCards(){return innerWidth<=600?1:innerWidth<=1000?2:3}
function maxSlide(){return Math.max(0,cards.length-visibleCards())}
function showSlide(next=slide){
  slide=next>maxSlide()?0:next<0?maxSlide():next;
  track.style.transform=`translateX(-${slide*(100/visibleCards())}%)`;
  cards.forEach((card,index)=>card.setAttribute('aria-hidden',index<slide||index>=slide+visibleCards()));
}
function startSlider(){clearInterval(sliderTimer);sliderTimer=setInterval(()=>showSlide(slide+1),4200)}
function stopSlider(){clearInterval(sliderTimer)}
sliderButtons.forEach(btn=>btn.addEventListener('click',()=>{showSlide(slide+Number(btn.dataset.dir));startSlider()}));
reviews.addEventListener('mouseenter',stopSlider);
reviews.addEventListener('mouseleave',startSlider);
reviews.addEventListener('focusin',stopSlider);
reviews.addEventListener('focusout',startSlider);
reviews.setAttribute('tabindex','0');
reviews.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')showSlide(slide-1);if(event.key==='ArrowRight')showSlide(slide+1)});
addEventListener('resize',()=>showSlide(Math.min(slide,maxSlide())));
showSlide();
startSlider();

document.querySelectorAll('.plans button').forEach(button=>button.addEventListener('click',()=>{const old=button.textContent;button.textContent='Added to Cart ✓';button.classList.add('added');setTimeout(()=>{button.textContent=old;button.classList.remove('added')},1800)}));
document.getElementById('year').textContent=new Date().getFullYear();
