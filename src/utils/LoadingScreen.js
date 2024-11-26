import React, { useState, useEffect } from 'react';
import backgroundImage from '../Assets/LandingImage.jpg'


const LoadingScreen = ({ onReady }) => {
  const [isLoading, setIsLoading] = useState(true); // Tracks loading status
  const [isReady, setIsReady] = useState(false); // Tracks if user can proceed

  useEffect(() => {
    // Simulate loading data (e.g., fetching Shopify data or caching)
    const loadWebsiteData = async () => {
      console.log('Loading website data...');
      // Simulated delay to represent loading
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Adjust time as needed
      setIsLoading(false); // Stop spinner
      setIsReady(true); // Enable the "Access" button
    };

    loadWebsiteData();
  }, []);

  if (isLoading) {
    return (
      <div style={styles.container}>
        <h1>Directo de Fábrica</h1>
        <div style={styles.spinner}></div>
        <p>Cargando Datos...</p>
      </div>
    );
  }

  if (isReady) {
    return (
      <div style={styles.container}>
        <h1>Bienvennido a QualityCo</h1>
        <button style={styles.button} onClick={onReady}>
          Entrar
        </button>
      </div>
    );
  }

  return null; // Shouldn't reach here
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: `url(${backgroundImage})`, // Set background image
    backgroundSize: 'cover', // Ensure the image covers the entire container
    backgroundPosition: 'center', // Center the image
    textAlign: 'center',
    color: '#fff', // Adjust text color for better visibility
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #ccc',
    borderTop: '5px solid #000',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#002149',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

// Add keyframes for spinner animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`,
  styleSheet.cssRules.length
);

export default LoadingScreen;