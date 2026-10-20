import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  ShieldAlert,
  AlertTriangle,
  Building,
  Check,
  ChevronRight,
  Flame,
  Users,
  PenTool,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/common/TopBar';

export const ConfirmBookingScreen: React.FC = () => {
  const {
    draftBooking,
    facilities,
    user,
    quota,
    setCurrentRoute,
    navigateToFacility,
    confirmBooking,
    language,
  } = useApp();

  const facility = useMemo(() => {
    return (
      facilities.find((f) => f.id === draftBooking.facilityId) ||
      facilities[0]
    );
  }, [facilities, draftBooking.facilityId]);

  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['+ สายต่อ HDMI']);

  // Dynamic tags based on category
  const dynamicTagOptions = useMemo(() => {
    switch (facility.category) {
      case 'seminar-room':
        return [
          '+ สายต่อ HDMI',
          '+ ปลั๊กพ่วง 5 ม.',
          '+ ปากกาไวท์บอร์ด',
          '+ รีโมทพรีเซนต์',
        ];
      case 'sports':
        return [
          '+ ขอเปิดไฟสนาม',
          '+ ขอเปลี่ยนสนามหากว่าง',
          '+ แจ้งเจ้าหน้าที่ประจำสนามล่วงหน้า',
        ];
      case 'relax':
        return [
          '+ ขอผ้าห่มเพิ่ม',
          '+ ขอทำความสะอาดก่อนเข้า',
          '+ ที่อุดหู (Earplugs)',
        ];
      case 'computer':
      case 'imac':
      default:
        return [
          '+ ขอสายชาร์จ Type-C',
          '+ เมาส์สำหรับงานกราฟิก',
          '+ หูฟังตัดเสียงรบกวน',
          '+ แผ่นรองเมาส์ขนาดใหญ่',
        ];
    }
  }, [facility.category]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleConfirm = () => {
    confirmBooking(notes, selectedTags);
  };

  const lateMin = facility.lateMin ?? 15;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-40 lg:pb-28">
      <TopBar
        title={language === 'th' ? 'แบบฟอร์มยืนยันการจอง' : 'Booking Confirmation'}
        showBack={true}
        onBack={() => navigateToFacility(facility.id)}
      />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-32 space-y-5">
        {/* Step Indicator */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span
              className="font-bold tracking-tight"
              style={{ color: 'var(--brand-strong)' }}
            >
              {language === 'th' ? 'ขั้นตอน 2 จาก 3' : 'Step 2 of 3'}
            </span>
            <span className="text-slate-400 dark:text-slate-500">
              {language === 'th' ? 'ตรวจสอบข้อมูลก่อนบันทึก' : 'Verify details before confirmation'}
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden flex">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: '66%', backgroundColor: 'var(--brand-strong)' }}
            />
          </div>
        </div>

        {/* 1. Sports equipment warning banner if noEquipment: true */}
        {facility.noEquipment && (
          <div className="p-3.5 rounded-2xl bg-orange-100/90 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 flex items-center gap-2.5 text-xs text-orange-950 dark:text-orange-200 font-medium shadow-2xs">
            <AlertCircle className="w-4 h-4 text-orange-600 shrink-0" />
            <span>{language === 'th' ? 'ศูนย์กีฬาไม่มีอุปกรณ์ให้ยืม โปรดนำมาเอง' : 'Sports Center does not provide equipment loan. Please bring your own.'}</span>
          </div>
        )}

        {/* 2. Summary Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
          {/* Header image banner */}
          <div className="relative h-44 sm:h-52 w-full overflow-hidden">
            <img
              src={facility.imageUrl}
              alt={facility.nameTh}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="badge-on-colored px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700 flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{language === 'th' ? facility.statusLabelTh : (facility.statusLabelEn || 'Available')}</span>
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="badge-on-colored px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-md">
                <Users className="w-3.5 h-3.5 text-slate-600" />
                <span>{language === 'th' ? facility.capacityLabelTh : (facility.capacityLabelEn || facility.capacityLabelTh)}</span>
              </span>
            </div>
          </div>

          {/* Details table */}
          <div className="p-4 sm:p-5 space-y-3">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {language === 'th' ? facility.nameTh : (facility.nameEn || facility.nameTh)}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {language === 'th' ? facility.buildingTh : (facility.buildingEn || facility.buildingTh)}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-3 space-y-2 text-xs border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-400">{language === 'th' ? 'รายการ' : 'Item'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {facility.category === 'sports'
                    ? (language === 'th' ? 'ประเภท: Hard Court' : 'Type: Hard Court')
                    : facility.category === 'seminar-room'
                    ? (language === 'th' ? 'ห้องค้นคว้ากลุ่ม' : 'Study Room')
                    : (language === 'th' ? facility.nameTh : (facility.nameEn || facility.nameTh))}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-400">{language === 'th' ? 'สถานที่' : 'Location'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {language === 'th' ? facility.floorTh : (facility.floorEn || facility.floorTh)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700">
                <span className="text-slate-400 dark:text-slate-400">{language === 'th' ? 'วันที่' : 'Date'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {draftBooking.dateTh}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-400">{language === 'th' ? 'เวลา' : 'Time'}</span>
                <span
                  className="font-black text-sm"
                  style={{ color: 'var(--brand-strong)' }}
                >
                  {draftBooking.timeRangeTh} ({draftBooking.durationLabelTh})
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700">
                <span className="text-slate-400 dark:text-slate-400">{language === 'th' ? 'ผู้ขอใช้' : 'Applicant'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {user.name} {language === 'th' ? `รหัส ${user.studentId}` : `ID ${user.studentId}`}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 dark:text-slate-400">{language === 'th' ? 'โควต้าที่ถูกใช้' : 'Quota Deducted'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {language === 'th'
                    ? `1 ครั้ง (เหลือ ${Math.max(0, quota.remainingToday - 1)} ครั้ง/วัน)`
                    : `1 booking (${Math.max(0, quota.remainingToday - 1)} left today)`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Dynamic Quick Tags based on Category */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {language === 'th' ? 'หมายเหตุเพิ่มเติมถึงเจ้าหน้าที่ (ถ้ามี)' : 'Additional Notes to Staff (Optional)'}
              </h4>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {language === 'th' ? 'อุปกรณ์เสริม' : 'Accessories'}
            </span>
          </div>

          {/* Quick tags pills */}
          <div className="flex flex-wrap gap-2">
            {dynamicTagOptions.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'text-white shadow-xs'
                      : 'bg-blue-50/80 dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-slate-700 hover:bg-blue-100'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--brand-strong)' : undefined,
                  }}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>

          {/* Additional Notes Textbox */}
          <div className="pt-2">
            <textarea
              value={notes}
              maxLength={100}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                language === 'th'
                  ? 'ระบุความต้องการเพิ่มเติม เช่น ต้องการโปรเจกเตอร์ความละเอียดสูง หรือการจัดโต๊ะพิเศษ...'
                  : 'Specify additional requests, e.g., projector resolution, custom desk setup...'
              }
              className="w-full h-24 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand resize-none"
            />
            <div className="flex justify-end text-[10px] text-slate-400 mt-1">
              {notes.length}/100
            </div>
          </div>
        </div>

        {/* 4. Important Policy Warning */}
        <div className="p-4 rounded-3xl bg-red-50/80 dark:bg-red-950/30 border border-red-200/80 dark:border-red-900/60 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div className="space-y-0.5">
            <h5 className="text-xs font-bold text-red-900 dark:text-red-200">
              {language === 'th' ? 'ข้อกำหนดสำคัญ' : 'Important Policy'}
            </h5>
            <p className="text-xs font-bold text-red-700 dark:text-red-300">
              {language === 'th' ? `มาช้าเกิน ${lateMin} นาที ตัดสิทธิ์โดยอัตโนมัติ` : `Late by >${lateMin} mins forfeits booking automatically`}
            </p>
            <p className="text-[11px] text-red-600/80 dark:text-red-400">
              {facility.category === 'sports'
                ? (language === 'th' ? 'ต้องแสดงบัตรนักศึกษาทุกครั้งเมื่อเข้าใช้สนาม' : 'Student ID must be presented upon entry')
                : facility.category === 'relax'
                ? (language === 'th' ? 'กรุณามาถึงจุดบริการก่อนเวลาอย่างน้อย 3 นาที เพื่อรับการเช็กอินเข้าใช้งาน' : 'Please arrive 3 minutes early for check-in')
                : (language === 'th' ? 'ระบบจะปล่อยสิทธิ์ให้คิวถัดไปและบันทึกประวัติการไม่เข้าใช้งาน' : 'System will release slot to next in queue and record no-show')}
            </p>
          </div>
        </div>
      </main>

      {/* 5. Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 lg:left-72 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 p-4 transition-colors">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <button
            onClick={handleConfirm}
            className="w-full py-4 px-6 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-brand/25 transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer"
            style={{ backgroundColor: 'var(--brand-strong)' }}
          >
            <span>{language === 'th' ? 'ยืนยันการจอง' : 'Confirm Booking'}</span>
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={() => navigateToFacility(facility.id)}
            className="w-full py-2.5 text-center text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{language === 'th' ? 'แก้ไขเวลา' : 'Change Time'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
