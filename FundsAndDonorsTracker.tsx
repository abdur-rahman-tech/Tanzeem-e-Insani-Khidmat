import { 
  OrganizationInfo, 
  Volunteer, 
  WaterProject, 
  HouseConstructionCase, 
  RashanDrive, 
  SolarProject, 
  AssistanceRequest,
  DailyActivity,
  DonorAccount,
  DonationRecord,
  KarakariItem,
  KarakariBorrowRecord,
  CabinetMember
} from '../types';

export const NGO_INFO: OrganizationInfo = {
  name: "Tanzeem-e-Insani Khidmat (TIK) Shishi",
  nameUrdu: "تنظیم انسانی خدمت شیشی",
  mottoEn: "Service, Brotherhood, Progress",
  mottoUrdu: "خدمت، اخوت، ترقی",
  foundedDate: "January 11, 2025",
  location: "Shishi London, Drosh, Lower Chitral, Khyber Pakhtunkhwa, Pakistan",
  foundingCouncil: "Elders Council & Youth Welfare Cabinet",
  presidentName: "M. Sami Ul Haq",
  presidentRole: "President",
  developerName: "Abdur Rahman",
  developerRole: "Volunteer Software Developer"
};

export const INITIAL_CABINET_MEMBERS: CabinetMember[] = [
  // 5 Executive Cabinet Members (with photos, emails, official designations, and phone numbers)
  {
    id: "CAB-001",
    name: "M. Sami Ul Haq",
    role: "President",
    roleUrdu: "صدر",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9812300",
    email: "president@tikshishi.org",
    bio: "Elected organization president leading executive governance, community project approvals, and organizational vision for TIK Shishi.",
    isCabinetMember: true
  },
  {
    id: "CAB-002",
    name: "Inam Ul Haq",
    role: "General Secretary",
    roleUrdu: "جنرل سیکرٹری",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 301 5543200",
    email: "secretary@tikshishi.org",
    bio: "Supervises organization administration, official correspondence, meeting records, and operational coordination.",
    isCabinetMember: true
  },
  {
    id: "CAB-003",
    name: "Zia Ur Rahman",
    role: "Community Fundraising Coordinator",
    roleUrdu: "کمیونٹی فنڈ ریزنگ کوآرڈینیٹر",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 321 9876500",
    email: "community.fundraising@tikshishi.org",
    bio: "Leads community fundraising initiatives, local donation campaigns, and donor relations across Shishi villages.",
    isCabinetMember: true
  },
  {
    id: "CAB-004",
    name: "Amir Hussain",
    role: "Overseas Fundraising Coordinator",
    roleUrdu: "اوورسیز فنڈ ریزنگ کوآرڈینیٹر",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
    location: "Overseas / International",
    phone: "+92 344 1122300",
    email: "overseas.fundraising1@tikshishi.org",
    bio: "Coordinates overseas diaspora fundraising, international donor relations, and global relief contributions.",
    isCabinetMember: true
  },
  {
    id: "CAB-005",
    name: "Akhtar Uddin",
    role: "Overseas Fundraising Coordinator",
    roleUrdu: "اوورسیز فنڈ ریزنگ کوآرڈینیٹر",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
    location: "Overseas / International",
    phone: "+92 333 9988100",
    email: "overseas.fundraising2@tikshishi.org",
    bio: "Coordinates overseas diaspora fundraising, international donor relations, and global relief contributions.",
    isCabinetMember: true
  },

  // Volunteer Software Developer
  {
    id: "CAB-DEV",
    name: "Abdur Rahman (عبد الرحمٰن)",
    role: "Volunteer Software Developer",
    roleUrdu: "رضا کار سوفٹ ویئر ڈویلپر",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    location: "Lower Chitral, Khyber Pakhtunkhwa",
    phone: "+92 340 0000000",
    email: "dev.abdurrahman@example.com",
    bio: "Volunteers as the lead software engineer for Tanzeem-e-Insani Khidmat (TIK) Shishi, building and maintaining this digital platform, welfare ledger, and field tracking system.",
    isDeveloperVolunteer: true,
    isCabinetMember: false
  },

  // General Society Members
  {
    id: "MEM-001",
    name: "Shakir Hussain (شاکر حسین)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000001",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-002",
    name: "Amir Ijad (امیر ایجاد)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000002",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-003",
    name: "Altaf (الطاف)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000003",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-004",
    name: "Abdul Samad (عبد الصمد)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000004",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-005",
    name: "Muti Ullah (مطیع اللہ)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000005",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-006",
    name: "Amir Uddin (امیر الدین)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000006",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-007",
    name: "Abdul Rasheed (عبد الرشید)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000007",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-008",
    name: "Arif Ullah (عارف اللہ)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000008",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-009",
    name: "Sadam Hussain (صدم حسین)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000009",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-010",
    name: "Sadiq Hussain (صادق حسین)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000010",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-011",
    name: "Fazal Nabi (فضل نبی)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000011",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-012",
    name: "Rashid Nabi (راشد نبی)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000012",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-013",
    name: "Muhammad Ehtisham Ul Haq (محمد احتشام الحق)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000013",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-014",
    name: "Rahim Ullah (رحیم اللہ)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000014",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-015",
    name: "Irshad Ahmad (ارشاد احمد)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000016",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-016",
    name: "Tanzeeb Khan (تنزیب خان)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000017",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-017",
    name: "Syed Akbar Shah (سید اکبر شاہ)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000018",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-018",
    name: "Sher Faraz (شیر فراز)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000019",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-019",
    name: "Wahid Khan (واحد خان)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000020",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-020",
    name: "Shaukat Khan (شوکت خان)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000021",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-021",
    name: "Liaqat (لیاقت)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000022",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-022",
    name: "Akbar Wali (اکبر ولی)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000023",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-023",
    name: "Muhammad Zia Ul Haq (محمد ضیاء الحق)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000024",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-024",
    name: "Zakir Ullah (ذاکر اللہ)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000025",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-025",
    name: "Mujeeb Ur Rahman (مجیب الرحمٰن)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000026",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-026",
    name: "Absar Uddin (ابصار الدین)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000027",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-027",
    name: "Mustafa Uddin (مصطفی الدین)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000028",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  },
  {
    id: "MEM-028",
    name: "Abbas Khan (عباس خان)",
    role: "Society Member",
    roleUrdu: "رکین سوسائٹی",
    location: "Shishi London, Drosh, Lower Chitral",
    phone: "+92 345 9000029",
    bio: "Active society member of Tanzeem-e-Insani Khidmat (TIK) Shishi contributing to local welfare initiatives.",
    isCabinetMember: false
  }
];

export const INITIAL_VOLUNTEERS: Volunteer[] = [
  {
    id: "VOL-2025-001",
    fullName: "Ahmad Hussain",
    cnicOrId: "15201-8392103-1",
    phone: "+92 345 9812341",
    village: "Tar Village",
    primarySkill: "Skilled Construction",
    secondarySkills: ["Masonry", "Water Line Fitting"],
    registrationDate: "2025-01-12",
    status: "Active",
    safetyBriefingCompleted: true,
    totalHoursContributed: 84,
    notes: "Experienced master mason for high-altitude mountain homes."
  },
  {
    id: "VOL-2025-002",
    fullName: "Shahid Ali",
    cnicOrId: "15201-4432190-3",
    phone: "+92 301 8872210",
    village: "Purigal",
    primarySkill: "Logistics & Transport",
    secondarySkills: ["4x4 Mountain Driving", "Heavy Load Handling"],
    registrationDate: "2025-01-15",
    status: "Active",
    safetyBriefingCompleted: true,
    totalHoursContributed: 62,
    notes: "Provides 4x4 Jeep transport for rashan delivery to remote hamlets."
  },
  {
    id: "VOL-2025-003",
    fullName: "Karim Ullah",
    cnicOrId: "15201-9012384-7",
    phone: "+92 333 7621980",
    village: "Madaklasht",
    primarySkill: "First Aid & Emergency",
    secondarySkills: ["First Responder", "Rescue Operations"],
    registrationDate: "2025-01-18",
    status: "Active",
    safetyBriefingCompleted: true,
    totalHoursContributed: 45,
    notes: "Certified basic first aid volunteer for steep mountain digs."
  },
  {
    id: "VOL-2025-004",
    fullName: "Bilal Ahmed Khan",
    cnicOrId: "15201-5512390-5",
    phone: "+92 312 9901234",
    village: "Kawash",
    primarySkill: "Youth Organization",
    secondarySkills: ["Family Verification", "Ration Packing"],
    registrationDate: "2025-01-20",
    status: "Active",
    safetyBriefingCompleted: true,
    totalHoursContributed: 50,
    notes: "Youth team lead for anti-duplication family verification."
  },
  {
    id: "VOL-2025-005",
    fullName: "Zahir Shah",
    cnicOrId: "15201-2234511-9",
    phone: "+92 346 5543210",
    village: "Gorgog",
    primarySkill: "Technical & Solar",
    secondarySkills: ["Micro-Solar Wiring", "Street Light Fitting"],
    registrationDate: "2025-02-01",
    status: "Active",
    safetyBriefingCompleted: true,
    totalHoursContributed: 38,
    notes: "Local technician specializing in off-grid solar light connections."
  }
];

export const INITIAL_WATER_PROJECTS: WaterProject[] = [
  {
    id: "WTR-SHI-01",
    title: "Tar Gravity-Fed Mountain Water Pipeline Phase 1",
    village: "Tar Village",
    pipelineLengthMeters: 1850,
    beneficiariesCount: 420,
    estimatedBudgetPkr: 650000,
    raisedPkr: 520000,
    status: "construction",
    terrainDifficulty: "steep_rock",
    gravityFedSystem: true,
    pipeType: "2.5-Inch High-Density Polyethylene (HDPE)",
    lastInspected: "2025-02-10",
    leadEngineer: "Abdur Rahman",
    description: "Laying high-altitude gravity pipeline from glacial spring source to lower village storage tanks to restore clean drinking water."
  },
  {
    id: "WTR-SHI-02",
    title: "Madaklasht Upper Stream Clean Water Diversion",
    village: "Madaklasht",
    pipelineLengthMeters: 2400,
    beneficiariesCount: 650,
    estimatedBudgetPkr: 890000,
    raisedPkr: 890000,
    status: "planning",
    terrainDifficulty: "glacial_stream",
    gravityFedSystem: true,
    pipeType: "3-Inch Pressure HDPE Pipe",
    lastInspected: "2025-02-12",
    leadEngineer: "M. Sami Ul Haq",
    description: "Constructing protective filter chambers and gravity line to prevent winter freeze blockage for 80+ families."
  },
  {
    id: "WTR-SHI-03",
    title: "Purigal Community Water Tank & Pipeline Repair",
    village: "Purigal",
    pipelineLengthMeters: 920,
    beneficiariesCount: 280,
    estimatedBudgetPkr: 320000,
    raisedPkr: 320000,
    status: "completed",
    terrainDifficulty: "moderate",
    gravityFedSystem: true,
    pipeType: "2-Inch HDPE Pipe",
    lastInspected: "2025-01-28",
    leadEngineer: "Abdur Rahman",
    description: "Replaced 920m damaged iron pipe with flexible cold-resistant HDPE pipe and rebuilt concrete distribution basin."
  }
];

export const INITIAL_HOUSE_CASES: HouseConstructionCase[] = [
  {
    id: "HSE-2025-001",
    familyName: "Bibi Gul & Children",
    headOfFamily: "Late Gul Muhammad (Widow-led Household)",
    category: "widow",
    village: "Tar Village",
    roomCount: 2,
    laborCostSavedPkr: 280000, // $0 labor cost due to TIK volunteer masons
    materialCostPkr: 410000,
    raisedMaterialPkr: 410000,
    skilledMasonsAssigned: ["Ahmad Hussain", "Gul Khan"],
    volunteerCount: 14,
    status: "completed",
    startDate: "2025-01-14",
    completionDate: "2025-02-05",
    notes: "Built complete 2-room winter-proof stone-and-timber home with zero labor charges. Fully completed with roof insulation."
  },
  {
    id: "HSE-2025-002",
    familyName: "Orphans of Rahim Shah",
    headOfFamily: "Zubair Rahim (Elder Orphan Brother, 16 yrs)",
    category: "orphan",
    village: "Purigal",
    roomCount: 3,
    laborCostSavedPkr: 350000,
    materialCostPkr: 520000,
    raisedMaterialPkr: 380000,
    skilledMasonsAssigned: ["Ahmad Hussain", "Sardar Ali"],
    volunteerCount: 18,
    status: "roofing",
    startDate: "2025-01-22",
    notes: "Roof trussing in progress. Local youth volunteers carrying timber beams to site."
  },
  {
    id: "HSE-2025-003",
    familyName: "Sher Afzal Family",
    headOfFamily: "Sher Afzal (Elderly Disabled Person)",
    category: "disability",
    village: "Kawash",
    roomCount: 2,
    laborCostSavedPkr: 240000,
    materialCostPkr: 360000,
    raisedMaterialPkr: 220000,
    skilledMasonsAssigned: ["Ahmad Hussain"],
    volunteerCount: 10,
    status: "foundation",
    startDate: "2025-02-02",
    notes: "Foundation stone layout completed. Seeking corrugated iron sheet sponsors."
  }
];

export const INITIAL_RASHAN_DRIVES: RashanDrive[] = [
  {
    id: "RSH-2025-01",
    driveTitle: "Winter Emergency Food Pack Drive 2025",
    targetVillages: ["Tar", "Purigal", "Madaklasht", "Kawash", "Gorgog"],
    foodPacksCount: 250,
    costPerPackPkr: 8500,
    verifiedFamiliesCount: 250,
    distributionDate: "2025-01-25",
    status: "distributed",
    tokenPrefix: "TIK-RSH-JAN",
    itemsIncluded: [
      "Flour 20kg (Atta)",
      "Cooking Oil 5 Liters",
      "Sugar 5kg",
      "Pulses (Daal Chana & Moong) 4kg",
      "Tea 1kg",
      "Iodized Salt & Rice 5kg"
    ],
    volunteerTeamLead: "Bilal Ahmed Khan"
  },
  {
    id: "RSH-2025-02",
    driveTitle: "Ramadan Preparation Rashan Distribution",
    targetVillages: ["Madaklasht", "Shishi Village", "Uzurbek"],
    foodPacksCount: 300,
    costPerPackPkr: 9200,
    verifiedFamiliesCount: 180,
    distributionDate: "2025-03-01",
    status: "verification",
    tokenPrefix: "TIK-RAMADAN",
    itemsIncluded: [
      "Atta 20kg",
      "Ghee/Oil 5L",
      "Sugar 5kg",
      "Dates (Khajoor) 2kg",
      "Baisan 3kg",
      "Pulses 4kg",
      "Tea 1kg"
    ],
    volunteerTeamLead: "Shahid Ali"
  }
];

export const INITIAL_SOLAR_PROJECTS: SolarProject[] = [
  {
    id: "SLR-2025-01",
    title: "Mountain Footpath Emergency Solar Lighting",
    village: "Tar Pass to Purigal Shortcut",
    type: "pathway_lighting",
    unitsInstalled: 12,
    beneficiariesCount: 800,
    status: "completed",
    costPkr: 180000,
    date: "2025-01-30"
  },
  {
    id: "SLR-2025-02",
    title: "Widow Household Off-Grid Solar Lights",
    village: "Madaklasht & Kawash",
    type: "home_setup",
    unitsInstalled: 15,
    beneficiariesCount: 95,
    status: "in_progress",
    costPkr: 225000,
    date: "2025-02-08"
  }
];

export const INITIAL_ASSISTANCE_REQUESTS: AssistanceRequest[] = [
  {
    id: "REQ-2025-089",
    applicantName: "Habiba Bibi",
    fatherOrHusbandName: "Late Muhammad Khan",
    village: "Madaklasht",
    contactPhone: "+92 342 9182312",
    areaOfNeed: "house_repair",
    description: "Roof collapsing under heavy snow load. Widow living with 4 small children.",
    familyMembersCount: 5,
    monthlyIncomePkr: 8000,
    status: "field_verified",
    requestDate: "2025-02-04",
    fieldNotes: "Verified by Volunteer Bilal Ahmed. Immediate requirement for timber beams and volunteer labor."
  },
  {
    id: "REQ-2025-090",
    applicantName: "Gul Faraz",
    fatherOrHusbandName: "Sher Khan",
    village: "Tar",
    contactPhone: "+92 308 7712390",
    areaOfNeed: "water",
    description: "Lower mohallah water line snapped by rockslide. 18 households without drinking water.",
    familyMembersCount: 120,
    monthlyIncomePkr: 0,
    status: "approved",
    requestDate: "2025-02-08",
    fieldNotes: "Inspected by Abdur Rahman. Approved for 250 meters 2-inch HDPE pipe allocation."
  }
];

export const INITIAL_DAILY_ACTIVITIES: DailyActivity[] = [
  {
    id: "ACT-2025-021",
    date: "2025-02-12",
    title: "Madaklasht Glacial Stream Filter Chamber Excavation",
    village: "Madaklasht",
    teamLead: "Abdur Rahman",
    category: "water",
    description: "Constructed concrete sediment-trap filter basin at spring head elevation 2,400 meters. 18 local youth volunteers assisted in stone trenching.",
    volunteersInvolvedCount: 18,
    beneficiariesImpactedCount: 650,
    photosCount: 6,
    notes: "HDPE pipe connections fused securely. No leakage detected during pressure flow test."
  },
  {
    id: "ACT-2025-020",
    date: "2025-02-10",
    title: "Roof Sheet Installation for Bibi Gul's House",
    village: "Tar Village",
    teamLead: "Ahmad Hussain",
    category: "house_construction",
    description: "Completed installation of corrugated iron roof sheets and thermal ceiling insulation for widow Bibi Gul's house under 100% zero-cost volunteer labor.",
    volunteersInvolvedCount: 14,
    beneficiariesImpactedCount: 5,
    photosCount: 8,
    notes: "Saved PKR 280,000 in local master mason labor costs."
  },
  {
    id: "ACT-2025-019",
    date: "2025-02-08",
    title: "Karakari Community Cooking Utensils Return & Inspection",
    village: "Purigal",
    teamLead: "Shahid Ali",
    category: "karakari",
    description: "Inspected and sanitized 4 large cooking cauldrons (Deg / Big Pateeli) returned from local wedding feast. All items sanitized and stored in TIK Cabinet Unit 1.",
    volunteersInvolvedCount: 4,
    beneficiariesImpactedCount: 300,
    photosCount: 3,
    notes: "All 4 cauldrons returned in excellent condition with zero rental fees charged to family."
  },
  {
    id: "ACT-2025-018",
    date: "2025-02-05",
    title: "CNIC Cross-Verification for Ramadan Food Pack Drive",
    village: "Kawash & Gorgog",
    teamLead: "Bilal Ahmed Khan",
    category: "rashan",
    description: "Met with village elders council (Jirga) to cross-verify 180 low-income family records to eliminate duplicate relief distribution.",
    volunteersInvolvedCount: 8,
    beneficiariesImpactedCount: 180,
    photosCount: 4,
    notes: "180 verified tokens generated for upcoming distribution."
  }
];

export const INITIAL_DONOR_ACCOUNTS: DonorAccount[] = [
  {
    id: "DNR-001",
    fullName: "Dr. Tariq Mahmood",
    cityOrCountry: "Islamabad, Pakistan",
    contactPhone: "+92 300 5123456",
    email: "tariq.mahmood@example.com",
    totalContributedPkr: 850000,
    totalTransactionsCount: 3,
    firstDonationDate: "2025-01-15",
    lastDonationDate: "2025-02-01",
    notes: "Key sponsor for Tar Water Supply Line HDPE pipes."
  },
  {
    id: "DNR-002",
    fullName: "Chitral Overseas Welfare Forum (UK)",
    cityOrCountry: "London, UK",
    contactPhone: "+44 7911 123456",
    email: "info@chitralukwelfare.org",
    totalContributedPkr: 1200000,
    totalTransactionsCount: 2,
    firstDonationDate: "2025-01-20",
    lastDonationDate: "2025-02-05",
    notes: "Overseas Diaspora funding for zero-cost widow house materials."
  },
  {
    id: "DNR-003",
    fullName: "Haji Usman Ghani",
    cityOrCountry: "Peshawar, Pakistan",
    contactPhone: "+92 321 9876543",
    email: "usmanghani.pwr@example.com",
    totalContributedPkr: 450000,
    totalTransactionsCount: 2,
    firstDonationDate: "2025-01-25",
    lastDonationDate: "2025-02-08",
    notes: "Dedicated donor for Karakari community equipment & winter rashan packs."
  },
  {
    id: "DNR-004",
    fullName: "Anonymous Local Well-Wisher",
    cityOrCountry: "Lower Chitral, Pakistan",
    contactPhone: "+92 345 0000000",
    totalContributedPkr: 250000,
    totalTransactionsCount: 4,
    firstDonationDate: "2025-01-12",
    lastDonationDate: "2025-02-10",
    notes: "Direct cash contributions for micro-solar lighting setups."
  }
];

export const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: "DON-2025-001",
    donorId: "DNR-001",
    donorName: "Dr. Tariq Mahmood",
    amountPkr: 500000,
    date: "2025-01-15",
    paymentMethod: "Bank Transfer",
    receiptNo: "REC-TIK-2025-001",
    allocatedCause: "Water Supply Infrastructure",
    notes: "Designated for purchase of 1,850m 2.5-inch HDPE water pipes for Tar Village."
  },
  {
    id: "DON-2025-002",
    donorId: "DNR-002",
    donorName: "Chitral Overseas Welfare Forum (UK)",
    amountPkr: 800000,
    date: "2025-01-20",
    paymentMethod: "Overseas Wire",
    receiptNo: "REC-TIK-2025-002",
    allocatedCause: "Zero-Cost House Construction",
    notes: "Cement, CGI roof sheets, and timber for Bibi Gul & Orphan cases."
  },
  {
    id: "DON-2025-003",
    donorId: "DNR-003",
    donorName: "Haji Usman Ghani",
    amountPkr: 250000,
    date: "2025-01-25",
    paymentMethod: "EasyPaisa",
    receiptNo: "REC-TIK-2025-003",
    allocatedCause: "Karakari Equipment Cabinet",
    notes: "Purchased 6 large cooking cauldrons (Big Pateeli/Deg), 100 plates, and 2 event tents."
  },
  {
    id: "DON-2025-004",
    donorId: "DNR-001",
    donorName: "Dr. Tariq Mahmood",
    amountPkr: 350000,
    date: "2025-02-01",
    paymentMethod: "Bank Transfer",
    receiptNo: "REC-TIK-2025-004",
    allocatedCause: "Water Supply Infrastructure",
    notes: "Second installment for Madaklasht clean water diversion."
  },
  {
    id: "DON-2025-005",
    donorId: "DNR-002",
    donorName: "Chitral Overseas Welfare Forum (UK)",
    amountPkr: 400000,
    date: "2025-02-05",
    paymentMethod: "Overseas Wire",
    receiptNo: "REC-TIK-2025-005",
    allocatedCause: "Smart Rashan Packs",
    notes: "Winter emergency rashan food pack distribution."
  }
];

export const INITIAL_KARAKARI_ITEMS: KarakariItem[] = [
  {
    id: "KAR-001",
    itemName: "Large Cooking Cauldron (Big Pateeli / Deg - 100 Person)",
    itemNameUrdu: "بڑا پتیلا / دیگ (100 افراد کے لیے)",
    category: "Big Cooking Utensils",
    totalQuantity: 8,
    availableQuantity: 5,
    borrowedQuantity: 3,
    cabinetLocation: "TIK Central Depot Cabinet A-1",
    condition: "Excellent",
    description: "Heavy aluminum alloy cooking cauldrons for community wedding feasts, funerals, and relief cooking."
  },
  {
    id: "KAR-002",
    itemName: "Large Serving Platters Set (Big Plates / Thali - 50 Pcs)",
    itemNameUrdu: "بڑی سینی / تھالی سیٹ (50 عدد)",
    category: "Serving Platters & Dishes",
    totalQuantity: 6,
    availableQuantity: 4,
    borrowedQuantity: 2,
    cabinetLocation: "TIK Central Depot Cabinet A-2",
    condition: "Good",
    description: "Stainless steel large communal eating platters for public events and gatherings."
  },
  {
    id: "KAR-003",
    itemName: "Heavy Gas Burner & Regulator Pipe Set",
    itemNameUrdu: "بڑا گیس چولہا اور ریگولیٹر سیٹ",
    category: "Big Cooking Utensils",
    totalQuantity: 5,
    availableQuantity: 3,
    borrowedQuantity: 2,
    cabinetLocation: "TIK Central Depot Shelf B-1",
    condition: "Excellent",
    description: "High-pressure commercial gas stoves for rapid large-scale meal preparation."
  },
  {
    id: "KAR-004",
    itemName: "Community Event Tent (Chamyana 30x30ft)",
    itemNameUrdu: "شادی و تعزیت خیمہ / شامیانہ",
    category: "Event Tents & Carpets",
    totalQuantity: 4,
    availableQuantity: 2,
    borrowedQuantity: 2,
    cabinetLocation: "TIK Storage Unit 2 (Rolled)",
    condition: "Good",
    description: "Weather-resistant canvas marquee tents for shade during community funerals and gatherings."
  },
  {
    id: "KAR-005",
    itemName: "Big Water Storage Drum (200 Liters Food Grade)",
    itemNameUrdu: "پانی کا بڑا ڈرم (200 لیٹر)",
    category: "Gas & Water Storage",
    totalQuantity: 10,
    availableQuantity: 8,
    borrowedQuantity: 2,
    cabinetLocation: "TIK Depot Rack C-1",
    condition: "Excellent",
    description: "Clean water drums for outdoor cooking and wedding tea stalls."
  },
  {
    id: "KAR-006",
    itemName: "Large Tea Cauldron & Samovar (50 Liters)",
    itemNameUrdu: "چائے کا بڑا پتیلا / سماوار",
    category: "Big Cooking Utensils",
    totalQuantity: 4,
    availableQuantity: 4,
    borrowedQuantity: 0,
    cabinetLocation: "TIK Cabinet B-2",
    condition: "Excellent",
    description: "Specialized tea cauldron for continuous hot green/black tea serving during winter gatherings."
  }
];

export const INITIAL_KARAKARI_BORROWS: KarakariBorrowRecord[] = [
  {
    id: "BRW-2025-012",
    itemId: "KAR-001",
    itemName: "Large Cooking Cauldron (Big Pateeli / Deg - 100 Person)",
    quantityBorrowed: 2,
    borrowerName: "Sher Afzal Khan",
    borrowerCnicOrPhone: "+92 345 8812390",
    village: "Purigal",
    eventPurpose: "Wedding Feast",
    issueDate: "2025-02-11",
    expectedReturnDate: "2025-02-14",
    status: "Issued",
    issuedByVolunteer: "Shahid Ali",
    notes: "Issued 2 cauldrons and 1 gas burner for daughter's marriage feast."
  },
  {
    id: "BRW-2025-011",
    itemId: "KAR-002",
    itemName: "Large Serving Platters Set (Big Plates / Thali - 50 Pcs)",
    quantityBorrowed: 2,
    borrowerName: "Zubair Ahmed",
    borrowerCnicOrPhone: "+92 301 5543210",
    village: "Tar Village",
    eventPurpose: "Funeral / Niaz",
    issueDate: "2025-02-10",
    expectedReturnDate: "2025-02-12",
    status: "Issued",
    issuedByVolunteer: "Ahmad Hussain",
    notes: "Issued for community condolence gathering. Zero rental charge."
  },
  {
    id: "BRW-2025-010",
    itemId: "KAR-004",
    itemName: "Community Event Tent (Chamyana 30x30ft)",
    quantityBorrowed: 1,
    borrowerName: "Karim Shah",
    borrowerCnicOrPhone: "+92 333 9988112",
    village: "Madaklasht",
    eventPurpose: "Community Gathering",
    issueDate: "2025-02-01",
    expectedReturnDate: "2025-02-04",
    actualReturnDate: "2025-02-04",
    status: "Returned",
    issuedByVolunteer: "Karim Ullah",
    notes: "Returned to Cabinet in clean condition."
  }
];

