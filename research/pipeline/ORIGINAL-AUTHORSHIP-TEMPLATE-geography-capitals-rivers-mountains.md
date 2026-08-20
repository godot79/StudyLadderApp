# Reusable template: original-authorship world geography questions
# (capitals/countries, rivers, mountains, deserts, plains)

Written 2026-08-20, after the first batch using this format
(`research/pipeline/original-world-geography-capitals-rivers-mountains/`,
34 items merged into `data/seed/geography.json`, 295 → 329).

Use this when the source-hunting step of the normal pipeline (see
`README.md`'s "Per-source workflow") comes up empty — confirmed for
rivers/mountains/capitals at grade 3-5: no US state or national exam
archive tests this content at the right age band, and TeachersPayTeachers'
free tier (the only real worksheet-repository lead) has no rivers/
mountains/capitals MC quizzes with answer keys at any of grades 3/4/5,
in either its Worksheets or Assessment categories (checked exhaustively,
live, 2026-08-20 — see that batch's `01-source-note.json` for the full
trail before re-doing this research). Skip straight to original authorship
for this topic; re-verify a source doesn't exist for other topics before
using this template on them.

This is NOT a license to skip the pipeline's quality bar — it replaces
Steps 1-3 (extraction/classification/rewrite, which need a source) with
direct authorship, then runs the SAME Steps 4-7 (verify, dedup, fact-check,
rebalance, self-audit, staging) as every other batch. Nothing here is
merged without passing those automated checks.

---

## The question format (categories to draw from)

**Capitals and countries**
1. Show a map with a country shaded, ask to choose the right capital from
   a list of choices.
2. Show a map with a country shaded, ask to name the country from a list
   of choices.
3. Simple text question: "What is the capital of X?", with a list of
   choices.

**Rivers**
1. Facts about rivers:
   - longest river in each continent
   - major river of a country
   - which countries a major river flows through
   - how rivers got their names

**Mountains**
1. Facts about mountains:
   - tallest mountains (overall, and per continent/country)
   - which mountain range a major mountain is in
   - questions about major volcanoes

**Deserts and plains** (same pattern, extended by agreement 2026-08-20):
   - largest/driest deserts, which continent/country they're in
   - major plains regions, which countries they're in, what they're known for

Mix text-only fact questions (rivers/mountains/deserts/plains) with the
map-based capitals/countries questions in roughly a 2:1 ratio (text:map)
in one batch — map questions need a new sourced image per item, which is
the bottleneck; text questions don't.

## Map image sourcing recipe (types 1 & 2 above)

Wikimedia Commons has a consistent, well-licensed file series for this
exact purpose: `File:<Country> (orthographic projection).svg` — a globe
view with the country highlighted, used across Wikipedia's own country
infoboxes. For each country you want to ask about:

1. Fetch `https://commons.wikimedia.org/wiki/File:<Country>_(orthographic_projection).svg`
   and confirm: the file exists, its license (usually CC BY / CC BY-SA /
   dual GFDL+CC, occasionally outright public domain), and author.
2. Download the 960px PNG rendition:
   `https://upload.wikimedia.org/wikipedia/commons/thumb/<hash-path>/<Country>_(orthographic_projection).svg/960px-<Country>_(orthographic_projection).svg.png`
   (get the exact hash path from the file page — it's not derivable from
   the country name alone).
   NOTE: WebFetch gets a 403 from commons.wikimedia.org/upload.wikimedia.org
   directly in this environment — use `curl -A "Mozilla/5.0 ..." -L <url>`
   via Bash instead, which is not blocked.
3. Save to `public/images/geography/map-shaded-<country>.png`.
4. **Visually inspect the downloaded image before writing the question**
   (Read tool supports images) — don't trust the filename/description
   alone. This caught a real problem last round: Argentina's version of
   this file series includes a shaded Antarctic-claim wedge, which would
   be confusing/inaccurate for a simple "name this country" question
   aimed at a 9-year-old. Swapped to South Africa instead.
5. Add a row to `public/images/CREDITS.md` with the file, source link,
   author, and license.
6. Avoid countries with genuinely ambiguous simple-MC answers — e.g. South
   Africa's three capitals (Pretoria/Cape Town/Bloemfontein) make it a bad
   fit for a "what is the capital" question; used it only for a "name the
   country" question instead.

## Hard lesson: map question prompts MUST be textually unique per item

`dedup.ts` (Step 5) rejects **exact-duplicate prompts within the same
batch**, not just against the existing seed file — this is intentional
(it's the same check that guards against re-merging an already-seeded
question). A first attempt at this batch used two generic templates
("Look at the map. Which country is shaded in green?" /
"...What is the capital city of this country?") across all 12 map
questions and lost 10 of them to this check. Fix: give every map
question's prompt genuinely distinct wording, e.g. work in the region/
continent as a textual hint ("Look at this map of East Africa. One
country is shaded in green. What is its capital city?") instead of a
bare template — still doesn't give away the answer, but makes the prompt
string unique. Verify with a quick Python/JS uniqueness check on
`02-transformed.json` before running the pipeline scripts, to catch this
before spending a run on it.

## Level-band guidance from this batch

- Easy/Age 9: widely-known facts (France/Japan/Russia/Canada on a map,
  Nile as Africa's longest river, Kilimanjaro as Africa's tallest, Mount
  Fuji in Japan, Great Plains in the US, Kalahari in Africa).
- Age 9 HA / Age 10: still-common but less universally known facts (Ganges
  in India, Yangtze as Asia's longest, Aconcagua/Denali as continent-tallest,
  Karakoram/K2, Vesuvius/Pompeii — NOTE: "name this volcano" alone is
  recall, not reasoning, so keep pure-recall volcano/landmark-naming items
  in a plain band, not High Achiever, per self-audit's recall-vs-reasoning
  check).
- Age 11 / Age 11 HA: genuinely obscure or counter-intuitive facts (Danube
  flowing through ~10 countries — more than any other river; Amazon's name
  origin from Greek mythology via a 1542 Spanish expedition; Elbrus vs.
  Mont Blanc as Europe's actual tallest mountain; Mauna Loa as the largest
  active volcano by volume; Antarctica technically being the world's
  largest desert; Pampas/Serengeti/North European Plain specifics).

Expect `self-audit.ts` to flag most/all Age 11 and Age 11 HA items as
`age-band-mismatch` ("low difficulty-heuristic score") — this is a known,
documented false-positive pattern (see the pipeline README's "Known gaps":
the heuristic counts digits/decimals/fractions/percent signs, so any
prose-only trivia fact scores 0 regardless of how obscure the fact
actually is). Use judgment on whether the fact is genuinely obscure/
counter-intuitive for the assigned band rather than reflexively
downgrading everything the script flags.

## Required automated verification sequence (replaces manual sign-off)

Run the full sequence below and treat a clean pass as sufficient to merge
— this project's owner has said explicitly they want automated
verification to stand in for their manual review on these batches. Do NOT
skip straight to `merge.ts`.

```
# 1. Write 02-transformed.json by hand (subject/topic/levelBand/prompt/
#    optionA-D/correctOption/explanation/answerType:"fact"/factClaim per
#    item, image/imageAlt for map items) into a new batch directory under
#    research/pipeline/.

# 2. Run the deterministic half:
npx tsx research/pipeline/scripts/run-batch.ts <batch-dir> geography "original-authorship (user-provided framework)"
#    This runs verify -> dedup -> rebalance -> self-audit -> stage.
#    Check the dedup output for batch-internal rejects (see the map-prompt
#    lesson above) and fix+re-run before proceeding if any appear.

# 3. Fact-check every item (verify.ts will refuse to let fact items reach
#    staging without this). List what needs checking:
npx tsx research/pipeline/scripts/apply-fact-check.ts <batch-dir> --list
#    Independently WebSearch each factClaim (don't rely on memory alone
#    for anything you're not highly confident is uncontested/encyclopedic
#    — national capitals of major countries, "Everest is tallest" etc. can
#    be hand-verified per the va-sol-worldgeo-2007 precedent, but specific
#    numbers/counts/origins should get an actual search). Write
#    <batch-dir>/fact-check-results.json as documented in the --list output.
npx tsx research/pipeline/scripts/apply-fact-check.ts <batch-dir> --apply
#    This overwrites verified.json with factVerified markers — re-run
#    dedup -> rebalance -> self-audit -> stage manually from here (NOT
#    run-batch.ts again, which would call verify.ts fresh and wipe the
#    fact-check markers):
npx tsx research/pipeline/scripts/dedup.ts <batch-dir>/verified.json geography <batch-dir>
npx tsx research/pipeline/scripts/rebalance.ts <batch-dir>/deduped.json <batch-dir>
npx tsx research/pipeline/scripts/self-audit.ts <batch-dir>/deduped.json <batch-dir>
npx tsx research/pipeline/scripts/stage.ts <batch-dir> geography "original-authorship (user-provided framework)"

# 4. Sanity-check staging.json directly (image paths exist, no duplicate
#    prompts, level-band spread looks right) before merging.

# 5. Merge:
npx tsx research/pipeline/scripts/merge.ts <batch-dir>/staging.json geography

# 6. Re-run the app's own checks: npx tsc --noEmit && npm run build,
#    plus a Python/jq parse-check on the updated data/seed/geography.json.
```

---

## Ready-to-fire prompt for the next batch

Copy this into a fresh session (or hand to a subagent) to generate another
round using this format. Fill in the bracketed fields.

```
You are authoring original geography questions for StudyLadderApp
(a study app for one 9-year-old — maths, english, geography, space,
science). No exam-archive or worksheet source exists for rivers/
mountains/capitals content at grade 3-5 (confirmed exhaustively — see
research/pipeline/original-world-geography-capitals-rivers-mountains/01-source-note.json
and research/pipeline/ORIGINAL-AUTHORSHIP-TEMPLATE-geography-capitals-rivers-mountains.md,
which you should read in full before doing anything else, along with
research/pipeline/README.md's "Per-source workflow" section for the
shared Steps 4-7 tooling).

FIRST: check current counts before picking what to cover — read
data/seed/geography.json and count level-band totals and existing
capitals/rivers/mountains/deserts/plains coverage (grep for these
keywords in existing prompts) so you don't duplicate what's already
there.

YOUR TARGET: [N] new questions, targeting [level bands / topics — e.g.
"fill out desert and plains coverage, currently thin" or "extend to
[list of new countries] for the map-based capitals format"].

Follow the format exactly as documented in the template file above:
capitals/countries (map-based types 1 & 2, plus plain-text type 3),
rivers, mountains, deserts, plains. Follow the map-image sourcing recipe
exactly (Wikimedia's orthographic-projection file series, visual
inspection before use, CREDITS.md entry per image). Give every map
question's prompt distinct wording per the "hard lesson" section — verify
uniqueness programmatically before running the pipeline.

Run the FULL "Required automated verification sequence" from the template
file, including independent web-search fact-checking of every factClaim.
A clean pass through that sequence (0 duplicate/structural rejects, all
facts confirmed, self-audit flags reviewed and judged rather than
reflexively obeyed) is sufficient to merge — no manual sign-off step is
required for this content type, per project owner's explicit instruction
(2026-08-20). Report back with the summary.md contents and merge result.
```
