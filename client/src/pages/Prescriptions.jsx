// client/src/pages/Prescriptions.jsx
import React, { useState, useEffect } from 'react';
import AdvisoryBanner from '../components/AdvisoryBanner';
import PrescriptionCard from '../components/PrescriptionCard';
import UploadPrescriptionModal from '../components/UploadPrescriptionModal';
import { initialPrescriptions } from '../data/mockData';
import { getStoredData, setStoredData } from '../utils/storage';
import { getPrescriptions, addPrescription } from '../services/api';

export default function Prescriptions() {
    const [prescriptions, setPrescriptions] = useState(() => getStoredData('prescriptions', initialPrescriptions));
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all'); // 'all' | 'pdf' | 'jpg'
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    // Sync with PostgreSQL backend on mount
    useEffect(() => {
        async function syncBackend() {
            const live = await getPrescriptions();
            if (live && live.length > 0) {
                const formatted = live.map(l => ({
                    id: l.id,
                    doctorName: l.doctor || "Dr. Evelyn Reed",
                    clinic: l.clinic || "Metro Health Clinic",
                    medications: [l.medication ? `${l.medication} (${l.dosage})` : "Prescribed Medication"],
                    issueDate: l.issueDate ? new Date(l.issueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent",
                    expiryDate: l.expiryDate ? new Date(l.expiryDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "1 Year",
                    rxNumber: l.rxNumber || "RX-849201",
                    refills: `${l.refillsLeft ?? 3} left of ${l.totalRefills ?? 5}`,
                    fileType: "pdf",
                    ocrVerified: true
                }));
                setPrescriptions(formatted);
                setStoredData('prescriptions', formatted);
            }
        }
        syncBackend();
    }, []);

    // Filter logic
    const filtered = prescriptions.filter((rx) => {
        const matchesSearch =
            (rx.doctorName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (rx.clinic || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (rx.medications || []).some((m) => m.toLowerCase().includes(searchTerm.toLowerCase()));

        if (filterType === 'all') return matchesSearch;
        return matchesSearch && (rx.fileType || 'pdf').toLowerCase() === filterType.toLowerCase();
    });

    const handleAddPrescription = async (newRx) => {
        setPrescriptions((prev) => {
            const updated = [newRx, ...prev];
            setStoredData('prescriptions', updated);
            return updated;
        });

        // Sync to .NET 8 backend
        await addPrescription({
            medication: newRx.medications ? newRx.medications[0] : "New Rx",
            dosage: "Prescribed dose",
            frequency: "Follow directions",
            doctor: newRx.doctorName || "Prescribing Physician",
            clinic: newRx.clinic || "Health Center",
            rxNumber: newRx.rxNumber || `RX-${Math.floor(100000 + Math.random() * 900000)}`,
            refillsLeft: 3,
            totalRefills: 5,
            diagnosis: "General Wellness",
            status: "Active"
        });
    };

    const handleDelete = (id) => {
        setPrescriptions((prev) => {
            const updated = prev.filter((rx) => rx.id !== id);
            setStoredData('prescriptions', updated);
            return updated;
        });
    };

    return (
        <div className="content-body">
            <AdvisoryBanner />

            {/* Header Banner */}
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>verified_user</span>
                        <span>SECURE DIGITAL RECORDS VAULT</span>
                    </div>
                    <h1>Prescriptions Library</h1>
                    <p>Securely store, organize, and inspect uploaded physical and digital prescription slips.</p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-primary" onClick={() => setIsUploadOpen(true)}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>upload_file</span>
                        Upload Prescription
                    </button>
                </div>
            </div>

            {/* 3 Metric Cards Row */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-card-top">
                        <span>Total Stored</span>
                        <div className="metric-card-icon" style={{ background: 'var(--surface-low)', color: 'var(--primary)' }}>
                            <span className="material-symbols-outlined">folder_special</span>
                        </div>
                    </div>
                    <div className="metric-card-val">{prescriptions.length} Records</div>
                    <div className="metric-card-sub">PDFs & High-res images</div>
                </div>

                <div className="metric-card">
                    <div className="metric-card-top">
                        <span>OCR Verified</span>
                        <div className="metric-card-icon" style={{ background: 'var(--status-taken-bg)', color: 'var(--status-taken-icon)' }}>
                            <span className="material-symbols-outlined">document_scanner</span>
                        </div>
                    </div>
                    <div className="metric-card-val">{prescriptions.filter((r) => r.ocrVerified).length} Slips</div>
                    <div className="metric-card-sub">Dual-source validation complete</div>
                </div>

                <div className="metric-card">
                    <div className="metric-card-top">
                        <span>Prescribing Doctors</span>
                        <div className="metric-card-icon" style={{ background: 'var(--surface-low)', color: 'var(--secondary)' }}>
                            <span className="material-symbols-outlined">clinical_notes</span>
                        </div>
                    </div>
                    <div className="metric-card-val">
                        {new Set(prescriptions.map((r) => r.doctorName)).size} Physicians
                    </div>
                    <div className="metric-card-sub">Active medical contacts</div>
                </div>
            </div>

            {/* Search & Filter Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div className="topbar-search" style={{ width: '340px' }}>
                    <span className="material-symbols-outlined search-icon">search</span>
                    <input
                        type="search"
                        placeholder="Search doctor, clinic, medicine..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    {['all', 'pdf', 'jpg'].map((type) => (
                        <button
                            key={type}
                            className={`btn btn-sm ${filterType === type ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setFilterType(type)}
                            style={{ textTransform: 'uppercase' }}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid of Prescription Cards */}
            {filtered.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
                    {filtered.map((rx) => (
                        <PrescriptionCard
                            key={rx.id}
                            prescription={rx}
                            onView={(item) => alert(`Opening viewer for ${item.fileName || item.doctorName}`)}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--text-muted)' }}>
                        receipt_long
                    </span>
                    <h3 style={{ marginTop: '12px', color: 'var(--text-main)' }}>No prescriptions found</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Upload a paper slip or digital PDF to start organizing.</p>
                </div>
            )}

            {/* Upload & OCR Modal */}
            <UploadPrescriptionModal
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
                onSavePrescription={handleAddPrescription}
            />
        </div>
    );
}
