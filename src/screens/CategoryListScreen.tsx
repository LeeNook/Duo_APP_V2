import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  ChevronDown,
  Bookmark,
  Building,
  MapPin,
  Tv,
  Wifi,
  Users,
  AlertCircle,
  Bell,
  ArrowRight,
  Filter,
  CheckCircle2,
  Lock,
  Ban,
  Activity,
  Bed,
  Sparkles,
  Search,
  Lightbulb,
  Layers,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/common/TopBar';
import { MOCK_CATEGORIES, EMPTY_CATEGORY_IDS } from '../data/mockData';
import { FacilityItem } from '../types';
import { EmptyStateScreen } from './EmptyStateScreen';

export const CategoryListScreen: React.FC = () => {
  const {
    selectedCategoryId,
    setSelectedCategoryId,
    facilities,
    navigateToFacility,
    navigateToEmpty,
    setCurrentRoute,
    language,
    showToast,
  } = useApp();

  const [selectedSubCat, setSelectedSubCat] = useState<string>('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('2026-10-26');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('afternoon');
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [notificationToggles, setNotificationToggles] = useState<Record<string, boolean>>({});

  // Find active category
  const currentCategory = useMemo(() => {
    return (
      MOCK_CATEGORIES.find((c) => c.id === selectedCategoryId) ||
      MOCK_CATEGORIES[0]
    );
  }, [selectedCategoryId]);

  // Filter facilities
  const filteredFacilities = useMemo(() => {
    let items = facilities.filter((f) => {
      if (selectedCategoryId === 'seminar' || selectedCategoryId === 'seminar-room') {
        return f.category === 'seminar' || f.category === 'seminar-room';
      }
      if (selectedCategoryId === 'computer') {
        return f.category === 'computer' || f.category === 'imac';
      }
      return f.category === selectedCategoryId;
    });

    if (selectedSubCat !== 'all') {
      items = items.filter(
        (f) => f.subCategory === selectedSubCat || f.category === selectedSubCat
      );
    }

    return items;
  }, [facilities, selectedCategoryId, selectedSubCat]);

  // Calculate available count
  const availableCount = useMemo(() => {
    return filteredFacilities.filter((f) => f.isAvailable).length;
  }, [filteredFacilities]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleNotify = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !notificationToggles[id];
    setNotificationToggles((prev) => ({ ...prev, [id]: nextState }));
    if (nextState) {
      showToast('เปิดการแจ้งเตือนเมื่อรายการว่างแล้ว');
    } else {
      showToast('ปิดการแจ้งเตือน');
    }
  };

  const isBannerStyle = currentCategory?.style === 'banner' || currentCategory?.id === 'seminar' || currentCategory?.id === 'sports';

  // If selected category is an empty state category, immediately render EmptyStateScreen
  if (EMPTY_CATEGORY_IDS.includes(selectedCategoryId)) {
    return <EmptyStateScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 lg:pb-12 transition-colors">
      <TopBar
        title={language === 'th' ? 'อุปกรณ์' : 'Equipment'}
        showBack={true}
        onBack={() => setCurrentRoute('booking')}
      />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-5">
        {/* Category Switcher Pills Header */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {MOCK_CATEGORIES.map((cat) => {
            const isActive = cat.id === selectedCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (EMPTY_CATEGORY_IDS.includes(cat.id)) {
                    setSelectedCategoryId(cat.id);
                    setCurrentRoute('empty');
                  } else {
                    setSelectedCategoryId(cat.id);
                    setSelectedSubCat('all');
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--brand-strong)' : undefined,
                }}
              >
                {cat.titleTh}
              </button>
            );
          })}
        </div>

        {/* 1. Category Notice Banner (if sports or relax) */}
        {selectedCategoryId === 'sports' && (
          <div className="p-3.5 rounded-2xl bg-orange-100/80 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-center gap-2.5 text-xs text-orange-950 dark:text-orange-200 font-medium">
            <AlertCircle className="w-4 h-4 text-orange-600 shrink-0" />
            <span>ศูนย์กีฬาไม่มีอุปกรณ์ให้ยืม โปรดนำมาเอง</span>
          </div>
        )}

        {selectedCategoryId === 'relax' && (
          <div className="p-3.5 rounded-2xl bg-orange-100/80 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-center gap-2.5 text-xs text-orange-950 dark:text-orange-200 font-medium">
            <AlertCircle className="w-4 h-4 text-orange-600 shrink-0" />
            <span>มาช้าเกิน 5 นาที ตัดสิทธิ์ (เก้าอี้นวด) / 15 นาที (Cabin)</span>
          </div>
        )}

        {/* 2. Filter Dropdowns / Chips */}
        {isBannerStyle ? (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {/* Date dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => {
                  if (selectedDateFilter === '2026-10-26') {
                    setSelectedDateFilter('2026-10-25'); // Sunday
                  } else {
                    setSelectedDateFilter('2026-10-26');
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                <span>
                  {selectedDateFilter === '2026-10-26'
                    ? 'จันทร์ 26 ต.ค. 2569'
                    : 'อาทิตย์ 25 ต.ค. 2569'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Time period dropdown */}
            <div className="relative shrink-0">
              <button
                onClick={() => {
                  setSelectedTimeFilter(
                    selectedTimeFilter === 'afternoon' ? 'morning' : 'afternoon'
                  );
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>
                  {selectedTimeFilter === 'afternoon'
                    ? 'ช่วงบ่าย (13:00 - 18:00)'
                    : 'ช่วงเช้า (09:00 - 12:00)'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Consistent Filter Button with Funnel Icon and In-page Action */}
            <button
              onClick={() => showToast('ตัวเลือกตัวกรอง (Filter options)')}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>ตัวกรอง</span>
            </button>
          </div>
        ) : (
          /* Compact Style Filter Chips */
          <div className="space-y-3">
            {selectedCategoryId === 'relax' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-orange-600">🍂</span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    พื้นที่พักผ่อน (Rest & Recharge)
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[11px] font-bold">
                  เปิดให้บริการ
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {selectedCategoryId === 'computer' || selectedCategoryId === 'imac' ? (
                <>
                  <button
                    onClick={() => setSelectedSubCat('all')}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSubCat === 'all'
                        ? 'text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                    }`}
                    style={{
                      backgroundColor:
                        selectedSubCat === 'all' ? 'var(--brand-strong)' : undefined,
                    }}
                  >
                    ทั้งหมด
                  </button>
                  <button
                    onClick={() => setSelectedSubCat('pc')}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSubCat === 'pc'
                        ? 'text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                    }`}
                    style={{
                      backgroundColor:
                        selectedSubCat === 'pc' ? 'var(--brand-strong)' : undefined,
                    }}
                  >
                    PC Workstation
                  </button>
                  <button
                    onClick={() => setSelectedSubCat('imac')}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSubCat === 'imac'
                        ? 'text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                    }`}
                    style={{
                      backgroundColor:
                        selectedSubCat === 'imac' ? 'var(--brand-strong)' : undefined,
                    }}
                  >
                    iMac
                  </button>
                </>
              ) : selectedCategoryId === 'relax' ? (
                <>
                  <button
                    onClick={() => setSelectedSubCat('all')}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSubCat === 'all'
                        ? 'text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                    }`}
                    style={{
                      backgroundColor:
                        selectedSubCat === 'all' ? 'var(--brand-strong)' : undefined,
                    }}
                  >
                    ทั้งหมด
                  </button>
                  <button
                    onClick={() => setSelectedSubCat('massage')}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSubCat === 'massage'
                        ? 'text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                    }`}
                    style={{
                      backgroundColor:
                        selectedSubCat === 'massage' ? 'var(--brand-strong)' : undefined,
                    }}
                  >
                    เก้าอี้นวด
                  </button>
                  <button
                    onClick={() => setSelectedSubCat('cabin')}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSubCat === 'cabin'
                        ? 'text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                    }`}
                    style={{
                      backgroundColor:
                        selectedSubCat === 'cabin' ? 'var(--brand-strong)' : undefined,
                    }}
                  >
                    ห้องพักผ่อน (Private Cabin)
                  </button>
                </>
              ) : null}

              <button
                onClick={() => showToast('ตัวเลือกตัวกรอง (Filter options)')}
                className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <span>ตัวกรอง</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. Availability Count Header Row */}
        <div className="flex items-center justify-between text-xs font-semibold px-1 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-800 dark:text-slate-200 font-bold">
              พบ {availableCount} {currentCategory.countUnitTh}พร้อมใช้งาน
            </span>
          </div>

          <span className="text-slate-400 dark:text-slate-500">
            {isBannerStyle ? 'สำนักการเรียนรู้ (KLLC)' : 'อัปเดตล่าสุด'}
          </span>
        </div>

        {/* 4. Facility Items List or Full Inline Empty State */}
        {filteredFacilities.length === 0 ? (
          <div className="w-full max-w-3xl mx-auto py-6 space-y-6">
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

              {/* CRITICAL: Explicit heading "ไม่มีรายการให้จอง" */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
                ไม่มีรายการให้จอง
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
          </div>
        ) : isBannerStyle ? (
          /* ========================================================
             BANNER STYLE (Seminar Rooms & Sports: screen_4a, screen_4b)
             ======================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredFacilities.map((fac) => {
              const isBookmarked = !!bookmarkedIds[fac.id];
              const isNotifyOn = !!notificationToggles[fac.id];

              return (
                <div
                  key={fac.id}
                  className={`bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 transition-all ${
                    !fac.isAvailable ? 'opacity-95' : 'hover:shadow-md'
                  }`}
                >
                  {/* Photo Banner with Badges */}
                  <div className="relative w-full h-52 sm:h-64 overflow-hidden">
                    <img
                      src={fac.imageUrl}
                      alt={fac.nameTh}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        !fac.isAvailable ? 'grayscale' : 'hover:scale-105'
                      }`}
                    />

                    {/* Status Badge on photo */}
                    <div className="absolute top-3 left-3">
                      <div
                        className={`badge-on-colored px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md ${
                          fac.isAvailable
                            ? 'text-emerald-700'
                            : 'text-red-700'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            fac.isAvailable ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                        />
                        <span>{fac.isAvailable ? 'ว่าง' : 'เต็ม'}</span>
                      </div>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => toggleBookmark(fac.id, e)}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md ${
                        isBookmarked
                          ? 'bg-white text-orange-600'
                          : 'bg-white/80 hover:bg-white text-slate-700'
                      }`}
                      aria-label="บันทึก"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isBookmarked ? 'fill-orange-600 text-orange-600' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{fac.locationTh}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                      {fac.nameTh}
                    </h3>

                    {/* Spec badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {(fac.tagsTh || []).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Available slot preview pills (for sports) */}
                    {fac.availableSlotsToday && fac.isAvailable && (
                      <div className="pt-1">
                        <p className="text-[11px] text-slate-400 mb-1.5 font-medium">
                          รอบเวลาที่ว่างวันนี้:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {fac.availableSlotsToday.map((slot, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-3 py-1 rounded-xl text-xs font-bold bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-300"
                            >
                              {slot}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Full Item Stacked Layout */}
                    {!fac.isAvailable && (
                      <div className="space-y-2">
                        {/* Top row: White card container with orange bell icon, text, and toggle switch */}
                        <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 shadow-2xs flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                            <Bell className="w-4 h-4 text-orange-500 shrink-0" />
                            <span>
                              {fac.category === 'sports'
                                ? 'แจ้งเตือนเมื่อสนามว่าง'
                                : 'แจ้งเตือนเมื่อว่าง'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => toggleNotify(fac.id, e)}
                            className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                              isNotifyOn ? 'bg-brand' : 'bg-slate-300 dark:bg-slate-600'
                            }`}
                            style={{
                              backgroundColor: isNotifyOn ? 'var(--brand-strong)' : undefined,
                            }}
                          >
                            <div
                              className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                                isNotifyOn ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Bottom row: Full-width, muted/gray button with slashed circle icon and 'ไม่ว่าง' */}
                        <button
                          disabled
                          className="w-full py-3.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-slate-200 dark:border-slate-700"
                        >
                          <Ban className="w-4 h-4" />
                          <span>ไม่ว่าง</span>
                        </button>
                      </div>
                    )}

                    {/* Action Button for Available Item */}
                    {fac.isAvailable && (
                      <div className="pt-2">
                        <button
                          onClick={() => navigateToFacility(fac.id)}
                          className="w-full py-3.5 px-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-brand/20 transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer"
                          style={{ backgroundColor: 'var(--brand-strong)' }}
                        >
                          <span>{fac.category === 'sports' ? 'จองสนามนี้' : 'จองห้องนี้'}</span>
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ========================================================
             COMPACT STYLE (PC, iMac, Relax: screen_5a, screen_5b)
             ======================================================== */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFacilities.map((fac) => {
              const isNotifyOn = !!notificationToggles[fac.id];

              return (
                <div
                  key={fac.id}
                  className={`bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 transition-all ${
                    !fac.isAvailable ? 'opacity-95' : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex gap-3.5">
                    {/* Left Thumbnail Image with Status Badge */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0">
                      <img
                        src={fac.imageUrl}
                        alt={fac.nameTh}
                        className={`w-full h-full object-cover ${
                          !fac.isAvailable ? 'grayscale' : ''
                        }`}
                      />
                      <div className="absolute top-1.5 left-1.5">
                        <span
                          className={`badge-on-colored px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-xs ${
                            fac.isAvailable
                              ? 'text-emerald-700'
                              : 'text-red-700'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              fac.isAvailable ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                          />
                          <span>{fac.isAvailable ? 'ว่าง' : 'เต็ม'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Right Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
                            {fac.nameTh}
                          </h4>
                          <span className="shrink-0 px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 text-[10px] font-bold">
                            {fac.durationLimitTh}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="truncate">{fac.locationTh}</span>
                        </div>

                        {/* Specs row */}
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {(fac.tagsTh || []).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 truncate"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Full Item Wait Time indicator */}
                      {!fac.isAvailable && fac.nextAvailableTime && (
                        <div className="flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-red-400 mt-1">
                          <Clock className="w-3 h-3" />
                          <span>ว่างอีกครั้ง {fac.nextAvailableTime}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="mt-3.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {fac.isAvailable ? (
                      <button
                        onClick={() => navigateToFacility(fac.id)}
                        className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:opacity-90 active:scale-[0.99] cursor-pointer"
                        style={{ backgroundColor: 'var(--brand-strong)' }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>
                          {fac.category === 'relax' ? 'จองคิว' : 'จองเครื่องนี้'}
                        </span>
                      </button>
                    ) : (
                      <div className="space-y-2 pt-1">
                        {/* Top row: White card container with orange bell icon, text, and toggle switch */}
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 shadow-2xs flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                            <Bell className="w-4 h-4 text-orange-500 shrink-0" />
                            <span>
                              {fac.category === 'sports'
                                ? 'แจ้งเตือนเมื่อสนามว่าง'
                                : 'แจ้งเตือนเมื่อว่าง'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => toggleNotify(fac.id, e)}
                            className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                              isNotifyOn ? 'bg-brand' : 'bg-slate-300 dark:bg-slate-600'
                            }`}
                            style={{
                              backgroundColor: isNotifyOn
                                ? 'var(--brand-strong)'
                                : undefined,
                            }}
                          >
                            <div
                              className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                                isNotifyOn ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>

                        {/* Bottom row: Full-width, muted/gray button with slashed circle icon and 'ไม่ว่าง' */}
                        <button
                          disabled
                          className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed border border-slate-200 dark:border-slate-700"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>ไม่ว่าง</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Bottom Cabin notification card if relax */}
            {selectedCategoryId === 'relax' && (
              <div className="bg-blue-50/70 dark:bg-slate-900 rounded-3xl p-4 border border-blue-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      แจ้งเตือนเมื่อมีที่ว่าง
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      รับการแจ้งเตือนทันทีเมื่อ Cabin มีคิวว่าง
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setNotificationToggles((prev) => ({
                      ...prev,
                      cabin_general: !prev.cabin_general,
                    }))
                  }
                  className={`w-12 h-7 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                    notificationToggles.cabin_general
                      ? 'bg-brand'
                      : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  style={{
                    backgroundColor: notificationToggles.cabin_general
                      ? 'var(--brand-strong)'
                      : undefined,
                  }}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white shadow-xs transform transition-transform ${
                      notificationToggles.cabin_general ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
