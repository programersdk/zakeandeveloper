# Zakwan Developer - Portfolio Website

## Overview

A modern, responsive portfolio website for Zakwan Developer featuring:
- Fully responsive design with dark theme
- Firebase Firestore contact form integration
- Project showcase with filtering
- Pricing page with detailed packages
- Smooth animations using AOS (Animate On Scroll)
- Professional UI/UX with Bootstrap 5

## Features

### Pages
- **index.html** - Main portfolio page (Home, Services, Skills, Projects, Testimonials)
- **projects.html** - Detailed project showcase with category filtering
- **pricing.html** - Service pricing with packages and FAQ
- **contact.html** - Contact form with Firebase integration

### Technical Stack
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.3.3
- Font Awesome 6.5.0
- AOS Animation Library
- Firebase Firestore (for contact form submissions)

## Quick Setup

### 1. Firebase Configuration
The project is already configured with Firebase. Contact form submissions are saved to the `contact_messages` collection in Firestore.

If you need to use your own Firebase project:
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firestore Database
3. Replace the config in `config/config.js` with your Firebase credentials

### 2. Running Locally

You can run this site using any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code Live Server extension
# Right-click on index.html and select "Open with Live Server"
```

Then open your browser to `http://localhost:8000`

## Project Structure

```
.
├── config/
│   └── config.js          # Firebase configuration
├── pic/                   # Project images/screenshots
├── index.html             # Main homepage
├── projects.html          # Projects showcase page
├── pricing.html           # Pricing packages page
├── contact.html           # Contact form page
├── styles.css             # Main stylesheet
├── script.js              # Main JavaScript (navigation, animations)
├── contact.js             # Contact form handling with Firebase
└── README.md              # This file
```

## Social Media Links

The portfolio includes social media integration throughout:
- GitHub: https://github.com/zakwanch
- LinkedIn: https://www.linkedin.com/in/zakwanch
- Twitter: https://twitter.com/zakwanc
- Email: zakwan@example.com

## Key Features

### Contact Form
- Real-time form validation
- Firebase Firestore integration
- Success/error handling
- Prevents duplicate submissions

### Project Filtering
- Filter projects by category (E-Commerce, Web Apps, Landing Pages, etc.)
- Smooth animations on filter change
- Responsive grid layout

### Responsive Design
- Mobile-first approach
- Breakpoints for phones, tablets, and desktops
- Touch-friendly navigation

### Performance
- Optimized images
- Lazy loading for AOS animations
- Minimal JavaScript bundle
- Fast page load times

## Deployment

### Firebase Hosting (Recommended)
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Hosting
firebase init hosting

# Deploy
firebase deploy
```

### Other Options
- Netlify (drag & drop deployment)
- Vercel (connect to Git repository)
- GitHub Pages (for static hosting)
- Any static hosting service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  --primary: #2563eb;        /* Main brand color */
  --primary-dark: #1e40af;   /* Darker shade */
  --bg-dark: #0f172a;        /* Dark background */
  --bg-light: #f8fafc;       /* Light background */
  /* ... more variables ... */
}
```

### Content
- Update personal information in HTML files
- Replace project images in the `pic/` folder
- Modify service offerings in `index.html`
- Update pricing packages in `pricing.html`

## Security Notes

**Important**: Before deploying to production:
1. Set up Firebase Security Rules for Firestore
2. Add rate limiting to prevent spam
3. Consider adding CAPTCHA to the contact form
4. Review and restrict Firebase API keys if needed

## License

This project is created for Zakwan Developer's personal portfolio.

## Contact

For questions or collaboration:
- Email: zakwan@example.com
- GitHub: [@zakwanch](https://github.com/zakwanch)
- LinkedIn: [zakwanch](https://www.linkedin.com/in/zakwanch)

---

Built with ❤️ and lots of coffee ☕