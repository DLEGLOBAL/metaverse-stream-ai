
import { createContext, useContext } from 'react';
import { AppContextType } from './types';

// Create the context with undefined as the default value
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to use the context
export const useAppContext = () => {
  console.log('useAppContext: Called, checking context...');
  const context = useContext(AppContext);
  console.log('useAppContext: Context value:', context ? 'defined' : 'undefined');
  if (context === undefined) {
    console.error('useAppContext: Context is undefined! Provider not found in component tree.');
    throw new Error('useAppContext must be used within an AppProvider');
  }
  console.log('useAppContext: Returning context successfully');
  return context;
};

// Export the provider component without importing it
// This prevents circular dependencies
export { AppProvider } from './AppContextProvider';
