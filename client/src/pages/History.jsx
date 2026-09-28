// client/src/pages/History.jsx
import React, { useState } from 'react';
import AdvisoryBanner from '../components/AdvisoryBanner';
import { initialHistoryLogs } from '../data/mockData';
import { getStoredData, setStoredData } from '../utils/storage';

export default function History() {
    const [logs, setLogs] = useState(() => getStoredData('historyLogs', initialHistoryLogs));

    const handleDeleteLog = (id) => {
        setLogs((prev) => {
            const updated = prev.filter(l => l.id !== id);
            setStoredData('historyLogs', updated);
            return updated;
        });
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'taken' | 'skipped' | 'missed'

    // Filter logs by search and status
    const filteredLogs = logs.filter((log) => {
        const matchesSearch =
            log.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.notes?.toLowerCase().includes(searchTerm.toLowerCase());

        if (statusFilter === 'all') return matchesSearch;
        return matchesSearch && log.status.toLowerCase() === statusFilter.toLowerCase();
    });

    // Calculate summary metrics on the fly
    const totalCount = logs.length;
    const takenCount = logs.filter((l) => l.status.toLowerCase() === 'taken').length;
    const skippedCount = logs.filter((l) => l.status.toLowerCase() === 'skipped').length;
    const missedCount = logs.filter((l) => l.status.toLowerCase() === 'missed').length;

    // 💡 Real CSV Export in pure JavaScript!
    const handleExportCSV = () => {
        // 1. Build CSV content headers and rows
        const headers = ['Date', 'Time', 'Medication', 'Dosage', 'Doctor', 'Status', 'Notes'];
        const rows = filteredLogs.map((l) => [
            `"${l.date}"`,
            `"${l.time}"`,
            `"${l.medication}"`,
            `"${l.dosage}"`,
            `"${l.doctor}"`,
            `"${l.status}"`,
            `"${l.notes || ''}"`,
        ]);

        const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

        // 2. Create a Blob (Binary Large Object)
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // 3. Trigger download via a temporary invisible anchor tag
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `medivault_history_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Group filtered items by date header ("Today", "Yesterday", etc.)
    const groupedByDate = filteredLogs.reduce((groups, item) => {
        const dateKey = item.date;
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(item);
        return groups;
    }, {});

    return (
        <div className="content-body">
            <AdvisoryBanner />

            {/* Header Banner */}
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>verified</span>
                        <span>VERIFIED PERSONAL HEALTH ARCHIVE</span>
                    </div>
                    <h1>Medication History</h1>
                    <p>Comprehensive personal timeline and audit record of logged, skipped, and snoozed doses.</p>
                </div>

                <button className="btn btn-primary" onClick={handleExportCSV}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
                    Export History (CSV)
                </button>
            </div>

            {/* 4 Summary Metric Cards */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-card-top">
                        <span>Total Events</span>
                        <div className="metric-card-icon" style={{ background: 'var(--surface-low)', color: 'var(--primary)' }}>
                            <span className="material-symbols-outlined">history</span>
                        </div>
                    </div>
                    <div className="metric-card-val">{totalCount} Logged</div>
                    <div className="metric-card-sub">Recorded dose occurrences</div>
                </div>

                <div className="metric-card">
                    <div className="metric-card-top">
                        <span>Taken / Logged</span>
                        <span className="badge badge-taken">{totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0}%</span>
                    </div>
                    <div className="metric-card-val">{takenCount} Doses</div>
                    <div className="metric-card-sub">Administered on schedule</div>
                </div>

                <div className="metric-card">
                    <div className="metric-card-top">
                        <span>Skipped</span>
                        <div className="metric-card-icon" style={{ background: 'var(--status-skipped-bg)', color: 'var(--status-skipped-text)' }}>
                            <span className="material-symbols-outlined">redo</span>
                        </div>
                    </div>
                    <div className="metric-card-val">{skippedCount} Doses</div>
                    <div className="metric-card-sub">User deferred intentionally</div>
                </div>

                <div className="metric-card">
                    <div className="metric-card-top">
                        <span>Missed</span>
                        <div className="metric-card-icon" style={{ background: 'var(--status-missed-bg)', color: 'var(--status-missed-text)' }}>
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                    </div>
                    <div className="metric-card-val">{missedCount} Doses</div>
                    <div className="metric-card-sub">Past due windows</div>
                </div>
            </div>

            {/* Search & Filter Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div className="topbar-search" style={{ width: '340px' }}>
                    <span className="material-symbols-outlined search-icon">search</span>
                    <input
                        type="search"
                        placeholder="Search by medicine, doctor, notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    {['all', 'taken', 'skipped', 'missed'].map((status) => (
                        <button
                            key={status}
                            className={`btn btn-sm ${statusFilter === status ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setStatusFilter(status)}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chronological Stream Grouped by Date */}
            {Object.keys(groupedByDate).length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    {Object.entries(groupedByDate).map(([dateGroup, items]) => (
                        <div key={dateGroup} className="card" style={{ padding: '20px 24px' }}>
                            {/* Date Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '14px' }}>
                                <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '16px', color: 'var(--primary)', margin: 0 }}>
                                    📅 {dateGroup}
                                </h3>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                    {items.length} {items.length === 1 ? 'event' : 'events'}
                                </span>
                            </div>

                            {/* Items for this date */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {items.map((log) => {
                                    const isTaken = log.status.toLowerCase() === 'taken';
                                    const isSkipped = log.status.toLowerCase() === 'skipped';
                                    const isMissed = log.status.toLowerCase() === 'missed';

                                    return (
                                        <div key={log.id} className="timeline-item" style={{ boxShadow: 'none', background: 'var(--surface-low)', border: '1px solid var(--border-light)' }}>
                                            <div className="timeline-time-block">
                                                <div className="time-badge">{log.time}</div>
                                                <div className="med-info">
                                                    <h4>{log.medication}</h4>
                                                    <p>{log.dosage} • 👨‍⚕️ {log.doctor}</p>
                                                    {log.notes && (
                                                        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                                            💬 <em>"{log.notes}"</em>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="timeline-actions" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <span className={`badge ${isTaken ? 'badge-taken' : isSkipped ? 'badge-skipped' : isMissed ? 'badge-missed' : 'badge-upcoming'
                                                    }`}>
                                                    {log.status}
                                                </span>
                                                <button className="icon-btn" onClick={() => handleDeleteLog(log.id)} title="Delete log entry" style={{ color: "var(--text-muted)" }}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--text-muted)' }}>
                        history
                    </span>
                    <h3 style={{ marginTop: '12px', color: 'var(--text-main)' }}>No history entries found</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Adjust your filters or search terms.</p>
                </div>
            )}
        </div>
    );
}
