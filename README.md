# NOORJUMMAH

**The Infinite Universe of Muslim Identities** — a lightweight static website celebrating the spirit of Jumu'ah and the variety of names and cultural traditions found among Muslim communities worldwide.

## Files

- `index.html` — semantic page structure and dialogs
- `style.css` — responsive Islamic-inspired emerald, midnight, ivory, and antique-gold design
- `script.js` — deterministic fictional profile generation, infinite virtualized feed, identifier search, and local Friday/date behavior

## Run locally

Open `index.html` in a modern browser. The core site does not require a server, account, database, paid API, external JavaScript library, external font, or external asset. System serif/sans-serif fallbacks are defined in CSS.

## Deploy

Upload all three core files (`index.html`, `style.css`, and `script.js`) to the root of a GitHub Pages, Cloudflare Pages, or Netlify static site. Keep the paths and filenames unchanged unless you also update the HTML references.

## Feed and identifier behavior

- The feed creates profiles ahead of the scroll boundary, keeps a bounded number of profile cards in the DOM, and replaces removed history with a virtual spacer.
- When the virtual spacer grows very large, the page rebases its scroll coordinates while retaining the currently visible cards; the profile sequence itself continues advancing.
- Profile IDs are held and incremented as decimal strings, not JavaScript `Number` values. Direct ID searches support arbitrary-length positive digit strings and preserve the exact entered digits in the detail view.
- Generation is deterministic for a given ID and generator version (`v1`). If profile-generation rules or datasets are changed in a future release, update the version intentionally.
- Name/culture/language searches query locally generated and currently known identities. This is not a complete global directory; an exact ID is the reliable way to retrieve a particular generated identity.

## Respect and limitations

All generated identities are fictional. A person's name, language, clothing, or cultural inspiration is not evidence of any real person's religion. Cultural name pools are illustrative rather than exhaustive, and the website does not claim to contain every Muslim name. No real contact details or real-person biographies are generated. No Qur'an or hadith quotations are attributed to religious sources.

## Compatibility

Built with HTML, CSS, and vanilla JavaScript. The feed uses scroll-geometry checks and does not depend on `IntersectionObserver`. Reduced-motion preferences, visible focus states, semantic controls, and responsive layouts are included.
