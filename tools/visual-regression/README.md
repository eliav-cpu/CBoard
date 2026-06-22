# Visual Regression QA — PRIME / King Tamar

## Purpose
This module will compare rendered slide outputs against approved visual baselines.

## Target checks
- Light and Dark variants keep the same structure.
- Hebrew text zones remain right aligned.
- Cards do not overflow.
- Title hierarchy remains strong.
- Slide does not drift from PRIME DNA.

## MVP approach
1. Render slide from JSON into editable PPTX.
2. Export or screenshot the slide preview.
3. Compare screenshot against approved baseline.
4. Fail if visual drift is above threshold.

## Recommended future tool
Playwright screenshot comparison.

## Current status
Planned. The first implemented layer is:

```text
Slide JSON -> Hebrew QA -> PPTX renderer
```

Next implementation:

```text
PPTX/HTML preview -> screenshot -> baseline comparison
```
