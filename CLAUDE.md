# BMS Auditing cinematic website

The owner speaks Arabic and is not technical. Talk to them in plain, simple Arabic, one step at a
time, with clickable choices. Handle every technical detail yourself.

## Goal

Build and deploy a cinematic scroll-driven website for BMS Auditing with the `10k-websites` skill.

- Company facts: `bms-project/company-info.md`
- Progress notes: `bms-project/HANDOFF.md`. Read it first and keep it updated.

## Skills (`.claude/skills/`)

- `10k-websites`: governs the website build (phases, laws, gates). Follow it.
- `higgsfield-api`: image and video generation through the direct Higgsfield API.
- `ui-ux-pro-max`, `design`, `design-system`, `ui-styling`, `brand`, `banner-design`, `slides`:
  design references.

## Higgsfield access

- The owner uses the direct API with their own key, not the Higgsfield MCP connector.
  `10k-websites` was written around the connector, so map its steps onto the `higgsfield-api`
  helper: `get_cost` becomes `estimate`, and a generation becomes `submit`, then `wait`, then
  `download`. The API has no balance endpoint: say so instead of inventing a balance.
- Credentials: `HF_CREDENTIALS=KEY_ID:KEY_SECRET`, either in `.env.local` (git-ignored) or in the
  process environment (cloud environment settings).
  - Never ask the owner to paste the key into the chat. Have them paste it into `.env.local`
    themselves.
  - Never read, print, log, or commit the key.
  - `index.ts` (`npm start`) loads `.env.local` on its own. The Python helper reads only the
    process environment: load `.env.local` into the environment for that one command, without
    printing it.
- Seedance 2.5 over the API: 4 to 30 seconds, 480p or 720p only, audio on by default.
- Every generation costs money. Estimate first, tell the owner the price in plain words, and keep
  the `10k-websites` gates.

## Tools

Node.js 22+, Git, ffmpeg, Python 3.10+. The Python helper's virtual env lives in
`work/higgsfield-venv` (git-ignored). Install anything missing yourself, following Phase 1 of
`10k-websites`.

## Never commit

`.env.local`, `work/`, raw generations, and review media.
