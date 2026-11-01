CSC GONE — Registration and Login starter
=========================================
This ZIP contains a registration/login starting page, dashboard, and your existing business website.

Included:
- index.html — registration and login options
- dashboard.html — signed-in dashboard and logout
- home.html — existing CSC GONE website with phone and office location
- auth.css, auth.js — responsive design and authentication integration
- config.js — add your Supabase Project URL and anon/public key
- images/ — existing site images

IMPORTANT: Authentication will NOT work until you configure Supabase. This ZIP alone does not create accounts.

SETUP
1. Create a project at https://supabase.com/ (free tier; quotas and limits apply).
2. In project settings/API, copy the Project URL and anon/public key.
3. Edit config.js and replace the two PASTE_... placeholders with those values.
   Never use the service_role/secret key in browser code.
4. In Supabase Authentication settings, enable Phone authentication and disable phone confirmation if available.
5. Upload/replace all files and the images folder in the root of your hosting repository.
6. Open the published site using HTTPS and test registration, logout, and login.

REGISTRATION
Name, mobile number, Gmail ID, password. Gmail is saved as unverified user metadata because you requested no verification. Phone is the login identifier; Indian 10-digit numbers are prefixed with +91. Use a unique password with at least 8 characters.

LIMITS AND SAFETY
- Free services have quotas/rate limits; unlimited free use forever is not guaranteed.
- Password handling is managed by Supabase Auth, not stored in this website's own files.
- This is a starter. Add a privacy notice and test carefully before collecting real customer data.
- Review GitHub Pages' current rules before using it as a primary business host.
- If signup doesn't immediately log in, confirm phone confirmation is disabled and the Phone provider is enabled in Supabase.
