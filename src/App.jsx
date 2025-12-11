import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { EventProvider } from './context/EventContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import DiscoverPage from './pages/DiscoverPage';
import SchedulePage from './pages/SchedulePage';
import CalendarPage from './pages/CalendarPage';
import './index.css';

// Configure NProgress
NProgress.configure({ 
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
});

// Component to handle route changes and trigger NProgress
function RouteChangeHandler() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <EventProvider>
        <Router>
          <RouteChangeHandler />
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<DiscoverPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/calendar" element={<CalendarPage />} />
              </Routes>
            </main>
            
            {/* Decorative background elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
              <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-20 animate-blob"></div>
              <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 dark:bg-pink-900/30 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>
          </div>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Router>
      </EventProvider>
    </ThemeProvider>
  );
}

export default App;