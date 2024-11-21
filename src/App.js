import React, { useState } from 'react';
import LoadingScreen from './utils/LoadingScreen';
import ShopifyPage from './pages/ShopifyPage';

const App = () => {
  const [showShopify, setShowShopify] = useState(false); // Tracks if Shopify page should show

  const handleReady = () => {
    setShowShopify(true); // Show the main content after "Access"
  };

  return (
    <div>
      {showShopify ? (
        <ShopifyPage />
      ) : (
        <LoadingScreen onReady={handleReady} />
      )}
    </div>
  );
};

export default App;