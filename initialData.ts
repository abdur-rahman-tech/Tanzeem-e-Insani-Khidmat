import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  CheckCircle2, 
  ShieldAlert, 
  HardHat, 
  Car, 
  Heart, 
  Briefcase, 
  Search, 
  Filter, 
  Sparkles, 
  Award, 
  Clock, 
  ChevronRight,
  Phone,
  MapPin,
  FileCheck,
  Edit3,
  Trash2,
  X
} from 'lucide-react';
import { Volunteer, SkillCategory, Language } from '../types';
import { INITIAL_VOLUNTEERS, NGO_INFO } from '../data/initialData';

interface VolunteerPortalProps {
  language: Language;
  isAdmin?: boolean;
  onRequestAdminUnlock?: () => void;
}

export const VolunteerPortal: React.FC<VolunteerPortalProps> = ({ 
  language,
  isAdmin = false,
  onRequestAdminUnlock
}) => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(INITIAL_VOLUNTEERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('all');
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(volunteers[0]);

  // Form State for New Volunteer Registration
  const [showRegForm, setShowRegForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [cnicOrId, setCnicOrId] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('Tar Village');
  const [primarySkill, setPrimarySkill] = useState<SkillCategory>('Skilled Construction');
  const [secondarySkills, setSecondarySkills] = useState('');
  const [safetyBriefingCompleted, setSafetyBriefingCompleted] = useState(true);
  const [notes, setNotes] = useState('');

  // Editing Volunteer State
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null);

  const skillCategories: SkillCategory[] = [
    'Skilled Construction',
    'Logistics & Transport',
    'Relief Distribution',
    'First Aid & Emergency',
    'Youth Organization',
    'Technical & Solar'
  ];

  const handleRegisterVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !cnicOrId.trim() || !phone.trim()) return;

    const newVol: Volunteer = {
      id: `VOL-2025-${String(volunteers.length + 1).padStart(3, '0')}`,
      fullName,
      cnicOrId,
      phone,
      village,
      primarySkill,
      secondarySkills: secondarySkills.split(',').map(s => s.trim()).filter(Boolean),
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      safetyBriefingCompleted,
      totalHoursContributed: 0,
      notes
    };

    setVolunteers([newVol, ...volunteers]);
    setSelectedVolunteer(newVol);
    setShowRegForm(false);

    // Reset Form
    setFullName('');
    setCnicOrId('');
    setPhone('');
    setNotes('');
  };

  const handleUpdateVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVolunteer) return;

    const updated = volunteers.map(v => v.id === editingVolunteer.id ? editingVolunteer : v);
    setVolunteers(updated);
    if (selectedVolunteer?.id === editingVolunteer.id) {
      setSelectedVolunteer(editingVolunteer);
    }
    setEditingVolunteer(null);
  };

  const handleDeleteVolunteer = (id: string) => {
    if (window.confirm(language === 'ur' ? 'کیا آپ اس رضاکار کا ریکارڈ حذف کرنا چاہتے ہیں؟' : 'Are you sure you want to delete this volunteer record?')) {
      const filtered = volunteers.filter(v => v.id !== id);
      setVolunteers(filtered);
      if (selectedVolunteer?.id === id) {
        setSelectedVolunteer(filtered[0] || null);
      }
    }
  };

  const filteredVolunteers = volunteers.filter(v => {
    const matchesSearch = v.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.cnicOrId.includes(searchTerm);
    const matchesSkill = selectedSkillFilter === 'all' || v.primarySkill === selectedSkillFilter;
    return matchesSearch && matchesSkill;
  });

  const totalLaborHours = volunteers.reduce((acc, curr) => acc + curr.totalHoursContributed, 0);
  const estimatedLaborCostSavedPkr = totalLaborHours * 1200; // Estimated 1,200 PKR/hr master skilled rate

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Header & Impact Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Community Service Core
            </span>
            <span className="text-xs text-slate-500 font-urdu">رضا کار نیٹ ورک</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Volunteer Registration & Onboarding Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Managing zero-cost skilled masons, drivers, youth organizers, and emergency first-responders across Shishi, Lower Chitral.
          </p>
        </div>

        <button
          onClick={() => setShowRegForm(!showRegForm)}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-950/30 flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>{showRegForm ? 'Close Registration Form' : 'Register New Volunteer'}</span>
        </button>
      </div>

      {/* Impact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Active Registered Volunteers</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">{volunteers.length} Active</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 rounded-xl text-blue-600 dark:text-blue-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Free Hours Contributed</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">{totalLaborHours} Hours</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/60 rounded-xl text-amber-600 dark:text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Zero-Cost Labor Value Saved</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              PKR {(estimatedLaborCostSavedPkr / 1000).toFixed(0)}k
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-xl text-teal-600 dark:text-teal-400">
            <HardHat className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium block">Mountain Safety Certified</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              {volunteers.filter(v => v.safetyBriefingCompleted).length} / {volunteers.length}
            </span>
          </div>
        </div>
      </div>

      {/* Registration Form Modal/Card */}
      {showRegForm && (
        <form onSubmit={handleRegisterVolunteer} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border-2 border-emerald-500/60 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                <span>New Volunteer Registration Form (TIK Shishi)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Register local volunteers for zero-cost house construction, water pipeline laying, and emergency relief.
              </p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded">
              0% Labor Fee
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ahmad Hussain"
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">CNIC / ID Number *</label>
              <input
                type="text"
                required
                value={cnicOrId}
                onChange={(e) => setCnicOrId(e.target.value)}
                placeholder="15201-XXXXXXX-X"
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone Contact *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 34X XXXXXXX"
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Village *</label>
              <select
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
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
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Primary Skill Category *</label>
              <select
                value={primarySkill}
                onChange={(e) => setPrimarySkill(e.target.value as SkillCategory)}
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-semibold"
              >
                {skillCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Secondary Skills</label>
              <input
                type="text"
                value={secondarySkills}
                onChange={(e) => setSecondarySkills(e.target.value)}
                placeholder="e.g. Masonry, Pipe Fitting, 4x4 Driver"
                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60">
            <input
              type="checkbox"
              id="safety"
              checked={safetyBriefingCompleted}
              onChange={(e) => setSafetyBriefingCompleted(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
            <label htmlFor="safety" className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              Completed Mountain Orientation & Safety Briefing for steep cliff work and cold terrain in Shishi area.
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowRegForm(false)}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-950/30"
            >
              Confirm Registration & Onboard
            </button>
          </div>
        </form>
      )}

      {/* Main Roster & Verification View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Volunteer List (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Registered Volunteers Roster</span>
              </h3>
              <span className="text-xs font-bold text-slate-500">
                {filteredVolunteers.length} Found
              </span>
            </div>

            {/* Search and Filters */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, village, CNIC..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>

              <select
                value={selectedSkillFilter}
                onChange={(e) => setSelectedSkillFilter(e.target.value)}
                className="w-full py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium"
              >
                <option value="all">All Skill Categories</option>
                {skillCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Roster Cards List */}
          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredVolunteers.map((vol) => {
              const isSelected = selectedVolunteer?.id === vol.id;
              return (
                <div
                  key={vol.id}
                  onClick={() => setSelectedVolunteer(vol)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-md'
                      : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {vol.fullName}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>{vol.village}</span>
                      </p>
                    </div>

                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                      {vol.primarySkill}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span>ID: <strong className="text-slate-700 dark:text-slate-300">{vol.id}</strong></span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                      <Clock className="w-3 h-3" />
                      {vol.totalHoursContributed} hrs
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Volunteer Verification & Onboarding Card (7 cols) */}
        <div className="lg:col-span-7">
          {selectedVolunteer ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              {/* Header Badge */}
              <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-2">
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 block">
                    Verified Volunteer Record
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedVolunteer.fullName}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedVolunteer.village} • Joined {selectedVolunteer.registrationDate}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    Status: {selectedVolunteer.status}
                  </span>
                  <button
                    onClick={() => setEditingVolunteer(selectedVolunteer)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-950 text-slate-600 dark:text-slate-300 transition-colors"
                    title="Edit Volunteer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteVolunteer(selectedVolunteer.id)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-950 text-slate-600 dark:text-slate-300 transition-colors"
                    title="Delete Volunteer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 5 Core Required Onboarding Outputs */}
              <div className="space-y-6 text-sm">
                {/* 1. Volunteer Verification & Profile Summary */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <span>Volunteer Verification & Profile Summary</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">CNIC / ID:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{selectedVolunteer.cnicOrId}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Phone Contact:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{selectedVolunteer.phone}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Home Village:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{selectedVolunteer.village}</strong>
                    </div>
                  </div>
                </div>

                {/* 2. Skill Classification & Best Fit Category */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    <span>Skill Classification & Best Fit Category</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold block">Primary Functional Category:</span>
                      <span className="inline-block mt-1 px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold">
                        {selectedVolunteer.primarySkill}
                      </span>
                    </div>
                    {selectedVolunteer.secondarySkills.length > 0 && (
                      <div>
                        <span className="text-slate-500 font-semibold block">Secondary Skill Capabilities:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {selectedVolunteer.secondarySkills.map((sk, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[11px]">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Orientation & Safety Briefing Checklist */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <HardHat className="w-4 h-4 text-amber-500" />
                    <span>Orientation & Safety Briefing Checklist (Rural Mountain Terrain)</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>High-Altitude Footwear & Thermal Protection:</strong> Mandatory insulated boots for winter mountain excavations.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Rockfall & Steep Slope Vigilance:</strong> Stay connected with local safety monitors on Tar cliff pipelines.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Respectful Conduct with Beneficiaries:</strong> Maintain absolute dignity and privacy when working on widows' houses.</span>
                    </li>
                  </ul>
                </div>

                {/* 4. Formal Volunteer Commitment / Code of Conduct Acknowledgment */}
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-2">
                  <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Formal Volunteer Commitment & Code of Conduct</span>
                  </h3>
                  <blockquote className="italic text-xs text-slate-300 leading-relaxed pl-3 border-l-2 border-emerald-500">
                    "I solemnly pledge to serve the people of Shishi purely for humanity under Tanzeem-e-Insani Khidmat (TIK) Shishi. I will charge $0 labor fees, protect beneficiary dignity, and work under the leadership of Founder Abdur Rahman and President M. Sami Ul Haq."
                  </blockquote>
                </div>

                {/* 5. Call-for-Volunteers Announcement Draft */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>Call-for-Volunteers Announcement Draft (Bilingual)</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="font-bold text-emerald-600 block mb-1">English:</span>
                      <p className="text-slate-700 dark:text-slate-300">
                        "TIK Shishi invites skilled masons and youth volunteers in {selectedVolunteer.village} for zero-cost widow house construction. Contact Abdur Rahman & M. Sami-ul-Haq."
                      </p>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="font-bold text-emerald-600 font-urdu block mb-1">اردو (Urdu):</span>
                      <p className="text-slate-700 dark:text-slate-300 font-urdu leading-relaxed">
                        تنظیم انسانی خدمت شیشی: شیشi کوہ کے نوجوانوں اور ماہر مستریوں سے بلا معاوضہ سماجی خدمت کے لیے شمولیت کی اپیل کی جاتی ہے۔
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-96 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400">
              <Users className="w-12 h-12 text-slate-300" />
              <p className="text-sm font-semibold mt-2">Select a volunteer from the roster to view complete verification profile.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Volunteer Modal */}
      {editingVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setEditingVolunteer(null)}
              className="absolute right-4 top-4 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Edit Volunteer Record
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Update {editingVolunteer.fullName}
              </h2>
            </div>

            <form onSubmit={handleUpdateVolunteer} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingVolunteer.fullName}
                    onChange={(e) => setEditingVolunteer({ ...editingVolunteer, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">CNIC / ID Number *</label>
                  <input
                    type="text"
                    required
                    value={editingVolunteer.cnicOrId}
                    onChange={(e) => setEditingVolunteer({ ...editingVolunteer, cnicOrId: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone Contact *</label>
                  <input
                    type="text"
                    required
                    value={editingVolunteer.phone}
                    onChange={(e) => setEditingVolunteer({ ...editingVolunteer, phone: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Village *</label>
                  <select
                    value={editingVolunteer.village}
                    onChange={(e) => setEditingVolunteer({ ...editingVolunteer, village: e.target.value })}
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
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Primary Skill *</label>
                  <select
                    value={editingVolunteer.primarySkill}
                    onChange={(e) => setEditingVolunteer({ ...editingVolunteer, primarySkill: e.target.value as SkillCategory })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
                  >
                    {skillCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Total Hours Contributed</label>
                  <input
                    type="number"
                    value={editingVolunteer.totalHoursContributed}
                    onChange={(e) => setEditingVolunteer({ ...editingVolunteer, totalHoursContributed: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingVolunteer(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
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
