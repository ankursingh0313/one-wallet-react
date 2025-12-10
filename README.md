# one-wallet-react

A React library for wallet operations, providing customizable components for deposits, withdrawals, and balance display.

## Installation

```bash
npm install one-wallet-react
# or
yarn add one-wallet-react
```

## Components

This library exports the following components:

- `Deposit`: A form for depositing funds.
- `Withdraw`: A form for withdrawing funds.
- `Hybrid`: A tabbed interface combining both Deposit and Withdraw.
- `BalanceDisplay`: A component to show the user's current balance.
- `WalletConnectButton`: A button to connect a wallet (basic implementation).

## Usage

### 1. Hybrid Component (Recommended)

The `Hybrid` component is the most versatile, allowing users to switch between depositing and withdrawing.

```tsx
import React from 'react';
import { Hybrid } from 'one-wallet-react';

const WalletPage = () => {
  const handleTransactionSuccess = (type: 'deposit' | 'withdraw', amount: number) => {
    console.log(`${type} successful: ${amount}`);
    // Refresh balance or show notification
  };

  return (
    <Hybrid
      accessCode="USER_ACCESS_CODE"
      userId="USER_ID"
      onTransactionSuccess={handleTransactionSuccess}
      // Optional Customization
      depositLabel="Add Funds"
      withdrawLabel="Cash Out"
      containerStyle={{ border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
      activeTabStyle={{ color: '#007bff', borderBottom: '2px solid #007bff' }}
    />
  );
};
```

### 2. Deposit Component

Use this if you only need the deposit functionality.

```tsx
import React from 'react';
import { Deposit } from 'one-wallet-react';

const DepositPage = () => {
  return (
    <Deposit
      accessCode="USER_ACCESS_CODE"
      userId="USER_ID"
      onDepositSuccess={(amount) => console.log(`Deposited: ${amount}`)}
      title="Top Up Wallet"
      buttonText="Pay Now"
      buttonStyle={{ backgroundColor: '#28a745' }}
    />
  );
};
```

### 3. Withdraw Component

Use this if you only need the withdraw functionality.

```tsx
import React from 'react';
import { Withdraw } from 'one-wallet-react';

const WithdrawPage = () => {
  return (
    <Withdraw
      accessCode="USER_ACCESS_CODE"
      userId="USER_ID"
      onWithdrawSuccess={(amount) => console.log(`Withdrew: ${amount}`)}
      title="Request Payout"
      buttonText="Withdraw Funds"
      buttonStyle={{ backgroundColor: '#dc3545' }}
    />
  );
};
```

### 4. BalanceDisplay Component

Displays the user's balance.

```tsx
import React from 'react';
import { BalanceDisplay } from 'one-wallet-react';

const Header = () => {
  return (
    <header>
      <h1>My App</h1>
      <BalanceDisplay accessCode="USER_ACCESS_CODE" userId="USER_ID" />
    </header>
  );
};
```

## Customization

All form components (`Deposit`, `Withdraw`, `Hybrid`) accept the following style props:

- `containerStyle`: Style for the outer container.
- `inputStyle`: Style for the input field.
- `buttonStyle`: Style for the action button.
- `labelStyle`: Style for the input label.
- `className`: CSS class for the container.

And label props:

- `title`: Component title (for Deposit/Withdraw).
- `buttonText`: Text on the action button.
- `placeholder`: Placeholder text for the input.

The `Hybrid` component also accepts:

- `tabStyle`: Style for the tabs.
- `activeTabStyle`: Style for the active tab.
- `depositLabel`: Label for the deposit tab.
- `withdrawLabel`: Label for the withdraw tab.
- `depositProps`: Props object passed to the internal Deposit component.
- `withdrawProps`: Props object passed to the internal Withdraw component.

## Optimization

All components are optimized using `React.memo` to prevent unnecessary re-renders. Event handlers are memoized with `useCallback`.
