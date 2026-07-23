import React, { useState } from 'react';
import { 
  Droplets, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Users, 
  Ruler, 
  Coins, 
  ShieldCheck, 
  Sparkles,
  Mountain,
  Hammer,
  Edit3,
  Trash2,
  X
} from 'lucide-react';
import { WaterProject, Language } from '../types';
import { INITIAL_WATER_PROJECTS, NGO_INFO } from '../data/initialData';

interface WaterSupplyTrackerProps {
  language: Language;
  isAdmin?: boolean;
  onRequestAdminUnlock?: () => void;
}

export const WaterSupplyTracker: React.FC<WaterSupplyTrackerProps> = ({ 
  language,
  isAdmin = false,
  onRequestAdminUnlock
}) => {
  const [projects, setProjects] = useState<WaterProject[]>(INITIAL_WATER_PROJECTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<WaterProject | null>(null);

  // New Project State
  const [title, setTitle] = useState('');
  const [village, setVillage] = useState('Tar Village');
  const [pipelineLengthMeters, setPipelineLengthMeters] = useState(1200);
  const [beneficiariesCount, setBeneficiariesCount] = useState(350);
  const [estimatedBudgetPkr, setEstimatedBudgetPkr] = useState(450000);
  const [terrainDifficulty, setTerrainDifficulty] = useState<WaterProject['terrainDifficulty']>('steep_rock');
  const [description, setDescription] = useState('');

  const totalMetersLaid = projects.reduce((acc, curr) => acc + curr.pipelineLengthMeters, 0);
  const totalBeneficiaries = projects.reduce((acc, curr) => acc + curr.beneficiariesCount, 0);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProj: WaterProject = {
      id: `WTR-SHI-${String(projects.length + 1).padStart(2, '0')}`,
      title,
      village,
      pipelineLengthMeters: Number(pipelineLengthMeters),
      beneficiariesCount: Number(beneficiariesCount),
      estimatedBudgetPkr: Number(estimatedBudgetPkr),
      raisedPkr: 0,
      status: 'planning',
      terrainDifficulty,
      gravityFedSystem: true,
      pipeType: '2.5-Inch HDPE Pressure Pipe',
      lastInspected: new Date().toISOString().split('T')[0],
      leadEngineer: 'Engr. Water Field Team Lead',
      description
    };

    setProjects([newProj, ...projects]);
    setShowAddModal(false);
    setTitle('');
    setDescription('');
  };

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm(language === 'ur' ? 'کیا آپ اس واٹر پائپ لائن منصوبے کو حذف کرنا چاہتے ہیں؟' : 'Are you sure you want to delete this water pipeline project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
              Core Operation #1
            </span>
            <span className="text-xs text-slate-500 font-urdu">پینے کے پانی کا منصوبہ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Water Supply Line Infrastructure & Gravity Pipelines
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            High-altitude gravity pipelines, spring source protection, and HDPE distribution across Shishi villages.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-950/30 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Water Pipeline Survey</span>
        </button>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 rounded-xl text-blue-600 dark:text-blue-400">
            <Ruler className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Pipeline Distance</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">{totalMetersLaid.toLocaleString()} Meters</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Beneficiary Villagers Served</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">{totalBeneficiaries.toLocaleString()} Villagers</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-xl text-teal-600 dark:text-teal-400">
            <Mountain className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Gravity System Efficiency</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">100% Gravity-Fed</span>
          </div>
        </div>
      </div>

      {/* Project Creation Form Modal */}
      {showAddModal && (
        <form onSubmit={handleAddProject} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border-2 border-blue-500 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span>Create Water Pipeline Survey & Project Record</span>
            </h3>
            <button type="button" onClick={() => setShowAddModal(false)} className="text-xs text-slate-400">Close</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Pipeline Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Tar Valley Upper Spring Diversion"
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Village *</label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Pipeline Length (Meters)</label>
              <input
                type="number"
                value={pipelineLengthMeters}
                onChange={(e) => setPipelineLengthMeters(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Beneficiary Count</label>
              <input
                type="number"
                value={beneficiariesCount}
                onChange={(e) => setBeneficiariesCount(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Estimated Material Cost (PKR)</label>
              <input
                type="number"
                value={estimatedBudgetPkr}
                onChange={(e) => setEstimatedBudgetPkr(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Terrain Risk Level</label>
              <select
                value={terrainDifficulty}
                onChange={(e) => setTerrainDifficulty(e.target.value as any)}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              >
                <option value="moderate">Moderate Slope</option>
                <option value="steep_rock">Steep Rock Cliff Face</option>
                <option value="glacial_stream">Glacial Stream Crossing</option>
                <option value="avalanche_zone">Avalanche Channel Risk</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Technical Details / Survey Notes</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe spring water pressure, filter chamber location, and local volunteer trench digging plan..."
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
              className="px-6 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white"
            >
              Save Water Project Record
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => {
          const percentRaised = Math.round((p.raisedPkr / p.estimatedBudgetPkr) * 100);
          return (
            <div
              key={p.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 hover:border-blue-500 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                    {p.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      p.status === 'completed'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                    }`}>
                      {p.status.toUpperCase()}
                    </span>
                    <button
                      onClick={() => setEditingProject(p)}
                      className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                      title="Edit Project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{p.village}</span>
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                  {p.description}
                </p>

                {/* Technical Badges */}
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
                    <Ruler className="w-3 h-3 text-blue-500" />
                    {p.pipelineLengthMeters}m HDPE Pipe
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
                    <Users className="w-3 h-3 text-emerald-500" />
                    {p.beneficiariesCount} Beneficiaries
                  </span>
                </div>
              </div>

              {/* Progress Bar & Lead */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Material Funding:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    PKR {p.raisedPkr.toLocaleString()} / {p.estimatedBudgetPkr.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, percentRaised)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                  <span>Project Lead: {p.leadEngineer || 'Volunteer Field Team'}</span>
                  <span>100% Zero-Cost Volunteer Labor</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setEditingProject(null)}
              className="absolute right-4 top-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                Edit Water Pipeline Project
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Project #{editingProject.id}
              </h2>
            </div>

            <form onSubmit={handleUpdateProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Village *</label>
                  <select
                    value={editingProject.village}
                    onChange={(e) => setEditingProject({ ...editingProject, village: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  >
                    <option value="Tar Village">Tar Village</option>
                    <option value="Purigal">Purigal</option>
                    <option value="Madaklasht">Madaklasht</option>
                    <option value="Kawash">Kawash</option>
                    <option value="Gorgog">Gorgog</option>
                    <option value="Shishi Village">Shishi Village</option>
                    <option value="Uzurbek">Uzurbek</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Status *</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as WaterProject['status'] })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                  >
                    <option value="planning">Planning Phase</option>
                    <option value="under_construction">Under Construction</option>
                    <option value="completed">Completed & Active</option>
                    <option value="maintenance">Maintenance Needed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Pipeline Length (Meters)</label>
                  <input
                    type="number"
                    value={editingProject.pipelineLengthMeters}
                    onChange={(e) => setEditingProject({ ...editingProject, pipelineLengthMeters: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Beneficiaries Reached</label>
                  <input
                    type="number"
                    value={editingProject.beneficiariesCount}
                    onChange={(e) => setEditingProject({ ...editingProject, beneficiariesCount: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Estimated Budget (PKR)</label>
                  <input
                    type="number"
                    value={editingProject.estimatedBudgetPkr}
                    onChange={(e) => setEditingProject({ ...editingProject, estimatedBudgetPkr: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Raised Amount (PKR)</label>
                  <input
                    type="number"
                    value={editingProject.raisedPkr}
                    onChange={(e) => setEditingProject({ ...editingProject, raisedPkr: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-emerald-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Project Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
