# Deploying the built static site

This project builds to a static `dist/` folder using Vite. Below are simple deployment options.

IMPORTANT: Do not embed private API keys in a static build. `vite.config.ts` injects `process.env.GEMINI_API_KEY` at build time — if any client code reads that variable the value will be included in the bundled assets and exposed publicly. Use a server-side proxy or serverless function for private keys.

1) Build locally

PowerShell commands:

```powershell
npm install
npm run build
```

After `npm run build`, the static output will be in `dist/`.

2) Preview the build locally

```powershell
npm run preview
```

This runs Vite's preview server so you can sanity-check the static site.

3) Deploy to GitHub Pages (manual / simple)

- Option A (quick, using `gh-pages` package):
  - Install `gh-pages` as a dev dependency and add a deploy script:

    ```powershell
    npm install --save-dev gh-pages
    ```

    In `package.json` add:
    ```json
    "homepage": "https://<your-username>.github.io/<repo-name>",
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```

    Then publish:
    ```powershell
    npm run deploy
    ```

- Option B (preferred for most): use GitHub Actions to build and push `dist/` to `gh-pages` or use the GitHub Pages source set to `gh-pages` branch.

4) Deploy to Netlify

- Create a Netlify site and connect your GitHub repository, OR drag-and-drop the `dist/` directory in Netlify's dashboard for a manual deploy.
- If using the Git integration, set the build command to `npm run build` and the publish directory to `dist`.

5) Deploy to Vercel

- Connect your GitHub repository to Vercel.
- Set the framework to `Vite` (or `Other`), build command `npm run build`, and output directory `dist`.
- Vercel builds and deploys automatically on push.

6) Static Hosting (other)

- Any static host that accepts uploaded files can serve the `dist/` folder (S3 + CloudFront, Surge, etc.).

7) Secure API usage

- If you need to call the Gemini (or any) API, do NOT call it directly from browser code using a private API key. Instead:
  - Create a serverless function (Netlify Functions, Vercel Serverless, or an API server) that holds the secret and forwards requests.
  - Client (browser) calls your function; the function adds the API key server-side.

If you want, I can:
- Add a `gh-pages` deploy script and install the package for you.
- Create a simple GitHub Action workflow that builds and deploys `dist/` to `gh-pages`.
- Add a `netlify.toml` or `vercel.json` with recommended settings.

Which deployment target should I prepare files for (GitHub Pages / Netlify / Vercel / none)?