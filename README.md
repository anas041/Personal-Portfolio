# Mohammed Anas — Personal Portfolio

A responsive, animated personal portfolio built with plain HTML, CSS and JavaScript.

## Run locally

1. Extract the ZIP file.
2. Open the `mohammed-anas-portfolio` folder in VS Code.
3. Open `index.html` in your browser, or use the VS Code **Live Server** extension.

No build step, package installation or framework is required.

## Folder structure

```text
mohammed-anas-portfolio/
├── index.html
├── README.md
├── assets/
│   ├── favicon.svg
│   └── bakify-dashboard.png  ← add your original admin screenshot here
├── css/
│   └── style.css
└── js/
    └── main.js
```

## Included

- Responsive desktop, tablet and mobile layouts
- Scroll reveal animations and reading progress bar
- Custom animated robot guide that follows the visitor and changes its speech by section
- Interactive navigation and project links
- Project previews for Taste of Spicy and BAKIFY
- A replaceable image slot for your original BAKIFY admin dashboard screenshot (no fake dashboard is used)
- Reduced-motion accessibility support

## Personal details to review

The portfolio currently uses the name **Mohammed Anas**, the title **Frontend Developer**, and the email **mohammedanas2682@gmail.com**. Update these in `index.html` if you want different public contact details.

## Project links

- Taste of Spicy: https://taste-of-spicy.vercel.app/
- BAKIFY: https://thebakify.lovable.app/
- BAKIFY Control Centre: https://thebakify.lovable.app/control-415
- GitHub: https://github.com/anas041

## Preview note

The project panels are hand-built illustrative mockups, not captured screenshots of the live sites. The buttons open the actual deployed projects. The admin preview is an illustrative representation of the 19 modules supplied for this portfolio.


## Add your BAKIFY admin screenshot

1. Open the `assets` folder.
2. Copy your original BAKIFY admin dashboard screenshot into it.
3. Rename the image exactly to `bakify-dashboard.png`.
4. Refresh the portfolio in your browser.

The screenshot is displayed in the BAKIFY Control Centre project preview. If you want to use a different filename, change the `src` value on the admin screenshot `<img>` in `index.html` (search for `bakify-dashboard.png`).
