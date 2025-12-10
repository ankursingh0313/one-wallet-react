import React, { useState, useCallback, memo } from 'react';

export interface DepositProps {
    accessCode: string;
    userId: string;
    onDepositSuccess?: (amount: number) => void;
    // Customization Props
    title?: string;
    buttonText?: string;
    placeholder?: string;
    containerStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    labelStyle?: React.CSSProperties;
    className?: string;
}

export const Deposit: React.FC<DepositProps> = memo(({
    accessCode,
    userId,
    onDepositSuccess,
    title = 'Deposit',
    buttonText = 'Deposit',
    placeholder = 'Enter amount',
    containerStyle,
    inputStyle,
    buttonStyle,
    labelStyle,
    className,
}) => {
    const [amount, setAmount] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDeposit = useCallback(async () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setError('Please enter a valid positive amount.');
            return;
        }

        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            // Simulate API call
            await new Promise(res => setTimeout(res, 1000));

            console.log(`Depositing ${amount} for user ${userId} with code ${accessCode}`);

            setMessage(`Successfully deposited ${amount} tokens.`);
            if (onDepositSuccess) {
                onDepositSuccess(Number(amount));
            }
            setAmount('');
        } catch (err) {
            setError('Failed to process deposit.');
        } finally {
            setLoading(false);
        }
    }, [amount, accessCode, userId, onDepositSuccess]);

    return (
        <div
            className={className}
            style={{
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '8px',
                maxWidth: '300px',
                ...containerStyle
            }}
        >
            <h3>{title}</h3>
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', ...labelStyle }}>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={placeholder}
                    style={{
                        width: '100%',
                        padding: '0.5rem',
                        boxSizing: 'border-box',
                        ...inputStyle
                    }}
                    disabled={loading}
                />
            </div>
            <button
                onClick={handleDeposit}
                disabled={loading}
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    ...buttonStyle
                }}
            >
                {loading ? 'Processing...' : buttonText}
            </button>
            {message && <div style={{ marginTop: '1rem', color: 'green' }}>{message}</div>}
            {error && <div style={{ marginTop: '1rem', color: 'red' }}>{error}</div>}
        </div>
    );
});

Deposit.displayName = 'Deposit';
