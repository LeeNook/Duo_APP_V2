import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ThemeColor,
  AppearanceMode,
  Language,
  UserProfile,
  BookingQuota,
  BookingTicket,
  FacilityItem,
  PastBooking,
  ScreenRoute,
} from '../types';
import {
  MOCK_USER,
  MOCK_QUOTA,
  MOCK_FACILITIES,
  MOCK_INITIAL_BOOKINGS,
  MOCK_PAST_HISTORY,
  EMPTY_CATEGORY_IDS,
} from '../data/mockData';

interface DraftBooking {
  facilityId: string;
  dateTh: string;
  timeRangeTh: string;
  durationLabelTh: string;
  selectedTags: string[];
  notes: string;
}

interface AppContextType {
  currentRoute: ScreenRoute;
  setCurrentRoute: (route: ScreenRoute) => void;
  selectedCategoryId: string;
  setSelectedCategoryId: (catId: string) => void;
  selectedFacilityId: string;
  setSelectedFacilityId: (facId: string) => void;
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  appearance: AppearanceMode;
  setAppearance: (appearance: AppearanceMode) => void;
  isDark: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  quota: BookingQuota;
  setQuota: React.Dispatch<React.SetStateAction<BookingQuota>>;
  facilities: FacilityItem[];
  setFacilities: React.Dispatch<React.SetStateAction<FacilityItem[]>>;
  bookings: BookingTicket[];
  setBookings: React.Dispatch<React.SetStateAction<BookingTicket[]>>;
  pastBookings: PastBooking[];
  setPastBookings: React.Dispatch<React.SetStateAction<PastBooking[]>>;
  upcomingTicket: BookingTicket | null;
  setUpcomingTicket: React.Dispatch<React.SetStateAction<BookingTicket | null>>;
  draftBooking: DraftBooking;
  setDraftBooking: React.Dispatch<React.SetStateAction<DraftBooking>>;
  lastCreatedBooking: BookingTicket | null;
  setLastCreatedBooking: (t: BookingTicket | null) => void;
  // Modal states
  cancellingTicket: BookingTicket | null;
  isCancelModalOpen: boolean;
  openCancelModal: (ticket: BookingTicket) => void;
  closeCancelModal: () => void;
  confirmCancelBooking: () => void;
  // Rating bottom sheet states
  ratingBooking: PastBooking | null;
  isRatingSheetOpen: boolean;
  openRatingSheet: (past: PastBooking) => void;
  closeRatingSheet: () => void;
  submitRating: (id: string, stars: number, tags: string[], review: string) => void;
  // View review (read-only modal)
  viewingReviewBooking: PastBooking | null;
  isViewReviewOpen: boolean;
  openViewReview: (past: PastBooking) => void;
  closeViewReview: () => void;
  // Toast state
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // Preferences
  notify15Min: boolean;
  setNotify15Min: (val: boolean) => void;
  notifyRoomAvailable: boolean;
  setNotifyRoomAvailable: (val: boolean) => void;
  previewDevice: 'desktop' | 'mobile-mock';
  setPreviewDevice: (device: 'desktop' | 'mobile-mock') => void;
  // Navigation helpers
  navigateToCategory: (catId: string) => void;
  navigateToFacility: (facId: string) => void;
  navigateToConfirm: (facilityId: string, dateTh: string, timeRangeTh: string, durationTh?: string) => void;
  navigateToSuccess: (ticketId: string) => void;
  navigateToHistory: () => void;
  navigateToEmpty: () => void;
  confirmBooking: (notes: string, selectedTags: string[]) => BookingTicket | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<ScreenRoute>('splash');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('seminar-room');
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('A107');
  const [theme, setThemeState] = useState<ThemeColor>('orange');
  const [appearance, setAppearanceState] = useState<AppearanceMode>('light');
  const [language, setLanguage] = useState<Language>('th');
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [quota, setQuota] = useState<BookingQuota>(MOCK_QUOTA);
  const [facilities, setFacilities] = useState<FacilityItem[]>(MOCK_FACILITIES);
  const [bookings, setBookings] = useState<BookingTicket[]>(MOCK_INITIAL_BOOKINGS);
  const [pastBookings, setPastBookings] = useState<PastBooking[]>(MOCK_PAST_HISTORY);
  const [upcomingTicket, setUpcomingTicket] = useState<BookingTicket | null>(null);
  const [notify15Min, setNotify15Min] = useState<boolean>(true);
  const [notifyRoomAvailable, setNotifyRoomAvailable] = useState<boolean>(true);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile-mock'>('desktop');

  // Checkout & Modals
  const [draftBooking, setDraftBooking] = useState<DraftBooking>({
    facilityId: 'A107',
    dateTh: 'จันทร์ 26 ตุลาคม 2569',
    timeRangeTh: '14:00 - 15:00 น.',
    durationLabelTh: '1 ชม.',
    selectedTags: [],
    notes: '',
  });
  const [lastCreatedBooking, setLastCreatedBooking] = useState<BookingTicket | null>(null);
  const [cancellingTicket, setCancellingTicket] = useState<BookingTicket | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [ratingBooking, setRatingBooking] = useState<PastBooking | null>(null);
  const [isRatingSheetOpen, setIsRatingSheetOpen] = useState(false);
  const [viewingReviewBooking, setViewingReviewBooking] = useState<PastBooking | null>(null);
  const [isViewReviewOpen, setIsViewReviewOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Resolved dark mode
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const updateDark = () => {
      let dark = false;
      if (appearance === 'dark') {
        dark = true;
      } else if (appearance === 'system') {
        dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      setIsDark(dark);

      const root = document.documentElement;
      if (dark) {
        root.classList.add('dark');
        root.setAttribute('data-appearance', 'dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-appearance', 'light');
      }
    };

    updateDark();

    if (appearance === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = () => updateDark();
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [appearance]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeColor) => {
    setThemeState(newTheme);
  };

  const setAppearance = (mode: AppearanceMode) => {
    setAppearanceState(mode);
  };

  // Navigation handlers
  const navigateToCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    if (EMPTY_CATEGORY_IDS.includes(catId)) {
      setCurrentRoute('empty');
    } else {
      setCurrentRoute('category');
    }
  };

  const navigateToFacility = (facId: string) => {
    setSelectedFacilityId(facId);
    setCurrentRoute('facility');
  };

  const navigateToConfirm = (
    facilityId: string,
    dateTh: string,
    timeRangeTh: string,
    durationTh?: string
  ) => {
    setSelectedFacilityId(facilityId);
    setDraftBooking({
      facilityId,
      dateTh,
      timeRangeTh,
      durationLabelTh: durationTh || '1 ชม.',
      selectedTags: [],
      notes: '',
    });
    setCurrentRoute('confirm');
  };

  const navigateToSuccess = (ticketId: string) => {
    const found = bookings.find((b) => b.id === ticketId);
    if (found) {
      setLastCreatedBooking(found);
    }
    setCurrentRoute('success');
  };

  const navigateToHistory = () => {
    setCurrentRoute('history');
  };

  const navigateToEmpty = () => {
    setCurrentRoute('empty');
  };

  // Booking confirmation logic
  const confirmBooking = (notes: string, selectedTags: string[]): BookingTicket | null => {
    if (quota.remainingToday <= 0) {
      showToast(
        language === 'th'
          ? 'คุณใช้สิทธิ์การจองประจำวันครบตามกำหนดแล้ว (3 ครั้ง/วัน)'
          : 'You have reached your daily booking quota (3 times/day)'
      );
      return null;
    }

    const facility = facilities.find((f) => f.id === draftBooking.facilityId) || facilities[0];

    // Decrement daily quota
    setQuota((prev) => ({
      ...prev,
      usedToday: prev.usedToday + 1,
      remainingToday: Math.max(0, prev.remainingToday - 1),
    }));

    // Random 8-digit unlock PIN (Masked initially)
    const pin = Math.floor(10000000 + Math.random() * 90000000).toString();
    const newId = `KMITL${Date.now().toString().slice(-6)}-${facility.code.replace(/[^A-Za-z0-9]/g, '')}`;

    const newTicket: BookingTicket = {
      id: newId,
      facilityId: facility.id,
      type: facility.category === 'sports' ? 'ศูนย์กีฬา / สนาม' : facility.nameTh,
      typeEn: facility.category === 'sports' ? 'Sports Center / Court' : (facility.nameEn || facility.nameTh),
      locationCode: facility.code,
      locationNameTh: `${facility.buildingTh}`,
      locationNameEn: facility.nameEn || facility.buildingEn,
      dateTh: draftBooking.dateTh,
      dateEn: draftBooking.dateTh,
      timeRangeTh: draftBooking.timeRangeTh,
      timeRangeEn: draftBooking.timeRangeTh,
      durationLabelTh: draftBooking.durationLabelTh || facility.durationLimitTh,
      durationLabelEn: facility.durationLimitEn || facility.durationLimitTh,
      checkInMethodTh: 'เช็คอินด้วยบัตรนักศึกษา',
      checkInMethodEn: 'Check-in with Student ID',
      unlockPin: pin,
      equipmentTh: facility.specsTh ? facility.specsTh.slice(0, 2).join(' • ') : undefined,
      equipmentEn: facility.specsEn ? facility.specsEn.slice(0, 2).join(' • ') : undefined,
      notes,
      selectedTags,
      lateMin: facility.lateMin ?? 15,
      noEquipment: facility.noEquipment ?? false,
      status: 'confirmed',
      statusLabelTh: 'ยืนยันแล้ว',
      statusLabelEn: 'Confirmed',
      category: facility.category,
    };

    setBookings((prev) => [newTicket, ...prev]);
    setUpcomingTicket(newTicket);
    setLastCreatedBooking(newTicket);
    setCurrentRoute('success');
    return newTicket;
  };

  // Cancel modal methods
  const openCancelModal = (ticket: BookingTicket) => {
    setCancellingTicket(ticket);
    setIsCancelModalOpen(true);
  };

  const closeCancelModal = () => {
    setCancellingTicket(null);
    setIsCancelModalOpen(false);
  };

  const confirmCancelBooking = () => {
    if (!cancellingTicket) return;

    const locCode = cancellingTicket.locationCode;

    // Retain cancelled bookings in state with status 'cancelled'
    setBookings((prev) =>
      prev.map((b) =>
        b.id === cancellingTicket.id
          ? {
              ...b,
              status: 'cancelled',
              statusLabelTh: 'ยกเลิกแล้ว',
            }
          : b
      )
    );

    // Refund quota (+1) since cancelled > 30 mins before
    setQuota((prev) => ({
      ...prev,
      usedToday: Math.max(0, prev.usedToday - 1),
      remainingToday: Math.min(prev.dailyTotal, prev.remainingToday + 1),
    }));

    // If upcomingTicket was cancelled, pick the next active one or null
    setUpcomingTicket((prev) => {
      if (prev && prev.id === cancellingTicket.id) {
        const remainingActive = bookings.filter(
          (b) => b.id !== cancellingTicket.id && b.status !== 'cancelled'
        );
        return remainingActive.length > 0 ? remainingActive[0] : null;
      }
      return prev;
    });

    closeCancelModal();
    showToast(
      language === 'th'
        ? `ยกเลิกการจอง ${locCode} สำเร็จ • คืนสิทธิ์ +1 เรียบร้อย`
        : `Cancelled booking for ${locCode} • +1 quota refunded`
    );
  };

  // Rating bottom sheet methods
  const openRatingSheet = (past: PastBooking) => {
    setRatingBooking(past);
    setIsRatingSheetOpen(true);
  };

  const closeRatingSheet = () => {
    setRatingBooking(null);
    setIsRatingSheetOpen(false);
  };

  // Read-only review viewing modal methods
  const openViewReview = (past: PastBooking) => {
    setViewingReviewBooking(past);
    setIsViewReviewOpen(true);
  };

  const closeViewReview = () => {
    setViewingReviewBooking(null);
    setIsViewReviewOpen(false);
  };

  const submitRating = (id: string, stars: number, tags: string[], review: string) => {
    setPastBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              rated: true,
              ratingStars: stars,
              reviewChips: tags,
              reviewComment: review,
            }
          : b
      )
    );
    closeRatingSheet();
    showToast(
      language === 'th'
        ? 'ขอบคุณสำหรับความคิดเห็นและการให้คะแนน!'
        : 'Thank you for your feedback and rating!'
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        selectedCategoryId,
        setSelectedCategoryId,
        selectedFacilityId,
        setSelectedFacilityId,
        theme,
        setTheme,
        appearance,
        setAppearance,
        isDark,
        language,
        setLanguage,
        user,
        setUser,
        quota,
        setQuota,
        facilities,
        setFacilities,
        bookings,
        setBookings,
        pastBookings,
        setPastBookings,
        upcomingTicket,
        setUpcomingTicket,
        draftBooking,
        setDraftBooking,
        lastCreatedBooking,
        setLastCreatedBooking,
        cancellingTicket,
        isCancelModalOpen,
        openCancelModal,
        closeCancelModal,
        confirmCancelBooking,
        toastMessage,
        showToast,
        ratingBooking,
        isRatingSheetOpen,
        openRatingSheet,
        closeRatingSheet,
        submitRating,
        viewingReviewBooking,
        isViewReviewOpen,
        openViewReview,
        closeViewReview,
        notify15Min,
        setNotify15Min,
        notifyRoomAvailable,
        setNotifyRoomAvailable,
        previewDevice,
        setPreviewDevice,
        navigateToCategory,
        navigateToFacility,
        navigateToConfirm,
        navigateToSuccess,
        navigateToHistory,
        navigateToEmpty,
        confirmBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
