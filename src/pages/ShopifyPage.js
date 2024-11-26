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
        <h1>Estás sin conexión</h1>
        <p>Por favor, verifica tu conexión a internet para acceder a la tienda.</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }
  
  // Redirigir a Shopify
  window.location.href = 'https://directodefabrica.com';
  return <div>Redirigiendo a la tienda...</div>;
  };
  
  export default ShopifyPage;
  