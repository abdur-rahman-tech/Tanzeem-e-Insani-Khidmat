import React, { useState } from 'react';
import { 
  PackageCheck, 
  Plus, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  Truck, 
  Calendar,
  AlertCircle,
  MapPin,
  Sparkles
} from 'lucide-react';
import { RashanDrive, Language } from '../types';
import { INITIAL_RASHAN_DRIVES, NGO_INFO } from '../data/initialData';

interface RashanDistributionTrackerProps {
  language: Language;
  isAdmin?: boolean;
  onRequestAdminUnlock?: () => void;
}

export const RashanDistributionTracker: React.FC<RashanDistributionTrackerProps> = ({ 
  language,
  isAdmin = false,
  onRequestAdminUnlock
}) => {
  const [drives, setDrives] = useState<RashanDrive[]>(INITIAL_RASHAN_DRIVES);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Drive State
  const [driveTitle, setDriveTitle] = useState('');
  const [targetVillages, setTargetVillages] = useState('Tar, Purigal, Madaklasht');
  const [foodPacksCount, setFoodPacksCount] = useState(150);
  const [costPerPackPkr, setCostPerPackPkr] = useState(8800);
  const [distributionDate, setDistributionDate] = useState('2025-03-15');

  const totalPacksDistributed = drives.reduce((acc, curr) => acc + curr.verifiedFamiliesCount, 0);

  const handleAddDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveTitle.trim()) return;

    const newDrive: RashanDrive = {
      id: `RSH-2025-${String(drives.length + 1).padStart(2, '0')}`,
      driveTitle,
      targetVillages: targetVillages.split(',').map(s => s.trim()),
      foodPacksCount: Number(foodPacksCount),
      costPerPackPkr: Number(costPerPackPkr),
      verifiedFamiliesCount: 0,
      distributionDate,
      status: 'planning',
      tokenPrefix: `TIK-DRIVE-${drives.length + 1}`,
      itemsIncluded: [
        "Atta 20kg", "Cooking Oil 5L", "Sugar 5kg", "Pulses 4kg", "Tea 1kg", "Salt & Rice 5kg"
      ],
      volunteerTeamLead: "Bilal Ahmed Khan"
    };

    setDrives([newDrive, ...drives]);
    setShowAddModal(false);
    setDriveTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
              Core Operation #3
            </span>
            <span className="text-xs text-slate-500 font-urdu">راشن اور امداد کی شفاف تقسیم</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Smart Rashan & Anti-Duplication Relief Distribution
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Organizing food pack distribution without duplication using verified CNIC registries, village jirga screening, and unique token series.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-500 text-white transition-all shadow-lg shadow-teal-950/30 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Rashan Drive</span>
        </button>
      </div>

      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-xl text-teal-600 dark:text-teal-400">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Verified Food Packs Distributed</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">{totalPacksDistributed} Families</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Anti-Duplication Accuracy</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">100% CNIC Verified</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 rounded-xl text-blue-600 dark:text-blue-400">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Mountain Dispatch Fleet</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">4x4 Jeep Delivery</span>
          </div>
        </div>
      </div>

      {/* New Rashan Drive Modal */}
      {showAddModal && (
        <form onSubmit={handleAddDrive} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border-2 border-teal-500 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-teal-600" />
              <span>Plan New Smart Rashan Drive</span>
            </h3>
            <button type="button" onClick={() => setShowAddModal(false)} className="text-xs text-slate-400">Close</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Drive Title *</label>
              <input
                type="text"
                required
                value={driveTitle}
                onChange={(e) => setDriveTitle(e.target.value)}
                placeholder="e.g. Ramadan Special Rashan Package 2025"
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Hamlets / Villages</label>
              <input
                type="text"
                value={targetVillages}
                onChange={(e) => setTargetVillages(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Total Food Packs</label>
              <input
                type="number"
                value={foodPacksCount}
                onChange={(e) => setFoodPacksCount(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Cost Per Pack (PKR)</label>
              <input
                type="number"
                value={costPerPackPkr}
                onChange={(e) => setCostPerPackPkr(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Planned Distribution Date</label>
              <input
                type="date"
                value={distributionDate}
                onChange={(e) => setDistributionDate(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white"
            >
              Confirm Drive Schedule
            </button>
          </div>
        </form>
      )}

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {drives.map((d) => {
          const totalCost = d.foodPacksCount * d.costPerPackPkr;
          return (
            <div
              key={d.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 hover:border-teal-500 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                    Token Series: {d.tokenPrefix}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    d.status === 'distributed'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                  }`}>
                    {d.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    {d.driveTitle}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    <span>Target Villages: {d.targetVillages.join(', ')}</span>
                  </p>
                </div>

                {/* Items Included List */}
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Food Pack Items Included:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {d.itemsIncluded.map((item, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-[11px] font-medium border border-slate-200 dark:border-slate-800">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">Verified Families:</span>
                    <strong className="text-slate-900 dark:text-white text-sm">{d.verifiedFamiliesCount} / {d.foodPacksCount}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-lg">
                    <span className="text-slate-400 block text-[10px]">Total Drive Budget:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 text-sm">PKR {(totalCost / 1000).toFixed(0)}k</strong>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>Date: {d.distributionDate}</span>
                </span>
                <span>Team Lead: {d.volunteerTeamLead}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
