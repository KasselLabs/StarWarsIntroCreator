# Runtime and validation

This branch keeps React 16, Webpack 5 and its existing dependency graph. Use Node.js 24.22.1 or a newer security patch below 25 with npm; keep package/lock engines, `.nvmrc` and Travis aligned for CVE-2026-111497. The existing OpenSSL legacy provider flag remains required by this build pipeline.

Run `npm ci`, `npm test -- --runInBand`, `npm run lint` and `npm run build`. There is no lint:fix script; report existing lint failures without rewriting application code for a runtime-only change. Build produces both `dist/` and `dist-rendering/`. Do not publish these artifacts or request paid rendering jobs while validating source.

Repository branch pins do not establish Vercel’s actual deployed branch or managed patch; verify provider metadata separately.
