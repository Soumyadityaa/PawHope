# PawHope Animal Rescue - Frontend Prototype

A modern, highly responsive, and professional web interface designed for an animal welfare non-profit organization. This frontend prototype is built to drive adoptions, gather donations, recruit volunteers, and provide a seamless community portal experience.

## Project Overview
PawHope demonstrates a complete non-profit platform built strictly with native web technologies. It avoids heavy frontend frameworks to ensure maximum performance, accessibility, and maintainability. The project includes a fully functional UI, a custom theme system, and a client-side mock database simulating user authentication and transaction history.

## Key Features
* **Responsive Mobile-First Architecture:** Scales perfectly from mobile devices to large desktop monitors using CSS Grid and Flexbox.
* **Native Dark/Light Mode:** A zero-dependency theme system powered by CSS Custom Properties (Variables) that persists via localStorage.
* **Interactive User Dashboard:** A dedicated donor and volunteer portal featuring simulated authentication, profile management, and dynamic transaction history.
* **Custom UI Components:** Includes vanilla JavaScript implementations of image lightboxes, testimonial sliders, FAQ accordions, and animated data counters.
* **Dynamic Data Rendering:** Client-side filtering and search functionality for the animal adoption gallery without requiring page reloads.

## Technology Stack
* **HTML5:** Semantic structuring for accessibility and SEO.
* **CSS3:** Advanced layouts (Grid/Flexbox), custom variables, and keyframe animations.
* **Vanilla JavaScript (ES6+):** DOM manipulation, event delegation, and mock backend logic.
* **Zero Dependencies:** No Bootstrap, Tailwind, React, or jQuery.

## Project Structure
```text
animal-rescue-website/
│
├── index.html
├── about.html
├── animals.html
├── rescue-stories.html
├── gallery.html
├── adoption.html
├── volunteer.html
├── donate.html
├── contact.html
├── login.html
├── register.html
├── dashboard.html
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── auth.css
│
├── js/
│   ├── main.js
│   ├── animals.js
│   ├── donation.js
│   ├── volunteer.js
│   ├── auth.js
│   └── dashboard.js
│
└── images/
    ├── dogs/
    ├── cats/
    ├── cows/
    ├── rescue/
    └── gallery/
