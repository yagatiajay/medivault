// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Medications from './pages/Medications';
import Schedule from './pages/Schedule';
import Prescriptions from './pages/Prescriptions';
import History from './pages/History';
import Reminders from './pages/Reminders';
import FamilyProfiles from './pages/FamilyProfiles';
import Settings from './pages/Settings';
import LandingPage from './pages/LandingPage';
import AuthModal from './components/AuthModal';
import AddMedicationModal from './components/AddMedicationModal';
import GlobalSearchModal from './components/GlobalSearchModal';
import NotificationsModal from './components/NotificationsModal';
import EmergencyCardModal from './components/EmergencyCardModal';
import { initialProfile, fallbackDoses } from './data/mockData';
import { addMedication } from './services/api';
import { getStoredData, setStoredData } from './utils/storage';
import './App.css';

export default function App() {
  // Authentication & Guest State
  const [isAuthenticated, setIsAuthenticated] = useState(() => getStoredData('isAuthenticated', true));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');

  // Navigation & Profile State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(() => getStoredData('userProfile', initialProfile));

  // Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isEmergencyCardOpen, setIsEmergencyCardOpen] = useState(false);

  // Global Keyboard Shortcut: ⌘K or Ctrl+K to toggle Omnisearch
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update profile handler with storage persistence
  const handleUpdateProfile = (updated) => {
    setUserProfile(updated);
    setStoredData('userProfile', updated);
  };

  // Called when user clicks "Save Medication" in the modal
  const handleSaveMedication = async (newMedData) => {
    await addMedication(newMedData);
    alert(`Successfully added ${newMedData.name}!`);
    setIsAddModalOpen(false);
  };

  // Sign out handler
  const handleSignOut = () => {
    if (confirm('Sign out of your MediVault session?')) {
      setIsAuthenticated(false);
      setStoredData('isAuthenticated', false);
    }
  };

  // Login handler
  const handleLoginSuccess = (userData) => {
    handleUpdateProfile(userData);
    setIsAuthenticated(true);
    setStoredData('isAuthenticated', true);
  };

  // If not authenticated, render Public Landing Page
  if (!isAuthenticated) {
    return (
      <>
        <LandingPage
          onOpenAuth={(mode) => {
            setAuthMode(mode);
            setIsAuthModalOpen(true);
          }}
          onLaunchDemo={() => {
            setIsAuthenticated(true);
            setStoredData('isAuthenticated', true);
          }}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          initialMode={authMode}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </>
    );
  }

  return (
    <div className="app-container">
      {/* Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        userProfile={userProfile}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Topbar
          userProfile={userProfile}
          activeProfileName={userProfile?.name ? `${userProfile.name} (${userProfile.relationship || 'Me'})` : 'Sarah Jenkins (Me)'}
          onToggleMobileSidebar={() => setIsMobileOpen(!isMobileOpen)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotifOpen(true)}
          onOpenEmergencyCard={() => setIsEmergencyCardOpen(true)}
        />

        <main>
          {activeTab === 'dashboard' && (
            <Dashboard
              userProfile={userProfile}
              onNavigate={(tab) => {
                if (tab === 'add-medication') setIsAddModalOpen(true);
                else setActiveTab(tab);
              }}
            />
          )}

          {activeTab === 'medications' && (
            <Medications
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          )}

          {activeTab === 'schedule' && (
            <Schedule onNavigate={(tab) => setActiveTab(tab)} />
          )}

          {activeTab === 'prescriptions' && (
            <Prescriptions />
          )}

          {activeTab === 'history' && (
            <History />
          )}

          {activeTab === 'reminders' && (
            <Reminders />
          )}

          {activeTab === 'family' && (
            <FamilyProfiles
              currentProfile={userProfile}
              onSwitchProfile={(newProf) => {
                handleUpdateProfile(newProf);
                alert(`Switched active vault to ${newProf.name}!`);
              }}
            />
          )}

          {activeTab === 'settings' && (
            <Settings
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {/* Fallback for unrecognized tab */}
          {!['dashboard', 'medications', 'schedule', 'prescriptions', 'history', 'reminders', 'family', 'settings'].includes(activeTab) && (
            <div className="content-body">
              <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--primary)', marginBottom: '16px' }}>
                  construction
                </span>
                <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '22px', marginBottom: '8px' }}>
                  {activeTab.toUpperCase()} View
                </h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 20px' }}>
                  This view is not registered yet.
                </p>
                <button className="btn btn-primary" onClick={() => setActiveTab('dashboard')}>
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Medication Modal */}
      <AddMedicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveMedication}
      />

      {/* Global Omni-Search Modal (⌘K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          setIsSearchOpen(false);
        }}
      />

      {/* Notifications Drawer */}
      <NotificationsModal
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          setIsNotifOpen(false);
        }}
      />

      {/* Emergency Medical Wallet Card Modal */}
      <EmergencyCardModal
        isOpen={isEmergencyCardOpen}
        onClose={() => setIsEmergencyCardOpen(false)}
        userProfile={userProfile}
        medications={fallbackDoses.map(d => ({
          name: d.medication?.name || "Medication",
          dosage: d.dosage || "Prescribed",
          instructions: d.instructions || "Follow directions"
        }))}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
