import React from 'react';

export default function AdvisoryBanner() {
    return (
        <div className="advisory-banner">
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '20px' }}>
                shield_with_heart
            </span>
            <p style={{ margin: 0, flex: 1 }}>
                <strong>MediVault Regulatory Advisory:</strong> MediVault is a personal informational organizer and does not provide medical diagnosis, dosage adjustments, or treatment plans.
            </p>
        </div>
    );
}
