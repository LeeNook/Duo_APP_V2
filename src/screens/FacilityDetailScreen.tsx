import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Share2,
  Heart,
  Users,
  MapPin,
  Clock,
  RotateCcw,
  Tv,
  PenTool,
  Info,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  UserPlus,
  X,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/common/TopBar';
import {
  KLLC,
  LAB,
  TENNIS,
  SLOT_PATTERN_A,
  SLOT_PATTERN_B,
  SLOT_PATTERN_C,
} from '../data/mockData';

interface FriendMember {
  id: string;
  initial: string;
  nameTh: string;
  nameEn: string;
  role: 'leader' | 'member';
  color: string;
}

export const FacilityDetailScreen: React.FC = () => {
  const {
    selectedFacilityId,
    facilities,
    setCurrentRoute,
    navigateToCategory,
    navigateToConfirm,
    language,
    showToast,
  } = useApp();

  // Find facility or default to A107
  const facility = useMemo(() => {
    return (
      facilities.find((f) => f.id === selectedFacilityId) ||
      facilities[0]
    );
  }, [facilities, selectedFacilityId]);

  // States
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isRulesOpen, setIsRulesOpen] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(1); // 0 = Sun 25, 1 = Mon 26 (default)
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('14:00 - 15:00'); // default matching screenshot 7

  // Teammates for group bookings
  const [friends, setFriends] = useState<FriendMember[]>([
    {
      id: 'f-1',
      initial: 'N',
      nameTh: 'ณัฐพล ภ.',
      nameEn: 'Natthapol P.',
      role: 'leader',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'f-2',
      initial: 'K',
      nameTh: 'กัญญารัตน์',
      nameEn: 'Kanyarat M.',
      role: 'member',
      color: 'bg-orange-100 text-orange-800',
    },
  ]);

  // 7-day date strip (October 2026, 25 Sun to 31 Sat)
  const daysList = [
    { dayOfWeekTh: 'อา', dayOfWeekEn: 'Sun', dayOfMonth: 25, fullDateTh: 'วันอาทิตย์ 25 ต.ค. 2569', fullDateEn: 'Sunday 25 Oct 2026' },
    { dayOfWeekTh: 'จ', dayOfWeekEn: 'Mon', dayOfMonth: 26, fullDateTh: 'วันจันทร์ 26 ต.ค. 2569', fullDateEn: 'Monday 26 Oct 2026' },
    { dayOfWeekTh: 'อ', dayOfWeekEn: 'Tue', dayOfMonth: 27, fullDateTh: 'วันอังคาร 27 ต.ค. 2569', fullDateEn: 'Tuesday 27 Oct 2026' },
    { dayOfWeekTh: 'พ', dayOfWeekEn: 'Wed', dayOfMonth: 28, fullDateTh: 'วันพุธ 28 ต.ค. 2569', fullDateEn: 'Wednesday 28 Oct 2026' },
    { dayOfWeekTh: 'พฤ', dayOfWeekEn: 'Thu', dayOfMonth: 29, fullDateTh: 'วันพฤหัสบดี 29 ต.ค. 2569', fullDateEn: 'Thursday 29 Oct 2026' },
    { dayOfWeekTh: 'ศ', dayOfWeekEn: 'Fri', dayOfMonth: 30, fullDateTh: 'วันศุกร์ 30 ต.ค. 2569', fullDateEn: 'Friday 30 Oct 2026' },
    { dayOfWeekTh: 'ส', dayOfWeekEn: 'Sat', dayOfMonth: 31, fullDateTh: 'วันเสาร์ 31 ต.ค. 2569', fullDateEn: 'Saturday 31 Oct 2026' },
  ];

  // Check if facility is closed on selected day according to KLLC, LAB, TENNIS constants
  const isFacilityClosedToday = useMemo(() => {
    if (facility.scheduleType === 'LAB') {
      return LAB[selectedDayIndex] === null;
    }
    if (facility.scheduleType === 'KLLC') {
      return KLLC[selectedDayIndex] === null;
    }
    if (facility.scheduleType === 'TENNIS') {
      return TENNIS[selectedDayIndex] === null;
    }
    return false;
  }, [facility.scheduleType, selectedDayIndex]);

  // Dynamic time slots based on selected date
  const timeSlots = useMemo(() => {
    switch (selectedDayIndex) {
      case 1: // Mon 26 Oct (Pattern A matching screenshot 7)
        return SLOT_PATTERN_A;
      case 0: // Sun 25 Oct
      case 2: // Tue 27 Oct
      case 5: // Fri 30 Oct
        return SLOT_PATTERN_B;
      case 3: // Wed 28 Oct
      case 4: // Thu 29 Oct
      case 6: // Sat 31 Oct
      default:
        return SLOT_PATTERN_C;
    }
  }, [selectedDayIndex]);

  // Auto-adjust selected slot when switching to a date where the current slot is unavailable
  React.useEffect(() => {
    const isCurrentAvailable = timeSlots.some(
      (slot) => slot.time === selectedSlotTime && slot.available && !isFacilityClosedToday
    );
    if (!isCurrentAvailable && !isFacilityClosedToday) {
      const firstAvailable = timeSlots.find((slot) => slot.available);
      if (firstAvailable) {
        setSelectedSlotTime(firstAvailable.time);
      }
    }
  }, [timeSlots, isFacilityClosedToday, selectedSlotTime]);

  // Carousel images
  const images = facility.additionalImages || [facility.imageUrl];

  // Add friend handler
  const handleAddFriend = () => {
    const friendPool: FriendMember[] = [
      { id: 'f-3', initial: 'W', nameTh: 'วรเมธ ส.', nameEn: 'Worameth S.', role: 'member', color: 'bg-emerald-100 text-emerald-800' },
      { id: 'f-4', initial: 'P', nameTh: 'ปิติพงษ์', nameEn: 'Pitipong T.', role: 'member', color: 'bg-purple-100 text-purple-800' },
      { id: 'f-5', initial: 'T', nameTh: 'ธนกฤต', nameEn: 'Thanakrit K.', role: 'member', color: 'bg-cyan-100 text-cyan-800' },
    ];
    const nextFriend = friendPool.find((candidate) => !friends.some((f) => f.id === candidate.id));
    if (nextFriend) {
      setFriends([...friends, nextFriend]);
    } else {
      showToast(language === 'th' ? 'เพิ่มเพื่อนร่วมกลุ่มครบจำนวนแล้ว' : 'Maximum group members added');
    }
  };

  const handleRemoveFriend = (id: string) => {
    setFriends(friends.filter((f) => f.id !== id));
  };

  // Proceed to Step 2: Confirmation Screen
  const handleConfirmBooking = () => {
    if (isFacilityClosedToday) {
      showToast(language === 'th' ? 'สถานที่ปิดให้บริการในวันนี้ กรุณาเลือกวันอื่น' : 'Facility is closed today. Please select another date.');
      return;
    }

    if (!selectedSlotTime) {
      showToast(language === 'th' ? 'กรุณาเลือกรอบเวลาที่ต้องการจอง' : 'Please select a reservation time slot');
      return;
    }

    const currentDay = daysList[selectedDayIndex];
    const formattedDate = language === 'th' ? currentDay.fullDateTh : currentDay.fullDateEn;
    const formattedDuration = language === 'th' ? facility.durationLimitTh : (facility.durationLimitEn || facility.durationLimitTh);
    navigateToConfirm(facility.id, formattedDate, selectedSlotTime, formattedDuration);
  };

  const displayName = language === 'th' ? facility.nameTh : (facility.nameEn || facility.nameTh);
  const displayLocation = language === 'th' ? facility.locationTh : (facility.locationEn || facility.locationTh);
  const displayCapacity = language === 'th' ? facility.capacityLabelTh : (facility.capacityLabelEn || facility.capacityLabelTh);
  const displaySpecs = (language === 'th' ? facility.specsTh : (facility.specsEn || facility.specsTh)) || [];
  const displayRules = (language === 'th' ? facility.rulesTh : (facility.rulesEn || facility.rulesTh)) || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-36 lg:pb-24">
      <TopBar
        title={language === 'th' ? 'รายละเอียดอุปกรณ์' : 'Facility Detail'}
        showBack={true}
        onBack={() => navigateToCategory(facility.category)}
      />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-56 sm:pb-60 lg:pb-32 space-y-6">
        {/* 1. Photo Carousel */}
        <section className="relative w-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
            <img
              src={images[activePhotoIndex]}
              alt={displayName}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Top Right Actions (Share & Heart) */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast(language === 'th' ? 'คัดลอกลิงก์สถานที่แล้ว!' : 'Facility link copied!');
                }}
                className="w-9 h-9 rounded-full bg-white/85 hover:bg-white text-slate-800 backdrop-blur-md flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                aria-label={language === 'th' ? 'แชร์' : 'Share'}
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-9 h-9 rounded-full bg-white/85 hover:bg-white text-slate-800 backdrop-blur-md flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                aria-label={language === 'th' ? 'ถูกใจ' : 'Like'}
              >
                <Heart
                  className={`w-4 h-4 ${
                    isLiked ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
              </button>
            </div>

            {/* Bottom Left Capacity Pill */}
            <div className="absolute bottom-3 left-3">
              <div className="badge-on-colored px-3 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-md">
                <Users className="w-3.5 h-3.5 text-slate-600" />
                <span>{displayCapacity}</span>
              </div>
            </div>

            {/* Carousel Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhotoIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activePhotoIndex === i
                        ? 'w-6 bg-brand'
                        : 'w-2 bg-white/60 hover:bg-white'
                    }`}
                    style={{
                      backgroundColor:
                        activePhotoIndex === i ? 'var(--brand-strong)' : undefined,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 2. Facility Header Info */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {displayName}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{displayLocation}</span>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold shrink-0">
              {language === 'th' ? 'เปิดให้บริการ' : 'Open'}
            </span>
          </div>

          {/* Spec Pills Row */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {displaySpecs.length > 0 ? (
              displaySpecs.map((spec, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  <Clock className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                  <span>{spec}</span>
                </span>
              ))
            ) : (
              <>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                  <span>{language === 'th' ? '1 ชม./ครั้ง' : '1 hr/slot'}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <RotateCcw className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{language === 'th' ? '3 ครั้ง/วัน' : '3 slots/day'}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <Tv className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Smart TV</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  <PenTool className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{language === 'th' ? 'กระดานไวท์บอร์ด' : 'Whiteboard'}</span>
                </span>
              </>
            )}
          </div>
        </section>

        {/* 3. Rules Accordion */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setIsRulesOpen(!isRulesOpen)}
            className="w-full flex items-center justify-between text-left cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {language === 'th' ? 'กฎและข้อกำหนดการใช้ห้อง' : 'Room Rules & Policies'}
              </h3>
            </div>
            {isRulesOpen ? (
              <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors" />
            )}
          </button>

          {isRulesOpen && (
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {displayRules.length > 0 ? (
                displayRules.map((rule, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>{rule}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">🚫</span>
                    <span>{language === 'th' ? 'งดนำอาหารและเครื่องดื่ม' : 'No outside food and drinks'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 font-bold">⏱</span>
                    <span>{language === 'th' ? 'มาช้าเกิน 15 นาที ตัดสิทธิ์' : 'Late by >15 mins forfeits reservation'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 font-bold">👥</span>
                    <span>{language === 'th' ? 'ผู้ใช้งานตั้งแต่ 3 คนขึ้นไป' : '3 or more people required'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">⏰</span>
                    <span>{language === 'th' ? 'เปิด จ-ศ 09:00-19:00 และ ส-อา 09:00-16:00' : 'Open Mon-Fri 09:00-19:00 & Sat-Sun 09:00-16:00'}</span>
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        {/* 4. 7-Day Date Strip */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'th' ? 'ตุลาคม 2569' : 'October 2026'}
            </h3>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() =>
                  setSelectedDayIndex((prev) => Math.max(0, prev - 1))
                }
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                title={language === 'th' ? 'ก่อนหน้า' : 'Previous'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setSelectedDayIndex((prev) =>
                    Math.min(daysList.length - 1, prev + 1)
                  )
                }
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                title={language === 'th' ? 'ถัดไป' : 'Next'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {daysList.map((day, idx) => {
              const isSelected = selectedDayIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`py-2.5 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--brand-strong)' : undefined,
                  }}
                >
                  <span
                    className={`text-[10px] font-medium ${
                      isSelected ? 'text-white/85' : 'text-slate-400 dark:text-slate-400'
                    }`}
                  >
                    {language === 'th' ? day.dayOfWeekTh : day.dayOfWeekEn}
                  </span>
                  <span className="text-base font-black leading-tight mt-0.5">
                    {day.dayOfMonth}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Closed notice if applicable */}
          {isFacilityClosedToday && (
            <div className="mt-3 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-200 font-medium">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{language === 'th' ? 'สถานที่นี้ปิดให้บริการในวันดังกล่าว กรุณาเลือกวันอื่น' : 'This facility is closed on the selected date. Please choose another date.'}</span>
            </div>
          )}
        </section>

        {/* 5. Timeslot Grid */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'th' ? 'เลือกรอบเวลา' : 'Select Time Slot'}{' '}
              <span className="text-xs font-normal text-slate-400">
                ({language === 'th' ? facility.durationLimitTh : (facility.durationLimitEn || facility.durationLimitTh)})
              </span>
            </h3>
            <span
              className="text-xs font-bold flex items-center gap-1"
              style={{ color: 'var(--brand-strong)' }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--brand-strong)' }}
              />
              <span>{language === 'th' ? 'เลือกแล้ว' : 'Selected'}</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {timeSlots.map((slot, sIdx) => {
              const isSelected = selectedSlotTime === slot.time && slot.available && !isFacilityClosedToday;

              if (!slot.available || isFacilityClosedToday) {
                // Unavailable slot (Grayed out & disabled)
                const unavailableReason = isFacilityClosedToday
                  ? (language === 'th' ? 'ปิดทำการ' : 'Closed')
                  : slot.reason
                  ? (language === 'th' ? slot.reason : (slot.reasonEn || 'Unavailable'))
                  : slot.ratioLabel
                  ? (language === 'th' ? `ไม่ว่าง (${slot.ratioLabel})` : `Full (${slot.ratioLabel})`)
                  : (language === 'th' ? 'ไม่ว่าง (0/1)' : 'Full (0/1)');

                return (
                  <div
                    key={sIdx}
                    className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-center opacity-70 cursor-not-allowed select-none"
                  >
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 line-through">
                      {slot.time}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {unavailableReason}
                    </p>
                  </div>
                );
              }

              // Available slot (Selectable, strictly one selectable)
              const availableLabel = isSelected
                ? (language === 'th' ? 'เลือกแล้ว' : 'Selected')
                : slot.ratioLabel
                ? (language === 'th' ? `ว่าง (${slot.ratioLabel})` : `Available (${slot.ratioLabel})`)
                : slot.label
                ? (language === 'th' ? slot.label : (slot.labelEn || slot.label))
                : (language === 'th' ? 'ว่าง (0/1)' : 'Available (0/1)');

              return (
                <button
                  key={sIdx}
                  onClick={() => setSelectedSlotTime(slot.time)}
                  className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'text-white shadow-md'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 border-slate-200 dark:border-slate-800'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--brand-strong)' : undefined,
                    borderColor: isSelected ? 'var(--brand-strong)' : undefined,
                  }}
                >
                  <div className="flex items-center justify-center gap-1">
                    <p className="text-xs font-black">{slot.time}</p>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <p
                    className={`text-[10px] font-medium mt-0.5 ${
                      isSelected ? 'text-white/90 font-bold' : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {availableLabel}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* 6. Invite Friends Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'th' ? 'ชวนเพื่อนร่วมใช้งาน (Invite friend)' : 'Invite Teammates'}
            </h3>
            <span className="text-xs text-slate-400 dark:text-slate-400 font-medium">
              {language === 'th' ? 'ขั้นต่ำ 3 คน' : 'Minimum 3 people'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${friend.color}`}
                >
                  {friend.initial}
                </span>
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {language === 'th' ? friend.nameTh : friend.nameEn}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-400 ml-1">
                    {friend.role === 'leader'
                      ? (language === 'th' ? '(ผู้จองหลัก)' : '(Host)')
                      : (language === 'th' ? '(สมาชิก)' : '(Member)')}
                  </span>
                </div>
                {friend.role === 'member' && (
                  <button
                    onClick={() => handleRemoveFriend(friend.id)}
                    className="p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}

            {/* Add friend button */}
            <button
              onClick={handleAddFriend}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              title={language === 'th' ? 'เพิ่มเพื่อนร่วมห้อง' : 'Add Teammate'}
            >
              <UserPlus className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      {/* 7. Sticky Bottom Confirmation Bar */}
      <div className="fixed bottom-[70px] lg:bottom-0 left-0 lg:left-72 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 p-4 lg:pb-14 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-semibold">
              <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>
                {language === 'th'
                  ? `${daysList[selectedDayIndex].fullDateTh} ${selectedSlotTime} น.`
                  : `${daysList[selectedDayIndex].fullDateEn} ${selectedSlotTime}`}
              </span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">
              {language === 'th' ? 'ยืนยันแล้ว' : 'Confirmed'}
            </span>
          </div>

          <button
            onClick={handleConfirmBooking}
            disabled={isFacilityClosedToday}
            className={`w-full py-4 px-6 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-brand/20 transition-all ${
              isFacilityClosedToday
                ? 'opacity-50 cursor-not-allowed bg-slate-500'
                : 'hover:opacity-95 active:scale-[0.99] cursor-pointer'
            }`}
            style={{
              backgroundColor: isFacilityClosedToday ? undefined : 'var(--brand-strong)',
            }}
          >
            <span>{language === 'th' ? 'ดำเนินการต่อ' : 'Continue'}</span>
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
