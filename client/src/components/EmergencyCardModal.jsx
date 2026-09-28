// client/src/components/EmergencyCardModal.jsx
import React from 'react';

export default function EmergencyCardModal({ isOpen, onClose, userProfile, medications = [] }) {
    if (!isOpen) return null;

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadJson = () => {
        const payload = {
            cardType: "MediVault Emergency Medical Info",
            generatedAt: new Date().toISOString(),
            patient: {
                name: userProfile?.name || "Sarah Jenkins",
                dob: "1988-10-14",
                bloodType: "A+",
                allergies: ["Penicillin", "Sulfa Drugs"],
                emergencyContact: {
                    name: "Arthur Jenkins",
                    relation: "Spouse",
                    phone: "(555) 234-5678"
                }
            },
            physicians: [
                { name: "Dr. Evelyn Reed", specialty: "Cardiology", phone: "(555) 345-6789" },
                { name: "Dr. Marcus Vance", specialty: "Internal Medicine", phone: "(555) 456-7890" }
            ],
            medications: medications.length > 0 ? medications : [
                { name: "Atorvastatin", dosage: "20 mg", instructions: "Daily evening with dinner" },
                { name: "Metformin", dosage: "500 mg", instructions: "Daily morning with food" },
                { name: "Lisinopril", dosage: "10 mg", instructions: "Daily afternoon" }
            ]
        };

        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `MediVault_Emergency_Card_${(userProfile?.name || 'patient').replace(/\s+/g, '_')}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '680px', padding: '0', overflow: 'hidden' }}
            >
                {/* Header */}
                <div className="no-print" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="material-symbols-outlined" style={{ color: '#dc2626', fontSize: '24px' }}>medical_services</span>
                        <h3 style={{ margin: 0, fontFamily: 'var(--font-headline)', fontSize: '18px', color: 'var(--text-main)' }}>
                            Emergency Medical Wallet Card
                        </h3>
                    </div>
                    <button className="icon-btn" onClick={onClose} title="Close">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Printable Card Container */}
                <div style={{ padding: '24px', maxHeight: '520px', overflowY: 'auto' }}>
                    <div className="printable-emergency-card">
                        {/* Red Top Bar */}
                        <div style={{ background: '#b91c1c', color: '#fff', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '8px 8px 0 0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>emergency</span>
                                <strong style={{ fontSize: '14px', letterSpacing: '0.5px' }}>EMERGENCY MEDICAL INFORMATION</strong>
                            </div>
                            <span style={{ fontSize: '11px', opacity: 0.9 }}>MediVault Safe Records</span>
                        </div>

                        {/* Card Body */}
                        <div style={{ border: '2px solid #b91c1c', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '18px', background: '#fff' }}>
                            {/* Row 1: Patient Basics */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', paddingBottom: '14px', borderBottom: '1px dashed #cbd5e1' }}>
                                <div>
                                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Patient Full Name</span>
                                    <h4 style={{ margin: '2px 0 0 0', fontSize: '16px', color: '#0f172a' }}>{userProfile?.name || "Sarah Jenkins"}</h4>
                                </div>
                                <div>
                                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Blood Type</span>
                                    <h4 style={{ margin: '2px 0 0 0', fontSize: '16px', color: '#b91c1c' }}>A-Positive (A+)</h4>
                                </div>
                                <div>
                                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Date of Birth</span>
                                    <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#1e293b' }}>Oct 14, 1988</p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Known Allergies</span>
                                    <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#b91c1c', fontWeight: 600 }}>Penicillin, Sulfa</p>
                                </div>
                            </div>

                            {/* Row 2: Emergency Contact & Doctor */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '12px 0', borderBottom: '1px dashed #cbd5e1' }}>
                                <div>
                                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Primary Emergency Contact</span>
                                    <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#0f172a' }}>
                                        <strong>Arthur Jenkins</strong> (Spouse)<br />
                                        Phone: <a href="tel:5552345678" style={{ color: 'var(--primary)', textDecoration: 'none' }}>(555) 234-5678</a>
                                    </p>
                                </div>
                                <div>
                                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>Primary Physician</span>
                                    <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#0f172a' }}>
                                        <strong>Dr. Evelyn Reed</strong> (Cardiology)<br />
                                        Clinic: Metro Health • Phone: (555) 345-6789
                                    </p>
                                </div>
                            </div>

                            {/* Row 3: Active Regimen */}
                            <div style={{ paddingTop: '12px' }}>
                                <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                                    Current Prescribed Regimen
                                </span>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>
                                            <th style={{ padding: '6px 8px' }}>Medication</th>
                                            <th style={{ padding: '6px 8px' }}>Dosage</th>
                                            <th style={{ padding: '6px 8px' }}>Directions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '6px 8px', fontWeight: 600 }}>Atorvastatin</td>
                                            <td style={{ padding: '6px 8px' }}>20 mg</td>
                                            <td style={{ padding: '6px 8px', color: '#475569' }}>1 tablet daily with dinner</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '6px 8px', fontWeight: 600 }}>Metformin</td>
                                            <td style={{ padding: '6px 8px' }}>500 mg</td>
                                            <td style={{ padding: '6px 8px', color: '#475569' }}>1 tablet daily with morning meal</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '6px 8px', fontWeight: 600 }}>Lisinopril</td>
                                            <td style={{ padding: '6px 8px' }}>10 mg</td>
                                            <td style={{ padding: '6px 8px', color: '#475569' }}>1 tablet daily in the afternoon</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Small Disclaimer */}
                            <p style={{ margin: '14px 0 0 0', fontSize: '10px', color: '#94a3b8', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                                Notice: MediVault is an informational personal organizer. In any acute medical emergency, contact 911 or visit the nearest emergency room immediately.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="no-print" style={{ padding: '14px 20px', background: 'var(--surface-low)', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        🖨️ Formatted to fold into standard wallet card size (3.5" × 2")
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-secondary" onClick={handleDownloadJson}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>code</span>
                            JSON
                        </button>
                        <button className="btn btn-primary" onClick={handlePrint} style={{ background: '#b91c1c', borderColor: '#b91c1c' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>print</span>
                            Print Card
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
