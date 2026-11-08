# SEO findings (audit only, no code changes)

Static inspection of all HTML templates. Titles present on every page. Meta `description` present on 10 of 14 templates.

## Per-page results

| Page | title | meta description | canonical | OG/Twitter | h1 count | img alt coverage |
|------|-------|------------------|-----------|------------|----------|------------------|
| index | yes | 1 | no | 0/0 | 0 | 9/16 imgs have alt |
| contact | yes | 1 | no | 0/0 | 0 | 1/4 |
| services | yes | 1 | no | 0/0 | 0 | 5/8 |
| works | yes | 1 | no | 0/0 | 24 (multiple h1s) | 5/14 |
| studio | yes | 1 | no | 0/0 | 2 | 2/18 |
| terms | yes | 1 | no | 0/0 | 1 | 0/1 |
| privacy | yes | 1 | no | 0/0 | 1 | 0/1 |
| process | yes | 1 | no | 0/0 | 0 | 0/5 |
| project | yes | 1 | no | 0/0 | 0 | 0/4 |
| login | yes | 1 | no | 0/0 | 0 | 0/1 |
| 404 | yes | 0 | no | 0/0 | 0 | n/a |
| offline | yes | 0 | no | 0/0 | 1 | n/a |
| block | yes | 0 | no | 0/0 | 1 | n/a |
| reeler | no title found | 0 | no | 0/0 | 0 | n/a |

## Recommendations (documented, not implemented)

1. Add `<link rel="canonical">` per page pointing at the production domain (hypercritical.store) to consolidate the vercel.app vs custom-domain variants.
2. Add Open Graph and Twitter Card meta (og:title, og:description, og:image, og:url, twitter:card) to the 10 public pages - currently zero social-share metadata anywhere.
3. H1 structure: index, contact, services, process, project, and login have NO `<h1>` at all; works.html has 24 h1 elements (should be one page-level h1 plus h2/h3); studio has 2. Recommend one descriptive h1 per page.
4. Meta description missing on 404/offline (low priority) and reeler/block are orphaned anyway.
5. `robots.txt` and `sitemap.xml` do not exist in source or build output (`ls` -> No such file). Recommend adding both: a permissive robots.txt (Disallow: /login, /404, /offline) and a sitemap covering the 10 public routes.
6. img alt coverage is roughly half on media-heavy pages (index 9/16, studio 2/18, works 5/14). Decorative images should use empty `alt=""` so coverage is meaningful rather than absent.
7. `includes/manifest.json`/`site.webmanifest` exist and are linked - good; verify the manifest `name`/`icons` fields are correct for the PWA listing.
