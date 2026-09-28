// client/src/components/GlobalSearchModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { initialPrescriptions, fallbackDoses, initialFamilyList } from '../data/mockData';

export default function GlobalSearchModal({ isOpen, onClose, onNavigate }) {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setSearchTerm('');
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const term = searchTerm.toLowerCase().trim();

    // Search across Medications
    const matchedMeds = fallbackDoses.filter(d => 
        !term || 
        d.medication?.name?.toLowerCase().includes(term) ||
        d.dosage?.toLowerCase().includes(term) ||
        d.instructions?.toLowerCase().includes(term)
    );

    // Search across Prescriptions
    const matchedRx = initialPrescriptions.filter(p => 
        !term ||
        p.medication?.toLowerCase().includes(term) ||
        p.doctor?.toLowerCase().includes(term) ||
        p.diagnosis?.toLowerCase().includes(term)
    );

    // Search across Family Members
    const matchedFamily = initialFamilyList.filter(f => 
        !term ||
        f.name?.toLowerCase().includes(term) ||
        f.relationship?.toLowerCase().includes(term)
    );

    const totalResults = matchedMeds.length + matchedRx.length + matchedFamily.length;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className="modal-content omni-search-modal" 
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '640px', padding: '0', overflow: 'hidden' }}
            >
                {/* Search Header */}
                <div className="search-header-bar">
                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '24px' }}>
                        search
                    </span>
                    <input 
                        ref={inputRef}
                        type="text" 
                        className="search-input-field"
                        placeholder="Search medications, prescriptions, family profiles... (Type to filter)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button className="icon-btn" onClick={() => setSearchTerm('')} title="Clear">
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
                        </button>
                    )}
                    <span className="shortcut-badge">ESC to close</span>
                </div>

                {/* Results Container */}
                <div className="search-results-body" style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px' }}>
                    {totalResults === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '42px', color: 'var(--border-subtle)', marginBottom: '10px' }}>
                                search_off
                            </span>
                            <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: 'var(--text-main)' }}>No matching records found</h4>
                            <p style={{ margin: 0, fontSize: '13px' }}>Try searching for a medication name, physician, or family member.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {/* Section: Medications */}
                            {matchedMeds.length > 0 && (
                                <div>
                                    <div className="search-group-header">
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>medication</span>
                                        <span>MEDICATIONS ({matchedMeds.length})</span>
                                    </div>
                                    <div className="search-group-list">
                                        {matchedMeds.map((med) => (
                                            <div 
                                                key={med.id} 
                                                className="search-result-row"
                                                onClick={() => {
                                                    onNavigate('medications');
                                                    onClose();
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div className="search-icon-chip" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>pill</span>
                                                    </div>
                                                    <div>
                                                        <strong style={{ fontSize: '13px', color: 'var(--text-main)', display: 'block' }}>
                                                            {med.medication?.name} {med.dosage}
                                                        </strong>
                                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                                            {med.instructions} • {med.time}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="action-hint">Go to Medications →</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Section: Prescriptions */}
                            {matchedRx.length > 0 && (
                                <div>
                                    <div className="search-group-header">
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>description</span>
                                        <span>PRESCRIPTIONS & RECORDS ({matchedRx.length})</span>
                                    </div>
                                    <div className="search-group-list">
                                        {matchedRx.map((rx) => (
                                            <div 
                                                key={rx.id} 
                                                className="search-result-row"
                                                onClick={() => {
                                                    onNavigate('prescriptions');
                                                    onClose();
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div className="search-icon-chip" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>clinical_notes</span>
                                                    </div>
                                                    <div>
                                                        <strong style={{ fontSize: '13px', color: 'var(--text-main)', display: 'block' }}>
                                                            {rx.medication} ({rx.dosage})
                                                        </strong>
                                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                                            {rx.doctor} • {rx.diagnosis} • Refills: {rx.refillsLeft}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="action-hint">View Slip →</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Section: Family Vaults */}
                            {matchedFamily.length > 0 && (
                                <div>
                                    <div className="search-group-header">
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>diversity_1</span>
                                        <span>FAMILY PROFILES ({matchedFamily.length})</span>
                                    </div>
                                    <div className="search-group-list">
                                        {matchedFamily.map((fam) => (
                                            <div 
                                                key={fam.id} 
                                                className="search-result-row"
                                                onClick={() => {
                                                    onNavigate('family');
                                                    onClose();
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div 
                                                        className="user-avatar" 
                                                        style={{ width: '28px', height: '28px', fontSize: '11px', background: `${fam.color}20`, color: fam.color }}
                                                    >
                                                        {fam.initials}
                                                    </div>
                                                    <div>
                                                        <strong style={{ fontSize: '13px', color: 'var(--text-main)', display: 'block' }}>
                                                            {fam.name} ({fam.relationship})
                                                        </strong>
                                                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                                            {fam.medicationCount} medications • {fam.prescriptionsCount} documents
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="action-hint">Open Vault →</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Disclaimer */}
                <div style={{ padding: '12px 16px', background: 'var(--surface-low)', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
                    <span>⚡ Tip: Press <strong>⌘K</strong> anytime to reopen global search</span>
                    <span>Informational index only</span>
                </div>
            </div>
        </div>
    );
}
