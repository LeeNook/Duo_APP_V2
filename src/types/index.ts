export type ThemeColor = 'orange' | 'blue' | 'green' | 'purple';
export type AppearanceMode = 'light' | 'dark' | 'system';
export type Language = 'th' | 'en';

export interface UserProfile {
  name: string;
  nameEn?: string;
  studentId: string;
  faculty: string;
  facultyEn?: string;
  department: string;
  departmentEn?: string;
  degree: string;
  degreeEn?: string;
  xp: number;
  levelTitle: string;
  levelTitleEn?: string;
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
  typeEn?: string;
  locationCode: string;
  locationNameTh: string;
  locationNameEn?: string;
  dateTh: string;
  dateEn?: string;
  timeRangeTh: string;
  timeRangeEn?: string;
  durationLabelTh: string;
  durationLabelEn?: string;
  checkInMethodTh: string;
  checkInMethodEn?: string;
  unlockPin: string;
  equipmentTh?: string;
  equipmentEn?: string;
  notes?: string;
  selectedTags?: string[];
  selectedTagsEn?: string[];
  lateMin: number;
  noEquipment?: boolean;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  statusLabelTh: string;
  statusLabelEn?: string;
  category: string;
  rated?: boolean;
  ratingStars?: number;
  ratingReview?: string;
  ratingReviewEn?: string;
  ratingTags?: string[];
  ratingTagsEn?: string[];
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
  reasonEn?: string;
  ratioLabel?: string;
  label?: string;
  labelEn?: string;
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
  nextAvailableTimeEn?: string;
  durationLimitTh: string;
  durationLimitEn?: string;
  tagsTh?: string[];
  tagsEn?: string[];
  featuredNoticeTh?: string;
  featuredNoticeEn?: string;
  specsTh?: string[];
  specsEn?: string[];
  rulesTh?: string[];
  rulesEn?: string[];
  scheduleType?: 'KLLC' | 'LAB' | 'TENNIS';
  availableSlotsToday?: string[];
  availableSlotsTodayEn?: string[];
  noEquipment?: boolean;
  lateMin?: number;
}

export interface NewsItem {
  id: string;
  badgeTh: string;
  badgeEn?: string;
  badgeType: 'special' | 'event' | 'academic';
  titleTh: string;
  titleEn?: string;
  dateRangeTh: string;
  dateRangeEn?: string;
  imageUrl: string;
}

export interface LibraryOccupancy {
  id: string;
  nameTh: string;
  nameEn?: string;
  detailTh: string;
  detailEn?: string;
  availableSeats: number;
  totalSeats: number;
  densityPercent: number;
  densityStatus: 'normal' | 'busy' | 'full';
}

export interface PastBooking {
  id: string;
  facilityId: string;
  roomName: string;
  roomNameEn?: string;
  categoryTh: string;
  categoryEn?: string;
  buildingTh: string;
  buildingEn?: string;
  dateTh: string;
  dateEn?: string;
  timeRangeTh: string;
  timeRangeEn?: string;
  status: 'completed';
  rated: boolean;
  ratingStars?: number;
  reviewChips?: string[];
  reviewChipsEn?: string[];
  reviewComment?: string;
  reviewCommentEn?: string;
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
