# Question images

Static image files for seed questions, served by Next.js from `/public` at
runtime under `/images/<subject>/<filename>`.

## Adding an image to a question

1. Drop the image file in `public/images/<subject>/`.
2. On the question object in `data/seed/<subject>.json`, set:
   - `image`: the path the browser will fetch, e.g. `"/images/geography/world-continents-map.png"`.
   - `imageAlt`: a plain-language description of what the image shows, written
     for a 9-year-old and for a screen reader — not decorative, since the
     prompt depends on the child seeing (or hearing described) the image's
     content. Required whenever `image` is set.
3. Both fields are optional and only need to be present on questions that
   actually use an image — everything else is unaffected.

## Scope (as of 2026-08-19)

Only simple diagrams and maps (e.g. a labeled world map, a basic food-web or
water-cycle diagram) are in scope for now — not photographs, charts requiring
fine-grained reading, or anything copyrighted without a clear reuse license.
This mirrors the same licensing caution already documented in
`research/pipeline/README.md` for reading passages.
