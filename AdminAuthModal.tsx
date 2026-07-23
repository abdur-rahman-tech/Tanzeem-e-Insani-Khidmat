import React from 'react';
import { 
  FileSpreadsheet, 
  ShieldCheck, 
  Award, 
  Heart, 
  CheckCircle2, 
  Users, 
  Coins, 
  Printer, 
  Building2,
  Lock,
  Globe2,
  Download
} from 'lucide-react';
import { Language } from '../types';
import { NGO_INFO } from '../data/initialData';

interface TransparencyReportProps {
  language: Language;
}

export const TransparencyReport: React.FC<TransparencyReportProps> = ({ language }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Donor Trust & Accountability
            </span>
            <span className="text-xs text-slate-500 font-urdu">شفافیت اور مالی حساب دہی</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Financial Accountability & Zero-Cost Labor Audit
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Public financial ledger and operational transparency report for Tanzeem-e-Insani Khidmat (TIK) Shishi.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white transition-all shadow-md flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print Audit Report</span>
        </button>
      </div>

      {/* Organizational Leadership & Founding Credentials */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white border border-slate-700 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <div>
            <h2 className="text-xl font-bold">{NGO_INFO.name} ({NGO_INFO.nameUrdu})</h2>
            <p className="text-xs text-slate-400">
              Community Welfare Organization • {NGO_INFO.location} • Founded: {NGO_INFO.foundedDate}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-700">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs font-bold uppercase text-emerald-400 block">Organization President</span>
            <h3 className="text-lg font-bold">{NGO_INFO.presidentName}</h3>
            <p className="text-xs text-slate-300">
              Elected community leader overseeing executive cabinet decisions, village council (Jirga) alignment, and project approvals.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs font-bold uppercase text-emerald-400 block">Founding Authority</span>
            <h3 className="text-lg font-bold">{NGO_INFO.foundingCouncil}</h3>
            <p className="text-xs text-slate-300">
              Community elders council and youth welfare committee established on {NGO_INFO.foundedDate} to serve local communities.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs font-bold uppercase text-emerald-400 block">Volunteer App Developer</span>
            <h3 className="text-lg font-bold">{NGO_INFO.developerName}</h3>
            <p className="text-xs text-slate-300">
              Volunteer software developer responsible solely for engineering and maintaining this web application and digital management system.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars of Transparency */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400 w-fit">
            <Coins className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">0% Administrative Fees</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            100% of donor financial contributions are spent directly on construction materials, piping, and food packs. Zero office rental or management overhead.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 rounded-xl text-blue-600 dark:text-blue-400 w-fit">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Zero-Cost Volunteer Labor</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All master masons, 4x4 drivers, and youth organizers work on a 100% volunteer basis, saving millions of PKR in labor charges for widows and orphans.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-xl text-teal-600 dark:text-teal-400 w-fit">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Anti-Duplication Verification</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Cross-checking CNIC databases with local village jirgas prevents duplicate food pack or aid distribution across local hamlets.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/60 rounded-xl text-amber-600 dark:text-amber-400 w-fit">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Verified Photo & GPS Proof</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Donors receive line-item financial receipts and geotagged field photos for every completed house, water pipe segment, and rashan distribution.
          </p>
        </div>
      </div>
    </div>
  );
};
