import React, { useState } from 'react';
import {
  ChevronRight,
  ShieldCheck,
  Building,
  Clock,
  User,
  Users,
  Monitor,
  Laptop,
  Armchair,
  Dumbbell,
  MoreHorizontal,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  UsersRound,
  Trophy,
  Contact,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/common/TopBar';
import { MOCK_CATEGORIES } from '../data/mockData';

export const BookingHubScreen: React.FC = () => {
  const { quota, upcomingTicket, setCurrentRoute, navigateToCategory, navigateToHistory, language } = useApp();
  const categories = MOCK_CATEGORIES;

  // Helper to render icon for category
  const renderCategoryIcon = (iconName: string, isAvailable: boolean = true) => {
    const disabledClass = !isAvailable ? 'text-slate-500 dark:text-slate-400' : '';
    switch (iconName) {
      case 'users':
        return <Users className={`w-5 h-5 ${disabledClass || 'text-orange-600'}`} />;
      case 'monitor':
        return <Monitor className={`w-5 h-5 ${disabledClass || 'text-blue-600'}`} />;
      case 'laptop':
        return <Laptop className={`w-5 h-5 ${disabledClass || 'text-amber-600'}`} />;
      case 'sofa':
        return <Armchair className={`w-5 h-5 ${disabledClass || 'text-indigo-600'}`} />;
      case 'dumbbell':
        return <Dumbbell className={`w-5 h-5 ${disabledClass || 'text-emerald-600'}`} />;
      case 'heart-handshake':
        return <HeartHandshake className={`w-5 h-5 ${disabledClass || 'text-rose-600'}`} />;
      case 'users-round':
        return <UsersRound className={`w-5 h-5 ${disabledClass || 'text-teal-600'}`} />;
      case 'trophy':
        return <Trophy className={`w-5 h-5 ${disabledClass || 'text-green-600'}`} />;
      case 'contact':
        return <Contact className={`w-5 h-5 ${disabledClass || 'text-slate-500'}`} />;
      case 'more-horizontal':
      default:
        return <MoreHorizontal className={`w-5 h-5 ${disabledClass || 'text-purple-600'}`} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 lg:pb-12">
      <TopBar
        title={language === 'th' ? 'การยืม/จอง' : 'Booking Hub'}
        showBack={true}
        onBack={() => setCurrentRoute('home')}
      />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-6">
        {/* 1. Daily Quota Banner Card */}
        <section
          className="relative rounded-3xl p-5 sm:p-6 text-white shadow-lg overflow-hidden transition-all"
          style={{
            background: 'linear-gradient(135deg, var(--brand-strong) 0%, var(--brand) 100%)',
          }}
        >
          {/* Subtle watermark illustration overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-44 pointer-events-none opacity-15 flex items-center justify-center">
            <Clock className="w-40 h-40 stroke-1" />
          </div>

          <div className="relative z-10">
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold text-white">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'th' ? 'สิทธิ์การใช้งานรายวัน' : 'Daily Quota'}</span>
              </div>

              <div className="px-2.5 py-0.5 rounded-full bg-white/25 text-xs font-bold text-white tracking-wider">
                {quota.usedToday} / {quota.dailyTotal}
              </div>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
              {language === 'th'
                ? `วันนี้จองได้อีก ${quota.remainingToday} ครั้ง`
                : `${quota.remainingToday} bookings left today`}
            </h2>
            <p className="text-xs text-white/85 mb-4">
              {language === 'th'
                ? `สิทธิ์ ${quota.dailyTotal} ครั้ง/วัน (${quota.locationScope}) • ${quota.dateLabelTh}`
                : `Quota ${quota.dailyTotal}/day (${quota.locationScope}) • ${quota.dateLabelEn}`}
            </p>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-white/30 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{
                  width: `${(quota.usedToday / quota.dailyTotal) * 100}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* 2. Upcoming Booking Ticket or Empty State */}
        {upcomingTicket ? (
          <section>
            <div className="flex items-center justify-between mb-2.5 px-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {language === 'th' ? 'การจองที่กำลังจะถึง' : 'Upcoming Booking'}
                </h3>
              </div>
              <button
                onClick={navigateToHistory}
                className="text-xs font-semibold flex items-center gap-0.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
              >
                <span>{language === 'th' ? 'ดูทั้งหมด' : 'View All'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all">
              {/* Ticket Top Header Bar with solid white status badge */}
              <div
                className="px-4 py-3 flex items-center justify-between text-white"
                style={{ backgroundColor: 'var(--brand-strong)' }}
              >
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-bold">
                    {upcomingTicket.type}
                  </span>
                </div>

                {/* Status badge on colored bg = solid white bg + colored text */}
                <div className="badge-on-colored px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-600 flex items-center gap-1 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{upcomingTicket.statusLabelTh}</span>
                </div>
              </div>

              {/* Ticket Body */}
              <div className="p-4 sm:p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      {language === 'th' ? 'รหัสสถานที่' : 'Location Code'}
                    </span>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                      {upcomingTicket.locationCode}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {language === 'th' ? upcomingTicket.locationNameTh : (upcomingTicket.locationNameEn || upcomingTicket.locationNameTh)}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                </div>

                {/* Inner Schedule Box */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        {language === 'th' ? 'วันและเวลาที่จอง' : 'Reserved Date & Time'}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {upcomingTicket.dateTh} {upcomingTicket.timeRangeTh}
                      </p>
                    </div>
                  </div>

                  <span
                    className="px-2.5 py-1 text-xs font-bold rounded-xl"
                    style={{
                      backgroundColor: 'var(--brand-muted)',
                      color: 'var(--brand-strong)',
                    }}
                  >
                    {upcomingTicket.durationLabelTh}
                  </span>
                </div>

                {/* Footer Check-in info & Manage */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <User className="w-4 h-4" />
                    <span>{upcomingTicket.checkInMethodTh}</span>
                  </div>

                  <button
                    onClick={navigateToHistory}
                    className="font-bold hover:underline cursor-pointer"
                    style={{ color: 'var(--brand)' }}
                  >
                    {language === 'th' ? 'จัดการการจอง' : 'Manage Booking'}
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {language === 'th' ? 'การจองที่กำลังจะถึง' : 'Upcoming Booking'}
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {language === 'th' ? 'ยังไม่มีการจองที่กำลังจะถึง' : 'No upcoming bookings'}
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              {language === 'th' ? 'พร้อมจอง 3 ครั้ง' : '3 Quota Available'}
            </span>
          </section>
        )}

        {/* 3. 6 Booking Categories */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 grid grid-cols-2 gap-0.5"
                style={{ color: 'var(--brand)' }}
              >
                <div className="bg-current rounded-xs" />
                <div className="bg-current rounded-xs" />
                <div className="bg-current rounded-xs" />
                <div className="bg-current rounded-xs" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'th' ? 'หมวดหมู่การจอง' : 'Booking Categories'}
              </h3>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {categories.length} {language === 'th' ? 'หมวดหมู่' : 'Categories'}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
            {categories.map((cat) => {
              const isAvailable = cat.availableCount > 0;
              return (
                <div
                  key={cat.id}
                  onClick={() => navigateToCategory(cat.id)}
                  className={`bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between transition-all hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer group min-w-0 ${
                    !isAvailable ? 'opacity-95' : ''
                  }`}
                >
                  <div className="min-w-0">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-105 shrink-0 ${cat.accentBg}`}
                    >
                      {renderCategoryIcon(cat.iconName, isAvailable)}
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                      {language === 'th' ? cat.titleTh : (cat.titleEn || cat.titleTh)}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {language === 'th' ? cat.descTh : (cat.descEn || cat.descTh)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-2 border-t border-slate-50 dark:border-slate-800/60">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold rounded-full truncate ${
                        !isAvailable
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {isAvailable
                        ? `${cat.availableCount} ${language === 'th' ? cat.countUnitTh : (cat.countUnitEn || 'available')}`
                        : (language === 'th' ? cat.countUnitTh : 'Unavailable')}
                    </span>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors shrink-0">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Special Software Request Callout */}
        <section className="bg-blue-50/70 dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-blue-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {language === 'th' ? 'ต้องการโปรแกรมเฉพาะทาง?' : 'Need Specialized Software?'}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {language === 'th'
                  ? 'ติดต่อเจ้าหน้าที่ KLLC ได้ตลอดเวลา เพื่อขอรับสิทธิ์ติดตั้งซอฟต์แวร์พิเศษสำหรับการเรียนและการวิจัย'
                  : 'Contact KLLC staff anytime to request special software installation for academic and research purposes.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => alert(language === 'th' ? 'ติดต่อเจ้าหน้าที่ KLLC ผ่านระบบแชทสด' : 'Contact KLLC Staff via live chat')}
            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 shadow-xs border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
            aria-label={language === 'th' ? 'ติดต่อเจ้าหน้าที่' : 'Contact Staff'}
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </section>
      </main>
    </div>
  );
};
