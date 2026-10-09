CSC GONE — Gmail + Password Registration/Login
================================================

This package contains the CSC GONE registration/login page, a protected dashboard, and the business website.

Registration asks for: full name, mobile number, Gmail address, and password.
Login uses: Gmail address + password. The mobile number is saved in Supabase user metadata.

IMPORTANT: You must configure config.js before publishing.

1. Open config.js with Notepad.
2. Replace PASTE_YOUR_SUPABASE_PROJECT_URL_HERE with your Supabase Project URL.
3. Replace PASTE_YOUR_SUPABASE_ANON_KEY_HERE with your Supabase anon/public key. Do NOT use service_role or a secret key.
4. Save config.js.
5. In Supabase Dashboard > Authentication > Sign In / Providers, make sure Email is enabled.
6. You said you turned Confirm email OFF and saved; this allows signup without email confirmation (subject to project settings).
7. Upload ALL extracted files and the images folder to the ROOT of your GitHub repository cscgone2026.github.io. Do not upload only the ZIP. Replace files if asked. Commit changes.
8. Wait for GitHub Pages deployment, then open https://cscgone2026.github.io/ and hard-refresh with Ctrl+Shift+R.
9. Test with a Gmail address you control and a unique password (8+ characters).

If account signup returns no session, try logging in with the same Gmail and password. Check Supabase Authentication > Users to see whether the user was created.

Security: never share your password. The anon/public key is intended for browser use; never publish a service_role/secret key. Use Supabase Auth and database policies for protected data. Free service quotas and hosting policies/limits apply; lifetime unlimited free service is not guaranteed.
