
import React, { useState, useEffect } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const DashboardErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("Error caught by error boundary:", error);
      setHasError(true);
      setError(error.error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="p-4 m-4 border border-red-500 rounded bg-red-100 text-red-800">
        <h2 className="text-lg font-bold">Something went wrong</h2>
        <p className="mt-2">{error?.message || 'Unknown error'}</p>
        <button 
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => setHasError(false)}
        >
          Try again
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default DashboardErrorBoundary;
