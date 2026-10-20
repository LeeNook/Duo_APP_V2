import React from 'react';
import { Bell, ArrowLeft, User as UserIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DuoLogo } from './DuoLogo';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  subtitle?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  showBack = false,
  onBack,
  subtitle = 'KMITL ACADEMIC HUB',
}) => {
  const { currentRoute, setCurrentRoute, user, language, showToast } = useApp();

  const displayTitle = title ?? (language === 'th' ? 'หน้าหลัก' : 'Home');

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={onBack || (() => setCurrentRoute('home'))}
              className="p-2 -ml-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={language === 'th' ? 'ย้อนกลับ' : 'Back'}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentRoute('home')}
              className="flex items-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
            >
              <DuoLogo size="sm" />
            </button>
          )}

          <div>
            {!showBack && (
              <p
                className="text-[10px] font-bold tracking-wider uppercase transition-colors"
                style={{ color: 'var(--brand)' }}
              >
                {subtitle}
              </p>
            )}
            <h1 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
              {displayTitle}
            </h1>
          </div>
        </div>

        {/* Right action icons */}
        <div className="flex items-center gap-2">
          {!showBack && (
            <button
              onClick={() => showToast(language === 'th' ? 'ไม่มีการแจ้งเตือนใหม่' : 'No new notifications')}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={language === 'th' ? 'การแจ้งเตือน' : 'Notifications'}
            >
              <Bell className="w-5 h-5" />
              <span
                className="absolute top-2 right-2 w-2 h-2 rounded-full ring-2 ring-white dark:ring-slate-900"
                style={{ backgroundColor: 'var(--brand)' }}
              />
            </button>
          )}

          <button
            onClick={() => setCurrentRoute('settings')}
            className={`cursor-pointer rounded-full transition-transform hover:scale-105 active:scale-95 ${
              currentRoute === 'settings' ? 'ring-2' : ''
            }`}
            style={{
              borderColor: 'var(--brand)',
              outlineColor: 'var(--brand)',
            }}
            title={language === 'th' ? 'ไปที่การตั้งค่า' : 'Go to Settings'}
          >
            {showBack ? (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--brand)' }}
              >
                <UserIcon className="w-5 h-5" />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={user.avatarUrl}
                  alt={language === 'th' ? user.name : (user.nameEn || user.name)}
                  className="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
