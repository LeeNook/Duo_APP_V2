import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  User,
  Cpu,
  AlertTriangle,
  History,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopBar } from '../components/common/TopBar';

export const SuccessESlipScreen: React.FC = () => {
  const {
    lastCreatedBooking,
    user,
    setCurrentRoute,
    navigateToHistory,
    language,
  } = useApp();

  const ticket = lastCreatedBooking;
  const [showPin, setShowPin] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!ticket) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col items-center justify-center">
        <p className="text-sm text-slate-500 mb-4">ไม่พบข้อมูลบัตรจอง</p>
        <button
          onClick={() => setCurrentRoute('booking')}
          className="px-4 py-2 rounded-xl text-white font-bold text-xs"
          style={{ backgroundColor: 'var(--brand-strong)' }}
        >
          กลับไปที่หน้าจอง
        </button>
      </div>
    );
  }

  const handleCopyPin = () => {
    navigator.clipboard?.writeText(ticket.unlockPin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCalendar = () => {
    alert(`เพิ่ม "${ticket.locationCode}" ลงใน Google / Apple Calendar เรียบร้อยแล้ว!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 lg:pb-12">
      <TopBar
        title={language === 'th' ? 'บัตรยืนยันการจอง' : 'Success E-Slip'}
        showBack={true}
        onBack={() => setCurrentRoute('booking')}
      />

      <main className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-6">
        {/* 1. Success Checkmark Hero */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 mb-3 animate-bounce-short">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {language === 'th' ? 'จองสำเร็จเรียบร้อย!' : 'Booking Confirmed!'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
            {language === 'th'
              ? 'ข้อมูลการจองและรหัสเข้าใช้งานถูกส่งไปยังอีเมลและปฏิทินแล้ว'
              : 'Booking details and unlock code have been sent to your email and calendar.'}
          </p>
        </div>

        {/* 2. Ticket Pass Card (CRITICAL: NO QR CODE) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden relative">
          {/* Ticket Header Bar */}
          <div
            className="p-5 text-white relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--brand-strong) 0%, var(--brand) 100%)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold tracking-wider uppercase opacity-90">
                🎫 KMITL DUO_PASS
              </span>
              <span className="badge-on-colored px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 flex items-center gap-1 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{language === 'th' ? 'ยืนยันแล้ว' : 'Confirmed'}</span>
              </span>
            </div>

            <p className="text-[10px] font-mono opacity-80 mb-0.5">
              ID: {ticket.id}
            </p>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
              {ticket.locationCode}
            </h3>
            <p className="text-xs opacity-90 truncate">
              📍 {ticket.locationNameTh}
            </p>
          </div>

          {/* Ticket Perforated Tear Line with Circular Notches */}
          <div className="relative py-2 bg-white dark:bg-slate-900 flex items-center justify-between">
            <div className="w-4 h-8 bg-slate-50 dark:bg-slate-950 rounded-r-full -ml-1 border-r border-slate-100 dark:border-slate-800" />
            <div className="flex-1 border-t-2 border-dashed border-slate-200 dark:border-slate-700 mx-2" />
            <div className="w-4 h-8 bg-slate-50 dark:bg-slate-950 rounded-l-full -mr-1 border-l border-slate-100 dark:border-slate-800" />
          </div>

          {/* Ticket Body: Secret Door / Machine Unlock Code */}
          <div className="p-5 pt-1 space-y-4">
            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-100/60 dark:border-slate-700 text-center space-y-2.5">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Lock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span>{language === 'th' ? 'รหัสปลดล็อกประตู / เครื่อง' : 'Door / Equipment Access PIN'}</span>
              </div>

              {/* Masked PIN Box */}
              <div className="py-2.5 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xs">
                {showPin ? (
                  <span className="text-xl sm:text-2xl font-mono font-black tracking-[0.3em] text-slate-900 dark:text-white select-all">
                    {ticket.unlockPin}
                  </span>
                ) : (
                  <span className="text-2xl font-black tracking-[0.4em] text-slate-400 select-none">
                    ••••••••
                  </span>
                )}
              </div>

              {/* Eye toggle & Copy Code action buttons */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <button
                  onClick={() => setShowPin(!showPin)}
                  className="px-3 py-1.5 rounded-full bg-blue-100/80 dark:bg-slate-700 hover:bg-blue-200 text-blue-800 dark:text-blue-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {showPin ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>{language === 'th' ? 'ซ่อนรหัส' : 'Hide PIN'}</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === 'th' ? 'แสดงรหัส' : 'Show PIN'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyPin}
                  className="px-3 py-1.5 rounded-full bg-orange-100/80 dark:bg-orange-950/60 hover:bg-orange-200 text-orange-800 dark:text-orange-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{language === 'th' ? 'คัดลอกแล้ว' : 'Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{language === 'th' ? 'คัดลอกรหัส' : 'Copy PIN'}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-slate-400">
                {language === 'th'
                  ? `* รหัสนี้ใช้ได้เฉพาะช่วงเวลา ${ticket.timeRangeTh}`
                  : `* This PIN is valid only during ${ticket.timeRangeTh}`}
              </p>
            </div>

            {/* Ticket Info Metadata */}
            <div className="space-y-2.5 text-xs pt-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <User className="w-4 h-4" />
                  <span>{language === 'th' ? 'ผู้ขอใช้' : 'Applicant'}</span>
                </div>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {user.name} {user.studentId}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>{language === 'th' ? 'วันและเวลา' : 'Date & Time'}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {ticket.dateTh}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {ticket.timeRangeTh} ({ticket.durationLabelTh})
                  </p>
                </div>
              </div>

              {ticket.equipmentTh && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Cpu className="w-4 h-4" />
                    <span>{language === 'th' ? 'อุปกรณ์' : 'Equipment'}</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {ticket.equipmentTh}
                  </span>
                </div>
              )}
            </div>

            {/* Late Rule Notice */}
            <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-slate-800 border border-blue-100/60 dark:border-slate-700 flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <span>
                {language === 'th'
                  ? `มาช้าเกิน ${ticket.lateMin} นาที ตัดสิทธิ์โดยอัตโนมัติ`
                  : `Late arrival beyond ${ticket.lateMin} minutes forfeits reservation automatically.`}
              </span>
            </div>
          </div>
        </div>

        {/* 3. CTA Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleAddToCalendar}
            className="w-full py-4 px-6 rounded-2xl text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-brand/20 transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer"
            style={{ backgroundColor: 'var(--brand-strong)' }}
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'th' ? 'เพิ่มลงปฏิทิน (Google / Apple Calendar)' : 'Add to Calendar (Google / Apple)'}</span>
          </button>

          <button
            onClick={navigateToHistory}
            className="w-full py-3.5 px-6 rounded-2xl bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-blue-700 dark:text-blue-300 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border border-blue-100 dark:border-slate-700"
          >
            <History className="w-4 h-4" />
            <span>{language === 'th' ? 'ดูประวัติการจอง' : 'View Booking History'}</span>
          </button>

          <div className="text-center pt-1">
            <button
              onClick={() => setCurrentRoute('home')}
              className="text-xs font-bold hover:underline cursor-pointer"
              style={{ color: 'var(--brand-strong)' }}
            >
              {language === 'th' ? 'กลับสู่หน้าหลัก' : 'Return to Home'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
