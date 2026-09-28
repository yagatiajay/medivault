// client/src/pages/Settings.jsx
import React, { useState } from 'react';
import AdvisoryBanner from '../components/AdvisoryBanner';

export default function Settings({ userProfile, onUpdateProfile }) {
    const [activeSection, setActiveSection] = useState('account'); // 'account' | 'notifications' | 'security' | 'data'

    // Account State
    const [name, setName] = useState(userProfile?.name || 'Sarah Jenkins');
    const [email, setEmail] = useState(userProfile?.email || 'sarah.j@example.com');
    const [dob, setDob] = useState('1990-05-14');

    // Notifications State
    const [notifPreferences, setNotifPreferences] = useState({
        doseReminders: true,
        refillWarnings: true,
        weeklySummary: false,
        pushAlerts: true,
        emailAlerts: true,
    });

    // Active Sessions Mock Data
    const [sessions, setSessions] = useState([
        { id: 'sess-1', device: 'Chrome on macOS (Current)', ip: '192.168.1.42', lastActive: 'Active now', current: true },
        { id: 'sess-2', device: 'Safari on iPhone 15 Pro', ip: '172.56.21.9', lastActive: '2 hours ago', current: false },
    ]);

    const toggleNotif = (key) => {
        setNotifPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        onUpdateProfile({
            ...userProfile,
            name,
            email,
            initials: name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2),
        });
        alert('Account profile updated successfully!');
    };

    const handleRevokeSession = (id) => {
        setSessions((prev) => prev.filter((s) => s.id !== id));
        alert('Device logged out.');
    };

    // Full Personal Health Archive JSON Export
    const handleExportAllData = () => {
        const fullArchive = {
            archiveDate: new Date().toISOString(),
            user: { name, email, dob },
            notificationPreferences: notifPreferences,
            regulatoryNotice: "MediVault personal informational health archive. Not for diagnostic use.",
        };

        const blob = new Blob([JSON.stringify(fullArchive, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `medivault_backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="content-body">
            <AdvisoryBanner />

            {/* Header */}
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>tune</span>
                        <span>SYSTEM PREFERENCES & AUDIT</span>
                    </div>
                    <h1>Settings & Privacy</h1>
                    <p>Manage your personal account profile, notifications, encrypted vault security, and data exports.</p>
                </div>
            </div>

            {/* Settings Grid (Sidebar Menu + Detail Card) */}
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'start' }}>

                {/* Settings Navigation Menu */}
                <div className="card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {[
                        { id: 'account', label: 'Account Profile', icon: 'person' },
                        { id: 'notifications', label: 'Notification Alerts', icon: 'notifications' },
                        { id: 'security', label: 'Security & Sessions', icon: 'shield' },
                        { id: 'data', label: 'Data Management', icon: 'database' },
                    ].map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                style={{ width: '100%', textAlign: 'left', border: 'none' }}
                                onClick={() => setActiveSection(item.id)}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Section 1: Account Profile */}
                {activeSection === 'account' && (
                    <div className="card" style={{ padding: '24px' }}>
                        <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                            Account Profile
                        </h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
                            Your basic contact details used for notifications and profile display.
                        </p>

                        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                            </div>

                            <div className="form-group" style={{ maxWidth: '280px' }}>
                                <label className="form-label">Date of Birth (Optional)</label>
                                <input className="form-input" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                                <button className="btn btn-primary" type="submit">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Section 2: Notification Alerts */}
                {activeSection === 'notifications' && (
                    <div className="card" style={{ padding: '24px' }}>
                        <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                            Notification Preferences
                        </h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
                            Choose which reminders and communication channels are enabled.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { key: 'doseReminders', title: 'Medication Dose Reminders', desc: 'Alerts at your scheduled times (Morning, Afternoon, Evening).' },
                                { key: 'refillWarnings', title: 'Prescription Expiry Prompts', desc: 'Notifies you when an uploaded prescription reaches its end date.' },
                                { key: 'pushAlerts', title: 'Browser Push Notifications', desc: 'Receive real-time push banners on your desktop browser.' },
                                { key: 'emailAlerts', title: 'Email Summary Alerts', desc: 'Receive intake summaries and important reminders via email.' },
                            ].map((item) => (
                                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid var(--border-light)' }}>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--text-main)' }}>{item.title}</h4>
                                        <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>{item.desc}</p>
                                    </div>

                                    <button
                                        type="button"
                                        className={`btn btn-sm ${notifPreferences[item.key] ? 'btn-primary' : 'btn-secondary'}`}
                                        onClick={() => toggleNotif(item.key)}
                                    >
                                        {notifPreferences[item.key] ? 'Enabled' : 'Disabled'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Section 3: Security & Sessions */}
                {activeSection === 'security' && (
                    <div className="card" style={{ padding: '24px' }}>
                        <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                            Security & Active Devices
                        </h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
                            Review devices with access to your personal MediVault records.
                        </p>

                        {/* Encryption Statement */}
                        <div style={{ background: 'var(--surface-low)', padding: '14px', borderRadius: 'var(--radius-md)', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--primary)' }}>lock</span>
                            <div>
                                <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>Encrypted Personal Vault</strong>
                                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                                    Your prescription files and personal logs are stored securely with restricted access controls.
                                </p>
                            </div>
                        </div>

                        {/* Sessions List */}
                        <h4 style={{ fontSize: '14px', color: 'var(--text-main)', marginBottom: '10px' }}>
                            Recognized Sessions ({sessions.length})
                        </h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {sessions.map((sess) => (
                                <div key={sess.id} className="timeline-item" style={{ boxShadow: 'none', background: 'var(--surface-low)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>devices</span>
                                        <div>
                                            <h4 style={{ margin: 0, fontSize: '13px' }}>{sess.device}</h4>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>IP: {sess.ip} • {sess.lastActive}</span>
                                        </div>
                                    </div>

                                    {!sess.current && (
                                        <button className="btn btn-sm btn-secondary" onClick={() => handleRevokeSession(sess.id)}>
                                            Log Out
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Section 4: Data Management & Export */}
                {activeSection === 'data' && (
                    <div className="card" style={{ padding: '24px' }}>
                        <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                            Data Governance & Export
                        </h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
                            Download your complete records archive or permanently delete your account.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Backup Card */}
                            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--text-main)' }}>Download Full Archive (JSON)</h4>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                                        Export all personal medications, dose histories, and profile settings to an offline file.
                                    </p>
                                </div>
                                <button className="btn btn-primary" onClick={handleExportAllData}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>download</span>
                                    Export Data
                                </button>
                            </div>

                            {/* Danger Zone: Delete Account */}
                            <div style={{ border: '1px solid #fecaca', background: '#fef2f2', borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '14px', color: '#991b1b' }}>Delete Account & Records</h4>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#b91c1c' }}>
                                        Permanently delete all medication data, prescriptions, and family profiles. This action cannot be undone.
                                    </p>
                                </div>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to permanently delete your MediVault account?')) {
                                            alert('Account deletion request initiated.');
                                        }
                                    }}
                                >
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
