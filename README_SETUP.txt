CSC GONE Dashboard + Gmail Login Starter

FILES
- index.html: Registration and login page
- dashboard.html: Dashboard styled like the reference screenshot
- config.js: Supabase project URL and anon/public key
- auth.js / dashboard.js: Supabase email-password auth and dashboard interactions
- style.css: Responsive black/gold luxury sign-in plus service dashboard

SETUP
1. Edit config.js and replace the two PASTE_ placeholders with your Supabase Project URL and anon/public key.
   Never use the service_role key or any secret key in browser code.
2. In Supabase Authentication > Sign In / Providers, keep Email enabled.
3. Since you turned Confirm email off, test registration with a real email you control.
4. Upload the CONTENTS of this folder (not the ZIP itself) to the root of:
   https://github.com/cscgone2026/cscgone2026.github.io
5. Commit changes, wait for GitHub Pages deployment, then visit:
   https://cscgone2026.github.io/
6. Register, then log in. The dashboard requires a valid Supabase session.

IMPORTANT
- This is a front-end starter. Service cards are interface options/placeholders; they do not yet submit real government applications, payments, wallet operations, or print jobs.
- Gmail + password is used for authentication. Mobile number is saved as user metadata during registration, not as the login credential.
- Do not put passwords, service-role keys, or other secrets in config.js.
- Free hosting/auth plans have limits and terms; unlimited free usage cannot be guaranteed.
