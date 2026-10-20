import React from 'react';
import {
  LayoutGrid,
  CalendarDays,
  Settings,
  Sun,
  Moon,
  Laptop,
  Flame,
  Layers,
  HelpCircle,
  History as HistoryIcon,
  Ticket,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DuoLogo } from './DuoLogo';
import { ThemeColor } from '../../types';

export const DesktopSidebar: React.FC = () => {
  const {
    currentRoute,
    setCurrentRoute,
    theme,
    setTheme,
    appearance,
    setAppearance,
    language,
    user,
    quota,
    navigateToCategory,
    navigateToFacility,
    navigateToConfirm,
    navigateToSuccess,
    navigateToHistory,
    navigateToEmpty,
  } = useApp();

  const themes: { id: ThemeColor; labelTh: string; labelEn: string; color: string }[] = [
    { id: 'orange', labelTh: 'ส้ม KMITL', labelEn: 'KMITL Orange', color: '#E35205' },
    { id: 'blue', labelTh: 'น้ำเงินวิชาการ', labelEn: 'Academic Blue', color: '#2563EB' },
    { id: 'green', labelTh: 'เขียวมรกต', labelEn: 'Emerald Green', color: '#059669' },
    { id: 'purple', labelTh: 'ม่วงเข้ม', labelEn: 'Deep Purple', color: '#7C3AED' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors z-30 p-5 shrink-0 select-none overflow-y-auto">
      {/* Brand Header */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
        <DuoLogo size="md" />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Duo_APP
            </h2>
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              v2.6
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            KMITL Academic Hub
          </p>
        </div>
      </div>

      {/* Main Nav Items */}
      <nav className="mt-5 space-y-1.5 flex-1">
        {/* 1. Host Home */}
        <button
          onClick={() => setCurrentRoute('home')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
            currentRoute === 'home'
              ? 'text-white shadow-md shadow-brand/20'
              : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          style={{
            backgroundColor: currentRoute === 'home' ? 'var(--brand)' : undefined,
          }}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>{language === 'th' ? 'หน้าหลัก' : 'Home'}</span>
        </button>

        {/* 2. Booking Hub */}
        <button
          onClick={() => setCurrentRoute('booking')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
            currentRoute === 'booking'
              ? 'text-white shadow-md shadow-brand/20'
              : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          style={{
            backgroundColor: currentRoute === 'booking' ? 'var(--brand)' : undefined,
          }}
        >
          <div className="flex items-center gap-3">
            <CalendarDays className="w-4 h-4" />
            <span>{language === 'th' ? 'การยืม/จอง' : 'Booking Hub'}</span>
          </div>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: currentRoute === 'booking' ? '#FFFFFF' : 'var(--brand)',
              color: currentRoute === 'booking' ? 'var(--brand)' : '#FFFFFF',
            }}
          >
            {quota.remainingToday} {language === 'th' ? 'สิทธิ์' : 'left'}
          </span>
        </button>

        {/* 3. Category List */}
        <button
          onClick={() => navigateToCategory('seminar')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
            currentRoute === 'category'
              ? 'text-white shadow-md shadow-brand/20'
              : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          style={{
            backgroundColor: currentRoute === 'category' ? 'var(--brand)' : undefined,
          }}
        >
          <div className="flex items-center gap-3">
            <Layers className="w-4 h-4" />
            <span>{language === 'th' ? 'หมวดหมู่ / รายการ' : 'Category List'}</span>
          </div>
        </button>

        {/* 4. Detail & Timeslot */}
        <button
          onClick={() => navigateToFacility('A107')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
            currentRoute === 'facility'
              ? 'text-white shadow-md shadow-brand/20'
              : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          style={{
            backgroundColor: currentRoute === 'facility' ? 'var(--brand)' : undefined,
          }}
        >
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4" />
            <span>{language === 'th' ? 'รายละเอียด & รอบเวลา' : 'Detail & Slots'}</span>
          </div>
        </button>

        {/* 5. Confirm Booking */}
        <button
          onClick={() => navigateToConfirm('A107', 'จันทร์ 26 ตุลาคม 2569', '14:00 - 15:00 น.')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
            currentRoute === 'confirm'
              ? 'text-white shadow-md shadow-brand/20'
              : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          style={{
            backgroundColor: currentRoute === 'confirm' ? 'var(--brand)' : undefined,
          }}
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'th' ? 'แบบฟอร์มยืนยัน' : 'Confirm Booking'}</span>
          </div>
        </button>

        {/* 6. Success E-Slip */}
        <button
          onClick={() => navigateToSuccess('KMITL261019-PC01')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
            currentRoute === 'success'
              ? 'text-white shadow-md shadow-brand/20'
              : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          style={{
            backgroundColor: currentRoute === 'success' ? 'var(--brand)' : undefined,
          }}
        >
          <div className="flex items-center gap-3">
            <Ticket className="w-4 h-4" />
            <span>{language === 'th' ? 'บัตร E-Slip' : 'E-Slip Ticket'}</span>
          </div>
        </button>

        {/* 7. My Bookings / History */}
        <button
          onClick={navigateToHistory}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
            currentRoute === 'history'
              ? 'text-white shadow-md shadow-brand/20'
              : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          style={{
            backgroundColor: currentRoute === 'history' ? 'var(--brand)' : undefined,
          }}
        >
          <div className="flex items-center gap-3">
            <HistoryIcon className="w-4 h-4" />
            <span>{language === 'th' ? 'การจองของฉัน / ประวัติ' : 'My Bookings / History'}</span>
          </div>
        </button>

        {/* 8. Empty State */}
        <button
          onClick={navigateToEmpty}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
            currentRoute === 'empty'
              ? 'text-white shadow-md shadow-brand/20'
              : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          style={{
            backgroundColor: currentRoute === 'empty' ? 'var(--brand)' : undefined,
          }}
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4" />
            <span>{language === 'th' ? 'สถานะว่างเปล่า' : 'Empty State'}</span>
          </div>
        </button>

        {/* 9. Settings */}
        <button
          onClick={() => setCurrentRoute('settings')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
            currentRoute === 'settings'
              ? 'text-white shadow-md shadow-brand/20'
              : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          style={{
            backgroundColor: currentRoute === 'settings' ? 'var(--brand)' : undefined,
          }}
        >
          <Settings className="w-4 h-4" />
          <span>{language === 'th' ? 'การตั้งค่า' : 'Settings'}</span>
        </button>

        {/* Theme Swatches */}
        <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">
            {language === 'th' ? 'ชุดสีธีม' : 'Theme Swatch'}
          </p>
          <div className="flex items-center gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                title={language === 'th' ? t.labelTh : t.labelEn}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                  theme === t.id
                    ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-slate-700 dark:ring-white scale-110'
                    : ''
                }`}
                style={{ backgroundColor: t.color }}
              />
            ))}
          </div>
        </div>

        {/* Appearance Switch */}
        <div className="pt-3">
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2">
            {language === 'th' ? 'รูปแบบการแสดงผล' : 'Appearance'}
          </p>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
            <button
              onClick={() => setAppearance('light')}
              className={`flex-1 py-1 flex items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
                appearance === 'light'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
              title={language === 'th' ? 'โหมดสว่าง' : 'Light Mode'}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setAppearance('dark')}
              className={`flex-1 py-1 flex items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
                appearance === 'dark'
                  ? 'bg-slate-700 text-white shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
              title={language === 'th' ? 'โหมดมืด' : 'Dark Mode'}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setAppearance('system')}
              className={`flex-1 py-1 flex items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
                appearance === 'system'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
              title={language === 'th' ? 'ตามระบบ' : 'System Mode'}
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* User Mini Profile in Sidebar */}
      <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setCurrentRoute('settings')}
          className="w-full flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left cursor-pointer group"
        >
          <div className="relative shrink-0">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-brand transition-colors">
              {language === 'th' ? user.name : (user.nameEn || user.name)}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {user.studentId}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                1,240 XP
              </span>
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
};
