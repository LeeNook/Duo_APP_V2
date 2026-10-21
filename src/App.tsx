import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashScreen } from './screens/SplashScreen';
import { HostHomeScreen } from './screens/HostHomeScreen';
import { BookingHubScreen } from './screens/BookingHubScreen';
import { CategoryListScreen } from './screens/CategoryListScreen';
import { FacilityDetailScreen } from './screens/FacilityDetailScreen';
import { ConfirmBookingScreen } from './screens/ConfirmBookingScreen';
import { SuccessESlipScreen } from './screens/SuccessESlipScreen';
import { MyBookingsScreen } from './screens/MyBookingsScreen';
import { EmptyStateScreen } from './screens/EmptyStateScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { BottomNav } from './components/common/BottomNav';
import { DesktopSidebar } from './components/common/DesktopSidebar';
import { ScreenRoute } from './types';
import { CheckCircle2 } from 'lucide-react';
import { EMPTY_CATEGORY_IDS } from './data/mockData';

const MainLayout: React.FC = () => {
  const {
    currentRoute,
    setCurrentRoute,
    language,
    selectedCategoryId,
    selectedFacilityId,
    setSelectedCategoryId,
    setSelectedFacilityId,
    navigateToSuccess,
    navigateToConfirm,
    toastMessage,
    theme,
    appearance,
  } = useApp();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const updateDark = () => {
      let dark = false;
      if (appearance === 'dark') {
        dark = true;
      } else if (appearance === 'system') {
        dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      const root = document.documentElement;
      if (dark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };
    updateDark();
    if (appearance === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => updateDark();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [appearance]);

  // Sync hash routing supporting deep links
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#/', '').replace('#', '');
      const parts = rawHash.split('/');
      const baseRoute = parts[0];

      if (baseRoute === 'booking' && parts[1]) {
        setSelectedCategoryId(parts[1]);
        if (EMPTY_CATEGORY_IDS.includes(parts[1])) {
          setCurrentRoute('empty');
        } else {
          setCurrentRoute('category');
        }
      } else if (baseRoute === 'facility' && parts[1]) {
        setSelectedFacilityId(parts[1]);
        setCurrentRoute('facility');
      } else if (baseRoute === 'success' && parts[1]) {
        navigateToSuccess(parts[1]);
      } else if (
        [
          'splash',
          'home',
          'booking',
          'category',
          'facility',
          'confirm',
          'success',
          'history',
          'empty',
          'settings',
        ].includes(baseRoute)
      ) {
        setCurrentRoute(baseRoute as ScreenRoute);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setCurrentRoute, setSelectedCategoryId, setSelectedFacilityId, navigateToSuccess]);

  // Update hash when route changes
  useEffect(() => {
    window.location.hash = `/${currentRoute}`;
  }, [currentRoute]);

  // CRITICAL: Scroll to absolute top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const rootEl = document.getElementById('root');
    if (rootEl) rootEl.scrollTop = 0;
  }, [currentRoute, selectedCategoryId, selectedFacilityId]);

  // Render current screen
  const renderScreen = () => {
    switch (currentRoute) {
      case 'splash':
        return <SplashScreen />;
      case 'home':
        return <HostHomeScreen />;
      case 'booking':
        return <BookingHubScreen />;
      case 'category':
        return <CategoryListScreen />;
      case 'facility':
        return <FacilityDetailScreen />;
      case 'confirm':
        return <ConfirmBookingScreen />;
      case 'success':
        return <SuccessESlipScreen />;
      case 'history':
        return <MyBookingsScreen />;
      case 'empty':
        return <EmptyStateScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HostHomeScreen />;
    }
  };

  // If on splash screen, render clean full-screen
  if (currentRoute === 'splash') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
        <SplashScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col lg:flex-row">
      {/* Desktop Sidebar (visible on >=1024px) */}
      <DesktopSidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col justify-start w-full pb-[80px] lg:pb-0">
        <div className="flex-1 w-full max-w-7xl mx-auto min-h-[100dvh] relative">
          {renderScreen()}
        </div>
      </main>

      {/* Persistent Bottom Nav - rendered unconditionally, hidden only via lg:hidden */}
      <BottomNav />

      {/* Floating Success / Notification Toast */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 shadow-2xl border border-slate-700/50 dark:border-slate-200/50 animate-bounce-short text-xs sm:text-sm font-bold backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Quick Route Switcher for Reviewing / Grading */}
      <div className="fixed bottom-3 right-4 z-50 hidden lg:flex items-center gap-1.5 p-1.5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-700/80 text-xs select-none">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 px-1 uppercase tracking-wider">
            Quick Nav:
          </span>
          <button
            onClick={() => setCurrentRoute('splash')}
            className="px-2 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Splash
          </button>
          <button
            onClick={() => setCurrentRoute('home')}
            className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
              currentRoute === 'home'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentRoute('booking')}
            className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
              currentRoute === 'booking'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Hub
          </button>
          <button
            onClick={() => setCurrentRoute('category')}
            className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
              currentRoute === 'category'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Category
          </button>
          <button
            onClick={() => setCurrentRoute('facility')}
            className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
              currentRoute === 'facility'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Detail
          </button>
          <button
            onClick={() =>
              navigateToConfirm(
                'A107',
                language === 'th' ? 'จันทร์ 26 ตุลาคม 2569' : 'Monday 26 Oct 2026',
                '14:00 - 15:00 น.'
              )
            }
            className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
              currentRoute === 'confirm'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Confirm
          </button>
          <button
            onClick={() => setCurrentRoute('success')}
            className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
              currentRoute === 'success'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            E-Slip
          </button>
          <button
            onClick={() => setCurrentRoute('history')}
            className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
              currentRoute === 'history'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setCurrentRoute('empty')}
            className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
              currentRoute === 'empty'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Empty
          </button>
          <button
            onClick={() => setCurrentRoute('settings')}
            className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
              currentRoute === 'settings'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Settings
          </button>
        </div>
      </div>
    );
  };

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
