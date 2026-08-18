# Notes for the next ingestion round

Written 2026-08-18, after merging the VA SOL World Geography 2007 batch (33 items:
geography.json 293→326; rivers mentions 14→20, mountains 10→17).

---

## 0. Found a real pipeline-level bug: `rebalance.ts` leaves explanations pointing at stale letters

`rebalance.ts` (Step 5.7) moves each option's TEXT together with its new letter when
it rebalances answer-position distribution — that part is correct and does what its
own comment says. But it does **not** touch the `explanation` field, which the
rewrite subagent wrote referencing the *original* (pre-rebalance) letters — e.g. an
explanation reading "The ozone layer (B) is different" when option B had since
become "Acid rain" (the correct answer) and ozone had moved to A. This isn't a
self-audit-flaggable defect (correctOption itself is right, self-audit's checks
never fire), so it slipped past 5-6 (verify/dedup) and self-audit cleanly — it was
only caught by manually re-reading every explanation against the actual option
lettering during Step 7 human review. This round it hit **19 of 33 items** (58%).

**This is likely a standing bug affecting every prior batch that used `rebalance.ts`
and had explanations referencing letters** (i.e. probably most rounds since it was
added) — not something specific to this batch's source or rewrite agent. Nobody has
gone back to audit older merged content for this.

**Recommended fix for the next round or a dedicated cleanup pass:** either (a) have
`rebalance.ts` also rewrite/strip letter references in `explanation` when it moves
options, or (b) instruct rewrite agents to never write letter-referencing
explanations in the first place (describe wrong answers by content, not by letter
position) so rebalancing can't desync them. Option (b) is simpler and removes the
failure mode entirely — add it to the round template's Step 2-3 instructions.
**Do not skip the "re-read every explanation" pass in Step 7 until this is fixed at
the script level** — self-audit will not catch it.

## 1. VA SOL World Geography: a genuine multi-year archive exists behind Wayback Machine, not just the one 2012 snapshot

Earlier research (documented in `source_catalog.md`) treated the 2012 edition as
"a single sample paper, not a confirmed multi-year archive" because VDOE's live
site (`doe.virginia.gov`) 403s all automated fetches. That verdict was incomplete:
the **Wayback Machine's CDX API is not blocked**, even though the live site is, and
querying it (`web.archive.org/cdx/search/cdx?url=doe.virginia.gov&matchType=domain&filter=original:.*geog.*`)
surfaced 4 more years/editions never checked: 2003 (10 items, mostly usable, small),
Fall 2011 "sample items" (7 items, mostly map/graph-dependent, low yield), Spring
2007 (60 items, same tier as 2012, good yield — used this round), and a 2013/2014
"item set" (56-page PDF that extracted almost no text — likely scanned/image-based,
not attempted this round, would need OCR to be usable).

**Lesson for any future source where the live site 403s but the catalog only checked
one snapshot:** always try the CDX API for the domain/path before concluding "single
sample paper" — same pattern as the Smithsonian legacy-mirror find two rounds ago,
now confirmed twice. **Remaining unexploited lead:** the 2013/2014 item-set PDF, if
someone builds an OCR step or finds a text-based mirror of it.

## 2. Geography sourcing for rivers/mountains/capitals at native grade 3-5: still a real structural gap

Confirmed again this round (see `source_catalog.md`'s 2026-08-18 addendum): no US
state or national system runs a standalone, released, elementary-grade (3-5)
physical-geography exam archive. This round closed the gap a different way —
borrowing the (already-partially-mined) VA SOL high-school archive's *other* years,
plus a small set of independently-written original items for well-known river/
mountain facts not tied to any single copyrighted source. International Geography
Bee was checked and ruled out (quiz-bowl difficulty even for "Elementary" division,
plus all-rights-reserved private IP). TeachersPayTeachers' free geography worksheets
remain unpiloted as an actual ingestion source — still just a category-browse
verification, not an actual per-item extraction test.

## 3. Current geography.json counts (2026-08-18, post-merge)

Total 326. Age 9=80, Age 9 HA=47, Age 10=77, Age 10 HA=50, Age 11=43, Age 11 HA=29.
Rivers mentions=20, mountains=17, capitals=64 (still the largest single theme, but
the gap has narrowed). Age 11/Age 11 HA remain untouched this round, per the
standing strategic pivot — do not target them.

## 4. Standing rules still apply

No Prisma schema changes without asking first (still includes the parked map-image
feature). No new subject files or schema fields without explicit prior approval.
Never run `merge.ts` from inside a batch agent — human review is always the
blocking step between staging and merge. Independently re-verify agent-reported
checks rather than trusting the report at face value — this round's rebalance-letter
bug (item 0 above) was caught exactly this way, not by any automated check.
