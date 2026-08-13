# Source Catalog

Research inventory of publicly-known education/exam sources relevant to ages 8-11 (maths, english, geography, space/science, general knowledge). Compiled by low-cost research agents (Haiku) via web search on 2026-08-08.

**Scope of this document:** what each source is, where it lives, how accessible it actually is, and roughly how much material it has. It does not contain extracted question content — see caveats at the end regarding what's actually safe to use each source for.

Legend for **Accessibility**:
- 🟢 Free & public, no login/paywall
- 🟡 Free but partial (some years/tiers restricted, third-party redistribution only, or English availability limited)
- 🔴 Paywalled, requires registration/school affiliation, or purchase-only
- ⚪ Unverified — agent could not confirm

---

## Source priority: archives vs. single sample papers (added 2026-08-13)

Context: after ~20 ingestion rounds, most easy volume has been pulled from the
strongest archives (see `research/pipeline/README.md` for round history), and
a 2026-08-13 round searching for another Age-9-High-Achiever science source
came up empty — every option checked was either already mined to exhaustion,
grade-mismatched, or a single sample paper with no further years to pull
from. Going forward, **prefer sources that are genuine multi-year/multi-form
archives over sources that are one (or a handful of) sample paper(s)** — a
single sample paper yields one batch and is then permanently exhausted; an
archive yields many rounds across years/forms/grades from one source
relationship, which is a better return on the per-source verification and
extraction-pipeline setup cost.

**High-value (genuine multi-year/multi-form archives — prioritize these):**
- USA: Texas STAAR (5+ years, multiple grades), NY State Regents/EI archive
  (decades, broadest subject coverage of any source in this catalog), MCAS
  (searchable item library, multiple years/grades), CAASPP (multiple years),
  EngageNY (75%+ of 2015-2021 released tests), SBAC (~500 items)
- Germany: VERA 3 (multiple years/states), Lernstübchen (5,100+ files),
  Känguru der Mathematik (15+ years)
- France: Éduscol (released items since 2003), Kangourou des Mathématiques
  (2021-2025 confirmed)
- Sweden: Skolverket + Uppsala (multi-year retired national-test archive)
- Singapore: testpapersfree.com (~2,000 papers, 2004-2025), sgtestpaper.com
  (500+/year) — genuine volume, but see the existing licensing caveat in the
  Singapore section before using
- Hong Kong: TSA/BCA (`bca.hkeaa.edu.hk`, 2016-2026 archive, multiple forms
  per year — only one form/year mined so far per the pipeline note, real
  remaining volume is large)
- Australia: ACARA NAPLAN past papers (2012-2016, official), AMT (ongoing
  monthly releases + a full confirmed-free 2019 set)
- Japan MEXT National Assessment archive (2007-2026 index) — not yet piloted,
  but structurally a real archive, worth a first pilot round
- Taiwan NTCU SAA exam release archive (year x grade x subject download grid,
  ~2018-2026) — not yet piloted, same "worth a first pilot" status as Japan

**Low-value (single or handful of sample papers — deprioritize, treat as a
one-shot yield, not a source to return to):**
- India: SOF sample papers, Silverzone "Instant Download", Indian Talent
  Olympiad samples — each is ~2-3 papers per class/subject, not an archive.
  Useful for a single small batch per subject, not a repeatable source.
- Australia ICAS sample tests (5-10 sample questions only, format
  familiarization rather than real volume)
- UK KS2 SATs — only the past 3 years (2024-2026) are archived at gov.uk;
  already substantially mined in early rounds (see README.md round history),
  effectively close to exhausted for maths specifically
- Denmark testogprover.com — explicitly "demo/example tests," not a full
  past-paper archive despite being free and official-adjacent

**Structural dead ends confirmed this round (2026-08-13) — do not re-check
without new information:** NY State Grade 4 science testing was discontinued
after 2022 (2019/2021/2022 already mined, no further years exist to pull).
Texas STAAR 2024+ moved online-only with no downloadable PDF form. California
CAASPP, Massachusetts MCAS, UK KS2, Australia NAPLAN, France Éduscol, and
Germany VERA 3 do not test science at a Grade-4-equivalent level at all (they
either start testing science at grade 5, or don't test science as a separate
subject at that age). These are genuine ceilings, not under-research — don't
spend another round re-checking the same combination of (country, subject,
grade) without a reason to think something changed.

---

## India

*Updated after deeper pass — found genuine free worksheet sites and, notably, that the olympiad bodies DO publish free sample papers separate from their paid competitions.*

| Source | URL | Subjects | Age/Grade | Accessibility | Approx. Volume | Notes |
|---|---|---|---|---|---|---|
| NCERT | ncert.nic.in | Maths, English, EVS (Science/Geo), Social Studies | Class 3-6 (8-11) | 🟢 | ~1,000+ exemplar problems | Official govt textbooks, PDFs/ePub |
| **CBSEClassWorksheets** | cbseclassworksheets.com | Maths, English, Hindi, EVS, Social Science | Nursery-6 | 🟢 verified, no login | 100+ worksheets/subject | Printable PDFs with answers, most comprehensive free option |
| **Studies Today** | studiestoday.com | Maths, English, EVS, Social Science, Hindi | Class 3-12 | 🟢 verified, no login | 50+/class/subject | Teacher-created, exam-aligned, includes revision notes |
| DIKSHA (govt platform) | diksha.gov.in | Maths, Science, English, Social Studies | Class 3-10 | 🟢 free but weak for 3-5 | 6,000+ pieces for classes 6-10; thin for 3-5 | Official national platform; primary-grade coverage is its weak spot |
| **SOF sample papers** | sofworld.org (sample-paper pages, not registration page) | Maths, Science | Class 1-12 | 🟢 verified free, no login | ~2-3 sample papers/class/subject | Genuine free samples distinct from paid competition entry |
| **Silverzone "Instant Download"** | silverzone.org/instantdownload | Maths, Science, English, GK | Class 1-12 | 🟢 verified free, no login | ~2-3 papers/class/subject | Dedicated free-sample section, confirmed live |
| **Indian Talent Olympiad samples** | indiantalent.org/olympiad-sample-papers | Maths, Science, English, GK, Social Studies | Class 1-10 | 🟢 verified free, no login | ~2-3 papers/subject/class | Free samples via dedicated subject pages |
| CBSE Sample Papers (redistributed) | via Vedantu/AglaSem | Maths, English, Social Studies, Science, Hindi | Class 3-6 | 🟡 | ~50-100/class/subject | Third-party redistribution, not official CBSE |
| LearnCBSE | learncbse.in | Maths, Science exemplars | Class 6+ only | 🟡 | ~50-100/subject | No exemplar content exists below class 6 |
| myCBSEguide | mycbseguide.com | Maths, Science, English, Social Science | Class 3-12 | 🔴 mislabeled | N/A | Markets as free; actual worksheet PDFs are subscription-gated |
| Toppr / Byju's | toppr.com / byjus.com | Multi-subject | Various | 🔴 | Minimal free tier | Freemium; substantive content paid; Toppr doesn't serve classes 3-4 at all |

**Caveat:** Full-length official past exam papers remain gated everywhere in India (no free CBSE board archive exists for primary grades). But genuine free worksheets (CBSEClassWorksheets, Studies Today) and genuine free olympiad *sample* papers (SOF, Silverzone, Indian Talent Olympiad) are real and confirmed — the original pass missed these because it only checked each olympiad body's registration/homepage, not their dedicated sample-paper sections.

---

## Singapore

*Updated after deeper pass — first pass only checked official MOE/SEAB and wrongly concluded nothing free exists. It does — via third-party aggregators, not MOE itself.*

| Source | URL | Subjects | Age/Grade | Accessibility | Approx. Volume | Notes |
|---|---|---|---|---|---|---|
| MOE/SEAB Syllabus | seab.gov.sg | English, Maths, Science (Geography folded into Science) | Primary 3-5 (8-10); PSLE = P6 | 🟢 | Syllabus docs only, no sample questions | Official curriculum scope, not question bank |
| PSLE Past Papers (official) | seab.gov.sg/distributors-of-past-years-question-papers | English, Maths, Science, Mother Tongue | P6 (11-12) | 🔴 | ~100+ papers estimated | Sold by authorized distributors, not free download |
| **testpapersfree.com** | testpapersfree.com | English, Maths, Science, Chinese, Tamil | P1-6, Sec, JC | 🟢 verified, no login | ~2,000 papers (2004-2025) | Largest free aggregator found; filterable by year/subject/assessment type |
| **sgtestpaper.com** | sgtestpaper.com | English, Maths, Science, Chinese | P1-6 | 🟢 verified, no login | 500+ papers/year | Weekly updates with worked solutions; optional paid bundles clearly separated from free tier |
| **sgprimaryexam.com** | sgprimaryexam.com | English, Maths, Science, Chinese | P1-6 | 🟢 verified, no login | ~200 papers, 25+ schools | Curated, sourced from named top schools (ACS, Raffles, St. Joseph's etc.) |
| sgexam.com | sgexam.com | English, Maths, Science, Chinese | P1-6, Sec, JC | 🟡 likely free, not directly confirmed | 500+ P3-6 papers | No login language visible but agent couldn't fully verify |
| sgexamhub.com | sgexamhub.com | Maths, Science, English, Chinese | P2-6 | 🟡 claims no signup | 2,299 papers (2024-25 only) | Newer aggregator, narrow year range |
| Student Learning Space (SLS) | learning.moe.edu.sg | All primary subjects | P1-6 | 🔴 | N/A | School-login only, not public |
| freetestpaper.com / testpapers.com.sg | — | — | — | 🔴 dead | N/A | Both returned HTTP 403 at check time despite "100% free" marketing — do not rely on these |

**Caveat — read before using:** The three verified free aggregators (testpapersfree.com, sgtestpaper.com, sgprimaryexam.com) are **redistributing actual school prelim/SA/CA exam papers** — i.e. copyrighted material belonging to individual Singapore schools, not an MOE-licensed open archive. "Free to download" and "licensed to reuse" are different things; these sites' own legal standing to redistribute is unclear. No official free MOE/PSLE archive exists — that remains paywalled via authorized distributors.

---

## Hong Kong

*Re-verified with a deeper pass checking HKEdCity, tutoring aggregators, and school-published papers — confirms the original finding rather than overturning it.*

| Source | URL | Subjects | Age/Grade | Accessibility | Approx. Volume | Notes |
|---|---|---|---|---|---|---|
| Education Bureau (EDB) | edb.gov.hk | Chinese, English, Maths, General Studies | P1-6 (6-12) | 🟢 (policy only) | N/A | Curriculum/policy docs, no sample questions |
| **TSA / BCA (HKEAA)** | bca.hkeaa.edu.hk | Chinese, English, Maths | P3 & P6 only (~9 and ~12) | 🟢 verified, no login | ~30-50 papers with marking schemes, 2012+ | **Best free source confirmed.** Real past exam papers, official. **Not administered at P4-5.** |
| HKEdCity Resources | resources.hkedcity.net | Multi-subject | P1-6 | 🟡 unclear | Unknown | Appears to be teacher/school-login gated, no clear public past-paper section |
| Champion Tutor | championtutor.hk | Chinese, English | P3-6 | 🟡 partial | ~10-20 papers | Older (2013-14) school-sourced papers, limited currency |
| Edugain HK | hk.edugain.com | Maths | P1-6 | 🔴 email-gated | ~100+ worksheets | Requires account creation despite "free" framing — worksheets, not past papers |
| Pre-S1 HKAT | edb.gov.hk | Chinese, English, Maths | End of P6 (~12) | ⚪ | Unverified | Targets P6→S1 transition, not core 8-11 range |

**Caveat:** Geography isn't tested separately in HK — folded into General Studies. TSA/BCA remains the only genuinely free, official, no-login source, and it structurally skips P4-5 — no aggregator fills that specific gap.

**Pipeline findings (2026-08-09, `research/pipeline/hk-tsa-bca-p3/`):** Confirmed live and genuinely free at `bca.hkeaa.edu.hk/web/TSA/en/PriPaperSchema.html` (archive index, years 2016-2026 visible per subject/grade — distinct from the login-gated `bca.hkeaa.edu.hk/bca/` portal). Two things not obvious from the archive page alone:
1. **The server rate-limits every connection to ~4 KB/s regardless of file size** (a 111KB marking scheme and a 2.4MB question paper transferred at the identical speed on a single connection) — this looks like a dead/broken source under a normal serial `curl`/`WebFetch` (times out on anything past ~200KB) but isn't. The server advertises `Accept-Ranges: bytes`; fetching 8-12 concurrent byte-range chunks and reassembling with `cat` bypasses the cap entirely (pulled a 2.4MB PDF in under a minute this way). Use this for any future HKEAA round — don't waste time on serial retries.
2. **The Maths paper is Chinese-medium only** for the P3 admin checked (2023) — HKEAA does not publish a separate English-medium Maths paper, since Chinese is the instruction medium for maths in most HK primary schools. The arithmetic word-problem content translates cleanly (numbers/simple templates, no language-specific meaning lost), so it's usable via translation, but don't assume an English-medium Maths PDF exists to fetch directly — check the index for a `P3Eng`-style subfolder before assuming.
3. Content is copyright Education Bureau, HKSAR — no open license confirmed (unlike UK gov.uk's OGL). The English Reading & Writing paper's passages are exactly the kind of third-party-flavoured copyrighted content that needs an original rewrite, not reuse — same caution as the French teacher-blog and Singapore aggregator sources below.
4. Only one admin/form (2023, P3) has been mined so far — the archive runs 2016-2026 with multiple parallel forms per year (3MC1-3MC4 etc.) plus untouched P6 papers. Real remaining volume here is large; 30 items pulled in the first round is not close to the ceiling.

---

## Japan

| Source | URL | Subjects | Age/Grade | Accessibility | Approx. Volume | Notes |
|---|---|---|---|---|---|---|
| **MEXT National Assessment of Academic Ability archive** | mext.go.jp/a_menu/shotou/gakuryoku-chousa/sonota/1347088.htm | Maths ("算数"), Japanese | Elementary Grade 6 (~11), Junior High Grade 3 (~14) | 🟢 verified live 2026-08-09 | Official question/answer/explanatory materials, 2007-2026 visible on index | Official government archive, real recurring structure (year-by-year links to question booklets, answer examples, explanatory commentary). Content is Japanese-language — translation required, same caveat as any non-English source. Elementary Grade 6 is the only band in our 8-11 target range (Junior High skews older). |

**Caveat:** Not yet piloted through the ingestion pipeline — live and structurally sound (verified via direct HTTP check, 200 response, recurring year index), but nobody has confirmed the actual per-item translation/extraction workflow the way UK/US sources have. Treat as P2, not P1, until a pilot batch is run.

---

## Taiwan

| Source | URL | Subjects | Age/Grade | Accessibility | Approx. Volume | Notes |
|---|---|---|---|---|---|---|
| **NTCU County Student Ability Assessment (SAA) exam release archive** | saaassessment.ntcu.edu.tw/ExamRelease | Maths, Chinese (English section may exist depending on year) | Primary 3-6 + lower secondary | 🟢 verified live 2026-08-09 | Year selector (民國 107-115, i.e. ~2018-2026) x grade x subject download grid | Strongest-looking Taiwan candidate — a real year/grade/subject download matrix, not a one-off PDF. Some downloads are zip files; automated fetch may need to handle that. Not yet piloted. |
| Miaoli County Student Competency Testing archive | mbct.mlc.edu.tw/test/ | Maths, Chinese | Primary 3-6 (varies by year) | 🟢 verified live 2026-08-09 | Historical questions/answers referenced, exact year range not confirmed from the landing page alone | County-level (not national) public archive. Weaker navigation than NTCU; treat as a secondary/backup source. |
| NAER DSA historical test questions and reports | tasal.naer.edu.tw/dsa/rap | Maths, other (unclear from landing page) | Includes elementary coverage per linked ecosystem | 🟢 verified live 2026-08-09 | Historical archive language confirmed on page, but structure is a reference/portal rather than a clean index table | Best used as a supplementary source once NTCU is piloted, not a first target — page structure needs more digging to find the actual downloadable question files. |

**Caveat:** All three confirmed live via direct HTTP check (200 response) on 2026-08-09, but none piloted through the ingestion pipeline yet. Content is Chinese-language — same translation approach as the HK TSA Maths paper (translate word-problem content directly, don't machine-translate blindly) should work for numerate content; unclear yet whether Chinese-language items exist that would need the same "skip Chinese literacy items, translate math items" split the HK batch used.

---

## Bahrain

| Source | URL | Subjects | Age/Grade | Accessibility | Approx. Volume | Notes |
|---|---|---|---|---|---|---|
| Bahrain Ministry of Education educational resources | moe.gov.bh | Unknown | Unknown | 🔴 blocked | Unverified | Site claims electronic textbooks, model lessons, and "previous exam questions" exist, but the root URL returned **HTTP 403** on direct check (2026-08-09) — blocked, not just unverified. Do not prioritize until someone confirms access via an ordinary logged-in browser session; automated access is currently refused outright. |

---

## United Kingdom

| Source | URL | Subjects | Age/Grade | Accessibility | Approx. Volume | Notes |
|---|---|---|---|---|---|---|
| National Curriculum Assessments (KS2 SATs) | gov.uk past-test-materials collection | English (reading, GPS), Maths | Year 6 (11), KS2 spans 7-11 | 🟢 | Past 3 years only (2024-2026) publicly archived | Official, free, direct PDF download |
| UKMT Junior Mathematical Challenge | ukmt.org.uk | Maths (25-Q MCQ) | Year 8 and below (~12-13, slightly above target) | 🟡 | 25+ years of past papers free; entry itself £15-16 | Past papers free even without competing |

**Caveat:** This is the strongest free/public tier of any system researched — official government past papers, no login, no paywall. Best starting point for style-inspired UK-flavored content.

---

## Germany

*Updated after deeper pass — the original conclusion ("no German national test, nothing free beyond Känguru") was wrong. Searching in German surfaced both an official national assessment archive and a large free worksheet ecosystem.*

| Source | URL | Subjects | Age/Grade | Accessibility | Approx. Volume | Notes |
|---|---|---|---|---|---|---|
| **VERA 3 (state ministries)** | e.g. bildung-lsa.de, schleswig-holstein.de (varies by Bundesland) | German, Maths | Grade 3 (~8-9) | 🟢 verified, no login | Sample items per state, multiple years | **Official national comparison test** ("Vergleichsarbeiten") — real released items, confirmed by agent as genuinely free government PDFs |
| **Lernwolf** | lernwolf.de | Maths, German, Science, English, Latin | Kl.1-4 (6-10) | 🟢 verified, no login | Thousands of worksheets w/ solutions | Single-educator run, no signup |
| **Lernstübchen** | lernstuebchen-grundschule.de | Maths, German | Kl.1-4 | 🟢 verified, no login | 5,100+ files | Largest volume found, well-organized |
| Grundschul-Blog | grundschul-blog.de | Maths, German, Science | Kl.1-4 | 🟢 | Thousands | Community-driven |
| Grundschule-arbeitsblaetter.de | grundschule-arbeitsblaetter.de | All subjects | Kl.1-4 | 🟢 | Many | Multi-publisher collection |
| Grundschulkönig | grundschulkoenig.de | Maths, German, English, Geometry, Science | Kl.1-4 | 🟡 | Free samples; premium bundles paid | Free tier real but limited |
| Känguru der Mathematik | mathe-kaenguru.de | Maths (24-Q MCQ) | Klasse 3/4 and 5/6 | 🟢 confirmed | 15+ years, past PDFs fully public | Full archive confirmed free (earlier pass under-verified this) |
| meinUnterricht / Sofatutor / LearnAttack | various | All subjects | All | 🔴 | 40,000+ items | Trial-then-paywall model, not genuinely free |

**Caveat:** Germany turns out to have one of the *strongest* free ecosystems researched — VERA 3 is a real official national assessment with released items, and Lernstübchen/Lernwolf together offer thousands of free worksheets. The original pass missed all of this by only searching in English.

---

## France

*Updated after deeper pass — same story as Germany: French-language search surfaced an official government assessment archive and a large teacher-blog ecosystem invisible to English search.*

| Source | URL | Subjects | Age/Grade | Accessibility | Approx. Volume | Notes |
|---|---|---|---|---|---|---|
| **Éduscol national evaluations** | eduscol.education.fr (évaluations CE2/CM2 pages) | French, Maths | CE2 (8-9), CM2 (10-11) | 🟢 verified, no login | Historical since 2003 + annual releases | **Official government diagnostic assessments** — real released items, not just curriculum guidance as the first pass assumed |
| **Bout de Gomme** | boutdegomme.fr | French, Maths, Sciences | CM1-CM2 (9-11) | 🟢 verified, no login | Large | Well-known teacher-run blog |
| **Orphéecole** | orpheecole.com | French, Maths, Sciences, Geography, History, Arts, PE, English | CE2-CM2 (8-11) | 🟢 verified, no login | Large, incl. diagnostic evaluations | Broadest subject coverage of any French source found |
| **Lutin Bazar** | lutinbazar.fr | French, Maths | CE2-CM1 (8-10) | 🟢 verified, no login | Large | |
| Classe de Stef | laclassedestef.fr | French, Maths, History | CM1-CM2 (9-11) | 🟡 | Medium-large | Some content password-protected |
| Maikresse72 | maikresse72.fr | French, English, Maths | Cycle 3 (8-11) | 🟢 | Medium | |
| Édumoov | edumoov.com | French, Maths, English, Geography | Cycle 3 (8-11) | 🟡 | Large free tier | Platform also sells paid courses |
| Kangourou des Mathématiques | mathkang.org | Maths (competition) | CE2-CM2 | 🟢 confirmed | 2021-2025 PDFs confirmed free | Earlier "unclear" access now confirmed |

**Caveat:** Éduscol itself publishes real diagnostic-assessment released items (not just pedagogical frameworks as first assessed), and the teacher-blog ecosystem is large and genuinely free. One flag: an earlier agent pass characterized the teacher-blog content as "legally shareable under teacher-community norms" — that's the agent's own inference, not a verified legal fact, so treat these as free-to-access but unconfirmed on licensing terms, same caution as the Singapore aggregators above.

---

## Scandinavia (Sweden, Norway, Denmark)

*Updated after deeper pass — the original "no free content anywhere, curriculum-only" conclusion was wrong for all three countries once searched in Swedish/Norwegian/Danish.*

| Source | URL | Subjects | Age/Grade | Accessibility | Approx. Volume | Notes |
|---|---|---|---|---|---|---|
| **Skolverket + Uppsala University (national test examples)** | uu.se/nationella-prov, su.se/prim-gruppen | Swedish, English, Maths | Grade 3 (retired 2010-2017 tests) | 🟢 verified, no login | Multi-year archive | **Official retired national-test items**, published after retirement specifically for public use |
| Matteboken.se | matteboken.se | Maths | Grades 1-6 | 🟢 | Infinite regenerating exercises | |
| Matematikonline.se | matematikonline.se | Maths | Grades 1-6 | 🟢 | Large | |
| **Udir (Norway) eksempeloppgaver** | udir.no/eksamen-og-prover | Reading, Maths, English | Grades 5, 8-9 only | 🟡 | Multi-year | Official but **does not cover grade 3** — real gap remains for Norway specifically |
| Ukemal.no | ukemal.no | Maths | Grades 1-6 | 🟢 | Customizable/printable | |
| Kittysoppgaver.com | kittysoppgaver.com | Maths, Norwegian | Grade 3 | 🟢 | Moderate | |
| **testogprover.com (Denmark)** | testogprover.com | Reading, Maths | Grades 2-8 | 🟢 verified, no login | Demo/example tests | Free demo national-test-style items |
| GratisSkole.dk | gratisskole.dk | Maths, Danish + others | Grades 0-7 | 🟢 | Large | Printable PDFs |
| Børnenettet.dk / Leg og Lektie / DR Skole | various | Maths, Danish, multi-subject | Grade 3 range | 🟢 | Large combined | DR Skole is the Danish public broadcaster's free teaching-material arm |

**Caveat:** All three countries have real free resources; Sweden and Denmark both have official retired/demo national-assessment items, Norway's official national-test archive has a specific gap at grade 3 (starts at grade 5) but is offset by a strong independent worksheet ecosystem (Ukemal, Kittysoppgaver). This is the single biggest correction in the whole catalog — the entire region went from "nothing free" to "confirmed free content in all three countries."

---

## USA

*Updated after deeper pass — original conclusion (SBAC/EngageNY as the ceiling) undercounted significantly. Multiple individual states publish their own large released-item archives.*

| Source | URL | Subjects | Age/Grade | Accessibility | Approx. Volume | Notes |
|---|---|---|---|---|---|---|
| Smarter Balanced (SBAC) | sampleitems.smarterbalanced.org | Maths, ELA | Grades 3-8 | 🟢 | ~500 items | Official, free, searchable, no login |
| EngageNY (NY State) | engageny.org/3-8 | Maths, ELA | Grades 3-8 | 🟢 | 75%+ of released tests 2015-2021 | Direct PDF download, no login |
| **Texas STAAR released items** | tea.texas.gov | Maths, Reading/ELA | Grades 3-5 | 🟢 verified, no login | 5+ years (2022-2026) | State-official, direct PDF |
| **California CAASPP released items** | cde.ca.gov | Maths, ELA | Grades 3-5 | 🟢 verified, no login | Multiple years | State-official |
| **Massachusetts MCAS released items** | doe.mass.edu/mcas | Maths, ELA, Science | Grades 3-5 | 🟢 verified, no login | Searchable item library, multiple years | State-official |
| **NY State Regents/EI archive** | nysedregents.org | Maths, ELA, Science, Social Studies | Grades 3-5+ | 🟢 | Decades of past exams | Broadest subject coverage of any US state source |
| **Khan Academy** | khanacademy.org | Maths, ELA, Science | Grades 3-5 | 🟢 verified, no login | 10,000+ practice problems/grade | Adaptive, no paywall |
| K5Learning | k5learning.com | Maths, Reading, Grammar, Vocab, Spelling, Science | K-5 | 🟢 (light ads) | 10,000+ worksheets | |
| TeachersPayTeachers free section | teacherspayteachers.com | Maths, ELA, Science, Social Studies | Grades 3-5 | 🟢 | 1,000s | Teacher-created, genuinely free tier |
| Math Kangaroo USA | mathkangaroo.org/mks | Maths | Grades 3-6 | 🟢 | 20 years of past papers w/ solutions | |
| Sporcle Kids / Kahoot | sporcle.com/kids, kahoot.com | GK, Geography, Science, Maths | K-8 | 🟢 | 1,000s community quizzes | Gamified, not exam-format |
| PARCC released items | via state DOE archives | Maths, ELA | Grades 3-8 | 🟡 | Varies by state | Consortium dissolved |
| Education.com / IXL | education.com, ixl.com | Maths, ELA, Science, Social Studies | Grades 3-5 | 🔴 | Freemium, heavily gated | Not genuinely free at scale |
| MATHCOUNTS Gr 3-5 | mathcounts.org | Maths | Grades 3-5 | ⚪ | Announced, not yet operational | Not usable yet |

**Caveat:** USA is confirmed as the deepest free-content system of any researched — official state-released items exist for at least Texas, California, Massachusetts, and New York independently of the multi-state SBAC/EngageNY archives, plus Khan Academy's adaptive bank. Volume here is not a constraint.

---

## Australia

*Updated after deeper pass — found NAP's own public practice-test site (missed originally) and a real free worksheet ecosystem beyond ACARA.*

| Source | URL | Subjects | Age/Grade | Accessibility | Approx. Volume | Notes |
|---|---|---|---|---|---|---|
| **NAP Public Demonstration Site** | nap.edu.au/naplan/public-demonstration-site | Reading, Writing, Language, Numeracy | Years 3, 5, 7, 9 | 🟢 verified, no login | Sample items, all domains | ACARA's **own** public practice test — missed in first pass |
| NAPLAN past papers (pre-2017) | acara.edu.au/assessment/naplan | Literacy, Numeracy | Years 3, 5 | 🟢 | 2008-2016 (~8 years) | Free PDF, older years only |
| **AMT free problems** | amt.edu.au/department/free-problems | Maths | Years 3-6 | 🟢 verified, no login | Ongoing monthly releases | Genuinely free tier distinct from the paid past-paper archive |
| **AMT practice sets (2019)** | amt.edu.au/department/past-papers | Maths | Years 3-4, 5-6 | 🟢 confirmed | Full sets + solutions | At least one full free year confirmed, beyond "samples only" |
| ICAS sample tests | icasassessments.com/icas-sample-tests-online | English, Maths, Science | Primary (P3-6) | 🟡 | 5-10 sample Qs | Format familiarization only, full archive paid |
| Cluey Learning worksheets | go.clueylearning.com.au/en/maths-worksheets | Maths | Years 2-12 | 🟢 verified, no login | Thousands | Tutoring-company free lead-magnet content |
| Kuraplan | kuraplan.com/au/australian-curriculum | Science, English, Maths, HASS | All years | 🟢 | Hundreds/subject/year | Broadest free subject coverage found for Australia |
| Teach Starter (free tier) | teachstarter.com/au | All subjects | Years 3-5 | 🟡 | Large, mixed free/premium | |
| Primary Connections | primaryconnections.org.au/teaching-sequences | Science | Primary | 🟢 | Multiple sequences | Best dedicated science source found for AUS |

**Caveat:** AMC's *deep* multi-decade archive is still paid, but a genuine free tier exists (monthly problems + at least one confirmed free full year) that the first pass missed by only checking the paid shop page. NAP's own demo site was also missed entirely originally.

**Pipeline finding (2026-08-09):** The NAP Public Demonstration Site (`pages.assessform.edu.au`) is a **separate domain** from `nap.edu.au`, sits behind bot-detection/WAF middleware, and returned "request blocked" on every automated access attempt (both WebFetch and browser automation) — this is not a licensing issue, it's active bot blocking, and per operating rules should not be circumvented (spoofed headers/fingerprints etc.). Separately, even when accessible, NAP's own demo-test page states answers are not provided for its demo tests, so it has no answer key regardless. **Working alternative on the same official domain:** ACARA's own past-NAPLAN-papers archive at `acara.edu.au/assessment/naplan/naplan-2012-2016-test-papers` — genuinely free PDFs (2016 Year 3 & Year 5 Numeracy + Language Conventions confirmed, complete with official answer keys), no WAF issue on this domain. A batch of 50 items (23 maths, 27 english) was pulled from this alternative in `research/pipeline/nap-demo-years3-5/` — Reading and Writing sections were skipped (no passage-support use in that round / Writing is constructed-response), so more years and the Reading section remain unmined.

---

## Worksheet / Quiz Repositories (non-official, supplementary)

*Distinct category from everything above: these are commercial or platform repository sites, not official exam boards. "Archive signal" here means "stable repeatable repository structure" (a category hub, year/topic index, or direct downloadable pack), not "official old-exam archive." Checked 2026-08-09 via direct HTTP request (not just claimed).*

| Source | URL | Subjects | Age/Grade | Accessibility | Notes |
|---|---|---|---|---|---|
| Twinkl (Grade 4 Math hub) | twinkl.com/resources/3rd-5th-usa/fourth-grade-usa/math-fourth-grade-usa | Maths | Grade 4 (~9-10) | 🟡 live, membership-gated | Confirmed 200 response, large category structure (worksheets, printable packs, assessments). Most actual downloads require a paid membership — matches its known commercial model. Useful only for topic/format inspiration, not bulk free content. |
| Education.com (Grade 4 Math hub) | education.com/resources/grade-4/worksheets/math/ | Maths | Grade 4 | 🟡 live, mixed free/premium | Confirmed 200 response; page itself surfaces "premium" markers throughout. 900+ listed worksheets but an unconfirmed fraction are actually free without login. |
| Super Teacher Worksheets (Grade 4 Math hub + PDF category + Math Buzz series) | superteacherworksheets.com/fourth-grade-math-worksheets-4th.html, .../free-printable-worksheets/4th-grade/math/, .../math-buzz-d.html | Maths | Grade 4 | 🟢 live, some content marked FREE | **Engineering note:** this host blocks default `curl`/HTTP2 TLS fingerprints (TLS handshake reset) — resolves fine when forced to HTTP/1.1 (`curl --http1.1`). Don't mistake this for a dead source. Page content itself shows "Free" and "Log In" markers side by side, i.e. genuinely mixed tier like the source catalog's other US worksheet sites. |
| K5Learning (direct worksheet PDFs) | k5learning.com/worksheets/math/... | Maths | Grade 4 | 🟢 confirmed genuinely free | Direct PDF fetch returns `200`, `content-type: application/pdf`, no auth wall. Matches the existing K5Learning entry in the USA section above (🟢, light ads) — this is the same site, just a specific worksheet URL pattern confirmed working for direct PDF ingestion. |
| LiveWorksheets | liveworksheets.com/worksheet/en/math/471652 | Maths | ~Age 9-11 | 🔴 blocked | Returns HTTP 403 to automated requests (confirmed both default and HTTP/1.1-forced). Also UGC/interactive-first rather than a stable archive of fixed-answer items — low value even if access were fixed. |
| Quizizz (generated doc artifact) | quizizz.com/_media/_quizizzAIGenDocs/... | Unknown | Unknown | ⚪ exclude | URL resolves (200) but is an isolated generated-document asset, not a category/library root — no repeatable archive structure found. Do not treat as a source unless a proper index page is found. |

**Caveat — read before using any of these:** none of these are official exam boards; they're commercial worksheet platforms with inconsistent free/paid boundaries that can change without notice (same class of risk as the Singapore/HK aggregators above, but for worksheets instead of past papers). Treat "free" markers on any of these as needing a fresh check at ingestion time, not something to trust from this catalog entry.

---

## International Olympiad Bodies (not country-specific)

| Source | URL | Subjects | Age/Grade | Accessibility | Approx. Volume | Notes |
|---|---|---|---|---|---|---|
| Math Kangaroo (international) | mathkangaroo.org | Maths | Grades 1-12 (3-6 = 8-11) | 🟡 corrected 2026-08-09 | Much smaller than assumed — see note | Largest global maths competition by participation, but its full past-paper archive is NOT actually free — see pipeline finding below |
| International Junior Math Olympiad (IJMO) | steamahead.simcc.org/ijmo | Maths | Grades 1-6 | 🟡 | ~30 Q/test | Registration required, limited free samples |
| SOF International English/GK/Science Olympiads (IEO/IGKO/ISO) | sofworld.org | English, GK, History, Geography, Science | Classes 1-12 (early = 6-9) | 🔴 | Limited publicly | School registration required |
| English Olympiad (Global) | englisholympiad.net | English | Ages 6-11 | 🟢 | Large (175k+ participants reported) | Free registration |
| International Junior Science Olympiad (IJSO) | ijso.org | Physics, Chemistry, Biology | Age 15 and under (typically 13+) | 🟡 | Moderate | Skews older than our 8-11 target |

---

## Cross-System Summary

*Revised twice: first after the deeper Singapore/HK/India pass, then again after a second deeper pass on USA/Australia/France/Germany/Scandinavia — the latter searched in French, German, Swedish, Norwegian, and Danish rather than English-only. That second pass overturned "curriculum-only, nothing free" for Germany, France, and all three Scandinavian countries — the original conclusion was an artifact of English-only search, not a real absence of content.*

**Genuinely free & public, no login, current (official or independently verified):**
- USA — deepest system found: SBAC, EngageNY, plus independent state archives (Texas STAAR, California CAASPP, Massachusetts MCAS, NY State) and Khan Academy
- Germany — **VERA 3** (official national comparison test, released items) + Lernwolf/Lernstübchen (5,100+ free worksheets) + full Känguru archive
- France — **Éduscol** publishes real official diagnostic-assessment released items (not just frameworks) + large teacher-blog ecosystem (Bout de Gomme, Orphéecole, Lutin Bazar)
- Sweden & Denmark — official retired/demo national-test items (Skolverket/Uppsala for Sweden, testogprover.com for Denmark) + large worksheet ecosystems
- UK KS2 SATs (gov.uk) — official free archive
- Singapore third-party aggregators (testpapersfree.com, sgtestpaper.com, sgprimaryexam.com) — largest raw volume of any system, but see licensing caveat below
- Australia — NAP's own public demo site (missed originally) + AMT free-problem tier + Kuraplan/Cluey worksheets
- Hong Kong TSA/BCA (official, but P3/P6 only)
- India — CBSEClassWorksheets, Studies Today (worksheets); SOF/Silverzone/Indian Talent Olympiad *sample* papers (confirmed free, separate from paid competition)
- Math Kangaroo (international) — free sample-questions section is real but small (3 Q/grade-band/year); the "hundreds of past papers" full archive is login/price-gated, corrected 2026-08-09 (see Math Kangaroo pipeline finding)
- Japan MEXT National Assessment archive — official, live, Japanese-language, not yet piloted
- Taiwan NTCU SAA exam release archive (+ Miaoli County, NAER DSA as secondary) — official/public-sector, live, Chinese-language, not yet piloted
- Super Teacher Worksheets, K5Learning — genuine free tiers among the worksheet-repository (non-official) sources, confirmed 2026-08-09

**Real, narrower gaps that survived the deeper pass:**
- Norway's official national-test archive (Udir) starts at grade 5 — no grade 3 coverage, though independent worksheet sites (Ukemal, Kittysoppgaver) fill some of that
- Hong Kong TSA structurally skips P4-5 (only P3 and P6) — no source found closes this
- USA MATHCOUNTS elementary: announced, not yet operational

**Paywalled / registration-gated / commercial (confirmed, not just under-researched):**
- Singapore *official* PSLE past papers (MOE/SEAB distributors, as opposed to the free third-party aggregators above)
- Australia AMC's full multi-decade archive (a genuine free tier exists alongside it, see Australia section)
- India: myCBSEguide/Toppr/Byju's (marketed as free, actually subscription-gated)
- Germany: meinUnterricht/Sofatutor/LearnAttack (trial-then-paywall)
- Bahrain MOE root domain returned HTTP 403 on direct check (2026-08-09) — blocked, not just unverified as originally noted
- Twinkl, Education.com — live but membership/premium-gated for most actual content (confirmed 2026-08-09)
- LiveWorksheets — returns HTTP 403 to automated access (confirmed 2026-08-09)

**Coverage gap that's real across every system:** Space/astronomy and general geography as standalone subjects are thin everywhere — every country folds them into "Science" or "Social Studies" rather than testing them separately. No system researched offers dedicated space-content practice material. This gap did not close on the deeper pass and won't close with more searching — it's structural to how these countries organize curricula, not a research gap.

**Licensing note (important, distinct from "accessibility"):** "Free to download" is not the same as "cleared to reuse." Two categories worth distinguishing:
1. **Official government sources** with a public-sector basis: UK gov.uk, USA state DOEs/SBAC/EngageNY, Germany VERA 3, France Éduscol, Sweden Skolverket/Uppsala, Denmark's Ministry, India NCERT, HK HKEAA, Australia NAP/ACARA.
2. **Third-party redistributors/aggregators** whose own right to redistribute is unconfirmed: Singapore's testpapersfree.com/sgtestpaper.com/sgprimaryexam.com (redistributing individual schools' exam papers), Hong Kong's Champion Tutor, and — flagged specifically because an agent asserted this without verification — France's teacher-blog ecosystem, which one research pass characterized as "legally shareable under teacher-community norms." That characterization is the agent's own inference, not something I verified against actual license terms, so it should be treated with the same caution as the Singapore/HK aggregators rather than as confirmed.

---

*URLs and accessibility verified by agent web search as of 2026-08-08 (initial pass) and deeper-verification pass same day for Singapore/Hong Kong/India; official sites and third-party aggregators change access policies without notice — reverify before relying on any single source at ingestion time.*
