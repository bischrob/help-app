# CatMapper help app

Vite and React documentation site published at [help.catmapper.org](https://help.catmapper.org). It renders the reviewer- and user-facing CatMapper guides, navigation sidebar, images, and stable route entrypoints.

## Repository map

- `src/` contains the React documentation UI.
- `public/docs/` contains documentation content and `sidebar.json` navigation.
- `public/media/` and `public/screenshots/` contain documentation assets.
- `deploy.sh` builds the site, generates static route entrypoints, and publishes `build/`.

## Local development

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

The development server listens on port 3000 by default.

## Validation

```bash
npm test
npm run build
```

When changing documentation navigation, verify that every `sidebar.json` entry resolves and that direct loading of generated routes works after the production build.

## Commit versions and deployment

Enable the repository-managed hook:

```bash
git config core.hooksPath .githooks
```

The hook updates `package.json` and `package-lock.json` with a timestamped version in every commit. `deploy.sh` builds and tags the existing committed version; it does not create a separate version commit.

Production and development deployment are normally orchestrated from the CatMapper superproject. Deploy only from a clean, fast-forwardable checkout.

## Contributing documentation

- Keep instructions task-oriented and use the exact UI labels visible to users.
- Store durable navigation in `public/docs/sidebar.json`.
- Add images under `public/images/` with descriptive filenames and alternative text in the page content.
- Do not include credentials, private datasets, personal information, or internal-only operational details.
