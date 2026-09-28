// client/src/components/Topbar.jsx
import React from 'react';

export default function Topbar({ 
    userProfile, 
    onToggleMobileSidebar, 
    activeProfileName, 
    onOpenSearch, 
    onOpenNotifications,
    onOpenEmergencyCard 
}) {
    return (
        <header className="topbar">
            {/* Mobile Toggle & Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                    className="icon-btn mobile-menu-btn"
                    onClick={onToggleMobileSidebar}
                    aria-label="Toggle menu"
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>

                <div className="topbar-search" onClick={onOpenSearch} style={{ cursor: 'pointer' }} title="Click or press ⌘K to search">
                    <span className="material-symbols-outlined search-icon">search</span>
                    <input
                        type="search"
                        placeholder="Search medications, prescriptions, logs..."
                        readOnly
                        onClick={onOpenSearch}
                        style={{ cursor: 'pointer' }}
                    />
                    <span className="shortcut-key">⌘K</span>
                </div>
            </div>

            {/* Active Profile Indicator & Actions */}
            <div className="topbar-actions">
                {/* Emergency Medical Card Button */}
                <button 
                    className="btn btn-sm" 
                    onClick={onOpenEmergencyCard}
                    title="Print or view Emergency Medical Wallet Card"
                    style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px' }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>medical_services</span>
                    <span style={{ fontSize: '11px', fontWeight: 700 }}>EMERGENCY CARD</span>
                </button>

                <div className="profile-pill" title="Current profile being viewed">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>
                        account_circle
                    </span>
                    <span style={{ color: 'var(--text-muted)' }}>Viewing:</span>
                    <strong style={{ color: 'var(--text-main)' }}>{activeProfileName}</strong>
                </div>

                <button className="icon-btn" title="Notifications" onClick={onOpenNotifications}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                        notifications
                    </span>
                    <span className="notification-badge"></span>
                </button>

                <div
                    className="user-avatar"
                    style={{ width: '32px', height: '32px', fontSize: '12px', background: 'var(--primary-light)', color: 'var(--primary)' }}
                >
                    {userProfile?.initials || "SJ"}
                </div>
            </div>
        </header>
    );
}
