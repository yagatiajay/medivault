// client/src/components/AuthModal.jsx
import React, { useState } from 'react';

export default function AuthModal({ isOpen, onClose, initialMode = 'signin', onLoginSuccess }) {
    const [mode, setMode] = useState(initialMode); // 'signin' | 'signup' | 'forgot'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [agreedToAdvisory, setAgreedToAdvisory] = useState(false);
    const [submittedReset, setSubmittedReset] = useState(false);

    if (!isOpen) return null;

    // Calculate password strength
    const getStrength = (pwd) => {
        if (!pwd) return { score: 0, label: 'None', color: 'var(--border-light)' };
        let s = 0;
        if (pwd.length >= 8) s++;
        if (/[A-Z]/.test(pwd)) s++;
        if (/[0-9]/.test(pwd)) s++;
        if (/[^A-Za-z0-9]/.test(pwd)) s++;

        if (s <= 1) return { score: 25, label: 'Weak', color: '#ef4444' };
        if (s <= 2) return { score: 50, label: 'Fair', color: '#f59e0b' };
        if (s === 3) return { score: 75, label: 'Good', color: '#3b82f6' };
        return { score: 100, label: 'Strong', color: '#10b981' };
    };

    const strength = getStrength(password);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'signup' && !agreedToAdvisory) {
            alert('Please review and confirm the medical informational disclaimer.');
            return;
        }

        const user = {
            id: `usr-${Date.now()}`,
            name: fullName.trim() || (email.split('@')[0] ? email.split('@')[0].replace('.', ' ') : 'Sarah Jenkins'),
            relationship: 'Me',
            email: email.trim() || 'sarah.j@example.com',
            initials: fullName ? fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'SJ',
        };

        onLoginSuccess(user);
        onClose();
    };

    const handleDemoLogin = () => {
        const demoUser = {
            id: "profile-1",
            name: "Sarah Jenkins",
            relationship: "Me",
            email: "sarah.j@example.com",
            initials: "SJ",
        };
        onLoginSuccess(demoUser);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '440px', padding: '0', overflow: 'hidden' }}
            >
                {/* Header Tabs */}
                <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            type="button"
                            className={`btn btn-sm ${mode === 'signin' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => { setMode('signin'); setSubmittedReset(false); }}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            className={`btn btn-sm ${mode === 'signup' ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => { setMode('signup'); setSubmittedReset(false); }}
                        >
                            Sign Up
                        </button>
                    </div>
                    <button className="icon-btn" onClick={onClose} title="Close">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Form Body */}
                <div style={{ padding: '24px' }}>
                    {mode === 'forgot' ? (
                        <div>
                            <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '18px', margin: '0 0 6px 0' }}>
                                Reset Vault Password
                            </h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 16px 0' }}>
                                Enter your account email to receive encrypted recovery instructions.
                            </p>

                            {submittedReset ? (
                                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '14px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#16a34a', fontSize: '28px' }}>mark_email_read</span>
                                    <h4 style={{ margin: '8px 0 4px', fontSize: '14px', color: '#15803d' }}>Reset Link Dispatched</h4>
                                    <p style={{ margin: 0, fontSize: '12px', color: '#166534' }}>
                                        Check your inbox at <strong>{email}</strong> for instructions.
                                    </p>
                                    <button className="btn btn-sm btn-secondary" style={{ marginTop: '14px' }} onClick={() => setMode('signin')}>
                                        Back to Sign In
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={(e) => { e.preventDefault(); setSubmittedReset(true); }}>
                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            className="form-input"
                                            placeholder="sarah.j@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                                        Send Recovery Link
                                    </button>
                                    <div style={{ textAlign: 'center', marginTop: '14px' }}>
                                        <button type="button" style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', cursor: 'pointer' }} onClick={() => setMode('signin')}>
                                            Return to Sign In
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h3 style={{ fontFamily: 'var(--font-headline)', fontSize: '20px', margin: '0 0 6px 0' }}>
                                {mode === 'signin' ? 'Welcome Back' : 'Create Your Health Vault'}
                            </h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
                                {mode === 'signin' 
                                    ? 'Access your personal medication regimens and records.' 
                                    : 'Encrypted, personal medical information organizer.'}
                            </p>

                            {mode === 'signup' && (
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-input"
                                        placeholder="Sarah Jenkins"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="form-input"
                                    placeholder="sarah.j@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label className="form-label">Password</label>
                                    {mode === 'signin' && (
                                        <button
                                            type="button"
                                            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', cursor: 'pointer' }}
                                            onClick={() => setMode('forgot')}
                                        >
                                            Forgot password?
                                        </button>
                                    )}
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="form-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                {/* Password Strength Meter for Signup */}
                                {mode === 'signup' && password && (
                                    <div style={{ marginTop: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Strength:</span>
                                            <strong style={{ color: strength.color }}>{strength.label}</strong>
                                        </div>
                                        <div style={{ width: '100%', height: '4px', background: 'var(--surface-low)', borderRadius: '2px', overflow: 'hidden' }}>
                                            <div style={{ width: `${strength.score}%`, height: '100%', background: strength.color, transition: 'all 0.3s ease' }} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Advisory Checkbox for Signup */}
                            {mode === 'signup' && (
                                <div style={{ marginTop: '16px', background: 'var(--surface-low)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                                    <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer', fontSize: '12px', color: 'var(--text-secondary)' }}>
                                        <input
                                            type="checkbox"
                                            required
                                            checked={agreedToAdvisory}
                                            onChange={(e) => setAgreedToAdvisory(e.target.checked)}
                                            style={{ marginTop: '2px' }}
                                        />
                                        <span>
                                            I acknowledge that <strong>MediVault</strong> is strictly an informational record organizer and does not provide medical advice or diagnoses.
                                        </span>
                                    </label>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: '100%', marginTop: '20px', padding: '10px' }}
                            >
                                {mode === 'signin' ? 'Sign In to MediVault' : 'Register Vault Account'}
                            </button>

                            {/* Quick Demo Login Option */}
                            <div style={{ margin: '20px 0 0 0', paddingTop: '16px', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
                                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
                                    Want to test instantly without credentials?
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    onClick={handleDemoLogin}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary)' }}>badge</span>
                                    <span>Use Demo Account (Sarah Jenkins)</span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
