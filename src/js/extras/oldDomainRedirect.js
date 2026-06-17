// old.starwarsintrocreator.kassellabs.io → starwarsintrocreator.kassellabs.io
//
// The swic-vs-new-2026-q2 experiment concluded 2026-06-17 (see
// kassellabs-os/planning/swic-vs-new-ab-test.md). The new app is the
// consolidated destination and old.* is now a pure forwarder to it.
//
// We preserve the path, the real query params, and the hash. A legacy deep
// link carries the intro key in the hash (e.g. #!/<key>/download), so
// forwarding it unchanged lands the visitor on the new domain via the exact
// same path an old #!/<key> bookmark already takes — the new app's
// LegacyHashRedirect normalizes #!/<key> to the clean /<key> URL. Only our
// own A/B test-helper params are stripped.
//
// NOTE: the inline <head> snippet in src/index.html runs this same
// computation before the bundle loads (so old.* never fires analytics or
// paints the legacy UI). Keep the two in sync — this module is the tested
// contract (oldDomainRedirect.test.js).

export const OLD_DOMAIN = 'old.starwarsintrocreator.kassellabs.io';
export const NEW_ORIGIN = 'https://starwarsintrocreator.kassellabs.io';

const AB_HELPER_PARAMS = ['ab_variant', 'ab_reset', 'ab_no_redirect'];

export function oldDomainRedirectTarget(location) {
  if (!location || location.hostname !== OLD_DOMAIN) return null;

  const params = new URLSearchParams(location.search || '');
  AB_HELPER_PARAMS.forEach((key) => params.delete(key));
  const qs = params.toString();

  return NEW_ORIGIN
    + (location.pathname || '/')
    + (qs ? `?${qs}` : '')
    + (location.hash || '');
}

export function redirectOldDomain(win) {
  const target = oldDomainRedirectTarget(win.location);
  if (target) win.location.replace(target);
  return target;
}
