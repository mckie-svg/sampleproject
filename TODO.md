# TODO - Scroll Indicator Update

## Task: Move scroll indicator to bottom center and change color to match theme

### Status: COMPLETED ✓

### Changes Made:
1. [x] Updated scroll indicator position from `bottom-10` to `bottom-6` (closer to absolute bottom)
2. [x] Changed color from white (`text-white/80`) to theme green (`text-[#31572c]`)
3. [x] Applied same color change to hover state

### Technical Details:
- Original: `absolute bottom-10 left-1/2 transform -translate-x-1/2` with `text-white/80 hover:text-white`
- New: `absolute bottom-6 left-1/2 transform -translate-x-1/2` with `text-[#31572c] hover:text-[#31572c]`

### Theme Color Used:
- #31572c (primary green used in CTA section, skill tags, and scrollbar)
