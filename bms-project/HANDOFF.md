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
  - Higgsfield: NOT verified yet. In the first session the network policy blocked
    `*.higgsfield.ai` and no credentials were configured.
- The user chose the direct API path (not the MCP connector) and now has a working key.
  They were told to put it in the cloud environment settings as
  `HF_CREDENTIALS=KEY_ID:KEY_SECRET` and to allow `api.higgsfield.ai` under Network access.
  Never ask them to paste the key into the chat. Never read, print, log, or commit it.
- Higgsfield tooling already in the repo:
  - `index.ts` (TypeScript, `@higgsfield/client` v2): Seedance 2.5 text-to-video example,
    "A cinematic scene at sunset", 5 s, 720p, 16:9. Run with `npm start`. Reads
    `HF_CREDENTIALS` from the environment or `.env.local` (git-ignored).
  - `.claude/skills/higgsfield-api/`: Python helper (`validate`, `estimate`, `submit`, `wait`,
    `download`). It reads `HF_CREDENTIALS` from the process environment only, not from
    `.env.local`. Its runtime lives in `work/higgsfield-venv` (git-ignored; recreate with
    `python3 -m venv work/higgsfield-venv` and `pip install -r .claude/skills/higgsfield-api/requirements.txt`).
  - Seedance 2.5 API limits: 4 to 30 s, 480p or 720p only, audio on by default.

## Next steps for the next session

1. Check that `HF_CREDENTIALS` exists (print only variable names, never values) and that
   `api.higgsfield.ai` is reachable.
2. Run the requested example: `npm install` if needed, then `npm start`. This is one billable
   5 s 720p generation that the user already asked for. Report the real video URL, or the real
   blocker. Never claim success without a successful run.
3. Then continue `10k-websites`: honest-costs talk (use the helper's `estimate`), declare setup
   complete, then the Phase 2 design conversation. Open questions: site language (English,
   Arabic, or both); AI-imagery disclosure; logo and client logos (the user mentioned folders
   `logo/`, `icons/`, `banners/`, `clients/` that were not uploaded yet). Seedance 2.5 tops out
   at 720p, so the 1080p hero video may need another model.
