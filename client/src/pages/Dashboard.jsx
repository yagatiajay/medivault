import React, { useEffect, useState } from 'react'
import { fallbackDoses, upcomingReminders, recentActivity } from '../data/mockData'
import { fetchTodayDoses, updateDoseStatus } from '../services/api';
import AdvisoryBanner from '../components/AdvisoryBanner';

export default function Dashboard({ userProfile, onNavigate }) {
    const [doses, setDoses] = useState(fallbackDoses);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDoses() {
            setLoading(true);
            const data = await fetchTodayDoses();
            if (data && Array.isArray(data) && data.length > 0) {
                setDoses(data);
            }
            setLoading(false);
        }
        loadDoses();
    }, []);
    const totalDoses = doses.length;
    const takenDoses = doses.filter((d) => d.status.toLowerCase() === 'taken').length;
    const upcomingDoses = doses.filter((d) => d.status.toLowerCase() === 'upcoming').length;
    const missedDoses = doses.filter((d) => d.status.toLowerCase() === 'missed').length;
    const percentTaken = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;

    const handleStatusChange = async (doseId, newStatus) => {
        setDoses((prevDoses) =>
            prevDoses.map((dose) =>
                dose.id === doseId ? { ...dose, status: newStatus } : dose
            )
        );
        await updateDoseStatus(doseId, newStatus);
    };
    return (
        <div className="content-body">
            <AdvisoryBanner />
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span className="badge badge-taken">Today's Overview</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>• {loading ? "Syncing..." : "Live Health Sync"}</span>
                    </div>
                    <h1>Good morning, {userProfile?.name?.split(' ')[0] || 'Sarah'}</h1>
                    <p>Here's your medication schedule and daily adherence overview for today.</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => onNavigate('medications')}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                    Add Medication
                </button>
            </div>
            {/* Summary Metrics Row (4 Cards) */}
            <div className="metrics-grid">
                {/* Card 1: Total Today */}
                <div className="metric-card">
                    <div className="metric-card-top">
                        <span>Today's Medications</span>
                        <div className="metric-card-icon" style={{ background: 'var(--surface-low)', color: 'var(--primary)' }}>
                            <span className="material-symbols-outlined">pill</span>
                        </div>
                    </div>
                    <div className="metric-card-val">
                        {totalDoses}
                        <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)' }}>scheduled</span>
                    </div>
                    <div className="metric-card-sub">All active routines today</div>
                </div>
                {/* Card 2: Taken with Progress Bar */}
                <div className="metric-card">
                    <div className="metric-card-top">
                        <span>Taken</span>
                        <span className="badge badge-taken">{percentTaken}% completed</span>
                    </div>
                    <div className="metric-card-val">
                        {takenDoses}
                        <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)' }}>of {totalDoses} taken</span>
                    </div>
                    <div className="progress-bar-track">
                        <div className="progress-bar-fill" style={{ width: `${percentTaken}%` }} />
                    </div>
                </div>
                {/* Card 3: Upcoming */}
                <div className="metric-card">
                    <div className="metric-card-top">
                        <span>Upcoming</span>
                        <div className="metric-card-icon" style={{ background: 'var(--status-upcoming-bg)', color: 'var(--status-upcoming-text)' }}>
                            <span className="material-symbols-outlined">schedule</span>
                        </div>
                    </div>
                    <div className="metric-card-val">
                        {upcomingDoses}
                        <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)' }}>remaining</span>
                    </div>
                    <div className="metric-card-sub" style={{ color: 'var(--secondary)' }}>
                        Next dose scheduled on time
                    </div>
                </div>
                {/* Card 4: Missed */}
                <div className="metric-card">
                    <div className="metric-card-top">
                        <span>Missed / Deferred</span>
                        <div className="metric-card-icon" style={{ background: 'var(--status-missed-bg)', color: 'var(--status-missed-text)' }}>
                            <span className="material-symbols-outlined">warning</span>
                        </div>
                    </div>
                    <div className="metric-card-val">
                        {missedDoses}
                        <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)' }}>doses</span>
                    </div>
                    <div className="metric-card-sub">No urgent alerts</div>
                </div>
            </div>
            {/* Main Two-Column Layout */}
            <div className="dashboard-layout">
                {/* Left Column: Today's Medication Timeline */}
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', color: 'var(--text-main)' }}>
                            Today's Medication Timeline
                        </h3>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                    </div>
                    <div className="timeline-list">
                        {doses.map((dose) => {
                            const medName = dose.medication?.name || dose.medicationName || 'Medication';
                            const isTaken = dose.status.toLowerCase() === 'taken';
                            const isUpcoming = dose.status.toLowerCase() === 'upcoming';
                            const isSkipped = dose.status.toLowerCase() === 'skipped';
                            return (
                                <div key={dose.id} className="timeline-item">
                                    <div className="timeline-time-block">
                                        <div className="time-badge">
                                            {dose.scheduledFor
                                                ? new Date(dose.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                : dose.time || 'Scheduled'}
                                        </div>
                                        <div className="med-info">
                                            <h4>{medName}</h4>
                                            <p>
                                                {dose.dosage || dose.medication?.dosage || 'Prescribed dose'} • {dose.instructions || dose.medication?.instructions || 'Follow doctor directions'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="timeline-actions">
                                        {/* Status Badge */}
                                        <span className={`badge ${isTaken ? 'badge-taken' : isUpcoming ? 'badge-upcoming' : isSkipped ? 'badge-skipped' : 'badge-missed'
                                            }`}>
                                            {dose.status}
                                        </span>
                                        {/* Action buttons only shown if upcoming */}
                                        {isUpcoming && (
                                            <div style={{ display: 'flex', gap: '6px', marginLeft: '10px' }}>
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => handleStatusChange(dose.id, 'Taken')}
                                                    title="Mark dose as taken"
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check</span>
                                                    Take
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() => handleStatusChange(dose.id, 'Skipped')}
                                                    title="Skip this dose"
                                                >
                                                    Skip
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* Right Column: Quick Actions & Widgets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Quick Actions Card */}
                    <div className="card">
                        <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '16px', color: 'var(--text-main)' }}>
                            Quick Actions
                        </h3>
                        <div className="quick-actions-grid">
                            <button className="quick-action-btn" onClick={() => onNavigate('medications')}>
                                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--primary)' }}>
                                    medication
                                </span>
                                <span>Add Medication</span>
                            </button>
                            <button className="quick-action-btn" onClick={() => onNavigate('prescriptions')}>
                                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--secondary)' }}>
                                    upload_file
                                </span>
                                <span>Upload Rx</span>
                            </button>
                            <button className="quick-action-btn" onClick={() => onNavigate('history')}>
                                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--primary)' }}>
                                    history
                                </span>
                                <span>View History</span>
                            </button>
                            <button className="quick-action-btn" onClick={() => onNavigate('reminders')}>
                                <span className="material-symbols-outlined" style={{ fontSize: '24px', color: 'var(--secondary)' }}>
                                    alarm
                                </span>
                                <span>Set Reminder</span>
                            </button>
                        </div>
                    </div>
                    {/* Upcoming Reminders Card */}
                    <div className="card">
                        <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '16px', color: 'var(--text-main)', marginBottom: '14px' }}>
                            Upcoming Reminders
                        </h3>
                        {upcomingReminders.map((rem) => (
                            <div key={rem.id} className="reminder-item">
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-main)' }}>{rem.title}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{rem.day}</div>
                                </div>
                                <span className="badge badge-upcoming">{rem.time}</span>
                            </div>
                        ))}
                    </div>
                    {/* Recent Activity Card */}
                    <div className="card">
                        <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '16px', color: 'var(--text-main)', marginBottom: '10px' }}>
                            Recent Activity
                        </h3>
                        {recentActivity.map((act) => (
                            <div key={act.id} className="activity-item">
                                <span className="activity-dot" />
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>{act.text}</p>
                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{act.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
