import React, { useState } from 'react';
import { Language, AssistanceRequest } from './types';
import { Header } from './components/Header';
import { AICoordinatorHub } from './components/AICoordinatorHub';
import { VolunteerPortal } from './components/VolunteerPortal';
import { WaterSupplyTracker } from './components/WaterSupplyTracker';
import { HouseConstructionTracker } from './components/HouseConstructionTracker';
import { RashanDistributionTracker } from './components/RashanDistributionTracker';
import { SolarCommunityTracker } from './components/SolarCommunityTracker';
import { TransparencyReport } from './components/TransparencyReport';
import { AssistanceRequestModal } from './components/AssistanceRequestModal';
import { DailyActivityTracker } from './components/DailyActivityTracker';
import { FundsAndDonorsTracker } from './components/FundsAndDonorsTracker';
import { KarakariCabinetTracker } from './components/KarakariCabinetTracker';
import { CabinetMembersTracker } from './components/CabinetMembersTracker';
import { AdminAuthModal } from './components/AdminAuthModal';
import { NGO_INFO, INITIAL_ASSISTANCE_REQUESTS } from './data/initialData';
import { HeartHandshake, ShieldCheck, Phone, MapPin, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('ai-coordinator');
  const [language, setLanguage] = useState<Language>('both');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Restricted editing for Developer Abdur Rahman
  const [requestsList, setRequestsList] = useState<AssistanceRequest[]>(INITIAL_ASSISTANCE_REQUESTS);

  const handleNewAssistanceRequest = (newReq: AssistanceRequest) => {
    setRequestsList([newReq, ...requestsList]);
  };

  const handleRequestAdminUnlock = () => {
    setIsAdminAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        onRequestModalOpen={() => setIsRequestModalOpen(true)}
        isAdmin={isAdmin}
        onOpenAdminModal={() => setIsAdminAuthModalOpen(true)}
      />

      {/* Main App View Body */}
      <main className="flex-1">
        {activeTab === 'ai-coordinator' && (
          <AICoordinatorHub language={language} />
        )}

        {activeTab === 'cabinet-members' && (
          <CabinetMembersTracker 
            language={language} 
            isAdmin={isAdmin} 
            onRequestAdminUnlock={handleRequestAdminUnlock}
          />
        )}

        {activeTab === 'daily-activities' && (
          <DailyActivityTracker 
            language={language} 
            isAdmin={isAdmin} 
            onRequestAdminUnlock={handleRequestAdminUnlock}
          />
        )}

        {activeTab === 'funds-donors' && (
          <FundsAndDonorsTracker 
            language={language} 
            isAdmin={isAdmin} 
            onRequestAdminUnlock={handleRequestAdminUnlock}
          />
        )}

        {activeTab === 'karakari' && (
          <KarakariCabinetTracker 
            language={language} 
            isAdmin={isAdmin} 
            onRequestAdminUnlock={handleRequestAdminUnlock}
          />
        )}

        {activeTab === 'volunteers' && (
          <VolunteerPortal 
            language={language} 
            isAdmin={isAdmin} 
            onRequestAdminUnlock={handleRequestAdminUnlock}
          />
        )}

        {activeTab === 'water-supply' && (
          <WaterSupplyTracker 
            language={language} 
            isAdmin={isAdmin} 
            onRequestAdminUnlock={handleRequestAdminUnlock}
          />
        )}

        {activeTab === 'zero-cost-houses' && (
          <HouseConstructionTracker 
            language={language} 
            isAdmin={isAdmin} 
            onRequestAdminUnlock={handleRequestAdminUnlock}
          />
        )}

        {activeTab === 'smart-rashan' && (
          <RashanDistributionTracker 
            language={language} 
            isAdmin={isAdmin} 
            onRequestAdminUnlock={handleRequestAdminUnlock}
          />
        )}

        {activeTab === 'solar-aid' && (
          <SolarCommunityTracker 
            language={language} 
            isAdmin={isAdmin} 
            onRequestAdminUnlock={handleRequestAdminUnlock}
          />
        )}

        {activeTab === 'transparency' && (
          <TransparencyReport language={language} />
        )}
      </main>

      {/* Admin Verification Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        language={language}
      />

      {/* Assistance Request Modal */}
      <AssistanceRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmitSuccess={handleNewAssistanceRequest}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
            {/* NGO Brand Summary */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-6 h-6 text-emerald-400" />
                <span className="font-bold text-white text-base">{NGO_INFO.name}</span>
              </div>
              <p className="text-emerald-400 font-urdu text-sm font-semibold">
                {NGO_INFO.nameUrdu} — {NGO_INFO.mottoEn} ({NGO_INFO.mottoUrdu})
              </p>
              <p className="text-slate-400 leading-relaxed text-xs">
                A community-driven welfare NGO founded on January 11, 2025, at {NGO_INFO.location}. Operating on a 100% zero-labor-cost model for widows, orphans, and water supply lines.
              </p>
            </div>

            {/* Core Operation Units */}
            <div className="space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-white text-xs">Core Areas of Operation</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li className="hover:text-emerald-400 cursor-pointer" onClick={() => setActiveTab('cabinet-members')}>Executive Cabinet Directory</li>
                <li className="hover:text-emerald-400 cursor-pointer" onClick={() => setActiveTab('daily-activities')}>Daily Field Progress & Activity Log</li>
                <li className="hover:text-emerald-400 cursor-pointer" onClick={() => setActiveTab('funds-donors')}>Donor Accounts & Funds Raising Ledger</li>
                <li className="hover:text-emerald-400 cursor-pointer" onClick={() => setActiveTab('karakari')}>Karakari Community Utility & Event Cabinet</li>
                <li className="hover:text-emerald-400 cursor-pointer" onClick={() => setActiveTab('water-supply')}>Water Supply Line Infrastructure</li>
                <li className="hover:text-emerald-400 cursor-pointer" onClick={() => setActiveTab('zero-cost-houses')}>Zero-Cost Volunteer House Construction</li>
                <li className="hover:text-emerald-400 cursor-pointer" onClick={() => setActiveTab('smart-rashan')}>Smart Rashan & Resource Distribution</li>
                <li className="hover:text-emerald-400 cursor-pointer" onClick={() => setActiveTab('solar-aid')}>Solar Aid & Community Pathways</li>
              </ul>
            </div>

            {/* Organizational Leadership & Contact */}
            <div className="space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-white text-xs">NGO Leadership & Base</h4>
              <div className="space-y-1.5 text-xs">
                <p><strong>President:</strong> {NGO_INFO.presidentName}</p>
                <p><strong>Founding Authority:</strong> {NGO_INFO.foundingCouncil}</p>
                <p><strong>Volunteer Developer:</strong> {NGO_INFO.developerName}</p>
                <p className="flex items-center gap-1 text-slate-400 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{NGO_INFO.location}</span>
                </p>
                <p className="text-slate-500">Established: {NGO_INFO.foundedDate}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-[11px]">
            <p>© 2025 - 2026 {NGO_INFO.name}. All Rights Reserved.</p>
            <p className="flex items-center gap-1">
              <span>Built for Shishi, Lower Chitral with</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>and Volunteer Passion</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
