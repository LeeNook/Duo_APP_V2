import React from 'react';
import {
  ArrowRight,
  Info,
  Calendar,
  ShieldCheck,
  DoorOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DuoLogo } from '../components/common/DuoLogo';

export const SplashScreen: React.FC = () => {
  const { setCurrentRoute, language } = useApp();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-6 bg-gradient-to-b from-orange-50/40 via-slate-50 to-orange-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Top Badge */}
      <div className="pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/70 dark:bg-slate-800/80 border border-orange-200/50 dark:border-slate-700/60 shadow-xs">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--brand)' }}
          />
          <span
            className="text-xs font-bold tracking-wider"
            style={{ color: 'var(--brand-strong)' }}
          >
            PROTOTYPE V2.6
          </span>
        </div>
      </div>

      {/* Main Center Section */}
      <div className="w-full max-w-sm flex flex-col items-center my-auto py-6">
        {/* App Icon Frame with Outer Glow */}
        <div className="relative mb-6">
          <div
            className="absolute inset-0 rounded-[36px] blur-xl opacity-40 transition-all"
            style={{ backgroundColor: 'var(--brand)' }}
          />
          <div className="relative p-3 bg-white dark:bg-slate-800/90 rounded-[34px] shadow-xl border border-slate-100 dark:border-slate-700/60">
            <DuoLogo size="xl" className="!rounded-[26px]" />
          </div>
        </div>

        {/* Titles */}
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2 text-center">
          Duo_APP
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-8 text-center">
          {language === 'th' ? 'ระบบจองห้องและอุปกรณ์วิจัย KMITL' : 'KMITL Academic & Facility Booking Hub'}
        </p>

        {/* Notice Card */}
        <div className="w-full bg-white dark:bg-slate-800/95 rounded-2xl p-5 shadow-lg shadow-slate-200/50 dark:shadow-black/20 border-t-4 border-slate-100 dark:border-slate-700 border-x border-b transition-all relative overflow-hidden"
             style={{ borderTopColor: 'var(--brand-strong)' }}>
          <div className="flex items-start gap-3.5 mb-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--brand-muted)' }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--brand-strong)' }}
              >
                <Info className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {language === 'th' ? 'ประกาศแจ้งเตือนการใช้งาน' : 'Prototype Notice'}
              </h3>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 pl-1">
            {language === 'th'
              ? 'นี่คือต้นแบบสำหรับทดสอบ ข้อมูลทั้งหมดเป็นข้อมูลจำลอง การจองไม่มีผลกับห้องจริง'
              : 'This is an interactive prototype. All data is simulated for testing and demonstration.'}
          </p>

          <div className="flex items-center justify-end gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Calendar className="w-4 h-4" />
            <span>{language === 'th' ? 'พ.ศ. 2569' : '2026'}</span>
          </div>
        </div>

        {/* Main CTA Button */}
        <button
          onClick={() => setCurrentRoute('home')}
          className="w-full mt-6 py-4 px-6 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-brand/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          style={{ backgroundColor: 'var(--brand-strong)' }}
        >
          <span>{language === 'th' ? 'เริ่มใช้งาน' : 'Get Started'}</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Bottom Pills */}
      <div className="w-full max-w-sm flex items-center justify-center gap-3 pb-4">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span>KMITL SSO Ready</span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/90 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium">
          <DoorOpen className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <span>Co-Working & Lab</span>
        </div>
      </div>
    </div>
  );
};
