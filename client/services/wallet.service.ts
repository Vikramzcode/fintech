import { apiClient } from "./api";
import { WalletBalance, Transaction } from "../context/WalletContext";

export interface DepositRequest {
  amount: number;
  paymentMethod: string;
}

export interface DepositResponse {
  transactionId: string;
  grossAmount: number;
  fee: number;
  netAmount: number;
  timestamp: Date;
}

export interface WithdrawalRequest {
  amount: number;
  type: "profit" | "principal";
  accountDetails: {
    bankName?: string;
    accountNumber?: string;
    upiId?: string;
  };
}

export interface WithdrawalResponse {
  ticketId: string;
  status: "pending" | "approved" | "rejected";
  timestamp: Date;
}

class WalletService {
  async getBalance(): Promise<WalletBalance> {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.get<WalletBalance>("/wallet/balance");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTransactionHistory(): Promise<Transaction[]> {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.get<Transaction[]>("/wallet/transactions");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deposit(data: DepositRequest): Promise<DepositResponse> {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.post<DepositResponse>("/wallet/deposit", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async initiateWithdrawal(data: WithdrawalRequest): Promise<WithdrawalResponse> {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.post<WithdrawalResponse>(
        "/wallet/withdrawal",
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  isWithdrawalWindowOpen(): boolean {
    const today = new Date();
    const dayOfMonth = today.getDate();
    // Withdrawals allowed from 1st to 5th of month
    return dayOfMonth >= 1 && dayOfMonth <= 5;
  }
}

export const walletService = new WalletService();
