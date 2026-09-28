// client/src/pages/Medications.jsx
import React, { useState, useEffect } from 'react';
import MedicationCard from '../components/MedicationCard';
import AdvisoryBanner from '../components/AdvisoryBanner';
import { getMedications } from '../services/api';

// Fallback initial data in case the backend is offline
const fallbackMedications = [
    {
        id: "med-1",
        name: "Atorvastatin",
        dosage: "20 mg",
        form: "1 tablet",
        instructions: "Take with water after dinner",
        frequency: "Once Daily",
        scheduledTime: "08:00 AM",
        startDate: "2026-08-01",
        status: "Active",
        prescribingDoctor: "Dr. Evelyn Reed",
    },
    {
        id: "med-2",
        name: "Metformin",
        dosage: "500 mg",
        form: "1 tablet",
        instructions: "Take with morning meal",
        frequency: "Once Daily",
        scheduledTime: "08:30 AM",
        startDate: "2026-07-15",
        status: "Active",
        prescribingDoctor: "Dr. Marcus Vance",
    },
    {
        id: "med-3",
        name: "Amoxicillin",
        dosage: "250 mg",
        form: "1 capsule",
        instructions: "Completed 7-day course",
        frequency: "Three times daily",
        scheduledTime: "09:00 AM",
        startDate: "2026-06-01",
        status: "Completed",
        prescribingDoctor: "Dr. Evelyn Reed",
    }
];

export default function Medications({ onOpenAddModal }) {
    const [medications, setMedications] = useState(fallbackMedications);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'completed'

    // Fetch live medications from .NET 8 API
    useEffect(() => {
        async function load() {
            const data = await getMedications();
            if (data && Array.isArray(data) && data.length > 0) {
                setMedications(data);
            }
        }
        load();
    }, []);

    // Filter medications by search text AND status tab
    const filteredMedications = medications.filter((med) => {
        const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            med.prescribingDoctor?.toLowerCase().includes(searchTerm.toLowerCase());

        if (statusFilter === 'all') return matchesSearch;
        return matchesSearch && med.status.toLowerCase() === statusFilter.toLowerCase();
    });

    return (
        <div className="content-body">
            <AdvisoryBanner />

            {/* Header */}
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <h1>Medications Directory</h1>
                    <p>Organize and review all your personal active and past prescriptions.</p>
                </div>

                <button className="btn btn-primary" onClick={onOpenAddModal}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                    Add Medication
                </button>
            </div>

            {/* Search & Filter Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {/* Search input (Controlled Component) */}
                <div className="topbar-search" style={{ width: '320px' }}>
                    <span className="material-symbols-outlined search-icon">search</span>
                    <input
                        type="search"
                        placeholder="Search by medicine or doctor..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '8px' }}>
                    {['all', 'active', 'completed'].map((tab) => (
                        <button
                            key={tab}
                            className={`btn btn-sm ${statusFilter === tab ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setStatusFilter(tab)}
                            style={{ textTransform: 'capitalize' }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Medications Grid */}
            {filteredMedications.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
                    {filteredMedications.map((med) => (
                        <MedicationCard
                            key={med.id}
                            medication={med}
                            onEdit={(m) => alert(`Editing ${m.name}`)}
                            onArchive={(id) => setMedications((prev) => prev.filter((m) => m.id !== id))}
                        />
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--text-muted)' }}>
                        medication
                    </span>
                    <h3 style={{ marginTop: '12px', color: 'var(--text-main)' }}>No medications found</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
}
