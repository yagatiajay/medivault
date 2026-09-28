// client/src/components/NotificationsModal.jsx
import React, { useState } from 'react';

const mockNotifications = [
    {
        id: 'notif-1',
        title: 'Morning Dose Reminder',
        message: 'Scheduled intake for Atorvastatin (20 mg) and Metformin (500 mg).',
        time: '15 mins ago',
        type: 'dose',
        read: false,
    },
    {
        id: 'notif-2',
        title: 'Prescription Refill Alert',
        message: 'Lisinopril has 1 refill remaining. Consider requesting renewal soon.',
        time: '2 hours ago',
        type: 'refill',
        read: false,
    },
    {
        id: 'notif-3',
        title: 'Vault Sync Complete',
        message: 'Your personal records are synchronized with local encrypted storage.',
        time: 'Yesterday',
        type: 'system',
        read: true,
    },
    {
        id: 'notif-4',
        title: 'Care Circle Update',
        message: 'Eleanor Jenkins vault was updated with new prescription records.',
        time: '2 days ago',
        type: 'family',
        read: true,
    }
];

export default function NotificationsModal({ isOpen, onClose, onNavigate }) {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [filter, setFilter] = useState('all');

    if (!isOpen) return null;

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleDismiss = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const filteredNotifs = notifications.filter(n => {
        if (filter === 'unread') return !n.read;
        if (filter === 'dose') return n.type === 'dose' || n.type === 'refill';
        return true;
    });

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className="modal-content" 
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '480px', padding: '0', overflow: 'hidden' }}
            >
                {/* Header */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>notifications</span>
                        <h3 style={{ margin: 0, fontFamily: 'var(--font-headline)', fontSize: '17px', color: 'var(--text-main)' }}>
                            Notifications & Reminders
                        </h3>
                        {unreadCount > 0 && (
                            <span className="badge badge-taken" style={{ fontSize: '11px', padding: '2px 8px' }}>
                                {unreadCount} new
                            </span>
                        )}
                    </div>
                    <button className="icon-btn" onClick={onClose} title="Close">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Filter Sub-header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', background: 'var(--surface-low)', borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setFilter('all')}
                            style={{ padding: '4px 10px', fontSize: '12px' }}
                        >
                            All
                        </button>
                        <button 
                            className={`btn btn-sm ${filter === 'unread' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setFilter('unread')}
                            style={{ padding: '4px 10px', fontSize: '12px' }}
                        >
                            Unread
                        </button>
                        <button 
                            className={`btn btn-sm ${filter === 'dose' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setFilter('dose')}
                            style={{ padding: '4px 10px', fontSize: '12px' }}
                        >
                            Dose Alerts
                        </button>
                    </div>

                    {unreadCount > 0 && (
                        <button 
                            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                            onClick={handleMarkAllRead}
                        >
                            Mark all read
                        </button>
                    )}
                </div>

                {/* List */}
                <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredNotifs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--text-muted)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '36px', color: 'var(--border-subtle)', marginBottom: '8px' }}>
                                check_circle
                            </span>
                            <p style={{ margin: 0, fontSize: '13px' }}>You are completely caught up!</p>
                        </div>
                    ) : (
                        filteredNotifs.map((item) => (
                            <div 
                                key={item.id}
                                style={{
                                    padding: '12px',
                                    borderRadius: 'var(--radius-md)',
                                    background: item.read ? 'transparent' : 'var(--primary-light)',
                                    border: '1px solid var(--border-light)',
                                    display: 'flex',
                                    gap: '12px',
                                    alignItems: 'flex-start',
                                    position: 'relative'
                                }}
                            >
                                <span 
                                    className="material-symbols-outlined" 
                                    style={{ 
                                        color: item.type === 'dose' ? 'var(--primary)' : item.type === 'refill' ? '#f59e0b' : 'var(--secondary)',
                                        fontSize: '20px',
                                        marginTop: '2px'
                                    }}
                                >
                                    {item.type === 'dose' ? 'alarm' : item.type === 'refill' ? 'medication' : 'info'}
                                </span>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h4 style={{ margin: 0, fontSize: '13px', color: 'var(--text-main)' }}>{item.title}</h4>
                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.time}</span>
                                    </div>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                                        {item.message}
                                    </p>
                                </div>

                                <button 
                                    className="icon-btn" 
                                    style={{ padding: '2px', width: '22px', height: '22px' }}
                                    onClick={() => handleDismiss(item.id)}
                                    title="Dismiss"
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div style={{ padding: '12px 16px', background: 'var(--surface-low)', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button 
                        className="btn btn-sm btn-secondary" 
                        onClick={() => {
                            onNavigate('reminders');
                            onClose();
                        }}
                    >
                        Manage Reminders
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
