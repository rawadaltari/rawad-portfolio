# Project images

One folder per project (`spu/`, `lung/`, `skin/`, `citizen/`, `qastly/`, …). Inside it the files
can be named freely — what matters is the paths listed in `src/data/projects.ts`:

```ts
image: "/images/projects/qastly/5.png",   // cover: card + top of the details modal
gallery: [                                 // any number of extra screenshots
  "/images/projects/qastly/2.jpg",
  "/images/projects/qastly/3.jpg",
],
```

## How each image is displayed

| Place | Behaviour |
| --- | --- |
| Project card (grid) | 16:10 frame, `object-cover` anchored to the **top** of the image |
| Cover in the details modal | 16:9 frame, same top-anchored cover |
| Screenshots thumbnails | 16:10 frame, same top-anchored cover |
| Full-screen viewer | fixed 16:10 frame, image shown **whole** over a blurred copy of itself |

Because every frame crops from the top, put the meaningful part of a screenshot (header, nav,
title) near its top edge. Nothing is ever lost: the viewer always shows the full image.

## Recommendations

- **Cover**: pick a landscape shot, at least ~1400 px wide. A small or portrait cover is
  stretched across a wide card and looks soft.
- **Mixed orientations are fine** — phone screenshots (e.g. 1080×2400) and desktop captures can
  sit in the same gallery; the uniform frames keep the layout tidy.
- **Weight**: every image here is WebP, at most 1600 px wide — that is what keeps this folder
  under 1 MB in total. Convert new screenshots the same way before adding them.
  The untouched PNG/JPG originals live in `image-sources/projects/` at the repository root,
  outside `public/` so they are never deployed. Delete that folder if you keep the originals
  elsewhere.
- A path whose file does not exist yet renders a designed placeholder instead of a broken image,
  so paths can be committed before the screenshots are ready.
