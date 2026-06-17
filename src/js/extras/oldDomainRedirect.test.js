import { oldDomainRedirectTarget, redirectOldDomain } from './oldDomainRedirect';

const OLD = 'old.starwarsintrocreator.kassellabs.io';
const NEW = 'https://starwarsintrocreator.kassellabs.io';

function loc(opts = {}) {
  return {
    hostname: OLD, pathname: '/', search: '', hash: '', ...opts,
  };
}

describe('oldDomainRedirectTarget', () => {
  it('returns null when not on the old domain', () => {
    expect(oldDomainRedirectTarget(loc({ hostname: 'starwarsintrocreator.kassellabs.io' }))).toBeNull();
    expect(oldDomainRedirectTarget(loc({ hostname: 'localhost' }))).toBeNull();
  });

  it('redirects the old homepage to the new origin', () => {
    expect(oldDomainRedirectTarget(loc())).toBe(`${NEW}/`);
  });

  it('preserves a legacy hashbang deep link (the intro key lives in the hash)', () => {
    expect(oldDomainRedirectTarget(loc({ hash: '#!/abc123' }))).toBe(`${NEW}/#!/abc123`);
  });

  it('preserves a hashbang subpage (e.g. /download/donate)', () => {
    expect(oldDomainRedirectTarget(loc({ hash: '#!/abc123/download/donate' })))
      .toBe(`${NEW}/#!/abc123/download/donate`);
  });

  it('preserves real marketing query params', () => {
    const t = oldDomainRedirectTarget(loc({ search: '?utm_source=google&utm_medium=cpc&gclid=XYZ' }));
    expect(t).toBe(`${NEW}/?utm_source=google&utm_medium=cpc&gclid=XYZ`);
  });

  it('strips A/B test-helper params but keeps the rest', () => {
    const t = oldDomainRedirectTarget(loc({ search: '?ab_variant=legacy&utm_source=google&ab_reset=1' }));
    expect(t).toBe(`${NEW}/?utm_source=google`);
  });

  it('produces a clean URL when the only params were A/B helpers', () => {
    expect(oldDomainRedirectTarget(loc({ search: '?ab_variant=legacy' }))).toBe(`${NEW}/`);
  });

  it('preserves path + query + hash together', () => {
    const t = oldDomainRedirectTarget(loc({ pathname: '/', search: '?utm_source=fb', hash: '#!/k9/edit' }));
    expect(t).toBe(`${NEW}/?utm_source=fb#!/k9/edit`);
  });
});

describe('redirectOldDomain', () => {
  it('calls location.replace with the target on the old domain', () => {
    const replace = jest.fn();
    const win = { location: { ...loc({ hash: '#!/abc123' }), replace } };
    const ret = redirectOldDomain(win);
    expect(replace).toHaveBeenCalledWith(`${NEW}/#!/abc123`);
    expect(ret).toBe(`${NEW}/#!/abc123`);
  });

  it('does nothing when not on the old domain', () => {
    const replace = jest.fn();
    const win = { location: { ...loc({ hostname: 'starwarsintrocreator.kassellabs.io' }), replace } };
    const ret = redirectOldDomain(win);
    expect(replace).not.toHaveBeenCalled();
    expect(ret).toBeNull();
  });
});
