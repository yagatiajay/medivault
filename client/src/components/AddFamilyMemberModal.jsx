// client/src/components/AddFamilyMemberModal.jsx
import React, { useState } from 'react';

export default function AddFamilyMemberModal({ isOpen, onClose, onSave }) {
    const [name, setName] = useState('');
    const [relationship, setRelationship] = useState('Mother');
    const [notes, setNotes] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        // Generate initials (e.g. "Eleanor Jenkins" -> "EJ")
        const parts = name.trim().split(' ');
        const initials = parts.length > 1 ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() : name.slice(0, 2).toUpperCase();

        onSave({
            id: `profile-${Date.now()}`,
            name: name.trim(),
            relationship,
            initials,
            medicationCount: 0,
            prescriptionsCount: 0,
            color: '#0d9488',
            notes: notes || 'Personal health organizer profile',
        });

        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '20px', color: 'var(--text-main)', margin: 0 }}>
                            Add Family Member
                        </h2>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                            Create a distinct profile to organize a loved one's medications.
                        </p>
                    </div>
                    <button className="icon-btn" onClick={onClose} type="button">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                            className="form-input"
                            placeholder="e.g. Eleanor Jenkins"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Relationship</label>
                        <select className="form-select" value={relationship} onChange={(e) => setRelationship(e.target.value)}>
                            <option value="Mother">Mother</option>
                            <option value="Father">Father</option>
                            <option value="Spouse / Partner">Spouse / Partner</option>
                            <option value="Child">Child</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Dependent">Dependent</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Notes (Optional)</label>
                        <input
                            className="form-input"
                            placeholder="e.g. Managing heart routine"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                        <button className="btn btn-secondary" type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" type="submit">
                            Create Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
