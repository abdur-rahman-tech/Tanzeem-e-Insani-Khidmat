import React, { useState } from 'react';
import { 
  Home, 
  Plus, 
  CheckCircle2, 
  HardHat, 
  Users, 
  Heart, 
  DollarSign, 
  Hammer, 
  Calendar,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { HouseConstructionCase, HouseCategory, Language } from '../types';
import { INITIAL_HOUSE_CASES, NGO_INFO } from '../data/initialData';

interface HouseConstructionTrackerProps {
  language: Language;
  isAdmin?: boolean;
  onRequestAdminUnlock?: () => void;
}

export const HouseConstructionTracker: React.FC<HouseConstructionTrackerProps> = ({ 
  language,
  isAdmin = false,
  onRequestAdminUnlock
}) => {
  const [cases, setCases] = useState<HouseConstructionCase[]>(INITIAL_HOUSE_CASES);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Case State
  const [familyName, setFamilyName] = useState('');
  const [headOfFamily, setHeadOfFamily] = useState('');
  const [category, setCategory] = useState<HouseCategory>('widow');
  const [village, setVillage] = useState('Tar Village');
  const [roomCount, setRoomCount] = useState(2);
  const [materialCostPkr, setMaterialCostPkr] = useState(450000);
  const [notes, setNotes] = useState('');

  const totalLaborSaved = cases.reduce((acc, curr) => acc + curr.laborCostSavedPkr, 0);

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyName.trim()) return;

    const newCase: HouseConstructionCase = {
      id: `HSE-2025-${String(cases.length + 1).padStart(3, '0')}`,
      familyName,
      headOfFamily,
      category,
      village,
      roomCount: Number(roomCount),
      laborCostSavedPkr: 280000, // Est PKR 280,000 labor cost saved
      materialCostPkr: Number(materialCostPkr),
      raisedMaterialPkr: 0,
      skilledMasonsAssigned: ["Master Mason Ahmad Hussain"],
      volunteerCount: 12,
      status: 'verified',
      startDate: new Date().toISOString().split('T')[0],
      notes
    };

    setCases([newCase, ...cases]);
    setShowAddModal(false);
    setFamilyName('');
    setHeadOfFamily('');
    setNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Core Operation #2
            </span>
            <span className="text-xs text-slate-500 font-urdu">مفت مکانات کی تعمیر</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Zero-Cost Volunteer House Construction
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Coordinating TIK master masons and local youth volunteers to build winter-proof homes for widows, orphans, and destitute families at $0 labor fee.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-500 text-white transition-all shadow-lg shadow-amber-950/30 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Register New House Case</span>
        </button>
      </div>

      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/60 rounded-xl text-amber-600 dark:text-amber-400">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Houses Built / In-Progress</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">{cases.length} Households</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Labor Cost Saved</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              PKR {(totalLaborSaved / 1000).toFixed(0)}k ($0 Charged)
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-xl text-teal-600 dark:text-teal-400">
            <Hammer className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Master Volunteer Masons</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">100% Free Labor</span>
          </div>
        </div>
      </div>

      {/* Case Registration Modal */}
      {showAddModal && (
        <form onSubmit={handleAddCase} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border-2 border-amber-500 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Home className="w-5 h-5 text-amber-600" />
              <span>Register Widow / Orphan House Construction Case</span>
            </h3>
            <button type="button" onClick={() => setShowAddModal(false)} className="text-xs text-slate-400">Close</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Family Name *</label>
              <input
                type="text"
                required
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                placeholder="e.g. Bibi Khadija & Children"
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Head of Family Details *</label>
              <input
                type="text"
                required
                value={headOfFamily}
                onChange={(e) => setHeadOfFamily(e.target.value)}
                placeholder="Late Muhammad Khan (Widow Household)"
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Vulnerability Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as HouseCategory)}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              >
                <option value="widow">Widow-led Family</option>
                <option value="orphan">Orphan Children Household</option>
                <option value="destitute">Destitute / Extreme Poverty</option>
                <option value="disability">Disability / Special Needs</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Village Location</label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Room Count</label>
              <input
                type="number"
                value={roomCount}
                onChange={(e) => setRoomCount(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Estimated Material Cost (PKR)</label>
              <input
                type="number"
                value={materialCostPkr}
                onChange={(e) => setMaterialCostPkr(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Verification & Field Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Verified by local village elders council (Jirga). Urgent need for roof timber..."
              className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
            />
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
              className="px-6 py-2 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white"
            >
              Save Construction Case
            </button>
          </div>
        </form>
      )}

      {/* House Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c) => {
          return (
            <div
              key={c.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 hover:border-amber-500 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    Category: {c.category}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    c.status === 'completed'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                  }`}>
                    {c.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {c.familyName}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{c.village} • {c.roomCount} Rooms</span>
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs space-y-1">
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Head of Household:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{c.headOfFamily}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {c.notes}
                </p>

                {/* Zero-Cost Labor Highlight Box */}
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Labor Fee Saved:</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                    PKR {c.laborCostSavedPkr.toLocaleString()} ($0 Charged)
                  </span>
                </div>
              </div>

              {/* Material funding bar */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Material Cost Covered:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    PKR {c.raisedMaterialPkr.toLocaleString()} / {c.materialCostPkr.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((c.raisedMaterialPkr / c.materialCostPkr) * 100))}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                  <span>Assigned: {c.skilledMasonsAssigned.join(', ')}</span>
                  <span>{c.volunteerCount} Youth Volunteers</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
