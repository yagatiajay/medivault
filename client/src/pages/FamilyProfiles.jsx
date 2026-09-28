// client/src/pages/FamilyProfiles.jsx
import React, { useState, useEffect } from 'react';
import AdvisoryBanner from '../components/AdvisoryBanner';
import AddFamilyMemberModal from '../components/AddFamilyMemberModal';
import { initialFamilyList } from '../data/mockData';
import { getStoredData, setStoredData } from '../utils/storage';
import { getFamilyMembers, addFamilyMember } from '../services/api';

export default function FamilyProfiles({ currentProfile, onSwitchProfile }) {
    const [profiles, setProfiles] = useState(() => getStoredData('familyProfiles', initialFamilyList));
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sync from .NET 8 PostgreSQL backend
    useEffect(() => {
        async function syncBackend() {
            const live = await getFamilyMembers();
            if (live && live.length > 0) {
                const formatted = live.map(m => ({
                    id: m.id,
                    name: m.name,
                    relationship: m.relationship,
                    initials: m.initials || m.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
                    medicationCount: m.medicationCount || 2,
                    prescriptionsCount: m.prescriptionsCount || 1,
                    color: m.color || '#00685f',
                    notes: m.notes || 'Care circle member'
                }));
                setProfiles(formatted);
                setStoredData('familyProfiles', formatted);
            }
        }
        syncBackend();
    }, []);

    const handleAdd = async (newProfile) => {
        setProfiles((prev) => {
            const updated = [...prev, newProfile];
            setStoredData('familyProfiles', updated);
            return updated;
        });

        // Sync with PostgreSQL
        await addFamilyMember({
            name: newProfile.name,
            relationship: newProfile.relationship,
            initials: newProfile.initials,
            medicationCount: 0,
            prescriptionsCount: 0,
            color: newProfile.color || '#00685f',
            notes: newProfile.notes || ''
        });
    };

    return (
        <div className="content-body">
            <AdvisoryBanner />

            {/* Header */}
            <div className="dashboard-header">
                <div className="dashboard-title">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>group</span>
                        <span>CARE CIRCLE HUB</span>
                    </div>
                    <h1>Family Profiles</h1>
                    <p>Organize prescriptions, dosage schedules, and health records for yourself and loved ones.</p>
                </div>

                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person_add</span>
                    Add Family Member
                </button>
            </div>

            {/* Active Viewing Profile Notice Banner */}
            <div style={{
                background: 'linear-gradient(90deg, #e6f6f4 0%, #eff6ff 100%)',
                border: '1px solid #bbf7d0',
                borderRadius: 'var(--radius-lg)',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-card)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                    }}>
                        {currentProfile?.initials || 'SJ'}
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="badge badge-taken" style={{ fontSize: '10px' }}>Active Vault</span>
                            <strong style={{ fontSize: '14px', color: 'var(--text-main)' }}>
                                {currentProfile?.name} ({currentProfile?.relationship || 'Self'})
                            </strong>
                        </div>
                        <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                            Currently viewing and editing records for <strong>{currentProfile?.name}</strong>. Select another profile below to switch vaults.
                        </p>
                    </div>
                </div>

                <span className="badge badge-taken" style={{ fontSize: '11px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>sync</span>
                    Live Sync Active
                </span>
            </div>

            {/* Profile Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
                {profiles.map((prof) => {
                    const isActive = prof.name === currentProfile?.name;

                    return (
                        <div
                            key={prof.id}
                            className="card"
                            style={{
                                border: isActive ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                                background: isActive ? '#fbfdfd' : 'var(--surface)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '14px',
                                position: 'relative',
                            }}
                        >
                            {/* Top Row: Avatar & Relationship Pill */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <div style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '50%',
                                        background: prof.color || 'var(--primary)',
                                        color: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        fontSize: '15px',
                                    }}>
                                        {prof.initials}
                                    </div>

                                    <div>
                                        <h3 style={{ margin: 0, fontFamily: 'var(--font-headline)', fontSize: '16px', color: 'var(--text-main)' }}>
                                            {prof.name}
                                        </h3>
                                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                            {prof.relationship}
                                        </span>
                                    </div>
                                </div>

                                {isActive && (
                                    <span className="badge badge-taken">
                                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check_circle</span>
                                        Active
                                    </span>
                                )}
                            </div>

                            {/* Middle Row: Metrics */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '8px',
                                background: 'var(--surface-low)',
                                padding: '10px 14px',
                                borderRadius: 'var(--radius-md)',
                            }}>
                                <div>
                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Medications</span>
                                    <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text-main)' }}>
                                        {prof.medicationCount} Active
                                    </strong>
                                </div>
                                <div>
                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Prescriptions</span>
                                    <strong style={{ display: 'block', fontSize: '14px', color: 'var(--text-main)' }}>
                                        {prof.prescriptionsCount} Files
                                    </strong>
                                </div>
                            </div>

                            {/* Notes */}
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                {prof.notes || 'No special instructions recorded.'}
                            </p>

                            {/* Action Button */}
                            <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                                {isActive ? (
                                    <button className="btn btn-sm btn-secondary" style={{ width: '100%', opacity: 0.7 }} disabled>
                                        Currently Active Vault
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-sm btn-primary"
                                        style={{ width: '100%' }}
                                        onClick={() => onSwitchProfile(prof)}
                                    >
                                        Switch to this Vault
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Member Modal */}
            <AddFamilyMemberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddMember={handleAdd}
            />
        </div>
    );
}
