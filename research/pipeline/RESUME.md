# Resume prompt

Paste the text below into a fresh session to pick this work back up.

---

Read `research/pipeline/NEXT-ROUND-NOTES.md` and `research/pipeline/README.md` first — state as of 2026-08-18 (git log is authoritative over anything below if they conflict; latest commit is `3f1a842`).

**STRATEGIC PIVOT — read this before picking a target, it overrides the "thinnest band" targeting logic in NEXT-ROUND-NOTES.md's tail end:**

The user has explicitly deprioritized Age 11 / Age 11 High Achiever content. Their son is focused on Age 9/Age 10, and that's now the priority for all future rounds, across every subject — do not chase Age 11/Age 11 HA gaps even if they're numerically thinnest. Re-target self-audit's and any future round's "which band is thinnest" logic to only weigh Age 9, Age 9 HA, Age 10, Age 10 HA counts, ignore Age 11 tiers entirely until told otherwise.

**Specific content interest, highest priority: geography — capitals, rivers, mountains, and place-identification.** The son specifically likes this content type. Current counts in `data/seed/geography.json` (293 items total): capitals appear in 63 prompts, rivers in 14, mountains in 10 — rivers and mountains are thin relative to capitals and should be the next round's specific focus, at Age 9/Age 10 (and their HA variants) only.

**A related idea was raised and explicitly deferred, do not build it yet:** "identify the country from a highlighted region on a map" — this needs real map images, and the app currently has **zero image support anywhere** (no image field in the question schema, no asset hosting, no rendering UI). The user chose to scope this as its own separate task rather than fold it into a content round or build a text-only substitute. **Next step on this specific idea: propose a scoped plan (Prisma schema change for an image field, asset hosting approach, UI rendering) and get explicit approval before any implementation** — per standing rules, no Prisma schema changes without asking first, and this is a cross-cutting feature, not a content-ingestion task. Don't start on this without the user opening that conversation; it's parked, not assigned.

**Closed out in the session that just ended (2026-08-17 to 2026-08-18), all committed:**
1. NY G4 ELA 2025 → `english.json` 271→288 (commit `d23aaaf`, shared with #2)
2. NY G4 Math 2024 → `maths.json` 360→384 (commit `d23aaaf`)
3. Virginia SOL World Geography 2012 → `geography.json` 261→293 (commit `8c03412`) — a deliberately-harder (grade 9-10) source, rewritten down; found and fixed a "self-answering option text" defect class (options with a giveaway parenthetical baked in, e.g. "West Africa (the world's largest cocoa producer)" as the correct option itself)
4. NY Regents Grade 5 Math 2025 → `maths.json` 384→409 (commit `d9d4900`) — found and fixed a THIRD instance of a duplicate-correct-answer defect (two options both technically true) that keeps slipping past agent-level "verify all options" checks; needs a literal per-option recomputation, not a verbal instruction, to reliably catch
5. Smithsonian Point...Click...Activity Sheets → `science.json` 370→388, `space.json` 219→220 (commit `3f1a842`) — closed science's Age 9 High Achiever outlier (was 8 items, a third the size of any other subject's thinnest band; now 19). Source found live on a legacy domain (`smithsonianeducation.org`) after the modern site turned out to be Cloudflare-blocked — located via the Wayback Machine's file index rather than accepting the block as a dead end. This is now a fully-mined, exhausted one-shot source, don't re-run it.

**Current seed sizes (2026-08-18, all committed):** maths 409, english 288, geography 293, science 388, space 220.

**Closed out 2026-08-18 (later same day):** VA SOL World Geography 2007 (found via Wayback Machine's CDX API, not just the one 2012 snapshot already mined — 3 more un-mined years/editions exist, see `NEXT-ROUND-NOTES.md` section 1) + a small set of original rivers/mountains fact items → `geography.json` 293→326. Rivers mentions 14→20, mountains 10→17. Also fixed a real, previously-unnoticed pipeline bug (`rebalance.ts` leaves `explanation` text pointing at pre-rebalance option letters — hit 19 of 33 items this round, see `NEXT-ROUND-NOTES.md` section 0, not fixed at the script level yet) and a real app-code bug (the automatic promotion window in `src/lib/practice-session-service.ts` didn't filter by `levelBand`, so sessions from before a promotion could count toward triggering a second promotion after just one session in the new band — fixed, regression tests added, see `docs/rewards-and-levels-bands.md` for the spec this now correctly implements).

**Next natural move:** geography's capitals/rivers/mountains gap has narrowed (64/20/17) but capitals is still 3x the others — could run another rivers/mountains-focused round, or pick a different subject/gap. The 2013/2014 VA SOL World Geography item-set PDF found this round extracted almost no text (likely scanned/image-based) — an OCR pass could unlock it if pursued. Otherwise check current per-subject/band counts fresh rather than assuming these are still accurate by the time you read this.

**Standing pipeline gaps, still unresolved (unchanged from before, see NEXT-ROUND-NOTES.md section 6 for full detail):** reading-comprehension batches need manual verify/dedup and a hand-rebuilt staging.json; `verify.ts`'s `checkExpression` doesn't support `floor()`/`ceil()`/comparison operators; self-audit's difficulty heuristic is maths-shaped and unreliable on non-numeric content; no automated Step 3 similarity/rewrite-distinctness gate; history/politics/civics subject-scope decision still approved in principle but not implemented.

**Standing rules still apply:** no Prisma schema changes without asking first (this now specifically includes the parked map-image feature — don't start it unprompted); no new subject files or schema fields without explicit prior approval; never run `merge.ts` from inside a batch agent — human review is always the blocking step between staging and merge; independently re-verify agent-reported checks rather than trusting the report at face value (this session found real defects in every single batch by doing this).
