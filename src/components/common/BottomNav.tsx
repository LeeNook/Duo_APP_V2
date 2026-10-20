import React from 'react';
import {
  LayoutGrid,
  FlaskConical,
  CalendarDays,
  User,
  Archive,
  History,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const {
    currentRoute,
    setCurrentRoute,
    navigateToCategory,
    navigateToHistory,
    language,
  } = useApp();

  if (currentRoute === 'splash') return null;

  const isSettings = currentRoute === 'settings';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800/80 transition-colors lg:hidden pb-safe">
      <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-around">
        {!isSettings ? (
          <>
            {/* 1. หน้าหลัก */}
            <button
              onClick={() => setCurrentRoute('home')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                currentRoute === 'home'
                  ? 'text-brand font-semibold scale-105'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              style={{
                color: currentRoute === 'home' ? 'var(--brand)' : undefined,
              }}
            >
              <LayoutGrid className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] leading-tight">
                {language === 'th' ? 'หน้าหลัก' : 'Home'}
              </span>
            </button>

            {/* 2. อุปกรณ์ */}
            <button
              onClick={() => navigateToCategory('seminar-room')}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                currentRoute === 'category' || currentRoute === 'facility'
                  ? 'text-brand font-semibold scale-105'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              style={{
                color:
                  currentRoute === 'category' || currentRoute === 'facility'
                    ? 'var(--brand)'
                    : undefined,
              }}
            >
              <FlaskConical className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] leading-tight">
                {language === 'th' ? 'อุปกรณ์' : 'Equipment'}
              </span>
            </button>

            {/* 3. การจองของฉัน */}
            <button
              onClick={navigateToHistory}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
                currentRoute === 'history' || currentRoute === 'booking'
                  ? 'text-brand font-semibold scale-105'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              style={{
                color:
                  currentRoute === 'history' || currentRoute === 'booking'
                    ? 'var(--brand)'
                    : undefined,
              }}
            >
              <CalendarDays className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] leading-tight">
                {language === 'th' ? 'การจองของฉัน' : 'Bookings'}
              </span>
            </button>

            {/* 4. โปรไฟล์ */}
            <button
              onClick={() => setCurrentRoute('settings')}
              className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <User className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] leading-tight">
                {language === 'th' ? 'โปรไฟล์' : 'Profile'}
              </span>
            </button>
          </>
        ) : (
          <>
            {/* Settings bottom nav variant */}
            <button
              onClick={() => setCurrentRoute('booking')}
              className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <CalendarDays className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] leading-tight">
                {language === 'th' ? 'จองพื้นที่' : 'Book Area'}
              </span>
            </button>

            <button
              onClick={() => navigateToCategory('computer')}
              className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <Archive className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] leading-tight">
                {language === 'th' ? 'ครุภัณฑ์' : 'Inventory'}
              </span>
            </button>

            <button
              onClick={navigateToHistory}
              className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <History className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] leading-tight">
                {language === 'th' ? 'ประวัติการใช้' : 'History'}
              </span>
            </button>

            <button
              onClick={() => setCurrentRoute('settings')}
              className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer text-brand font-semibold scale-105"
              style={{ color: 'var(--brand)' }}
            >
              <User className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] leading-tight">
                {language === 'th' ? 'โปรไฟล์' : 'Profile'}
              </span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
