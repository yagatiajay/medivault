// client/src/components/Sidebar.jsx
import React from 'react';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'medications', label: 'Medications', icon: 'medication' },
    { id: 'schedule', label: 'Daily Schedule', icon: 'calendar_today' },
    { id: 'prescriptions', label: 'Prescriptions', icon: 'description' },
    { id: 'history', label: 'History & Logs', icon: 'history' },
    { id: 'reminders', label: 'Reminders', icon: 'notifications_active' },
    { id: 'family', label: 'Family Profiles', icon: 'diversity_1' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
];

export default function Sidebar({ activeTab, onSelectTab, userProfile, isMobileOpen, onCloseMobile, onSignOut }) {
    return (
        <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
            <div>
                {/* Brand Logo & Name */}
                <div className="sidebar-brand">
                    <div className="logo-icon">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
                            shield_with_heart
                        </span>
                    </div>
                    <div className="brand-text">
                        <h2>MediVault</h2>
                        <p>Personal Health Records</p>
                    </div>
                </div>

                {/* Primary Navigation */}
                <nav className="sidebar-nav">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => {
                                    onSelectTab(item.id);
                                    if (onCloseMobile) onCloseMobile();
                                }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Footer Profile & Regulatory Note */}
            <div className="sidebar-footer">
                <div className="user-profile-mini">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                        <div className="user-avatar">{userProfile?.initials || "SJ"}</div>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-main)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {userProfile?.name || "Sarah Jenkins"}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                {userProfile?.email || "sarah.j@example.com"}
                            </div>
                        </div>
                    </div>
                    <button 
                        className="icon-btn" 
                        title="Sign Out of Vault"
                        onClick={onSignOut}
                        style={{ color: '#ef4444' }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                            logout
                        </span>
                    </button>
                </div>

                <p className="disclaimer-micro">
                    MediVault does not provide medical advice. Personal records organizer only.
                </p>
            </div>
        </aside>
    );
}
