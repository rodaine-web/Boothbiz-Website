'use strict';
document.getElementById('year').textContent=new Date().getFullYear();
const menu=document.querySelector('.menu'),nav=document.getElementById('nav');
function setMenu(open){nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');}
menu.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){setMenu(false);menu.focus();}});
matchMedia('(min-width:701px)').addEventListener('change',e=>{if(e.matches)setMenu(false);});
const screens=[['overview','Dashboard','Your day, clearly in view.','Keep leads, bookings and the next event in focus.'],['analytics','Reports','See the bigger picture.','Explore revenue, booking activity and business performance.'],['leads','Leads','Start every conversation well.','Keep inquiries and follow-ups together.'],['proposals','Proposals','Turn interest into a booking.','Bring your offer, packages and next steps into one place.'],['campaigns','Campaigns','Keep the conversation going.','Plan thoughtful outreach and reusable communication.'],['calendar','Calendar','Make room for what’s next.','See consultations and events in one schedule.'],['events','Events','Bring every detail together.','Organize planning, people, equipment and event readiness.'],['gallery','Gallery','Deliver the final delight.','Give event memories a beautiful home.']];
let screen=0;const tabs=[...document.querySelectorAll('[data-screen]')];
function showScreen(i){screen=(i+screens.length)%screens.length;const [key,name,title,copy]=screens[screen];document.getElementById('tour-title').textContent=title;document.getElementById('tour-copy').textContent=copy;const img=document.getElementById('tour-image');img.src=`assets/preview-${key}.png`;img.alt=`Illustrative BoothBiz ${name} product screen`;document.getElementById('tour-count').textContent=`${String(screen+1).padStart(2,'0')} / 08`;document.getElementById('demo-panel').setAttribute('aria-labelledby',`tab-${key}`);tabs.forEach((b,n)=>{b.setAttribute('aria-selected',String(n===screen));b.tabIndex=n===screen?0:-1;});if(viewer.open)updateViewer();}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>showScreen(i));tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?7:(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+8)%8;showScreen(next);tabs[next].focus();});});
document.getElementById('previous').addEventListener('click',()=>showScreen(screen-1));document.getElementById('next').addEventListener('click',()=>showScreen(screen+1));

// Closed-registration preview: navigation never validates or submits answers.
const form=document.getElementById('waitlist-form'),steps=[...form.querySelectorAll('.step')],back=document.getElementById('back'),next=document.getElementById('continue'),submit=document.getElementById('submit'),stepButtons=[...document.querySelectorAll('[data-preview-step]')];let step=0;
submit.disabled=true;
function showStep(i,focus=true){
 step=Math.max(0,Math.min(steps.length-1,i));steps.forEach((s,n)=>s.hidden=n!==step);back.hidden=step===0;next.hidden=step===steps.length-1;submit.hidden=step!==steps.length-1;submit.disabled=true;
 document.getElementById('step-label').textContent=`0${step+1} / 04`;document.getElementById('step-name').textContent=['Your business','Your equipment','Your workflow','Looking ahead'][step];document.querySelector('.progress span').style.width=`${(step+1)*25}%`;
 stepButtons.forEach((button,n)=>{if(n===step)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
 if(focus){const legend=steps[step].querySelector('legend');legend.tabIndex=-1;legend.focus({preventScroll:true});form.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});}
}
next.addEventListener('click',()=>showStep(step+1));back.addEventListener('click',()=>showStep(step-1));stepButtons.forEach(button=>button.addEventListener('click',()=>showStep(Number(button.dataset.previewStep))));
for(const name of ['equipment','software','crm']){
 const boxes=[...form.querySelectorAll(`input[name="${name}"]`)];
 boxes.forEach(input=>input.addEventListener('change',()=>{
  if(['software','crm'].includes(name)){const none=name==='software'?'None yet / still exploring':'None yet';if(input.checked&&input.value===none)boxes.forEach(other=>{if(other!==input)other.checked=false;});else if(input.checked)boxes.forEach(other=>{if(other.value===none)other.checked=false;});}
  const otherWrap=document.getElementById(`${name}-other-wrap`),selected=boxes.some(el=>el.value==='Other'&&el.checked);otherWrap.hidden=!selected;otherWrap.querySelector('input').disabled=true;otherWrap.querySelector('input').required=false;
  boxes.forEach(checkbox=>{const quantity=form.querySelector(`[data-for="${checkbox.id}"]`);if(quantity){quantity.hidden=!checkbox.checked;quantity.querySelector('input').disabled=!checkbox.checked;}});
 }));
 form.querySelector(`[name="${name}_other"]`).disabled=true;
}
form.querySelectorAll('.quantity input').forEach(input=>input.disabled=true);
form.querySelector('select[name="country"]').addEventListener('change',e=>{form.elements.currency.value=e.target.value==='CA'?'CAD':'USD';});
form.addEventListener('submit',e=>{e.preventDefault();if(step<steps.length-1)showStep(step+1);});

// Native modal keeps keyboard focus inside the viewer and supports Escape.
const viewer=document.getElementById('screenshot-viewer'),viewerImage=document.getElementById('viewer-image'),viewerArea=document.querySelector('.viewer-image-area'),fitButton=document.getElementById('viewer-fit'),enlargeButton=document.getElementById('enlarge-screen');let previousOverflow='';
function updateViewer(){const [key,name]=screens[screen];viewerImage.src=`assets/preview-${key}.png`;viewerImage.alt=`Enlarged illustrative BoothBiz ${name} screen with sample data`;document.getElementById('viewer-title').textContent=`${name} preview`;document.getElementById('viewer-count').textContent=`${String(screen+1).padStart(2,'0')} / 08`;viewerArea.scrollLeft=0;viewerArea.scrollTop=0;}
enlargeButton.addEventListener('click',()=>{updateViewer();previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';viewer.showModal();});
document.getElementById('close-viewer').addEventListener('click',()=>viewer.close());
viewer.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;enlargeButton.focus({preventScroll:true});});
viewer.addEventListener('click',e=>{if(e.target===viewer){const rect=viewer.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)viewer.close();}});
document.getElementById('viewer-previous').addEventListener('click',()=>showScreen(screen-1));document.getElementById('viewer-next').addEventListener('click',()=>showScreen(screen+1));
fitButton.addEventListener('click',()=>{const fit=viewerArea.classList.toggle('fit');fitButton.setAttribute('aria-pressed',String(fit));fitButton.textContent=fit?'View full size':'Fit to screen';});
