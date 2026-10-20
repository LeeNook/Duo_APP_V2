import React from 'react';
import { AlertTriangle, PlusCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CancelModal: React.FC = () => {
  const {
    isCancelModalOpen,
    cancellingTicket,
    closeCancelModal,
    confirmCancelBooking,
    language,
  } = useApp();

  if (!isCancelModalOpen || !cancellingTicket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-center space-y-4 animate-scale-up">
        {/* Warning Icon */}
        <div className="w-16 h-16 rounded-full bg-red-100/80 dark:bg-red-950/50 text-red-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 stroke-[2.2]" />
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-black text-slate-900 dark:text-white leading-snug">
            {language === 'th'
              ? `ต้องการยกเลิกการจอง ${cancellingTicket.locationCode} หรือไม่?`
              : `Cancel reservation for ${cancellingTicket.locationCode}?`}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed px-2">
            {language === 'th'
              ? 'ยกเลิกก่อนเวลาใช้งานเกิน 30 นาที จะคืนสิทธิ์โควต้าให้คุณทันที 1 ครั้ง'
              : 'Cancelling 30+ minutes before start time restores 1 usage quota immediately.'}
          </p>
        </div>

        {/* Green Refund Strip */}
        <div className="py-2.5 px-3 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 border border-emerald-200 dark:border-emerald-800/60">
          <PlusCircle className="w-4 h-4 text-emerald-600" />
          <span>{language === 'th' ? '+1 สิทธิ์จะถูกคืนเข้าบัญชีคุณ' : '+1 Quota will be restored'}</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={confirmCancelBooking}
            className="w-full py-3.5 px-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all cursor-pointer"
          >
            {language === 'th' ? 'ยืนยันยกเลิก' : 'Confirm Cancellation'}
          </button>

          <button
            onClick={closeCancelModal}
            className="w-full py-3 px-4 rounded-2xl bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors cursor-pointer"
          >
            {language === 'th' ? 'ไม่ยกเลิก (คงการจองไว้)' : 'Keep Reservation'}
          </button>
        </div>
      </div>
    </div>
  );
};
