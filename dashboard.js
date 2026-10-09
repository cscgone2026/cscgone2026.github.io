(() => {
 const $=id=>document.getElementById(id);
 const toast=(s)=>{const t=$("toast");t.textContent=s;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2800);};
 const valid=window.supabase && window.CSC_GONE_SUPABASE_URL && window.CSC_GONE_SUPABASE_ANON_KEY &&
   !window.CSC_GONE_SUPABASE_URL.includes("PASTE_") && !window.CSC_GONE_SUPABASE_ANON_KEY.includes("PASTE_");
 let client=valid?window.supabase.createClient(window.CSC_GONE_SUPABASE_URL,window.CSC_GONE_SUPABASE_ANON_KEY):null;
 if(client) client.auth.getUser().then(({data,error})=>{
   if(error || !data.user){location.href="index.html";return;}
   const u=data.user; $("userName").textContent=u.user_metadata?.full_name || "CSC GONE User"; $("userEmail").textContent=u.email || "";
 }).catch(()=>{location.href="index.html";});
 else { $("userName").textContent="CSC GONE"; $("userEmail").textContent="Configuration needed"; }
 $("todayDate").textContent=new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"});
 $("logoutBtn").addEventListener("click",async()=>{if(client) await client.auth.signOut();location.href="index.html";});
 $("themeBtn").addEventListener("click",()=>document.body.classList.toggle("light-mode"));
 $("menuBtn").addEventListener("click",()=> $("sidebar").classList.toggle("open"));
 $("searchBtn").addEventListener("click",()=>{ $("serviceSearch").focus(); $("serviceSearch").scrollIntoView({behavior:"smooth",block:"center"});});
 let count=0;
 document.querySelectorAll(".service-card").forEach(card=>card.addEventListener("click",()=>{
   count++; $("requestCount").textContent=count; toast(card.dataset.service+" selected. Service integration can be added next.");
 }));
 $("serviceSearch").addEventListener("input",e=>{
   const q=e.target.value.toLowerCase();
   document.querySelectorAll(".service-card").forEach(card=>card.hidden=!card.textContent.toLowerCase().includes(q));
 });
 document.querySelectorAll(".nav-item").forEach(a=>a.addEventListener("click",e=>{
   e.preventDefault(); document.querySelectorAll(".nav-item").forEach(x=>x.classList.remove("active"));a.classList.add("active");
   const section=a.dataset.section;
   if(section==="dashboard"){window.scrollTo({top:0,behavior:"smooth"});return;}
   if(section==="profile"){toast("Profile: your account details are shown in the top bar.");return;}
   const names={wallet:"Wallet features are coming soon.",transactions:"Transaction history will appear after payment integration.",history:"Your service history will appear when requests are connected.",government:"Government Services",printing:"Print Services",digital:"Digital Services",tools:"Free Tools"};
   const mapping={government:"Government Services",printing:"Print Services",digital:"Digital Services",tools:"Free Tools"};
   const target=mapping[section]; if(target){const card=[...document.querySelectorAll(".service-card")].find(c=>c.dataset.service===target);if(card){card.scrollIntoView({behavior:"smooth",block:"center"});card.focus();}}
   else toast(names[section]||"This section is ready for future integration.");
 }));
})();