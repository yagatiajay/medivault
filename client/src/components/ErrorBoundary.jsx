// client/src/components/ErrorBoundary.jsx
import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("MediVault Unhandled Component Error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    handleReload = () => {
        window.location.reload();
    };

    handleReset = () => {
        try {
            // Clear any corrupted tab state but preserve patient records
            sessionStorage.clear();
        } catch {
            // ignore
        }
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-canvas, #f8f9ff)',
                    padding: '24px',
                    fontFamily: 'var(--font-body, Inter, sans-serif)',
                    color: 'var(--text-main, #1e293b)'
                }}>
                    <div style={{
                        maxWidth: '540px',
                        width: '100%',
                        background: 'var(--surface, #ffffff)',
                        border: '1px solid var(--border-light, #e2e8f0)',
                        borderRadius: 'var(--radius-lg, 16px)',
                        padding: '36px 32px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: '#fee2e2',
                            color: '#dc2626',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '20px'
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                                health_and_safety
                            </span>
                        </div>

                        <h2 style={{
                            fontFamily: 'var(--font-headline, "Plus Jakarta Sans", sans-serif)',
                            fontSize: '22px',
                            margin: '0 0 10px 0',
                            color: 'var(--text-main, #0f172a)'
                        }}>
                            Temporary Rendering Notice
                        </h2>

                        <p style={{
                            fontSize: '14px',
                            lineHeight: 1.6,
                            color: 'var(--text-secondary, #475569)',
                            margin: '0 0 20px 0'
                        }}>
                            An unexpected interface issue occurred. Your saved medications, prescriptions, and health records are completely safe in storage.
                        </p>

                        <div style={{
                            background: 'var(--surface-low, #f1f5f9)',
                            border: '1px solid var(--border-light, #e2e8f0)',
                            borderRadius: 'var(--radius-md, 12px)',
                            padding: '12px 16px',
                            fontSize: '12px',
                            color: 'var(--text-muted, #64748b)',
                            textAlign: 'left',
                            marginBottom: '24px'
                        }}>
                            <strong>Medical Safety Check:</strong> If you need immediate emergency information, your prescriptions and intake schedules remain accessible on physical slips or emergency services.
                        </div>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={this.handleReset}
                                style={{ padding: '10px 20px', fontSize: '13px' }}
                            >
                                Return to Dashboard
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.handleReload}
                                style={{ padding: '10px 20px', fontSize: '13px' }}
                            >
                                Reload Application
                            </button>
                        </div>

                        {import.meta.env.DEV && this.state.error && (
                            <details style={{ marginTop: '24px', textAlign: 'left', fontSize: '11px', color: '#b91c1c' }}>
                                <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Developer Error Details</summary>
                                <pre style={{ marginTop: '8px', padding: '10px', background: '#fef2f2', borderRadius: '6px', overflowX: 'auto' }}>
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
