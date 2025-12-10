export { WalletConnectButton } from './components/WalletConnectButton';
export { BalanceDisplay } from './components/BalanceDisplay';
export { Deposit } from './components/Deposit';
export { Withdraw } from './components/Withdraw';
export { Hybrid } from './components/Hybrid';
export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};
