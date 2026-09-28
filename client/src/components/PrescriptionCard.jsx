// client/src/components/PrescriptionCard.jsx
import React from 'react';

export default function PrescriptionCard({ prescription, onView, onDelete }) {
    const isPdf = prescription.fileType?.toUpperCase() === 'PDF';

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Top Header: File Icon, Name, and Doctor */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-md)',
                        background: isPdf ? '#fee2e2' : '#e0f2fe',
                        color: isPdf ? '#ef4444' : '#0284c7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '11px',
                    }}>
                        {prescription.fileType || 'PDF'}
                    </div>

                    <div>
                        <h4 style={{ margin: 0, fontFamily: 'var(--font-headline)', fontSize: '15px', color: 'var(--text-main)' }}>
                            {prescription.doctorName}
                        </h4>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {prescription.clinic || 'Medical Clinic'}
                        </span>
                    </div>
                </div>

                {prescription.ocrVerified && (
                    <span className="badge badge-taken" title="OCR data verified against document">
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
                        Verified
                    </span>
                )}
            </div>

            {/* Medications Tagged */}
            <div style={{ background: 'var(--surface-low)', padding: '10px 12px', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Attached Medications ({prescription.medications?.length || 0}):
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                    {prescription.medications?.map((med, idx) => (
                        <span key={idx} className="badge badge-upcoming" style={{ fontSize: '11px' }}>
                            {med}
                        </span>
                    ))}
                </div>
            </div>

            {/* File Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>📄 {prescription.fileName} ({prescription.fileSize})</span>
                <span>Rx Date: {prescription.date}</span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                <button className="btn btn-sm btn-secondary" style={{ flex: 1 }} onClick={() => onView(prescription)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>visibility</span>
                    View Document
                </button>

                <button className="btn btn-sm btn-ghost" onClick={() => onDelete(prescription.id)} title="Delete Prescription">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--status-missed-text)' }}>delete</span>
                </button>
            </div>
        </div>
    );
}
