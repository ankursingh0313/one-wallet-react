import React, { useState, useCallback, memo } from 'react';
import { Deposit, DepositProps } from './Deposit';
import { Withdraw, WithdrawProps } from './Withdraw';
import { WalletConnectButton } from './WalletConnectButton';

export interface HybridProps {
  accessCode: string;
  userId: string;
  baseUrl?: string;
  onTransactionSuccess?: (type: 'deposit' | 'withdraw', amount: number) => void;
  // Wallet Connection Props
  isWalletConnected?: boolean;
  onConnectWallet?: () => void;
  // Customization Props
  containerStyle?: React.CSSProperties;
  tabStyle?: React.CSSProperties;
  activeTabStyle?: React.CSSProperties;
  depositLabel?: string;
  withdrawLabel?: string;
  className?: string;
  // Props to pass down
  depositProps?: Partial<DepositProps>;
  withdrawProps?: Partial<WithdrawProps>;
}

export const Hybrid: React.FC<HybridProps> = memo(
  ({
    accessCode,
    userId,
    baseUrl,
    onTransactionSuccess,
    isWalletConnected = true,
    onConnectWallet,
    containerStyle,
    tabStyle,
    activeTabStyle,
    depositLabel = 'Deposit',
    withdrawLabel = 'Withdraw',
    className,
    depositProps,
    withdrawProps,
  }) => {
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>(
      'deposit'
    );

    const handleSuccess = useCallback(
      (amount: number) => {
        if (onTransactionSuccess) {
          onTransactionSuccess(activeTab, amount);
        }
      },
      [activeTab, onTransactionSuccess]
    );

    if (!isWalletConnected) {
      return (
        <div
          className={className}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            maxWidth: '350px',
            padding: '1rem',
            textAlign: 'center',
            ...containerStyle,
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            Please connect your wallet to proceed.
          </div>
          <WalletConnectButton
            connected={false}
            onConnect={onConnectWallet || (() => {})}
          />
        </div>
      );
    }

    return (
      <div
        className={className}
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          maxWidth: '350px',
          overflow: 'hidden',
          ...containerStyle,
        }}
      >
        <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
          <button
            onClick={() => setActiveTab('deposit')}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: activeTab === 'deposit' ? '#e8f5e9' : '#f1f1f1',
              border: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'deposit' ? 'bold' : 'normal',
              borderBottom:
                activeTab === 'deposit' ? '2px solid #4CAF50' : 'none',
              ...tabStyle,
              ...(activeTab === 'deposit' ? activeTabStyle : {}),
            }}
          >
            {depositLabel}
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            style={{
              flex: 1,
              padding: '1rem',
              backgroundColor: activeTab === 'withdraw' ? '#ffebee' : '#f1f1f1',
              border: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'withdraw' ? 'bold' : 'normal',
              borderBottom:
                activeTab === 'withdraw' ? '2px solid #f44336' : 'none',
              ...tabStyle,
              ...(activeTab === 'withdraw' ? activeTabStyle : {}),
            }}
          >
            {withdrawLabel}
          </button>
        </div>
        <div style={{ padding: '1rem' }}>
          {activeTab === 'deposit' ? (
            <Deposit
              accessCode={accessCode}
              userId={userId}
              baseUrl={baseUrl}
              onDepositSuccess={handleSuccess}
              {...depositProps}
            />
          ) : (
            <Withdraw
              accessCode={accessCode}
              userId={userId}
              baseUrl={baseUrl}
              onWithdrawSuccess={handleSuccess}
              {...withdrawProps}
            />
          )}
        </div>
      </div>
    );
  }
);

Hybrid.displayName = 'Hybrid';
