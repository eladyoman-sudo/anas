# BMS Auditing cinematic website: handoff notes

The user asked (in Arabic) for a cinematic scroll-driven website for their company, BMS Auditing,
built with the `10k-websites` skill (plus the design skills in `.claude/skills/`).
Company facts live in `bms-project/company-info.md`.

Talk to the user in Arabic, plain and simple.

## Where we are

- Phase 1 (setup wizard) of `10k-websites`:
  - ffmpeg: OK
  - Node.js: OK (v22)
  - Chromium for self-tests: OK (`/opt/pw-browsers`)
  - Higgsfield: NOT connected yet. The cloud environment's network policy blocks
    `*.higgsfield.ai`, and no Higgsfield connector was attached to the first session.
- The user has a Higgsfield account and an API key (they shared only the key ID, not the secret).
  Never ask them to paste the secret into the chat.

## Next steps for the next session

1. Re-run the Phase 1 scan. Verify Higgsfield with a balance call:
   - Connector path: Higgsfield tools appear (custom connector `https://mcp.higgsfield.ai/mcp`
     added at claude.ai/customize/connectors).
   - API path: env var `HF_KEY` = `KEY_ID:KEY_SECRET` set in the environment, and network access
     allows `higgsfield.ai` and `*.higgsfield.ai` (plus the CDN that serves results).
2. Give the honest-costs talk, declare setup complete.
3. Phase 2 design conversation. Open questions: site language (English, Arabic, or both);
   AI-imagery disclosure; logo and client logos (the user mentioned folders `logo/`, `icons/`,
   `banners/`, `clients/` that were not uploaded yet).
