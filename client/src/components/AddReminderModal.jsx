// client/src/components/AddReminderModal.jsx
import React, { useState } from 'react';

export default function AddReminderModal({ isOpen, onClose, onSave }) {
    const [medication, setMedication] = useState('Atorvastatin (20 mg)');
    const [time, setTime] = useState('08:00 AM');
    const [frequency, setFrequency] = useState('Daily');
    const [selectedChannels, setSelectedChannels] = useState(['In-App Banner', 'Push Notification']);

    if (!isOpen) return null;

    const toggleChannel = (channel) => {
        if (selectedChannels.includes(channel)) {
            setSelectedChannels(selectedChannels.filter((c) => c !== channel));
        } else {
            setSelectedChannels([...selectedChannels, channel]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!medication) return;

        onSave({
            id: `rem-${Date.now()}`,
            medication,
            time,
            frequency,
            channels: selectedChannels.length > 0 ? selectedChannels : ['In-App Banner'],
            enabled: true,
            lastTriggered: 'Scheduled for tomorrow',
        });

        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '20px', color: 'var(--text-main)', margin: 0 }}>
                            Set New Reminder
                        </h2>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                            Create an automated alert for your scheduled medication intake.
                        </p>
                    </div>
                    <button className="icon-btn" onClick={onClose} type="button">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div className="form-group">
                        <label className="form-label">Select Medication</label>
                        <select className="form-select" value={medication} onChange={(e) => setMedication(e.target.value)}>
                            <option value="Atorvastatin (20 mg)">Atorvastatin (20 mg)</option>
                            <option value="Metformin (500 mg)">Metformin (500 mg)</option>
                            <option value="Lisinopril (10 mg)">Lisinopril (10 mg)</option>
                            <option value="Omega-3 Fish Oil (1000 mg)">Omega-3 Fish Oil (1000 mg)</option>
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group">
                            <label className="form-label">Reminder Time</label>
                            <input
                                className="form-input"
                                placeholder="e.g. 08:00 AM"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Frequency</label>
                            <select className="form-select" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                                <option value="Daily">Daily</option>
                                <option value="Twice Daily">Twice Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="As Needed">As Needed</option>
                            </select>
                        </div>
                    </div>

                    {/* Delivery Channels */}
                    <div className="form-group">
                        <label className="form-label">Notification Channels</label>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {['In-App Banner', 'Push Notification', 'Email'].map((channel) => {
                                const isSelected = selectedChannels.includes(channel);
                                return (
                                    <button
                                        key={channel}
                                        type="button"
                                        className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                                        onClick={() => toggleChannel(channel)}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                                            {isSelected ? 'check' : 'add'}
                                        </span>
                                        {channel}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                        <button className="btn btn-secondary" type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" type="submit">
                            Save Reminder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
