export type Language = 'en' | 'ur' | 'both';

export type SkillCategory = 
  | 'Skilled Construction'
  | 'Logistics & Transport'
  | 'Relief Distribution'
  | 'First Aid & Emergency'
  | 'Youth Organization'
  | 'Technical & Solar';

export interface Volunteer {
  id: string;
  fullName: string;
  cnicOrId: string;
  phone: string;
  village: string;
  primarySkill: SkillCategory;
  secondarySkills: string[];
  registrationDate: string;
  status: 'Active' | 'On-Call' | 'In Training' | 'Deployed';
  safetyBriefingCompleted: boolean;
  totalHoursContributed: number;
  notes?: string;
}

export type WaterStatus = 'survey' | 'planning' | 'construction' | 'completed';
export type TerrainDifficulty = 'moderate' | 'steep_rock' | 'glacial_stream' | 'avalanche_zone';

export interface WaterProject {
  id: string;
  title: string;
  village: string;
  pipelineLengthMeters: number;
  beneficiariesCount: number;
  estimatedBudgetPkr: number;
  raisedPkr: number;
  status: WaterStatus;
  terrainDifficulty: TerrainDifficulty;
  gravityFedSystem: boolean;
  pipeType: string; // e.g. 2-inch HDPE
  lastInspected: string;
  leadEngineer?: string;
  description: string;
}

export type HouseCategory = 'widow' | 'orphan' | 'destitute' | 'disability' | 'emergency_repair';
export type HouseStatus = 'verified' | 'foundation' | 'walling' | 'roofing' | 'completed';

export interface HouseConstructionCase {
  id: string;
  familyName: string;
  headOfFamily: string;
  category: HouseCategory;
  village: string;
  roomCount: number;
  laborCostSavedPkr: number; // Zero-cost volunteer labor
  materialCostPkr: number;
  raisedMaterialPkr: number;
  skilledMasonsAssigned: string[];
  volunteerCount: number;
  status: HouseStatus;
  startDate: string;
  completionDate?: string;
  notes: string;
}

export type RashanStatus = 'planning' | 'verification' | 'ready_for_dispatch' | 'distributed';

export interface RashanDrive {
  id: string;
  driveTitle: string;
  targetVillages: string[];
  foodPacksCount: number;
  costPerPackPkr: number;
  verifiedFamiliesCount: number;
  distributionDate: string;
  status: RashanStatus;
  tokenPrefix: string;
  itemsIncluded: string[]; // Flour, Oil, Pulses, Sugar, Tea, Salt
  volunteerTeamLead: string;
}

export interface SolarProject {
  id: string;
  title: string;
  village: string;
  type: 'home_setup' | 'pathway_lighting' | 'water_pump' | 'community_hall';
  unitsInstalled: number;
  beneficiariesCount: number;
  status: 'proposed' | 'in_progress' | 'completed';
  costPkr: number;
  date: string;
}

export interface AssistanceRequest {
  id: string;
  applicantName: string;
  fatherOrHusbandName: string;
  village: string;
  contactPhone: string;
  areaOfNeed: 'water' | 'house_repair' | 'rashan' | 'solar' | 'medical_emergency';
  description: string;
  familyMembersCount: number;
  monthlyIncomePkr: number;
  status: 'pending' | 'field_verified' | 'approved' | 'fulfilled' | 'declined';
  requestDate: string;
  fieldNotes?: string;
}

export interface CoordinatorOutput {
  id: string;
  title: string;
  category: 'volunteer' | 'water' | 'house' | 'rashan' | 'solar' | 'donor_appeal' | 'general';
  promptUsed: string;
  contentEnglish: string;
  contentUrdu: string;
  createdAt: string;
}

export interface CabinetMember {
  id: string;
  name: string;
  role: string;
  roleUrdu: string;
  photoUrl?: string;
  location: string;
  phone?: string;
  email?: string;
  bio: string;
  isCabinetMember?: boolean; // True for the 5 executive cabinet members
  isDeveloperVolunteer?: boolean;
}

export interface OrganizationInfo {
  name: string;
  nameUrdu: string;
  mottoEn: string;
  mottoUrdu: string;
  foundedDate: string; // Jan 11, 2025
  location: string;
  foundingCouncil: string;
  presidentName: string;
  presidentRole: string;
  developerName: string;
  developerRole: string;
}

// Daily Activity Log Types
export type ActivityCategory = 
  | 'water' 
  | 'house_construction' 
  | 'rashan' 
  | 'solar' 
  | 'karakari' 
  | 'community_meeting' 
  | 'general';

export interface DailyActivity {
  id: string;
  date: string;
  title: string;
  village: string;
  teamLead: string;
  category: ActivityCategory;
  description: string;
  volunteersInvolvedCount: number;
  beneficiariesImpactedCount: number;
  photosCount: number;
  notes?: string;
}

// Funds & Donor Account Types
export interface DonorAccount {
  id: string;
  fullName: string;
  cityOrCountry: string;
  contactPhone?: string;
  email?: string;
  totalContributedPkr: number;
  totalTransactionsCount: number;
  firstDonationDate: string;
  lastDonationDate: string;
  notes?: string;
}

export type DesignatedCause = 
  | 'Water Supply Infrastructure' 
  | 'Zero-Cost House Construction' 
  | 'Karakari Equipment Cabinet' 
  | 'Smart Rashan Packs' 
  | 'Solar Aid' 
  | 'General Welfare';

export interface DonationRecord {
  id: string;
  donorId: string;
  donorName: string;
  amountPkr: number;
  date: string;
  paymentMethod: 'Bank Transfer' | 'EasyPaisa' | 'JazzCash' | 'Cash' | 'Overseas Wire';
  receiptNo: string;
  allocatedCause: DesignatedCause;
  notes?: string;
}

// Karakari (Community Utility & Event Equipment Cabinet) Types
export type KarakariCategory = 
  | 'Big Cooking Utensils' 
  | 'Serving Platters & Dishes' 
  | 'Event Tents & Carpets' 
  | 'Gas & Water Storage' 
  | 'Lighting & Sound' 
  | 'Community Tools';

export interface KarakariItem {
  id: string;
  itemName: string;
  itemNameUrdu: string;
  category: KarakariCategory;
  totalQuantity: number;
  availableQuantity: number;
  borrowedQuantity: number;
  cabinetLocation: string; // e.g. Cabinet A-1, Main Depot
  condition: 'Excellent' | 'Good' | 'Needs Maintenance';
  description: string;
}

export interface KarakariBorrowRecord {
  id: string;
  itemId: string;
  itemName: string;
  quantityBorrowed: number;
  borrowerName: string;
  borrowerCnicOrPhone: string;
  village: string;
  eventPurpose: 'Wedding Feast' | 'Funeral / Niaz' | 'Community Gathering' | 'Emergency Relief Cookout' | 'Other';
  issueDate: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  status: 'Issued' | 'Returned' | 'Overdue' | 'Damaged';
  issuedByVolunteer: string;
  notes?: string;
}
