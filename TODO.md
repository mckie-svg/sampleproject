# Code Cleanup TODO List

## index.html Cleanup
- [ ] 1. Remove empty button `<button id="hireMeBtn">`
- [ ] 2. Remove unused Chart.js CDN
- [ ] 3. Remove unnecessary Tailwind CDN (keep only output.css)
- [ ] 4. Remove duplicate nested divs in home section
- [ ] 5. Fix wrong link `#portfolio` → `#projects`
- [ ] 6. Remove duplicate JavaScript (mobile menu functions already in script.js)
- [ ] 7. Remove duplicate inline styles that are in style.css

## style.css Cleanup
- [ ] 1. Remove unused card classes (.card, .card-icon, .card-title, .card-text)
- [ ] 2. Remove duplicate social-links class (already in index.html inline)

## script.js Cleanup
- [ ] 1. Remove duplicate openCVModal() and closeCVModal() functions
- [ ] 2. Fix freezeBackground function reference
- [ ] 3. Remove duplicate mobile menu functions (already defined in script.js)

## Performance Improvements
- [ ] 1. Add lazy loading to images
- [ ] 2. Remove unused Google Fonts
