export type ThemeColor = 'orange' | 'blue' | 'green' | 'purple';
export type AppearanceMode = 'light' | 'dark' | 'system';
export type Language = 'th' | 'en';

export interface UserProfile {
  name: string;
  studentId: string;
  faculty: string;
  department: string;
  degree: string;
  xp: number;
  levelTitle: string;
  levelNumber: number;
  avatarUrl: string;
}

export interface BookingQuota {
  dailyTotal: number;
  usedToday: number;
  remainingToday: number;
  locationScope: string;
  dateLabelTh: string;
  dateLabelEn: string;
}

export interface BookingTicket {
  id: string;
  facilityId: string;
  type: string;
  locationCode: string;
  locationNameTh: string;
  locationNameEn?: string;
  dateTh: string;
  timeRangeTh: string;
  durationLabelTh: string;
  checkInMethodTh: string;
  unlockPin: string;
  equipmentTh?: string;
  notes?: string;
  selectedTags?: string[];
  lateMin: number;
  noEquipment?: boolean;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  statusLabelTh: string;
  category: string;
  rated?: boolean;
  ratingStars?: number;
  ratingReview?: string;
  ratingTags?: string[];
}

export interface FacilityCategory {
  id: string;
  titleTh: string;
  titleEn?: string;
  descTh: string;
  descEn?: string;
  availableCount: number;
  countUnitTh: string;
  countUnitEn?: string;
  iconName: string;
  accentBg: string;
  iconColor?: string;
  style?: 'banner' | 'compact';
}

export interface TimeSlot {
  time: string;
  available: boolean;
  reason?: string;
  ratioLabel?: string;
  label?: string;
}

export interface FacilityItem {
  id: string;
  code: string;
  nameTh: string;
  nameEn?: string;
  category: string;
  subCategory?: string;
  locationTh: string;
  locationEn?: string;
  buildingTh: string;
  buildingEn?: string;
  floorTh?: string;
  floorEn?: string;
  imageUrl: string;
  additionalImages?: string[];
  capacityLabelTh: string;
  capacityLabelEn?: string;
  isAvailable: boolean;
  statusLabelTh?: string;
  statusLabelEn?: string;
  nextAvailableTime?: string;
  durationLimitTh: string;
  durationLimitEn?: string;
  tagsTh?: string[];
  featuredNoticeTh?: string;
  specsTh?: string[];
  rulesTh?: string[];
  scheduleType?: 'KLLC' | 'LAB' | 'TENNIS';
  availableSlotsToday?: string[];
  noEquipment?: boolean;
  lateMin?: number;
}

export interface NewsItem {
  id: string;
  badgeTh: string;
  badgeType: 'special' | 'event' | 'academic';
  titleTh: string;
  dateRangeTh: string;
  imageUrl: string;
}

export interface LibraryOccupancy {
  id: string;
  nameTh: string;
  detailTh: string;
  availableSeats: number;
  totalSeats: number;
  densityPercent: number;
  densityStatus: 'normal' | 'busy' | 'full';
}

export interface PastBooking {
  id: string;
  facilityId: string;
  roomName: string;
  categoryTh: string;
  buildingTh: string;
  dateTh: string;
  timeRangeTh: string;
  status: 'completed';
  rated: boolean;
  ratingStars?: number;
  reviewChips?: string[];
  reviewComment?: string;
  imageUrl: string;
}

export type ScreenRoute =
  | 'splash'
  | 'home'
  | 'booking'
  | 'category'
  | 'facility'
  | 'confirm'
  | 'success'
  | 'history'
  | 'settings'
  | 'empty';
