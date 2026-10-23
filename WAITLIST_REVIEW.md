# Unpublished waitlist review

The new `waitlist.html`, `waitlist.css` and `waitlist.js` implement a short signup followed by an optional three-step business profile. They are local review artifacts on `codex/waitlist-profile`; the current homepage, demo, closed-registration notice and privacy page remain unchanged.

Run this page through the BoothBiz product repository's `scripts/waitlist-review.js`, not a static server alone. Its same-origin `/api/public/waitlist/v2` contract supplies gate status, catalog, signup, scoped profile, secure resume and preferences. With no approved backend gate it stays closed. No provider credentials belong in browser code.

The local harness accepts synthetic `@example.invalid` addresses only and sends no real email. Review at http://127.0.0.1:5183/review/new-signup. Product documentation at `docs/waitlist/IMPLEMENTATION.md` and `docs/waitlist/VERIFICATION.md` describes migrations, access control, tests, recommendations, launch blockers and rollback.

Do not publish or enable collection without explicit owner approval, approved production API/database and email transport, sender/alias checks, final privacy/retention information and verification of the deployed closed state before launch.
