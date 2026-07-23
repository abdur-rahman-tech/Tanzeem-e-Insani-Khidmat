import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  Printer, 
  Users, 
  Droplets, 
  Home, 
  PackageCheck, 
  Sun, 
  Megaphone,
  RefreshCw,
  FileText,
  AlertCircle,
  ShieldCheck,
  Languages
} from 'lucide-react';
import { Language, CoordinatorOutput } from '../types';
import { generateCoordinatorResponse } from '../services/geminiCoordinator';
import { NGO_INFO } from '../data/initialData';

interface AICoordinatorHubProps {
  language: Language;
}

export const AICoordinatorHub: React.FC<AICoordinatorHubProps> = ({ language }) => {
  const [promptInput, setPromptInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'volunteer' | 'water' | 'house' | 'rashan' | 'solar' | 'donor_appeal' | 'general'>('volunteer');
  const [loading, setLoading] = useState(false);
  const [currentOutput, setCurrentOutput] = useState<string | null>(null);
  const [outputSource, setOutputSource] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<CoordinatorOutput[]>([]);

  const promptPresets = [
    {
      id: 'vol-onboard',
      category: 'volunteer' as const,
      icon: Users,
      title: 'Volunteer Onboarding & Skill Classification',
      desc: 'Generates volunteer verification, skill unit assignment, mountain safety checklist, commitment, and bilingual calls.',
      preset: `Register new volunteer for Shishi, Lower Chitral:
Name: Gul Muhammad Khan
CNIC: 15201-9921034-5
Phone: 0346-9182312
Village: Madaklasht
Primary Skill: Master Mason (High Altitude Stone & Brick Work)
Secondary Skills: 4x4 Mountain Jeep Driver, Disaster First-Responder
Availability: 3 days/week for zero-cost home construction.`
    },
    {
      id: 'water-survey',
      category: 'water' as const,
      icon: Droplets,
      title: 'Water Pipeline Field Survey & Excavation Plan',
      desc: 'Creates gravity-fed HDPE pipeline plan, mountain terrain safety protocol, and volunteer trenching roster.',
      preset: `Plan a gravity-fed water pipeline extension for Tar Village upper mohallah:
Distance: 1,850 meters from glacial spring source to storage reservoir.
Terrain: Steep rocky cliff faces and frozen stream beds in upper Shishi.
Beneficiaries: 85 families (450 individuals).
Need: 2.5-inch HDPE pressure pipe, filter chamber construction, and 20 local youth volunteers for trenching.`
    },
    {
      id: 'house-workorder',
      category: 'house' as const,
      icon: Home,
      title: 'Zero-Cost House Construction Work Order',
      desc: 'Generates zero-labor-cost work order, mason schedules, material budgets, and volunteer labor savings calculation.',
      preset: `Generate a zero-cost house construction work order for Bibi Samina (Widow with 4 orphan children) in Purigal Village:
Structure: 2-Room seismic & winter-resilient stone masonry house with CGI sheet roof.
Labor Model: 100% Free volunteer labor provided by TIK Shishi skilled masons ($0 labor cost to beneficiary).
Material Budget needed: PKR 420,000 for CGI sheets, cement, timber trusses, and steel.
Assigned Masons: Master Mason Ahmad Hussain & TIK Youth Brigade.`
    },
    {
      id: 'rashan-verification',
      category: 'rashan' as const,
      icon: PackageCheck,
      title: 'Smart Rashan Anti-Duplication Audit',
      desc: 'Formulates family verification tokens, ration pack items, and distribution schedule across Shishi hamlets.',
      preset: `Formulate a Smart Rashan & Emergency Relief Distribution for 200 vulnerable families across Purigal, Kawash, and Gorgog hamlets:
Anti-Duplication Strategy: Cross-verify CNIC records with local village elders council (Jirga).
Pack Contents: 20kg Atta, 5L Oil, 5kg Sugar, 4kg Pulses, 1kg Tea, Rice & Salt.
Distribution Tokens: Generate unique TIK-RSH token series and volunteer safety guidelines for remote distribution.`
    },
    {
      id: 'solar-plan',
      category: 'solar' as const,
      icon: Sun,
      title: 'Solar Aid & Village Pathway Repair',
      desc: 'Details micro-solar kit setups for low-income homes and footbridge pathway repairs.',
      preset: `Plan micro-solar lighting setup for 15 off-grid destitute households in upper Madaklasht and emergency solar streetlamp placement along dangerous Tar cliff footpaths.`
    },
    {
      id: 'donor-appeal',
      category: 'donor_appeal' as const,
      icon: Megaphone,
      title: 'Transparency & Donor Accountability Appeal',
      desc: 'Drafts high-trust fundraising appeal emphasizing 0% administrative fees and 100% direct community delivery.',
      preset: `Draft an urgent transparency & fundraising appeal for TIK Shishi Water Supply Line & Zero-Cost House Building Fund:
Key Highlights: Founded Jan 11, 2025 by Lead Technical Architect Abdur Rahman and President M. Sami Ul Haq.
Core Guarantee: 0% administrative overhead, 100% zero-cost volunteer labor, verified photo reports for every donor.`
    }
  ];

  const handleRunCoordinator = async (customPrompt?: string, catOverride?: 'volunteer' | 'water' | 'house' | 'rashan' | 'solar' | 'donor_appeal' | 'general') => {
    const textToRun = customPrompt || promptInput;
    const catToRun = catOverride || selectedCategory;

    if (!textToRun.trim()) return;

    setLoading(true);
    setCurrentOutput(null);

    try {
      const res = await generateCoordinatorResponse({
        prompt: textToRun,
        category: catToRun,
        language
      });

      setCurrentOutput(res.output);
      setOutputSource(res.source);

      // Save to history
      const newHistoryItem: CoordinatorOutput = {
        id: `OUT-${Date.now()}`,
        title: `${catToRun.toUpperCase()} - ${textToRun.substring(0, 35)}...`,
        category: catToRun,
        promptUsed: textToRun,
        contentEnglish: res.output,
        contentUrdu: res.output,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]);

    } catch (err) {
      console.error("Coordinator error:", err);
      setCurrentOutput("⚠️ Error generating coordinator response. Please check your connection or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!currentOutput) return;
    navigator.clipboard.writeText(currentOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Banner & Intro */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-2xl border border-emerald-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
          <Bot className="w-96 h-96 text-emerald-400" />
        </div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              AI Lead Coordinator Engine
            </span>
            <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-full border border-slate-700">
              Shishi Operations Hub
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Humanitarian Strategy & Operational AI Coordinator
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Welcome to the operational intelligence center for <strong className="text-emerald-400 font-semibold">{NGO_INFO.name}</strong> ({NGO_INFO.nameUrdu}). 
            Enter operational inputs from volunteers, team leads, or donors to generate structured onboarding briefing checklists, water line technical surveys, zero-cost house construction orders, and bilingual relief reports.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-200/80 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>President: {NGO_INFO.presidentName}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Developer: {NGO_INFO.developerName} (Volunteer)</span>
            </div>
            <span>•</span>
            <span>Est. Jan 11, 2025</span>
          </div>
        </div>
      </div>

      {/* Quick Action Presets Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Operational Output Generators & Presets</span>
          </h2>
          <span className="text-xs text-slate-500">Click any preset to run instantly</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promptPresets.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedCategory(item.category);
                  setPromptInput(item.preset);
                  handleRunCoordinator(item.preset, item.category);
                }}
                className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500/80 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Run Generator</span>
                  <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Query Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Console (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-600" />
              <span>Coordinator Command Console</span>
            </h3>
            <p className="text-xs text-slate-500">
              Paste raw volunteer data, project requirements, or donor queries.
            </p>
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Operational Domain:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'volunteer', label: 'Volunteer Onboard' },
                { id: 'water', label: 'Water Pipeline' },
                { id: 'house', label: 'Zero-Cost House' },
                { id: 'rashan', label: 'Smart Rashan' },
                { id: 'solar', label: 'Solar Aid' },
                { id: 'donor_appeal', label: 'Donor Appeal' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Operational Input / Field Notes:
              </label>
              <button
                type="button"
                onClick={() => setPromptInput('')}
                className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            </div>
            <textarea
              rows={8}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. Process registration for volunteer master mason Ahmad Hussain from Tar village, CNIC 15201-8392103-1, available for zero-cost widow house building..."
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs leading-relaxed"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={() => handleRunCoordinator()}
            disabled={loading || !promptInput.trim()}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-950/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing Operational Data...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Official TIK Output</span>
              </>
            )}
          </button>

          {/* History List */}
          {history.length > 0 && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                Recent Generated Reports ({history.length})
              </h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCurrentOutput(item.contentEnglish);
                      setSelectedCategory(item.category);
                    }}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-xs text-slate-700 dark:text-slate-300 cursor-pointer flex justify-between items-center transition-colors"
                  >
                    <span className="font-medium truncate max-w-[200px]">{item.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.createdAt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Output Document Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[580px] flex flex-col">
            {/* Output Document Header */}
            <div className="p-4 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Official Document Preview & Printable Stamp
                </span>
                {outputSource && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    Engine: {outputSource}
                  </span>
                )}
              </div>

              {currentOutput && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Output</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Official Letter</span>
                  </button>
                </div>
              )}
            </div>

            {/* Document Content View */}
            <div id="printable-area" className="p-6 sm:p-8 flex-1 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans leading-relaxed text-sm overflow-y-auto max-h-[700px]">
              {loading ? (
                <div className="h-96 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="relative">
                    <Bot className="w-16 h-16 text-emerald-600 animate-bounce" />
                    <Sparkles className="w-6 h-6 text-amber-400 absolute -top-1 -right-1 animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">
                      TIK Shishi AI Coordinator is Processing...
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm">
                      Structuring volunteer verification, mountain safety briefings, and bilingual Urdu/English directives.
                    </p>
                  </div>
                </div>
              ) : currentOutput ? (
                <div className="space-y-6 printable-document">
                  {/* Official TIK Header Seal for Print */}
                  <div className="pb-4 border-b-2 border-emerald-600 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        {NGO_INFO.name}
                      </h2>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold font-urdu">
                        {NGO_INFO.nameUrdu} — {NGO_INFO.mottoEn} ({NGO_INFO.mottoUrdu})
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {NGO_INFO.location} | Est. {NGO_INFO.foundedDate}
                      </p>
                    </div>
                    <div className="text-right border-l-2 border-slate-200 dark:border-slate-800 pl-4">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">President</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{NGO_INFO.presidentName}</span>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mt-1">Volunteer App Developer</span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{NGO_INFO.developerName}</span>
                    </div>
                  </div>

                  {/* Render Markdown-like formatted output */}
                  <div className="prose dark:prose-invert prose-emerald max-w-none space-y-4 text-sm leading-relaxed">
                    {currentOutput.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('# ')) {
                        return (
                          <h1 key={pIdx} className="text-xl font-bold text-emerald-800 dark:text-emerald-400 border-b pb-2">
                            {paragraph.replace('# ', '')}
                          </h1>
                        );
                      }
                      if (paragraph.startsWith('## ')) {
                        return (
                          <h2 key={pIdx} className="text-base font-bold text-slate-800 dark:text-slate-200 mt-4 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            {paragraph.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={pIdx} className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-3 mb-1">
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                        const items = paragraph.split('\n');
                        return (
                          <ul key={pIdx} className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
                            {items.map((it, idx) => (
                              <li key={idx} className="text-slate-700 dark:text-slate-300">
                                {it.replace(/^[-*]\s*/, '')}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={pIdx} className="text-slate-700 dark:text-slate-300 whitespace-pre-line text-xs sm:text-sm">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>

                  {/* Official Footer */}
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex flex-wrap justify-between items-center gap-2">
                    <span>Certified Output: TIK Shishi Lead AI Coordinator</span>
                    <span>Service, Brotherhood, Progress (خدمت، اخوت، ترقی)</span>
                  </div>
                </div>
              ) : (
                <div className="h-96 flex flex-col items-center justify-center space-y-3 text-center text-slate-400">
                  <Bot className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                  <div className="space-y-1">
                    <p className="font-semibold text-sm text-slate-600 dark:text-slate-400">
                      No Output Generated Yet
                    </p>
                    <p className="text-xs text-slate-400 max-w-xs">
                      Select an operational preset above or type custom field notes on the left to generate an official TIK briefing.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
