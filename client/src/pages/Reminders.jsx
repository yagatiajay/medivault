// client/src/pages/Reminders.jsx
import React, { useState } from 'react';
import AdvisoryBanner from '../components/AdvisoryBanner';
import AddReminderModal from '../components/AddReminderModal';
import { initialRemindersList } from '../data/mockData';
import { getStoredData, setStoredData } from '../utils/storage';

export default function Reminders() {
    const [reminders, setReminders] = useState(() => getStoredData('reminders', initialRemindersList));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeAlert, setActiveAlert] = useState('Omega-3 Fish Oil (1000 mg) is due tonight at 08:00 PM.');

    // Toggle active/paused status
    const handleToggle = (id) => {
        setReminders((prev) => {
            const updated = prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r));
            setStoredData('reminders', updated);
            return updated;
        });
    };

    const handleDelete = (id) => {
        setReminders((prev) => {
            const updated = prev.filter((r) => r.id !== id);
            setStoredData('reminders', updated);
            return updated;
        });
    };

    const handleAdd = (newRem) => {
        setReminders((prev) => {
            const updated = [newRem, ...prev];
            setStoredData('reminders', updated);
            return updated;
        });
    };

    return (
        <div className="content-body">
            <AdvisoryBanner />

            {/* Live In-App Notification Alert Banner */}
            {activeAlert && (
                <div style={{
                    background: 'linear-gradient(90deg, #eff6ff 0%, #dbeafe 100%)',
                    border: '1px solid #bfdbfe',
                    borderRadius: 'var(--radius-lg)',
                    padding: '14px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: 'var(--shadow-card)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--secondary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>alarm</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--secondary)', fontWeight: 700 }}>
                                Next Scheduled Alert
                            </span>
                            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'var(--text-main)', fontWeight: 600 }}>
                                {activeAlert}
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                                alert('Simulated reminder snooze for 15 minutes.');
                                setActiveAlert(null);
                            }}
                        >
                            Snooze 15m
                        </button>
                        <button
                            className="icon-btn"
                            onClick={() => setActiveAlert(null)}
                            title="Dismiss notification"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>notifications_active</span>
                        <span>ALARM & NOTIFICATION DISPATCHER</span>
                    </div>
                    <h1>Reminders & Alarms</h1>
                    <p>Customize intake alerts across push notifications, in-app banners, and SMS digests.</p>
                </div>

                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_alarm</span>
                    New Reminder
                </button>
            </div>

            {/* Reminders List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {reminders.map((rem) => (
                    <div
                        key={rem.id}
                        className="card"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '18px 24px',
                            opacity: rem.enabled ? 1 : 0.65,
                            transition: 'all var(--transition-fast)',
                        }}
                    >
                        {/* Left: Time & Details */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: 'var(--radius-md)',
                                background: rem.enabled ? 'var(--primary-light)' : 'var(--surface-low)',
                                color: rem.enabled ? 'var(--primary)' : 'var(--text-muted)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>schedule</span>
                                <span style={{ fontSize: '11px', fontWeight: 700, marginTop: '2px' }}>
                                    {rem.time.split(' ')[0]}
                                </span>
                            </div>

                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <h3 style={{ margin: 0, fontFamily: 'var(--font-headline)', fontSize: '16px', color: 'var(--text-main)' }}>
                                        {rem.medication}
                                    </h3>
                                    <span className="badge badge-upcoming" style={{ fontSize: '11px' }}>
                                        {rem.frequency}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                                    <span>Channels: <strong>{rem.channels.join(', ')}</strong></span>
                                    <span>•</span>
                                    <span>Last triggered: {rem.lastTriggered}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Toggle Switch & Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <button
                                className={`btn btn-sm ${rem.enabled ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => handleToggle(rem.id)}
                            >
                                {rem.enabled ? 'Enabled' : 'Paused'}
                            </button>

                            <button
                                className="icon-btn"
                                onClick={() => handleDelete(rem.id)}
                                title="Delete reminder"
                                style={{ color: '#ef4444' }}
                            >
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Reminder Modal */}
            <AddReminderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAdd}
            />
        </div>
    );
}
