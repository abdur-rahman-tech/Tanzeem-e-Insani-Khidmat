import React from 'react';
import { 
  Building2, 
  Droplets, 
  Home, 
  PackageCheck, 
  Sun, 
  Users, 
  Bot, 
  ShieldCheck, 
  HeartHandshake,
  Globe2,
  FileSpreadsheet,
  HelpCircle,
  CalendarDays,
  Coins,
  Boxes,
  Lock,
  Unlock
} from 'lucide-react';
import { Language } from '../types';
import { NGO_INFO } from '../data/initialData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onRequestModalOpen: () => void;
  isAdmin?: boolean;
  onOpenAdminModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onRequestModalOpen,
  isAdmin = false,
  onOpenAdminModal
}) => {
  const navItems = [
    { id: 'ai-coordinator', label: 'AI Lead Coordinator', labelUrdu: 'مصنوعی ذہانت کوآرڈینیٹر', icon: Bot, badge: 'Gemini AI' },
    { id: 'cabinet-members', label: 'Cabinet Directory', labelUrdu: 'کابینہ اراکین ڈائریکٹری', icon: ShieldCheck, count: 6 },
    { id: 'daily-activities', label: 'Daily Field Log', labelUrdu: 'روزانہ فیلڈ کارکردگی', icon: CalendarDays, count: 4 },
    { id: 'funds-donors', label: 'Donor Accounts & Funds', labelUrdu: 'عطیات و فنڈز لیجر', icon: Coins, count: 4 },
    { id: 'karakari', label: 'Karakari Utility Depot', labelUrdu: 'کاراکاری امانت ذخیرہ', icon: Boxes, count: 6 },
    { id: 'volunteers', label: 'Volunteer Portal', labelUrdu: 'رضا کار پورٹل', icon: Users, count: 5 },
    { id: 'water-supply', label: 'Water Infrastructure', labelUrdu: 'پینے کا پانی منصوبہ', icon: Droplets, count: 3 },
    { id: 'zero-cost-houses', label: 'Zero-Cost Houses', labelUrdu: 'مفت مکانات تعمیر', icon: Home, count: 3 },
    { id: 'smart-rashan', label: 'Smart Rashan', labelUrdu: 'سمارٹ راشن امداد', icon: PackageCheck, count: 2 },
    { id: 'solar-aid', label: 'Solar & Community', labelUrdu: 'سولر و کمیونٹی ترقی', icon: Sun, count: 2 },
    { id: 'transparency', label: 'Transparency & Audit', labelUrdu: 'شفافیت و آڈٹ رپورٹ', icon: FileSpreadsheet },
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-xl">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-950/80 border-b border-emerald-800/40 text-emerald-200 text-xs px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-emerald-600 text-white font-bold tracking-wider uppercase">
              {language === 'ur' ? 'سرکاری تنظیم' : 'Official NGO'}
            </span>
            <span>
              {language === 'ur' ? `${NGO_INFO.nameUrdu} — ${NGO_INFO.mottoUrdu}` : `${NGO_INFO.name} — ${NGO_INFO.mottoEn} (${NGO_INFO.mottoUrdu})`}
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <span className="hidden sm:inline">{language === 'ur' ? 'قیام:' : 'Founded:'} <strong className="text-emerald-400">{NGO_INFO.foundedDate}</strong></span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">{language === 'ur' ? 'صدر:' : 'President:'} <strong className="text-white">{NGO_INFO.presidentName}</strong></span>
            
            {/* Developer / Admin Lock Status Toggle */}
            <button
              onClick={onOpenAdminModal}
              className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all flex items-center gap-1.5 border ${
                isAdmin 
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm' 
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
              }`}
              title={isAdmin ? "Logged in as Lead Developer Abdur Rahman" : "Click to authenticate as Developer Abdur Rahman"}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Admin: Abdur Rahman (Unlocked)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Developer Login (Read-Only Mode)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Brand Logo & Titles */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-lg shadow-emerald-900/30 flex items-center justify-center">
              <div className="h-full w-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <HeartHandshake className="h-7 w-7 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white font-sans">
                  {NGO_INFO.name}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  TIK Shishi
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span className="font-urdu text-sm text-emerald-300">{NGO_INFO.nameUrdu}</span>
                <span className="text-slate-600">•</span>
                <span>{NGO_INFO.location}</span>
              </p>
            </div>
          </div>

          {/* Mobile Request Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onRequestModalOpen}
              className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center gap-1 shadow-md shadow-emerald-900/40 font-urdu"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'امداد کے لیے درخواست دیں' : 'Apply for Relief'}</span>
            </button>
          </div>
        </div>

        {/* Action Controls & Language Selector */}
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t border-slate-800 lg:border-t-0">
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700/60 text-xs">
            <Globe2 className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                language === 'en' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('ur')}
              className={`px-2.5 py-1 rounded-md font-medium font-urdu transition-all ${
                language === 'ur' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setLanguage('both')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                language === 'both' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bilingual (Eng & اردو)
            </button>
          </div>

          <button
            onClick={onRequestModalOpen}
            className="hidden lg:flex items-center gap-2 px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-lg shadow-emerald-900/40 border border-emerald-500/40"
          >
            <HelpCircle className="w-4 h-4 text-emerald-200" />
            <span className={language === 'ur' ? 'font-urdu' : ''}>
              {language === 'ur' ? 'امداد کے لیے درخواست دیں' : 'Apply for Relief / Assistance'}
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-slate-950/90 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-1 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-950/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className={language === 'ur' ? 'font-urdu' : ''}>
                  {language === 'ur' ? item.labelUrdu : language === 'both' ? `${item.label} (${item.labelUrdu})` : item.label}
                </span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-400 text-slate-950">
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
