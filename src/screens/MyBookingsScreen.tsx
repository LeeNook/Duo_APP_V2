import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Key,
  X,
  Star,
  CheckCircle,
  Lightbulb,
  Edit3,
  Check,
  Building,
  User,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/common/TopBar';
import { CancelModal } from '../components/common/CancelModal';
import { RatingSheet } from '../components/common/RatingSheet';
import { ViewReviewModal } from '../components/common/ViewReviewModal';

export const MyBookingsScreen: React.FC = () => {
  const {
    bookings,
    pastBookings,
    quota,
    user,
    setCurrentRoute,
    navigateToSuccess,
    navigateToCategory,
    openCancelModal,
    openRatingSheet,
    openViewReview,
    language,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const activeBookings = bookings.filter((b) => b.status !== 'cancelled');
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 lg:pb-12">
      <TopBar
        title={language === 'th' ? 'การจองของฉัน' : 'My Bookings'}
        showBack={true}
        onBack={() => setCurrentRoute('booking')}
      />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-6">
        {/* Top Header Badge & Quota Indicator */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <span>{language === 'th' ? 'ปีการศึกษา 2569' : 'Academic Year 2026'}</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
              {language === 'th' ? 'การจองของฉัน' : 'My Bookings'}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100/80 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 text-xs font-bold shadow-2xs">
            <span>🏆</span>
            <span>{language === 'th' ? `เหลือสิทธิ์วันนี้ ${quota.remainingToday} ครั้ง` : `${quota.remainingToday} bookings left today`}</span>
            <Info className="w-3.5 h-3.5 opacity-70" />
          </div>
        </div>

        {/* User Account Bar */}
        <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-slate-900 border border-blue-100/60 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-200 dark:bg-slate-700 text-blue-800 dark:text-blue-200 flex items-center justify-center font-bold text-[10px]">
              {language === 'th' ? 'นศ' : 'ST'}
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {language === 'th' ? 'บัญชีผู้ใช้: ' : 'User: '}<strong className="text-slate-900 dark:text-white">{user.name}</strong>
            </span>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300 font-bold text-[10px]">
            {language === 'th' ? 'สถานะปกติ' : 'Normal Status'}
          </span>
        </div>

        {/* Three Tab Switcher */}
        <div className="p-1 rounded-2xl bg-slate-200/70 dark:bg-slate-900 flex items-center gap-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{language === 'th' ? 'กำลังดำเนินการ' : 'Upcoming'}</span>
            {activeBookings.length > 0 && (
              <span
                className="px-1.5 py-0.2 rounded-full text-[10px] font-bold text-white ml-0.5"
                style={{ backgroundColor: 'var(--brand-strong)' }}
              >
                {activeBookings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{language === 'th' ? 'เสร็จสิ้นแล้ว' : 'Completed'}</span>
            {pastBookings.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 ml-0.5">
                {pastBookings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('cancelled')}
            className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'cancelled'
                ? 'bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <X className="w-3.5 h-3.5" />
            <span>{language === 'th' ? 'ยกเลิกแล้ว' : 'Cancelled'}</span>
            {cancelledBookings.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 ml-0.5">
                {cancelledBookings.length}
              </span>
            )}
          </button>
        </div>

        {/* =========================================
            TAB 1: UPCOMING BOOKINGS (กำลังดำเนินการ)
           ========================================= */}
        {activeTab === 'upcoming' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <span className="text-orange-600">🔔</span>
                <span>{language === 'th' ? 'รายการกำลังดำเนินการ' : 'In Progress Bookings'}</span>
              </div>
              <span className="text-slate-400">
                {language === 'th' ? `ทั้งหมด ${activeBookings.length} รายการ` : `Total ${activeBookings.length} items`}
              </span>
            </div>

            {activeBookings.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center space-y-3">
                <p className="text-xs text-slate-400">{language === 'th' ? 'ไม่มีรายการจองที่กำลังจะถึง' : 'No upcoming bookings'}</p>
                <button
                  onClick={() => setCurrentRoute('booking')}
                  className="px-4 py-2 rounded-xl text-white font-bold text-xs shadow-sm hover:opacity-95 transition-all cursor-pointer"
                  style={{ backgroundColor: 'var(--brand-strong)' }}
                >
                  {language === 'th' ? 'ค้นหาพื้นที่เพื่อจอง' : 'Browse facilities to book'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activeBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Thumbnail with category label */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-900">
                        <img
                          src={
                            booking.category === 'computer'
                              ? '/assets/aistudio/Image_1_5788b2c5.jpeg'
                              : booking.category === 'seminar-room'
                              ? '/assets/aistudio/Image_6_7b6b6f89.jpeg'
                              : '/assets/aistudio/Image_3_3a55cfff.jpeg'
                          }
                          alt={booking.locationCode}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded-md bg-black/70 text-white font-mono text-[9px] font-bold">
                          {booking.category === 'computer'
                            ? 'PC'
                            : booking.category === 'seminar-room'
                            ? 'ROOM'
                            : 'LAB'}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
                            {booking.locationCode}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold shrink-0">
                            ● {language === 'th' ? 'ยืนยันแล้ว' : 'Confirmed'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {booking.locationNameTh}
                        </p>

                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                          <Clock className="w-3.5 h-3.5 text-orange-600" />
                          <span>
                            {booking.dateTh} {booking.timeRangeTh}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons row */}
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => openCancelModal(booking)}
                        className="flex-1 py-2.5 px-3 rounded-xl border-2 border-red-500 hover:border-red-600 bg-red-50/70 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                        aria-label={language === 'th' ? 'ยกเลิกการจอง' : 'Cancel booking'}
                      >
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{language === 'th' ? 'ยกเลิก' : 'Cancel'}</span>
                      </button>

                      <button
                        onClick={() => navigateToSuccess(booking.id)}
                        className="flex-1 py-2.5 px-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer"
                        style={{ backgroundColor: 'var(--brand-strong)' }}
                      >
                        <Key className="w-3.5 h-3.5" />
                        <span>{language === 'th' ? 'ดูรหัสปลดล็อก' : 'View Pass Code'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================
            TAB 2: COMPLETED BOOKINGS (เสร็จสิ้นแล้ว)
           ========================================= */}
        {activeTab === 'completed' && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <span className="text-blue-600">🎓</span>
                <span>{language === 'th' ? 'ประวัติการใช้งานที่เสร็จสิ้นแล้ว' : 'Completed Bookings'}</span>
              </div>
              <span className="text-slate-400">{language === 'th' ? `ทั้งหมด ${pastBookings.length} รายการ` : `Total ${pastBookings.length} items`}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pastBookings.map((past) => (
                <div
                  key={past.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={past.imageUrl}
                      alt={past.roomName}
                      className="w-14 h-14 rounded-2xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {past.roomName}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {past.dateTh} {past.timeRangeTh}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {past.categoryTh}
                      </p>

                      {/* Star rating if already reviewed */}
                      {past.rated && past.ratingStars && (
                        <div className="flex items-center gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${
                                s <= past.ratingStars!
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Review action button: clickable if rated to view read-only */}
                  <div className="shrink-0">
                    {!past.rated ? (
                      <button
                        onClick={() => openRatingSheet(past)}
                        className="px-3.5 py-2 rounded-xl bg-orange-100 dark:bg-orange-950/60 hover:bg-orange-200 text-orange-800 dark:text-orange-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{language === 'th' ? 'รีวิว' : 'Review'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => openViewReview(past)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800/60 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                        title={language === 'th' ? 'คลิกเพื่อดูรีวิวของคุณ' : 'Click to view your review'}
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
                        <span>{language === 'th' ? 'รีวิวแล้ว' : 'Reviewed'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================
            TAB 3: CANCELLED BOOKINGS (ยกเลิกแล้ว)
           ========================================= */}
        {activeTab === 'cancelled' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs px-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <span className="text-red-600">✕</span>
                <span>{language === 'th' ? 'รายการที่ยกเลิกแล้ว' : 'Cancelled Bookings'}</span>
              </div>
              <span className="text-slate-400">
                {language === 'th' ? `ทั้งหมด ${cancelledBookings.length} รายการ` : `Total ${cancelledBookings.length} items`}
              </span>
            </div>

            {cancelledBookings.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <X className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {language === 'th' ? 'ไม่มีรายการที่ถูกยกเลิก' : 'No cancelled bookings'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {language === 'th' ? 'รายการที่คุณกดยกเลิกจะถูกเก็บประวัติไว้ที่นี่' : 'Bookings you cancel will appear here in history'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {cancelledBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="opacity-75 bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-4 sm:p-5 shadow-2xs border border-slate-200/80 dark:border-slate-800 space-y-3 transition-all hover:opacity-90"
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Thumbnail dimmed with grayscale */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-slate-900 filter grayscale">
                        <img
                          src={
                            booking.category === 'computer'
                              ? '/assets/aistudio/Image_1_5788b2c5.jpeg'
                              : booking.category === 'seminar-room'
                              ? '/assets/aistudio/Image_6_7b6b6f89.jpeg'
                              : '/assets/aistudio/Image_3_3a55cfff.jpeg'
                          }
                          alt={booking.locationCode}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded-md bg-black/70 text-white font-mono text-[9px] font-bold">
                          {language === 'th' ? 'ยกเลิก' : 'CANC'}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-base font-bold text-slate-700 dark:text-slate-300 line-through truncate">
                            {booking.locationCode}
                          </h4>
                          {/* CRITICAL: Status badge "ยกเลิกแล้ว" (red text on white bg) */}
                          <span className="px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/80 text-[10px] font-bold shrink-0 shadow-2xs">
                            {language === 'th' ? 'ยกเลิกแล้ว' : 'Cancelled'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                          {booking.locationNameTh}
                        </p>

                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {booking.dateTh} {booking.timeRangeTh}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Refund info & re-booking shortcut */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 dark:border-slate-800 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                        <span>✓ {language === 'th' ? 'คืนสิทธิ์โควต้าแล้ว (+1)' : 'Quota Restored (+1)'}</span>
                      </div>

                      <button
                        onClick={() => navigateToCategory(booking.category || 'seminar-room')}
                        className="py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                      >
                        {language === 'th' ? 'จองใหม่อีกครั้ง' : 'Rebook'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom cancellation policy tip */}
        <div className="p-4 rounded-3xl bg-blue-50/70 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {language === 'th'
              ? 'สามารถยกเลิกการจองล่วงหน้าได้อย่างน้อย 30 นาที เพื่อไม่ให้ถูกหักคะแนนสิทธิ์การใช้งานประจำภาคเรียน'
              : 'Bookings can be cancelled up to 30 minutes in advance to avoid semester usage quota deduction.'}
          </p>
        </div>
      </main>

      {/* Cancel Modal (over History screen) */}
      <CancelModal />

      {/* Rating Bottom Sheet (over History screen) */}
      <RatingSheet />

      {/* Read-Only Past Review Modal (over History screen) */}
      <ViewReviewModal />
    </div>
  );
};
