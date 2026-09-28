// client/src/components/MedicationCard.jsx
import React from 'react';

export default function MedicationCard({ medication, onEdit, onArchive }) {
    const isActive = medication.status?.toLowerCase() === 'active';

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', color: 'var(--text-main)', margin: 0 }}>
                        {medication.name}
                    </h3>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--primary)' }}>
                        {medication.dosage} • {medication.form || '1 tablet'}
                    </span>
                </div>

                <span className={`badge ${isActive ? 'badge-taken' : 'badge-skipped'}`}>
                    {medication.status || 'Active'}
                </span>
            </div>

            {/* Instructions & Schedule info */}
            <div style={{ background: 'var(--surface-low)', padding: '10px 12px', borderRadius: 'var(--radius-md)' }}>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <strong>Directions:</strong> {medication.instructions || 'Take as instructed by physician'}
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: 'var(--text-muted)' }}>
                    🕒 {medication.frequency || 'Once Daily'} at {medication.scheduledTime || '08:00 AM'}
                </p>
            </div>

            {/* Doctor & Date Metadata */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>👨‍⚕️ {medication.prescribingDoctor || 'Prescribing Doctor'}</span>
                <span>Started: {new Date(medication.startDate).toLocaleDateString()}</span>
            </div>

            {/* Card Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                <button
                    className="btn btn-sm btn-secondary"
                    style={{ flex: 1 }}
                    onClick={() => onEdit(medication)}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
                    Edit
                </button>

                <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => onArchive(medication.id)}
                    title="Archive Medication"
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>archive</span>
                </button>
            </div>
        </div>
    );
}
