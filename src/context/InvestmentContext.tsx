import { createContext, useContext } from 'react';
import { Investment } from '../types/investment';

interface InvestmentContextType {
  investment: Investment;
  updateInvestment: (updates: Partial<Investment>) => void;
}

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export const useInvestment = () => {
  const context = useContext(InvestmentContext);
  if (!context) {
    throw new Error('useInvestment must be used within an InvestmentProvider');
  }
  return context;
}; 