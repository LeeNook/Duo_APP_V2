import React from 'react';
import {
  ArrowLeft,
  Languages,
  Palette,
  Moon,
  Sun,
  Laptop,
  Bell,
  Info,
  Shield,
  ChevronRight,
  GraduationCap,
  Pencil,
  Check,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/common/TopBar';
import { ThemeColor, AppearanceMode, Language } from '../types';

export const SettingsScreen: React.FC = () => {
  const {
    currentRoute,
    setCurrentRoute,
    theme,
    setTheme,
    appearance,
    setAppearance,
    language,
    setLanguage,
    user,
    notify15Min,
    setNotify15Min,
    notifyRoomAvailable,
    setNotifyRoomAvailable,
  } = useApp();

  const themeOptions: {
    id: ThemeColor;
    name: string;
    hex: string;
    color: string;
  }[] = [
    {
      id: 'orange',
      name: 'KMITL Orange',
      hex: '#E35205',
      color: '#E35205',
    },
    {
      id: 'blue',
      name: 'Academic Blue',
      hex: '#2563EB',
      color: '#2563EB',
    },
    {
      id: 'green',
      name: 'Emerald Green',
      hex: '#059669',
      color: '#059669',
    },
    {
      id: 'purple',
      name: 'Deep Purple',
      hex: '#7C3AED',
      color: '#7C3AED',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-28 lg:pb-12">
      <TopBar
        title={language === 'th' ? 'การตั้งค่า' : 'Settings'}
        showBack={true}
        onBack={() => setCurrentRoute('home')}
      />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-6">
        {/* 1. Student Profile Card */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 transition-all overflow-hidden relative">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {user.name}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400">
                    {user.degree}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  KMITL ID: {user.studentId}
                </p>
              </div>
            </div>

            <button
              onClick={() => alert(language === 'th' ? 'แก้ไขข้อมูลโปรไฟล์' : 'Edit profile info')}
              className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title={language === 'th' ? 'แก้ไขโปรไฟล์' : 'Edit Profile'}
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>

          {/* Faculty / Department banner */}
          <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-100/60 dark:border-slate-700/60 flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
            <GraduationCap className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
            <span className="font-medium truncate">
              {user.faculty} {user.department}
            </span>
          </div>
        </section>

        {/* 2. Language Selection */}
        <section>
          <div className="flex items-center gap-2 mb-2.5 px-1">
            <Languages className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'th' ? 'ภาษา / Language' : 'Language / ภาษา'}
            </h3>
          </div>

          <div className="bg-blue-50/80 dark:bg-slate-900 p-1.5 rounded-2xl border border-blue-100/60 dark:border-slate-800 flex items-center">
            <button
              onClick={() => setLanguage('th')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                language === 'th'
                  ? 'text-white shadow-md shadow-brand/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              style={{
                backgroundColor: language === 'th' ? 'var(--brand-strong)' : 'transparent',
              }}
            >
              {language === 'th' && <Check className="w-4 h-4 stroke-[3]" />}
              <span>ภาษาไทย (TH)</span>
            </button>

            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                language === 'en'
                  ? 'text-white shadow-md shadow-brand/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              style={{
                backgroundColor: language === 'en' ? 'var(--brand-strong)' : 'transparent',
              }}
            >
              {language === 'en' && <Check className="w-4 h-4 stroke-[3]" />}
              <span>English (EN)</span>
            </button>
          </div>
        </section>

        {/* 3. Theme Color Swatches */}
        <section>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {language === 'th' ? 'สีธีมหลัก (Theme Color)' : 'Theme Color'}
              </h3>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {language === 'th' ? '4 ตัวเลือก' : '4 Options'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {themeOptions.map((opt) => {
              const isSelected = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setTheme(opt.id)}
                  className={`bg-white dark:bg-slate-900 rounded-2xl p-3.5 border transition-all text-left flex items-center gap-3 cursor-pointer ${
                    isSelected
                      ? 'border-slate-400 dark:border-slate-500 shadow-md ring-2 ring-offset-1 dark:ring-offset-slate-950 ring-slate-400'
                      : 'border-slate-100 dark:border-slate-800 shadow-xs hover:border-slate-200 dark:hover:border-slate-700'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: opt.color }}
                  >
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {opt.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {opt.hex}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. Appearance (Light / Dark / System) */}
        <section>
          <div className="flex items-center gap-2 mb-2.5 px-1">
            <Moon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'th' ? 'รูปแบบการแสดงผล (Appearance)' : 'Appearance'}
            </h3>
          </div>

          <div className="bg-blue-50/80 dark:bg-slate-900 p-1.5 rounded-2xl border border-blue-100/60 dark:border-slate-800 flex items-center gap-1.5">
            <button
              onClick={() => setAppearance('light')}
              className={`flex-1 py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                appearance === 'light'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-xs">{language === 'th' ? 'สว่าง' : 'Light'}</span>
            </button>

            <button
              onClick={() => setAppearance('dark')}
              className={`flex-1 py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                appearance === 'dark'
                  ? 'bg-slate-800 text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span className="text-xs">{language === 'th' ? 'มืด' : 'Dark'}</span>
            </button>

            <button
              onClick={() => setAppearance('system')}
              className={`flex-1 py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                appearance === 'system'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Laptop className="w-4 h-4 text-blue-500" />
              <span className="text-xs">{language === 'th' ? 'ตามระบบ' : 'System'}</span>
            </button>
          </div>
        </section>

        {/* 5. Notification & Booking Preferences */}
        <section>
          <div className="flex items-center gap-2 mb-2.5 px-1">
            <Bell className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'th' ? 'การแจ้งเตือนและการจอง' : 'Notifications & Booking'}
            </h3>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
            {/* Toggle 1: 15-min reminder */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {language === 'th' ? 'แจ้งเตือนก่อนเวลาจอง 15 นาที' : 'Reminder 15 mins before booking'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'th' ? 'เตือนเข้าใช้อุปกรณ์และห้องค้นคว้าล่วงหน้า' : 'Alert for upcoming facility & study room reservations'}
                </p>
              </div>

              <button
                onClick={() => setNotify15Min(!notify15Min)}
                className={`w-12 h-7 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer relative shrink-0 ${
                  notify15Min ? 'bg-brand' : 'bg-slate-300 dark:bg-slate-700'
                }`}
                style={{
                  backgroundColor: notify15Min ? 'var(--brand-strong)' : undefined,
                }}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                    notify15Min ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  {notify15Min && (
                    <Check className="w-3.5 h-3.5" style={{ color: 'var(--brand-strong)' }} />
                  )}
                </div>
              </button>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800" />

            {/* Toggle 2: Room vacancy alert */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {language === 'th' ? 'แจ้งเตือนเมื่อมีห้องว่างที่สนใจ' : 'Vacancy alert for tracked spaces'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'th' ? 'แจ้งเตือนทันทีเมื่อมีผู้ยกเลิกช่วงเวลาที่คุณติดตาม' : 'Immediate notification when someone cancels a booked slot'}
                </p>
              </div>

              <button
                onClick={() => setNotifyRoomAvailable(!notifyRoomAvailable)}
                className={`w-12 h-7 rounded-full p-0.5 transition-colors duration-200 ease-in-out cursor-pointer relative shrink-0 ${
                  notifyRoomAvailable ? 'bg-brand' : 'bg-slate-300 dark:bg-slate-700'
                }`}
                style={{
                  backgroundColor: notifyRoomAvailable ? 'var(--brand-strong)' : undefined,
                }}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 flex items-center justify-center ${
                    notifyRoomAvailable ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  {notifyRoomAvailable && (
                    <Check className="w-3.5 h-3.5" style={{ color: 'var(--brand-strong)' }} />
                  )}
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* 6. About App */}
        <section>
          <div className="flex items-center gap-2 mb-2.5 px-1">
            <Info className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'th' ? 'เกี่ยวกับแอป (About)' : 'About App'}
            </h3>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center shrink-0">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    Duo_APP Prototype
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {language === 'th' ? 'เวอร์ชันทดสอบ v2.6' : 'Prototype version v2.6'}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400">
                Active
              </span>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800" />

            <button
              onClick={() => alert(language === 'th' ? 'นโยบายความเป็นส่วนตัว KMITL Academic Data' : 'KMITL Academic Privacy Policy')}
              className="w-full flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <Shield className="w-4 h-4 text-slate-500" />
                <span className="font-semibold group-hover:underline">
                  {language === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </section>

        {/* Footer Build info */}
        <footer className="text-center py-4">
          <p className="text-xs text-slate-400 dark:text-slate-600 font-mono">
            Build 2026.10.26-beta
          </p>
        </footer>
      </main>
    </div>
  );
};
