export const DEFAULT_BASE_URL = 'http://localhost:3000';

export interface ApiConfig {
  baseUrl?: string;
  accessCode: string;
  userId: string;
}

const getBaseUrl = (baseUrl?: string) => baseUrl || DEFAULT_BASE_URL;

export const api = {
  deposit: async (amount: number, config: ApiConfig) => {
    const url = `${getBaseUrl(config.baseUrl)}/deposit`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: config.userId,
        accessCode: config.accessCode,
        amount,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Deposit failed');
    }

    return response.json();
  },

  withdraw: async (amount: number, config: ApiConfig) => {
    const url = `${getBaseUrl(config.baseUrl)}/withdraw`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: config.userId,
        accessCode: config.accessCode,
        amount,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Withdrawal failed');
    }

    return response.json();
  },

  getBalance: async (config: ApiConfig) => {
    const url = `${getBaseUrl(
      config.baseUrl
    )}/balance?userId=${encodeURIComponent(
      config.userId
    )}&accessCode=${encodeURIComponent(config.accessCode)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch balance');
    }

    const data = await response.json();
    return data.balance; // Assuming response is { balance: number }
  },
};
