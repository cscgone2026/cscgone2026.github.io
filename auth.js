(() => {
 const ready = () => window.supabase && window.CSC_GONE_SUPABASE_URL &&
  window.CSC_GONE_SUPABASE_ANON_KEY &&
  !window.CSC_GONE_SUPABASE_URL.includes("PASTE_") &&
  !window.CSC_GONE_SUPABASE_ANON_KEY.includes("PASTE_");
 let client = null;
 if (ready()) client = window.supabase.createClient(window.CSC_GONE_SUPABASE_URL, window.CSC_GONE_SUPABASE_ANON_KEY);
 const $ = id => document.getElementById(id);
 const msg = (text, type="info") => { const el=$("message"); el.textContent=text; el.className="message "+type; };
 const loginTab=$("loginTab"), registerTab=$("registerTab"), loginForm=$("loginForm"), registerForm=$("registerForm");
 function tab(which) {
   const login=which==="login"; loginTab.classList.toggle("active",login); registerTab.classList.toggle("active",!login);
   loginForm.hidden=!login; registerForm.hidden=login; msg("");
 }
 loginTab.addEventListener("click",()=>tab("login")); registerTab.addEventListener("click",()=>tab("register"));
 function checkConfig(){ if(!client){msg("Setup needed: add your Supabase Project URL and anon/public key in config.js, save, and upload the files again.","error");return false;} return true; }
 loginForm.addEventListener("submit", async e=>{
   e.preventDefault(); if(!checkConfig()) return;
   const email=$("loginEmail").value.trim(), password=$("loginPassword").value;
   const btn=loginForm.querySelector("button"); btn.disabled=true; btn.textContent="Signing in…";
   try {
     const {error}=await client.auth.signInWithPassword({email,password});
     if(error) throw error;
     location.href="dashboard.html";
   } catch(err){msg(err.message || "Login failed. Check your email and password.","error");}
   finally {btn.disabled=false;btn.innerHTML='Login <span>→</span>';}
 });
 registerForm.addEventListener("submit", async e=>{
   e.preventDefault(); if(!checkConfig()) return;
   const full_name=$("fullName").value.trim(), mobile=$("mobile").value.trim(), email=$("registerEmail").value.trim(), password=$("registerPassword").value;
   const btn=registerForm.querySelector("button"); btn.disabled=true; btn.textContent="Creating account…";
   try {
     const {data,error}=await client.auth.signUp({email,password,options:{data:{full_name,mobile}}});
     if(error) throw error;
     if(data.session) location.href="dashboard.html";
     else {msg("Account created. If email confirmation is disabled in Supabase, try logging in now.","success");tab("login");$("loginEmail").value=email;}
   } catch(err){msg(err.message || "Registration failed. Please check the details.","error");}
   finally {btn.disabled=false;btn.innerHTML='Create account <span>→</span>';}
 });
})();