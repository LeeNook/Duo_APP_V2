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

  // Dynamic tags with bilingual support
  const dynamicTagOptions = useMemo(() => {
    switch (facility.category) {
      case 'seminar-room':
        return [
          { th: '+ สายต่อ HDMI', en: '+ HDMI Cable' },
          { th: '+ ปลั๊กพ่วง 5 ม.', en: '+ 5m Extension Cord' },
          { th: '+ ปากกาไวท์บอร์ด', en: '+ Whiteboard Marker' },
          { th: '+ รีโมทพรีเซนต์', en: '+ Presentation Remote' },
        ];
      case 'sports':
        return [
          { th: '+ ขอเปิดไฟสนาม', en: '+ Request Floodlights' },
          { th: '+ ขอเปลี่ยนสนามหากว่าง', en: '+ Switch Court if Available' },
          { th: '+ แจ้งเจ้าหน้าที่ประจำสนามล่วงหน้า', en: '+ Notify Staff in Advance' },
        ];
      case 'relax':
        return [
          { th: '+ ขอผ้าห่มเพิ่ม', en: '+ Extra Blanket' },
          { th: '+ ขอทำความสะอาดก่อนเข้า', en: '+ Sanitize Before Entry' },
          { th: '+ ที่อุดหู (Earplugs)', en: '+ Earplugs' },
        ];
      case 'computer':
      case 'imac':
      default:
        return [
          { th: '+ ขอสายชาร์จ Type-C', en: '+ Type-C Cable' },
          { th: '+ เมาส์สำหรับงานกราฟิก', en: '+ Graphic Design Mouse' },
          { th: '+ หูฟังตัดเสียงรบกวน', en: '+ Noise-Cancelling Headphones' },
          { th: '+ แผ่นรองเมาส์ขนาดใหญ่', en: '+ Large Mousepad' },
        ];
    }
  }, [facility.category]);

  const [selectedTagThList, setSelectedTagThList] = useState<string[]>(['+ สายต่อ HDMI']);

  const toggleTag = (tagTh: string) => {
    if (selectedTagThList.includes(tagTh)) {
      setSelectedTagThList(selectedTagThList.filter((t) => t !== tagTh));
    } else {
      setSelectedTagThList([...selectedTagThList, tagTh]);
    }
  };

  const handleConfirm = () => {
    const formattedTags = selectedTagThList.map((tagTh) => {
      const match = dynamicTagOptions.find((opt) => opt.th === tagTh);
      return language === 'th' ? tagTh : (match?.en || tagTh);
    });
    confirmBooking(notes, formattedTags);
  };

  const lateMin = facility.lateMin ?? 15;
  const displayName = language === 'th' ? facility.nameTh : (facility.nameEn || facility.nameTh);
  const displayBuilding = language === 'th' ? facility.buildingTh : (facility.buildingEn || facility.buildingTh);
  const displayFloor = language === 'th' ? facility.floorTh : (facility.floorEn || facility.floorTh);
  const displayCapacity = language === 'th' ? facility.capacityLabelTh : (facility.capacityLabelEn || facility.capacityLabelTh);
  const displayStatus = language === 'th' ? facility.statusLabelTh : (facility.statusLabelEn || 'Available');

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
            <span className="text-slate-400 dark:text-slate-400">
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
            <span>
              {language === 'th'
                ? 'ศูนย์กีฬาไม่มีอุปกรณ์ให้ยืม โปรดนำมาเอง'
                : 'Sports Center does not provide equipment loan. Please bring your own.'}
            </span>
          </div>
        )}

        {/* 2. Summary Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
          {/* Header image banner */}
          <div className="relative h-44 sm:h-52 w-full overflow-hidden">
            <img
              src={facility.imageUrl}
              alt={displayName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="badge-on-colored px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700 flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{displayStatus}</span>
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="badge-on-colored px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-md">
                <Users className="w-3.5 h-3.5 text-slate-600" />
                <span>{displayCapacity}</span>
              </span>
            </div>
          </div>

          {/* Details table */}
          <div className="p-4 sm:p-5 space-y-3">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {displayName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {displayBuilding}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-3 space-y-2 text-xs border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">{language === 'th' ? 'รายการ' : 'Item'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {facility.category === 'sports'
                    ? (language === 'th' ? 'ประเภท: Hard Court' : 'Type: Hard Court')
                    : facility.category === 'seminar-room'
                    ? (language === 'th' ? 'ห้องค้นคว้ากลุ่ม' : 'Study Room')
                    : displayName}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">{language === 'th' ? 'สถานที่' : 'Location'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {displayFloor}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">{language === 'th' ? 'วันที่' : 'Date'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {draftBooking.dateTh}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">{language === 'th' ? 'เวลา' : 'Time'}</span>
                <span
                  className="font-black text-sm"
                  style={{ color: 'var(--brand-strong)' }}
                >
                  {draftBooking.timeRangeTh} ({draftBooking.durationLabelTh})
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">{language === 'th' ? 'ผู้ขอใช้' : 'Applicant'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {language === 'th' ? user.name : (user.nameEn || user.name)} {language === 'th' ? `รหัส ${user.studentId}` : `ID: ${user.studentId}`}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">{language === 'th' ? 'โควต้าที่ถูกใช้' : 'Quota Deducted'}</span>
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
            <span className="text-xs text-slate-400 dark:text-slate-400">
              {language === 'th' ? 'อุปกรณ์เสริม' : 'Accessories'}
            </span>
          </div>

          {/* Quick tags pills */}
          <div className="flex flex-wrap gap-2">
            {dynamicTagOptions.map((opt) => {
              const isSelected = selectedTagThList.includes(opt.th);
              return (
                <button
                  key={opt.th}
                  onClick={() => toggleTag(opt.th)}
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
                  <span>{language === 'th' ? opt.th : opt.en}</span>
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
              className="w-full h-24 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand resize-none"
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
              {language === 'th'
                ? `มาช้าเกิน ${lateMin} นาที ตัดสิทธิ์โดยอัตโนมัติ`
                : `Late by >${lateMin} mins forfeits booking automatically`}
            </p>
            <p className="text-[11px] text-red-600/80 dark:text-red-300">
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
            className="w-full py-2.5 text-center text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{language === 'th' ? 'แก้ไขเวลา' : 'Change Time'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
