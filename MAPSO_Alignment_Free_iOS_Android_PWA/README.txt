MAPSO Alignment Check — free installable web app

This is a PWA, not an APK or IPA. It uses the original V9 form and print CSS.

Publish on GitHub Pages (free with a PUBLIC repository):
1. Create a new public repository named mapso-alignment.
2. Upload ALL files in this folder to the repository root (index.html, manifest.webmanifest, service-worker.js, icons, .nojekyll).
3. Settings > Pages > Deploy from a branch > main > /(root) > Save.
4. Open the Pages address provided by GitHub on your phone.
5. iPhone: Safari > Share > Add to Home Screen > Open as Web App > Add.
6. Android: Chrome > menu > Install app (or Add to Home Screen).

Important:
- Home-screen app runs offline after the initial successful load/cache.
- No measurement data is automatically uploaded; clearing app data can erase incomplete entries. Save finished reports as PDFs.
- Native PDF print/share support differs by browser/device; test before production use.
- A public GitHub repository exposes the FORM SOURCE, not data entered locally.
- Publishing is required for standard PWA installation; file attachments alone cannot provide a universal iOS/Android installer.
