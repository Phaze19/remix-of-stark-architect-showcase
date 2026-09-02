# Remove the Blog

Fully remove the blog section from the site so nothing links to it and the URL no longer resolves.

## Changes

- Delete the blog pages and their sample content data.
- Remove the `/blog` and `/blog/:id` routes (plus their lazy imports and SEO metadata entries) from the app router.
- Remove the "Blog & Insights" link from the footer.
- Remove the `/blog` entry from the sitemap so search engines stop crawling it.

## Technical detail

- Delete `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`, `src/data/blogPosts.ts`.
- `src/App.tsx`: drop the `Blog`/`BlogPost` lazy imports, both `<Route>` entries, the `/blog` entry in `ROUTE_META`, and the blog-flavoured `DEFAULT_META` (replace with a neutral site-level default).
- `src/components/Footer.tsx`: remove the blog nav item (line 16).
- `public/sitemap.xml`: remove the `/blog` URL entry.

Any visitor hitting `/blog` afterwards gets the existing 404 page.
