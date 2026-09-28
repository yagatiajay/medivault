// client/src/components/AddMedicationModal.jsx
import React, { useState } from 'react';

export default function AddMedicationModal({ isOpen, onClose, onSave }) {
    // 1. Single State Object for the entire form
    const [formData, setFormData] = useState({
        name: '',
        dosage: '',
        form: '1 tablet',
        instructions: '',
        frequency: 'Once Daily',
        scheduledTime: '08:00 AM',
        prescribingDoctor: '',
        notes: '',
        status: 'Active',
    });

    const [error, setError] = useState('');

    // Don't render anything if the modal isn't open
    if (!isOpen) return null;

    // 2. Dynamic Input Handler (updates any field based on its 'name' attribute!)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 3. Form Submit Handler
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim()) {
            setError('Medication name is required.');
            return;
        }
        if (!formData.dosage.trim()) {
            setError('Dosage strength is required (e.g. 20 mg).');
            return;
        }

        setError('');
        onSave(formData);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* Stop click inside the modal from closing it */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', padding: '24px' }}>

                {/* Modal Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '20px', color: 'var(--text-main)', margin: 0 }}>
                            Add New Medication
                        </h2>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                            Add a new medication to your personal health organizer.
                        </p>
                    </div>
                    <button className="icon-btn" onClick={onClose} type="button">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Regulatory Warning Banner (Strict Requirement) */}
                <div style={{ background: 'var(--surface-low)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid #dce9ff', marginBottom: '18px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>info</span>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)' }}>
                        <strong>Important:</strong> Enter the medication and schedule information exactly as provided by your healthcare professional. MediVault does not advise or alter dosages.
                    </p>
                </div>

                {/* Error message */}
                {error && (
                    <div style={{ background: 'var(--status-missed-bg)', color: 'var(--status-missed-text)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12px', marginBottom: '14px' }}>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Row 1: Name & Dosage */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                            <label className="form-label">Medication Name *</label>
                            <input
                                className="form-input"
                                name="name"
                                placeholder="e.g. Atorvastatin"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Dosage *</label>
                            <input
                                className="form-input"
                                name="dosage"
                                placeholder="e.g. 20 mg"
                                value={formData.dosage}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Row 2: Frequency & Scheduled Time */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                            <label className="form-label">Frequency</label>
                            <select className="form-select" name="frequency" value={formData.frequency} onChange={handleChange}>
                                <option value="Once Daily">Once Daily</option>
                                <option value="Twice Daily">Twice Daily</option>
                                <option value="Three Times Daily">Three Times Daily</option>
                                <option value="As Needed">As Needed (PRN)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Scheduled Time</label>
                            <input
                                className="form-input"
                                name="scheduledTime"
                                placeholder="e.g. 08:00 AM"
                                value={formData.scheduledTime}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Row 3: Instructions */}
                    <div className="form-group">
                        <label className="form-label">Directions & Instructions</label>
                        <input
                            className="form-input"
                            name="instructions"
                            placeholder="e.g. Take with a glass of water after dinner"
                            value={formData.instructions}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Row 4: Doctor & Form Type */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                            <label className="form-label">Prescribing Doctor (Optional)</label>
                            <input
                                className="form-input"
                                name="prescribingDoctor"
                                placeholder="e.g. Dr. Evelyn Reed"
                                value={formData.prescribingDoctor}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Form</label>
                            <select className="form-select" name="form" value={formData.form} onChange={handleChange}>
                                <option value="1 tablet">1 Tablet</option>
                                <option value="1 capsule">1 Capsule</option>
                                <option value="1 softgel">1 Softgel</option>
                                <option value="5 ml liquid">Liquid / Syrup</option>
                                <option value="1 injection">Injection</option>
                            </select>
                        </div>
                    </div>

                    {/* Modal Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                        <button className="btn btn-secondary" type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" type="submit">
                            Save Medication
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}