import React, { useState } from 'react';
import {
  Calendar,
  CalendarDays,
  Clock,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Flame,
  ArrowRight,
  Building2,
  GraduationCap,
  Star,
  Contact2,
  MapPin,
  BookOpen,
  Wrench,
  Smartphone,
  Info,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/common/TopBar';
import {
  MOCK_NEWS,
  MOCK_OCCUPANCY,
  MOCK_PAST_BOOKING,
} from '../data/mockData';

export const HostHomeScreen: React.FC = () => {
  const { setCurrentRoute, user, language, upcomingTicket } = useApp();
  const [newsList] = useState(MOCK_NEWS);
  const [occupancyList] = useState(MOCK_OCCUPANCY);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 lg:pb-12 transition-colors">
      <TopBar title={language === 'th' ? 'หน้าหลัก' : 'Home'} />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-6">
        {/* 1. Student Profile Card */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-100 dark:border-slate-800/80 transition-all">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                <span
                  className="absolute -bottom-1 -left-1 px-1.5 py-0.2 text-[9px] font-black rounded-full text-white shadow-xs"
                  style={{ backgroundColor: 'var(--brand)' }}
                >
                  LV.4
                </span>
              </div>

              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                  สวัสดี, {user.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {user.faculty} {user.department}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    รหัส {user.studentId}
                  </span>
                  <span className="inline-block px-2.5 py-0.5 text-[10px] font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    ปีการศึกษา 2569
                  </span>
                </div>
              </div>
            </div>

            {/* XP Badge */}
            <div className="shrink-0 flex flex-col items-end">
              <div
                className="px-3 py-1.5 rounded-full text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                style={{ backgroundColor: 'var(--brand-strong)' }}
              >
                <Flame className="w-3.5 h-3.5 fill-white text-white" />
                <span>1,240 XP</span>
              </div>
              <span
                className="text-[11px] font-semibold mt-1"
                style={{ color: 'var(--brand-strong)' }}
              >
                เลเวล 4 Scholar
              </span>
            </div>
          </div>
        </section>

        {/* Upcoming Booking Card (Cleanly shown only when active booking exists) */}
        {upcomingTicket && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-100 dark:border-slate-800 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  การจองที่กำลังจะถึง
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                {upcomingTicket.statusLabelTh}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
                  {upcomingTicket.locationCode}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {upcomingTicket.dateTh} {upcomingTicket.timeRangeTh}
                </p>
              </div>

              <button
                onClick={() => setCurrentRoute('history')}
                className="shrink-0 px-3.5 py-2 rounded-xl text-white font-bold text-xs shadow-sm hover:opacity-90 transition-all cursor-pointer"
                style={{ backgroundColor: 'var(--brand-strong)' }}
              >
                ดูรายละเอียด
              </button>
            </div>
          </section>
        )}

        {/* 2. News & Announcements */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span
                className="text-lg"
                style={{ color: 'var(--brand)' }}
              >
                📢
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                ข่าวสารและประกาศ
              </h3>
            </div>
            <button
              onClick={() => alert('แสดงข่าวสารและประกาศทั้งหมด')}
              className="text-xs font-semibold flex items-center gap-0.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <span>ดูทั้งหมด</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
            {newsList.map((news) => (
              <div
                key={news.id}
                className="shrink-0 w-[290px] sm:w-[320px] h-[175px] rounded-3xl relative overflow-hidden shadow-sm border border-slate-200/60 dark:border-slate-800 group cursor-pointer snap-start"
              >
                <img
                  src={news.imageUrl}
                  alt={news.titleTh}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full text-white shadow-xs ${
                      news.badgeType === 'special'
                        ? 'bg-amber-600'
                        : 'bg-emerald-600'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{news.badgeTh}</span>
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-medium text-slate-300 mb-0.5">
                    ห้องสมุด KLLC
                  </p>
                  <h4 className="text-sm font-bold line-clamp-1 leading-snug">
                    {news.titleTh}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/15 text-xs text-slate-300">
                    <span>{news.dateRangeTh}</span>
                    <span
                      className="font-bold flex items-center gap-1"
                      style={{ color: 'var(--brand-muted)' }}
                    >
                      รายละเอียด <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Recent Usage */}
        <section>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                การใช้งานล่าสุด
              </h3>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {MOCK_PAST_BOOKING.categoryTh}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--brand-light)' }}
              >
                <div
                  className="w-6 h-6 flex items-center justify-center"
                  style={{ color: 'var(--brand)' }}
                >
                  <Building2 className="w-6 h-6" />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {MOCK_PAST_BOOKING.roomName}
                  </h4>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                    สำเร็จ
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {MOCK_PAST_BOOKING.buildingTh}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{MOCK_PAST_BOOKING.dateTh} {MOCK_PAST_BOOKING.timeRangeTh}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentRoute('booking')}
              className="shrink-0 px-3.5 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:opacity-90 active:scale-95 cursor-pointer"
              style={{ backgroundColor: 'var(--brand-strong)' }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>จองซ้ำ</span>
            </button>
          </div>
        </section>

        {/* 4. 8-Grid Menu: All Services */}
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
                บริการทั้งหมด
              </h3>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              8 รายการ
            </span>
          </div>

          <div className="grid grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-4">
            {/* Tile 1: การยืม/จอง (Active -> /booking) */}
            <button
              onClick={() => setCurrentRoute('booking')}
              className="relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl text-white shadow-md shadow-brand/25 transition-transform hover:scale-105 active:scale-95 cursor-pointer group"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 bg-red-500 text-white text-[9px] font-black rounded-full shadow-sm">
                ใหม่
              </span>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold text-white text-center leading-tight">
                การยืม/จอง
              </span>
            </button>

            {/* Tile 2: ตารางเรียน */}
            <button
              onClick={() => alert('บริการตารางเรียน')}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer text-slate-800 dark:text-slate-200"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-1.5 text-slate-600 dark:text-slate-300">
                <CalendarDays className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-center leading-tight">
                ตารางเรียน
              </span>
            </button>

            {/* Tile 3: ผลการเรียน */}
            <button
              onClick={() => alert('บริการผลการเรียน')}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer text-slate-800 dark:text-slate-200"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-1.5 text-slate-600 dark:text-slate-300">
                <Star className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-center leading-tight">
                ผลการเรียน
              </span>
            </button>

            {/* Tile 4: บัตรนักศึกษา */}
            <button
              onClick={() => alert('บริการบัตรนักศึกษาดิจิทัล')}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer text-slate-800 dark:text-slate-200"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-1.5 text-slate-600 dark:text-slate-300">
                <Contact2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-center leading-tight">
                บัตรนักศึกษา
              </span>
            </button>

            {/* Tile 5: ข่าว/อีเวนต์ */}
            <button
              onClick={() => alert('บริการข่าวสารและอีเวนต์')}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer text-slate-800 dark:text-slate-200"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-1.5 text-slate-600 dark:text-slate-300">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-center leading-tight">
                ข่าว/อีเวนต์
              </span>
            </button>

            {/* Tile 6: แผนที่มอ */}
            <button
              onClick={() => alert('แผนที่มหาวิทยาลัย KMITL Map')}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer text-slate-800 dark:text-slate-200"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-1.5 text-slate-600 dark:text-slate-300">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-center leading-tight">
                แผนที่มอ
              </span>
            </button>

            {/* Tile 7: ยืมหนังสือ */}
            <button
              onClick={() => alert('บริการยืม-คืนหนังสือ KLLC')}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer text-slate-800 dark:text-slate-200"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-1.5 text-slate-600 dark:text-slate-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-center leading-tight">
                ยืมหนังสือ
              </span>
            </button>

            {/* Tile 8: แจ้งซ่อม */}
            <button
              onClick={() => alert('บริการแจ้งซ่อมและบำรุงรักษา')}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer text-slate-800 dark:text-slate-200"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-1.5 text-slate-600 dark:text-slate-300">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-center leading-tight">
                แจ้งซ่อม
              </span>
            </button>
          </div>
        </section>

        {/* 5. Library Occupancy Widget */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                สถานะพื้นที่ห้องสมุด
              </h3>
            </div>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              อัปเดตแบบเรียลไทม์
            </span>
          </div>

          <div className="space-y-4">
            {occupancyList.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {item.nameTh}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      {item.detailTh}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full ${
                      item.densityStatus === 'normal'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                        : 'bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400'
                    }`}
                  >
                    ● ว่าง {item.availableSeats} ที่
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.densityStatus === 'normal'
                        ? 'bg-emerald-500'
                        : 'bg-orange-500'
                    }`}
                    style={{ width: `${item.densityPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>
                    ความหนาแน่น {item.densityPercent}%{' '}
                    {item.densityStatus === 'busy' && '(ใกล้เต็ม)'}
                  </span>
                  <span>รองรับทั้งหมด {item.totalSeats} ที่นั่ง</span>
                </div>
              </div>
            ))}
          </div>

          {/* Booking prompt box */}
          <div
            onClick={() => setCurrentRoute('booking')}
            className="mt-4 p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all hover:opacity-90 active:scale-[0.99]"
            style={{ backgroundColor: 'var(--brand-light)' }}
          >
            <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <Info className="w-4 h-4" style={{ color: 'var(--brand)' }} />
              <span>ต้องการจองห้องสัมมนากลุ่มล่วงหน้า?</span>
            </div>
            <span
              className="text-xs font-bold flex items-center gap-1"
              style={{ color: 'var(--brand)' }}
            >
              จองห้อง <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </section>

        {/* 6. Final Exam Notice */}
        <section
          className="rounded-3xl p-5 text-white shadow-md relative overflow-hidden flex items-center justify-between cursor-pointer transition-transform hover:scale-[1.01]"
          style={{ backgroundColor: 'var(--brand-strong)' }}
          onClick={() => alert('ปฏิทินการศึกษาสอบปลายภาค 2/2569')}
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-white truncate">
                สัปดาห์สอบปลายภาค ภาคการศึกษา 2/2569
              </h4>
              <p className="text-xs text-white/80 mt-0.5">
                เริ่มต้นในอีก 6 วัน (เริ่ม 16 มี.ค. 2569)
              </p>
            </div>
          </div>

          <div className="shrink-0 pl-2">
            <ChevronRight className="w-5 h-5 text-white/80" />
          </div>
        </section>
      </main>
    </div>
  );
};
