import React from 'react';
import { Star, X, CheckCircle, MessageSquareQuote, Calendar, Clock, Building } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ViewReviewModal: React.FC = () => {
  const { viewingReviewBooking, isViewReviewOpen, closeViewReview } = useApp();

  if (!isViewReviewOpen || !viewingReviewBooking) return null;

  const stars = viewingReviewBooking.ratingStars || 5;
  const chips = viewingReviewBooking.reviewChips && viewingReviewBooking.reviewChips.length > 0
    ? viewingReviewBooking.reviewChips
    : ['สะอาด', 'อุปกรณ์พร้อมใช้', 'สะดวกสบาย'];
  const comment = viewingReviewBooking.reviewComment || 'การใช้งานราบรื่นดีมาก อุปกรณ์พร้อมใช้ บรรยากาศเงียบสงบเหมาะแก่การอ่านหนังสือ';

  const getStarLabel = (s: number) => {
    switch (s) {
      case 5:
        return '5.0 / 5.0 • ยอดเยี่ยมมาก';
      case 4:
        return '4.0 / 5.0 • ประทับใจมาก';
      case 3:
        return '3.0 / 5.0 • พอใช้ได้';
      case 2:
        return '2.0 / 5.0 • ควรปรับปรุง';
      default:
        return '1.0 / 5.0 • ปรับปรุงด่วน';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs select-none animate-fade-in">
      <div className="fixed inset-0" onClick={closeViewReview} />

      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-[32px] sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto animate-slide-up z-10">
        {/* Mobile drag handle */}
        <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto -mt-1 sm:hidden mb-2" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                การประเมินและการรีวิวของคุณ
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                ประวัติความคิดเห็นที่บันทึกไว้ในระบบ (Read-Only)
              </p>
            </div>
          </div>

          <button
            onClick={closeViewReview}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="ปิด"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Facility Info Card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <img
            src={viewingReviewBooking.imageUrl}
            alt={viewingReviewBooking.roomName}
            className="w-14 h-14 rounded-xl object-cover shrink-0"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300">
              {viewingReviewBooking.categoryTh}
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate mt-1">
              {viewingReviewBooking.roomName}
            </h4>
            <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
              {viewingReviewBooking.dateTh} • {viewingReviewBooking.timeRangeTh}
            </p>
          </div>
        </div>

        {/* Stars Section */}
        <div className="text-center py-2 bg-amber-50/60 dark:bg-amber-950/20 rounded-2xl border border-amber-100/80 dark:border-amber-900/40 space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-7 h-7 ${
                  s <= stars
                    ? 'fill-amber-500 text-amber-500'
                    : 'text-slate-300 dark:text-slate-700'
                }`}
              />
            ))}
          </div>
          <p className="text-xs font-bold text-amber-900 dark:text-amber-300">
            {getStarLabel(stars)}
          </p>
        </div>

        {/* Review Chips */}
        {chips.length > 0 && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              จุดเด่นที่ประทับใจ
            </label>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1"
                >
                  <span>✓</span>
                  <span>{chip}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Review Comment Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <MessageSquareQuote className="w-3.5 h-3.5 text-slate-400" />
            <span>ความคิดเห็นของคุณ</span>
          </label>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
            "{comment}"
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2">
          <button
            onClick={closeViewReview}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-md transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
