# 🎉 EventHub Kenya - Community Event Discovery Platform

<div align="center">
  
![EventHub Kenya](https://img.shields.io/badge/EventHub-Kenya-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite)

**A stunning, modern event discovery platform connecting Kenyans with amazing local events**

[Live Demo](#) • [Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started)

</div>

---

## 📖 Overview

EventHub Kenya is a beautifully designed event discovery platform that helps users find and manage local events across Kenya. From tech meetups in Nairobi to music festivals at the coast, EventHub makes it easy to discover, save, and never miss out on amazing experiences.

### ✨ Key Highlights

- 🎨 **Modern, Glassmorphic UI** - Stunning gradient backgrounds with animated blobs
- 💾 **Persistent State** - LocalStorage integration keeps your saved events across sessions
- 🔍 **Smart Filtering** - Search by name, category, date, location, and tags
- 📱 **Fully Responsive** - Beautiful on mobile, tablet, and desktop
- ⚡ **Lightning Fast** - Built with Vite for instant hot module replacement
- 🎭 **Smooth Animations** - Delightful micro-interactions throughout

---

## 🚀 Features

### Event Discovery
- **10+ Kenyan Events** - Curated events from Nairobi, Mombasa, Kisumu, and beyond
- **Category Filtering** - Tech, Music, Sports, Food, Arts, Outdoors
- **Advanced Search** - Search by title, description, location, or tags
- **Date Filtering** - Find events happening on specific dates
- **Location Search** - Flexible location matching with partial word support

### Personal Schedule
- **Save Events** - One-click save with persistent storage
- **Organized View** - Events grouped by date for easy planning
- **Badge Counter** - See your saved event count in the header
- **Quick Actions** - View details, share, and manage saved events

### User Experience
- **Event Cards** - Beautiful cards with images, pricing, and attendee counts
- **Event Modals** - Detailed view with all event information
- **Responsive Design** - Optimized for all screen sizes
- **Loading States** - Skeleton loaders for images
- **Empty States** - Helpful messages when no events match filters

---

## 🛠 Tech Stack

### Frontend Framework
- **React 18.3** - Modern React with Hooks and Context API
- **React Router 7.8** - Client-side routing
- **Vite 5.4** - Next-generation frontend tooling

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Headless UI 2.2** - Accessible UI components
- **Heroicons 2.2** - Beautiful hand-crafted SVG icons

### State Management
- **React Context API** - Global state for saved events
- **LocalStorage** - Persistent client-side storage

### Utilities
- **date-fns 4.1** - Modern date utility library

---

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/eventhub-kenya.git
   cd eventhub-kenya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
eventhub-kenya/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── EventCard.jsx    # Event card component
│   │   ├── EventModal.jsx   # Event details modal
│   │   ├── Header.jsx       # Navigation header
│   │   └── SearchFilters.jsx # Filter controls
│   ├── context/             # React Context providers
│   │   └── EventContext.jsx # Global event state
│   ├── data/                # Mock data
│   │   └── mockEvents.js    # Kenyan events data
│   ├── pages/               # Page components
│   │   ├── DiscoverPage.jsx # Event discovery page
│   │   └── SchedulePage.jsx # Saved events page
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
└── package.json            # Dependencies
```

---

## 🎨 Design Features

### Visual Design
- **Gradient Backgrounds** - Soft blue to purple gradient overlay
- **Animated Blobs** - Floating colored blobs for depth
- **Glassmorphism** - Frosted glass effect on header
- **Smooth Transitions** - All interactions are animated
- **Hover Effects** - Cards scale and images zoom on hover

### Accessibility
- **Semantic HTML** - Proper heading hierarchy
- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard support
- **Focus States** - Visible focus indicators

---

## 💡 Future Enhancements

Here are some ideas to make this project even more impressive:

### 🔥 High-Impact Features
1. **Real API Integration** 
   - Integrate Eventbrite, Meetup, or Ticketsasa API
   - Real-time event data from Kenya

2. **User Authentication**
   - Sign up/Login with email or social auth
   - User profiles and preferences
   - Event creation for organizers

3. **Interactive Maps**
   - Mapbox or Google Maps integration
   - View events on a map
   - Get directions to venues

4. **Calendar Integration**
   - Export to Google Calendar/iCal
   - Add reminders and notifications
   - View events in calendar format

5. **Social Features**
   - Share events on social media
   - See which friends are attending
   - Comment and review events

6. **Advanced Filters**
   - Price range slider
   - Distance from location
   - Event capacity/popularity
   - Multi-select categories

7. **Recommendation Engine**
   - AI-powered event recommendations
   - Based on saved events and preferences
   - Trending and popular events

8. **Mobile App**
   - React Native version
   - Push notifications
   - Native calendar integration

9. **Payment Integration**
   - M-Pesa integration
   - Book tickets directly
   - QR code tickets

10. **Analytics Dashboard**
    - Event organizer dashboard
    - Attendance tracking
    - Revenue analytics

### 🎨 UI/UX Enhancements
- Dark mode toggle
- Custom themes
- Event image galleries
- Video previews
- 3D card effects
- Parallax scrolling
- Confetti animations on event save
- Toast notifications

### ⚡ Performance
- Image optimization with lazy loading
- Virtual scrolling for large lists
- PWA with offline support
- Service workers for caching

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@shaddy1234](https://github.com/shaddy1234)
- LinkedIn: [Shadrack Kimaau](https://linkedin.com/in/shadrack-kimaau/)
- Portfolio: [shadrack-kimaau.vercel.app](https://shadrack-kimaau.vercel.app)

---

## 🙏 Acknowledgments

- Event images from [Pexels](https://pexels.com)
- Icons from [Heroicons](https://heroicons.com)
- Inspiration from modern event platforms

---

<div align="center">
  
**⭐ Star this repo if you find it helpful!**

Made with ❤️ By CEO Shad!

</div>
