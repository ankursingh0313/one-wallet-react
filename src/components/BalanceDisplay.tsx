import React, { useEffect, useState } from 'react';
import { WalletConnectButton } from './WalletConnectButton';
import { api } from '../api';

interface BalanceDisplayProps {
  accessCode: string;
  userId: string;
  baseUrl?: string;
  isWalletConnected?: boolean;
  onConnectWallet?: () => void;
}

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  accessCode,
  userId,
  baseUrl,
  isWalletConnected = true,
  onConnectWallet,
}) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isWalletConnected) return;

    if (!accessCode || !userId) {
      setError('Access code and User ID are required.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchBalance = async () => {
      try {
        const balance = await api.getBalance({ accessCode, userId, baseUrl });
        setBalance(balance);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch balance.');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [accessCode, userId, baseUrl, isWalletConnected]);

  if (!isWalletConnected) {
    return (
      <div style={{ textAlign: 'center' }}>
        <WalletConnectButton
          connected={false}
          onConnect={onConnectWallet || (() => { })}
        />
      </div>
    );
  }

  if (loading) return <div>Loading balance...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <strong>Balance:</strong> {balance?.toFixed(2)} tokens
    </div>
  );
};
