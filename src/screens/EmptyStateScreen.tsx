import React, { useEffect } from 'react';
import {
  Search,
  Lightbulb,
  ArrowRight,
  Layers,
  CheckCircle,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/common/TopBar';

export const EmptyStateScreen: React.FC = () => {
  const { setCurrentRoute, navigateToFacility, language } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 lg:pb-12 transition-colors">
      <TopBar
        title={language === 'th' ? 'ผลการค้นหา' : 'Search Results'}
        showBack={true}
        onBack={() => setCurrentRoute('booking')}
      />

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 space-y-6">
        {/* 1. Empty State Illustration */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-orange-100/60 dark:bg-orange-950/40 flex items-center justify-center relative">
              <div className="w-16 h-16 rounded-full bg-orange-200/50 dark:bg-orange-900/40 flex items-center justify-center">
                <Search className="w-8 h-8 text-orange-700 dark:text-orange-300 stroke-[2.2]" />
              </div>
              <span
                className="absolute top-1 right-2 w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: 'var(--brand-strong)' }}
              />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
            ไม่พบรายการให้จอง
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
            เริ่มเดี๋ยวนี้เลย เพียงแค่ลองเลือกกลุ่ม จากนั้นทดลองจองรายการที่สนใจได้เลย
          </p>
        </div>

        {/* 2. Advice Box */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              คำแนะนำสำหรับนักศึกษา
            </h3>
          </div>

          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pl-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>ตรวจสอบวันและเวลาที่ต้องการ</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>ลองค้นหากลุ่มอื่น</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>ระบบเปิดให้จองล่วงหน้าตามกฎของแต่ละบริการ</span>
            </li>
          </ul>
        </div>

        {/* 3. Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setCurrentRoute('booking')}
            className="w-full py-4 px-6 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 shadow-md shadow-brand/20 transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer"
            style={{ backgroundColor: 'var(--brand-strong)' }}
          >
            <Layers className="w-5 h-5" />
            <span>กลับไปเลือกกลุ่ม</span>
          </button>

          <div className="text-center">
            <button
              onClick={() => alert('ตารางเวลาการเปิดทำการทั้งหมดของสัปดาห์นี้')}
              className="text-xs font-bold underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
              style={{ color: 'var(--brand-strong)' }}
            >
              <span>ดูตารางเวลาทั้งหมดของสัปดาห์นี้</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4. Recommended Available Rooms */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                ห้องว่างที่แนะนำ
              </h4>
            </div>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              อัปเดตแบบเรียลไทม์
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Recommendation 1: A108 */}
            <div
              onClick={() => navigateToFacility('A108')}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 cursor-pointer group hover:shadow-md transition-all"
            >
              <div className="relative h-28 sm:h-36 overflow-hidden">
                <img
                  src="/assets/aistudio/Image_5_d9b09b94.jpeg"
                  alt="STUDY ROOM A108"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span className="badge-on-colored px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 flex items-center gap-1 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>ว่าง</span>
                  </span>
                </div>
              </div>

              <div className="p-3">
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  STUDY ROOM A108
                </h5>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  <Users className="w-3 h-3" />
                  <span>4-6 ที่นั่ง</span>
                </div>
              </div>
            </div>

            {/* Recommendation 2: PLAYGROUND */}
            <div
              onClick={() => navigateToFacility('PLAYGROUND')}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 cursor-pointer group hover:shadow-md transition-all"
            >
              <div className="relative h-28 sm:h-36 overflow-hidden">
                <img
                  src="/assets/aistudio/Image_5_d9b09b94.jpeg"
                  alt="KLLC PLAYGROUND"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span className="badge-on-colored px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 flex items-center gap-1 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>ว่าง</span>
                  </span>
                </div>
              </div>

              <div className="p-3">
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  KLLC PLAYGROU...
                </h5>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  <Users className="w-3 h-3" />
                  <span>8-12 ที่นั่ง</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
