import React from 'react';
import {
  LayoutGrid,
  CalendarDays,
  FlaskConical,
  History,
  User,
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

  const navItems = [
    {
      id: 'home',
      labelTh: 'หน้าหลัก',
      labelEn: 'Home',
      icon: LayoutGrid,
      isActive: currentRoute === 'home',
      onClick: () => setCurrentRoute('home'),
    },
    {
      id: 'booking',
      labelTh: 'จองพื้นที่',
      labelEn: 'Book',
      icon: CalendarDays,
      isActive: currentRoute === 'booking',
      onClick: () => setCurrentRoute('booking'),
    },
    {
      id: 'equipment',
      labelTh: 'อุปกรณ์',
      labelEn: 'Equip',
      icon: FlaskConical,
      isActive: currentRoute === 'category' || currentRoute === 'facility',
      onClick: () => navigateToCategory('seminar'),
    },
    {
      id: 'history',
      labelTh: 'ประวัติ',
      labelEn: 'History',
      icon: History,
      isActive: currentRoute === 'history',
      onClick: navigateToHistory,
    },
    {
      id: 'profile',
      labelTh: 'โปรไฟล์',
      labelEn: 'Profile',
      icon: User,
      isActive: currentRoute === 'settings',
      onClick: () => setCurrentRoute('settings'),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 lg:hidden pb-safe">
      <div className="w-full max-w-md sm:max-w-xl mx-auto px-3 py-2 h-[70px] flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center py-1 px-1.5 sm:px-3 rounded-xl font-medium transition-all cursor-pointer flex-1 max-w-[80px] sm:max-w-none ${
                item.isActive
                  ? 'scale-105 font-bold'
                  : 'text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              style={{
                color: item.isActive ? 'var(--brand)' : undefined,
              }}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] sm:text-[11px] leading-tight truncate">
                {language === 'th' ? item.labelTh : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
