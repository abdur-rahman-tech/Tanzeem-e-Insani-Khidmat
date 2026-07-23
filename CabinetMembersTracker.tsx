import React, { useState } from 'react';
import { 
  Sun, 
  Plus, 
  CheckCircle2, 
  Zap, 
  MapPin, 
  Users, 
  Flame, 
  Compass,
  Sparkles
} from 'lucide-react';
import { SolarProject, Language } from '../types';
import { INITIAL_SOLAR_PROJECTS, NGO_INFO } from '../data/initialData';

interface SolarCommunityTrackerProps {
  language: Language;
  isAdmin?: boolean;
  onRequestAdminUnlock?: () => void;
}

export const SolarCommunityTracker: React.FC<SolarCommunityTrackerProps> = ({ 
  language,
  isAdmin = false,
  onRequestAdminUnlock
}) => {
  const [projects, setProjects] = useState<SolarProject[]>(INITIAL_SOLAR_PROJECTS);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [village, setVillage] = useState('Madaklasht');
  const [type, setType] = useState<SolarProject['type']>('home_setup');
  const [unitsInstalled, setUnitsInstalled] = useState(10);
  const [beneficiariesCount, setBeneficiariesCount] = useState(60);
  const [costPkr, setCostPkr] = useState(150000);

  const totalBeneficiaries = projects.reduce((acc, curr) => acc + curr.beneficiariesCount, 0);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProj: SolarProject = {
      id: `SLR-2025-${String(projects.length + 1).padStart(2, '0')}`,
      title,
      village,
      type,
      unitsInstalled: Number(unitsInstalled),
      beneficiariesCount: Number(beneficiariesCount),
      status: 'in_progress',
      costPkr: Number(costPkr),
      date: new Date().toISOString().split('T')[0]
    };

    setProjects([newProj, ...projects]);
    setShowAddModal(false);
    setTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              Core Operation #4
            </span>
            <span className="text-xs text-slate-500 font-urdu">سولر لائیٹنگ اور راستوں کی مرمت</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Solar Aid & Mountain Community Pathway Repairs
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Installing off-grid micro-solar light setups for widow households and illuminating dark mountain footpaths to ensure safety.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-500 text-white transition-all shadow-lg shadow-amber-950/30 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Solar / Pathway Project</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/60 rounded-xl text-amber-600 dark:text-amber-400">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Solar Units Installed</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              {projects.reduce((acc, curr) => acc + curr.unitsInstalled, 0)} Units
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Mountain Beneficiaries</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">{totalBeneficiaries} People</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-xl text-teal-600 dark:text-teal-400">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Off-Grid Clean Energy</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">100% Solar Powered</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <form onSubmit={handleAddProject} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border-2 border-amber-500 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-600" />
              <span>Record Solar Installation / Pathway Project</span>
            </h3>
            <button type="button" onClick={() => setShowAddModal(false)} className="text-xs text-slate-400">Close</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Project Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Madaklasht Night Pathway Solar Lights"
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
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
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Project Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              >
                <option value="home_setup">Home Off-Grid Solar Lights</option>
                <option value="pathway_lighting">Mountain Footpath Lighting</option>
                <option value="community_hall">Community Hall / Mosque Solar</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Units Installed</label>
              <input
                type="number"
                value={unitsInstalled}
                onChange={(e) => setUnitsInstalled(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Total Beneficiaries</label>
              <input
                type="number"
                value={beneficiariesCount}
                onChange={(e) => setBeneficiariesCount(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Total Material Cost (PKR)</label>
              <input
                type="number"
                value={costPkr}
                onChange={(e) => setCostPkr(Number(e.target.value))}
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
              className="px-6 py-2 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white"
            >
              Save Solar Project
            </button>
          </div>
        </form>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 hover:border-amber-500 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  {p.type.replace('_', ' ').toUpperCase()}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  p.status === 'completed'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                }`}>
                  {p.status.toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{p.village}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Solar Units:</span>
                  <strong className="text-slate-900 dark:text-white text-sm">{p.unitsInstalled} Units</strong>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Beneficiaries:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 text-sm">{p.beneficiariesCount} Villagers</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
              <span>Date: {p.date}</span>
              <span>Cost: PKR {p.costPkr.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
