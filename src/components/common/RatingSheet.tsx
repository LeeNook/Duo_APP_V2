import React, { useState } from 'react';
import {
  Star,
  ThumbsUp,
  FileText,
  Lock,
  Send,
  X,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RatingSheet: React.FC = () => {
  const {
    ratingBooking,
    isRatingSheetOpen,
    closeRatingSheet,
    submitRating,
    language,
  } = useApp();

  const [stars, setStars] = useState(4);
  const [selectedTags, setSelectedTags] = useState<string[]>(['สะอาด', 'อุปกรณ์พร้อมใช้']);
  const [reviewText, setReviewText] = useState('โต๊ะและเก้าอี้สบายมาก สมาร์ททีวีเชื่อมต่อง่ายครับ');

  if (!isRatingSheetOpen || !ratingBooking) return null;

  const quickCompliments = [
    { th: 'สะอาด', en: 'Clean' },
    { th: 'เงียบสงบ', en: 'Quiet' },
    { th: 'อุปกรณ์พร้อมใช้', en: 'Ready Equipment' },
    { th: 'เจ้าหน้าที่ดี', en: 'Great Staff' },
    { th: 'เชื่อมต่อง่าย', en: 'Easy Connectivity' },
  ];

  const toggleTag = (tagTh: string) => {
    if (selectedTags.includes(tagTh)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagTh));
    } else {
      setSelectedTags([...selectedTags, tagTh]);
    }
  };

  const handleSubmit = () => {
    submitRating(ratingBooking.id, stars, selectedTags, reviewText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs select-none">
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={closeRatingSheet}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-t-[32px] p-5 pb-8 shadow-2xl border-t border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto animate-slide-up z-10">
        {/* Drag handle */}
        <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto -mt-1 mb-2" />

        {/* Mini Item Header */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
          <img
            src={ratingBooking.imageUrl}
            alt={ratingBooking.roomName}
            className="w-12 h-12 rounded-xl object-cover shrink-0"
          />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {language === 'th' ? ratingBooking.roomName : (ratingBooking.roomNameEn || ratingBooking.roomName)}
            </h4>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 truncate">
              {(language === 'th' ? ratingBooking.buildingTh : (ratingBooking.buildingEn || ratingBooking.buildingTh))} • {(language === 'th' ? ratingBooking.dateTh : (ratingBooking.dateEn || ratingBooking.dateTh))} {(language === 'th' ? ratingBooking.timeRangeTh : (ratingBooking.timeRangeEn || ratingBooking.timeRangeTh))}
            </p>
          </div>
          <button
            onClick={closeRatingSheet}
            className="ml-auto p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sheet Title */}
        <div className="text-center space-y-1">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            {language === 'th' ? 'ให้คะแนนการใช้งาน' : 'Rate Your Experience'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'th' ? 'ความคิดเห็นของคุณช่วยยกระดับพื้นที่การเรียนรู้ให้ดียิ่งขึ้น' : 'Your feedback helps improve our learning spaces.'}
          </p>
        </div>

        {/* 5-Star Interactive Selector */}
        <div className="flex items-center justify-center gap-2 py-1">
          {[1, 2, 3, 4, 5].map((starIndex) => (
            <button
              key={starIndex}
              onClick={() => setStars(starIndex)}
              className="p-1 transition-transform hover:scale-125 active:scale-95 cursor-pointer"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  starIndex <= stars
                    ? 'fill-orange-500 text-orange-500'
                    : 'text-slate-300 dark:text-slate-700'
                }`}
                style={{
                  fill: starIndex <= stars ? 'var(--brand-strong)' : 'none',
                  color: starIndex <= stars ? 'var(--brand-strong)' : undefined,
                }}
              />
            </button>
          ))}
        </div>

        {/* Quick Compliment Tags */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              <ThumbsUp className="w-3.5 h-3.5 text-orange-600" />
              <span>{language === 'th' ? 'คำชมเร็ว' : 'Quick Tags'}</span>
            </div>
            <span className="text-slate-400">
              {language === 'th' ? `เลือก ${selectedTags.length} รายการ` : `${selectedTags.length} selected`}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {quickCompliments.map((tag) => {
              const isSelected = selectedTags.includes(tag.th);
              return (
                <button
                  key={tag.th}
                  onClick={() => toggleTag(tag.th)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-200'
                      : 'bg-blue-50/80 dark:bg-slate-800 text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-slate-700'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--brand-light)' : undefined,
                    color: isSelected ? 'var(--brand-strong)' : undefined,
                  }}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{language === 'th' ? tag.th : tag.en}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Feedback Textarea */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>{language === 'th' ? 'ข้อเสนอแนะเพิ่มเติม' : 'Additional Feedback'}</span>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50/50 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 space-y-2">
            <textarea
              value={reviewText}
              maxLength={300}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder={language === 'th' ? 'ระบุข้อเสนอแนะเพิ่มเติมเพื่อพัฒนาการบริการ...' : 'Share your experience or suggestions...'}
              className="w-full h-20 bg-transparent text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden resize-none"
            />
            <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-slate-700 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>{language === 'th' ? 'รีวิวแบบไม่เปิดเผยตัวตน' : 'Anonymous review'}</span>
              </span>
              <span>{reviewText.length}/300</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleSubmit}
            className="w-full py-4 px-6 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-brand/25 transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer"
            style={{ backgroundColor: 'var(--brand-strong)' }}
          >
            <Send className="w-4 h-4" />
            <span>{language === 'th' ? 'ส่งรีวิว' : 'Submit Review'}</span>
          </button>

          <button
            onClick={closeRatingSheet}
            className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-center cursor-pointer"
          >
            {language === 'th' ? 'ข้ามไปก่อน (ไม่รีวิว)' : 'Skip for now'}
          </button>
        </div>
      </div>
    </div>
  );
};
