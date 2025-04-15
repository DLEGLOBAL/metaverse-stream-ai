
import { createContext, useContext } from 'react';
import { AppContextType } from './types';

// Create the context with undefined as the default value
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Export the provider component without importing it
// This prevents circular dependencies
export { AppProvider } from './AppContextProvider';
