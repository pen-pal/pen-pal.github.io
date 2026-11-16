# Manish Khadka — Portfolio

DevOps / SRE / Platform Engineer portfolio site. Deployed via GitHub Pages.

## Structure
```
.
├── index.html # Entry point
├── css/style.css # All styles
├── js/
│ ├── data.js # Profile data (edit this to update content)
│ ├── case-studies.js # Case study content (indexed by projects[].caseStudy)
│ └── main.js # Rendering, interactions, API calls
├── .github/workflows/
│ └── deploy.yaml # GitHub Pages CI/CD
└── README.md
```

## Editing content

All text lives in `js/data.js` and `js/case-studies.js`; keep it in step with the CV.
The "Download PDF" button prints an ATS-friendly CV generated from the same data.

## Local preview

```
python3 -m http.server 8000
```

Pushes to `dev` deploy to GitHub Pages.
