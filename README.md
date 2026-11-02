# KRATU HERO
Public, no-signup static comic site for kratu.kratex.in, hosted on the owner's existing cPanel. No backend, analytics, paid dependencies, or build service.

## Local preview
`python3 -m http.server 8080 --directory public`

## Publishing
Only `public/` is web-served. Keep Git checkout outside the document root. cPanel Git Version Control pulls the public repository; `.cpanel.yml` copies only the public bundle to the verified isolated Kratu document root. Do not deploy to the main kratex.in document root.

The public manifest is deliberately empty until final comic approval. Never commit private scripts, drafts, character bibles, credentials or unrelated source material. Public source visibility does not grant an artwork reuse license.

## Episode workflow
1. Obtain script approval before artwork production.
2. Complete artwork, character/expression and object sheets privately.
3. Obtain final content approval.
4. Add optimized final panels and thumbnail under `public/assets/episodes/` and a record in `public/episodes.json`.
5. Verify the public site first; only then post the approved Instagram version.

Episode fields: `id`, `number`, `title`, `thumbnail`, `thumbnailAlt`, `status:"published"`, `approved:true`, `panels:[{src,alt,width,height}]`, optional `transcript`. Approval is an editorial gate, not access control: never commit drafts in any form.

## Checks
`node --check public/app.js && node --check public/reader.js`
Check desktop and narrow mobile, keyboard navigation, empty and missing episodes, manifest failure, images, and no horizontal overflow. Reader progress stays in the visitor's browser only.
