export {};

declare global {
  interface Window {
    PaystackPop: {
      newTransaction(options: {
        key?: string;
        access_code?: string;
        email?: string;
        amount?: number;
        callback?: (response: { reference: string }) => void;
        onClose?: () => void;
      }): void;
    };
  }
}
