// client/src/pages/Schedule.jsx
import React, { useState } from 'react';
import AdvisoryBanner from '../components/AdvisoryBanner';
import { fallbackDoses } from '../data/mockData';

export default function Schedule({ onNavigate }) {
    const [viewMode, setViewMode] = useState('today'); // 'today' | 'week' | 'month'
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [doses, setDoses] = useState(fallbackDoses);

    // Navigate date: -1 for previous day, +1 for next day
    const changeDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
    };

    // Group doses into morning, afternoon, and evening/night routines
    const morningDoses = doses.filter((d) => {
        const hour = parseInt(d.time?.split(':')[0] || '8', 10);
        const isAM = d.time?.includes('AM') ?? true;
        return isAM && hour >= 6 && hour < 12;
    });

    const afternoonDoses = doses.filter((d) => {
        const hour = parseInt(d.time?.split(':')[0] || '1', 10);
        const isPM = d.time?.includes('PM') ?? false;
        return isPM && (hour === 12 || (hour >= 1 && hour < 6));
    });

    const eveningDoses = doses.filter((d) => {
        const hour = parseInt(d.time?.split(':')[0] || '8', 10);
        const isPM = d.time?.includes('PM') ?? false;
        return isPM && hour >= 6;
    });

    // Action to toggle taken / skipped
    const handleToggleStatus = (id, newStatus) => {
        setDoses((prev) =>
            prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
        );
    };

    return (
        <div className="content-body">
            <AdvisoryBanner />

            {/* Header & View Switcher */}
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>
                        <span>CHRONOLOGICAL REGIMEN</span>
                    </div>
                    <h1>Daily Schedule</h1>
                    <p>Track your personal daily dosage timing and adherence events.</p>
                </div>

                {/* View Switcher: Today / Week / Month */}
                <div style={{ display: 'flex', background: 'var(--surface-low)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    {['today', 'week', 'month'].map((mode) => (
                        <button
                            key={mode}
                            className={`btn btn-sm ${viewMode === mode ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setViewMode(mode)}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {mode}
                        </button>
                    ))}
                </div>
            </div>

            {/* Date Navigation Bar */}
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button className="icon-btn" onClick={() => changeDate(-1)} title="Previous Day">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>

                    <span style={{ fontFamily: 'var(--font-headline)', fontSize: '16px', fontWeight: 600, color: 'var(--text-main)', minWidth: '220px', textAlign: 'center' }}>
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>

                    <button className="icon-btn" onClick={() => changeDate(1)} title="Next Day">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => setSelectedDate(new Date())}>
                        Today
                    </button>
                    <button className="btn btn-sm btn-primary" onClick={() => onNavigate('medications')}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                        Log Dose
                    </button>
                </div>
            </div>

            {/* Status Color Legend */}
            <div style={{ display: 'flex', gap: '16px', padding: '10px 16px', background: 'var(--surface-low)', borderRadius: 'var(--radius-md)', flexWrap: 'wrap', fontSize: '12px' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Status Codes:</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-taken-icon)' }}></span>
                    Taken / Logged
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-upcoming-icon)' }}></span>
                    Upcoming Scheduled
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--status-skipped-icon)' }}></span>
                    Skipped by User
                </span>
            </div>

            {/* Main Schedule Routines Layout */}
            <div className="dashboard-layout">
                {/* Left Column: Routine Segments */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* 1. Morning Routine */}
                    <RoutineSection
                        title="Morning Routine"
                        timeWindow="07:00 AM – 11:00 AM"
                        icon="wb_twilight"
                        doses={morningDoses}
                        onToggleStatus={handleToggleStatus}
                    />

                    {/* 2. Afternoon Routine */}
                    <RoutineSection
                        title="Afternoon Routine"
                        timeWindow="12:00 PM – 04:00 PM"
                        icon="light_mode"
                        doses={afternoonDoses}
                        onToggleStatus={handleToggleStatus}
                    />

                    {/* 3. Evening & Night Routine */}
                    <RoutineSection
                        title="Evening & Night Routine"
                        timeWindow="06:00 PM – 10:00 PM"
                        icon="bedtime"
                        doses={eveningDoses}
                        onToggleStatus={handleToggleStatus}
                    />
                </div>

                {/* Right Column: Adherence Insights Widget */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {/* Adherence Streak Card */}
                    <div className="card" style={{ background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-low) 100%)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '28px', color: 'var(--primary)' }}>
                                verified
                            </span>
                            <div>
                                <h4 style={{ margin: 0, fontFamily: 'var(--font-headline)', fontSize: '15px' }}>Daily Adherence Streak</h4>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Personal tracking only</span>
                            </div>
                        </div>

                        <div style={{ fontSize: '32px', fontFamily: 'var(--font-headline)', fontWeight: 700, color: 'var(--primary)', margin: '6px 0' }}>
                            5 Days
                        </div>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                            You've logged all scheduled morning doses on time for 5 consecutive days.
                        </p>
                    </div>

                    {/* Timing Note Card */}
                    <div className="card">
                        <h4 style={{ margin: '0 0 8px 0', fontFamily: 'var(--font-headline)', fontSize: '14px', color: 'var(--text-main)' }}>
                            🕒 Need Schedule Changes?
                        </h4>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                            Remember to consult your prescribing doctor or pharmacist before making adjustments to dose frequency or timings.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-component for an individual Routine Section (Morning, Afternoon, Evening)
function RoutineSection({ title, timeWindow, icon, doses, onToggleStatus }) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{icon}</span>
                    <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '16px', color: 'var(--text-main)', margin: 0 }}>
                        {title}
                    </h3>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', background: 'var(--surface-low)', padding: '2px 8px', borderRadius: 'var(--radius-pill)' }}>
                    {timeWindow}
                </span>
            </div>

            {doses.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {doses.map((dose) => {
                        const medName = dose.medication?.name || dose.medicationName || 'Medication';
                        const isTaken = dose.status?.toLowerCase() === 'taken';

                        return (
                            <div key={dose.id} className="timeline-item">
                                <div className="timeline-time-block">
                                    <div className="time-badge">{dose.time}</div>
                                    <div className="med-info">
                                        <h4>{medName}</h4>
                                        <p>{dose.dosage || dose.medication?.dosage} • {dose.instructions}</p>
                                    </div>
                                </div>

                                <div className="timeline-actions">
                                    <span className={`badge ${isTaken ? 'badge-taken' : 'badge-upcoming'}`}>
                                        {dose.status}
                                    </span>

                                    {!isTaken && (
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={() => onToggleStatus(dose.id, 'Taken')}
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check</span>
                                            Mark Taken
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div style={{ padding: '16px', background: 'var(--surface)', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-md)', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                    No doses scheduled during this routine window.
                </div>
            )}
        </div>
    );
}