import React, { useEffect, useState } from 'react';

interface BalanceDisplayProps {
  accessCode: string;
  userId: string;
}

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  accessCode,
  userId,
}) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!accessCode || !userId) {
      setError('Access code and User ID are required.');
      setLoading(false);
      return;
    }

    // Simulate API call to fetch balance
    setLoading(true);
    setError(null);

    const fetchBalance = async () => {
      try {
        // Replace this with your actual API call
        // e.g. const res = await fetch(`/api/balance?accessCode=${accessCode}&userId=${userId}`);
        // const data = await res.json();

        await new Promise(res => setTimeout(res, 1000)); // simulate delay

        // Mocked balance value
        const mockedBalance = 1234.56;

        setBalance(mockedBalance);
      } catch (err) {
        setError('Failed to fetch balance.');
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [accessCode, userId]);

  if (loading) return <div>Loading balance...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <strong>Balance:</strong> {balance?.toFixed(2)} tokens
    </div>
  );
};
