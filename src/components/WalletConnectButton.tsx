import React from 'react';

export interface WalletConnectButtonProps {
  onConnect: () => void;
  connected: boolean;
}

export const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({
  onConnect,
  connected,
}) => {
  return (
    <button onClick={onConnect}>
      {connected ? 'Disconnect Wallet' : 'Connect Wallet'}
    </button>
  );
};
