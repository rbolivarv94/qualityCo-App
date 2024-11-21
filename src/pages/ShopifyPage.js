import React, { useState, useEffect } from 'react';

const ShopifyPage = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div>
        <h1>You're offline</h1>
        <p>Please check your internet connection to access the store.</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }
  
  // Redirect to Shopify
  window.location.href = 'https://directodefabrica.com';
  return <div>Redirecting to the store...</div>;
};

export default ShopifyPage;
