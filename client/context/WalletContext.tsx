import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface WalletBalance {
  mainWallet: number;
  activeDeposit: number;
  profitBalance: number;
  referralBonus: number;
  totalInvestment: number;
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "profit" | "referral";
  amount: number;
  fee: number;
  netAmount: number;
  status: "pending" | "completed" | "failed";
  timestamp: Date;
  description: string;
}

export interface WalletState {
  balance: WalletBalance;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

type WalletAction =
  | { type: "SET_BALANCE"; payload: WalletBalance }
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "SET_TRANSACTIONS"; payload: Transaction[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "UPDATE_BALANCE"; payload: Partial<WalletBalance> };

const initialState: WalletState = {
  balance: {
    mainWallet: 0,
    activeDeposit: 0,
    profitBalance: 0,
    referralBonus: 0,
    totalInvestment: 0,
  },
  transactions: [],
  isLoading: false,
  error: null,
};

function walletReducer(state: WalletState, action: WalletAction): WalletState {
  switch (action.type) {
    case "SET_BALANCE":
      return { ...state, balance: action.payload };
    case "UPDATE_BALANCE":
      return {
        ...state,
        balance: { ...state.balance, ...action.payload },
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

interface WalletContextType extends WalletState {
  updateBalance: (partial: Partial<WalletBalance>) => void;
  addTransaction: (transaction: Transaction) => void;
  getTransactionHistory: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  const updateBalance = (partial: Partial<WalletBalance>) => {
    dispatch({ type: "UPDATE_BALANCE", payload: partial });
  };

  const addTransaction = (transaction: Transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  const getTransactionHistory = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to load transactions",
      });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const value: WalletContextType = {
    ...state,
    updateBalance,
    addTransaction,
    getTransactionHistory,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
