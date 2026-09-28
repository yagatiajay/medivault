function generateId() {
  return "rx-" + Math.random().toString(36).substring(2, 9);
}
// client/src/components/UploadPrescriptionModal.jsx
import React, { useState } from 'react';

export default function UploadPrescriptionModal({ isOpen, onClose, onSavePrescription }) {
    const [step, setStep] = useState(1); // 1: Select File, 2: Scanning OCR, 3: Verify Extracted Data
    const [selectedFileName, setSelectedFileName] = useState('');

    // OCR Extracted Data (Editable by user)
    const [extractedData, setExtractedData] = useState({
        doctorName: '',
        clinic: '',
        prescriptionDate: new Date().toISOString().split('T')[0],
        medicationName: '',
        dosage: '',
        frequency: 'Once Daily',
        instructions: '',
    });

    if (!isOpen) return null;

    // Handles simulated OCR scanning
    const startOcrScan = (fileName) => {
        setSelectedFileName(fileName);
        setStep(2); // Show "Reading prescription..." scanning state

        setTimeout(() => {
            // Mock realistic OCR detection
            setExtractedData({
                doctorName: 'Dr. Evelyn Reed',
                clinic: 'Metro Health Cardiology',
                prescriptionDate: '2026-09-28',
                medicationName: 'Atorvastatin Calcium',
                dosage: '20 mg',
                frequency: 'Once Daily',
                instructions: 'Take 1 tablet by mouth at bedtime',
            });
            setStep(3); // Transition to Step 3: Verification
        }, 1800);
    };

    const handleConfirmSave = () => {
        const newPrescription = {
            id: generateId(),
            doctorName: extractedData.doctorName || 'Dr. Evelyn Reed',
            clinic: extractedData.clinic || 'General Health Clinic',
            date: extractedData.prescriptionDate,
            uploadDate: new Date().toISOString().split('T')[0],
            fileType: selectedFileName.endsWith('.pdf') ? 'PDF' : 'JPG',
            fileName: selectedFileName || 'Prescription_Document.pdf',
            fileSize: '1.8 MB',
            medications: [`${extractedData.medicationName || 'Medication'} ${extractedData.dosage || ''}`.trim()],
            ocrVerified: true,
        };

        onSavePrescription(newPrescription);
        handleClose();
    };

    const handleClose = () => {
        setStep(1);
        setSelectedFileName('');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px', padding: '24px' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '20px', color: 'var(--text-main)', margin: 0 }}>
                            {step === 1 && "Upload Prescription Document"}
                            {step === 2 && "Reading Prescription (OCR)..."}
                            {step === 3 && "Verify Extracted Information"}
                        </h2>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            Step {step} of 3 • Secure Clinical Storage
                        </span>
                    </div>
                    <button className="icon-btn" onClick={handleClose} type="button">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* STEP 1: Drag and Drop Upload */}
                {step === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div
                            style={{
                                border: '2px dashed var(--primary)',
                                background: 'var(--surface-low)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '36px 20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                            }}
                            onClick={() => startOcrScan("Dr_Reed_Prescription_Slip.pdf")}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--primary)', marginBottom: '8px' }}>
                                cloud_upload
                            </span>
                            <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: 'var(--text-main)' }}>
                                Click to browse or drag & drop prescription
                            </h4>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
                                Supports high-resolution PDF, JPG, and PNG files (Up to 15 MB)
                            </p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => startOcrScan("Sample_Prescription_Slip.jpg")}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>document_scanner</span>
                                Use Sample Slip & Scan with OCR
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2: Processing Animation */}
                {step === 2 && (
                    <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '56px', color: 'var(--primary)', animation: 'spin 2s linear infinite' }}>
                            sync
                        </span>
                        <h3 style={{ marginTop: '16px', color: 'var(--text-main)', fontSize: '18px' }}>
                            Analyzing Prescription Document...
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', maxWidth: '360px', margin: '8px auto 0' }}>
                            Reading doctor info, dosage instructions, and medication details using OCR text recognition.
                        </p>
                    </div>
                )}

                {/* STEP 3: Verification with Regulatory Warning */}
                {step === 3 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {/* Prominent Mandatory Safety Warning */}
                        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', padding: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <span className="material-symbols-outlined" style={{ color: '#d97706', fontSize: '22px' }}>warning</span>
                            <p style={{ margin: 0, fontSize: '11px', color: '#92400e' }}>
                                <strong>Verification Required:</strong> Please carefully verify all extracted medication and dosage fields against your physical paper slip before confirming.
                            </p>
                        </div>

                        {/* Editable OCR Fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div className="form-group">
                                <label className="form-label">Detected Doctor</label>
                                <input
                                    className="form-input"
                                    value={extractedData.doctorName}
                                    onChange={(e) => setExtractedData({ ...extractedData, doctorName: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Clinic / Hospital</label>
                                <input
                                    className="form-input"
                                    value={extractedData.clinic}
                                    onChange={(e) => setExtractedData({ ...extractedData, clinic: e.target.value })}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                            <div className="form-group">
                                <label className="form-label">Detected Medicine</label>
                                <input
                                    className="form-input"
                                    value={extractedData.medicationName}
                                    onChange={(e) => setExtractedData({ ...extractedData, medicationName: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Dosage Strength</label>
                                <input
                                    className="form-input"
                                    value={extractedData.dosage}
                                    onChange={(e) => setExtractedData({ ...extractedData, dosage: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Extracted Directions</label>
                            <input
                                className="form-input"
                                value={extractedData.instructions}
                                onChange={(e) => setExtractedData({ ...extractedData, instructions: e.target.value })}
                            />
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                            <button className="btn btn-secondary" onClick={() => setStep(1)}>
                                Re-upload
                            </button>
                            <button className="btn btn-primary" onClick={handleConfirmSave}>
                                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check_circle</span>
                                Confirm & Save to Records
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
