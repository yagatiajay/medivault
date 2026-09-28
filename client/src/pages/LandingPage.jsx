// client/src/pages/LandingPage.jsx
import React from 'react';

export default function LandingPage({ onOpenAuth, onLaunchDemo }) {
    return (
        <div className="landing-page" style={{ minHeight: '100vh', background: 'var(--bg-canvas)', color: 'var(--text-main)', display: 'flex', flexDirection: 'column' }}>
            {/* Top Navigation */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '18px 48px',
                background: 'var(--surface)',
                borderBottom: '1px solid var(--border-light)',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, var(--primary) 0%, #004d46 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff'
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>shield_with_heart</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '20px', letterSpacing: '-0.3px', color: 'var(--primary)' }}>
                        MediVault
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => onOpenAuth('signin')}
                        style={{ padding: '8px 18px', fontSize: '13px' }}
                    >
                        Sign In
                    </button>
                    <button 
                        className="btn btn-primary" 
                        onClick={onLaunchDemo}
                        style={{ padding: '8px 20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                        <span>Launch Live Demo</span>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                    </button>
                </div>
            </header>

            {/* Regulatory Medical Banner */}
            <div style={{
                background: '#f0fdf4',
                borderBottom: '1px solid #bbf7d0',
                padding: '10px 48px',
                fontSize: '12px',
                color: '#166534',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
            }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>info</span>
                <span>
                    <strong>Medical Disclaimer:</strong> MediVault is strictly a personal informational organizer. It does not provide medical advice, diagnosis, or treatment recommendations. Always consult your licensed physician.
                </span>
            </div>

            {/* Hero Section */}
            <section style={{ padding: '72px 24px 48px', maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '12px', fontWeight: 600, marginBottom: '20px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>lock</span>
                    Personal Health Record Management
                </div>

                <h1 style={{
                    fontFamily: 'var(--font-headline)',
                    fontSize: 'clamp(32px, 5vw, 54px)',
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: '-1px',
                    color: 'var(--text-main)',
                    margin: '0 auto 20px',
                    maxWidth: '850px'
                }}>
                    Your Personal Health Vault.<br />
                    <span style={{ color: 'var(--primary)' }}>Pure, Private & Serene.</span>
                </h1>

                <p style={{
                    fontSize: '17px',
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                    maxWidth: '660px',
                    margin: '0 auto 36px'
                }}>
                    A calm, clutter-free record organizer for medications, prescriptions, and family care circles. Built with serene clinical minimalism and uncompromising privacy.
                </p>

                {/* Hero CTAs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <button 
                        className="btn btn-primary" 
                        onClick={onLaunchDemo}
                        style={{ padding: '14px 28px', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 20px rgba(0, 104, 95, 0.2)' }}
                    >
                        <span className="material-symbols-outlined">rocket_launch</span>
                        <span>Explore Live Vault Demo</span>
                    </button>
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => onOpenAuth('signup')}
                        style={{ padding: '14px 26px', fontSize: '15px' }}
                    >
                        Create Free Account
                    </button>
                </div>

                {/* Micro Badges */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '36px', fontSize: '13px', color: 'var(--text-muted)' }}>
                    <span>✓ Zero Ads or Data Monetization</span>
                    <span>✓ Offline-Ready Caching</span>
                    <span>✓ .NET 8 & PostgreSQL Architecture</span>
                </div>
            </section>

            {/* Feature Highlights Grid */}
            <section style={{ maxWidth: '1100px', margin: '40px auto 70px', padding: '0 24px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '26px', margin: '0 0 8px 0' }}>
                        Designed for Effortless Adherence
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
                        Every screen crafted with clinical focus, non-alarmist cues, and instant accessibility.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    {/* Card 1 */}
                    <div className="card" style={{ padding: '24px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                            <span className="material-symbols-outlined">medication</span>
                        </div>
                        <h3 style={{ fontSize: '16px', margin: '0 0 8px 0', fontFamily: 'var(--font-headline)' }}>
                            Medication Regimens
                        </h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                            Track active prescriptions, exact dosages, and daily routines categorized by morning, afternoon, and evening.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="card" style={{ padding: '24px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--secondary-light)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                            <span className="material-symbols-outlined">document_scanner</span>
                        </div>
                        <h3 style={{ fontSize: '16px', margin: '0 0 8px 0', fontFamily: 'var(--font-headline)' }}>
                            Prescription OCR Archival
                        </h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                            Scan paper prescription slips, automatically transcribe physician directions, and maintain verifiable records.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="card" style={{ padding: '24px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                            <span className="material-symbols-outlined">family_restroom</span>
                        </div>
                        <h3 style={{ fontSize: '16px', margin: '0 0 8px 0', fontFamily: 'var(--font-headline)' }}>
                            Family Care Circles
                        </h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                            Manage health regimens for parents, children, and spouses in distinct encrypted vaults under one single roof.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="card" style={{ padding: '24px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fee2e2', color: '#b91c1c', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                            <span className="material-symbols-outlined">emergency</span>
                        </div>
                        <h3 style={{ fontSize: '16px', margin: '0 0 8px 0', fontFamily: 'var(--font-headline)' }}>
                            Emergency Wallet Card
                        </h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                            Generate printable emergency slips with your active medicines, blood type, and emergency contacts for physician visits.
                        </p>
                    </div>
                </div>
            </section>

            {/* Architecture Section */}
            <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '48px 24px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '24px', textAlign: 'center' }}>
                    <div>
                        <strong style={{ fontSize: '28px', color: 'var(--primary)', display: 'block', fontFamily: 'var(--font-headline)' }}>.NET 8</strong>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>High-Performance Backend API</span>
                    </div>
                    <div>
                        <strong style={{ fontSize: '28px', color: 'var(--secondary)', display: 'block', fontFamily: 'var(--font-headline)' }}>PostgreSQL</strong>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Relational Health Ledger</span>
                    </div>
                    <div>
                        <strong style={{ fontSize: '28px', color: '#dc2626', display: 'block', fontFamily: 'var(--font-headline)' }}>Redis</strong>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>In-Memory Dose Caching</span>
                    </div>
                    <div>
                        <strong style={{ fontSize: '28px', color: '#f59e0b', display: 'block', fontFamily: 'var(--font-headline)' }}>RabbitMQ</strong>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Asynchronous Event Bus</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ marginTop: 'auto', padding: '36px 48px', background: 'var(--surface-low)', borderTop: '1px solid var(--border-light)', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
                <p style={{ margin: '0 0 10px 0' }}>
                    © {new Date().getFullYear()} MediVault Inc. Personal Medical Information System. All rights reserved.
                </p>
                <p style={{ maxWidth: '640px', margin: '0 auto' }}>
                    MediVault is strictly an informational record keeper. It does not provide medical diagnosis, dosage prescription, or treatment evaluation. In case of an emergency, call 911 or visit your nearest hospital immediately.
                </p>
            </footer>
        </div>
    );
}
