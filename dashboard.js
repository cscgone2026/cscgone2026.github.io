(() => {
 const $=id=>document.getElementById(id);
 const toast=(s)=>{const t=$("toast");if(!t)return;t.textContent=s;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3000);};
 const valid=window.supabase && window.CSC_GONE_SUPABASE_URL && window.CSC_GONE_SUPABASE_ANON_KEY && !window.CSC_GONE_SUPABASE_URL.includes("PASTE_") && !window.CSC_GONE_SUPABASE_ANON_KEY.includes("PASTE_");
 let client=valid?window.supabase.createClient(window.CSC_GONE_SUPABASE_URL,window.CSC_GONE_SUPABASE_ANON_KEY):null;
 if(client) client.auth.getUser().then(({data,error})=>{if(error||!data.user){location.href="index.html";return;}const u=data.user;$('userName').textContent=u.user_metadata?.full_name||"CSC GONE User";$('userEmail').textContent=u.email||"";}).catch(()=>{location.href="index.html";});
 else { $('userName').textContent="CSC GONE"; $('userEmail').textContent="Configuration needed"; }
 $('todayDate').textContent=new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});
 $('logoutBtn').addEventListener('click',async()=>{if(client) await client.auth.signOut();location.href='index.html';});
 const themeBtn=$('themeBtn'); if(themeBtn) themeBtn.addEventListener('click',()=>document.body.classList.toggle('light-mode'));
 $('menuBtn').addEventListener('click',()=> $('sidebar').classList.toggle('open'));
 $('searchBtn').addEventListener('click',()=>{ $('serviceSearch').focus(); $('serviceSearch').scrollIntoView({behavior:'smooth',block:'center'});});
 const official={
  sevasindhu:'https://sevasindhu.karnataka.gov.in/',
  ahara:'https://ahara.karnataka.gov.in/',
  voter:'https://voters.eci.gov.in/',
  aadhaar:'https://myaadhaar.uidai.gov.in/',
  certificate:'https://nadakacheri.karnataka.gov.in/'
 };
 const menus={
  'Government Services':{desc:'Karnataka government scheme assistance',items:[
   {name:'GRUHALAXMI SCHEME',detail:'Scheme information, application and status assistance.',url:official.sevasindhu,portal:'Open Seva Sindhu'},
   {name:'YUVANIDHI SERVICE',detail:'Yuva Nidhi scheme assistance through Karnataka services.',url:official.sevasindhu,portal:'Open Seva Sindhu'}]},
  'Print Services':{desc:'Choose the document you need help printing.',items:[
   {name:'RATION CARD PRINT',detail:'Bring your ration card details or downloaded document.',url:official.ahara,portal:'Open Ahara portal'},
   {name:'VOTER ID PRINT',detail:'Use the official voter portal to access eligible voter documents.',url:official.voter,portal:'Open Voter Services'},
   {name:'AADHAAR CARD PRINT',detail:'Use UIDAI’s official portal to access/download eligible Aadhaar documents.',url:official.aadhaar,portal:'Open UIDAI portal'},
   {name:'CASTE INCOME CERTIFICATE',detail:'Certificate application/status and print assistance.',url:official.certificate,portal:'Open Nadakacheri'}]},
  'Ration Card Services':{desc:'Karnataka ration card options',items:[
   {name:'RATION CARD STATUS',detail:'Check available ration card status information.',url:official.ahara,portal:'Open Ahara portal'},
   {name:'NEW RATION CARD APPLY',detail:'Check current application availability and requirements.',url:official.ahara,portal:'Open Ahara portal'},
   {name:'RATION CARD CORRECTION',detail:'Get guidance for eligible correction requests.',url:official.ahara,portal:'Open Ahara portal'},
   {name:'RATION CARD DETAILS',detail:'View ration card and food department information.',url:official.ahara,portal:'Open Ahara portal'}]},
  'Voter Services':{desc:'Election Commission of India services',items:[{name:'VOTER SERVICES PORTAL',detail:'Registration, corrections and voter services.',url:official.voter,portal:'Open official portal'},{name:'VOTER ID PRINT',detail:'Request print assistance at CSC GONE.',request:true}]},
  'Aadhaar Services':{desc:'UIDAI official services',items:[{name:'AADHAAR OFFICIAL PORTAL',detail:'Access UIDAI services and eligible document downloads.',url:official.aadhaar,portal:'Open UIDAI portal'},{name:'AADHAAR CARD PRINT',detail:'Request print assistance at CSC GONE.',request:true}]},
  'Certificates':{desc:'Certificate service assistance',items:[{name:'CASTE CERTIFICATE',detail:'Certificate application and status assistance.',url:official.certificate,portal:'Open Nadakacheri'},{name:'INCOME CERTIFICATE',detail:'Certificate application and status assistance.',url:official.certificate,portal:'Open Nadakacheri'}]}
 };
 const modal=$('serviceModal'), options=$('modalOptions');
 function requestUrl(name){return 'https://wa.me/917338236209?text='+encodeURIComponent('Hello CSC GONE, I need assistance with: '+name);}
 function openMenu(name){const data=menus[name];if(!data){toast(name+' options are being prepared.');return;} $('modalTitle').textContent=name;$('modalDescription').textContent=data.desc;options.replaceChildren();data.items.forEach(item=>{const card=document.createElement('article');card.className='modal-option';const title=document.createElement('h3');title.textContent=item.name;const desc=document.createElement('p');desc.textContent=item.detail;card.append(title,desc);const actions=document.createElement('div');actions.className='modal-option-actions';if(item.url){const a=document.createElement('a');a.className='option-btn option-primary';a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=item.portal||'Open official portal';actions.append(a);}const wa=document.createElement('a');wa.className='option-btn option-secondary';wa.href=requestUrl(item.name);wa.target='_blank';wa.rel='noopener noreferrer';wa.textContent='Request at CSC GONE ↗';actions.append(wa);card.append(actions);options.append(card);});modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');$('closeServiceModal').focus();}
 function closeMenu(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
 $('closeServiceModal').addEventListener('click',closeMenu);modal.querySelector('[data-close-modal]').addEventListener('click',closeMenu);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
 let count=0;
 document.querySelectorAll('.service-card').forEach(card=>card.addEventListener('click',()=>{count++;$('requestCount').textContent=count;openMenu(card.dataset.service);}));
 $('serviceSearch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('.service-card').forEach(card=>card.hidden=!card.textContent.toLowerCase().includes(q));});
 document.querySelectorAll('.nav-item').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));a.classList.add('active');const section=a.dataset.section;if(section==='dashboard'){window.scrollTo({top:0,behavior:'smooth'});return;}if(section==='profile'){toast('Your account details are shown in the top bar.');return;}const names={government:'Government Services',printing:'Print Services',digital:'Ration Card Services',tools:'Certificates'};const target=names[section];if(target){openMenu(target);}else{const messages={wallet:'Wallet features are not connected yet.',transactions:'Transaction history requires payment integration.',history:'Service history will be available after requests are stored.'};toast(messages[section]||'This section is ready for future integration.');}}));
})();
